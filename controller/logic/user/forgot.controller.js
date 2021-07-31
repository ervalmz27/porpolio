const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const { customer_temp, customer_verification, customer } = require('../../../models');
const Mailer = require('../mailer/sendMail');

class ForgotController {
  async forgot(req, res) {
    const { email, template } = req.body;
    if (email === undefined || template === undefined || email === '' || template === '') {
      res.status(400).json({
        code: 'FOR-EMAILINVALID',
        success: false,
        message: 'need email and template in body',
      });
      return;
    }
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
      const pathFile = './views/forgotOtp.ejs';
      const tokenCode = Math.floor(100000 + Math.random() * 900000);
      if (cekUser) {
        const cekTemp = await customer_temp.findOne({
          where: {
            email,
          },
        });
        if (!cekTemp) {
          const temporary = await customer_temp.create(
            {
              email,
              device_id: 'ios',
              updated_by: email,
              created_by: email,
              temp_has_verification: [
                {
                  verificationtime: Date.now(),
                  verifycode: tokenCode,
                  expiretime: Date.now() + 300000,
                  notes: 'change password',
                  status: true,
                },
              ],
            },
            {
              include: {
                model: customer_verification,
                as: 'temp_has_verification',
              },
            }
          );
          const emailNotif = new Mailer(pathFile, email, 'Forgot Password', {
            tokenCode,
            email,
          });
          emailNotif.send();

          res.status(201).json({
            id_customer_temp: temporary.id,
          });
          return;
        }
        await customer_verification.update(
          {
            verificationtime: Date.now(),
            verifycode: tokenCode,
            expiretime: Date.now() + 300000,
            notes: 'change password',
            status: true,
          },
          {
            where: {
              idcustomer_temp: cekTemp.id,
            },
          }
        );
        const temporary = await customer_verification.findOne({
          where: {
            idcustomer_temp: cekTemp.id,
          },
        });
        const emailNotif = new Mailer(pathFile, email, 'Forgot Password', {
          tokenCode,
          email,
        });
        emailNotif.send();

        res.status(201).json({
          id_customer_temp: temporary.idcustomer_temp,
        });
        return;
      }
      res.status(400).json({
        code: 'FOR-EMAILINVALID',
        success: false,
        message: 'email invalid or unregistered',
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

  async change(req, res) {
    const idUser = req.id;
    const { newPassword } = req.body;
    if (newPassword === undefined || newPassword === '') {
      res.status(400).json({
        code: 'FOR-PASSINVALID',
        status: 'failed',
        message: 'new password must be filled',
      });
      return;
    }
    const saltRounds = 10;
    const hashpassword = bcrypt.hashSync(newPassword, saltRounds);
    try {
      await customer.update(
        {
          password_encrypted: hashpassword,
        },
        {
          where: {
            email: idUser.email,
          },
        }
      );
      res.status(201).json({
        status: true,
        email: idUser.email,
        messasge: 'password changed successfully',
      });
      return;
    } catch (error) {
      res.status(400).json({
        status: false,
        error,
        messasge: 'change password failed',
      });
    }
  }
}

module.exports = new ForgotController();
