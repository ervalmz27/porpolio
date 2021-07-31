const { customer, expert, expert_listing, listing_review } = require('../../../models');

class ReviewController {
  async createReview(req, res) {
    const id_expert = await customer.findOne({
      where: {
        email: req.id.email,
      },
      include: {
        model: expert,
        as: 'customer_has_expert',
      },
    });
    const requestbody = req.body;
    const { idlisting } = req.params;

    const listingExpert = await expert_listing.findOne({
      where: {
        id: idlisting,
      },
    });
    // can't comment herself
    if (id_expert.id !== listingExpert.idCustomer) {
      try {
        await listing_review.create({
          idExpert: listingExpert.idexpert,
          idOrder: 1,
          idExpert_listing: idlisting,
          idcustomer: id_expert.id,
          rating: requestbody.rating,
          comment_rating: requestbody.comment_rating,
          is_hide: false,
          updated_by: id_expert.email,
        });
        res.status(201).json({
          status: true,
          message: 'review submitted',
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
      code: 'REV-INVALID',
      status: false,
      message: "can't comment yourself",
    });
  }

  async getReview(req, res) {
    try {
      const id_expert = await customer.findOne({
        where: {
          email: req.id.email,
        },
        include: {
          model: expert,
          as: 'customer_has_expert',
        },
      });

      const conditions = {};
      const {all, idExpert_listing} = req.query;
      if (!all) {
        conditions.idcustomer = id_expert.id;
      }

      if (idExpert_listing) {
        conditions.idExpert_listing = idExpert_listing;
      }

      const getAll = await listing_review.findAll({
        where: conditions
      });
      res.status(200).json({
        status: true,
        data: getAll,
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

  async getTwoReview(req, res) {
    try {
      const conds = {};
      const {idExpert_listing} = req.query;
      if (idExpert_listing) {
        conds.idExpert_listing = idExpert_listing;
      }
      const getAll = await listing_review.findAll({
        limit: 2,
        where: conds,
        order: [
          ['created_at', 'DESC'],
          ['rating', 'DESC'],
        ],
      });
      res.status(201).json({
        status: true,
        data: getAll,
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
}

module.exports = new ReviewController();
