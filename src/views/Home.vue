<template>
  <section>
    <div v-if="user.name
     === undefined">
      <p>You need to login before being able to use our chat service</p>
    </div>
    <div v-else>
      <chat v-if="user !== undefined"/>
    </div>
  </section>
</template>

<script lang="ts">
import { useUserStore } from "@/stores/user";
import { User } from "@/types/types";
import { defineComponent, ref, toRefs } from "vue";
import Chat from "@/components/Chat/Chat.vue";

export default defineComponent({
  components: {
    Chat
  },
  setup() {
    const  user = toRefs(useUserStore().loggedUser)

    return {
      user: user as unknown as User
    }
  }
})


</script>
<style scoped>
</style>
