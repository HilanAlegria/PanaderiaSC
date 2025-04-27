const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Reemplaza con tu URI de conexión a MongoDB Atlas
const uri = 'mongodb+srv://comicsapi_user:database_user@cluster0.xddcxsu.mongodb.net';
const client = new MongoClient(uri);

async function connect() {
    try {
        await client.connect();
        console.log('Conectado a MongoDB');
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error);
    }
}

connect();

app.use(cors());
app.use(express.json());


app.get("/", async (req, res) => {
    res.json("Hola CHamo")
})
// Rutas de la API

// 1. Obtener todos los productos

app.get('/api/productos', async (req, res) => {
    try {
        const database = client.db('panaderiaLaDelicia');//Dara error la collection no existe
        const productos = await database.collection('productos').find().toArray();
        res.json(productos);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ error: 'Error al obtener productos' });
    }
});

// 2. Crear una nueva venta
app.post('/api/ventas', async (req, res) => {
    try {
        const nuevaVenta = req.body;
        const database = client.db('panaderiaLaDelicia');
        const result = await database.collection('ventas').insertOne(nuevaVenta);
        res.status(201).json({ message: 'Venta registrada con éxito', insertedId: result.insertedId });
    } catch (error) {
        console.error('Error al registrar la venta:', error);
        res.status(500).json({ error: 'Error al registrar la venta' });
    }
});

// 3.  Obtener todos los trabajadores (Ejemplo)
app.get('/api/trabajadores', async (req, res) => {
    try {
        const database = client.db('panaderiaLaDelicia');
        const trabajadores = await database.collection('trabajadores').find().toArray();
        res.json(trabajadores);
    } catch (error) {
        console.error('Error al obtener trabajadores:', error);
        res.status(500).json({ error: 'Error al obtener trabajadores' });
    }
});

app.listen(port, () => {
    console.log(`Servidor backend escuchando en el puerto ${port}`);
});