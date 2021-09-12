import { io } from 'socket.io-client';

const socket = io('https://fuji-server.herokuapp.com', { autoConnect: false });

// Connection
export const connectSocket = (id) => {
  socket.auth = { userID: id };
  socket.connect();
};

export const disconnectSocket = () => socket.disconnect();

export const mongoConnectionFailListener = (id) => {
  socket.on('mongo-failed', () => {
    connectSocket(id);
  });
};

export const cleanupMongoConnectionFailListener = () => socket.off('mongo-failed');

// Connected contacts
export const contactsListenerAndUpdate = (updateStore) => {
  return socket.on('contacts', (contacts) => updateStore(contacts));
};
export const cleanupContactsListener = () => socket.off('contacts');
export const getContactsSockets = (contacts) => socket.emit('contacts', contacts);

// Messages
export const sendMessage = (payload) => socket.emit('message', payload);
export const messageListenerAndUpdate = (updateStore) => {
  return socket.on('message', (message) => updateStore(message));
};
export const cleanupMessageListener = () => socket.off('message');

export default socket;
