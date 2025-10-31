export function useNovaTurma() {
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

    return {
        cursoOptions,
        serieOptions,
        anoLetivoOptions,
    }
}