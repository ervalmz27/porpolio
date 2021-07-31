const jwt = require('jsonwebtoken');
const { customer, oauth_access_token, config_session_time } = require('../../../models');
const Mailer = require('../mailer/sendMail');

class UserController {
  async profile(req, res) {
    const { id_customer } = req.params;
    const { fname, lname } = req.body;

    try {
      await customer.update(
        {
          fname,
          lname,
        },
        {
          where: {
            id: id_customer,
          },
        }
      );

      await customer
        .findOne({
          where: {
            id: id_customer,
          },
        })
        .then(async (data) => {
          res.status(201).json({
            message: 'name has changed',
            fname: data.fname,
            lname: data.lname,
            birthdate: data.birthdate,
            idcity: data.idcity,
            city: data.city,
            idcountry: data.idcountry,
            country: data.country,
            is_verified: data.is_verified,
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
        data: 'no data temporary',
      });
    }
  }

  async getProfile(req, res) {
    try {
      await customer
        .findOne({
          where: {
            email: req.id.email,
          },
        })
        .then(async (data) => {
          res.status(200).json({
            data,
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

  async regProfile(req, res, next) {
    const { id_customer } = req.params;
    const { fname, lname, birthdate, idcity, city, idcountry, country, is_verified, is_expert } = req.body;

    if (id_customer === undefined || id_customer === '') {
      res.status(400).json({
        success: false,
        message: 'please input id user',
      });
      return;
    }
    try {
      const userReg = await customer.findOne({
        where: {
          id: id_customer,
        },
      });
      if (userReg) {
        try {
          await customer.update(
            {
              fname,
              lname,
              birthdate,
              idcity,
              city,
              idcountry,
              country,
              is_verified,
              is_expert,
            },
            {
              where: {
                id: userReg.id,
              },
            }
          );
          const expireJwt = await config_session_time.findOne({
            where: {
              id: 1,
            },
          });
          const expjwt = expireJwt.config_time * 60;
          await customer
            .findOne({
              where: {
                id: userReg.id,
              },
            })
            .then(async (data) => {
              const token = jwt.sign(
                {
                  email: data.email,
                },
                process.env.SECRET,
                {
                  expiresIn: expjwt,
                }
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

              req.id = data.id;
              req.activity = 'login';
              req.session = 'active';
              req.expert = is_expert;
              req.token = token;
              req.isBiodataFilled = true;

              const pathFile = './views/customer-registered.ejs';
              const { email } = userReg;
              const emailNotif = new Mailer(pathFile, email, 'Congratulation', {
                email,
              });
              emailNotif.send();
              console.log('email => ', emailNotif);

              next();
              // res.status(201).json({
              //     "fname": data.fname,
              //     "lname": data.lname,
              //     "birthdate": data.birthdate,
              //     "idcity": data.idcity,
              //     "city": data.city,
              //     "idcountry": data.idcountry,
              //     "country": data.country,
              //     "is_verified": data.is_verified,
              //     "is_expert": data.is_expert
              // })
              // return
            })
            .catch((err) => {
              throw new Error(err.toString());
            });
        } catch (error) {
          res.status(500).json({
            status: false,
            message: error.message,
          });
          return;
        }
      }
    } catch (error) {
      res.status(500).json({
        status: false,
        message: error.message,
        data: 'no data user',
      });
    }
  }
}

module.exports = new UserController();
