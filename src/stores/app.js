import {
  fetchSessionInfo,
  deleteSessionInfo,
  createSessionInfo,
  updatePassword,
  updateSessionInfo
} from "../services/SessionService";
import { hasAuthority } from "../utils/authority";
import routes from "../router";

function isMenuShow(permissions, currUser, menu) {
  return (
    !menu.invisible &&
    (!menu.meta || hasAuthority(permissions, currUser, menu.meta.authority))
  );
}

function convertSubMenus(permissions, currUser, menu) {
  if (!menu.children || menu.children.length <= 0) {
    menu.subMenus = undefined;
    return;
  }
  menu.subMenus = menu.children.filter(i => {
    return isMenuShow(permissions, currUser, i);
  });
  menu.subMenus = menu.subMenus.length > 0 ? menu.subMenus : undefined;
  if (menu.subMenus) {
    menu.subMenus.map(m => {
      convertSubMenus(permissions, currUser, m);
    });
  }
}

export default {
  namespaced: true,
  state: {
    isMobile: false,
    theme: "dark",
    layout: "side",
    systemName: "UAS | 统一登录权限系统",
    copyright: "2019",
    multipage: false,
    multipageTemp: true,
    currUser: {},
    permissions: [],
    menuData: [],
    pendingWorkFlowCount: 0,
    globalPageQuery: {},
    globalSearchQuery: {}
  },
  mutations: {
    setIsMobile(state, isMobile) {
      state.isMobile = isMobile;
      if (state.isMobile) {
        state.multipageTemp = state.multipage;
        state.multipage = false;
      } else {
        state.multipage = state.multipageTemp;
      }
    },
    setTheme(state, theme) {
      state.theme = theme;
    },
    setLayout(state, layout) {
      state.layout = layout;
    },
    setMultipage(state, multipage) {
      state.multipage = multipage;
    },
    setCurrUser(state, currUser) {
      state.currUser = currUser;
    },
    setSessionInfo(state, sessionInfo) {
      state.currUser = sessionInfo.userInfo;
      state.permissions = sessionInfo.permissions;

      const menuDataCache = routes.options.routes.find(
        item => item.path === "/"
      ).children;
      // .filter(i => isMenuShow(state.permissions, state.currUser, i))
      menuDataCache.map(m => (m.subMenus = []));
      const menuData = [];
      menuDataCache.map(menu => {
        if (menu.children && menu.children.length > 0) {
          convertSubMenus(state.permissions, state.currUser, menu);
          if (menu.subMenus && menu.subMenus.length > 0) {
            menuData.push(menu);
          }
        } else {
          menu.subMenus = undefined;
          menuData.push(menu);
        }
      });

      state.menuData = menuData;
    },
    setPendingWorkFlowCount(state, count) {
      state.pendingWorkFlowCount = count;
    },
    setGlobalPageQuery(state, { path, pageQuery, searchQuery }) {
      state.globalPageQuery[path] = pageQuery;
      state.globalSearchQuery[path] = searchQuery;
    }
  },
  actions: {
    createSessionInfo({ commit }, { params, callback }) {
      createSessionInfo(params).then(resp => {
        if (resp.success) {
          commit("setSessionInfo", resp.data);
        } else {
          commit("setSessionInfo", { userInfo: {}, permissions: [] });
        }
        callback(resp);
      });
    },
    fetchSessionInfo({ commit, state }) {
      if (!state.currUser || !state.currUser.id) {
        fetchSessionInfo().then(data => {
          commit("setSessionInfo", { userInfo: { id: 1 }, permissions: [] });
        });
      }
    },
    deleteSessionInfo({ commit }, { callback }) {
      deleteSessionInfo().then(() => {
        commit("setSessionInfo", { userInfo: { id: 1 }, permissions: [] });
        callback();
      });
    },
    updatePassword(_, { params, callback }) {
      updatePassword(params).then(callback);
    },
    updateSessionInfo({ commit, state }, { params, callback }) {
      updateSessionInfo(params).then(() => {
        commit("setCurrUser", { ...state.currUser, ...params });
        callback();
      });
    }
  }
};
