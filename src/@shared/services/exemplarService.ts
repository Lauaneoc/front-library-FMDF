import axios from "axios";
import { API_URL } from "../config/api";

const api = axios.create({
  baseURL: API_URL,
});

export const exemplarService = {
  getAll: async () => {
    const { data } = await api.get("/exemplares/listar");
    console.log({ data });
    return data;
  },
};
