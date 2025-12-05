import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useTurmas } from "../../../@shared/contexts/turmas/useTurmas"

const schema = z.object({
  id: z.number(),
  curso: z.string(),
  serie: z.string(),
  ano_letivo: z.number(),
})

export function useViewTurma(id: string) {
  const { findOneTurma } = useTurmas()

  const turmaId = Number(id)

  const { data, isLoading: isLoadingTurma } = findOneTurma(turmaId)

  const {
    formState: { errors },
    register,
    reset,
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    if (data) {
      reset({
        id: data.id,
        curso: data.curso,
        serie: data.serie,
        ano_letivo: data.ano_letivo,
      })
    }
  }, [data, reset])

  return {
    register,
    errors,
    data,
    isLoadingTurma,
  }
}
