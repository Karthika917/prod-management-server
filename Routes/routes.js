const express = require('express')
const userController = require('../Controllers/userController')
const categoryController = require('../Controllers/categoryController')
const jwtmiddle = require('../Middlewares/jwtMiddleware')
const subcategoryController = require('../Controllers/subcategoryController')
const productController = require('../Controllers/productController')
const upload = require('../Middlewares/multerMiddleware')

const router = express.Router()

router.post('/signup',userController.signup)
router.post('/login',userController.login)

router.post("/add-category",jwtmiddle, categoryController.addCategory);
router.get("/get-category",jwtmiddle, categoryController.getCategories);

router.post("/add-subcategory",jwtmiddle,subcategoryController.addSubCategory)
router.get("/get-subcategory",jwtmiddle,subcategoryController.getSubCategories)

router.post("/add-product",jwtmiddle,upload.array("images", 5),productController.addProduct);
router.get("/get-products", jwtmiddle, productController.getProducts);

router.get("/product/:id",jwtmiddle,productController.getProductById);

router.put("/product/:id",jwtmiddle, upload.array("images"), productController.updateProduct);


module.exports = router