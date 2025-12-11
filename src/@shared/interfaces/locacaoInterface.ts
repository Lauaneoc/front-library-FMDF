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

  // FRONT-END ENRICHMENT
  aluno?: {
    nome: string
    matricula: string
    turma?: any
  }

  exemplar?: {
    id: number
    estado?: string
    livro?: {
      isbn?: string
      titulo?: string
    }
  }
}

export default Locacao
