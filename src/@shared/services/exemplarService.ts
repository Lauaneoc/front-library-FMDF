import axios from "axios";
import { API_URL } from "../config/api";
import { ExemplarInterface } from "../interfaces/exemplarInterface";

const api = axios.create({
  baseURL: API_URL,
});

export const exemplarService = {
  getAll: async () => {
    const { data } = await api.get("/exemplares/listar");
    console.log({ data });
    return data;
  },
  create: async (payload: ExemplarInterface) => {
    const { data } = await api.post("/exemplares/novo", payload);
    return data;
  },
  remove: async (id: number) => {
    const { data } = await api.delete(`/exemplares/deletar/${id}`);
    return data;
  },
  getById: async (id: number) => {
    const { data } = await api.get(`/exemplares/buscar/${id}`);
    return data;
  },
  update: async (id: number, payload: ExemplarInterface) => {
    const { data } = await api.put(`/exemplares/atualizar/${id}`, payload);
    return data;
  },
};
