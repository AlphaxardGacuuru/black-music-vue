import { createRouter, createWebHashHistory } from "vue-router";
import Index from "../views/Index.vue";
import PostCreate from "../views/PostCreate.vue"

const routes = [
  {
    path: "/",
    name: "Index",
    component: Index,
  },
  {
    path: "/profile/:username",
    name: "Profile",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Profile.vue"),
  },
  {
    path: "/post-show/:id",
    name: "PostShow",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/PostShow.vue"),
  },
  {
	  path: "/post-create",
	  name: "PostCreate",
	  component: PostCreate
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;