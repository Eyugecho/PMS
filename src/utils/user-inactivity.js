import { useDispatch } from 'react-redux';

let inactivityTimeout;

const handleBackendLogout = () => {
  const Api = Backend.auth + Backend.logout;
  const token = Storage.getItem('token');

  fetch(Api, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
};

const logout = () => {
  const dispatch = useDispatch();
  dispatch({ type: SIGN_IN, signed: false });
  handleBackendLogout();
  Storage.clear();
};

const resetInactivityTimeout = () => {
  clearTimeout(inactivityTimeout);

  inactivityTimeout = setTimeout(
    () => {
      logout();
    },
    10 * 60 * 1000
  ); // 10 minutes in milliseconds
};

const setupActivityListeners = () => {
  window.addEventListener('mousemove', resetInactivityTimeout);
  window.addEventListener('keydown', resetInactivityTimeout);
  window.addEventListener('click', resetInactivityTimeout);
};

setupActivityListeners();
resetInactivityTimeout();
