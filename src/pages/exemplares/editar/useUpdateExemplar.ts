import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useExemplares } from "../../../@shared/contexts/exemplares/useExemplares";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  isbn_livro: z
    .string()
    .min(1, "Digite o ISBN do livro")
    .max(13, "ISBN deve ter no máximo 13 caracteres"),

  ano_aquisicao: z.string().min(1, "Digite o ano de aquisição"),

  ano_descarte: z.string().min(1, "Digite o ano de descarte"),

  estado: z.enum(["Novo", "Regular", "Danificado", "Perdido"], {
    message: "Estado inválido",
  }),
});

export function useUpdateExemplar(id: string) {
  const { findOneExemplar, isPendingUpdateExemplar, updateOneExemplar } =
    useExemplares();

  const { data, isLoading: isLoadingExemplar } = findOneExemplar(id);

  const {
    handleSubmit,
    formState: { errors },
    register,
    control,
    reset,
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (data) {
      reset({
        isbn_livro: data?.isbn_livro,
        ano_aquisicao: data?.ano_aquisicao,
        ano_descarte: data?.ano_descarte,
        estado: data?.estado,
      });
    }
  }, [data, reset]);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    try {
      const payload = {
        id,
        ano_aquisicao: data.ano_aquisicao,
        ano_descarte: data.ano_descarte,
        estado: data.estado,
      };

      await updateOneExemplar(payload);

      navigate("/exemplares");
    } catch (err: unknown) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  });

  return {
    onSubmit,
    errors,
    loading,
    register,
    control,
    data,
    isLoadingExemplar,
    isPendingUpdateExemplar,
  };
}
