import { Container } from 'react-bootstrap';

import { AUTH_URL } from 'utils/auth';

export default function Login() {
  return (
    <Container
      className='d-flex justify-content-center align-items-center'
      style={{ minHeight: '100vh' }}
    >
      <a className='btn btn-success btn-lg' href={AUTH_URL}>
        Login with Spotify
      </a>
    </Container>
  );
}
