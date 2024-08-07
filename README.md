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

git clone https://github.com/itsrichx/oauth_google.git 
cd oauth-google-auth

### 2. Instalar las dependencias
npm install


### 3. Configurar las credenciales de Google

Crea un archivo .env en la raíz del proyecto y agrega las siguientes variables de entorno con tus credenciales de Google:

CLIENT_ID=tu_client_id_de_google
CLIENT_SECRET=tu_client_secret_de_google
REDIRECT_URI=http://localhost:3001/auth/google/callback
SESSION_SECRET=tu_session_secret_generado

### 4. Registrar la aplicación en Google Developers Console

Ve a Google Developers Console.
Crea un nuevo proyecto.
Habilita la API de Google+.
Configura las credenciales de OAuth 2.0 y obtén el Client ID y el Client Secret.
Añade http://localhost:3001/auth/google/callback como URI de redirección autorizada.

## Iniciar el Proyecto

node index.js


## Endpoints

1. '/'
Descripción: Muestra la página de inicio de sesión.
Método: GET
Respuesta: Página HTML con un botón para iniciar sesión con Google.

2. '/auth/google'
Descripción: Redirige a los usuarios a la página de autenticación de Google.
Método: GET
Respuesta: Redirección a Google para autenticación.

3. '/auth/google/callback'
Descripción: Maneja la respuesta de Google después de la autenticación.
Método: GET
Parámetros: code (código de autorización devuelto por Google)
Respuesta: Redirección a la página de perfil del usuario.

4. '/profile'
Descripción: Muestra la página de perfil del usuario autenticado.
Método: GET
Respuesta: Página HTML con la información básica del usuario (nombre, correo electrónico, foto).

5. '/profile/data'
Descripción: Devuelve los datos del perfil del usuario autenticado en formato JSON.
Método: GET
Respuesta: JSON con la información del usuario.

6. '/protected'
Descripción: Endpoint protegido que solo puede ser accedido por usuarios autenticados.
Método: GET
Respuesta: JSON con un mensaje de bienvenida y la información del usuario.
Seguridad: Verifica la presencia y validez del token de acceso en la sesión.

## FUNCIONAMIENTO

### Inicio de Sesión

1. El usuario navega a la página de inicio de sesión (/).
2. El usuario hace clic en "Sign in with Google" y es redirigido a Google para autenticarse.
3. Después de autenticarse, Google redirige al usuario de vuelta a /auth/google/callback con un código de autorización.
4. El servidor intercambia el código de autorización por un token de acceso y un token ID.
5. El token de acceso se almacena en la sesión del usuario.
6. El usuario es redirigido a /profile, donde se muestra su información básica.

### Acceso a Recursos Protegidos

1. El usuario autenticado intenta acceder a /protected.
2. El servidor verifica que el token de acceso esté presente en la sesión.
3. Si el token de acceso es válido, el servidor solicita la información del perfil del usuario a la API de Google.
4. El servidor responde con un mensaje de bienvenida y la información del usuario en formato JSON.
5. Si el token de acceso no es válido o no está presente, el servidor responde con un error 401 (no autenticado).
