import React from 'react';
import { Button, Grid, makeStyles, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { setFeed } from '../../../services/redux/slices/feedSlice/feedReducer';

export default function NoDataPlaceholder() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleClick = () => dispatch(setFeed('community'));

  return (
    <Grid item xs={12} sm={10} md={9} lg={8} xl={7}>
      <Typography className={classes.cap} variant="caption">
        {`Your friends haven't posted anything yet`}
      </Typography>
      <Typography className={classes.inst} variant="caption">
        checkout the
        {
          <Button color="default" variant="text" onClick={handleClick} className={classes.btn}>
            community
          </Button>
        }
        feed instead
      </Typography>
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  cap: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(3),
    cursor: 'default',
    fontFamily: 'Inter',
    textAlign: 'center',
    fontSize: '16px',
  },
  inst: {
    display: 'flex',
    justifyContent: 'center',
    cursor: 'default',
    fontFamily: 'Inter',
    textAlign: 'center',
    fontSize: '16px',
  },
  btn: {
    margin: '0px 8px',
    top: '-6px',
    background: theme.palette.primary.background.paper,
    border: `1px solid ${theme.palette.primary.semi}`,
    transition: 'unset',
  },
}));
