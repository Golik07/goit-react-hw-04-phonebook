import {useState,useEffect} from "react";
import { nanoid } from 'nanoid';
import ContactForm from "./Form"
import List from "./List/List";
import FilterContact from "./Filter/Filter";

export const  App = () => {

  const [contacts,setContacts] = useState(() => JSON.parse(window.localStorage.getItem('contacts')) ?? []);
  const [filter,setFilter] = useState('')

  const addContacts=(name,number)=> {
    const isAlreadyExist = contacts.find(contact => contact.name === name);
    if(isAlreadyExist) {
      return alert(`${name} is already in contacts`);
    }

    const newContact = {
      id:nanoid(),
      name,
      number,
    }

    setContacts((p) => [newContact,...p])
  };

  const handleDelete = id =>{
    setContacts(p => p.filter(el => el.id !== id))
  };

  const changeFilter = e => {
    const {value} = e.currentTarget;
    setFilter(value);
  }

  useEffect(() => {
    window.localStorage.setItem("contacts", JSON.stringify(contacts))
},[contacts])

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter))
  }

    const visibleContacts = getVisibleContacts();

    return(
      <div>
        <h1>PhoneBook</h1>
        <ContactForm onAddContact = {addContacts}/>
        <h2>Contacts</h2>
        <FilterContact onChange ={changeFilter} value={filter}/>
        <List
        contacts={visibleContacts}
        handleDelete={handleDelete}
        />
    </div>
    )
  }


