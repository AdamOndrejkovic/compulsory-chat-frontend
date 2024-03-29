export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  userList: Array<string>
}

export interface Chat {
  text: string;
  room: string;
}

export interface Room {
  id: string;
  name: string;
  createdBy: string;
}
