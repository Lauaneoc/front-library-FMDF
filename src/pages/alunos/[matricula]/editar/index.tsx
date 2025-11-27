"use client"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { Button } from "../../../../components/ui/button"
import { Input } from "../../../../components/ui/input"
import { Label } from "../../../../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../components/ui/select"
import { Card } from "../../../../components/ui/card"
import { studentService } from "../../../../@shared/services/studentService"
import { turmaService } from "../../../../@shared/services/turmaService"
import { TurmaInterface } from "../../../../@shared/interfaces/turmaInterface"
import { useQuery } from "@tanstack/react-query"
import { queryClient } from "../../../../@shared/api/queryClient"
import { useToast } from "../../../../hooks/use-toast"

export default function EditarAlunoPage() {
  const { matricula } = useParams()
  const navigate = useNavigate()
  const { toast } = useToast()

  const [form, setForm] = useState({
    matricula: "",
    nome: "",
    cpf: "",
    data_nascimento: "",
    id_turma: "",
  })
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  const { data: turmas = [] } = useQuery<TurmaInterface[]>({
    queryKey: ["turmas"],
    queryFn: () => turmaService.getAll(),
  })

  useEffect(() => {
    if (!matricula) return
    setLoading(true)
    studentService.getByMatricula(matricula).then((data) => {
      setForm({
        matricula: data.matricula || "",
        nome: data.nome || "",
        cpf: data.cpf || "",
        data_nascimento: data.data_nascimento ? data.data_nascimento.split('T')[0] : "",
        id_turma: data.id_turma ? String(data.id_turma) : "",
      })
    }).catch((err) => {
      console.error(err)
      toast({ title: "Erro", description: "Não foi possível carregar o aluno" })
    }).finally(() => setLoading(false))
  }, [matricula, toast])

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value })
    setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!matricula) return

    if (!form.matricula || !form.nome || !form.cpf || !form.data_nascimento || !form.id_turma) {
      setError("Todos os campos são obrigatórios")
      return
    }

    setSaving(true)
    try {
      await studentService.update(matricula, {
        matricula: form.matricula,
        nome: form.nome,
        cpf: form.cpf,
        data_nascimento: form.data_nascimento,
        id_turma: parseInt(form.id_turma),
      })
      await queryClient.invalidateQueries({ queryKey: ["students"] })
      toast({ title: "Aluno atualizado", description: "Dados atualizados com sucesso" })
      navigate("/alunos")
    } catch (err: any) {
      console.error(err)
      setError(err.response?.data?.message || "Erro ao atualizar aluno")
      toast({ title: "Erro", description: "Erro ao atualizar aluno" })
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div>Carregando...</div>

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
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive">
              {error}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Input label="Matrícula *" id="matricula" value={form.matricula} onChange={(e) => handleChange('matricula', e.target.value)} className="bg-input border-border" />
            </div>

            <div className="space-y-2">
              <Input label="CPF *" id="cpf" value={form.cpf} onChange={(e) => handleChange('cpf', e.target.value.replace(/\D/g, '').slice(0,11))} maxLength={11} className="bg-input border-border" />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Input label="Nome Completo *" id="nome" value={form.nome} onChange={(e) => handleChange('nome', e.target.value)} className="bg-input border-border" />
            </div>

            <div className="space-y-2">
              <Input label="Data de Nascimento *" id="data_nascimento" type="date" value={form.data_nascimento} onChange={(e) => handleChange('data_nascimento', e.target.value)} className="bg-input border-border" />
            </div>

            <div className="space-y-2">
              <Input label="Turma *" id="turma" value={form.id_turma} onChange={(e) => handleChange('id_turma', e.target.value)} className="bg-input border-border" />
              <Select value={form.id_turma} onValueChange={(value) => handleChange('id_turma', value)}>
                <SelectTrigger className="bg-input border-border">
                  <SelectValue placeholder="Selecione uma turma" />
                </SelectTrigger>
                <SelectContent >
                  {turmas.map((turma: TurmaInterface) => (
                    <SelectItem key={turma.id} value={turma.id.toString()}>
                      {turma.serie} - {turma.curso} ({turma.ano_letivo})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={saving} className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium">{saving ? 'Salvando...' : 'Salvar'}</Button>
            <Button type="button" variant="outline" onClick={() => navigate('/alunos')} className="border-border hover:bg-muted">Cancelar</Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
