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
  create: async (payload: {
    isbn: string;
    nome: string;
    autor: string;
    editora: string;
    disciplina: string;
    serie: string;
    ano_publicacao: number;
    edicao: string | null;
  }) => {
    const { data } = await api.post("/livros/novo", payload);
    return data;
  },
  getByIsbn: async (isbn: string) => {
    const { data } = await api.get(`/livros/buscar/${isbn}`);
    return data;
  },
  update: async (isbn: string, payload: {
    isbn: string;
    nome: string;
    autor: string;
    editora: string;
    disciplina: string;
    serie: string;
    ano_publicacao: number;
    edicao: string | null;
  }) => {
    const { data } = await api.put(`/livros/atualizar/${isbn}`, payload);
    return data;
  },
  remove: async (isbn: string) => {
    const { data } = await api.delete(`/livros/deletar/${isbn}`);
    return data;
  },
};
