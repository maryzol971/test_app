import React from 'react';
import { Grid, Typography, makeStyles, createStyles } from '@material-ui/core';
import { Header } from '../Header';
import { Loading } from '../Loading';

const useStyles = makeStyles(theme => createStyles({
  container: {
    paddingTop: 80,
    minHeight: '100vh'
  }
}))

export const AppContainer = ({ title, isLoading = false, children }) => {

  const { container } = useStyles();

  return (
    <Grid container justify="center" className={ container }>
      <Header />
      { isLoading
        ? (
          <Loading />
        )
        : (
          <Grid md={ 5 } item>
            <Typography
              component="h1"
              variant="h4"
              align="center"
              display="block"
              color="primary"
              paragraph

            >
              { title }
            </Typography>

            { children }
          </Grid>
        ) }
    </Grid>
  );
}
