const ELASTIC_SEARCH_URL = process.env.ELASTIC_SEARCH_URL
const elasticsearch = require('@elastic/elasticsearch')

module.exports = new elasticsearch.Client({
    node: ELASTIC_SEARCH_URL,
    log: 'trace',
    apiVersion: '7.x'
})

