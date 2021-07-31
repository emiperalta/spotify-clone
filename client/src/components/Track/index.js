export default function Track({ track }) {
  return (
    <div className='d-flex align-items-center m-2'>
      <img alt='album url' src={track.albumUrl.url} />
      <section className='px-2'>
        <div className='text-white'>{track.title}</div>
        <div className='text-muted'>{track.artist}</div>
      </section>
    </div>
  );
}
