const User = require("../models/User");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/verifyToken");
const expressAsyncHandler = require("express-async-handler");


const router = require("express").Router();

// router.get("/test",(req,res)=>{
//   res.send("userTest is successful")

// })

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, expressAsyncHandler(async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  
}));

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, expressAsyncHandler(async (req, res) => {
 
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted...");
 
}));

//GET USER
router.get("/find/:id", verifyTokenAndAdmin, expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
 
}));

//GET ALL USER
router.get("/", verifyTokenAndAdmin, expressAsyncHandler(async (req, res) => {
  const query = req.query.new;
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    res.status(200).json(users);
  
}));

//GET USER STATS

router.get("/stats", verifyTokenAndAdmin, expressAsyncHandler(async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data)
  
}));



module.exports = router;
