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
