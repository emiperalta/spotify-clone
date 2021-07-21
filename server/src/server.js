require('dotenv/config');
const express = require('express');
const cors = require('cors');
const SpotifyWebApi = require('spotify-web-api-node');

const credentials = require('../utils/credentials');

const app = express();

const { PORT } = process.env;

app.use(cors());
app.use(express.json());

app.post('/login', (req, res) => {
  const { code } = req.body;
  const spotifyApi = new SpotifyWebApi(credentials);
  spotifyApi
    .authorizationCodeGrant(code)
    .then(data => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch(err => res.status(400).json(err));
});

app.listen(PORT, () => console.log('sever running at port', PORT));
