import { ArrowLeft, Save } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { FormField } from "../../../components/form-field"
import { TurmasProvider } from "../../../@shared/contexts/turmas/TurmasProvider"
import { Controller } from "react-hook-form"
import { useCreateTurma } from "./useCreateTurma"

const serieOptions = [
  { value: "1º Ano", label: "1º Ano" },
  { value: "2º Ano", label: "2º Ano" },
  { value: "3º Ano", label: "3º Ano" },
  { value: "4º Ano", label: "4º Ano" },
]

function Page() {
  const { onSubmit, control } = useCreateTurma()

  return (
    <main className="flex-1 overflow-y-auto p-6">
      <div className="max-w-4xl mx-auto space-y-6">

        <div className="flex items-center gap-4">
          <Link to="/turmas">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" /> Voltar
            </Button>
          </Link>
          <div>
            <h2 className="text-3xl font-bold text-foreground">Nova Turma</h2>
            <p className="text-muted-foreground">Cadastre uma nova turma no sistema</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Dados da Turma</CardTitle>
          </CardHeader>

          <CardContent>

            <form className="space-y-6" onSubmit={onSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <FormField
                  id="id"
                  label="ID"
                  value="Gerado automaticamente"
                  disabled
                  description="Gerado automaticamente"
                />

                {/* CURSO - TEXTO LIVRE */}
                <Controller
                  name="curso"
                  control={control}
                  render={({ field }) => (
                    <FormField
                      {...field}
                      id="curso"
                      label="Curso"
                      type="text"
                      placeholder="Ex: Técnico em Informática"
                      required
                    />
                  )}
                />

                {/* SÉRIE */}
                <Controller
                  name="serie"
                  control={control}
                  render={({ field }) => (
                    <FormField
                      {...field}
                      id="serie"
                      label="Série"
                      type="select"
                      options={serieOptions}
                      placeholder="Selecione a série"
                      required
                    />
                  )}
                />

                {/* ANO LETIVO - TEXTO LIVRE */}
                <Controller
                  name="anoLetivo"
                  control={control}
                  render={({ field }) => (
                    <FormField
                      {...field}
                      id="anoLetivo"
                      label="Ano Letivo"
                      type="text"
                      placeholder="Ex: 2025"
                      required
                    />
                  )}
                />
              </div>

              <div className="flex justify-end gap-4">
                <Link to="/turmas">
                  <Button variant="outline">Cancelar</Button>
                </Link>

                <Button type="submit">
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Turma
                </Button>
              </div>

            </form>

          </CardContent>
        </Card>

      </div>
    </main>
  )
}

export default function NovaTurmaPage() {
  return (
    <TurmasProvider>
      <Page />
    </TurmasProvider>
  )
}
