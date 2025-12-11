import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { AxiosError } from "axios";
import { useExemplares } from "../../../@shared/contexts/exemplares/useExemplares";
import { useNavigate } from "react-router-dom";

const schema = z
  .object({
    isbn_livro: z
      .string()
      .min(1, "O ISBN é obrigatório.")
      .max(13, "ISBN deve ter no máximo 13 caracteres."),

    ano_aquisicao: z
      .string()
      .min(1, "Ano de aquisição obrigatório.")
      .regex(/^\d{4}$/, "Ano de aquisição inválido."),

    ano_descarte: z
      .string()
      .min(1, "Ano de descarte obrigatório.")
      .regex(/^\d{4}$/, "Ano de descarte inválido."),

    estado: z.enum(["Novo", "Regular", "Danificado", "Perdido"], {
      message: "Estado obrigatório.",
    }),
  })
  .refine((data) => Number(data.ano_descarte) > Number(data.ano_aquisicao), {
    message: "O ano de descarte deve ser após ano de aquisição.",
    path: ["ano_descarte"],
  });

export function useCreateExemplar() {
  const { createOneExemplar, isPendingCreateExemplar } = useExemplares();

  const {
    handleSubmit,
    formState: { errors },
    register,
    control,
    setError,
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { estado: "Novo" },
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
      const axiosErr = err as AxiosError<{ errors: Record<string, string[]> }>;

      const fieldErrors = axiosErr.response?.data?.errors;

      if (fieldErrors) {
        Object.entries(fieldErrors).forEach(([field, message]) =>
          setError(field, { message: String(message) })
        );
      }
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
