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

export default function NovoAlunoPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    matricula: "",
    nome: "",
    cpf: "",
    data_nascimento: "",
    id_turma: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const { data: turmas = [] } = useQuery<TurmaInterface[]>({
    queryKey: ["turmas"],
    queryFn: () => turmaService.getAll(),
  })

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value })
    setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!form.matricula || !form.nome || !form.cpf || !form.data_nascimento || !form.id_turma) {
      setError("Todos os campos são obrigatórios")
      return
    }

    setLoading(true)
    try {
      await studentService.create({
        matricula: form.matricula,
        nome: form.nome,
        cpf: form.cpf,
        data_nascimento: form.data_nascimento,
        id_turma: parseInt(form.id_turma),
      })

      await queryClient.invalidateQueries({ queryKey: ["alunos"] })
      navigate("/alunos")
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao criar aluno")
    } finally {
      setLoading(false)
    }
  }

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
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive">
              {error}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            {/* Matrícula */}
            <div className="space-y-2">
              <Label htmlFor="matricula" className="text-foreground font-medium">
                Matrícula *
              </Label>
              <Input
                id="matricula"
                placeholder="Ex: 202211190011"
                value={form.matricula}
                onChange={(e) => handleChange("matricula", e.target.value)}
                className="bg-input border-border"
              />
            </div>

            {/* CPF */}
            <div className="space-y-2">
              <Label htmlFor="cpf" className="text-foreground font-medium">
                CPF *
              </Label>
              <Input
                id="cpf"
                placeholder="Ex: 12345678901"
                value={form.cpf}
                onChange={(e) => handleChange("cpf", e.target.value.replace(/\D/g, "").slice(0, 11))}
                maxLength={11}
                className="bg-input border-border"
              />
            </div>

            {/* Nome */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="nome" className="text-foreground font-medium">
                Nome Completo *
              </Label>
              <Input
                id="nome"
                placeholder="Ex: Maria Silva"
                value={form.nome}
                onChange={(e) => handleChange("nome", e.target.value)}
                className="bg-input border-border"
              />
            </div>

            {/* Data de Nascimento */}
            <div className="space-y-2">
              <Label htmlFor="data_nascimento" className="text-foreground font-medium">
                Data de Nascimento *
              </Label>
              <Input
                id="data_nascimento"
                type="date"
                value={form.data_nascimento}
                onChange={(e) => handleChange("data_nascimento", e.target.value)}
                className="bg-input border-border"
              />
            </div>

            {/* Turma */}
            <div className="space-y-2">
              <Label htmlFor="turma" className="text-foreground font-medium">
                Turma *
              </Label>
              <Select value={form.id_turma} onValueChange={(value) => handleChange("id_turma", value)}>
                <SelectTrigger className="bg-input border-border">
                  <SelectValue placeholder="Selecione uma turma" />
                </SelectTrigger>
                <SelectContent>
                  {turmas.map((turma: TurmaInterface) => (
                    <SelectItem key={turma.id} value={turma.id.toString()}>
                      {turma.serie} - {turma.curso} ({turma.ano_letivo})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Botões */}
          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              disabled={loading}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
            >
              {loading ? "Criando..." : "Criar Aluno"}
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
