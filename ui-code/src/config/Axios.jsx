import axios from "axios";

const Axios = axios.create({
    baseURL: process.env.REACT_APP_HOST_NAME || "http://localhost:5555"
});
const token = localStorage.getItem("token");
if (token) {
    Axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
}
export default Axios;
