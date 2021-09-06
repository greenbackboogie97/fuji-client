// eslint-disable-next-line import/no-extraneous-dependencies
import { createSelector } from 'reselect';

export const currentFeedSelector = (state) => state.feed.feedName;

export const feedStatusSelector = (state) => state.feed.posts.status;

export const feedPostsSelector = (state) => state.feed.posts.posts;

export const currentPostSelector = createSelector(
  [feedPostsSelector, (state, postID) => postID],
  (posts, postID) => posts.find((post) => post._id === postID)
);

export const newCommentStatusSelector = (state) => state.feed.posts.newCommentStatus;

export const feedCommentsStatusSelector = (state) => state.feed.posts.commentsStatus;
