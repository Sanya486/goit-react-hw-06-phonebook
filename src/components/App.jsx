import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addContact, deleteContact as deleteContactRedux, filter } from 'redux/store';

import { Container, Ul } from './App.styled';

import Title from './Title/Title';
import Form from './Form/Form';
import Contact from './Contact/Contact';
import Filter from './Filter/Filter';
import { Notify } from 'notiflix';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  const isFirstRender = useRef(true)

  const dispatch = useDispatch()
  const contactsRedux = useSelector((state) => state.contacts)
  const filterRedux = useSelector(state => state.filter)

  useEffect(() => {
    setContacts(JSON.parse(localStorage.getItem('contacts')) || []);
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addNewContact = (id, name, number) => {
    const isContactExist = contacts.some(
      contact => contact.name.toLocaleLowerCase() === name.toLocaleLowerCase()
    );
    if (!isContactExist) {
      // setContacts(prev => [{ id, name, number },  ...prev]);
      dispatch(addContact({ id, name, number }));
    }
    else {
      Notify.warning('Sorry, but this NAME has already exist!')
    }
  };

  const onFilterChange = e => {
    const value = e.target.value.toLowerCase();
    // setFilter(value);
    dispatch(filter(value));
  };

  const onActiveFilter = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterRedux)
    );
  };

  const deleteContact = id => {
    // setContacts(prevState => {
    //   return prevState.filter(contact => contact.id !== id);
    // });
    dispatch(deleteContactRedux(id));
  };

  return (
    <Container>
      <Title text="Phonebook"></Title>
      <Form onSubmit={addNewContact} />
      <Title text="Contacts"></Title>
      <Filter text={filter} onChange={onFilterChange} />
      <Ul>
        <Contact
          contacts={filter === '' ? contactsRedux : onActiveFilter()}
          deleteContact={deleteContact}
        />
      </Ul>
    </Container>
  ); ;
};

export default App;