import { useState } from 'react';

export const useErrors = () => {

  const [error, setError] = useState(null);

  const addError = (error) => {
    setError(error)
  }

  const clearError = () => {
    setError(null);
  }

  return { error, addError, clearError };
}