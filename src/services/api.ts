import axios from "axios"
import {User} from "@/types/types";
import { LoginUser, RegisterUser } from "@/types/api";

const client = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
})

client.interceptors.response.use(
  (response) => {
    console.log(response.data)
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
  }
}
