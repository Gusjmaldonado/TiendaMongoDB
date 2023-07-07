const request = require('supertest')
const mongoose = require('mongoose');

const app = require('../../src/app');
const Product = require('../../src/models/products.model')


describe('API de products', () => {

    beforeAll(async () => {
        await mongoose.connect('mongodb://127.0.0.1:27017/idtienda')
    })

    afterAll(async () => {
        await mongoose.disconnect()
    })

    describe('GET /api/products', () => {

        let response;
        beforeAll(async () => {
            response = await request(app).get('/api/products').send();
        })

        it('deberia devolver status 200', async () => {

            expect(response.statusCode).toBe(200)

        });

        it('deberia devolver un json', () => {

            expect(response.headers['content-type']).toContain('application/json')
        })

        it('deberia devolver un array', () => {

            expect(response.body).toBeInstanceOf(Array)
        })

    });

    describe('POST /api/products', () => {

        let response;
        const body = {
            name: 'tucarro',
            description: 'robado pero vendible',
            price: 15,
            department: 'callejuela',
            available: true,
            stock: 5
        }
        beforeAll(async () => {
            response = await request(app).post('/api/products').send(body);
        })

        afterAll(async () => {
            await Product.deleteMany({ department: 'callejuela' })
        })

        it('deberia estar bien la welta', () => {
            expect(response.statusCode).toBe(200);
            expect(response.header['content-type']).toContain('application/json')
        })

        it('deberia tener el id definido', () => {
            expect(response.body._id).toBeDefined();
        })

        it('deberia insertar los datos del body', () => {
            expect(response.body.name).toBe(body.name)
        })

    })


    describe('PUT /api/products/IDPRODUCT', () => {

        const body = {
            name: 'tucarro',
            description: 'robado pero vendible',
            price: 15,
            department: 'callejuela',
            available: true,
            stock: 5
        }

        let product;
        let response;

        beforeAll(async () => {
            product = await Product.create(body);
            response = await request(app).put(`/api/products/${product._id}`).send({
                name: 'tuTelefono',
                price: 10,
                stock: 20
            })
        })

        afterAll(async () => {
            await Product.findByIdAndDelete(product._id)
        })

        it('deberia funcionar la url', () => {
            expect(response.statusCode).toBe(200)
            expect(response.headers['content-type']).toContain('application/json')
        })

        it('deberia mostrar las modificaciones en la BD', () => {
            expect(response.body.name).toBe('tuTelefono')
            expect(response.body.price).toBe(10)
            expect(response.body.stock).toBe(20)
        })

    })

    describe('DELETE /api/products/IDPRODUCT', () => {

        const body = {
            name: 'tucarro',
            description: 'robado pero vendible',
            price: 15,
            department: 'callejuela',
            available: true,
            stock: 5
        }

        let product;
        let response;

        beforeAll(async () => {
            product = await Product.create(body);
            response = await request(app).delete(`/api/products/${product._id}`).send()
        })

        it('deberia funcionar la url', () => {
            expect(response.statusCode).toBe(200)
            expect(response.headers['content-type']).toContain('application/json')
        })

        it('el producto no debe estar en la BD', async () => {
            const deletedProduct = await Product.findById(product._id)
            expect(deletedProduct).toBeNull()

        })

    })

});

//toBe es una igualdad estricta
//toContain
//toBeInstanceOf