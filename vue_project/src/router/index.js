import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Customers from "../views/Customers.vue";
import InteractionList from "../components/InteractionList.vue";
import Interactions from "../views/Interactions.vue";
import Tasks from "../views/Tasks.vue";
import Users from "../views/Users.vue";
import AllInteractions from "../views/AllInteractions.vue";

const routes = [
  {
    path: "/",
    redirect: "/dashboard", // Redirect root to dashboard
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/customers",
    name: "Customers",
    component: Customers,
  },
  {
    path: "/interactions-all",
    name: "AllInteractions",
    component: AllInteractions,
  },
  // {
  //   path: "/interactions",
  //   name: "Interactions",
  //   component: Interactions,
  // },
  {
    path: "/interactions/:customerId",
    name: "CustomerInteractions",
    component: InteractionList,
    props: true,
  },

  {
    path: "/edit-customer/:customerId",
    name: "EditCustomer",
    component: () => import("../views/EditCustomerView.vue"),
    props: true,
  },
  {
    path: "/tasks",
    name: "Tasks",
    component: Tasks,
  },

  {
    path: "/users",
    name: "Users",
    component: Users,
  },
  // Catch-all route for 404
  {
    path: "/:pathMatch(.*)*",
    redirect: "/dashboard",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
