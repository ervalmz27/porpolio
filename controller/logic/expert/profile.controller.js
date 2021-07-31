/* eslint-disable no-unused-vars */
/* eslint-disable new-cap */
const aws = require('aws-sdk');
const { customer, expert, availability_expert, expert_listing } = require('../../../models');

class ProfileController {
  async editProfileExpert(req, res) {
    const customerData = await customer.findOne({ where: { email: req.id.email } });
    // res.status(200).json(req.body);
    try {
      const cfg = {
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
        accessKeyId: process.env.ACCESS_KEY_ID,
        region: process.env.REGION,
      };
      aws.config.update(cfg);
      const s3 = new aws.S3({});
      let profileimage;
      let image;
      if (req.body.profileimage) {
        const type = req.body.profileimage.split(';')[0].split('/')[1];
        if (type === 'jpg' || type === 'jpeg' || type === 'png') {
          image = {
            contentType: `image/${type}`,
            imageKey: `profile/${Date.now()}${Math.round(Math.random() * 1e9)}.${type}`,
            buffer: new Buffer.from(req.body.profileimage.replace(/^data:image\/\w+;base64,/, ''), 'base64'),
          };
          const upload = await s3
            .upload({
              Bucket: process.env.AWS_BUCKET,
              Key: image.imageKey,
              Body: image.buffer,
              ContentEncoding: 'base64',
              ContentType: image.contentType,
              ACL: 'public-read',
            })
            .promise();
          profileimage = upload.Location;
        }
      }
      let editCustomerProfile;
      if (customerData) {
        editCustomerProfile = await customer.update(
          {
            fname: req.body.fname,
            lname: req.body.lname,
            birthdate: req.body.birthdate,
            idcity: req.body.idcity,
            city: req.body.city,
            idcountry: req.body.idcountry,
            country: req.body.country,
            is_verified: req.body.is_verified,
            is_expert: req.body.is_expert,
            profileimage,
          },
          { where: { email: req.id.email } }
        );
        if (profileimage) {
          const params = {
            Bucket: process.env.AWS_BUCKET,
            Key: `${customerData.profileimage.slice(-35)}`,
          };
          await s3.deleteObject(params, (err, data) => {
            // eslint-disable-next-line no-console
            if (err) console.log(err, err.stack);
          });
        }
      }
      let editExpertProfile;
      const checkExp = await expert.findOne({ where: { idcustomer: customerData.id } });
      if (checkExp) {
        editExpertProfile = await expert.update(
          {
            city: req.body.city,
            country: req.body.country,
            profile_headline: req.body.profile_headline,
            profileimage,
            expert_rate_hour: req.body.expert_rate_hour,
            expert_rate_minute: req.body.expert_rate_hour / 60,
          },
          { where: { idcustomer: customerData.id } }
        );
        if (profileimage) {
          const params = {
            Bucket: process.env.AWS_BUCKET,
            Key: `${checkExp.profileimage.slice(-35)}`,
          };
          await s3.deleteObject(params, (err, data) => {
            // eslint-disable-next-line no-console
            if (err) console.log(err, err.stack);
          });
        }
      }
      let editExpertListingProfile;
      const checkExpList = await expert_listing.findOne({ where: { idCustomer: customerData.id } });
      if (checkExpList) {
        editExpertListingProfile = await expert_listing.update(
          {
            expert_name: req.body.fname + ' ' + req.body.lname,
            rate_per_minute: req.body.expert_rate_hour / 60,
          },
          { where: { idCustomer: customerData.id } }
        );
      }

      if (editCustomerProfile && editExpertProfile && editExpertListingProfile) {
        res.status(201).json({
          status: 'OK',
          id_customer: customerData.id,
          message: 'profile updated',
        });
        return;
      }
    } catch (error) {
      res.status(400).json({
        code: 'FORMINVALID',
        success: false,
        message: error.message,
      });
    }
  }

  async getProfileExpert(req, res) {
    const id_expert = await customer.findOne({
      where: {
        email: req.id.email,
      },
    });
    try {
      const profileData = await expert.findOne({
        where: {
          idcustomer: id_expert.id,
        },
        include: {
          model: customer,
          as: 'expert_has_customer',
        },
      });
      const availExpert = await availability_expert.findAll({
        where: {
          idcustomer: id_expert.id,
        },
      });
      // eslint-disable-next-line arrow-body-style
      const resAvailExpert = availExpert.map((key) => {
        return {
          id: key.id,
          available_day: key.available_day,
          start_time: key.start_time,
          finish_time: key.finish_time,
          idcustomer: key.idcustomer,
          available_day_id: key.available_day_id,
          createdAt: key.createdAt,
          updatedAt: key.updatedAt,
        };
      });
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

  async updateExpertAbout(req, res) {
    try {
      if (req.body.expert_about === undefined || req.body.expert_about === null) {
        return res.status(400).json({
          Success: false,
          message: 'Expert About is required',
        });
      }
      await expert.update(req.body, {
        where: { idcustomer: req.id.email },
      });
      return res.status(201).json({
        Success: true,
        Message: `Id Customer ${req.id.email}`,
      });
    } catch (error) {
      res.status(500).json({
        Success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new ProfileController();
