import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { useTurmas } from "../../../@shared/contexts/turmas/useTurmas"
import { useNavigate } from "react-router-dom"

export function useUpdateTurma(id: number) {

  const { updateOneTurma, findOneTurma } = useTurmas()
  const { data, isLoading: isLoadingTurma } = findOneTurma(id)

  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const {
    handleSubmit,
    register,
    reset
  } = useForm()

  useEffect(() => {
    if (data) {
      reset({
        curso: data.curso,
        serie: data.serie,
        ano_letivo: data.ano_letivo
      })
    }
  }, [data, reset])

  const onSubmit = handleSubmit(async (formData: any) => {
    setLoading(true)
    try {
      const payload = {
        ...formData,
        id
      }

      await updateOneTurma.mutateAsync(payload)
      navigate("/turmas")

    } finally {
      setLoading(false)
    }
  })

  return {
    onSubmit,
    register,
    navigate,
    loading,
    isLoadingTurma
  }
}
