import { createContext, ReactNode } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { StudentInterface } from "../../interfaces/studentInterface";
import { studentService } from "../../services/studentService";
import { toast } from "../../../hooks/use-toast";

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
      toast({
        title: "Sucesso",
        description: "Aluno cadastrado com sucesso!",
        variant: "default"
      })
      queryClient.invalidateQueries({ queryKey: ["alunos"] })
    },
    onError: () => {
      toast({
          title: "Erro",
          description: "Erro ao cadastrar aluno!",
          variant: "destructive"
      })
    },
  })

  const {mutateAsync: updateOneStudent, isPending: isPendingUpdateStudent} = useMutation({
    mutationFn: (
      value: StudentInterface
    ) => studentService.update(value.matricula, value),
    onSuccess: () => {
      toast({
        title: "Sucesso",
        description: "Aluno atualizado com sucesso!",
        variant: "default"
      })
      queryClient.invalidateQueries({ queryKey: ["alunos"] })
    },
    onError: () => {
      toast({
          title: "Erro",
          description: "Erro ao atualizar aluno!",
          variant: "destructive"
      })
    },
  })

  const {mutateAsync: deleteOneStudent, isPending: isPendingDeleteStudent} = useMutation({
    mutationFn: (
      value: string
    ) => studentService.remove(value),
    onSuccess: () => {
      toast({
        title: "Sucesso",
        description: "Aluno deletado com sucesso!",
        variant: "default"
      })
      queryClient.invalidateQueries({ queryKey: ["alunos"] })
    },
    onError: () => {
      toast({
          title: "Erro",
          description: "Erro ao deletar aluno!",
          variant: "destructive"
      })
    },
  })

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
