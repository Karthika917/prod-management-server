const Product = require("../Models/productModel");

//add product
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

//get products
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


// get product by id
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
}

// edit product

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const { title, description, subCategory } = req.body;

    
    let variants = [];
    if (req.body.variants) {
      try {
        variants = JSON.parse(req.body.variants);
      } catch (err) {
        return res.status(400).json({ message: "Invalid variants format" });
      }
    }

    
    let existingImages = [];
    if (req.body.existingImages) {
      try {
        existingImages = JSON.parse(req.body.existingImages);
      } catch (err) {
        return res.status(400).json({ message: "Invalid existingImages format" });
      }
    }

    
    const newImages = req.files?.map((file) => file.filename) || [];

   
    const finalImages = [...existingImages, ...newImages];

   
    const cleanedVariants = variants.map((v) => ({
      ram: v.ram,
      price: Number(v.price),
      qty: Math.max(1, Number(v.qty || 1)),
    }));

   
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        title,
        description,
        subCategory,
        variants: cleanedVariants,
        images: finalImages,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      message: "Product updated successfully",
      product: updatedProduct,
    });

  } catch (err) {
    console.log("UPDATE PRODUCT ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};