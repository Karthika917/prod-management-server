const SubCategory = require('../Models/subcategoryModel')

exports.addSubCategory = async (req, res) => {
  try {
    const { name, categoryId } = req.body;

    if (!name || !categoryId) {
      return res.status(400).json({ message: "All fields required" });
    }

    const subCategory = await SubCategory.create({
      name,
      category: categoryId,
    });

    res.status(201).json({
      message: "SubCategory created",
      subCategory,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
}

exports.getSubCategories = async (req, res) => {
  try {
    const subCategories = await SubCategory.find().populate("category");

    res.status(200).json({ subCategories });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};