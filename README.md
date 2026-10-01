# DRAKO

Tienda/CRUD fullstack construida con **Angular 17** en el frontend y **Express 5 + MongoDB** en el backend.

## Estructura del proyecto

```
DRAKO/
├── Frontend/          # Angular 17 (Angular CLI)
├── Backend/           # API Express 5
│   ├── apis/
│   │   ├── controladores/
│   │   └── modelos/    # Modelos Mongoose
│   ├── middleware/     # Middlewares de sesión y roles
│   ├── utils/
│   ├── config.js      # Configuración local (NO versionada)
│   ├── app.js         # Punto de entrada
│   └── routes.js      # Definición de rutas
└── .gitignore
```

## Requisitos

- Node.js 18 o superior
- MongoDB (local o remoto)

## Instalación

### 1. Backend

```bash
cd Backend
npm install
```

Copia el archivo de ejemplo de configuración y complétalo:

```bash
copy config.example.js config.js
```

| Variable | Descripción |
|---|---|
| `config.bd.*` | IP, puerto y nombre de la base de datos MongoDB |
| `config.mail.*` | Credenciales SMTP para envío de correos |
| `config.secret` | Secreto para firmar contraseñas y sesiones |
| `config.turnstile.secret` | Secreto de Cloudflare Turnstile |
| `config.whitelist` | Orígenes permitidos (CORS) |
| `config.puerto` | Puerto del servidor (por defecto 3001) |
| `config.expiracion` | Duración de la sesión en milisegundos |

Arranca el servidor:

```bash
npm start
```

### 2. Frontend

```bash
cd Frontend
npm install
npm start
```

La aplicación queda disponible en `http://localhost:4200`.

## Scripts disponibles

| Carpeta | Comando | Descripción |
|---|---|---|
| Backend | `npm start` | Inicia el servidor (`node app.js`) |
| Frontend | `npm start` | `ng serve` en desarrollo |
| Frontend | `npm run build` | Build de producción en `dist/` |
| Frontend | `npm run watch` | Build en watch (desarrollo) |
| Frontend | `npm test` | Tests unitarios (Karma/Jasmine) |

## Licencia

ISC
