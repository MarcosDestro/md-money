// Todos os dados externos podem ser consultados por aqui

import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:3000/api",
})