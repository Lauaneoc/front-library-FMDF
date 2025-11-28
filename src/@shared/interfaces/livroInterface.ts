export interface LivroInterface {
  isbn: string;
  nome: string;
  autor: string;
  editora: string;
  disciplina: string;
  serie: string;
  ano_publicacao: number;
  edicao?: string;
  total_exemplares?: number
  exemplares_disponiveis?: number
}
