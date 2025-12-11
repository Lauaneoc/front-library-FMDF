export interface ResumoDashboard {
  alunos: number;
  livros: number;
  exemplares: number;
  turmas: number;
  locacoes_ativas: number;
  locacoes_atraso: number;
}

export interface LivroMaisEmprestado {
  isbn: string;
  nome: string;
  autor: string;
  emprestimos: number;
}

export interface LocacaoAtraso {
  id: number;
  aluno: string;
  livro: string;
  data_prevista: string;
  dias_atraso: number;
}

export interface LocacoesPorMes {
  mes: string;
  total: number;
}

export interface DisponibilidadeExemplares {
  disponiveis: number;
  emprestados: number;
  indisponiveis: number;
}
