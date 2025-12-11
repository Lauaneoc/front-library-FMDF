import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
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

export function useUpdateExemplar(id: string) {
  const { findOneExemplar, isPendingUpdateExemplar, updateOneExemplar } =
    useExemplares();

  const { data, isLoading: isLoadingExemplar } = findOneExemplar(id);

  const {
    handleSubmit,
    formState: { errors },
    register,
    control,
    setError,
    reset,
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (data) {
      reset({
        isbn_livro: data?.isbn_livro,
        ano_aquisicao: data?.ano_aquisicao?.toString(),
        ano_descarte: data?.ano_descarte?.toString(),
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
    } catch (error: any) {
      console.log({ error });

      const apiErrors = error.response?.data?.errors as Record<string, string[]>;

      if (apiErrors && Object.keys(apiErrors).length > 0) {
          Object.entries(apiErrors).forEach(([field, messages]) => {
          setError(field as keyof typeof errors, {
              type: "manual",
              message: messages[0],
          });
          });
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
    data,
    isLoadingExemplar,
    isPendingUpdateExemplar,
  };
}
