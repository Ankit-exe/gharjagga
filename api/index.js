const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();
app.use(express.json());

const dbconfig = require("./config/dbconfig");
const userRouter = require('./routes/user.route');
const authRouter = require('./routes/auth.route');

app.use("/api/user", userRouter);
app.use('/api/auth', authRouter);

app.listen(port, () => console.log(`NODE JS SERVER IS STARTED AT ${port}`));

