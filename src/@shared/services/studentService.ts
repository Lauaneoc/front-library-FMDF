import axios from "axios";
import { API_URL } from "../config/api";

const api = axios.create({
  baseURL: API_URL,
});

export const studentService = {
  getAll: async () => {
    const { data } = await api.get("/alunos/listar");
    console.log({data})
    return data;
  },
  create: async (payload: {
    matricula: string;
    nome: string;
    cpf: string;
    data_nascimento: string;
    id_turma: number;
  }) => {
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
  update: async (matricula: string, payload: {
    matricula: string;
    nome: string;
    cpf: string;
    data_nascimento: string;
    id_turma: number;
  }) => {
    const { data } = await api.put(`/alunos/atualizar/${matricula}`, payload);
    return data;
  },
};
