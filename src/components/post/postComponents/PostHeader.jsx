import React, { useState } from 'react';
import {
  CardHeader,
  Avatar,
  makeStyles,
  IconButton,
  Menu,
  MenuItem,
  CircularProgress,
  ListItemIcon,
  Typography,
} from '@material-ui/core';
import { IoIosMore, IoIosTrash } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deletePost } from '../../../services/redux/slices/feedSlice/feedReducer';

export default function PostHeader(props) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const deleteStatus = useSelector((state) => state.feed.posts.deleteStatus);

  const handleUserClick = () => {
    history.push(`/profile/${props.authorID}`);
  };

  const handleClick = (e) => setAnchorEl(e.target);
  const handleClose = () => setAnchorEl(null);

  const handleDeletePost = async () => {
    await dispatch(deletePost(props.postID));
    return setAnchorEl(null);
  };

  return (
    <CardHeader
      className={classes.root}
      avatar={
        <>
          <Avatar src={props.avatar} className={classes.avatar} onClick={handleUserClick} />
        </>
      }
      title={props.username}
      subheader={props.time}
      action={
        props.action && (
          <>
            <IconButton className={classes.more} onClick={handleClick} disableRipple>
              <IoIosMore />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
              <MenuItem className={classes.delete} onClick={handleDeletePost}>
                {deleteStatus !== 'loading' ? (
                  <>
                    <ListItemIcon className={classes.ListItemIcon}>
                      <IoIosTrash color="red" />
                    </ListItemIcon>
                    <Typography noWrap>Delete</Typography>
                  </>
                ) : (
                  <CircularProgress size={24} color="inherit" />
                )}
              </MenuItem>
            </Menu>
          </>
        )
      }
    />
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
    color: theme.palette.primary.contrastText,
  },
  more: {
    padding: 2,
  },
  delete: {
    color: 'red',
    display: 'flex',
    justifyContent: 'center',
  },
  ListItemIcon: {
    minWidth: 'unset',
    marginRight: theme.spacing(4),
  },
  avatar: {
    cursor: 'pointer',
    '&:hover': {
      opacity: 0.75,
    },
  },
}));
