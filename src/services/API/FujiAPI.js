import axios from 'axios';

const FujiAxios = axios.create({
  baseURL: 'https://fujiserver.omerziger.com',
  withCredentials: true,
});

const FujiAPI = {
  users: {
    resource: '/users',
    signIn(payload) {
      return FujiAxios.post(`${this.resource}/signin`, payload);
    },
    signUp(payload) {
      return FujiAxios.post(`${this.resource}/signup`, payload);
    },
    isCookie() {
      return FujiAxios.get(`${this.resource}/cookie`);
    },
    getUsers() {
      return FujiAxios.get(`${this.resource}`);
    },
    getUser(payload) {
      return FujiAxios.get(`${this.resource}/${payload}`);
    },
    editUser(payload) {
      return FujiAxios.patch(`${this.resource}`, payload);
    },
    changePassword(payload) {
      return FujiAxios.patch(`${this.resource}/changePassword`, payload);
    },
  },
  feed: {
    resource: '/posts',
    getPosts(payload) {
      return FujiAxios.get(`${this.resource}/${payload}`);
    },
    publishPost(payload) {
      return FujiAxios.post(`${this.resource}`, payload);
    },
    deletePost(payload) {
      return FujiAxios.delete(`${this.resource}/${payload}`);
    },
    getComments(payload) {
      return FujiAxios.get(`${this.resource}/${payload}/comment`);
    },
    addComment(payload) {
      return FujiAxios.post(`${this.resource}/${payload.id}/comment`, { content: payload.content });
    },
    addLike(payload) {
      return FujiAxios.post(`${this.resource}/${payload}/like`, {});
    },
    removeLike(payload) {
      return FujiAxios.delete(`${this.resource}/${payload}/like`);
    },
  },
  friends: {
    resource: '/friends',
    getFriends(payload) {
      return FujiAxios.get(`${this.resource}/${payload}`);
    },
    addFriend(payload) {
      return FujiAxios.patch(`${this.resource}/${payload}`, {});
    },
    removeFriend(payload) {
      return FujiAxios.delete(`${this.resource}/${payload}`);
    },
  },
  media: {
    resource: '/media',
    uploadMedia(payload) {
      return FujiAxios.post(`${this.resource}`, payload);
    },
    getMedia(payload) {
      return FujiAxios.get(`${this.resource}/${payload}`);
    },
  },
  chat: {
    resource: '/chat',
    getConversations() {
      return FujiAxios.get(`${this.resource}`);
    },
    getConversation(payload) {
      return FujiAxios.get(`${this.resource}/${payload}`);
    },
    createConversation(payload) {
      return FujiAxios.post(`${this.resource}/${payload}`);
    },
    getMessages(payload) {
      return FujiAxios.get(`${this.resource}/${payload}/messages`);
    },
    sendMessage(payload) {
      return FujiAxios.post(`${this.resource}/${payload.conversation}/messages`, {
        content: payload.content,
      });
    },
  },
};

export default FujiAPI;
