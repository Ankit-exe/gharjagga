const express = require("express");
const  {test}  = require("../controller/user.controller.js");
const {updateUser} = require("../controller/user.controller.js");
const  verifyToken  = require("../utils/verifyuser.js");
const router = express.Router();

router.get("/test", test);
router.post("/update/:id",verifyToken,updateUser)

module.exports = router;
