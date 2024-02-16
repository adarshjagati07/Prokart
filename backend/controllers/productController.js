import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

// @desc Fetch all Products
// @route GET /api/products\
// @access Public
const getProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({});
	res.json(products);
});

// @desc   Fetch a Product
// @route  GET /api/products\:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);
	if (product) {
		return res.json(product);
	} else {
		res.status(404);
		throw new Error("Resource not Found");
	}
});

//@desc   Update a Product
//@route  PUT/api/product/:id/edit
//@access Private/admin
const updateProduct = asyncHandler(async (req, res) => {
	const { name, price, description, image, brand, category, countInStock } = req.body;

	const product = await Product.findById(req.params.id);

	if (product) {
		product.name = name;
		product.price = price;
		product.description = description;
		product.image = image;
		product.brand = brand;
		product.category = category;
		product.countInStock = countInStock;

		const updatedProduct = await product.save();

		res.status(200).json(updatedProduct);
	} else {
		res.status(404);
		throw new Error("Product not found");
	}
});

// @desc   Create Product
// @route  POST /api/products\
// @access Private/admin
const createProduct = asyncHandler(async (req, res) => {
	const product = new Product({
		name: "Sample Name",
		price: 0,
		user: req.user._id,
		image: "/images/sample.jpg",
		brand: "Sample brand",
		category: "Sample Category",
		countInStock: "0",
		numReviews: 0,
		description: "Sample description"
	});

	const createdProduct = await product.save();
	res.status(200).json(createdProduct);
});

//@desc   Delete a Product
//@route  DELETE/api/product/:id
//@access Private/admin
const deleteProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (product) {
		await Product.deleteOne({ _id: product._id });
		res.status(200).json({ message: "Product deleted" });
	} else {
		res.status(404);
		throw new Error("Product not found");
	}
});

export { getProducts, getProductById, createProduct, updateProduct, deleteProduct };
