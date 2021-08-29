import axios from 'axios';

const FujiAxios = axios.create({
  baseURL: 'https://fuji-server.herokuapp.com',
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
    changePassword(payload) {
      return FujiAxios.patch(`${this.resource}/changePassword`, payload);
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
