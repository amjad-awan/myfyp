import { create } from "apisauce";
import notificationSvc from "./notificationSvc";
import spinnerSvc from "./spinnerSvc";

export const api = create({
  baseURL: `http://localhost:8081/`,
  headers: { Accept: "application/json" },
});

api.axiosInstance.interceptors.request.use(
  async (config) => {
    spinnerSvc.start();

    const token = localStorage.getItem("token") || "";

    if (token !== "") {
      config.headers.Authorization = token;
    }

    return config;
  },
  (err) => console.error(err)
);

api.axiosInstance.interceptors.response.use(
  (response) => {
    spinnerSvc.stop();
    return response;
  },
  async (err) => {
    spinnerSvc.stop();
    switch (err.response?.status) {
      case 400:
        notificationSvc.error(err.response.data.message);
        spinnerSvc.stop();
        return err;

      case 401:
        notificationSvc.error("You are unauthorized to perform this action");
        console.error(err);
        spinnerSvc.stop();
        return;

      case 404:
        notificationSvc.error("Item not found");
        spinnerSvc.stop();
        return err;

      case 500:
        notificationSvc.error(
          "An unexpected error occurred contact system administrator"
        );
        console.error(err);
        spinnerSvc.stop();
        return;

      default:
        notificationSvc.error(
          "An unexpected error occurred contact system administrator"
        );
        spinnerSvc.stop();
        return;
    }
  }
);
