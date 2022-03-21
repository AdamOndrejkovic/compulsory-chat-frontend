<template>
  <div>
    <h2>Register new user</h2>
    <form @submit.prevent="onSubmit">
      <div>
        <text-input
          label="Name"
          name="name"
          placeholder="Enter your name"
        />
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
        <button type="submit">Register</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import TextInput from "@/components/common/TextInput.vue";
import { defineComponent } from "vue";
import { useForm } from "vee-validate";
import { string, object } from "yup"
import { useUserStore } from "@/stores/user";
import router from "@/router";
import { Routes } from "@/router/routes";


type RegisterUser = {
  name: string
  email: string
  password: string
}
export default defineComponent({
  components: { TextInput },
  setup() {
    const { registerUser, loggedUser } = useUserStore()
    const { handleSubmit } = useForm<RegisterUser>({
      validationSchema: object({
        name: string().min(2).max(30).required(),
        email: string().email().required(),
        password: string().min(6).max(20).required(),
      }),
      initialValues: {
        name: "",
        email: "",
        password: "",
      }
    })

    const onSubmit = handleSubmit(async (values: RegisterUser) => {
      await registerUser(values)
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
