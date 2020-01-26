const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const db = require('../db')

const dataController = require('./controllers/data')

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  // 'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
})
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// db.connect('mongodb://mongo:27017/gate', (err) => {
db.connect('mongodb://127.0.0.1:27017/gate', (err) => {
  if (err) return console.log(err)

  app.listen(3012, () => {
    console.log('API app started!')
  })
})

app.get('/places', dataController.getPlaces)

app.get('/', (req, res) => {
  res.send('What did u want to see here?')
})