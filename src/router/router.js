import { createRouter, createWebHistory } from "vue-router";
import trangchu from "../components/trangchu.vue";
import dangnhap from "../components/dangnhap.vue";
import dangky from "../components/dangky.vue";
import trangcanhan from "../components/trangcanhan.vue";
import quanlybaiviet from "../components/quanlybaiviet.vue";
import chitietbaiviet from "../components/chitietbaiviet.vue";
import contact from "../components/contact.vue";
import chef from "../components/chef.vue";
import menu from "../components/menu.vue";



const routes = [
  { path: "/", component: trangchu },
  { path: "/login", component: dangnhap },
  { path: "/register", component: dangky },
  { path: "/profile", component: trangcanhan },
  { path: "/managerBlog", component: quanlybaiviet },
  { path: "/blogDetail/:id", component: chitietbaiviet },
  { path: "/contact", component: contact },
  { path: "/chef", component: chef },
  { path: "/menu", component: menu },
];
const router = createRouter({
  linkActiveClass: "active",
  history: createWebHistory(),
  routes,
});
export default router;
