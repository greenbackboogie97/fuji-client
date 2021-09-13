import React from 'react';
import { Skeleton } from '@material-ui/lab';
import { Grid } from '@material-ui/core';
import FeedPostsPlaceholder from '../feed/feedComponents/FeedPostsPlaceholder.jsx';

export default function ProfilePlaceholder() {
  return (
    <>
      <Grid>
        <Skeleton variant="rect" height={223} style={{ marginBottom: 20 }} />
      </Grid>
      <FeedPostsPlaceholder />
    </>
  );
}
