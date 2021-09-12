export const activeUsersSelector = (state) => state.chat.activeUsers.users;

export const contactsSelector = (state) => state.chat.contacts.contacts;

export const contactsStatusSelector = (state) => state.chat.contacts.status;

export const contactsSocketStatusSelector = (state) => state.chat.contacts.socketStatus;

export const activeConversationSelector = (state) => state.chat.activeConversation.conversation;

export const activeConversationIDSelector = (state) =>
  state.chat.activeConversation.conversation?._id;

export const activeConversationStatusSelector = (state) => state.chat.activeConversation.status;
