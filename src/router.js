import Vue from "vue";
import Router from "vue-router";
import MenuView from "@/layouts/MenuView";
import BlankView from "@/layouts/BlankView";
import PageView from "@/layouts/PageView";
import Exception_404 from "@/pages/exception/404";
import Exception_403 from "@/pages/exception/403";
import Exception_500 from "@/pages/exception/500";
import Dashboard from "@/pages/Dashboard";

Vue.use(Router);

export default new Router({
  routes: [
    // {
    //   path: "/login",
    //   name: "登录页",
    //   component: Login
    // },
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
              component: Dashboard,
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
        // {
        //   path: "/bonus",
        //   name: "礼包配置",
        //   component: PageView,
        //   icon: "gift",
        //   children: [
        //     {
        //       path: "/bonus/bonus-package",
        //       name: "方案管理",
        //       icon: "none",
        //       component: BlankView,
        //       redirect: "/bonus/bonus-package/list",
        //       children: [
        //         {
        //           path: "list",
        //           name: "方案列表",
        //           component: () => import("@/pages/bonus/BonusPackageList"),
        //           invisible: true
        //         },
        //         {
        //           path: "detail",
        //           name: "查看方案",
        //           component: () => import("@/pages/bonus/BonusPackageDetail"),
        //           invisible: true
        //         },
        //         {
        //           path: "create",
        //           name: "创建方案",
        //           component: () => import("@/pages/bonus/BonusPackageCreate"),
        //           invisible: true
        //         },
        //         {
        //           path: "edit",
        //           name: "编辑方案",
        //           component: () => import("@/pages/bonus/BonusPackageEdit"),
        //           invisible: true
        //         }
        //       ]
        //     },
        //     {
        //       path: "/bonus/package-ticket",
        //       name: "兑换码管理",
        //       icon: "none",
        //       component: BlankView,
        //       redirect: "/bonus/package-ticket/list",
        //       children: [
        //         {
        //           path: "list",
        //           name: "兑换码列表",
        //           component: () => import("@/pages/bonus/PackageTicketList"),
        //           invisible: true
        //         }
        //       ]
        //     }
        //   ]
        // },
        // {
        //   path: "/admin",
        //   name: "访问控制",
        //   component: PageView,
        //   icon: "lock",
        //   children: [
        //     {
        //       path: "/admin/admin-account",
        //       name: "用户管理",
        //       icon: "none",
        //       component: BlankView,
        //       redirect: "/admin/admin-account/list",
        //       meta: { authority: "MENU_ADMIN_ACCOUNT_MANAGE" },
        //       children: [
        //         {
        //           path: "list",
        //           name: "用户列表",
        //           component: () => import("@/pages/admin/AdminAccountList"),
        //           invisible: true
        //         },
        //         {
        //           path: "detail",
        //           name: "查看用户",
        //           component: () => import("@/pages/admin/AdminAccountDetail"),
        //           invisible: true
        //         },
        //         {
        //           path: "create",
        //           name: "创建用户",
        //           component: () => import("@/pages/admin/AdminAccountCreate"),
        //           invisible: true,
        //           meta: { authority: "BTN_CREATE_ADMIN_ACCOUNT" }
        //         },
        //         {
        //           path: "edit",
        //           name: "编辑用户",
        //           component: () => import("@/pages/admin/AdminAccountEdit"),
        //           invisible: true,
        //           meta: { authority: "BTN_UPDATE_ADMIN_ACCOUNT" }
        //         }
        //       ]
        //     }
        //   ]
        // }
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
