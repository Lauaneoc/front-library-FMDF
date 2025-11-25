import axios from "axios"
import { API_URL } from "../config/api"

const api = axios.create({
  baseURL: API_URL,
})

export const locacaoService = {
  getAll: async () => {
    const { data } = await api.get("/locacoes/listar")
    console.log({ data })
    return data
  },

  getById: async (id: number | string) => {
    const { data } = await api.get(`/locacoes/buscar/${id}`)
    return data
  },

  create: async (payload: any) => {
    const { data } = await api.post("/locacoes/novo", payload)
    return data
  },

  update: async (id: number | string, payload: any) => {
    const { data } = await api.put(`/locacoes/atualizar/${id}`, payload)
    return data
  },

  remove: async (id: number | string) => {
    const { data } = await api.delete(`/locacoes/deletar/${id}`)
    return data
  },
}

export default locacaoService
