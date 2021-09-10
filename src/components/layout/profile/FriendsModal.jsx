import React, { useEffect, useRef, useState } from 'react';
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Modal,
  Typography,
} from '@material-ui/core';
import { IoIosSearch } from 'react-icons/io';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SearchInput from '../../inputs/SearchInput.jsx';
import { profileFriendsSelector } from '../../../services/redux/slices/profileSlice/profileSelectors';

export default function FriendsModal(props) {
  const classes = useStyles();
  const history = useHistory();
  const [searchValue, setSearchValue] = useState('');
  const profileFriends = useSelector((state) => profileFriendsSelector(state));
  const [filteredFriends, setFilteredFriends] = useState();
  const modalRef = useRef();

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    setFilteredFriends(
      profileFriends.filter((friend) =>
        friend.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  useEffect(() => {
    setFilteredFriends(profileFriends);
  }, [profileFriends]);

  const handleProfileClick = (id) => history.push(`/profile/${id}`);

  return (
    <Modal ref={modalRef} open={props.open} onClose={props.onClose}>
      <div className={classes.root}>
        <div className={classes.searchContainer}>
          <SearchInput
            placeholder={`Search ${props.username}'s friends`}
            adorment
            adormentIcon={<IoIosSearch />}
            value={searchValue}
            onChange={handleSearchChange}
          />
        </div>
        <List className={classes.list}>
          {filteredFriends && (
            <ListItem>
              <Typography
                className={classes.results}
              >{`${filteredFriends.length} results`}</Typography>
            </ListItem>
          )}
          {filteredFriends?.map((friend) => {
            return (
              <ListItem key={friend._id} className={classes.listItem}>
                <ListItemAvatar onClick={() => handleProfileClick(friend._id)}>
                  <Avatar src={friend.profilePicture} className={classes.avatar} />
                </ListItemAvatar>
                <ListItemText primary={friend.name} />
              </ListItem>
            );
          })}
        </List>
      </div>
    </Modal>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '80vw',
    height: '50vh',
    margin: '25vh auto',
    background: theme.palette.primary.background.paper,
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.primary.semi}`,
    padding: theme.spacing(2),
  },
  searchContainer: {
    width: '100%',
    padding: theme.spacing(1),
    margin: theme.spacing(1),
  },
  list: {
    overflow: 'auto',
    padding: theme.spacing(1),
    margin: theme.spacing(1),
  },
  listItem: {
    borderBottom: `1px solid ${theme.palette.primary.semi}`,
  },
  results: {
    color: theme.palette.secondary.semi,
  },
  avatar: {
    cursor: 'pointer',
    '&:hover': {
      opacity: 0.75,
    },
  },
}));
