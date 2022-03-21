<template>
<section class="md:flex md:flex-row h-auto flex-col-reverse gap-3 w-full justify-evenly">
  <div class="w-96 bg-blue-900 text-blue-50 relative overflow-y-scroll">
    <div class="py-2">
      <span class="visible absolute right-5 top-1" @click="changeVisible">
        <img v-if="visible" class="h-8 w-8" src="../../assets/images/close.png" alt="Close">
        <img v-else class="h-8 w-8" src="../../assets/images/open.png" alt="Open">
      </span>
      <br>
      <h3 class="user">Logged in as {{ loggedUser.name }}</h3>
    </div>
      <div class="sub-box md:visible" :class="visible ? 'visible' : 'hidden'">
        <p>Users</p>
        <hr>
        <input v-model="search" type="text" placeholder="Search for user" class="mt-5 text-black">
        <ul>
          <li v-for="user in filterList" :key="user.id">
          <span v-if="user.id !== loggedUser.id" class="flex justify-center py-2">
            {{ user.name }}
            <img @click="sendRequest(user.name)" class="h-8 w-8" src="../../assets/images/add.png" alt="">
          </span>
          </li>
        </ul>
      </div>
      <div class="sub-box md:visible" :class="visible ? 'visible' : 'hidden'">
        <p>Rooms</p>
        <hr>
        <ul>
          <li v-for="room in rooms" :key="room.id">
            <span @click="chatRoom = room.name">{{ room.name }}</span>
          </li>
        </ul>
        <form @submit.prevent="onSubmit" class="flex justify-evenly mt-6">
          <text-input
            label="Name"
            name="name"
            placeholder="Enter room name"
          />
          <button type="submit" class="px-2 rounded bg-white text-black">Add Room</button>
        </form>
      </div>
  </div>
  <div class="chat h-full relatives md:w-2/3">
    <span v-if="chatRoom" class="text-blue-50">Chatting with {{ chatRoom }} </span>
    <span v-else class="text-blue-50 h-4/5 grid grid-cols-1 gap-4 place-items-center">You need to join room before being able to chat</span>
    <div v-if="chatRoom" class="h-2/3">
      <ul class="overflow-y-scroll md:h-full md:mt-24 h-1/2">
        <li v-for="(chat, index) in chats" v-bind:key="index" class="text-blue-50">
          {{ chat.text }}
          <span class="text-blue-50">
            {{typing }}
          </span>
        </li>
      </ul>
    </div>
    <form v-if="chatRoom" @submit.prevent="sendChat" class="flex justify-end mt-16 mr-5 gap-3">
      <text-input
        v-model="message"
        name="message"
        placeholder="Enter your message"
      />
      <button type="submit" class="px-2 rounded bg-white text-black">Send</button>
    </form>
  </div>
</section>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, watch } from "vue";
import api from "@/services/api";
import { Room, User } from "@/types/types";
import { useUserStore } from "@/stores/user";
import { useForm } from "vee-validate";
import { object, string } from "yup";
import TextInput from "@/components/common/TextInput.vue";
import { useChatStore } from "@/stores/chat";


type CreateRoom = {
  name: string
  createdBy: string
}
export default defineComponent({
  components: { TextInput },
  setup() {
    const  user = toRefs(useUserStore().loggedUser)
    const users = ref<User[]>([])
    const rooms = ref<Room[]>([])
    const { chats, createChat, setRoom, isTyping, typing, sendFriendRequest } = useChatStore()
    const room = ref<string>("")
    const message = ref<string>("")
    const search = ref<string>("")
    const visible = ref<boolean>(false)
    const filterList = ref<User[]>([])

    const getUsers = async () => {
      users.value =  await api.getUsers()
      filterList.value = users.value;
    }
    getUsers()

    const getRooms = async () => {
      rooms.value = await api.getRooms()
    }
    getRooms()

    const changeVisible = () => {
      visible.value = !visible.value
    }

    watch(() => search.value,
      () => {
        filterList.value = users.value.filter(user => user.name.includes(search.value) )
      },
      {deep:true}
    )

    const { handleSubmit, resetForm } = useForm<CreateRoom>({
      validationSchema: object({
        name: string().min(2).max(30).required(),
        createdBy: string().required(),
      }),
      initialValues: {
        name: "",
        createdBy: user.id.value || "c7de97dd-9cdd-4ab8-8d0e-09f6e35a955c"
      }
    })



    const onSubmit = handleSubmit(async (values: CreateRoom) => {
      if (await api.createRoom(values)) {
        resetForm()
        await getRooms()
      }else {
        alert("Error occurred while creating a room")
      }
    })

    watch(
      () => room.value,
      () => {
        setRoom(room.value);

      },
      {deep: true}
    )

    watch( () => message.value,
      () => {
      isTyping(user.name.value)
      },
      {deep: true}
    )
    const sendChat = () => {
      createChat({ text: message.value, room: room.value})
    }

    const sendRequest = (name: string) => {
      sendFriendRequest(user.name.value, name)
    }


    return {
      filterList,
      rooms,
      loggedUser: user as unknown as User,
      onSubmit,
      sendChat,
      chatRoom: room,
      chats,
      message,
      visible,
      changeVisible,
      typing,
      search,
      sendRequest,
    }
  }
})
</script>

<style scoped>
section {
  height: 80vh;
}

.user {
  position: absolute;
  top: 5px;
  left: 5px;
}

.sub-box {
  padding: 15px 10px;
}

.sub-box p {
  font-size: 22px;
}

button:hover {
  background-color: black;
  color: white;
}

.chat {
  background-color: #2c3e50;
}

</style>
