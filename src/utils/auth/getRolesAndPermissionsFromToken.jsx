export const decodeJWT = (token) => {
  if (!token) return null;

  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join('')
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
};

export const getRolesAndPermissionsFromToken = () => {
  const token = localStorage.getItem('token'); // Retrieve the token
  if (!token) return null;

  try {
    const decodedToken = decodeJWT(token); // Decode the token
    const roles = decodedToken.roles || []; // Extract roles
    return roles;
  } catch (error) {
    return null;
  }
};

export default getRolesAndPermissionsFromToken;
