const mongoose = require('mongoose');
require('dotenv').config();

const MONGOATLAS = process.env.MONGOATLAS;

//Conexión a la database de Mongo 
mongoose.connect(MONGOATLAS, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
})
    .then(()=> {
        console.log(`Database conectada a Atlas`);
    })
    .catch((error) => {
        console.log(`El error es: ${error}`)
    })
