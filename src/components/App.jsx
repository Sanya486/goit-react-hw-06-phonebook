import { useSelector, useDispatch } from 'react-redux';
import {
  addContact,
  deleteContact as deleteContactRedux,
  filter,
} from 'redux/store';
import { getContacts, getFilter } from 'redux/selectors';
import { Container, Ul } from './App.styled';

import Title from './Title/Title';
import Form from './Form/Form';
import Contact from './Contact/Contact';
import Filter from './Filter/Filter';
import { Notify } from 'notiflix';

const App = () => {
  const dispatch = useDispatch();
  const contactsRedux = useSelector(getContacts);
  const filterRedux = useSelector(getFilter);

  const addNewContact = (id, name, number) => {
    const isContactExist = contactsRedux.some(
      contact => contact.name.toLocaleLowerCase() === name.toLocaleLowerCase()
    );
    if (!isContactExist) {
      dispatch(addContact({ id, name, number }));
    } else {
      Notify.warning('Sorry, but this NAME has already exist!');
    }
  };

  const onFilterChange = e => {
    const value = e.target.value.toLowerCase();
    dispatch(filter(value));
  };

  const onActiveFilter = () => {
    return contactsRedux.filter(contact =>
      contact.name.toLowerCase().includes(filterRedux)
    );
  };

  const deleteContact = id => {
    dispatch(deleteContactRedux(id));
  };

  return (
    <Container>
      <Title text="Phonebook"></Title>
      <Form onSubmit={addNewContact} />
      <Title text="Contacts"></Title>
      <Filter text={filterRedux} onChange={onFilterChange} />
      <Ul>
        <Contact
          contacts={filterRedux === '' ? contactsRedux : onActiveFilter()}
          deleteContact={deleteContact}
        />
      </Ul>
    </Container>
  );
};

export default App;
