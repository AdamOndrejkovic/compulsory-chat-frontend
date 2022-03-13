import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import { useUserStore } from "@/stores/user";
import SignIn from "@/views/SignIn.vue";
import { Routes } from "@/router/routes";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: Routes.Home,
    component: Home,
  },
  {
    path: "/sign-in",
    name: Routes.SignIn,
    component: SignIn,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

/*router.beforeEach( (to, from, next) => {
  if (useUserStore().user?.name !== undefined) {
    next()
  } else {
    next({name: Routes.SignIn})
  }
})*/

export default router;
