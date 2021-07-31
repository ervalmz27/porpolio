/* eslint-disable no-unused-vars */
/* eslint-disable new-cap */
const aws = require('aws-sdk');
const { Op } = require('sequelize');
const { customer, expert, expert_listing, config_listing_sample, topic, category, listing_index } = require('../../../models');

class ListingController {
  async createListing(req, res) {
    const cfg = {
      secretAccessKey: process.env.SECRET_ACCESS_KEY,
      accessKeyId: process.env.ACCESS_KEY_ID,
      region: process.env.REGION,
    };
    aws.config.update(cfg);
    const s3 = new aws.S3({});
    let imgListingURL;
    let image;
    if (req.body.listing_image) {
      const type = req.body.listing_image.split(';')[0].split('/')[1];
      if (type === 'jpg' || type === 'jpeg' || type === 'png') {
        image = {
          contentType: `image/${type}`,
          imageKey: `listing/${Date.now()}${Math.round(Math.random() * 1e9)}.${type}`,
          buffer: new Buffer.from(req.body.listing_image.replace(/^data:image\/\w+;base64,/, ''), 'base64'),
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
        imgListingURL = upload.Location;
      }
    }

    const id_expert = await customer.findOne({
      where: { email: req.id.email },
      include: { model: expert, as: 'customer_has_expert' },
    });
    const requestbody = req.body;
    const dtopic = await topic.findOne({ where: { id: requestbody.idTopic } });
    try {
      if (dtopic) {
        const newlisting = await expert_listing.create({
          idexpert: id_expert.customer_has_expert.id,
          idCustomer: id_expert.id,
          idTopic: requestbody.idTopic,
          idcategory: dtopic.id_category,
          categoryname: dtopic.category_name,
          topicname: requestbody.topicname,
          tags: requestbody.tags,
          listing_image: imgListingURL,
          title_content: requestbody.title_content,
          content_desc: requestbody.content_desc,
          total_call: id_expert.customer_has_expert.total_call,
          status: 1,
          rate_per_minute: id_expert.customer_has_expert.expert_rate_minute,
          expert_name: `${id_expert.fname  } ${  id_expert.lname}`,
          updated_by: req.id.email,
          created_by: req.id.email,
        });

        res.status(201).json({
          status: true,
          message: 'listing created',
          data: newlisting,
        });
        return;
      }
      const params = {
        Bucket: process.env.AWS_BUCKET,
        Key: `${image.imageKey}`,
      };
      await s3.deleteObject(params, (err, data) => {
        // eslint-disable-next-line no-console
        if (err) console.log(err, err.stack);
      });
      res.status(404).json({
        status: false,
        message: 'topic not found',
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: error.message,
        data: 'no data temporary',
      });
    }
  }

  async updateListing(req, res) {
    const cfg = {
      secretAccessKey: process.env.SECRET_ACCESS_KEY,
      accessKeyId: process.env.ACCESS_KEY_ID,
      region: process.env.REGION,
    };
    aws.config.update(cfg);
    const s3 = new aws.S3({});
    let imgListingURL;
    let image;
    if (req.body.listing_image) {
      const type = req.body.listing_image.split(';')[0].split('/')[1];
      if (type === 'jpg' || type === 'jpeg' || type === 'png') {
        image = {
          contentType: `image/${type}`,
          imageKey: `listing/${Date.now()}${Math.round(Math.random() * 1e9)}.${type}`,
          buffer: new Buffer.from(req.body.listing_image.replace(/^data:image\/\w+;base64,/, ''), 'base64'),
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
        imgListingURL = upload.Location;
      }
    }
    const { idlisting } = req.params;
    const id_expert = await customer.findOne({
      where: { email: req.id.email },
      include: { model: expert, as: 'customer_has_expert' },
    });
    const cekListing = await expert_listing.findOne({ where: { id: idlisting } });
    if (cekListing == null) {
      res.status(401).json({
        status: false,
        message: 'listing not available',
      });
      return;
    }
    const requestbody = req.body;
    const dtopic = await topic.findOne({ where: { id: requestbody.idTopic } });
    if (cekListing.idCustomer === id_expert.id) {
      try {
        if (dtopic) {
          await expert_listing.update(
            {
              idexpert: id_expert.customer_has_expert.id,
              idCustomer: id_expert.id,
              idTopic: requestbody.idTopic,
              idcategory: dtopic.id_category,
              categoryname: dtopic.category_name,
              topicname: requestbody.topicname,
              tags: requestbody.tags,
              listing_image: imgListingURL,
              title_content: requestbody.title_content,
              content_desc: requestbody.content_desc,
              total_call: requestbody.total_call,
              status: requestbody.status,
              updated_by: req.id.email,
              created_by: req.id.email,
            },
            { where: { id: idlisting } }
          );
          if (imgListingURL) {
            const params = {
              Bucket: process.env.AWS_BUCKET,
              Key: `${cekListing.listing_image.slice(-35)}`,
            };
            await s3.deleteObject(params, (err, data) => {
              // eslint-disable-next-line no-console
              if (err) console.log(err, err.stack);
            });
          }
          res.status(201).json({
            status: true,
            message: 'listing updated',
          });
          return;
        }
        const params = {
          Bucket: process.env.AWS_BUCKET,
          Key: `${image.imageKey}`,
        };
        await s3.deleteObject(params, (err, data) => {
          // eslint-disable-next-line no-console
          if (err) console.log(err, err.stack);
        });
        res.status(404).json({
          status: false,
          message: 'topic not found',
        });
      } catch (error) {
        res.status(500).json({
          status: false,
          message: error.message,
          data: 'no data temporary',
        });
        return;
      }
    }
    res.status(401).json({
      code: 'LIST-INVALID',
      status: false,
      message: "doesn't belongs to you",
    });
  }

  async updateListingStatus(req, res) {
    const { idlisting } = req.params;
    const id_expert = await customer.findOne({
      where: { email: req.id.email },
      include: { model: expert, as: 'customer_has_expert' },
    });
    const cekListing = await expert_listing.findOne({ where: { id: idlisting } });
    const requestbody = req.body;
    if (cekListing.idCustomer === id_expert.id) {
      try {
        await expert_listing.update({ status: requestbody.status }, { where: { id: idlisting } });
        res.status(201).json({
          status: true,
          message: 'listing updated',
        });
        return;
      } catch (error) {
        res.status(500).json({
          status: false,
          message: error.message,
          data: 'no data temporary',
        });
        return;
      }
    }
    res.status(401).json({
      code: 'LIST-INVALID',
      status: false,
      message: "doesn't belongs to you",
    });
  }

  async getListingSample(req, res) {
    try {
      const sample = await config_listing_sample.findAll();
      res.status(200).json({
        sample,
      });
    } catch (error) {
      res.status(500).json({
        Success: false,
        Message: 'Data not available',
      });
    }
  }
  
  async updateVisitCountListing(req, res) {
    const { idlisting } = req.params;
    const cekListing = await expert_listing.findOne({ where: { id: idlisting } });
    if (cekListing) {
      try {
        await expert_listing.update({ visit_count: cekListing.visit_count+1 }, { where: { id: idlisting } });
        res.status(201).json({
          status: true,
          message: 'visit count listing updated',
        });
        return;
      } catch (error) {
        res.status(500).json({
          status: false,
          message: error.message,
          data: 'no data temporary',
        });
        return;
      }
    }
    res.status(404).json({
      status: false,
      message: 'listing not found',
    });
  }

  async getTopic(req, res) {
    try {
      const {id_category} = req.query;
      const conditions = {Status: 1};
      if (id_category) {
        conditions.id_category = id_category;
      }
      const dtopic = await topic.findAll({
        where: conditions,
      });
      res.status(200).json({
        topic: dtopic.map((item) => ({
          id: item.id,
          name: item.topic_name,
          status: item.status,
          topic_desc: item.topic_desc,
          id_category: item.id_category,
          category_name: item.category_name,
        })),
      });
    } catch (error) {
      res.status(500).json({
        Success: false,
        Message: 'Data not available',
      });
    }
  }

  async getLatestTopic(req, res) {
    const { last_update } = req.body;
    try {
      const dtopic = await topic.findAll({
        where: {
          updated_at: {
            [Op.gt]: last_update,
          },
        },
      });
      res.status(200).json({
        latest_update:
          dtopic.length > 0
            ? new Date(
                Math.max.apply(
                  null,
                  dtopic.map((item) => item.updated_at)
                )
              )
            : new Date(last_update),
        topic: dtopic,
      });
    } catch (error) {
      res.status(500).json({
        Success: false,
        Message: 'Data not available',
      });
    }
  }

  async updateVisitCountTopic(req, res) {
    const { idtopic } = req.params;
    const cekTopic = await topic.findOne({ where: { id: idtopic } });
    if (cekTopic) {
      try {
        await topic.update({ visit_count: cekTopic.visit_count+1 }, { where: { id: idtopic } });
        res.status(201).json({
          status: true,
          message: 'visit count topic updated',
        });
        return;
      } catch (error) {
        res.status(500).json({
          status: false,
          message: error.message,
          data: 'no data temporary',
        });
        return;
      }
    }
    res.status(404).json({
      status: false,
      message: 'topic not found',
    });
  }

  async getCategory(req, res) {
    try {
      const page = Number(req.query.page) || 0;
      const limit = 15;
      const offset = page ? ((page - 1) * limit) : 0;
      const dcategory = await category.findAndCountAll({
        order: [['id', 'desc']],
        limit,
        offset
      });
      const prev_page = page - 1 > 0 ? page - 1 : false;
      const next_page = dcategory.count > limit * page ? page + 1 : false;

      res.status(200).json({
        category: dcategory.rows,
        total_per_page: limit,
        current_page: page,
        total: dcategory.count,
        next_page,
        previous_page: prev_page
      });
    } catch (error) {
      res.status(500).json({
        Success: false,
        Message: 'Data not available',
      });
    }
  }

  async getLatestCategory(req, res) {
    const { last_update } = req.body;
    try {
      const dcategory = await category.findAll({
        where: {
          updated_at: {
            [Op.gt]: last_update,
          },
        },
      });
      res.status(200).json({
        latest_update:
          dcategory.length > 0
            ? new Date(
                Math.max.apply(
                  null,
                  dcategory.map((item) => item.updated_at)
                )
              )
            : new Date(last_update),
        category: dcategory,
      });
    } catch (error) {
      res.status(500).json({
        Success: false,
        Message: 'Data not available',
      });
    }
  }

  async updateVisitCountCategory(req, res) {
    const { idcategory } = req.params;
    const cekCategory = await category.findOne({ where: { id: idcategory } });
    if (cekCategory) {
      try {
        await category.update({ visit_count: cekCategory.visit_count+1 }, { where: { id: idcategory } });
        res.status(201).json({
          status: true,
          message: 'visit count category updated',
        });
        return;
      } catch (error) {
        res.status(500).json({
          status: false,
          message: error.message,
          data: 'no data temporary',
        });
        return;
      }
    }
    res.status(404).json({
      status: false,
      message: 'category not found',
    });
  }

  async getListingByIdExpert(req, res) {
    try {
      const list = await expert_listing.findAll({
        where: {
          idexpert: req.body.idExpert,
          status: {
            [Op.or]: [1, 2],
          },
        }
      })
      Object.keys(list).forEach(key => {
        if (list[key].top_review) {
          const topReview = list[key].top_review.replace(/(\r\n|\n|\r)/gm, "");
          list[key].top_review = JSON.parse(topReview);
        }
      });
      res.status(200).json({
        listing: list,
      });
    } catch (error) {
      res.status(500).json({
        Success: false,
        Message: 'Data not available',
      });
    }
  }

  async getListing(req, res) {
    try {
      const conditions = {};
      const {idcategory, idTopic} = req.query;
      const page = Number(req.query.page) || 1;
      const limit = 15;
      const offset = page ? ((page - 1) * limit) : 0;
      if (idcategory) {
        conditions.idcategory = { [Op.in]: idcategory.split(',')};
      }
      if (idTopic) {
        conditions.idTopic = { [Op.in]: idTopic.split(',')};
      }
      conditions.status = {
        [Op.or]: [1, 2],
      };
      const list = await expert_listing.findAndCountAll({
        where: conditions,
        order: [['id', 'desc']],
        limit,
        offset,
        include : [
          { model: expert, attributes: ['profileimage']},
          { model: listing_index, attributes: ['index_popular']}
        ],
      });
      Object.keys(list.rows).forEach((key) => {
        if (list.rows[key].top_review) {
          const topReview = list.rows[key].top_review.replace(/(\r\n|\n|\r)/gm, "");
          list.rows[key].top_review = JSON.parse(topReview);
        }
        if (!list.rows[key].listing_index) {
          list.rows[key].setDataValue('listing_index', {index_popular: 0});
        }
      });

      const prev_page = page - 1 > 0 ? page - 1 : false;
      const next_page = list.count > limit * page ? page + 1 : false;
      res.status(200).json({
        listing: list.rows,
        total_per_page: limit,
        current_page: page,
        total: list.count,
        next_page,
        previous_page: prev_page
      });
    } catch (error) {
      res.status(500).json({
        Success: false,
        Message: 'Data not available',
      });
    }
  }

  async getListingDetail(req, res) {
    try {
      const conditions = {};
      const {id} = req.params;
      conditions.status = {
        [Op.or]: [1, 2],
      };
      const list = await expert_listing.findByPk(id, {
        where: conditions,
        include : [{ model: expert, attributes: ['profileimage']}]
      });
      if (list.top_review) {
        const topReview = list.top_review.replace(/(\r\n|\n|\r)/gm, "");
        list.top_review = JSON.parse(topReview);
      }
      res.status(200).json({
        listing: list,
      });
    } catch (error) {
      res.status(500).json({
        Success: false,
        Message: 'Data not available',
      });
    }
  }
}

module.exports = new ListingController();
