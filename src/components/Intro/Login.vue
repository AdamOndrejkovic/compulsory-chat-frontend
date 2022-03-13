<template>
  <div>
    <h2>Login to the chat app</h2>
    <form @submit.prevent="onSubmit">
      <div class="formItem">
        <label>Email</label>
        <input type="email" name="email">
      </div>
      <div class="formItem">
        <label>Password</label>
        <input type="password" name="password">
      </div>
      <div class="submitForm">
        <button type="submit">Login</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useForm } from "vee-validate";
import { LoginUser, RegisterUser } from "@/types/api";
import { object, string } from "yup";

export default defineComponent({
  setup() {
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
      console.log(values)
    })

    return {
      onSubmit,
    }
  }

})</script>

<style scoped>

</style>
