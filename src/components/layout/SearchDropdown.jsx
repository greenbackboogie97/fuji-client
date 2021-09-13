import React, { useState, useEffect } from 'react';
import { Avatar, makeStyles, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { useHistory } from 'react-router-dom';
import FujiAPI from '../../services/API/FujiAPI';

export default function SearchDropdown(props) {
  const classes = useStyles();
  const history = useHistory();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    FujiAPI.users.getUsers().then((res) => {
      if (props.value)
        setUsers(
          res.data.data.users.filter((user) =>
            user.name.toLowerCase().includes(props.value.toLowerCase())
          )
        );
      setLoading(false);
    });
    return setUsers([]);
  }, [props.value]);

  const handleUserClick = (id) => history.push(`/profile/${id}`);

  return (
    <div className={classes.root}>
      {(loading && (
        <>
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="100%" />
        </>
      )) ||
        (!!users.length ? (
          <>
            <div className={classes.results}>
              <Typography>{`${users.length} results`}</Typography>
            </div>
            {users.map((user) => {
              return (
                <div
                  className={classes.user}
                  key={user._id}
                  onClick={() => handleUserClick(user._id)}
                >
                  <Avatar className={classes.avatar} src={user.profilePicture} />
                  <Typography>{user.name}</Typography>
                </div>
              );
            })}
          </>
        ) : (
          <Typography>No results</Typography>
        ))}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: 200,
    width: '100%',
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.primary.semi}`,
    borderTop: 'none',
    position: 'absolute',
    overflow: 'auto',
    zIndex: 2,
    top: 42,
    background: theme.palette.primary.background.paper,
  },
  results: {
    top: 0,
    position: 'sticky',
    zIndex: 5,
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
  },
  user: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    '&:hover': {
      opacity: 0.7,
    },
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
  },
  avatar: {
    height: 32,
    width: 32,
    marginRight: theme.spacing(2),
  },
}));
