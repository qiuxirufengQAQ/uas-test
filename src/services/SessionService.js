import request from "../utils/request";

export async function createSessionInfo(data) {
  return request({
    url: "/controller/session/login",
    method: "POST_FORM",
    data,
    skipCheck: true
  });
}

export async function fetchSessionInfo() {
  return request({ url: "/session/current-user-info.json", method: "GET" });
}

export async function deleteSessionInfo() {
  return request({ url: "/controller/session/logout", method: "GET" });
}

export async function updateSessionInfo(data) {
  return request({
    url: "/controller/session/update-session-info",
    method: "POST",
    data
  });
}

export async function updatePassword(data) {
  return request({
    url: "/controller/session/update-password",
    method: "POST",
    data
  });
}
