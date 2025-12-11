import axios from "axios";
import { API_URL } from "../config/api";
import { TurmaCreateDTO, TurmaInterface } from "../interfaces/turmaInterface";

const api = axios.create({
  baseURL: API_URL,
});

export const turmaService = {
  getAll: async () => {
    const { data } = await api.get("/turmas/listar");
    return data;
  },

  create: async (payload: TurmaCreateDTO) => {
    const { data } = await api.post("/turmas/novo", payload);
    return data;
  },

  getById: async (id: number) => {
    const { data } = await api.get(`/turmas/buscar/${id}`);
    return data;
  },

  update: async (id: number, payload: TurmaInterface) => {
    const { data } = await api.put(`/turmas/atualizar/${id}`, payload);
    return data;
  },

  remove: async (id: number) => {
    const { data } = await api.delete(`/turmas/deletar/${id}`);
    return data;
  },
};
