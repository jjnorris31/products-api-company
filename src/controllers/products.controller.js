import Product from '../models/Product';


export const createProduct = async (req, res) => {
	// destructuring
	const {name, category, price, imgURL} = req.body;
	// saving new product
	const newProduct = new Product({name, category, price, imgURL});
	const savedProduct = await newProduct.save();
	// response
	res.status(201).send(savedProduct);
}

export const getProducts = async (req, res) => {
	// get all the info
	res.status(200).send(await Product.find({}));
}

export const getProductById = async (req, res) => {
	const productId = req.params['productId'];
	res.status(200).send(await Product.find({_id: productId}));
}

export const updateProductById = async (req, res) => {
	const updatedProduct = await Product.findByIdAndUpdate(req.params['productId'], req.body, {
		// this flag retrieve the newest product not the older
		new: true
	});
	res.status(200).send(updatedProduct);
}

export const deleteProductById = async (req, res) => {
	await Product.findByIdAndDelete(req.params['productId']);
	res.status(204).send();
}