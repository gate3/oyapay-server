var express = require('express');
var router = express.Router();

const adminRoutes = require('./admin')
const agentRoutes = require('./agent')

/* GET home page. */
router.all('/*', function(req, res, next) {
  // I am routing it through this file in case i need to check for api key
  next()
});

//Admin routes
router.post('/admin/signup', adminRoutes.signUp)

//Merchant routes
router.post('/agent/signup', agentRoutes.signUp)



module.exports = router;
