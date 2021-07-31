import './Track.css';

export default function Track({ chooseTrack, track }) {
  const handlePlay = () => chooseTrack(track);

  return (
    <div
      className='d-flex align-items-center p-2 track-container'
      onClick={handlePlay}
    >
      <img alt='album url' src={track.albumUrl.url} />
      <section className='px-2'>
        <div className='text-white'>{track.title}</div>
        <div className='text-muted'>{track.artist}</div>
      </section>
    </div>
  );
}
