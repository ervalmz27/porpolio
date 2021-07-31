const { Elastic } = require('./elasticsearch')
const { expert_listing, topic, category, tags } = require('../../models');

const migrate = async () => {
    const [categories, tag, topics, expertListing] = await Promise.all([
        category.findAll(),
        tags.findAll(),
        topic.findAll(),
        expert_listing.findAll()
    ])

    const categoryEs = new Elastic('categories')
    const tagsEs = new Elastic('tags')
    const topicEs = new Elastic('topics')
    const expertListingEs = new Elastic('expert_listing')

    await Promise.all([
        categoryEs.createIndex().catch(() => {}),
        tagsEs.createIndex().catch(() => {}),
        topicEs.createIndex().catch(() => {}),
        expertListingEs.createIndex().catch(() => {})
    ])

    await Promise.all([
        categories.map(async result => {
            const { id, ...data } = result.toJSON()
            return categoryEs.create(data, id).catch(() => {})
        }),
        tag.map(async result => {
            const { id, ...data } = result.toJSON()
            return tagsEs.create(data, id).catch(() => {})
        }),
        topics.map(async result => {
            const { id, ...data } = result.toJSON()
            return topicEs.create(data, id).catch(() => {})
        }),
        expertListing.map(async result => {
            const { id, ...data } = result.toJSON()
            return expertListingEs.create(data, id).catch(() => {})
        })
    ])
}

migrate()