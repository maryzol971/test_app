import { createContext } from 'react';

const noope = function(){};

export const AppContext = createContext({
  isAuth: false,
  userId: null,
  error: null,
  clearError: noope,
  addError: noope,
  auth: noope,
});