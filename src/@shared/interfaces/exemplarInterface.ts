export interface ExemplarInterface {
  id: number;
  estado: string;
  ano_aquisicao: number;
  ano_descarte: number;
  isbn_livro: string;
  nome_livro?: string;
  autor?: string;
}
