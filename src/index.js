import './index.css';
import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {Notify, Confirm} from 'notiflix';
import ContactIcon from './contact.png';
import addToContactsIcon from './add-contact.png';
import contactsAppLogo from './user-groups.png';
import trashCanIcon from './trash-can.png';

const container = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
}

const contactsBlock = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    maxWidth: '320px',
    margin: '20px 10px',
    backgroundColor: '#673AB7',
    borderRadius: '10px',
}

const contactForm = {
    display: 'flex',
    gap: '2px',
    padding: '20px 20px',
}

const contactsInput = {
    width: '200px',
    height: '33px',
    color: '#fff',
    background: '0 0',
}

const contactsButton = {
    width: '40px',
    height: '40px',
    padding: '0 0',
    border: '0',
}

const contactsList = {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '6px',
    gap: '10px',
    width: '260px',
    padding: '10px 10px',
}

const singleContactItem = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'start',
    alignItems: 'center',
    listStyleType: 'none',
    backgroundColor: '#FFF',
    gap: '10px',
    margin: '5px 5px',
    borderRadius: '10px',
}

const contactName = {
    margin: '5px 0',
}

const addToContactsImage = {
    textAlign: 'center',
}

const appHeader = {
    display: 'flex',
    gap: '25px',
    margin: '10px 10px',
}

const appHeaderText = {
    backgroundColor: '#673AB7',
    color: '#fff',
    padding: '5px 5px',
    borderRadius: '25px',
    fontSize: '26px',
    minWidth: '170px',
    textAlign: 'center',
}

const deleteContactIcon = {
    marginLeft: 'auto',
    marginRight: '5px',
}

function AddPersonForm(props) {
    const [person, setPerson] = useState('');

    function handleChange(e) {
        setPerson(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (person !== '') {
            props.handleSubmit(person);
            setPerson('');
            Notify.success('Contact added successfully')
        } else {

            Notify.failure('Please insert your contact information')
        }
    }


    return (
        <form style={contactForm} onSubmit={handleSubmit}>
            <input type="text"
                   style={contactsInput}
                   placeholder="Add new contact"
                   onChange={handleChange}
                   value={person}/>
            <button type="submit" style={contactsButton}><img src={addToContactsIcon} className="addButton" width={40}
                                                              height={40}
                                                              alt={"Add to contacts button"}/>
            </button>
        </form>
    );
}


function removeContact(event) {
    Confirm.show(
        'Warning',
        'Are you sure you want to delete this contact?',
        'Yes',
        'No',
        () => {
            const contactToBeDeleted = event.target.closest('li');
            contactToBeDeleted.remove();
            Notify.failure('Contact deleted')
        },
        () => {
            Notify.info('User was not deleted. Better to keep people around yourself!')
        }
    )

}

function PeopleList(props) {
    const arr = props.data;
    const listItems = arr.map((val, index) =>
        <li style={singleContactItem} key={index}><img style={addToContactsImage} src={ContactIcon} width={26}
                                                       height={26} alt={"Contact book image"}/><p
            style={contactName}>{val}</p><img src={trashCanIcon} onClick={removeContact} style={deleteContactIcon}
                                              width={26}
                                              height={26} alt={'Delete contact icon'}/></li>
    );
    return <ul style={contactsList}>{listItems}</ul>;
}

function ContactManager(props) {
    const [contacts, setContacts] = useState(props.data);

    function addPerson(name) {
        setContacts([...contacts, name]);
    }

    return (
        <div style={container}>
            <div style={appHeader}>
                <img src={contactsAppLogo} alt={'Contacts app logo'}/>
                <h1 style={appHeaderText}>My contacts</h1>
            </div>
            <div style={contactsBlock}>
                <AddPersonForm handleSubmit={addPerson}/>
                <PeopleList data={contacts}/>
            </div>
        </div>
    );
}

const contacts = ["Patrick Bateman", "Thomas Anderson", "Bruce Wayne"];

ReactDOM.render(
    <ContactManager data={contacts}/>,
    document.getElementById('root')
);