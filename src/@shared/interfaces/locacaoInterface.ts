export type Locacao = {
  id: number
  id_bibliotecario?: number
  matricula_aluno?: string
  id_exemplar?: number
  data_emprestimo?: string
  data_prevista?: string
  data_devolucao?: string | null
  status?: string
  descricao?: string
  // fields added by JOIN in listarLocacoes
  aluno?: string
  bibliotecario?: string
  exemplar?: number
}

export default Locacao
