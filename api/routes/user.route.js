const express = require("express");
const  {test, deleteUser , getUserListing}  = require("../controller/user.controller.js");
const {updateUser} = require("../controller/user.controller.js");
const  verifyToken  = require("../utils/verifyuser.js");
const router = express.Router();


router.get("/test", test);
router.post("/update/:id",verifyToken,updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);
router.get("/listing/:id", verifyToken , getUserListing);


module.exports = router;
