import SpotifyPlayer from 'react-spotify-web-playback';

export default function Player({ accessToken, trackUri }) {
  if (!accessToken) return null;
  return (
    <SpotifyPlayer
      play={trackUri && true}
      showSaveIcon
      token={accessToken}
      uris={trackUri ? [trackUri] : []}
    />
  );
}
