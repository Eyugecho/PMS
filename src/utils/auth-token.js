import { Storage } from 'configration/storage';
import Backend from 'services/backend';

export const RefreshToken = async () => {
  const Api = Backend.auth + Backend.refreshToken;
  const token = Storage.getItem('token');

  fetch(Api, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.success) {
        const ttl = new Date(response.data.expires_in * 1000);
        const expirationTime = ttl.getTime();
        Storage.setItem('token', response.data.access_token);
        Storage.setItem('tokenExpiration', expirationTime);
      }
    });
};

const GetToken = async () => {
  const token = Storage.getItem('token');
  const ttl = Storage.getItem('tokenExpiration');

  const currentTime = new Date().getTime();
  if (currentTime >= ttl) {
    await RefreshToken();
    return token;
  } else {
    return token;
  }
};

export default GetToken;
