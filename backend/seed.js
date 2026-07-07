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

const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  console.error('❌ Error: MONGODB_URI no está definido en el archivo .env');
  process.exit(1);
}

const mascotasDemo = [
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

async function seed() {
  const client = new MongoClient(mongoUri);

  try {
    console.log('⏳ Conectando a MongoDB Atlas...');
    await client.connect();
    console.log('✅ Conectado exitosamente');

    const db = client.db();
    const mascotasCol = db.collection('mascotas');

    console.log('🧹 Limpiando colección "mascotas"...');
    await mascotasCol.deleteMany({});

    console.log(`🌱 Sembrando ${mascotasDemo.length} mascotas...`);
    const result = await mascotasCol.insertMany(mascotasDemo);
    console.log(`✅ ¡Éxito! Se insertaron ${result.insertedCount} mascotas en la base de datos.`);

    // Crear la colección 'adopciones' con un documento de prueba si está vacía
    const adopcionesCol = db.collection('adopciones');
    const totalAdopciones = await adopcionesCol.countDocuments();
    if (totalAdopciones === 0) {
      console.log('🆕 Creando colección "adopciones" con un registro demo...');
      await adopcionesCol.insertOne({
        nombre: 'Registro Demo',
        email: 'demo@petcura.cl',
        telefono: '+56 9 0000 0000',
        motivo: 'Registro inicial de la colección',
        mascotaNombre: 'Labrador Retriever',
        fecha: new Date()
      });
      console.log('✅ Colección "adopciones" inicializada');
    }

  } catch (error) {
    console.error('❌ Error durante la siembra de la base de datos:', error.message);
  } finally {
    await client.close();
    console.log('🔌 Conexión cerrada');
  }
}

seed();
