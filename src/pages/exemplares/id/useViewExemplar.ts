import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useExemplares } from "../../../@shared/contexts/exemplares/useExemplares";

const schema = z.object({
  id: z.string().min(1),

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

export function useViewExemplarId(id: string) {
  const { findOneExemplar } = useExemplares();

  const { data, isLoading: isLoadingExemplar } = findOneExemplar(id);

  const {
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
        id: data.id,
        ano_descarte: data.ano_descarte,
        ano_aquisicao: data.ano_aquisicao,
        estado: data.estado,
        isbn_livro: data.isbn_livro,
      });
    }
  }, [data, reset]);

  return {
    errors,
    register,
    control,
    data,
    isLoadingExemplar,
  };
}
