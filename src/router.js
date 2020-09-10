import Vue from "vue";
import Router from "vue-router";
import Login from "./components/Login.vue";
import Home from "./components/Home.vue";
import Welcome from "./components/Welcome.vue";
import Users from "./components/user/Users.vue";
import Rights from "./components/power/Rights.vue";
import Roles from "./components/power/Roles.vue";
import Cate from "./components/goods/Cate.vue";
import Params from "./components/goods/Params.vue";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      redirect: "/login",
    },
    {
      path: "/Login",
      component: Login,
    },
    {
      path: "/home",
      component: Home,
      redirect: "/welcome",
      children: [
        {
          path: "/welcome",
          component: Welcome,
        },
        {
          path: "/users",
          component: Users,
        },
        {
          path: "/rights",
          component: Rights,
        },
        {
          path: "/roles",
          component: Roles,
        },
        {
          path: "/categories",
          component: Cate,
        },
        {
          path: "/params",
          component: Params,
        },
      ],
    },
  ],
});

// 路由导航守卫
router.beforeEach((to, from, next) => {
  //用户访问登录页，直接放行
  if (to.path === "/login") return next();
  // 从sessionStorage 中获取 token 值
  const tokenstr = window.sessionStorage.getItem("token");
  if (!tokenstr) return next("/login");
  else next();
});

export default router;
