import React, { useState, useRef, useEffect } from 'react';
import { makeStyles, List } from '@material-ui/core';
import { IoMdSearch } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import SearchInput from '../../inputs/SearchInput.jsx';
import Contact from './Contact.jsx';
import ExpandButton from './ExpandButton.jsx';
import {
  getConversation,
  getConversations,
} from '../../../services/redux/slices/chatSlice/chatReducer';
import {
  chatActiveConversationSelector,
  chatConversationsSelector,
} from '../../../services/redux/slices/chatSlice/chatSelectors';
import { authUserSelector } from '../../../services/redux/slices/authSlice/authSelectors';

export default function ControlBar() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const chatConversations = useSelector((state) => chatConversationsSelector(state));
  const chatActiveConversation = useSelector((state) => chatActiveConversationSelector(state));
  const authUser = useSelector((state) => authUserSelector(state));
  const [expanded, setExpanded] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    dispatch(getConversations());
  }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleSearchClick = () => {
    setExpanded(true);
    setTimeout(() => {
      inputRef.current.focus();
    }, 0);
  };

  const handleContactClick = (id) => {
    if (chatActiveConversation?._id === id) return;
    dispatch(getConversation(id));
  };

  return (
    <div className={classes.root}>
      <div className={classes.cbLeft}>
        <div className={classes.cbSearchContainer}>
          <IoMdSearch className={classes.searchIcon} onClick={handleSearchClick} />
          {expanded ? (
            <SearchInput inputRef={inputRef} placeholder="Search contacts" adorment={false} />
          ) : null}
        </div>
        <List className={classes.contactList}>
          {chatConversations &&
            chatConversations.map((conversation) => (
              <Contact
                onClick={() => handleContactClick(conversation._id)}
                key={conversation._id}
                expanded={expanded}
                avatarSrc={
                  conversation.participants.filter((el) => el._id !== authUser._id)[0]
                    .profilePicture
                }
                username={conversation.participants.filter((el) => el._id !== authUser._id)[0].name}
              />
            ))}
        </List>
      </div>

      <div className={classes.cbRight}>
        <ExpandButton expanded={expanded} expandHandler={handleExpandClick} />
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    borderRight: `1px solid ${theme.palette.primary.semi}`,
    borderTopLeftRadius: theme.shape.borderRadius,
    display: 'flex',
    background: theme.palette.primary.background.paper,
  },
  cbLeft: {
    padding: theme.spacing(2),
    paddingRight: 0,
    maxWidth: 200,
  },
  cbRight: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  cbSearchContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: theme.spacing(2),
  },
  searchIcon: {
    fontSize: '21px',
    padding: 1,
    height: '100%',
    cursor: 'pointer',
    marginRight: theme.spacing(2),
  },
  contactList: {
    padding: '0',
    height: 'calc(50vh - 67px)',
    overflow: 'auto',
  },
}));
