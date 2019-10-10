// 权限集合
const authorityList = [
  {
    name: "权限控制",
    subs: [
      {
        code: "ADMIN",
        name: "管理员",
        menuSet: [{ value: "MENU_ADMIN_MANAGE", name: "用户管理" }],
        btnSet: [
          { value: "BTN_CREATE_ADMIN_ACCOUNT", name: "创建" },
          { value: "BTN_UPDATE_ADMIN_ACCOUNT", name: "更新" },
          { value: "BTN_LOCK_ADMIN_ACCOUNT", name: "冻结" },
          { value: "BTN_UNLOCK_ADMIN_ACCOUNT", name: "解冻" },
          { value: "BTN_RESET_PASSWORD", name: "重置密码" },
          { value: "BTN_UNBIND_EMPLOYEE", name: "解绑员工" }
        ],
        blockSet: [],
        apiSet: []
      },
      {
        code: "ROLE",
        name: "角色",
        menuSet: [{ value: "MENU_ROLE_MANAGE", name: "角色管理" }],
        btnSet: [
          { value: "BTN_CREATE_ROLE", name: "创建" },
          { value: "BTN_UPDATE_ROLE", name: "更新" },
          { value: "BTN_DELETE_ROLE", name: "删除" }
        ],
        blockSet: [],
        apiSet: []
      },
      {
        code: "PERMISSION",
        name: "权限",
        menuSet: [{ value: "MENU_PERMISSION_MANAGE", name: "权限管理" }],
        btnSet: [
          { value: "BTN_CREATE_PERMISSION", name: "创建" },
          { value: "BTN_UPDATE_PERMISSION", name: "更新" },
          { value: "BTN_DELETE_PERMISSION", name: "删除" }
        ],
        blockSet: [],
        apiSet: []
      }
    ]
  }
];

export function hasAuthority(permissions, currUser, value) {
  return true;
  //   if (!value || value === "") {
  //     return true;
  //   }
  //   if (!currUser.id) {
  //     return true;
  //   }
  //   currUser = currUser ? currUser : {};
  //   if (currUser.type === "SUPER") {
  //     //超级管理员有所有权限
  //     return true;
  //   }
  //   permissions = permissions ? permissions : [];
  //   if (typeof value === "string") {
  //     return permissions.indexOf(value) >= 0;
  //   }
  //   if (value instanceof Array) {
  //     return value.filter(v => permissions.indexOf(v)).length > 0;
  //   }
  //   return false;
}

export default authorityList;
