import Vue from "vue";
import Router from "vue-router";
import Login from "./components/Login.vue";
import Home from "./components/Home.vue";

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
