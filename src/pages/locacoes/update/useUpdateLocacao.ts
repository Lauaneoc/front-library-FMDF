import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useMemo } from "react";
import { useLocacoes } from "../../../@shared/contexts/locacoes/useLocacoes";
import { useNavigate } from "react-router-dom";
import { useStudent } from "../../../@shared/contexts/student/useStudent";
import { useExemplares } from "../../../@shared/contexts/exemplares/useExemplares";
import { useLivros } from "../../../@shared/contexts/livros/useLivros";

const schema = z.object({
  status: z.enum(["aberto", "finalizado", "atrasado"], {
    message: "Status inválido",
  }),
  data_devolucao: z.string().optional(),
  descricao: z.string().min(1, "Descrição é obrigatória"),
})

type FormData = z.infer<typeof schema>

export function useUpdateLocacao(id: string) {
  const { updateLocacao, findOneLocacao } = useLocacoes();
  const { students } = useStudent();
  const { exemplares } = useExemplares();
  const { livros } = useLivros();
  const navigate = useNavigate();

  // ✅ CORREÇÃO DO ERRO DE TIPO
  const locacaoId = Number(id);

  if (isNaN(locacaoId)) {
    throw new Error("ID da locação inválido");
  }

  const { data: locacaoData, isLoading: isLoadingLocacao } = findOneLocacao(locacaoId);

  const {
    handleSubmit,
    formState: { errors },
    register,
    control,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      status: undefined,
      data_devolucao: '',
      descricao: ''
    }
  });

  useEffect(() => {
    if (locacaoData) {
      reset({
        status: locacaoData.status?.toLowerCase() as "aberto" | "finalizado" | "atrasado" || undefined,
        data_devolucao: locacaoData.data_devolucao
          ? new Date(locacaoData.data_devolucao).toISOString().split('T')[0]
          : '',
        descricao: locacaoData.descricao || ''
      });
    }
  }, [locacaoData, reset]);

  const [loading, setLoading] = useState(false);

  const displayData = useMemo(() => {
    if (!locacaoData || !students || !exemplares || !livros) return null;

    const aluno = students.find(s => s.matricula === locacaoData.matricula_aluno);
    const exemplar = exemplares.find(e => e.id === locacaoData.id_exemplar);
    const livro = exemplar ? livros?.find(l => l.isbn === exemplar.isbn_livro) : null;

    return {
      ...locacaoData,
      alunoNome: aluno?.nome,
      livroNome: livro?.nome,
    }
  }, [locacaoData, students, exemplares, livros]);

  const onSubmit = handleSubmit(async (formData) => {
    setLoading(true)
    try {
      const payload = {
        status: formData.status,
        data_devolucao: formData.data_devolucao || null,
        descricao: formData.descricao
      }

      // ✅ ID AGORA É NUMBER
      await updateLocacao({ id: locacaoId, data: payload });

      navigate("/locacoes")
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  });

  return {
    onSubmit,
    errors,
    loading,
    register,
    control,
    navigate,
    displayData,
    isLoadingLocacao
  }
}
