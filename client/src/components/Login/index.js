import { Container } from 'react-bootstrap';

import { AUTH_URL } from 'utils/auth';

import './Login.css';

export default function Login() {
  return (
    <Container className='d-flex justify-content-center align-items-center login-container'>
      <a className='btn btn-lg login-btn' href={AUTH_URL}>
        Login with Spotify
      </a>
    </Container>
  );
}
