const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const DEFAULT_PORT = Number(process.env.BACKEND_PORT || 3000);
const DEFAULT_DB_NAME = process.env.MONGODB_DB_NAME || 'siguard';

function buildMongoClient() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI no está configurada. Define la variable de entorno antes de iniciar la app.');
  }

  return new MongoClient(uri);
}

function toObjectId(id) {
  if (ObjectId.isValid(id)) {
    return new ObjectId(id);
  }
  return id;
}

async function createServer() {
  const app = express();
  app.use(express.json());

  const client = buildMongoClient();
  await client.connect();
  const database = client.db(DEFAULT_DB_NAME);

  app.get('/health', (req, res) => {
    res.json({ ok: true });
  });

  app.get('/api/daycares', async (req, res) => {
    try {
      const collection = database.collection('guarderias');
      const daycares = await collection.find({}).toArray();
      res.json(daycares);
    } catch (error) {
      console.error('Error al obtener las guarderías:', error);
      res.status(500).json({ error: 'Error al obtener las guarderías' });
    }
  });

  app.post('/api/daycares', async (req, res) => {
    const { _id, razon_social, id_usuario_gerente, fecha_inicio, fecha_termino, num_guarderia } = req.body;
    try {
      const collection = database.collection('guarderias');
      const result = await collection.insertOne({
        _id: _id || new ObjectId(),
        razon_social,
        id_usuario_gerente,
        fecha_inicio: new Date(fecha_inicio),
        fecha_termino: new Date(fecha_termino),
        num_guarderia,
      });

      res.json({ success: true, message: 'Guardería agregada correctamente.', id: result.insertedId });
    } catch (error) {
      console.error('Error al agregar la guardería:', error);
      res.status(500).json({ success: false, message: 'Error al agregar la guardería.' });
    }
  });

  app.put('/api/daycares/:id', async (req, res) => {
    const { id } = req.params;
    const { razon_social, fecha_inicio, fecha_termino, num_guarderia } = req.body;
    try {
      const collection = database.collection('guarderias');
      const result = await collection.updateOne(
        { _id: toObjectId(id) },
        {
          $set: {
            razon_social,
            fecha_inicio: new Date(fecha_inicio),
            fecha_termino: new Date(fecha_termino),
            num_guarderia,
          },
        },
      );

      if (result.modifiedCount === 1) {
        res.json({ success: true, message: 'Guardería actualizada correctamente.' });
      } else {
        res.status(404).json({ success: false, message: 'Guardería no encontrada.' });
      }
    } catch (error) {
      console.error('Error al actualizar la guardería:', error);
      res.status(500).json({ success: false, message: 'Error al actualizar la guardería.' });
    }
  });

  app.delete('/api/daycares/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const collection = database.collection('guarderias');
      const result = await collection.deleteOne({ _id: toObjectId(id) });

      if (result.deletedCount === 1) {
        res.json({ success: true, message: 'Guardería eliminada correctamente.' });
      } else {
        res.status(404).json({ success: false, message: 'Guardería no encontrada.' });
      }
    } catch (error) {
      console.error('Error al eliminar la guardería:', error);
      res.status(500).json({ success: false, message: 'Error al eliminar la guardería.' });
    }
  });

  app.get(['/api/documents', '/api/documentos'], async (req, res) => {
    try {
      const collection = database.collection('documentos');
      const documents = await collection.find({}).toArray();
      res.json(documents);
    } catch (error) {
      console.error('Error al obtener los documentos:', error);
      res.status(500).json({ error: 'Error al obtener los documentos' });
    }
  });

  app.post('/api/auth/login', async (req, res) => {
    const { name, password } = req.body;
    try {
      const collection = database.collection('usuarios');
      const user = await collection.findOne({ nombre: name, password });
      if (!user) {
        return res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
      }

      return res.json({ success: true, roleId: user.id_roles });
    } catch (error) {
      console.error('Error durante la autenticación:', error);
      return res.status(500).json({ success: false, message: 'Error de autenticación' });
    }
  });

  const server = await new Promise((resolve) => {
    const instance = app.listen(DEFAULT_PORT, () => {
      console.log(`Backend escuchando en http://localhost:${DEFAULT_PORT}`);
      resolve(instance);
    });
  });

  const shutdown = async () => {
    await new Promise((resolve, reject) => {
      server.close((err) => {
        if (err) reject(err);
        else resolve();
      });
    });
    await client.close();
  };

  return { shutdown };
}

module.exports = { createServer };
