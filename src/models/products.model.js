const { model, Schema } = require('mongoose')


const productSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    department: String,
    available: Boolean,
    stock: Number
}, { timestamps: true, versionKey: false })

//nos permite enlazar el modelo y schema
module.exports = model('product', productSchema)

