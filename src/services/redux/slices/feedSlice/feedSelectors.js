export const currentFeedSelector = (state) => state.feed.feedName;

export const feedStatusSelector = (state) => state.feed.posts.status;

export const feedPostsSelector = (state) => state.feed.posts.posts;

export const currentPostSelector = (state, postID) =>
  state.feed.posts.posts.find((el) => el._id === postID);
