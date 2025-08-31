require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rutas de la API
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/usuarios', require('./routes/userRoutes'));
app.use('/api/proveedores', require('./routes/proveedorRoutes'));
app.use('/api/partes-repuestos', require('./routes/parteRepuestoRoutes'));
app.use('/api/movimientos', require('./routes/movimientoInventarioRoutes'));
app.use('/api/reportes', require('./routes/reportesRoutes'));

async function startServer() {
    try {
        await db.sequelize.authenticate();
        console.log('Conexión a la base de datos establecida.');
        await db.sequelize.sync({ alter: true });
        console.log('Modelos sincronizados con la base de datos.');
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Error al iniciar el servidor:', error);
        process.exit(1);
    }
}

startServer();
