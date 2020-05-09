import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../store/app.context';
import {
  List,
  Fab,
  makeStyles,
  createStyles,
  Typography,
  Modal,
  InputBase,
  Button
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { AppContainer } from '../components/AppContainer';
import { ContactItem } from '../components/ContactItem';
import { Search } from '../components/Search';
import { useHttp } from '../hooks/useHttp';

const SOMETHING_WENT_WRONG_ERROR = 'Что-то пошло не так: ';

const useStyles = makeStyles(theme => createStyles({
  addButton: {
    marginTop: -theme.spacing(7),
    right: theme.spacing(7),
    bottom: theme.spacing(7),
    left: 'auto',
    position: 'fixed'
  },
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(5),
    outline: 0,
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    '& input': {
      marginBottom: theme.spacing(2),
      border: `2px solid ${theme.palette.primary.main}`,
      borderRadius: theme.shape.borderRadius,
      paddingLeft: theme.spacing(2),
    }
  }
}))

export const ContactsPage = () => {

  const [contacts, setContacts] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [open, setOpen] = useState(false);
  const [updateItem, setUpdateItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const { userId, addError } = useContext(AppContext);
  const { isLoading, request } = useHttp();
  const { addButton, modal, modalContent } = useStyles();

  const handleChange = ({ target: { value, name } }) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  const handleSearch = ({ target: { value } }) => {
    setSearchValue(value);
  }

  const handleDeleteItem = async id => {
    try {
      await request(`/contacts/${id}`, 'DELETE', {});
      setContacts(prev => prev.filter(contacts => contacts.id !== id));
    } catch (e) {
      addError(`${SOMETHING_WENT_WRONG_ERROR} ${e.message && e.message}`);
    }
  }

  const handleUpdateItem = ({ id, name, email }) => {
    setFormData({
      name,
      email
    });
    setUpdateItem(id);
    handleModalOpen();
  }

  const handleAddItem = async () => {

    const { name, email } = formData;

    if (updateItem) {
      try {
        const response = await request(`/contacts/${updateItem}`, 'PATCH', {
          name,
          email
        });
        setContacts(prev => prev.map(contact => contact.id === updateItem ? response : contact));
        setUpdateItem(null);
        handleModalClose();
        setFormData({
          name: '',
          email: ''
        })
      } catch (e) {
        addError(`${SOMETHING_WENT_WRONG_ERROR} ${e.message && e.message}`);
      }
      return;
    }

    try {
      const response = await request('/contacts', 'POST', {
        name,
        email,
        ownerId: userId,
      });

      setContacts(prev => [...prev, response]);
      setFormData({ name: '', email: '' });
      handleModalClose();
    } catch (e) {
      addError(`${SOMETHING_WENT_WRONG_ERROR} ${e.message && e.message}`);
    }
  }

  const handleModalOpen = () => setOpen(true);
  const handleModalClose = () => setOpen(false);

  useEffect(() => {
    if (userId) {
      request(`/contacts?ownerId=${userId}`, 'GET', null, {})
        .then(data => {
          setContacts(data);
        });
    }
  }, [userId, request]);

  const filteredContacts = searchValue ? contacts.filter(({ name }) =>
    name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
  ) : contacts;

  const isAddButtonDisabled = formData.name === '' || formData.email === '';

  return (
    <>
      <AppContainer title="Список контактов" isLoading={ isLoading }>
        <Search handleSearch={ handleSearch } value={ searchValue } />
        <List>
          {
            filteredContacts && filteredContacts.length ?
              filteredContacts.map(({ id, name, email }) =>
                <ContactItem
                  key={ id }
                  id={ id }
                  name={ name }
                  email={ email }
                  handleDeleteItem={ handleDeleteItem }
                  handleUpdateItem={ handleUpdateItem }
                />
              ) :
              <Typography>Контактов пока нет</Typography>
          }
        </List>
      </AppContainer>
      <Fab color="primary" aria-label="add" className={ addButton } onClick={ handleModalOpen }>
        <AddIcon />
      </Fab>
      <Modal open={ open } onClose={ handleModalClose } className={ modal } >
        <form className={ modalContent }>
          <InputBase placeholder="Имя" name="name" value={ formData.name } onChange={ handleChange } />
          <InputBase placeholder="E-mail" name="email" type="email" value={ formData.email } onChange={ handleChange } />
          <Button
            variant="contained"
            color="primary"
            disabled={ isAddButtonDisabled }
            onClick={ handleAddItem }
          >
            { updateItem ? 'Сохранить' : 'Добавить' }
          </Button>
        </form>
      </Modal>
    </>
  );
}