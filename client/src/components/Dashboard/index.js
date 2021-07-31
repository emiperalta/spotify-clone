import { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import { Container, FormControl } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';

import Track from 'components/Track';

import useAuth from 'hooks/useAuth';

import { CLIENT_ID } from 'utils/auth';

import './Dashboard.css';

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
    <Container className='d-flex flex-column py-2 search-container'>
      <div className='search-icon'>
        <BsSearch />
      </div>
      <FormControl
        className='search-bar'
        onChange={e => setSearch(e.target.value)}
        placeholder='Search songs...'
        type='search'
        value={search}
      />
      <div className='flex-grow-1 my-2 track-list'>
        {searchResults.map(track => (
          <Track key={track.uri} track={track} />
        ))}
      </div>
      <div>Player</div>
    </Container>
  );
}
