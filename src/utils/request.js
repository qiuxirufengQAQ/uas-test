import axios from "axios";
import qs from "qs";
import lodash from "lodash";
import router from "../router";
import store from "../store";
import { notification, message } from "ant-design-vue";

const codeMessage = {
  200: "服务器成功返回请求的数据。",
  201: "新建或修改数据成功。",
  202: "一个请求已经进入后台排队（异步任务）。",
  204: "删除数据成功。",
  400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
  401: "用户没有权限（令牌、用户名、密码错误）。",
  403: "用户得到授权，但是访问是被禁止的。",
  404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
  406: "请求的格式不可得。",
  410: "请求的资源被永久删除，且不会再得到的。",
  422: "当创建一个对象时，发生一个验证错误。",
  500: "服务器发生错误，请检查服务器。",
  502: "网关错误。",
  503: "服务不可用，服务器暂时过载或维护。",
  504: "网关超时。"
};

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }
  const errortext = codeMessage[response.status] || response.statusText;
  notification.error({
    message: `请求错误 ${response.status}: ${response.url}`,
    description: errortext
  });
  const error = new Error(errortext);
  error.name = response.status;
  error.response = response.data;
  throw error;
}

const fetch = options => {
  let { method = "get", data, url } = options;

  switch (method.toLowerCase()) {
    case "get":
      return axios.get(
        `${url}${!lodash.isEmpty(data) ? `?${qs.stringify(data)}` : ""}`
      );
    case "delete":
      return axios.delete(url, { data });
    case "head":
      return axios.head(url, data);
    case "post":
      return axios.post(url, data);
    case "post_form":
      return axios.post(url, qs.stringify(data));
    case "post_get":
      return axios.post(url, qs.stringify(data));
    case "search":
      return axios.post(url, data);
    case "put":
      return axios.put(url, data);
    case "patch":
      return axios.patch(url, data);
    default:
      return axios(options);
  }
};

const defaultOnSuccess = (_, options) => {
  if (
    !(options.config && options.config.supressMsg) &&
    options.method.toLowerCase() !== "get" &&
    options.method.toLowerCase() !== "search" &&
    options.method.toLowerCase() !== "post_get"
  ) {
    message.success("操作成功");
  }
};

const defaultOnFailure = response => {
  const error = new Error(response.respMsg);
  error.name = response.respCode === "EC_ERROR_000003" ? 401 : 200;
  error.response = response;
  throw error;
};

export default function request(options) {
  return fetch(options)
    .then(checkStatus)
    .then(response => {
      if (options.skipCheck) {
        return response;
      }
      if (response.success) {
        defaultOnSuccess(response, options);
      } else {
        defaultOnFailure(response, options);
      }
      return response;
    })
    .then(response => {
      if (options.skipCheck || options.getResponse) {
        return response;
      }
      return response.data;
    })
    .catch(e => {
      const status = e.name;
      if (status === 200) {
        message.error(e.message);
      } else if (status === 401) {
        store.dispatch("app/deleteSessionInfo", {
          callback: () => {
            router.push("/login");
          }
        });
      } else if (status === 403) {
        router.push("/exception/403");
      } else if (status <= 504 && status >= 500) {
        router.push("/exception/500");
      } else if (status >= 404 && status < 422) {
        router.push("/exception/404");
      }
      return new Promise(function() {});
    });
}
