import { useEffect, useState } from 'react';

import { userLogin, userRefreshToken } from 'services/auth';

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

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;
    const interval = setInterval(() => {
      userRefreshToken(refreshToken)
        .then(res => {
          setAccessToken(res.accessToken);
          setExpiresIn(res.expiresIn);
        })
        .catch(() => (window.location = '/'));
    }, (expiresIn - 60) * 1000);
    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);

  return accessToken;
}
