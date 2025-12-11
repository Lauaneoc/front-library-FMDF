"use client"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { Card } from "../../../components/ui/card"
import { studentService } from "../../../@shared/services/studentService"
import { turmaService } from "../../../@shared/services/turmaService"
import { TurmaInterface } from "../../../@shared/interfaces/turmaInterface"
import { useQuery } from "@tanstack/react-query"
import { queryClient } from "../../../@shared/api/queryClient"
import { useCreateStudent } from "./useCreateStudent"
import { Controller } from "react-hook-form"
import { StudentProvider } from "../../../@shared/contexts/student/StudentProvider"
import { TurmasProvider } from "../../../@shared/contexts/turmas/TurmasProvider"

function Page() {
  const {
    onSubmit,
    control,
    isPendingCreateStudent,
    turmas,
    isPendingAllTurmas,
    register,
    errors,
  } = useCreateStudent()
  const navigate = useNavigate()

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
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">Novo Aluno</h1>
          <p className="text-sm md:text-base text-muted-foreground">Cadastre um novo aluno no sistema</p>
        </div>
      </div>

      <Card className="p-6 md:p-8 bg-card border border-border">
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Matrícula */}
            <div className="space-y-2">
              <Input
                id="matricula"
                label="Matrícula *"
                {...register("matricula")}
                placeholder="Ex: 202211190011"
                className="bg-input border-border"
                error={errors.matricula?.message}
              />
            </div>

            {/* CPF */}
            <div className="space-y-2">
              <Input
                id="cpf"
                label="CPF *"
                {...register("cpf")}
                placeholder="Ex: 12345678901"
                maxLength={11}
                className="bg-input border-border"
                error={errors.cpf?.message}
              />
            </div>

            {/* Nome */}
            <div className="space-y-2 md:col-span-2">
              <Input
                id="nome"
                label="Nome Completo *"
                {...register("nome")}
                placeholder="Ex: Maria Silva"
                className="bg-input border-border"
                error={errors.nome?.message}
              />
            </div>

            {/* Data de Nascimento */}
            <div className="space-y-2">
              <Input
                id="data_nascimento"
                type="date"
                {...register("data_nascimento")}
                label="Data de Nascimento *"
                className="bg-input border-border"
                error={errors.data_nascimento?.message}
              />
            </div>



            {/* Turma */}
            <div className="space-y-2">
                <Controller
                  name="id_turma"
                  control={control}
                  rules={{ required: "Série é obrigatória" }}
                  render={({ field, fieldState }) => (
                    <div className="space-y-2">
                      <Label htmlFor="serie" className="text-foreground font-medium">
                        Turma *
                      </Label>

                      <Select
                        value={field.value ? String(field.value) : undefined}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="bg-input border-border" id="serie">
                           <SelectValue placeholder="Selecione uma turma" />
                        </SelectTrigger>
                        <SelectContent>
                          {isPendingAllTurmas && (
                            <div>Carregando turmas...</div>
                          )}
                          {!isPendingAllTurmas && turmas?.length && turmas.map((turma: TurmaInterface) => (
                            <SelectItem key={turma.id} value={turma.id.toString()}>
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

          {/* Botões */}
          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              disabled={isPendingCreateStudent}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
            >
              {isPendingCreateStudent ? "Criando..." : "Criar Aluno"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/alunos")}
              className="border-border hover:bg-muted"
            >
              Cancelar
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}

export default function NovoAlunoPage() {
  return (
    <StudentProvider>
      <TurmasProvider>
        <Page />
      </TurmasProvider>
    </StudentProvider>
  )
}
