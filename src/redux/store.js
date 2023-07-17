import { configureStore, createSlice } from '@reduxjs/toolkit';


export const addContactSlice = createSlice({
  name: 'contacts',
 initialState: [],
    reducers: {
        addContact: (state, action) => {
            state.push(action.payload)
        },
        deleteContact: (state, action) => {
            return state.filter(contact => contact.id !== action.payload)
        }
  },
});

export const filterSlice = createSlice({
    name: 'filter',
    initialState: '',
    reducers: {
        filter: (state, action) => {
            state = action.payload
        }
    }
})

export const store = configureStore({
  reducer: {
    contacts: addContactSlice.reducer,
    fiter: filterSlice.reducer,
  },
});

export const { addContact, deleteContact } = addContactSlice.actions;

export const { filter } = filterSlice.actions;
