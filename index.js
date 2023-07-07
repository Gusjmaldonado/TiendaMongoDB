const http = require('http');
const app = require('./src/app');


require('dotenv').config();

require('./src/config/db')

const server = http.createServer(app);


const PORT = process.env.PORT || 3000;

server.listen(PORT);

server.on('listening', () => console.log(`servidor activau en el puerto ${PORT}`))