import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router-dom"
import { useTurmas } from "../../../@shared/contexts/turmas/useTurmas"

const schema = z.object({
  curso: z.string().min(1, "Curso obrigatório"),
  serie: z.string().min(1, "Série obrigatória"),
  anoLetivo: z
    .string()
    .regex(/^\d{4}$/, "Ano deve conter exatamente 4 números"),
})

type FormData = z.infer<typeof schema>

export function useCreateTurma() {
  const { createOneTurma } = useTurmas()
  const navigate = useNavigate()

  const { handleSubmit, control } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      curso: "",
      serie: "",
      anoLetivo: "",
    },
  })

  const onSubmit = handleSubmit(async (data) => {
    const payload = {
      curso: data.curso,
      serie: data.serie,
      ano_letivo: Number(data.anoLetivo),
    }

    console.log("Payload enviado:", payload)

    await createOneTurma(payload)

    navigate("/turmas")
  })

  return { onSubmit, control }
}
