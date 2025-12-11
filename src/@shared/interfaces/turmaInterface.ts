export interface TurmaInterface {
  id: number;
  curso: string;
  serie: string;
  ano_letivo: number;
}

export type TurmaCreateDTO = Omit<TurmaInterface, "id">