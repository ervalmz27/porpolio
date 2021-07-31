const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const { compareSync } = require('bcrypt');
const {
  customer_temp,
  customer_verification,
  customer,
  expert,
  login_audit,
  oauth_access_token,
  config_session_time,
} = require('../../../models');
const Mailer = require('../mailer/sendMail');

class AuthController {
  async register(req, res) {
    const { email, password, is_expert, referral_code } = req.body;

    function validateEmail(a) {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(a);
    }

    if (email === undefined || password === undefined || is_expert === undefined || email === '' || password === '') {
      res.status(400).json({
        code: 'REG-FORMINVALID',
        status: false,
        note: 'Column Not Complete',
      });
      return;
    }

    try {
      const cust = await customer.findOne({
        where: {
          email,
        },
      });
      if (cust) {
        res.status(406).json({
          code: 'REG-EMAILINVALID',
          status: false,
          message: 'Your account might already registered, try to login',
        });
        return;
      }
    } catch (error) {
      res.status(500).json({
        status: false,
        message: error.message,
      });
      return;
    }

    if (!validateEmail(email)) {
      res.status(403).json({
        code: 'REG-EMAILINVALID',
        status: false,
        message: "your email doesn't match any format",
      });
      return;
    }
    const saltRounds = 10;
    const hashpassword = bcrypt.hashSync(password, saltRounds);

    const pathFile = './views/emailOtp.ejs';
    const tokenCode = Math.floor(100000 + Math.random() * 900000);

    try {
      const cekTemp = await customer_temp.findOne({
        where: {
          email,
        },
      });
      if (!cekTemp) {
        const temporary = await customer_temp.create({
          email,
          device_id: 'ios',
          password_encrypted: hashpassword,
          updated_by: 'test',
          is_expert,
          referral_code,
          created_by: 'test',
        });

        // const customer_temp = await customer.create({
        //     email: email,
        //     password_encrypted: hashpassword,
        //     is_verified: false
        // })

        await customer_verification.create({
          verificationtime: Date.now(),
          verifycode: tokenCode,
          expiretime: Date.now() + 300000,
          notes: 'register',
          status: true,
          idcustomer_temp: temporary.id,
        });

        const emailNotif = new Mailer(pathFile, email, 'Verification Code', {
          tokenCode,
          email,
        });
        emailNotif.send();

        res.status(201).json({
          id_customer_temp: temporary.id,
        });
        return;
      }
      await customer_temp.update(
        {
          device_id: 'ios',
          password_encrypted: hashpassword,
          updated_by: 'test',
          is_expert,
          created_by: 'test',
        },
        {
          where: {
            email,
          },
        }
      );
      const temporary = await customer_temp.findOne({
        where: {
          email,
        },
      });
      await customer_verification.update(
        {
          verificationtime: Date.now(),
          verifycode: tokenCode,
          expiretime: Date.now() + 300000,
          notes: 'aaaa',
          status: true,
        },
        {
          where: {
            idcustomer_temp: temporary.id,
          },
        }
      );
      const emailNotif = new Mailer(pathFile, email, 'Verification Code', {
        tokenCode,
        email,
      });
      emailNotif.send();
      res.status(201).json({
        id_customer_temp: temporary.id,
      });
      return;
    } catch (error) {
      res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  }

  async verification(req, res) {
    const { id_customer_temp, verifycode } = req.params;

    if (id_customer_temp === undefined || verifycode === undefined || id_customer_temp === '' || verifycode === '') {
      res.status(400).json({
        code: 'VER-OTPINVALID',
        success: false,
        message: 'OTP is expired or not match',
      });
      return;
    }

    try {
      // idcustomer_temp ada
      const temp_idcust = await customer_verification.findOne({
        where: {
          idcustomer_temp: id_customer_temp,
        },
      });
      const timeElapsed = Date.now();
      const today = new Date(timeElapsed);
      today.toISOString();
      // belum expired
      if (temp_idcust.expiretime >= Date.now()) {
        try {
          // match dengan code
          // setelah match column is_verified di table customer diubah jd true
          const verify = await customer_verification.findOne({
            where: {
              [Op.and]: [
                {
                  verifycode: {
                    [Op.eq]: verifycode,
                  },
                },
                {
                  idcustomer_temp: {
                    [Op.eq]: id_customer_temp,
                  },
                },
              ],
            },
          });
          const userTemp = await customer_temp.findOne({
            where: {
              id: id_customer_temp,
            },
          });
          const simpanRefer = [];
          const referred = await expert.findOne({
            where: {
              referal_code: userTemp.referral_code,
            },
            include: {
              model: customer,
              as: 'expert_has_customer',
            },
          });
          if (referred) {
            simpanRefer[0] = referred.referal_code;
          } else {
            simpanRefer[0] = 'null';
          }
          if (verify) {
            if (userTemp.is_expert === true) {
              const regUser = await customer.create(
                {
                  email: userTemp.email,
                  password_encrypted: userTemp.password_encrypted,
                  is_verified: true,
                  is_expert: true,
                  customer_has_expert: [
                    {
                      is_verified: true,
                      is_expert: true,
                      block_status_cust: false,
                      custsignupdate: Date.now(),
                      referred_by: simpanRefer[0],
                    },
                  ],
                },
                {
                  include: {
                    model: expert,
                    as: 'customer_has_expert',
                  },
                }
              );
              await customer_verification.update(
                {
                  expiretime: Date.now(),
                },
                {
                  where: {
                    idcustomer_temp: id_customer_temp,
                  },
                }
              );
              const expireJwt = await config_session_time.findOne({
                where: {
                  id: 1,
                },
              });
              const expjwt = expireJwt.config_time * 60;
              const token = jwt.sign(
                {
                  email: userTemp.email,
                },
                process.env.SECRET,
                {
                  expiresIn: expjwt,
                }
              );
              // req.id = regUser.id
              // req.activity = 'login'
              // req.session = 'active'
              // req.expert = regUser.is_expert
              // req.token = token
              // req.isBiodataFilled = false
              // next()
              res.status(201).json({
                success: true,
                data: {
                  id_customer: regUser.id,
                  tokenJWT: token,
                },
              });

              return;
            }
            const cekUser = await customer.findAll({
              where: {
                email: userTemp.email,
              },
            });
            if (cekUser.length === 0) {
              const regUser = await customer.create({
                email: userTemp.email,
                password_encrypted: userTemp.password_encrypted,
                is_verified: true,
                is_expert: false,
              });
              await customer_verification.update(
                {
                  expiretime: Date.now(),
                },
                {
                  where: {
                    idcustomer_temp: id_customer_temp,
                  },
                }
              );

              const expireJwt = await config_session_time.findOne({
                where: {
                  id: 1,
                },
              });
              const expjwt = expireJwt.config_time * 60;
              const token = jwt.sign(
                {
                  email: userTemp.email,
                },
                process.env.SECRET,
                {
                  expiresIn: expjwt,
                }
              );
              // req.id = regUser.id
              // req.activity = 'login'
              // req.session = 'active'
              // req.expert = regUser.is_expert
              // req.token = token
              // next()
              res.status(201).json({
                success: true,
                data: {
                  id_customer: regUser.id,
                  tokenJWT: token,
                },
              });
              return;
            }
            const regCustomer = await customer.findOne({
              where: {
                email: userTemp.email,
              },
            });
            const expireJwt = await config_session_time.findOne({
              where: {
                id: 1,
              },
            });
            const expjwt = expireJwt.config_time * 60;
            const token = jwt.sign(
              {
                email: userTemp.email,
              },
              process.env.SECRET,
              {
                expiresIn: expjwt,
              }
            );
            res.status(201).json({
              success: true,
              data: {
                id_customer: regCustomer.id,
                tokenJWT: token,
              },
            });

            return;
          }
          res.status(400).json({
            code: 'VER-OTPINVALID',
            success: false,
            message: 'OTP is expired or not match',
          });
          return;
        } catch (error) {
          res.status(400).json({
            status: false,
            message: error.message,
            data: null,
          });
          return;
        }
      } else {
        res.status(400).json({
          code: 'VER-OTPINVALID',
          success: false,
          message: 'OTP is expired or not match',
        });
        return;
      }
    } catch (error) {
      res.status(500).json({
        status: false,
        message: error.message,
        data: 'no data temporary',
      });
    }
  }

  async resendotp(req, res) {
    const { id_customer_temp } = req.body;
    try {
      const idCustTemp = await customer_verification.findOne({
        where: {
          idcustomer_temp: id_customer_temp,
        },
      });

      if (!idCustTemp) {
        res.status(400).json({
          code: 'RES-OTPFAILED',
          success: false,
          message: 'Generate otp failed',
        });
        return;
      }

      const emailTemp = await customer_temp.findOne({
        where: {
          id: id_customer_temp,
        },
      });

      const pathFile = './views/emailOtp.ejs';
      const tokenCode = Math.floor(100000 + Math.random() * 900000);
      const { email } = emailTemp;
      // update token
      await customer_verification.update(
        {
          verifycode: tokenCode,
          verificationtime: Date.now(),
          expiretime: Date.now() + 300000,
        },
        {
          where: {
            idcustomer_temp: id_customer_temp,
          },
        }
      );

      const emailNotif = new Mailer(pathFile, email, 'Verification Code', {
        tokenCode,
        email,
      });
      emailNotif.send();

      res.status(201).json({
        id_customer_temp: idCustTemp.idcustomer_temp,
      });
      return;
    } catch (error) {
      res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  }

  async login(req, res, next) {
    const { username, password } = req.body;
    let fetchedCostumer;

    await customer
      .findOne({
        where: {
          [Op.and]: [
            {
              email: {
                [Op.eq]: username,
              },
            },
            {
              is_verified: {
                [Op.eq]: true,
              },
            },
            // {
            //     block_status_cust: {
            //         [Op.eq]: false
            //     }
            // }
          ],
        },
      })
      .then(async (data) => {
        if (data) {
          const passdb = data.password_encrypted;
          const { is_expert } = data;
          const isPasswordValid = await compareSync(password, passdb);
          if (!isPasswordValid) {
            res.status(400).json({
              code: 'LOG-PASSINVALID',
              status: false,
              message: 'one or more inputs are incorrect. Try again',
              data: null,
            });
            return;
          }
          if (data.block_status_cust === true) {
            res.status(403).json({
              success: false,
              code: 'LOG-USERBLOCKED',
              message: 'user blocked',
              is_expert,
              data: null,
              result: null,
            });
            return;
          }

          fetchedCostumer = data;

          const expireJwt = await config_session_time.findOne({
            where: {
              id: 1,
            },
          });
          const expjwt = expireJwt.config_time * 60;
          const token = jwt.sign(
            {
              email: data.email,
            },
            process.env.SECRET,
            { expiresIn: expjwt }
          );
          // cek session
          const cekSession = await oauth_access_token.findOne({
            where: {
              name: data.email,
            },
          });

          if (cekSession) {
            await oauth_access_token.update(
              {
                id: token,
              },
              {
                where: {
                  name: data.email,
                },
              }
            );
          } else {
            await oauth_access_token.create({
              id: token,
              user_id: data.id,
              client_id: data.id,
              name: data.email,
              revoked: false,
            });
          }

          req.isBiodataFilled = false;
          if (
            data.fname !== null &&
            data.lname !== null &&
            data.birthdate !== null &&
            data.idcity !== null &&
            data.city !== null &&
            data.idcountry !== null &&
            data.country !== null
          ) {
            req.isBiodataFilled = true;
          }
          // res.status(200).json({
          //     "token_type": "Bearer",
          //     "access_token": token,
          //     "id_customer": data.id,
          //     "is_expert": data.is_expert
          // })

          req.id = data.id;
          req.costumer = fetchedCostumer;
          req.activity = 'login';
          req.session = 'active';
          req.expert = data.is_expert;
          req.token = token;
          next();
        } else {
          res.status(400).json({
            success: false,
            message: 'one or more inputs are incorrect. Try again',
            data: null,
            result: null,
          });
        }
      });
  }

  async forgotPassword(req, res) {
    const { email } = req.body;
    try {
      const cekUser = await customer.findOne({
        where: {
          [Op.and]: [
            {
              email: {
                [Op.eq]: email,
              },
            },
            {
              is_verified: {
                [Op.eq]: true,
              },
            },
          ],
        },
      });
      if (cekUser) {
        const randomstring = Math.random().toString(36).slice(-8);
        const saltRounds = 10;
        const passEncrypt = bcrypt.hashSync(randomstring, saltRounds);
        const pathFile = './views/forgotPassword.ejs';
        await customer.update(
          {
            password_encrypted: passEncrypt,
          },
          {
            where: {
              email,
            },
          }
        );
        const emailNotif = new Mailer(pathFile, email, 'Forgot Password', {
          randomstring,
          email,
        });
        emailNotif.send();

        res.status(201).json({
          sucess: true,
          message: 'email sent',
        });
        return;
      }
      res.status(400).json({
        code: 'FOR-EMAILINVALID',
        success: false,
        note: 'Email not found',
      });
      return;
    } catch (error) {
      res.status(500).json({
        status: false,
        message: error.message,
        data: 'no data temporary',
      });
    }
  }

  async logout(req, res) {
    const { customer_id } = req.params;
    const cekAudit = await login_audit.findAll({
      where: {
        [Op.and]: [
          {
            idcustomer: {
              [Op.eq]: customer_id,
            },
          },
          {
            session: {
              [Op.eq]: 'active',
            },
          },
        ],
      },
    });
    if (cekAudit) {
      await login_audit.update(
        {
          session: 'inactive',
        },
        {
          where: {
            idcustomer: customer_id,
          },
        }
      );
      res.status(201).json({
        id_customer: customer_id,
        status: 'logged out',
      });
      return;
    }
    res.status(400).json({
      id_customer: customer_id,
      status: 'user not active',
    });
  }

  async refferal(req, res) {
    const { refferal_code } = req.body;
    try {
      const cek = await expert.findOne({
        where: {
          referal_code: refferal_code,
        },
      });
      if (cek) {
        res.status(201).json({
          status: true,
          message: 'refferal code valid',
        });
        return;
      }
      res.status(401).json({
        code: 'REF-REFFINVALID',
        status: false,
        message: 'Referral code is not valid. Please try again.',
      });
      return;
    } catch (error) {
      res.status(500).json({
        status: false,
        message: error.message,
        data: null,
      });
    }
  }

  async checkAuthorization(req, res) {
    try {
      await customer
        .findOne({
          where: {
            email: req.id.email,
          },
        })
        .then(async (data) => {
          if (data.block_status_cust) {
            res.status(401).json({
              success: false,
              code: 'LOG-USERBLOCKED',
              message: 'user blocked',
              is_expert: data.is_expert,
              data: null,
              result: null,
            });
            return;
          }
          res.status(200).json({
            success: true,
            is_expert: data.is_expert,
          });
        })
        .catch((err) => {
          throw new Error(err.toString());
        });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: error.message,
        data: null,
      });
    }
  }
}

module.exports = new AuthController();
