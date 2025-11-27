import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useLivros } from "../../../@shared/contexts/livros/useLivros";
import { useNavigate } from "react-router-dom";
import { LivroInterface } from "../../../@shared/interfaces/livroInterface";

const schema = z.object({
  isbn: z.string().min(1, "Digite o ISBN do livro")
    .max(13, "ISBN deve ter no máximo 13 caracteres"),

  nome: z.string().min(1, "Nome é obrigatório"),

  autor: z.string().min(1, "Digite o autor"),

  editora: z.string().min(1, "Editora é obrigatória"),

  disciplina: z.string().min(1, "Digite a disciplina"),

  serie: z.enum(["1º Ano", "2º Ano", "3º Ano"], {
    message: "Série inválida",
  }),

  ano_publicacao: z.string()
    .regex(/^\d{4}$/, "Ano deve ter exatamente 4 dígitos"),

  edicao: z.string().max(20, "Edição deve ter no máximo 20 caracteres").optional(),
})


export function useUpdateBook(data?: LivroInterface) {
    const { updateOneBook } = useLivros()

    const {
        handleSubmit,
        formState: { errors },
        register,
        control
    } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            ano_publicacao: String(data?.ano_publicacao),
            autor: data?.autor,
            disciplina: data?.disciplina,
            edicao: data?.edicao,
            editora: data?.editora,
            isbn: data?.isbn,
            nome: data?.nome,
            serie: data?.serie as "1º Ano" | "2º Ano" | "3º Ano" | undefined
        }
    })

    
    const [loading, setLoading] = useState(false)
    
    const navigate = useNavigate()

    const onSubmit = handleSubmit(async (data) => {
        setLoading(true)
        try {
        const payload = {
            isbn: data.isbn,
            nome: data.nome,
            autor: data.autor,
            editora: data.editora,
            disciplina: data.disciplina,
            serie: data.serie,
            ano_publicacao: parseInt(data.ano_publicacao),
            edicao: data.edicao || null,
        }

        await updateOneBook.mutateAsync(payload);
        
        navigate("/livros")
        } catch (err: any) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    })

    return {
        onSubmit,
        errors,
        loading,
        register, 
        control,
        navigate
    }
}