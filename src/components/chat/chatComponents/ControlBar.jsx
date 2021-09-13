import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import SearchInput from '../../inputs/SearchInput.jsx';
import SearchButton from './SearchButton.jsx';
import ExpandButton from '../../buttons/ExpandButton.jsx';
import {
  activeConversationIDSelector,
  contactsSelector,
  contactsSocketStatusSelector,
} from '../../../services/redux/slices/chatSlice/chatSelectors';
import Contact from './Contact.jsx';
import {
  createConversation,
  getConversation,
} from '../../../services/redux/slices/chatSlice/chatReducer';
import ContactsPlaceholder from './ContactsPlaceholder.jsx';

export default function ControlBar() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  const inputRef = useRef();
  const contacts = useSelector((state) => contactsSelector(state));
  const activeConversationID = useSelector((state) => activeConversationIDSelector(state));
  const [filteredContacts, setFilteredContacts] = useState();
  const [searchValue, setSearchValue] = useState('');
  const contactsSocketStatus = useSelector((state) => contactsSocketStatusSelector(state));

  useEffect(() => setFilteredContacts(contacts), [contacts]);

  const handleSearchValueChange = (e) => {
    setSearchValue(e.target.value);
    setFilteredContacts(
      contacts.filter((contact) =>
        contact.user.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  const handleExpandClick = () => setExpanded(!expanded);

  const handleSearchClick = () => {
    setExpanded(true);
    setTimeout(() => {
      inputRef.current.focus();
    }, 0);
  };

  const handleContactClick = (contact) => {
    const { conversationID, contactID } = contact;
    if (conversationID === activeConversationID) return;
    if (!conversationID) {
      dispatch(createConversation(contactID));
      return;
    }
    dispatch(getConversation(conversationID));
    setExpanded(false);
  };

  return (
    <div className={classes.root}>
      <div className={classes.controlBarLeft}>
        <div className={classes.searchContainer}>
          <SearchButton onClick={handleSearchClick} />
          {expanded && (
            <SearchInput
              inputRef={inputRef}
              placeholder="Search Contacts..."
              value={searchValue}
              onChange={handleSearchValueChange}
            />
          )}
        </div>
        <ul className={classes.contactList}>
          {contactsSocketStatus === 'success' ? (
            filteredContacts?.map((contact) => {
              return (
                <Contact
                  key={contact.user._id}
                  expanded={expanded}
                  username={contact.user.name}
                  avatar={contact.user.profilePicture}
                  connected={Boolean(contact.socket)}
                  onClick={() =>
                    handleContactClick({
                      conversationID: contact.conversation,
                      contactID: contact.user._id,
                    })
                  }
                />
              );
            })
          ) : (
            <ContactsPlaceholder />
          )}
        </ul>
      </div>
      <div className={classes.controlBarRight}>
        <ExpandButton expanded={expanded} expandHandler={handleExpandClick} />
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    zIndex: 2,
    background: theme.palette.primary.background.paper,
    borderRight: `1px solid ${theme.palette.primary.semi}`,
    borderTopLeftRadius: theme.shape.borderRadius,
    width: 'fit-content',
    maxWidth: '65%',
  },
  controlBarLeft: {
    padding: theme.spacing(5),
    paddingRight: 0,
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    height: theme.spacing(9),
  },
  contactList: {
    padding: 0,
    marginTop: theme.spacing(4),
    listStyleType: 'none',
  },
  controlBarRight: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
}));
