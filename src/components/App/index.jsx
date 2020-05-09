import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useRouter } from '../../hooks/useRouter';
import { useAuth } from '../../hooks/useAuth';
import { useErrors } from '../../hooks/useErrors';
import { AppContext } from '../../store/app.context';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

export const App = () => {

  const { isAuth, userId, auth } = useAuth();
  const { error, addError, clearError } = useErrors();

  return (
    <AppContext.Provider value={ { isAuth, userId, auth, error, addError, clearError } }>
        <Snackbar open={ !!error } autoHideDuration={ 6000 } onClose={ clearError }>
          <Alert severity="error" >{ error }</Alert>
        </Snackbar>
      <Router>
        { useRouter(isAuth) }
      </Router>
    </AppContext.Provider>
  );
}

