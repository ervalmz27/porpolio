/* eslint-disable no-unused-vars */
/* eslint-disable new-cap */
const aws = require('aws-sdk');
const { Op } = require('sequelize');
const _ = require('lodash');
const { expert_listing, topic, category, expert } = require('../../../models');

class Search {

    async searchAll(req, res) {
        try {
            const params = req.query.q.toLowerCase();
            const data = await expert_listing.findAll({
                include: [{
                    model: expert,
                    as: 'expert',
                }],
                limit: req.query.q == null ? 0 : 10,
                where: {
                    title_content: { [Op.iLike]: `%${params}%` },
                    status: 1,
                },
            });
            Object.keys(data).forEach(key => {
                if (data[key].top_review) {
                    const topReview = data[key].top_review.replace(/(\r\n|\n|\r)/gm, "");
                    data[key].top_review = JSON.parse(topReview);
                }
            });
            const topics = await topic.findAll({
                limit: req.query.q == null ? 0 : 5,
                where: {
                    topic_name: { [Op.iLike]: `%${params}%` },
                    Status: 1,
                },
            });
            const categories = await category.findAll({
                limit: req.query.q == null ? 0 : 5,
                where: {
                    category_name: { [Op.iLike]: `%${params}%` },
                    Status: 1,
                },
            });

            return res.json({
                listing: data,
                topic: topics,
                kategori: categories
            });
        } catch (error) {
            res.status(500).json({
                Success: false,
                Message: error.message,
            });
        }
    }
}

module.exports = new Search();