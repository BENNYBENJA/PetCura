const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const dns = require('dns');
require('dotenv').config();

// Configurar DNS personalizado para resolver problemas de conexión en redes locales
try {
  dns.setServers(['8.8.8.8', '8.8.4.4']);
  console.log("ℹ️ Servidores DNS configurados a Google DNS (8.8.8.8)");
} catch (e) {
  console.warn("⚠️ No se pudo establecer los servidores DNS:", e.message);
}

const app = express();
const PORT = process.env.PORT || 3001;
const mongoUri = process.env.MONGODB_URI;

app.use(cors());
app.use(express.json());

let db = null;
let esModoMemoria = false;

// Datos de respaldo locales para mantener el backend funcionando si falla la base de datos
let mascotasMemoria = [
  { id: 1,  name: 'Labrador Retriever', temperament: 'Activo, Amigable, Leal',           life_span: '10 – 12 años', weight: { metric: '25 – 36' }, breed_group: 'Sporting',     image: { url: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&auto=format&fit=crop&q=80' } },
  { id: 2,  name: 'Golden Retriever',   temperament: 'Confiable, Amigable, Gentil',       life_span: '10 – 12 años', weight: { metric: '25 – 34' }, breed_group: 'Sporting',     image: { url: 'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?w=600&auto=format&fit=crop&q=80' } },
  { id: 3,  name: 'Bulldog',            temperament: 'Amigable, Valiente, Leal',          life_span: '8 – 10 años',  weight: { metric: '22 – 25' }, breed_group: 'Non-Sporting', image: { url: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=600&auto=format&fit=crop&q=80' } },
  { id: 4,  name: 'Beagle',             temperament: 'Amigable, Curioso, Alegre',         life_span: '12 – 15 años', weight: { metric: '9 – 11' },  breed_group: 'Hound',        image: { url: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=600&auto=format&fit=crop&q=80' } },
  { id: 5,  name: 'Poodle',             temperament: 'Inteligente, Activo, Alerta',       life_span: '12 – 15 años', weight: { metric: '18 – 32' }, breed_group: 'Non-Sporting', image: { url: 'https://images.unsplash.com/photo-1598191950976-59910d6824e8?w=600&auto=format&fit=crop&q=80' } },
  { id: 6,  name: 'Rottweiler',         temperament: 'Leal, Valiente, Seguro',            life_span: '8 – 10 años',  weight: { metric: '35 – 60' }, breed_group: 'Working',      image: { url: 'https://images.unsplash.com/photo-1567752881298-894bb81f9379?w=600&auto=format&fit=crop&q=80' } },
  { id: 7,  name: 'Yorkshire Terrier',  temperament: 'Audaz, Curioso, Tenaz',             life_span: '13 – 16 años', weight: { metric: '1 – 3' },   breed_group: 'Toy',          image: { url: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&auto=format&fit=crop&q=80' } },
  { id: 8,  name: 'Boxer',              temperament: 'Leal, Cariñoso, Inteligente',       life_span: '10 – 12 años', weight: { metric: '25 – 32' }, breed_group: 'Working',      image: { url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&auto=format&fit=crop&q=80' } },
  { id: 9,  name: 'Dachshund',          temperament: 'Valiente, Devoto, Juguetón',        life_span: '12 – 16 años', weight: { metric: '7 – 15' },  breed_group: 'Hound',        image: { url: 'https://images.unsplash.com/photo-1612536057832-2ff7ead58194?w=600&auto=format&fit=crop&q=80' } },
  { id: 10, name: 'Siberian Husky',     temperament: 'Inteligente, Gentil, Vivaz',        life_span: '12 – 14 años', weight: { metric: '16 – 27' }, breed_group: 'Working',      image: { url: 'https://images.unsplash.com/photo-1531804055935-76f44d7c3621?w=600&auto=format&fit=crop&q=80' } },
  { id: 11, name: 'Shih Tzu',           temperament: 'Cariñoso, Amigable, Vivaz',         life_span: '10 – 18 años', weight: { metric: '4 – 7' },   breed_group: 'Toy',          image: { url: 'https://images.unsplash.com/photo-1558788353-f76d92427f16?w=600&auto=format&fit=crop&q=80' } },
  { id: 12, name: 'Border Collie',      temperament: 'Enérgico, Ágil, Tenaz',             life_span: '12 – 15 años', weight: { metric: '14 – 20' }, breed_group: 'Herding',      image: { url: 'https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?w=600&auto=format&fit=crop&q=80' } },
];
let adopcionesMemoria = [];
let mensajesMemoria = [];

async function conectarMongoDB() {
  try {
    console.log('⏳ Intentando conectar a MongoDB Atlas...');
    const client = new MongoClient(mongoUri, { connectTimeoutMS: 5000 });
    await client.connect();
    db = client.db();
    console.log(`✅ Conectado a MongoDB Atlas (Base de datos: ${db.databaseName})`);
  } catch (error) {
    console.error('⚠️ Advertencia: No se pudo conectar a MongoDB Atlas:', error.message);
    console.log('🔄 Iniciando en MODO MEMORIA. El servidor funcionará de manera local para la demo.');
    esModoMemoria = true;
  }
}

// Ruta de diagnóstico / Healthcheck
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    baseDeDatos: esModoMemoria ? 'Memoria Ram (Local)' : 'MongoDB Atlas (Remota)',
    uri: mongoUri ? 'Configurada' : 'No configurada'
  });
});

// GET: Obtener todas las mascotas
app.get('/api/mascotas', async (req, res) => {
  try {
    if (esModoMemoria || !db) {
      return res.json(mascotasMemoria);
    }
    const mascotas = await db.collection('mascotas').find({}).toArray();
    res.json(mascotas);
  } catch (error) {
    console.error('Error al obtener mascotas:', error.message);
    res.json(mascotasMemoria); // Fallback silencioso
  }
});

// POST: Registrar una nueva solicitud de adopción
app.post('/api/adopciones', async (req, res) => {
  try {
    const { nombre, email, telefono, motivo, mascotaNombre, mascotaId } = req.body;

    if (!nombre || !email || !telefono || !motivo) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    const nuevaAdopcion = {
      nombre,
      email,
      telefono,
      motivo,
      mascotaNombre: mascotaNombre || 'Mascota no especificada',
      mascotaId: mascotaId || null,
      fechaRegistro: new Date()
    };

    if (esModoMemoria || !db) {
      nuevaAdopcion.id = Date.now().toString();
      adopcionesMemoria.push(nuevaAdopcion);
      console.log('🐾 Solicitud de adopción guardada en MEMORIA (Local):', nuevaAdopcion);
      return res.status(201).json({
        success: true,
        message: '¡Gracias por escribir a PetCura! Nos pondremos en contacto para coordinar la cita de tu mascota (Modo Local)',
        id: nuevaAdopcion.id
      });
    }

    const result = await db.collection('adopciones').insertOne(nuevaAdopcion);
    console.log(`🐾 Solicitud de adopción guardada en MongoDB Atlas (ID: ${result.insertedId})`);

    res.status(201).json({
      success: true,
      message: '¡Gracias por escribir a PetCura! Nos pondremos en contacto para coordinar la cita de tu mascota',
      id: result.insertedId
    });
  } catch (error) {
    console.error('Error al guardar solicitud de adopción:', error.message);
    res.status(500).json({ error: 'Error al guardar la solicitud en la base de datos' });
  }
});

// POST: Guardar mensaje general de contacto
app.post('/api/contacto', async (req, res) => {
  try {
    const { nombreDueno, nombreMascota, correo, mensaje } = req.body;

    if (!nombreDueno || !nombreMascota || !correo || !mensaje) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    const nuevoMensaje = {
      nombreDueno,
      nombreMascota,
      correo,
      mensaje,
      fechaRegistro: new Date()
    };

    if (esModoMemoria || !db) {
      nuevoMensaje.id = Date.now().toString();
      mensajesMemoria.push(nuevoMensaje);
      console.log('✉️ Mensaje de contacto guardado en MEMORIA (Local):', nuevoMensaje);
      return res.status(201).json({
        success: true,
        message: '¡Gracias por escribir a PetCura! Nos pondremos en contacto para coordinar la cita de tu mascota (Modo Local)',
        id: nuevoMensaje.id
      });
    }

    const result = await db.collection('mensajes').insertOne(nuevoMensaje);
    console.log(`✉️ Mensaje de contacto guardado en MongoDB Atlas (ID: ${result.insertedId})`);

    res.status(201).json({
      success: true,
      message: '¡Gracias por escribir a PetCura! Nos pondremos en contacto para coordinar la cita de tu mascota',
      id: result.insertedId
    });
  } catch (error) {
    console.error('Error al guardar mensaje de contacto:', error.message);
    res.status(500).json({ error: 'Error al guardar el mensaje en la base de datos' });
  }
});

// Inicializar base de datos y arrancar el servidor
conectarMongoDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor backend de PetCura corriendo en http://localhost:${PORT}`);
  });
});
