const express = require('express');

const app = express();

app.use(express.json())

app.get('/', (req, res) => {
    req.send('esta claro')
})
app.use('/api', require('./routes/api'))


module.exports = app; 