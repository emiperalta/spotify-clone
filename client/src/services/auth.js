const { REACT_APP_SERVER_URL } = process.env;

export const userLogin = async code => {
  const res = await fetch(`${REACT_APP_SERVER_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code }),
  });
  return await res.json();
};

export const userRefreshToken = async refreshToken => {
  const res = await fetch(`${REACT_APP_SERVER_URL}/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refreshToken }),
  });
  return await res.json();
};
