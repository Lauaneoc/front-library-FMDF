"use client"
import { useParams } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Textarea } from "../../../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { Card } from "../../../components/ui/card"
import { useUpdateLocacao } from "./useUpdateLocacao"
import { Controller } from "react-hook-form"
import { LocacoesProvider } from "../../../@shared/contexts/locacoes/LocacoesProvider"
import { StudentProvider } from "../../../@shared/contexts/student/StudentProvider"
import { ExemplaresProvider } from "../../../@shared/contexts/exemplares/ExemplaresProvider"
import { LivrosProvider } from "../../../@shared/contexts/livros/LivrosProvider"

function Page() {
  const { id } = useParams<{ id: string }>();

  const { 
    onSubmit, 
    register, 
    control, 
    loading, 
    navigate,
    displayData,
    isLoadingLocacao,
    errors
  } = useUpdateLocacao(id ?? "")

  if (isLoadingLocacao) {
    return <div>Carregando...</div>
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/locacoes")}
          className="hover:bg-muted"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">Editar Locação</h1>
          <p className="text-sm md:text-base text-muted-foreground">Atualize os dados da locação</p>
        </div>
      </div>

      <Card className="p-6 md:p-8 bg-card border border-border max-w-2xl">
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">

            <div className="space-y-2">
              <p className="font-medium">Aluno</p>
              <p className="text-muted-foreground">{displayData?.alunoNome || 'N/A'}</p>
            </div>

            <div className="space-y-2">
              <p className="font-medium">Livro</p>
              <p className="text-muted-foreground">{displayData?.livroNome || 'N/A'}</p>
            </div>

            <div className="space-y-2">
              <Input 
                label="Data de Devolução"
                id="data_devolucao"
                error={errors.data_devolucao?.message}
                type="date" 
                {...register("data_devolucao")}
              />
            </div>

            {/* DESCRIÇÃO */}
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="descricao">Descrição</Label>
              <Textarea
                id="descricao"
                rows={4}
                placeholder="Informe observações da locação"
                {...register("descricao")}
              />
              {errors.descricao && (
                <p className="text-xs text-destructive">{errors.descricao.message}</p>
              )}
            </div>

          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={loading}>
              {loading ? 'Salvando...' : 'Salvar'}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate('/locacoes')}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}

export default function EditarLocacaoPage() {
  return (
    <StudentProvider>
      <ExemplaresProvider>
        <LivrosProvider>
          <LocacoesProvider>
            <Page />
          </LocacoesProvider>
        </LivrosProvider>
      </ExemplaresProvider>
    </StudentProvider>
  )
}
