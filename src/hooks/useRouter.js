import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'

import { AuthPage } from '../pages/auth';
import { ContactsPage } from '../pages/contacts';
import { ACTION_AUTH, ACTION_REG } from '../constants';

export const useRouter = (isAuth) => {

  if (isAuth) {
    return (
      <Switch>
        <Route path="/contacts" exact>
          <ContactsPage />
        </Route>
        <Redirect to="/contacts" />
      </Switch>
    )
  }

  return (
    <Switch>
      <Route path="/auth">
        <AuthPage action={ ACTION_AUTH } />
      </Route>
      <Route path="/register">
        <AuthPage action={ ACTION_REG } />
      </Route>
      <Redirect to="/auth" />
    </Switch>
  )
}