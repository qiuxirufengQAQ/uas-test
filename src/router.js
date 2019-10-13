import Vue from "vue";
import Router from "vue-router";
import MenuView from "@/layouts/MenuView";
import BlankView from "@/layouts/BlankView";
import PageView from "@/layouts/PageView";
import Exception_404 from "@/pages/exception/404";
import Exception_403 from "@/pages/exception/403";
import Exception_500 from "@/pages/exception/500";
import UserManage from "@/pages/UserManage";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Auth",
      component: MenuView,
      redirect: "/auth/userManage",
      children: [
        {
          path: "/auth",
          name: "系统",
          component: PageView,
          icon: "user",
          children: [
            {
              path: "/auth/userManage",
              name: "用户管理",
              component: UserManage,
              icon: "none"
            },
            {
              path: "/auth/roleManage",
              name: "角色管理",
              icon: "none",
              component: () => import("@/layouts/Profile")
            },
            {
              path: "/auth/permissionManage",
              name: "权限管理",
              icon: "none",
              component: () => import("@/layouts/Profile")
            }
          ]
        }
      ]
    },
    {
      path: "/exception",
      name: "异常页",
      component: BlankView,
      children: [
        {
          path: "/exception/404",
          name: "404",
          icon: "none",
          component: Exception_404
        },
        {
          path: "/exception/403",
          name: "403",
          icon: "none",
          component: Exception_403
        },
        {
          path: "/exception/500",
          name: "500",
          icon: "none",
          component: Exception_500
        }
      ]
    },
    {
      path: "*",
      name: "其他路径",
      redirect: "/exception/404"
    }
  ]
});
