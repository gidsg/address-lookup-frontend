const express = require('express')
const router = express.Router()
const request = require('sync-request');

// Route index page
router.get('/', function (req, res) {
  res.render('index')
})

router.get('/search', function (req, res) {
  console.log(req.query)
  //strip non populated keys
  Object.keys(req.query).forEach((key) => (!req.query[key]) && delete req.query[key])
  //remove limit if only postcode populated
  if (Object.keys(req.query).length == 2 && Object.keys(req.query).includes("postcode")) {
  delete req.query.limit  
  }

  if (Object.keys(req.query).length == 3 && Object.keys(req.query).includes("postcode") && Object.keys(req.query).includes("town") ) {
    delete req.query.limit  
    delete req.query.town 
    }

  const api_request = request('GET', 'http://localhost:9022/v2/uk/addresses', {
  'headers': {
    'X-LOCALHOST-Origin': 'test'
  },
  'qs': req.query
});

const api_response = JSON.parse(api_request.getBody('utf-8'))

  res.render('search', {api_response: api_response, api_key: process.env.GOOGLE_MAPS_API_KEY} )
})

// Add your routes here - above the module.exports line

module.exports = router
