import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { Grid } from '@material-ui/core';

export default function FeedPostsPlaceholder() {
  return (
    <Grid item xs={12} sm={10} md={9} lg={8} xl={7}>
      <Skeleton
        variant="rect"
        width={'100%'}
        height={100}
        style={{ borderRadius: 4, marginBottom: 20 }}
      />
      <Skeleton
        variant="rect"
        width={'100%'}
        height={100}
        style={{ borderRadius: 4, marginBottom: 20 }}
      />
    </Grid>
  );
}
