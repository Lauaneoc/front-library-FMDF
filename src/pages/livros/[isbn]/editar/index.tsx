"use client"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { Button } from "../../../../components/ui/button"
import { Input } from "../../../../components/ui/input"
import { Label } from "../../../../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../components/ui/select"
import { Card } from "../../../../components/ui/card"
import { livroService } from "../../../../@shared/services/livroService"
import { queryClient } from "../../../../@shared/api/queryClient"
import { useToast } from "../../../../hooks/use-toast"

export default function EditarLivroPage() {
  const { isbn } = useParams()
  const navigate = useNavigate()
  const { toast } = useToast()

  const [form, setForm] = useState({
    isbn: "",
    nome: "",
    autor: "",
    editora: "",
    disciplina: "",
    serie: "",
    anoPublicacao: "",
    edicao: "",
  })
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!isbn) return
    setLoading(true)
    livroService.getByIsbn(isbn).then((data) => {
      setForm({
        isbn: data.isbn || "",
        nome: data.nome || "",
        autor: data.autor || "",
        editora: data.editora || "",
        disciplina: data.disciplina || "",
        serie: data.serie || "",
        anoPublicacao: data.ano_publicacao ? String(data.ano_publicacao) : "",
        edicao: data.edicao || "",
      })
    }).catch((err) => {
      console.error(err)
      toast({ title: "Erro", description: "Não foi possível carregar o livro" })
    }).finally(() => setLoading(false))
  }, [isbn, toast])

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value })
    setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isbn) return

    if (!form.isbn || !form.nome || !form.autor || !form.editora || !form.disciplina || !form.serie || !form.anoPublicacao) {
      setError("Todos os campos obrigatórios devem ser preenchidos")
      return
    }

    setSaving(true)
    try {
      await livroService.update(isbn, {
        isbn: form.isbn,
        nome: form.nome,
        autor: form.autor,
        editora: form.editora,
        disciplina: form.disciplina,
        serie: form.serie,
        ano_publicacao: parseInt(form.anoPublicacao),
        edicao: form.edicao || undefined,
      })

      await queryClient.invalidateQueries({ queryKey: ["livros"] })
      toast({ title: "Livro atualizado", description: "Dados atualizados com sucesso" })
      navigate("/livros")
    } catch (err: any) {
      console.error(err)
      setError(err.response?.data?.message || "Erro ao atualizar livro")
      toast({ title: "Erro", description: "Erro ao atualizar livro", variant: "destructive" })
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div>Carregando...</div>

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
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">Editar Livro</h1>
          <p className="text-sm md:text-base text-muted-foreground">Atualize os dados do livro</p>
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
            <div className="space-y-2">
              <Input label="ISBN *" id="isbn" value={form.isbn} onChange={(e) => handleChange('isbn', e.target.value)} className="bg-input border-border" />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Input label="Nome do Livro *" id="nome" value={form.nome} onChange={(e) => handleChange('nome', e.target.value)} className="bg-input border-border" />
            </div>

            <div className="space-y-2">
              <Input label="Autor *" id="autor" value={form.autor} onChange={(e) => handleChange('autor', e.target.value)} className="bg-input border-border" />
            </div> 

            <div className="space-y-2">
              <Input label="Editora *" id="editora" value={form.editora} onChange={(e) => handleChange('editora', e.target.value)} className="bg-input border-border" />
            </div>

            <div className="space-y-2">
              <Input label="Disciplina *" id="disciplina" value={form.disciplina} onChange={(e) => handleChange('disciplina', e.target.value)} className="bg-input border-border" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="serie" className="text-foreground font-medium">Série *</Label>
              <Select value={form.serie} onValueChange={(value) => handleChange('serie', value)}>
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

            <div className="space-y-2">
              <Input label="Ano de Publicação *" id="anoPublicacao" type="number" value={form.anoPublicacao} onChange={(e) => handleChange('anoPublicacao', e.target.value)} className="bg-input border-border" />
            </div>

            <div className="space-y-2">
              <Input label="Edição" id="edicao" value={form.edicao} onChange={(e) => handleChange('edicao', e.target.value)} className="bg-input border-border" />
            </div>

          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={saving} className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium">{saving ? 'Salvando...' : 'Salvar'}</Button>
            <Button type="button" variant="outline" onClick={() => navigate('/livros')} className="border-border hover:bg-muted">Cancelar</Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
