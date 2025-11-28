import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStudent } from "../../../../@shared/contexts/student/useStudent";
import { useTurmas } from "../../../../@shared/contexts/turmas/useTurmas";

const schema = z.object({
  matricula: z.string()
    .min(1, "Matrícula é obrigatória")
    .max(10, "Matrícula deve ter no máximo 10 caracteres"),

  nome: z.string()
    .min(1, "Nome é obrigatório")
    .max(100, "Nome deve ter no máximo 100 caracteres"),

  cpf: z.string()
    .min(11, "CPF deve ter 11 dígitos")
    .max(14, "CPF inválido")
    .regex(/^\d{11}$/, "CPF deve conter apenas números"),
    
  data_nascimento: z.string()
    .min(1, "Data de nascimento é obrigatória")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de data inválido. Use YYYY-MM-DD")
    .refine((date) => {
      const parsedDate = new Date(date);
      const today = new Date();
      return !isNaN(parsedDate.getTime()) && parsedDate <= today;
    }, "Data deve ser válida e não futura"),
  id_turma: z.string().min(1, "Selecione a turma"),
})


export function useUpdateMatricula(matricula: string) {
    const { updateOneStudent, isPendingUpdateStudent, findOneStudent } = useStudent()
    const { turmas, isLoading: isPendingAllTurmas } = useTurmas()

    const { data, isLoading: isLoadingMatricula } = findOneStudent(matricula);

    const {
        handleSubmit,
        formState: { errors },
        register,
        control,
        reset
    } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
    })

    
    useEffect(() => {
        if (data && turmas?.length) {
        const turmaSelecionada = turmas.find(t => t.id === data.id_turma);
      reset({
            matricula: data.matricula,
            nome: data.nome,
            cpf: data.cpf,
            data_nascimento: data.data_nascimento,
            id_turma: String(turmaSelecionada),
      });
    }
  }, [data, reset, turmas]);

    
    const [loading, setLoading] = useState(false)
    
    const navigate = useNavigate()

    const onSubmit = handleSubmit(async (data) => {
        setLoading(true)
        try {
        const payload = {
            matricula: data.matricula,
            nome: data.nome,
            cpf: data.cpf,
            data_nascimento: data.data_nascimento,
            id_turma: parseInt(data.id_turma),
        }

        await updateOneStudent(payload);
        
        navigate("/alunos")
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
        navigate,
        data,
        isLoadingMatricula,
        isPendingUpdateStudent,
        turmas,
        isPendingAllTurmas
    }
}