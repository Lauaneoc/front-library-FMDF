import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({

})

export function useCreateTurma() {

    const {
        handleSubmit,
        formState: {errors}
    } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema)
    })

        const cursoOptions = [
        { value: "ensino_medio", label: "Ensino Médio" },
        { value: "ensino_fundamental", label: "Ensino Fundamental" },
        { value: "tecnico", label: "Técnico" },
        ]

    const serieOptions = [
        { value: "1ano", label: "1º Ano" },
        { value: "2ano", label: "2º Ano" },
        { value: "3ano", label: "3º Ano" },
        { value: "4ano", label: "4º Ano" },
    ]

    const anoLetivoOptions = [
        { value: "2024", label: "2024" },
        { value: "2025", label: "2025" },
    ]

    const onSubmit = handleSubmit(async () => {
        // vai chamar a action aq
    })

    return {
        onSubmit,
        errors,
        anoLetivoOptions,
        serieOptions,
        cursoOptions
    }
}