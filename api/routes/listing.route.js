const express = require('express');
const verifyToken = require('../utils/verifyuser.js');
const { createListing } = require('../controller/listing.controller.js');

const router = express.Router();

router.post('/create', verifyToken ,createListing )

module.exports = router;