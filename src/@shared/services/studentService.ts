import axios from "axios";
import { API_URL } from "../config/api";
import { StudentInterface } from "../interfaces/studentInterface";

const api = axios.create({
  baseURL: API_URL,
});

export const studentService = {
  getAll: async () => {
    const { data } = await api.get("/alunos/listar");
    console.log({data})
    return data;
  },
  create: async (payload: StudentInterface) => {
    const { data } = await api.post("/alunos/novo", payload);
    return data;
  },
  remove: async (matricula: string) => {
    const { data } = await api.delete(`/alunos/deletar/${matricula}`);
    return data;
  },
  getByMatricula: async (matricula: string) => {
    const { data } = await api.get(`/alunos/buscar/${matricula}`);
    return data;
  },
  update: async (matricula: string, payload: StudentInterface) => {
    const { data } = await api.put(`/alunos/atualizar/${matricula}`, payload);
    return data;
  },
};
