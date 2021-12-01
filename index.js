const esClient = require('./elastic')
const mongoose = require('mongoose')
const searchSchema = new mongoose.Schema({}, {strict: false}) // with strict set to false, no schema is enforced
const express = require('express')
const app = express()
const db = require('./db')
const Search = mongoose.model('Search', searchSchema)
const { createRecord } = require('./utils')
const bodyParser = require('body-parser')

esClient.ping({
    requestTimeout: 3000
}, function (error){
    if(error) {
        console.trace('elastic cluster is down')
    } else {
        console.log('All is well')
    }
})

app.use(bodyParser.json())

// Use this to seed both the mongo database and elasticsearch
app.get('/seed/:number', async (req, res) => {
    const dbRecords = []
    const esRecords = []
    for (let i = 1; i<= req.params.number; i++){
        const record = createRecord(i)
        dbRecords.push({...record})
        esRecords.push(
            { index: { _index: 'suppliers', _type: 'details', _id: i }},
            {...record}
        )
    }

    try {
        const [dbResult, esResult] = await Promise.all([
            Search.collection.insertMany(dbRecords),
            esClient.bulk({
                body: esRecords,
                refresh: true
            })
        ])

        res.json([ dbResult, esResult.body])

    } catch (err) {
        console.log("ERROR: ", err)
        res.send()
    }
})

// Example of how to construct a query from querystring parameters
app.get('/orfind', async (req, res) => {
    const constructQuery = Object.entries(req.query).reduce((acc, [key, value]) => {
        acc['$and'].push({[key]:{ $in: value.split(',')}})
        return acc
    }, {$and: []})
    const results = await Search.find(constructQuery)
    res.json(results)
})

// Example of how to construct a query from querystring parameters
app.get('/andfind', async (req, res) => {
    const constructQuery = Object.entries(req.query).reduce((acc, [key, value]) => {
        acc['$and'].push({[key]:{ $all: value.split(',')}})
        return acc
    }, {$and: []})
    const results = await Search.find(constructQuery)
    res.json(results)
})

// Add a mongo query directly into the body of the request (examples in the demo-queries folder)
app.post('/mongo/find', async (req, res) => {
    try {
        const results = await Search.find(req.body)
        res.send(results)
    } catch (err) {
        res.send(err)
    }
})

// Add an elasticsearch query directly into the body of the request (examples in the demo-queries folder)
app.post('/elastic/find', async (req, res) => {
    try {
        const result = await esClient.search({
            index: 'suppliers',
            body: {
                query: req.body
            }
        })
        res.json(result)
    } catch (err) {
        res.send(err)
    }
})

const init = async () => {
    await db
    app.listen(4000, () => {
        console.log('Listening on 4000')
    })
}

init()