const Product = require("../Models/productModel");

exports.addProduct = async (req, res) => {
  try {
    const { title, description, subCategory } = req.body;

    if (!title || !subCategory) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    let variants = [];
    if (req.body.variants) {
      variants = JSON.parse(req.body.variants);
    }


    const images = req.files?.map((file) => file.filename) || [];

    const product = await Product.create({
      title,
      description,
      subCategory,
      variants,
      images,
      user: req.user?.id, 
    });

    res.status(201).json({
      message: "Product created",
      product,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" })
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find() .populate("subCategory", "name")
      .sort({ createdAt: -1 })

    res.status(200).json({ products })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Server error" })
  }
}

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("subCategory", "name")
      .populate("user", "name email");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};