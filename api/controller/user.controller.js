const Listing = require("../models/listing.model");
const User = require("../models/user.model");
const errorHandler = require("../utils/error");
const bcryptjs = require('bcryptjs');

const test = (req, res) => {
  res.json({
    message: "Hell",
  });
};

const updateUser = async (req,res,next) =>
{
  if(req.user.id !== req.params.id) return next(errorHandler(401,"You can only update your own account!"))

try {
  if(req.body.password)
  {
    req.body.password = bcryptjs.hashSync(req.body.password,10)
  }
  const updateUser = await User.findByIdAndUpdate(req.params.id,{
    $set:{
      username : req.body.username,
      email: req.body.email,
      password:req.body.password,
      avatar : req.body.avatar,
    },
  },{new: true})

  const {password,...others} = updateUser._doc

  res.status(200).json(others)


} catch (error) {
 next(error) 
}

}

const deleteUser = async (req,res,next) =>
{
  if(req.user.id !== req.params.id) return next(errorHandler(401,'You can only delete your account!'));
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie('access_token');
    res.status(200).json('User has been deleted...!');
  } catch (error) {
    next(error);
  }
}

const getUserListing = async (req,res,next) =>
{
  if(req.user.id === req.params.id)
  {
      try {
        const listing = await Listing.find({userRef : req.params.id});
        res.status(200).json(listing);
      } catch (error) {
        next(error);
      }
  }
  else{
    return next(errorHandler(401,'You can only view your listing!'));
  }
}

module.exports = {
  test,
  updateUser,
  deleteUser,
  getUserListing,
}
