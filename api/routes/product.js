const multer = require("multer");
const Product = require("../models/Product");
const fs = require('fs')
const path = require('path')

const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + '.jpg')
  }
})

const upload = multer({ storage: storage })

//CREATE

router.post("/", verifyTokenAndAdmin, upload.single('img'), async (req, res) => {
  const newProduct = new Product({
    ...req.body,
    img: req?.file?.path
  });

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    console.log('error productCreate: ', err);
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, upload.single('img'), async (req, res) => {
  console.log('res.body', req.body)
  console.log('res.body', req?.file?.path)
  try {
    const prev = await Product.findById(req.params.id)
    if (prev) {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            ...req.body,
            img: req?.file?.path
          },
        },
        { new: true }
      );

      //delete prev image
      if (req?.file?.path && prev.img) {
        fs.unlink(prev.img, (err) => console.log('deletion error', err))
      }

      res.status(200).json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET PRODUCT
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL PRODUCTS
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

//SEARCH BY TITLE PRODUCTS
router.get("/search-by-title/:title", async (req, res) => {
  try {
    const regex = new RegExp(req.params.title,'i')
    const products = await Product.find({
      title: {$regex:regex},
    }).select('_id title')
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
