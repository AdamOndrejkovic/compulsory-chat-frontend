<template>
  <section>
    <div v-if="user === undefined">
      <p>You need to login</p>
    </div>
    <div v-else>
    </div>
  </section>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Intro from "@/components/Intro/Intro.vue";
import { useUserStore } from "@/stores/user";
import { User } from "@/types/types";
import { ref, toRefs } from "vue";


@Options({
  components: {
  },
  setup() {
    const  user = toRefs(useUserStore().loggedUser)

    return {
      user: user as unknown as User
    }
  }
})
export default class Home extends Vue {}
</script>
<style scoped>
</style>
