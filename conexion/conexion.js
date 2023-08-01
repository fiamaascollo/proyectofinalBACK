const mongoose = require('mongoose');
require('dotenv').config();

const MONGOLOCAL = process.env.MONGOLOCAL;

//Conexión a la database de Mongo 
mongoose.connect(MONGOLOCAL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
})
    .then(()=> {
        console.log(`Database conectada a Atlas`);
    })
    .catch((error) => {
        console.log(`El error es: ${error}`)
    })
