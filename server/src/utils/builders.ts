export const buildFindMessageParams = (params: FineMessageParams) => ({
  id: params.messageId,
  author: { id: params.userId },
  conversation: { id: params.conversationId },
});
