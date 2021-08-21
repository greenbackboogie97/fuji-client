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
  },
};

export default FujiAPI;
