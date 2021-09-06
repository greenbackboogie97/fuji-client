import React, { useState } from 'react';
import { Button, IconButton, makeStyles } from '@material-ui/core';
import { IoIosAdd, IoIosArrowDown, IoIosCheckmark } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import FriendsModal from '../layout/profile/FriendsModal.jsx';
import { profileUserSelector } from '../../services/redux/slices/profileSlice/profileSelectors';
import {
  addFriend,
  getFriends,
  removeFriend,
} from '../../services/redux/slices/profileSlice/profileReducer';

export default function FriendsButton(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const profileUser = useSelector((state) => profileUserSelector(state));
  const isFriend = profileUser.friends.includes(props.id);
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalClose = () => setModalOpen(!modalOpen);

  const handleFriendsListClick = () => {
    setModalOpen(true);
    dispatch(getFriends(profileUser._id));
  };

  const handleFriendsActionClick = () => {
    if (!isFriend) {
      return dispatch(addFriend({ profile: profileUser._id, user: props.id }));
    }
    return dispatch(removeFriend({ profile: profileUser._id, user: props.id }));
  };

  return (
    <>
      {profileUser._id === props.id ? (
        <>
          <Button
            variant="outlined"
            color="default"
            onClick={handleFriendsListClick}
            endIcon={<IoIosArrowDown className={classes.arrowDown} />}
            className={classes.btnText}
          >
            Friends
          </Button>
          <FriendsModal open={modalOpen} onClose={handleModalClose} username={profileUser.name} />
        </>
      ) : (
        <>
          <IconButton className={classes.arrowDown} onClick={handleFriendsListClick}>
            <IoIosArrowDown />
          </IconButton>
          <Button
            variant="outlined"
            color="default"
            onClick={handleFriendsActionClick}
            endIcon={isFriend ? <IoIosCheckmark /> : <IoIosAdd />}
            className={classes.btnText}
          >
            Friends
          </Button>
          <FriendsModal open={modalOpen} onClose={handleModalClose} username={profileUser.name} />
        </>
      )}
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  arrowDown: {
    padding: theme.spacing(1),
    fontSize: 16,
    marginRight: theme.spacing(1),
  },
  btnText: {
    marginRight: theme.spacing(2),
  },
}));
