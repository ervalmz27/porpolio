/* eslint-disable no-unused-vars */
/* eslint-disable new-cap */
/* eslint-disable prefer-destructuring */
const jwt = require('jsonwebtoken');
const aws = require('aws-sdk');
const { customer, expert, availability_expert, config_session_time } = require('../../../models');

class ExpertController {
  async submitProfile(req, res, next) {
    const requestbody = req.body;
    const { id_customer } = req.params;

    function makeid(length) {
      const result = [];
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
      }
      return result.join('');
    }

    // function decodeBase64Image(dataString) {
    //   const matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    //   const response = {};

    //   if (matches.length !== 3) {
    //     return new Error('Invalid input string');
    //   }

    //   response.type = matches[1];
    //   response.data = new Buffer.from(matches[2], 'base64');

    //   return response;
    // }

    // var imageBuffer = decodeBase64Image(requestbody.profileimage);
    // fs.writeFile("test.jpg", imageBuffer, function(err) { console.log(err) });
    // count of available day
    let count_available_day = requestbody.availability_expert.length - 1;
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
              fname: requestbody.fname,
              lname: requestbody.lname,
              birthdate: requestbody.birthdate,
              idcity: requestbody.idcity,
              city: requestbody.city,
              idcountry: requestbody.idcountry,
              country: requestbody.country,
              is_verified: requestbody.is_verified,
              is_expert: requestbody.is_expert,
            },
            { where: { id: userReg.id } }
          );
          const cfg = {
            secretAccessKey: process.env.SECRET_ACCESS_KEY,
            accessKeyId: process.env.ACCESS_KEY_ID,
            region: process.env.REGION,
          };
          aws.config.update(cfg);
          const s3 = new aws.S3({});
          const image = [];
          if (req.body.profileimage) {
            const type = req.body.profileimage.split(';')[0].split('/')[1];
            if (type === 'jpg' || type === 'jpeg' || type === 'png') {
              image.push({
                contentType: `image/${type}`,
                imageKey: `profile/${Date.now()}${Math.round(Math.random() * 1e9)}.${type}`,
                buffer: new Buffer.from(req.body.profileimage.replace(/^data:image\/\w+;base64,/, ''), 'base64'),
              });
            }
          }
          if (req.body.backgroundimage) {
            const type = req.body.backgroundimage.split(';')[0].split('/')[1];
            if (type === 'jpg' || type === 'jpeg' || type === 'png') {
              image.push({
                contentType: `image/${type}`,
                imageKey: `background/${Date.now()}${Math.round(Math.random() * 1e9)}.${type}`,
                buffer: new Buffer.from(req.body.backgroundimage.replace(/^data:image\/\w+;base64,/, ''), 'base64'),
              });
            }
          }
          const imgURL = [];
          if (image !== []) {
            await Promise.all(
              image.map(async (img) => {
                const upload = await s3
                  .upload({
                    Bucket: process.env.AWS_BUCKET,
                    Key: img.imageKey,
                    Body: img.buffer,
                    ContentEncoding: 'base64',
                    ContentType: img.contentType,
                    ACL: 'public-read',
                  })
                  .promise();
                imgURL.push(upload.Location);
              })
            );
          }
          let imgProfile;
          let bground;
          if (imgURL !== []) {
            if (imgURL[0].includes('profile')) {
              imgProfile = imgURL[0];
            } else if (imgURL[0].includes('background')) {
              bground = imgURL[0];
            }
            if (imgURL[1].includes('profile')) {
              imgProfile = imgURL[1];
            } else if (imgURL[1].includes('background')) {
              bground = imgURL[1];
            }
          }
          const checkExpert = await expert.findOne({ where: { idcustomer: userReg.id } });
          if (checkExpert) {
            await expert.update(
              {
                expert_rate_hour: requestbody.expert_rate_hour,
                currency: requestbody.currency,
                is_expert_time: Date.now(),
                custsignupdate: Date.now(),
                city: requestbody.city,
                country: requestbody.country,
                block_status_exp: requestbody.block_status_exp,
                lastrateupdate: Date.now(),
                referal_code: makeid(10),
                profile_headline: requestbody.profile_headline,
                expert_about: requestbody.expert_about,
                // profileimage: imageBuffer.type,
                profileimage: imgProfile,
                background_image: bground,
                expertise: requestbody.expertise,
                language: requestbody.language,
                created_by: userReg.email,
                updated_by: userReg.email,
              },
              { where: { idcustomer: userReg.id } }
            );

            if (imgProfile) {
              const params = {
                Bucket: process.env.AWS_BUCKET,
                Key: `${checkExpert.profileimage.slice(-35)}`,
              };
              await s3.deleteObject(params, (err, data) => {
                // eslint-disable-next-line no-console
                if (err) console.log(err, err.stack);
              });
            }
            if (bground) {
              const params = {
                Bucket: process.env.AWS_BUCKET,
                Key: `${checkExpert.background_image.slice(-38)}`,
              };
              await s3.deleteObject(params, (err, data) => {
                // eslint-disable-next-line no-console
                if (err) console.log(err, err.stack);
              });
            }
            for (count_available_day; count_available_day >= 0; --count_available_day) {
              availability_expert.create({
                idcustomer: id_customer,
                available_day: requestbody.availability_expert[count_available_day].day_name,
                start_time: requestbody.availability_expert[count_available_day].start_time,
                finish_time: requestbody.availability_expert[count_available_day].finish_time,
                available_day_id: requestbody.availability_expert[count_available_day].available_day_id,
                is_everyday: requestbody.is_everyday,
              });
            }
            const expireJwt = await config_session_time.findOne({ where: { id: 1 } });
            const expjwt = expireJwt.config_time * 60;
            const token = jwt.sign({ email: userReg.email }, process.env.SECRET, { expiresIn: expjwt });
            req.id = id_customer;
            req.activity = 'login';
            req.session = 'active';
            req.expert = true;
            req.token = token;
            req.isBiodataFilled = true;
            next();
          }
          res.status(404).json({
            status: false,
            message: `idcustomer ${id_customer} not an expert`,
          });
          // return
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

  async getProfileExpert(req, res) {
    const id_expert = await customer.findOne({ where: { email: req.id.email } });
    try {
      const profileData = await expert.findOne({
        where: { idcustomer: id_expert.id },
        include: { model: customer, as: 'expert_has_customer' },
      });
      const availExpert = await availability_expert.findAll({ where: { idcustomer: id_expert.id } });
      const resAvailExpert = availExpert.map((key) => ({
        id: key.id,
        available_day: key.available_day,
        start_time: key.start_time,
        finish_time: key.finish_time,
        idcustomer: key.idcustomer,
        available_day_id: key.available_day_id,
        createdAt: key.createdAt,
        updatedAt: key.updatedAt,
      }));
      res.status(200).json({
        status: true,
        fname: profileData.expert_has_customer.fname,
        lname: profileData.expert_has_customer.lname,
        email: profileData.expert_has_customer.email,
        profileData,
        availExpert: {
          is_everyday: availExpert[0].is_everyday,
          availability_expert: resAvailExpert,
        },
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

  async changeAvail(req, res) {
    const id_expert = await customer.findOne({ where: { email: req.id.email } });
    const requestbody = req.body;
    const getAvail = await availability_expert.findAll({ where: { idcustomer: id_expert.id } });
    let count_available_day = requestbody.availability_expert.length - 1;
    try {
      if (getAvail) {
        await availability_expert.destroy({ where: { idcustomer: id_expert.id } });
        for (count_available_day; count_available_day >= 0; --count_available_day) {
          availability_expert.create({
            idcustomer: id_expert.id,
            available_day: requestbody.availability_expert[count_available_day].day_name,
            start_time: requestbody.availability_expert[count_available_day].start_time,
            finish_time: requestbody.availability_expert[count_available_day].finish_time,
            available_day_id: requestbody.availability_expert[count_available_day].available_day_id,
            is_everyday: requestbody.is_everyday,
          });
        }
        res.status(201).json({
          sucess: true,
          message: 'success change',
        });
        return;
      }
      res.status(400).json({
        code: 'EDIT-INVALID',
        sucess: false,
        message: 'failed change',
      });
      return;
    } catch (error) {
      res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  }

  async changeImage(req, res) {
    const id_expert = await customer.findOne({ where: { email: req.id.email } });
    try {
      const cekProfile = await expert.findOne({ where: { idcustomer: id_expert.id } });
      if (cekProfile) {
        const cfg = {
          secretAccessKey: process.env.SECRET_ACCESS_KEY,
          accessKeyId: process.env.ACCESS_KEY_ID,
          region: process.env.REGION,
        };
        aws.config.update(cfg);
        const s3 = new aws.S3({});
        const image = [];
        if (req.body.profileimage) {
          const type = req.body.profileimage.split(';')[0].split('/')[1];
          if (type === 'jpg' || type === 'jpeg' || type === 'png') {
            image.push({
              contentType: `image/${type}`,
              imageKey: `profile/${Date.now()}${Math.round(Math.random() * 1e9)}.${type}`,
              buffer: new Buffer.from(req.body.profileimage.replace(/^data:image\/\w+;base64,/, ''), 'base64'),
            });
          }
        }
        if (req.body.backgroundimage) {
          const type = req.body.backgroundimage.split(';')[0].split('/')[1];
          if (type === 'jpg' || type === 'jpeg' || type === 'png') {
            image.push({
              contentType: `image/${type}`,
              imageKey: `background/${Date.now()}${Math.round(Math.random() * 1e9)}.${type}`,
              buffer: new Buffer.from(req.body.backgroundimage.replace(/^data:image\/\w+;base64,/, ''), 'base64'),
            });
          }
        }
        const imgURL = [];
        if (image !== []) {
          await Promise.all(
            image.map(async (img) => {
              const upload = await s3
                .upload({
                  Bucket: process.env.AWS_BUCKET,
                  Key: img.imageKey,
                  Body: img.buffer,
                  ContentEncoding: 'base64',
                  ContentType: img.contentType,
                  ACL: 'public-read',
                })
                .promise();
              imgURL.push(upload.Location);
            })
          );
        }
        let imgProfile;
        let bground;
        if (imgURL !== []) {
          if (imgURL[0].includes('profile')) {
            imgProfile = imgURL[0];
          } else if (imgURL[0].includes('background')) {
            bground = imgURL[0];
          }
          if (imgURL[1].includes('profile')) {
            imgProfile = imgURL[1];
          } else if (imgURL[1].includes('background')) {
            bground = imgURL[1];
          }
        }
        await expert.update(
          { profileimage: imgProfile, background_image: bground },
          { where: { idcustomer: id_expert.id } }
        );
        if (imgProfile) {
          const params = {
            Bucket: process.env.AWS_BUCKET,
            Key: `${cekProfile.profileimage.slice(-35)}`,
          };
          await s3.deleteObject(params, (err, data) => {
            // eslint-disable-next-line no-console
            if (err) console.log(err, err.stack);
          });
        }
        if (bground) {
          const params = {
            Bucket: process.env.AWS_BUCKET,
            Key: `${cekProfile.background_image.slice(-38)}`,
          };
          await s3.deleteObject(params, (err, data) => {
            // eslint-disable-next-line no-console
            if (err) console.log(err, err.stack);
          });
        }
        res.status(201).json({
          status: true,
          message: 'update success',
        });
        return;
      }
      res.status(401).json({
        status: false,
        message: 'user not found',
      });
      return;
    } catch (error) {
      res.status(500).json({
        status: false,
        message: 'update failed',
      });
    }
  }

  async addBackgroundProfile(req, res) {
    const id_expert = await customer.findOne({ where: { email: req.id.email } });
    const { expert_about } = req.body;
    try {
      await expert.update({ expert_about }, { where: { idcustomer: id_expert.id } });
      res.status(201).json({
        id_customer: id_expert.id,
        Message: 'Experience Success add',
      });
      return;
    } catch (error) {
      res.status(400).json({
        code: 'FORMINVALID',
        success: false,
        message: error.message,
      });
    }
  }

  async editHeadline(req, res) {
    const id_expert = await customer.findOne({ where: { email: req.id.email } });
    const { profile_headline } = req.body;
    try {
      await expert.update({ profile_headline }, { where: { idcustomer: id_expert.id } });
      res.status(201).json({
        id_customer: id_expert.id,
        Message: 'profile headline updated',
      });
      return;
    } catch (error) {
      res.status(400).json({
        code: 'FORMINVALID',
        success: false,
        message: error.message,
      });
    }
  }

  async getBackgroundProfile(req, res) {
    const id_expert = await customer.findOne({ where: { email: req.id.email } });
    try {
      const getData = await expert.findOne({ where: { idcustomer: id_expert.id } });
      res.status(201).json({
        id_customer: getData.idcustomer,
        expert_about: getData.expert_about,
      });
      return;
    } catch (error) {
      res.status(400).json({
        code: 'FORMINVALID',
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = ExpertController;
