const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();
const dbconfig = require("./config/dbconfig");

app.listen(port, () => console.log(`NODE JS SERVER IS STARTED AT ${port}`));
