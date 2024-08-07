# API REST con Autenticación OAuth 2.0 usando Google

## Descripción del Proyecto

Este proyecto es una API REST sencilla desarrollada con Node.js y Express que permite a los usuarios autenticarse utilizando OAuth 2.0 con Google. La API proporciona endpoints para la autenticación y un recurso protegido que solo puede ser accedido por usuarios autenticados.

## Estructura del Proyecto

oauth-google-auth/

├── node_modules/

├── views/

│ ├── login.html

│ └── profile.html

├── .env

├── index.js

├── package.json

└── packagelock.json




## Dependencias

- [Express](https://www.npmjs.com/package/express): Framework web para Node.js.
- [Express-Session](https://www.npmjs.com/package/express-session): Middleware para manejar sesiones.
- [Axios](https://www.npmjs.com/package/axios): Cliente HTTP para realizar solicitudes.
- [Querystring](https://www.npmjs.com/package/querystring): Utilidad para manejar cadenas de consulta.
- [dotenv](https://www.npmjs.com/package/dotenv): Cargar variables de entorno desde un archivo `.env`.

## Configuración

### 1. Clonar el repositorio

git clone https://github.com/tu-usuario/oauth-google-auth.git
cd oauth-google-auth

### 2. Instalar las dependencias
npm install
