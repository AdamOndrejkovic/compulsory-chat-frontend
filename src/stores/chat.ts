import { defineStore } from "pinia";
import { Chat as ChatType } from "@/types/types";
import { ChatService } from "@/services/chat.service";

const chatService = new ChatService();

export const useChatStore = defineStore('chat',{
  state: () => ({
    chats: [{ text: "First chat" }, { text: "Second chat" }] as ChatType[],
    room: "",
  }),
  actions: {
    createChat(chat: ChatType) {
      chatService.createChat(chat);
      this.chats.push(chat);
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
  },
});
