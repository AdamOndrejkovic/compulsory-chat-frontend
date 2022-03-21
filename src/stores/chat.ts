import { defineStore } from "pinia";
import { Chat as ChatType } from "@/types/types";
import { ChatService } from "@/services/chat.service";

const chatService = new ChatService();

export const useChatStore = defineStore('chat',{
  state: () => ({
    chats: [] as ChatType[],
    room: "",
    typing: ""
  }),
  actions: {
    isTyping(username: string) {
      chatService.isTyping(username)
    },
    createChat(chat: ChatType) {
      chatService.createChat(chat);
    },
    receiveChat(chat: ChatType) {
      this.chats.push(chat);
    },
    setRoom(room: string) {
      if (this.room) chatService.disconnectFromRoom(this.room);
      this.room = room;
      chatService.listenToRoom(room, (chat) => {
        this.chats.push(chat);
      });
    },
    typingListener() {
      chatService.isTypingListener((name) => {
        this.typing = name;
      })
    },
    sendFriendRequest(sender: string, receiver: string) {
      chatService.sendFriendRequest(sender, receiver)
    }
  },
});
