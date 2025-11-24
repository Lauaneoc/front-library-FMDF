import { createContext, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import type { StudentInterface } from "../../interfaces/studentInterface";
import { studentService } from "../../services/studentService";

interface StudentContextData {
  students: StudentInterface[];
  isLoading: boolean;
}

export const StudentContext = createContext<StudentContextData | null>(null);

export function StudentProvider({ children }: { children: ReactNode }) {
  const { data: students, isLoading } = useQuery({
    queryKey: ["students"],
    queryFn: studentService.getAll,
  });

  return (
    <StudentContext.Provider
      value={{
        students,
        isLoading,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
}
