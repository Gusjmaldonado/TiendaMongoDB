const Product = require('../models/products.model')

const getProducts = async (req, res) => {
    const products = await Product.find();
    res.json(products)
}

const getProductById = async (req, res) => {
    const { idproducto } = req.params;

    const product = await Product.findById(idproducto)
    res.json(product)
}


const postProduct = async (req, res) => {
    const newProduct = await Product.create(req.body)
    res.json(newProduct)
}

const editPtoduct = async (req, res) => {
    const { idproducto } = req.params

    const product = await Product.findByIdAndUpdate(idproducto, req.body, { new: true })
    res.json(product)

}

const removeProduct = async (req, res) => {
    const { idproducto } = req.params

    const productDeleted = await Product.findByIdAndDelete(idproducto)
    res.json(productDeleted)
}


module.exports = {
    getProducts, postProduct, getProductById, editPtoduct, removeProduct
}