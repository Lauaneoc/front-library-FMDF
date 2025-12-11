"use client"
import { useNavigate, useParams } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { Button } from "../../../../components/ui/button"
import { Input } from "../../../../components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../components/ui/select"
import { Card } from "../../../../components/ui/card"
import { TurmaInterface } from "../../../../@shared/interfaces/turmaInterface"
import { useUpdateMatricula } from "./useUpdateMatricula"
import { Controller } from "react-hook-form"
import { Label } from "../../../../components/ui/label"
import { StudentProvider } from "../../../../@shared/contexts/student/StudentProvider"
import { TurmasProvider } from "../../../../@shared/contexts/turmas/TurmasProvider"

function Page() {
  const { matricula} = useParams()
  const navigate = useNavigate()
  const { 
    isPendingUpdateStudent, 
    onSubmit, 
    isLoadingMatricula, 
    register, 
    control ,
    isPendingAllTurmas,
    turmas,
    errors,
  } = useUpdateMatricula(matricula ?? "")

  if (isLoadingMatricula) return <div>Carregando...</div>

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/alunos")}
          className="hover:bg-muted"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">Editar Aluno</h1>
          <p className="text-sm md:text-base text-muted-foreground">Atualize os dados do aluno</p>
        </div>
      </div>

      <Card className="p-6 md:p-8 bg-card border border-border">
        <form onSubmit={onSubmit} className="space-y-6">

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Input label="Matrícula *" disabled {...register("matricula")} id="matricula" className="bg-input border-border" error={errors.matricula?.message} />
            </div>

            <div className="space-y-2">
              <Input label="CPF *" id="cpf" {...register("cpf")} maxLength={11} className="bg-input border-border" error={errors.cpf?.message} />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Input label="Nome Completo *" id="nome" {...register("nome")} className="bg-input border-border" error={errors.nome?.message} />
            </div>

            <div className="space-y-2">
              <Input label="Data de Nascimento *" id="data_nascimento" type="date" {...register("data_nascimento")} className="bg-input border-border" error={errors.data_nascimento?.message} />
            </div>

            <div className="space-y-2">
              {/* <Input label="Turma *" id="turma" {...register("id_turma")} className="bg-input border-border" /> */}
              <Controller
                name="id_turma"
                control={control}
                rules={{ required: "Turma é obrigatória" }}
                render={({ field, fieldState }) => (
                  <div className="space-y-2">
                    <Label htmlFor="id_turma" className="text-foreground font-medium">
                      Turma *
                    </Label>

                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      key={field.value ?? "empty-field"}
                    >
                      <SelectTrigger className="bg-input border-border" id="id_turma">
                        <SelectValue placeholder="Selecione uma turma" />
                      </SelectTrigger>

                      <SelectContent>
                        {isPendingAllTurmas && <div>Carregando turmas...</div>}

                        {!isPendingAllTurmas &&
                          turmas?.map((turma: TurmaInterface) => (
                            <SelectItem key={turma.id} value={String(turma.id)}>
                              {turma.serie} - {turma.curso} ({turma.ano_letivo})
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>

                    {fieldState.error && (
                      <p className="text-xs text-destructive">{fieldState.error.message}</p>
                    )}
                  </div>
                )}
              />

            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={isPendingUpdateStudent} className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium">{isPendingUpdateStudent ? 'Salvando...' : 'Salvar'}</Button>
            <Button type="button" variant="outline" onClick={() => navigate('/alunos')} className="border-border hover:bg-muted">Cancelar</Button>
          </div>
        </form>
      </Card>
    </div>
  )
}

export default function EditarAlunoPage() {
  return (
    <StudentProvider>
      <TurmasProvider>
        <Page />
      </TurmasProvider>
    </StudentProvider>
  )
}
