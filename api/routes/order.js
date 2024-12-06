const Order = require("../models/Order");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/verifyToken");
const expressAsyncHandler = require("express-async-handler");


const router = require("express").Router();

//CREATE

router.post("/", verifyToken, expressAsyncHandler(async (req, res) => {
  const newOrder = new Order(req.body);


  const savedOrder = await newOrder.save();
  res.status(200).json(savedOrder);

}));

//UPDATE
router.put("/:id", verifyTokenAndAdmin, expressAsyncHandler(async (req, res) => {

  const updatedOrder = await Order.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  );
  res.status(200).json(updatedOrder);

}));

//DELETE
router.delete("/:id", verifyTokenAndAdmin, expressAsyncHandler(async (req, res) => {

  await Order.findByIdAndDelete(req.params.id);
  res.status(200).json("Order has been deleted...");

}));

//GET USER ORDERS
router.get("/find/:userId", verifyTokenAndAuthorization, expressAsyncHandler(async (req, res) => {

  const orders = await Order.find({ userId: req.params.userId });
  res.status(200).json(orders);

}));

// //GET ALL

router.get("/", verifyTokenAndAdmin, expressAsyncHandler(async (req, res) => {

  const orders = await Order.find();
  res.status(200).json(orders);

}));

// GET MONTHLY INCOME

router.get("/income", verifyTokenAndAdmin, expressAsyncHandler(async (req, res) => {
  const productId = req.query.pid;
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  const income = await Order.aggregate([
    {
      $match: {
        createdAt: { $gte: previousMonth },
        ...(productId && {
          products: { $elemMatch: { productId } },
        }),
      },
    },
    {
      $project: {
        month: { $month: "$createdAt" },
        sales: "$amount",
      },
    },
    {
      $group: {
        _id: "$month",
        total: { $sum: "$sales" },
      },
    },
  ]);
  res.status(200).json(income);

}));

module.exports = router;
