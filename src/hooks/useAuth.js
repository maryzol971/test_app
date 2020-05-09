import { useState, useEffect } from 'react';

const LS_AUTH = 'authData';

export const useAuth = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [userId, setUserId] = useState(null);

  const auth = (isUserAuth, userId = null) => {
    localStorage.setItem(LS_AUTH, JSON.stringify({ isAuth: isUserAuth, userId }))
    setIsAuth(isUserAuth);
    setUserId(userId);
  }

  useEffect(() => {
    const isUserAuth = localStorage.getItem(LS_AUTH);
    if (isUserAuth) {
      const authData = JSON.parse(isUserAuth);
      auth(authData.isAuth, authData.userId);
    }
  }, []);

  return { isAuth, userId, auth }

}