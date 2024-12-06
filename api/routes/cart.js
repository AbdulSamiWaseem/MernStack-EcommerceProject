const Cart = require("../models/Cart");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/verifyToken");
const expressAsyncHandler = require("express-async-handler");


const router = require("express").Router();

//CREATE

router.post("/", verifyToken, expressAsyncHandler(async (req, res) => {
  const newCart = new Cart(req.body);


  const savedCart = await newCart.save();
  res.status(200).json(savedCart);

}));

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, expressAsyncHandler(async (req, res) => {

  const updatedCart = await Cart.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  );
  res.status(200).json(updatedCart);

}));

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, expressAsyncHandler(async (req, res) => {

  await Cart.findByIdAndDelete(req.params.id);
  res.status(200).json("Cart has been deleted...");

}));

//GET USER CART
router.get("/find/:userId", verifyTokenAndAuthorization, expressAsyncHandler(async (req, res) => {

  const cart = await Cart.findOne({ userId: req.params.userId });
  res.status(200).json(cart);

}));

// //GET ALL

router.get("/", verifyTokenAndAdmin, expressAsyncHandler(async (req, res) => {

  const carts = await Cart.find();
  res.status(200).json(carts);

}));

module.exports = router;
