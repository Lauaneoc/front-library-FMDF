import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocacoes } from "../../../@shared/contexts/locacoes/useLocacoes";
import type Locacao from "../../../@shared/interfaces/locacaoInterface";

export function useViewLocacao(id: string) {
  const { findOneLocacao } = useLocacoes();

  // ID precisa ser number
  const { data, isLoading: isLoadingLocacao } = findOneLocacao(Number(id));

  const { control, reset } = useForm<Partial<Locacao>>();

  useEffect(() => {
    if (data) {
      reset({
        aluno: data.aluno?.nome,
        exemplar: data.exemplar?.livro?.titulo,
        data_emprestimo: data.data_emprestimo,
        data_devolucao: data.data_devolucao,
        status: data.status,
      });
    }
  }, [data, reset]);

  return {
    control,
    data,
    isLoadingLocacao,
  };
}
