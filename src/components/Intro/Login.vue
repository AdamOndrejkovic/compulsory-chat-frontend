<template>
  <div>
    <h2>Login to the chat app</h2>
    <form @submit.prevent="onSubmit">
      <div>
        <text-input
          label="Email"
          name="email"
          placeholder="Enter your email"
        />
        <text-input
          label="Password"
          name="password"
          placeholder="Enter your password"
        />
      </div>
      <div class="submitForm">
        <button type="submit">Login</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from "vue";
import { useForm } from "vee-validate";
import { LoginUser, RegisterUser } from "@/types/api";
import { object, string } from "yup";
import { useUserStore } from "@/stores/user";
import TextInput from "@/components/common/TextInput.vue";
import router from "@/router";
import { Routes } from "@/router/routes";

export default defineComponent({
  components: { TextInput },
  setup() {
    const { loginUser, loggedUser } = useUserStore()
    const { handleSubmit } = useForm<LoginUser>({
      validationSchema: object({
        email: string().email().required(),
        password: string().min(6).max(20).required(),
      }),
      initialValues: {
        email: "",
        password: "",
      }
    })

    const onSubmit = handleSubmit(async (values: LoginUser) => {
      await loginUser(values)
      if (loggedUser){
        setTimeout(async () => {
          await router.push({ name: Routes.Home })
        },1000)
      }
    })

    return {
      onSubmit,
    }
  }

})</script>

<style scoped>

</style>
