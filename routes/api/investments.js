const express = require('express');
const router = express.Router();
const investmentCtrl = require('../../controllers/investments');

// Route handler for POSTing a new order. Full address will be POST /api/orders
router.post('/', investmentCtrl.create)

module.exports = router;