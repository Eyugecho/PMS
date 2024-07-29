import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you are using react-router-dom for routing

const Protected = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/pages/login/login3');
    }
  }, [token, navigate]);

  return (
    <>
      {token ? children : null}
    </>
  );
};

export default Protected;
