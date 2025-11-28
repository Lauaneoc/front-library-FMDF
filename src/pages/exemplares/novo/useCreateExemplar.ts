import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useExemplares } from "../../../@shared/contexts/exemplares/useExemplares";
import { useNavigate } from "react-router-dom";

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

export function useCreateExemplar() {
  const { createOneExemplar, isPendingCreateExemplar } = useExemplares();

  const {
    handleSubmit,
    formState: { errors },
    register,
    control,
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    try {
      const payload = {
        isbn_livro: data.isbn_livro,
        ano_aquisicao: data.ano_aquisicao,
        ano_descarte: data.ano_descarte,
        estado: data.estado,
      };

      await createOneExemplar(payload);

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
    isPendingCreateExemplar,
  };
}
