import { defineStore } from "pinia";
import { User as UserType } from "@/types/types";
import { LoginUser, RegisterUser } from "@/types/api";
import api from "@/services/api";

export const useUserStore = defineStore('user',{
  state: () => ({
    loggedUser: {} as UserType
  }),
  getters: {
    user: (state) => {
      if (state.loggedUser != undefined) return state.loggedUser;
      else return undefined;
    },
  },
  actions: {
    registerUser(user: RegisterUser) {
      api.registerUser(user).then((user) => (this.loggedUser = user))
    },
    loginUser(user: LoginUser) {
      api.loginUser(user).then((user) => (this.loggedUser = user))
    }
  }
})
