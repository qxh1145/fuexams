import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

//loc truoc khi gui di
//tu dong gan token vao header neu ngươi dùng đã đăng nhâp
axiosClient.interceptors.request.use(
  (config) => {
    //lay token tu local storage
    const token = localStorage.getItem("access_token");

    if (token) {
      //gan token vao header Authorization
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//loc truoc khi nhan ket qua
const handleLogout = async () => {
  try {
    await axiosClient.post("auth/signout");
  } catch (error) {
    console.error("Error in handleLogout fuc");
  } finally {
    localStorage.removeItem("accessToken");
    window.location.href("/auth/signin");
  }
};

axiosClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const status = error.response?.status;
    const data = error.response?.data;

    switch (status) {
      // het han token / chua dang nhap
     
      //khong co quyen truy cap
      case 403: {
        console.warn("you dont have permission to access this");
        // adding toast component later
        break;
      }

      case 404: {
        console.error("Cannot find data");
        break;
      }

      case 500: {
        console.error("Internal server error");
        //adding toast component later
        break;
      }
      // loi validation se duoc component tu xu ly

      default: {
        // xu ly loi no internet
        if (!error.response) {
          console.error("Network connection failed...");
          //adding toast component
        }
      }
    }
    return Promise.reject(error);
  }
);
export default axiosClient;
