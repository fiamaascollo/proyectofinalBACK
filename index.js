const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT;
require('./conexion/conexion');
const Usuario = require('./model/userModel');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
    origin: 'https://proyectofinal-front.vercel.app', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
  
app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.send(`<h1>Soy el Back de la aplicación de Fiama y Francisco</h1>`)
});


/* Insertamos nuevos clientes */
app.post('/usuarios', async (req, res) => {
    console.log(req.body);
    const { nombre, apellido, email, telefono, horario } = req.body;

    console.log(`Nombre: ${nombre}, apellido: ${apellido}, email: ${email}, teléfono: ${telefono} y horario: ${horario}`);

    //Si no existe, creamos un nuevo usuario
    const nuevoUsuario = new Usuario(req.body);

    console.log(`1. Nuevo Usuario a guardar: ${nuevoUsuario}`);

    await nuevoUsuario.save();

    res.json({
        saludo: 'Dato guardado'
    })


});

/* Obtenemos toda la lista de clientes */
app.get('/clientes', async (req, res) => {

    const personas = await Usuario.find({},
        {
            "nombre": 1,
            "apellido": 1,
            "email": 1,
            "telefono": 1,
            "horario": 1,
            "timestamp": 1
        });

    console.log(personas);

    res.json({
        personas 
    })

})

/* Eliminamos los datos del cliente */
app.delete('/clientes/:id', async (req, res) => {

    const id = req.params.id;
    
    const data = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        telefono: req.body.telefono,
        horario: req.body.horario
    }
    
    console.log(data);
    console.log(id);
    
    try {
        const deleteUser = await Usuario.findByIdAndDelete(id);
        console.log(deleteUser);
        if(deleteUser){
            console.log('Cliente Eliminado');
            return res.status(200).send();
        }else{
            return res.status(404).send();
        }
    } catch (error) {
        console.log(error);
    }

})

/* Actualizamos los datos del cliente */
app.put('/clientes/:id', async (req, res) => {

    const id = req.params.id;

    const data = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        telefono: req.body.telefono,
        horario: req.body.horario
    }

    console.log(data);
    console.log(id);

    try {
        const updateUser = await Usuario.findByIdAndUpdate(id, data, {new: true});
        console.log(updateUser);
        if (updateUser) {
          console.log('Cliente Actualizado', updateUser);
          return res.status(200).json(updateUser);
        } else {
          return res.status(404).json({error: 'Cliente no encontrado'});
        }
      } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'No se pudieron actualizar los datos del cliente' });
      }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el Puerto ${PORT}`);
})