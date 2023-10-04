import { createRouter, createWebHistory } from "vue-router";
import auth from "./auth";
import admin from "./admin";
import not_found from "./not_found";
import superadmin from "./superadmin";

const routes = [auth, admin, not_found, superadmin];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const name = to.name === "auth";
  
  if (!token && !name) {
    return next({ name: "auth" });
  } else {
    if (token && role) {
      return next();
    } else {
      next();
    }
  }
});

export default router;
