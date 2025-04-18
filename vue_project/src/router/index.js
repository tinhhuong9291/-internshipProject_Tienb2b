import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Customers from "../views/Customers.vue";
import Interactions from "../views/Interactions.vue";
import Tasks from "../views/Tasks.vue";
import Users from "../views/Users.vue";

const routes = [
  { path: "/", component: Dashboard },
  { path: "/customers", component: Customers },
  { path: "/interactions", component: Interactions },
  { path: "/tasks", component: Tasks },
  { path: "/users", component: Users },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
