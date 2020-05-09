import { useState, useCallback } from 'react';
import { SERVER } from '../constants';

export const useHttp = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {

    setIsLoading(true);

    try {

      if (body) {
        body = JSON.stringify(body);
        headers['Content-Type'] = 'application/json';
      }

      const response = await fetch(`${SERVER}${url}`, {
        method,
        body,
        headers
      });

      if (!response.ok) {
        setErrors('Что-то пошло не так');
        throw new Error();
      }

      const data = response.json();
      setIsLoading(false);

      return data;

    } catch (e) {
      setErrors(e);
      setIsLoading(false);
    }

  }, []);

  return { request, errors, isLoading }

}