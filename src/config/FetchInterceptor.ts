import type {NotificationArgsProps} from "antd";
import {notification} from "antd";
import axios, {AxiosInstance} from "axios";

// import history from "../history.ts";
import {storage} from "../utils/storage.ts";
import {API_BASE_URL} from "./AppConfig.ts";
import {LOCAL_USER_DATA} from "./constants.ts";

const service: AxiosInstance = axios.create({
    baseURL: API_BASE_URL + "/v1",
    timeout: 60000,
});

// API Request interceptor
service.interceptors.request.use(
    (config) => {
        const user: any = storage.get(LOCAL_USER_DATA);
        config.headers.Authorization = `Basic ${btoa(`${user?.mail}:${user?.password}`)}`;
        return config;
    },
    (error) => {
        // Do something with request error here
        notification.error({
            message: "Error",
        });
        Promise.reject(error).then();
    }
);

// API response interceptor
service.interceptors.response.use(
    (response) => {
        const {data} = response;
        if (data?.success && !!data?.message) {
            notification.success({message: data?.message});
        } else if (!data?.success && !!data?.message) {
            notification.warning({message: data?.message});
        }
        return response.data;
    },
    (error) => {
        let notificationParam: { message?: string; description?: string } = {
            message: error.message,
        };

        // Remove token and redirect
        // if (error.response.status === 401 || error.response.status === 403) {
        if (error.response.status === 401) {
            notificationParam.message = "Authentication Fail";
            notificationParam.description = "Please login again";
            // localStorage.clear();
            // history.push("/login");
            // window.location.reload();
        }

        if (error.response.status === 404) {
            notificationParam.message = "Not Found";
        }

        if (error.response.status === 508) {
            notificationParam.message = "Time Out";
        }

        if (notificationParam.message) {
            notification.error(<NotificationArgsProps>notificationParam);
        }

        return Promise.reject(error);
    }
);

export default service;
