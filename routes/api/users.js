const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/users');

// POST /api/users/signup
router.post('/signup', usersCtrl.create);
// POST /api/users/login
router.post('/signin', usersCtrl.signin);

module.exports = router;