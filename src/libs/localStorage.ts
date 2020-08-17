const USER_AUTHENTICATED = "authenticated-ambev";

export const isAuthenticated = () => {
  return localStorage.getItem(USER_AUTHENTICATED) == 'true';
};

export const setAuthenticated = (isAuthenticated) => {
  return localStorage.setItem(USER_AUTHENTICATED, isAuthenticated);
};