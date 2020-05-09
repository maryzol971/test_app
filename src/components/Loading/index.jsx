import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

const skeletons = new Array(Math.floor(window.innerHeight / 20))
  .fill(0)
  .map((_, ind) => <Skeleton animation='wave' key={`skelet-${ind}`}/>)

const useStyles = makeStyles(() => createStyles({
  loadingRoot: {
    width: '100%'
  }
}));

export const Loading = () => {

  const { loadingRoot } = useStyles();

  return (
    <div className={ loadingRoot }>
      { skeletons }
    </div>
  );
}