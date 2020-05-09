import React, { useContext } from 'react';
import { AppBar, makeStyles, createStyles, Toolbar, Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { AppContext } from '../../store/app.context';

const useStyles = makeStyles(theme => createStyles({
  header: {
    height: 60
  },
  title: {
    flexGrow: 1,
    color: theme.palette.common.white,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    }
  }
}));

export const Header = () => {

  const { header, title } = useStyles();
  const { isAuth, auth } = useContext(AppContext);

  return (
    <AppBar position="fixed" className={ header } color='secondary'>
      <Toolbar>
        <Typography
          to={ isAuth ? '/contacts' : '/auth' }
          className={ title }
          variant="h6"
          component={ Link }
        >
          Личный кабинет
          </Typography>
        { isAuth &&
          <Button variant="outlined" color="inherit" onClick={ () => auth(false) }>выйти</Button>
        }
      </Toolbar>
    </AppBar>
  );
}