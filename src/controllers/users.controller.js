const Users = require('../models/users.model')

const getAll = async (req, res) => {


    try {
        //lo mas parecido a un JOIN es el populate, si no lo pongo, con solo el find funciona pero mnuestra el id del producto
        const users = await Users.find().populate('products')
        res.json(users)
    } catch (error) {
        res.json({ fata: error.message })
    }
}


const createUser = async (req, res) => {
    try {
        const newUser = await Users.create(req.body)
        res.json(newUser)
    } catch (error) {
        res.json({ fatal: error.message })
    }
}

const buyProducts = async (req, res) => {
    const { userId, productId } = req.params

    const user = await Users.findById(userId)
    user.products.push(productId)

    //para guardar la relacion de productos y usuarios, se utiliza el save, PORQUE ES UNA BD NO RELACIONAL
    await user.save()

    res.json(user)

}




module.exports = {
    createUser, buyProducts, getAll
}