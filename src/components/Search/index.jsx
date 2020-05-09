import React from 'react';
import {
  InputBase,
  makeStyles,
  createStyles
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { fade } from '@material-ui/core/styles';


export const useStyles = makeStyles(theme => createStyles({
  search: {
    border: `1px solid ${theme.palette.common.black}`,
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(4),
    width: '100%'
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

export const Search = ({ value, handleSearch }) => {

  const classes = useStyles();

  return (
    <div className={ classes.search }>
      <div className={ classes.searchIcon }>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Поиск"
        classes={ {
          root: classes.inputRoot,
          input: classes.inputInput,
        } }
        inputProps={ { 'aria-label': 'search' } }
        onChange={ handleSearch }
        value={ value }
      />
    </div>
  );
}