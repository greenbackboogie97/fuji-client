import React from 'react';
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  makeStyles,
} from '@material-ui/core';
import TimeAgo from 'timeago-react';
import { useHistory } from 'react-router-dom';

export default function PostComment(props) {
  const classes = useStyles();
  const history = useHistory();

  const handleUserClick = () => history.push(`/profile/${props.authorID}`);

  return (
    <ListItem className={classes.root}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <ListItemAvatar>
          <Avatar src={props.avatar} onClick={handleUserClick} className={classes.avatar} />
        </ListItemAvatar>
        <ListItemText
          primary={props.username}
          secondary={<Typography variant="body1">{props.content}</Typography>}
        />
      </div>
      <Typography className={classes.time} variant="body2">
        {<TimeAgo datetime={props.time} />}
      </Typography>
    </ListItem>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(3),
    border: `1px solid ${theme.palette.primary.semi}`,
    borderRadius: theme.shape.borderRadius,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  avatar: {
    cursor: 'pointer',
    '&:hover': {
      opacity: 0.75,
    },
  },
  time: {
    marginLeft: 56,
  },
}));
