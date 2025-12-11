import { createContext, ReactNode } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from 'sonner';
import type { StudentInterface } from "../../interfaces/studentInterface";
import { studentService } from "../../services/studentService";

interface StudentContextData {
  students: StudentInterface[];
  isLoading: boolean;
  isPendingCreateStudent: any
  createOneStudent: any
  findOneStudent: any
  isPendingDeleteStudent: any
  deleteOneStudent: any
  isPendingUpdateStudent: any
  updateOneStudent: any
}

export const StudentContext = createContext<StudentContextData | null>(null);

export function StudentProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient()

    const { data: students, isLoading } = useQuery({
      queryKey: ["alunos"],
      queryFn: studentService.getAll,
    });

    function findOneStudent(matricula: string) {
      return useQuery({
        queryKey: ["alunos", matricula],
        queryFn: () => studentService.getByMatricula(matricula),
        enabled: !!matricula,
      });
    }

   const {mutateAsync: createOneStudent, isPending: isPendingCreateStudent} = useMutation({
    mutationFn: (
      value: StudentInterface
    ) => studentService.create(value),
    onSuccess: () => {
      toast.success("Sucesso", {description: "Aluno cadastrado com sucesso!"});
      queryClient.invalidateQueries({ queryKey: ["alunos"] })
      queryClient.invalidateQueries({ queryKey: ["dashboard-resumo"] })
    },
    onError: () => {
      toast.error("Erro", {description: "Ocorreu uma falha ao cadastrar aluno!"});
    },
  })

  const {mutateAsync: updateOneStudent, isPending: isPendingUpdateStudent} = useMutation({
    mutationFn: (
      value: StudentInterface
    ) => studentService.update(value.matricula, value),
    onSuccess: () => {
      toast.success("Sucesso", {description: "Aluno atualizado com sucesso!"});
      queryClient.invalidateQueries({ queryKey: ["alunos"] })
    },
    onError: () => {
      toast.error("Erro", {description: "Ocorreu uma falha ao atualizar aluno!"});
    },
  })

  const { mutateAsync: deleteOneStudent, isPending: isPendingDeleteStudent } = useMutation({
    mutationFn: (value: string) => studentService.remove(value),
    onSuccess: () => {
      toast.success("Sucesso", { description: "Aluno deletado com sucesso!" });
      queryClient.invalidateQueries({ queryKey: ["alunos"] });
    },
    onError: (error: any) => {
      console.log({ error });

      const dbErrors = error?.response?.data?.errors?.database;
      const apiMessage = error?.response?.data?.message;

      if (dbErrors?.includes("ER_ROW_IS_REFERENCED_2")) {
        toast.error("Erro ao deletar aluno", {
          description:
            "Não foi possível excluir o aluno porque existem registros relacionados a ele.",
        });
      } else if (apiMessage) {
        toast.error("Erro ao deletar aluno", { description: apiMessage });
      } else {
        toast.error("Erro ao deletar aluno", {
          description: "Não foi possível excluir o aluno.",
        });
      }
    },
  });


  return (
    <StudentContext.Provider
      value={{
        students,
        isLoading,
        createOneStudent,
        isPendingCreateStudent,
        findOneStudent,
        deleteOneStudent,
        isPendingDeleteStudent,
        updateOneStudent,
        isPendingUpdateStudent
      }}
    >
      {children}
    </StudentContext.Provider>
  );
}
