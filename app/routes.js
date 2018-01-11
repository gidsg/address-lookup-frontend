const express = require('express')
const router = express.Router()
const request = require('sync-request');

// Route index page
router.get('/', function (req, res) {
  res.render('index')
})

router.post('/search', function (req, res) {
  //strip non populated keys
  Object.keys(req.body).forEach((key) => (!req.body[key]) && delete req.body[key])
  //remove limit if only postcode populated
  if (Object.keys(req.body).length == 2 && Object.keys(req.body).includes("postcode")) {
  delete req.body.limit  
  }

  if (Object.keys(req.body).length == 3 && Object.keys(req.body).includes("postcode") && Object.keys(req.body).includes("town") ) {
    delete req.body.limit  
    delete req.body.town 
    }
    
  const api_request = request('GET', 'http://localhost:9022/v2/uk/addresses', {
  'headers': {
    'X-LOCALHOST-Origin': 'test'
  },
  'qs': req.body
});

const api_response = JSON.parse(api_request.getBody('utf-8'))

  res.render('search', {api_response: api_response} )
})

// Add your routes here - above the module.exports line

module.exports = router
