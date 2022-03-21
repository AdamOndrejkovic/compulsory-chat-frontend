import axios from "axios"
import { Room, User } from "@/types/types";
import { CreateRoom, LoginUser, RegisterUser } from "@/types/api";

const client = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
})

client.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    console.log(error)

  }
)

export default{
  registerUser: async (user: RegisterUser): Promise<User> => {
    return await client.post("/users/register", user)
  },
  loginUser: async (user: LoginUser): Promise<User> => {
    return await client.post("/users/login", user)
  },
  getUsers: async (): Promise<User[]> => {
    return await client.get("/users/users")
  },
  createRoom: async  (room: CreateRoom): Promise<Room> => {
    return await client.post("/room/create", room )
  },
  getRooms: async  (): Promise<Room[]> => {
    return await client.get("/room/rooms")
  }
}
