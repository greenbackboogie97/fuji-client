import React from 'react';
import { Skeleton } from '@material-ui/lab';
import FeedPostsPlaceholder from '../feed/feedComponents/FeedPostsPlaceholder.jsx';

export default function ProfilePlaceholder() {
  return (
    <>
      <Skeleton variant="rect" height={223} style={{ marginBottom: 20 }} />
      <FeedPostsPlaceholder />
    </>
  );
}
