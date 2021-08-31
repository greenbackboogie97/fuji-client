import React from 'react';
import { CardContent, Grid, makeStyles, Typography } from '@material-ui/core';

export default function PostContent(props) {
  const classes = useStyles();

  return (
    <CardContent className={classes.root}>
      <Typography className={classes.content}>{props.content}</Typography>
      {!!props.media.length && (
        <Grid container className={classes.mediaContainer}>
          {props.media.map((image, index) => {
            return (
              <Grid item xs="auto" key={index} className={classes.gridItem}>
                <img src={image} alt="media" className={classes.image} />
              </Grid>
            );
          })}
        </Grid>
      )}
    </CardContent>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  mediaContainer: {
    justifyContent: 'center',
  },
  gridItem: {
    maxHeight: '40%',
  },
  image: {
    maxWidth: '100%',
    maxHeight: '100%',
    borderRadius: theme.shape.borderRadius,
  },
  content: {
    color: theme.palette.primary.contrastText,
    marginBottom: theme.spacing(3),
  },
}));
