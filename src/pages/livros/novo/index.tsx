"use client"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { Card } from "../../../components/ui/card"
import { livroService } from "../../../@shared/services/livroService"
import { queryClient } from "../../../@shared/api/queryClient"
import { useToast } from "../../../hooks/use-toast"

export default function NovoLivroPage() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [form, setForm] = useState({
    isbn: "",
    nome: "",
    autor: "",
    editora: "",
    disciplina: "",
    serie: "",
    ano_publicacao: "",
    edicao: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value })
    setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validar campos obrigatórios
    if (!form.isbn || !form.nome || !form.autor || !form.editora || !form.disciplina || !form.serie || !form.ano_publicacao) {
      setError("Todos os campos obrigatórios devem ser preenchidos")
      return
    }

    setLoading(true)
    try {
      // Enviar exatamente como o backend espera
      const payload = {
        isbn: form.isbn,
        nome: form.nome,
        autor: form.autor,
        editora: form.editora,
        disciplina: form.disciplina,
        serie: form.serie,
        ano_publicacao: parseInt(form.ano_publicacao), // Converter para número
        edicao: form.edicao || null,
      }

      await livroService.create(payload)
      
      await queryClient.invalidateQueries({ queryKey: ["livros"] })
      toast({
        title: "Sucesso",
        description: "Livro criado com sucesso!",
      })
      navigate("/livros")
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || "Erro ao criar livro"
      setError(errorMsg)
      toast({
        title: "Erro",
        description: errorMsg,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/livros")}
          className="hover:bg-muted"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">Novo Livro</h1>
          <p className="text-sm md:text-base text-muted-foreground">Cadastre um novo livro no sistema</p>
        </div>
      </div>

      <Card className="p-6 md:p-8 bg-card border border-border max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm">
              {error}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            {/* ISBN */}
            <div className="space-y-2">
              <Label htmlFor="isbn" className="text-foreground font-medium">
                ISBN *
              </Label>
              <Input
                id="isbn"
                placeholder="978-85-16-07234-5"
                value={form.isbn}
                onChange={(e) => handleChange("isbn", e.target.value)}
                className="bg-input border-border"
              />
            </div>

            {/* Nome */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="nome" className="text-foreground font-medium">
                Nome do Livro *
              </Label>
              <Input
                id="nome"
                placeholder="Matemática - Volume 1"
                value={form.nome}
                onChange={(e) => handleChange("nome", e.target.value)}
                className="bg-input border-border"
              />
            </div>

            {/* Autor */}
            <div className="space-y-2">
              <Label htmlFor="autor" className="text-foreground font-medium">
                Autor *
              </Label>
              <Input
                id="autor"
                placeholder="João Silva"
                value={form.autor}
                onChange={(e) => handleChange("autor", e.target.value)}
                className="bg-input border-border"
              />
            </div>

            {/* Editora */}
            <div className="space-y-2">
              <Label htmlFor="editora" className="text-foreground font-medium">
                Editora *
              </Label>
              <Input
                id="editora"
                placeholder="Editora ABC"
                value={form.editora}
                onChange={(e) => handleChange("editora", e.target.value)}
                className="bg-input border-border"
              />
            </div>

            {/* Disciplina */}
            <div className="space-y-2">
              <Label htmlFor="disciplina" className="text-foreground font-medium">
                Disciplina *
              </Label>
              <Input
                id="disciplina"
                placeholder="Matemática"
                value={form.disciplina}
                onChange={(e) => handleChange("disciplina", e.target.value)}
                className="bg-input border-border"
              />
            </div>

            {/* Série */}
            <div className="space-y-2">
              <Label htmlFor="serie" className="text-foreground font-medium">
                Série *
              </Label>
              <Select value={form.serie} onValueChange={(value) => handleChange("serie", value)}>
                <SelectTrigger className="bg-input border-border">
                  <SelectValue placeholder="Selecione a série" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1º Ano">1º Ano</SelectItem>
                  <SelectItem value="2º Ano">2º Ano</SelectItem>
                  <SelectItem value="3º Ano">3º Ano</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Ano de Publicação */}
            <div className="space-y-2">
              <Label htmlFor="ano_publicacao" className="text-foreground font-medium">
                Ano de Publicação *
              </Label>
              <Input
                id="ano_publicacao"
                placeholder="2024"
                type="number"
                min="1900"
                max="2099"
                value={form.ano_publicacao}
                onChange={(e) => handleChange("ano_publicacao", e.target.value)}
                className="bg-input border-border"
              />
            </div>

            {/* Edição */}
            <div className="space-y-2">
              <Label htmlFor="edicao" className="text-foreground font-medium">
                Edição
              </Label>
              <Input
                id="edicao"
                placeholder="1ª Edição"
                value={form.edicao}
                onChange={(e) => handleChange("edicao", e.target.value)}
                className="bg-input border-border"
              />
            </div>
          </div>

          {/* Botões */}
          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              disabled={loading}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
            >
              {loading ? "Criando..." : "Criar Livro"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/livros")}
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
