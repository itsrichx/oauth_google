const express = require('express');
const session = require('express-session');
const axios = require('axios');
const querystring = require('querystring');
const path = require('path');
require('dotenv').config();

const app = express();
const port = 3001;

app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
}));


// Configurar el directorio de vistas
app.use(express.static(path.join(__dirname, 'views')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});


/*app.get('/', (req, res) => {
  res.send('<a href="/login">Login with Google</a>');
});*/

// Ruta para iniciar el proceso de autenticación
app.get('/login', (req, res) => {
  const authorizationUrl = 'https://accounts.google.com/o/oauth2/v2/auth?' + 
    querystring.stringify({
      client_id: process.env.CLIENT_ID,
      redirect_uri: process.env.REDIRECT_URI,
      response_type: 'code',
      scope: 'openid profile email',
    });
  res.redirect(authorizationUrl);
});

// Ruta de callback para manejar la respuesta de Google
app.get('/callback', async (req, res) => {
  const { code } = req.query;

  try {
    const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      redirect_uri: process.env.REDIRECT_URI,
      code,
      grant_type: 'authorization_code',
    });

    const { access_token, id_token } = tokenResponse.data;

    req.session.access_token = access_token;
    req.session.id_token = id_token;

    res.redirect('/profile');
  } catch (error) {
    console.error('Error during authentication:', error);
    res.send('Error during authentication');
  }
});

// Ruta para mostrar la página de perfil
app.get('/profile', (req, res) => {
    if (!req.session.access_token) {
      return res.redirect('/login');
    }
    res.sendFile(path.join(__dirname, 'views', 'profile.html'));
  });


// Ruta para mostrar el perfil del usuario
app.get('/profile/data', async (req, res) => {
  if (!req.session.access_token) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  try {
    const profileResponse = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
      headers: {
        Authorization: `Bearer ${req.session.access_token}`,
      },
    });

    res.json(profileResponse.data);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Error fetching profile' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
