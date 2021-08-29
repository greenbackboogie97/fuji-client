export const chatConversationsSelector = (state) =>
  state.chat.conversations.conversations.conversations;

export const chatActiveConversationSelector = (state) =>
  state.chat.activeConversation.activeConversation;

export const chatFetchedMessagesSelector = (state) =>
  state.chat.activeConversation.fetchedMessages.fetchedMessages;
