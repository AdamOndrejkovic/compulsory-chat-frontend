import { io } from "socket.io-client";
import { Chat } from "@/types/types";
import { Socket } from "socket.io";

export class ChatService {
  socket = io("localhost:3000");

  constructor() {
    this.socket.connect();
    this.socket.on("connect", () => {
      console.log(this.socket.id);
    });
  }

  createChat(chat: Chat) {
    this.socket.emit("createChat", chat);
  }

  listenToRoom(room: string, chatListener: (chat: Chat) => void) {
    this.socket.on(room, (chat: Chat) => {
      chatListener(chat);
    });
  }

  disconnectFromRoom(room: string) {
    this.socket.off(room);
  }

  isTyping(name: string) {
    this.socket.emit("typing", name)
  }

  isTypingListener(typingListener: (name: string) => void) {
    this.socket.on('someoneTyping', (name: string) => {
      typingListener(name)
    });
  }

  sendFriendRequest(sender: string, receiver: string) {
    this.socket.emit('friendRequest', sender, receiver)
  }

  receiveFriendRequest(){
    this.socket.on('newFriendRequest',function(friend){
      console.log('New request');
      console.log(friend);
    });
  }


}
