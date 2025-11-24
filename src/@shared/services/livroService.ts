import axios from "axios";
import { API_URL } from "../config/api";

const api = axios.create({
  baseURL: API_URL,
});

export const livroService = {
  getAll: async () => {
    const { data } = await api.get("/livros/listar");
    console.log({ data });
    return data;
  },
};
