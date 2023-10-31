const express = require('express');
const verifyToken = require('../utils/verifyuser.js');
const {
  createListing,
  deleteListing,
} = require("../controller/listing.controller.js");

const router = express.Router();

router.post('/create', verifyToken ,createListing );
router.delete('/delete/:id' , verifyToken , deleteListing);


module.exports = router;