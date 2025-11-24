import axios from "axios";
import { API_URL } from "../config/api";

const api = axios.create({
  baseURL: API_URL,
});

export const bibliotecarioService = {
  getById: async (id: number) => {
    const { data } = await api.get(`/bibliotecarios/buscar/${id}`);
    console.log({ data });
    return data;
  },
  update: async (id: number, payload: any) => {
    const { data } = await api.put(`/bibliotecarios/atualizar/${id}`, payload);
    console.log({ data });
    return data;
  },
};
