import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { IoIosImages } from 'react-icons/io';

export default function MediaButton(props) {
  const classes = useStyles();
  return (
    <Button
      variant="outlined"
      color="default"
      endIcon={<IoIosImages className={classes.button} />}
      className={classes.btnText}
      onClick={props.onClick}
    >
      Media
    </Button>
  );
}

const useStyles = makeStyles((theme) => ({
  btnText: {
    marginRight: theme.spacing(2),
  },
}));
