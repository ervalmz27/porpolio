// const { Elastic } = require("../../../services/elasticsearch/elasticsearch")

class SearchController {
    // async listing(req, res) {
    //     try {
    //         const { name, topic_id, category_id, category_name, topic_name, tags, content_description, status } = req.query
    //         const must = []

    //         if (name) {
    //             must.push({
    //                 wildcard: {
    //                     title_content: `*${name}*`
    //                 }
    //             })
    //         }

    //         if (topic_id) {
    //             must.push({
    //                 match: {
    //                     idTopic: topic_id
    //                 }
    //             })
    //         }

    //         if (category_id) {
    //             must.push({
    //                 match: {
    //                     idcategory: category_id
    //                 }
    //             })
    //         }

    //         if (category_name) {
    //             must.push({
    //                 wildcard: {
    //                     categoryname: `*${category_name}*`
    //                 }
    //             })
    //         }

    //         if (topic_name) {
    //             must.push({
    //                 wildcard: {
    //                     topicname: `*${topic_name}*`
    //                 }
    //             })
    //         }

    //         if (tags) {
    //             must.push({
    //                 wildcard: {
    //                     tags: `*${tags}*`
    //                 }
    //             })
    //         }

    //         if (content_description) {
    //             must.push({
    //                 wildcard: {
    //                     content_desc: `*${content_description}*`
    //                 }
    //             })
    //         }

    //         if (status) {
    //             must.push({
    //                 match: {
    //                     status
    //                 }
    //             })
    //         }

    //         const elastic = new Elastic('expert_listing')
    //         const search = await elastic.find({
    //             query: {
    //                 bool: {
    //                     filter: {
    //                         bool: {
    //                             must
    //                         }
    //                     }
    //                 }
    //             }
    //         })

    //         res.json({
    //             status: true,
    //             data: search.hits ? search.hits.hits : []
    //         })
    //     } catch (error) {
    //         res.status(500).json({
    //             status: false,
    //             message: error.message
    //         })
    //     }
    // }

    // async categories(req, res) {
    //     try {
    //         const { category_name, category_desc, status } = req.query
    //         const must = []

    //         if (category_name) {
    //             must.push({
    //                 wildcard: {
    //                     category_name: `*${category_name}*`
    //                 }
    //             })
    //         }

    //         if (category_desc) {
    //             must.push({
    //                 wildcard: {
    //                     desc: `*${category_desc}*`
    //                 }
    //             })
    //         }

    //         if (status) {
    //             must.push({
    //                 match: {
    //                     Status: status
    //                 }
    //             })
    //         }

    //         const elastic = new Elastic('categories')
    //         const search = await elastic.find({
    //             query: {
    //                 bool: {
    //                     filter: {
    //                         bool: {
    //                             must
    //                         }
    //                     }
    //                 }
    //             }
    //         })

    //         res.json({
    //             status: true,
    //             data: search.hits ? search.hits.hits : []
    //         })
    //     } catch (error) {
    //         res.status(500).json({
    //             status: false,
    //             message: error.message
    //         })
    //     }
    // }

    // async topics(req, res) {
    //     try {
    //         const { topic_name, topic_desc, category_name, status } = req.query
    //         const must = []

    //         if (topic_name) {
    //             must.push({
    //                 wildcard: {
    //                     topic_name: `*${topic_name}*`
    //                 }
    //             })
    //         }

    //         if (topic_desc) {
    //             must.push({
    //                 wildcard: {
    //                     topic_desc: `*${topic_desc}*`
    //                 }
    //             })
    //         }

    //         if (category_name) {
    //             must.push({
    //                 wildcard: {
    //                     category_name: `*${category_name}*`
    //                 }
    //             })
    //         }

    //         if (status) {
    //             must.push({
    //                 match: {
    //                     Status: status
    //                 }
    //             })
    //         }

    //         const elastic = new Elastic('topics')
    //         const search = await elastic.find({
    //             query: {
    //                 bool: {
    //                     filter: {
    //                         bool: {
    //                             must
    //                         }
    //                     }
    //                 }
    //             }
    //         })

    //         res.json({
    //             status: true,
    //             data: search.hits ? search.hits.hits : []
    //         })
    //     } catch (error) {
    //         res.status(500).json({
    //             status: false,
    //             message: error.message
    //         })
    //     }
    // }

    // async tags(req, res) {
    //     try {
    //         const { tag_name, notes, status } = req.query
    //         const must = []

    //         if (tag_name) {
    //             must.push({
    //                 wildcard: {
    //                     tag_name: `*${tag_name}*`
    //                 }
    //             })
    //         }

    //         if (notes) {
    //             must.push({
    //                 wildcard: {
    //                     notes: `*${notes}*`
    //                 }
    //             })
    //         }

    //         if (status) {
    //             must.push({
    //                 match: {
    //                     status
    //                 }
    //             })
    //         }

    //         const elastic = new Elastic('tags')
    //         const search = await elastic.find({
    //             query: {
    //                 bool: {
    //                     filter: {
    //                         bool: {
    //                             must
    //                         }
    //                     }
    //                 }
    //             }
    //         })

    //         res.json({
    //             status: true,
    //             data: search.hits ? search.hits.hits : []
    //         })
    //     } catch (error) {
    //         res.status(500).json({
    //             status: false,
    //             message: error.message
    //         })
    //     }
    // }
}

module.exports = new SearchController()