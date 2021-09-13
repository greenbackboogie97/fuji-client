import React, { useState, useEffect } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import FujiAPI from '../../services/API/FujiAPI';
import DropdownLoading from './searchDropdownComponents/DropdownLoading.jsx';
import DropdownResults from './searchDropdownComponents/DropdownResults.jsx';

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
      {(loading && <DropdownLoading />) ||
        (!!users.length ? (
          <DropdownResults
            length={users.length}
            results={users}
            onUserClick={(userID) => handleUserClick(userID)}
          />
        ) : (
          <Typography style={{ textAlign: 'center' }}>No results</Typography>
        ))}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: 200,
    width: '100%',
    border: `1px solid ${theme.palette.primary.semi}`,
    borderTop: 'none',
    position: 'absolute',
    overflow: 'auto',
    zIndex: 2,
    top: 42,
    background: theme.palette.primary.background.paper,
  },
}));
