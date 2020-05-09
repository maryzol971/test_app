import React, { useContext, useState } from 'react';
import { Box, Input, Button, makeStyles, createStyles } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { AppContext } from '../store/app.context';
import { AppContainer } from '../components/AppContainer';
import { useHttp } from '../hooks/useHttp';
import { ACTION_AUTH, ACTION_REG } from '../constants';

const useStyles = makeStyles((theme) => createStyles({
  customInput: {
    width: '100%',
    marginBottom: 30,
    paddingLeft: 15
  },
  formWrapp: {
    padding: 20,
    marginTop: 50
  },
  registerLink: {
    marginTop: theme.spacing(2),
    textAlign: 'right',
    display: 'block',
    fontSize: theme.typography.fontSize,
    color: theme.palette.common.black,
  }
}));

export const AuthPage = ({ action }) => {

  const { auth, addError } = useContext(AppContext);
  const { request, isLoading } = useHttp();
  const [formData, setFormData] = useState({
    login: '',
    password: ''
  });
  const { formWrapp, customInput, registerLink } = useStyles();
  const history = useHistory();

  const handleChange = ({ target: { name, value } }) => {
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmitForm = async e => {
    e.preventDefault();
    const { login, password } = formData;

    try {
      let response = null;
      if (action === ACTION_AUTH) {
        response = await request(`/users?login=${login}&password=${password}`, 'GET', null, {});
      } else if (action === ACTION_REG) {
        response = await request('/users', 'POST', {
          login, password
        }, {});
      }
      if (!response) {
        throw new Error('Сервер не отвечает');
      }

      if (Array.isArray(response) && response[0] || response.login === login) {
        if (action === ACTION_AUTH) {
          auth(true, response[0].id)
        } else if (action === ACTION_REG) {
          history.push('/auth');
        }
      } else {
        addError('Неверный логин или пароль')
      }
    } catch (e) {
      addError(`Ошибка при авторизации - ${e.message && e.message}`);
    }

  }

  const inpProps = {
    className: customInput,
    autoComplete: 'off',
    onChange: handleChange
  }

  return (
    <AppContainer title="Авторизация">
      <Box className={ formWrapp } component="form" autoComplete='off'>
        <Box>
          <Input placeholder="Login" name="login" value={ formData.login } { ...inpProps } />
        </Box>
        <Box>
          <Input placeholder="Password" name="password" type="password" value={ formData.password } { ...inpProps } />
        </Box>
        <Box>
          <Button
            color="secondary"
            variant="contained"
            fullWidth
            disabled={ isLoading }
            onClick={ handleSubmitForm }
          >
            { action === ACTION_AUTH ? 'Войти' : 'Зарегистрироваться' }
          </Button>
          { action === ACTION_AUTH &&
            <Link to="/register" className={ registerLink }>Зарегистрироваться</Link>
          }
        </Box>
      </Box>
    </AppContainer>
  );
}