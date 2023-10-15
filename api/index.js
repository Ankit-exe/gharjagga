const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();
const dbconfig = require("./config/dbconfig");
const userRouter = require('./routes/user.route')

app.use("/api/user", userRouter);

app.listen(port, () => console.log(`NODE JS SERVER IS STARTED AT ${port}`));

