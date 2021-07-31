/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
/* eslint-disable new-cap */
const jwt = require('jsonwebtoken');
const aws = require('aws-sdk');
const {
  customer,
  expert,
  availability_expert,
  oauth_access_token,
  config_session_time,
  expertise,
  master_language,
} = require('../../../models');
const Mailer = require('../mailer/sendMail');

class ExpertController {
  async submitProfile(req, res, next) {
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
    // if (req.body.backgroundimage) {
    //   const type = req.body.backgroundimage.split(';')[0].split('/')[1];
    //   if (type === 'jpg' || type === 'jpeg' || type === 'png') {
    //     image.push({
    //       contentType: `image/${type}`,
    //       imageKey: `background/${Date.now()}${Math.round(Math.random() * 1e9)}.${type}`,
    //       buffer: new Buffer.from(req.body.backgroundimage.replace(/^data:image\/\w+;base64,/, ''), 'base64'),
    //     });
    //   }
    // }
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
    //   const matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
    //     response = {};

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
            console.log('Upoad => ', upload.Location);
          })
        );
      }
      let imgProfile;
      let bground;
      if (imgURL !== []) {
        imgProfile = imgURL[0];
        console.log('IMage => ', imgURL);
      }
      const userReg = await customer.findOne({ where: { id: id_customer } });

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
              profileimage: imgProfile,
            },
            { where: { id: id_customer } }
          );

          // if (imgProfile) {
          //   const params = {
          //     Bucket: process.env.AWS_BUCKET,
          //     Key: `${userReg.profileimage.slice(-35)}`,
          //   };
          //   await s3.deleteObject(params, (err, data) => {
          //     // eslint-disable-next-line no-console
          //     if (err) console.log(err, err.stack);
          //   });
          // }
          const isExpertExists = await expert.findOne({ where: { idcustomer: id_customer } });

          if (isExpertExists) {
            await expert.update(
              {
                expert_rate_hour: requestbody.expert_rate_hour,
                expert_rate_minute: requestbody.expert_rate_hour/60,
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
                profileimage: imgProfile,
                background_image: requestbody.backgroundimage,
                expertise: requestbody.expertise,
                language: requestbody.language,
                created_by: userReg.email,
                updated_by: userReg.email,
              },
              { where: { idcustomer: id_customer } }
            );
            // if (imgProfile) {
            //   const params = {
            //     Bucket: process.env.AWS_BUCKET,
            //     Key: `${isExpertExists.profileimage.slice(-35)}`,
            //   };
            //   await s3.deleteObject(params, (err, data) => {
            //     // eslint-disable-next-line no-console
            //     if (err) console.log(err, err.stack);
            //   });
            // }
            // if (bground) {
            //   const params2 = {
            //     Bucket: process.env.AWS_BUCKET,
            //     Key: `${isExpertExists.background_image.slice(-38)}`,
            //   };
            //   await s3.deleteObject(params2, (err, data) => {
            //     // eslint-disable-next-line no-console
            //     if (err) console.log(err, err.stack);
            //   });
            // }
          } else {
            await expert.create({
              idcustomer: id_customer,
              expert_rate_hour: requestbody.expert_rate_hour,
              expert_rate_minute: requestbody.expert_rate_hour/60,
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
              profileimage: imgProfile,
              background_image: bground,
              expertise: requestbody.expertise,
              language: requestbody.language,
              created_by: userReg.email,
              updated_by: userReg.email,
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

          const cekSession = await oauth_access_token.findOne({ where: { name: userReg.email } });
          if (cekSession) {
            await oauth_access_token.update({ id: token }, { where: { name: userReg.email } });
          } else {
            await oauth_access_token.create({
              id: token,
              user_id: userReg.id,
              client_id: userReg.id,
              name: userReg.email,
              revoked: false,
            });
          }

          req.id = id_customer;
          req.activity = 'login';
          req.session = 'active';
          req.expert = true;
          req.token = token;
          req.isBiodataFilled = true;
          console.log('Sukses Sampe Sini');

          const pathFile = './views/expert-registered.ejs';
          const { email } = userReg.email;
          const emailNotif = new Mailer(pathFile, email, 'Congratulation', {
            email,
          });
          emailNotif.send();
          console.log('email => ', emailNotif);

          next();
          // res.status(201).json({
          //     status: true,
          //     message: `idcustomer ${id_customer}`
          // })
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
    let cust;
    if (req.query.id) {
      const checkExpert = await expert.findByPk(req.query.id);
      cust = await customer.findByPk(checkExpert.idcustomer);
      if (!checkExpert || !cust) {
        return res.status(404).json({
          status: false,
          message: 'not found',
          data: 'no data temporary',
        });
      }
    } else {
      cust = await customer.findOne({ where: { email: req.id.email } });
    }
    try {
      const profileData = await expert.findOne({
        where: {
          idcustomer: cust.id,
        },
        include: {
          model: customer,
          as: 'expert_has_customer',
        },
      });
      const availExpert = await availability_expert.findAll({
        where: { idcustomer: cust.id },
        order: [
          ['available_day_id', 'ASC'],
          ['start_time', 'ASC'],
        ],
      });
      // eslint-disable-next-line arrow-body-style
      const resAvailExpert = availExpert
        ? availExpert.map((key) => ({
            id: key.id,
            available_day: key.available_day,
            start_time: key.start_time,
            finish_time: key.finish_time,
            idcustomer: key.idcustomer,
            available_day_id: key.available_day_id,
            createdAt: key.createdAt,
            updatedAt: key.updatedAt,
          }))
        : [];
      const language = [];
      const dexpertise = [];
      const prom1 = profileData.language
        ? profileData.language.split(',').map(async (l) => {
            const checkLang = await master_language.findOne({ where: { id: l }, attributes: ['id', 'language'] });
            if (checkLang) {
              language.push(checkLang);
            }
          })
        : [];
      const prom2 = profileData.expertise
        ? profileData.expertise.split(',').map(async (exp) => {
            const checkExp = await expertise.findOne({ where: { id: exp, status: 1 }, attributes: ['id', 'expertisename'] });
            if (checkExp) {
              dexpertise.push(checkExp);
            }
          })
        : [];
      await Promise.all(prom1);
      await Promise.all(prom2);
      res.status(200).json({
        status: true,
        fname: profileData.expert_has_customer.fname,
        lname: profileData.expert_has_customer.lname,
        email: profileData.expert_has_customer.email,
        birthdate: profileData.expert_has_customer.birthdate,
        profileData: {
          id: profileData.id,
          idcustomer: profileData.idcustomer,
          block_status_cust: profileData.block_status_cust,
          custsignupdate: profileData.custsignupdate,
          is_verified: profileData.is_verified,
          city: profileData.city,
          country: profileData.country,
          is_expert: profileData.is_expert,
          is_expert_time: profileData.is_expert_time,
          block_status_exp: profileData.block_status_exp,
          expert_about: profileData.expert_about,
          profileimage: profileData.profileimage ? profileData.profileimage : null,
          profile_headline: profileData.profile_headline,
          language,
          expertise: dexpertise,
          currency: profileData.currency,
          expert_rate_minute: profileData.expert_rate_minute,
          expert_rate_hour: profileData.expert_rate_hour,
          lastrateupdate: profileData.lastrateupdate,
          background_image: profileData.background_image ? profileData.background_image : null,
          avg_rating: profileData.avg_rating,
          total_call: profileData.total_call,
          total_review: profileData.total_review,
          top_review: profileData.top_review,
          note_1: profileData.note_1,
          note_2: profileData.note_2,
          note_3: profileData.note_3,
          referal_code: profileData.referal_code,
          referred_by: profileData.referred_by,
          created_by: profileData.created_by,
          updated_by: profileData.updated_by,
          createdAt: profileData.createdAt,
          updatedAt: profileData.updatedAt,
        },
        availExpert: {
          is_everyday: availExpert.length ? availExpert[0].is_everyday : false,
          availability_expert: resAvailExpert || [],
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
    } catch (error) {
      res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  }

  async changeImage(req, res) {
    const cfg = {
      secretAccessKey: process.env.SECRET_ACCESS_KEY,
      accessKeyId: process.env.ACCESS_KEY_ID,
      region: process.env.REGION,
    };
    aws.config.update(cfg);
    const s3 = new aws.S3({});
    const image = [];
    // if (req.body.profileimage) {
    //   const type = req.body.profileimage.split(';')[0].split('/')[1];
    //   if (type === 'jpg' || type === 'jpeg' || type === 'png') {
    //     image.push({
    //       contentType: `image/${type}`,
    //       imageKey: `profile/${Date.now()}${Math.round(Math.random() * 1e9)}.${type}`,
    //       buffer: new Buffer.from(req.body.profileimage.replace(/^data:image\/\w+;base64,/, ''), 'base64'),
    //     });
    //   }
    // }
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
    const id_expert = await customer.findOne({ where: { email: req.id.email } });
    const cekProfile = await expert.findOne({ where: { idcustomer: id_expert.id } });
    try {
      if (cekProfile) {
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
          // if (imgURL[0].includes('profile')) {
          //   imgProfile = imgURL[0];
          // } else
          if (imgURL[0].includes('background')) {
            bground = imgURL[0];
          }
          // if (imgURL[1].includes('profile')) {
          //   imgProfile = imgURL[1];
          // } else if (imgURL[1].includes('background')) {
          //   bground = imgURL[1];
          // }
        }
        await expert.update({ background_image: bground }, { where: { idcustomer: id_expert.id } });
        // if (imgProfile) {
        //   const params = {
        //     Bucket: process.env.AWS_BUCKET,
        //     Key: `${cekProfile.profileimage.slice(-35)}`,
        //   };
        //   await s3.deleteObject(params, (err, data) => {
        //     // eslint-disable-next-line no-console
        //     if (err) console.log(err, err.stack);
        //   });
        // }
        if (bground) {
          const params2 = {
            Bucket: process.env.AWS_BUCKET,
            Key: `${cekProfile.background_image.slice(-38)}`,
          };
          await s3.deleteObject(params2, (err, data) => {
            // eslint-disable-next-line no-console
            if (err) console.log(err, err.stack);
          });
        }
        res.status(201).json({
          status: true,
          message: 'update success',
          backgroundimage: bground,
        });
        return;
      }
      res.status(401).json({
        status: false,
        message: 'user not found',
      });
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
      expert.update({ profile_headline }, { where: { idcustomer: id_expert.id } });
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

  async getConfigMinimumRate(req, res) {
    try {
      const minimum_rate = await config_session_time.findOne({ where: { id: 1 } });

      res.status(200).json({ data: minimum_rate });
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

module.exports = new ExpertController();
