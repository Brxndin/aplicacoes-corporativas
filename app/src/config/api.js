import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
});

// // aqui intercepta o envio da request, colocando o token
// api.interceptors.request.use((config) => {
//     const token = localStorage.getItem("token");

//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
// });

// // aqui trata a resposta caso ela seja específica pro token
// api.interceptors.response.use((res) => res, async (error) => {
//     const status = error?.response?.status;

//     if (status === 401 || status === 403) {
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
        
//         if (window.location.pathname !== "/login") {
//             window.location.assign("/login");
//         }
//     }

//     return Promise.reject(error);
// });

export default api;