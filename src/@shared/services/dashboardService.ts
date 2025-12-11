// src/services/dashboardService.ts
import axios from "axios";
import { API_URL } from "../config/api";

const api = axios.create({
  baseURL: API_URL,
});

export const dashboardService = {
  getResumo: async () => {
    const { data } = await api.get("/dashboard/resumo");
    return data;
  },

  getLivrosMaisEmprestados: async (limit?: number) => {
    const { data } = await api.get("/dashboard/livros-mais-emprestados", {
      params: { limit },
    });
    return data;
  },

  getLocacoesAtraso: async () => {
    const { data } = await api.get("/dashboard/locacoes-atraso");
    return data;
  },

  getLocacoesPorMes: async (ano: number) => {
    const { data } = await api.get("/dashboard/locacoes-por-mes", {
      params: { ano },
    });
    return data;
  },

  getDisponibilidadeExemplares: async () => {
    const { data } = await api.get("/dashboard/exemplares-disponibilidade");
    return data;
  },
};
