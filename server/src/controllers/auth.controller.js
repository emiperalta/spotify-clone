const SpotifyWebApi = require('spotify-web-api-node');

const credentials = require('../../utils/credentials');

const login = (req, res) => {
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
};

const refresh = (req, res) => {
  const { refreshToken } = req.body;
  const spotifyApi = new SpotifyWebApi({ ...credentials, refreshToken });
  spotifyApi
    .refreshAccessToken()
    .then(data =>
      res.json({
        accessToken: data.body.access_token,
        expiresIn: data.body.expires_in,
      })
    )
    .catch(err => res.status(400).json(err));
};

module.exports = { login, refresh };
