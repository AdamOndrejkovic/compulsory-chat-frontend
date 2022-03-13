<template>
  <div class="intro-container">
    <nav class="flex gap-6 justify-center pb-6">
      <div
        :class="component === 'register' ? 'active' : ''"
        @click="component = 'register'"
      >
        Register
      </div>
      <div
        :class="component === 'login' ? 'active' : ''"
        @click="component = 'login'"
      >
        Login
      </div>
    </nav>
    <component :is="component"></component>
  </div>

</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useForm } from "vee-validate";
import { LoginUser, RegisterUser } from "@/types/api";
import { object, string } from "yup";
import Login from "@/components/Intro/Login.vue";
import Register from "@/components/Intro/Register.vue";

export default defineComponent({
  components: {
    Register,
    Login,
  },
  setup() {
    const component = ref("register")

    return {
      component,
    }
  }

})</script>

<style>
.intro-container {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  background-color: rgba(255,255,255,0.5);
  width: 350px;
  padding: 25px 15px;
}

.active {
  text-decoration: skyblue;
  text-decoration: underline;
}

.formItem {
  @apply flex flex-col py-4
}

.formItem input {
  display: block;
  margin-right: auto;
  margin-left: auto;
  border-radius: 25px;
}

.submitForm {
  border-radius: 25px;
  background-color: aquamarine;
  width: 100px;
  margin: auto;
  margin-top: 10px;
}
</style>
