const { REACT_APP_CLIENT_ID } = process.env;
const { REACT_APP_URI } = process.env;

export const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${REACT_APP_CLIENT_ID}&response_type=code&redirect_uri=${REACT_APP_URI}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`;

export const CLIENT_ID = REACT_APP_CLIENT_ID;
