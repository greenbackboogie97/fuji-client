import React from 'react';
import { makeStyles, CardContent, Typography } from '@material-ui/core';
import MediaCarousel from './MediaCarousel.jsx';

export default function PostContent(props) {
  const classes = useStyles();

  return (
    <CardContent className={classes.root}>
      <Typography className={classes.content}>
        <pre style={{ fontFamily: 'Inter', whiteSpace: 'pre-line', wordBreak: 'break-word' }}>
          {props.content}
        </pre>
      </Typography>
      {!!props.media.length && <MediaCarousel media={props.media} />}
    </CardContent>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  content: {
    color: theme.palette.primary.contrastText,
    marginBottom: theme.spacing(3),
  },
}));
