const express = require('express');
const router = express.Router();
const investmentCtrl = require('../../controllers/searchInvestment');

// Route handler for POSTing a new order. Full address will be POST /api/orders
router.post('/', investmentCtrl.search)
router.get('/',investmentCtrl.index)
module.exports = router;