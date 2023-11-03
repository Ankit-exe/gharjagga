const express = require("express");

const __dirname = path.resolve();

const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();
const cookieParser = require("cookie-parser");
app.use(express.json());
app.use(cookieParser());
const path = require('path');

const dbconfig = require("./config/dbconfig");
const userRouter = require("./routes/user.route");
const authRouter = require("./routes/auth.route");
const createListing = require("./routes/listing.route");


app.listen(port, () => console.log(`NODE JS SERVER IS STARTED AT ${port}`));


app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", createListing);

app.use(express.static(path.join(__dirname , '/client/dist')));

app.get('*' ,(req,res) =>
{
  res.sendFile(path.join(__dirname,'client' , 'dist' , 'index.html'));
})

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
