# IndieCodeV3

## Arquitectura

El proyecto ahora está dividido en dos capas:

- **Frontend (Electron):** ventanas y vistas en `src/views`, estilos en `src/css` y scripts de UI en `src/js`.
- **Backend (Express + MongoDB):** API REST centralizada en `backend/server.js`.

El proceso principal de Electron inicia automáticamente el backend al abrir la app.

## Variables de entorno

Crea un archivo `.env` con al menos:

```env
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/?retryWrites=true&w=majority
MONGODB_DB_NAME=siguard
BACKEND_PORT=3000
```

## Scripts

- `npm start`: inicia la aplicación Electron.
- `npm test`: comprobación básica del proyecto.
- `npm run dist`: genera build de distribución.
