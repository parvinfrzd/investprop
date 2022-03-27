const express = require('express');
const router = express.Router();
const twitterCtrl = require('../../controllers/twitter');

// Route handler for POSTing a new order. Full address will be POST /api/orders
router.post('/', twitterCtrl.searchTweets)
router.get('/',twitterCtrl.indexTweets)
module.exports = router;