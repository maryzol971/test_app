import React from 'react';
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
  ListItemSecondaryAction
} from '@material-ui/core';
import { DeleteOutline, BorderColorOutlined } from '@material-ui/icons'

export const ContactItem = ({ id, name, email, handleDeleteItem, handleUpdateItem }) => {

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar />
      </ListItemAvatar>
      <ListItemText primary={ name } secondary={ email } />
      <ListItemSecondaryAction>
        <IconButton onClick={ () => handleUpdateItem({ id, name, email }) }>
          <BorderColorOutlined color="action" />
        </IconButton>
        <IconButton onClick={ () => handleDeleteItem(id) }>
          <DeleteOutline color="error" />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}