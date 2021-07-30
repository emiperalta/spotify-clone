import { useEffect, useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import SpotifyWebApi from 'spotify-web-api-node';

import Track from 'components/Track';

import useAuth from 'hooks/useAuth';

import { CLIENT_ID } from 'utils/auth';

const spotifyApi = new SpotifyWebApi({ CLIENT_ID });

export default function Dashboard({ code }) {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const accessToken = useAuth({ code });

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    let cancel = false;
    if (!search) return setSearchResults([]);
    if (!accessToken) return;
    spotifyApi.searchTracks(search).then(res => {
      if (cancel) return;
      setSearchResults(
        res.body.tracks.items.map(track => {
          const smallestAlbumImage = track.album.images.reduce((smallest, image) => {
            if (image.height < smallest.height) return image;
            return smallest;
          }, track.album.images[0]);
          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage,
          };
        })
      );
    });
    return () => (cancel = true);
  }, [search, accessToken]);

  return (
    <Container className='d-flex flex-column py-2' style={{ height: '100vh' }}>
      <Form.Control
        onChange={e => setSearch(e.target.value)}
        placeholder='Search songs...'
        style={{ borderRadius: 50, padding: 8 }}
        type='search'
        value={search}
      />
      <div className='flex-grow-1 my-2' style={{ overflowY: 'auto' }}>
        {searchResults.map(track => (
          <Track key={track.uri} track={track} />
        ))}
      </div>
      <div>Bottom</div>
    </Container>
  );
}
