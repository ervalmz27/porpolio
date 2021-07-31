const { clients } = require(".");

class Elastic {
    constructor(type) {
        this.clients = clients
        this.index = type
        this.type = type
    }

    create(body, id) {
        return this.clients.create({
            index: this.index,
            id,
            type: this.type,
            body
        })
    }

    delete(id) {
        return this.clients.delete({
            index: this.index,
            id,
            type: this.type
        })
    }

    createIndex() {
        return this.clients.indices.create({
            index: this.index
        })
    }

    deleteIndex() {
        return this.clients.indices.delete({
            index: this.index
        })
    }

    find(body) {
        return this.clients.search({
            index: this.index,
            type: this.type,
            body
        })
    }
}

module.exports = {
    Elastic
}