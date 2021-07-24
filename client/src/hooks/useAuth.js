import { useEffect, useState } from 'react';

import { userLogin } from 'services/auth';

export default function useAuth({ code }) {
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [expiresIn, setExpiresIn] = useState('');

  useEffect(() => {
    userLogin(code)
      .then(res => {
        setAccessToken(res.accessToken);
        setRefreshToken(res.refreshToken);
        setExpiresIn(res.expiresIn);
        window.history.pushState({}, null, '/');
      })
      .catch(() => (window.location = '/'));
  }, [code]);
}
