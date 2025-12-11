"use client"
import { useLocation, useParams } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { Card } from "../../../components/ui/card"
import { useUpdateBook } from "./useUpdadeBook"
import { Controller } from "react-hook-form"
import { LivrosProvider } from "../../../@shared/contexts/livros/LivrosProvider"

function Page() {
  const { isbn } = useParams<{ isbn: string }>();

  const { 
    onSubmit, 
    register, 
    control, 
    loading, 
    errors,
    navigate
  } = useUpdateBook(isbn ?? "")

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
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Input 
                label="ISBN *" 
                id="isbn" 
                error={errors.isbn?.message}
                {...register("isbn")} 
                className="bg-input border-border" 
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Input 
                label="Nome do Livro *" 
                id="nome"
                error={errors.nome?.message}
                {...register("nome")}
                className="bg-input border-border" 
              />
            </div>

            <div className="space-y-2">
              <Input 
                label="Autor *" 
                id="autor" 
                error={errors.autor?.message}
                {...register("autor")}
                className="bg-input border-border" 
              />
            </div> 

            <div className="space-y-2">
              <Input 
                label="Editora *" 
                id="editora" 
                error={errors.editora?.message}
                {...register("editora")}
                className="bg-input border-border" />
            </div>

            <div className="space-y-2">
              <Input 
                label="Disciplina *" 
                id="disciplina" 
                error={errors.disciplina?.message}
                {...register("disciplina")}
                className="bg-input border-border" 
              />
            </div>

            {/* Série */}
            <div className="space-y-2">
              <Controller
                name="serie"
                control={control}
                rules={{ required: "Série é obrigatória" }}
                render={({ field, fieldState }) => (
                  <div className="space-y-2">
                    <Label htmlFor="serie" className="text-foreground font-medium">
                      Série *
                    </Label>

                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="bg-input border-border" id="serie">
                        <SelectValue placeholder="Selecione a série" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1º Ano">1º Ano</SelectItem>
                        <SelectItem value="2º Ano">2º Ano</SelectItem>
                        <SelectItem value="3º Ano">3º Ano</SelectItem>
                        <SelectItem value="4º Ano">4º Ano</SelectItem>
                      </SelectContent>
                    </Select>

                    {errors.serie?.message && (
                      <p className="text-xs text-destructive">{errors.serie?.message}</p>
                    )}
                  </div>
                )}
              />
            </div>

            <div className="space-y-2">
              <Input 
                label="Ano de Publicação *" 
                id="anoPublicacao" 
                error={errors.ano_publicacao?.message}
                type="number" 
                {...register("ano_publicacao")}
                className="bg-input border-border" 
              />
            </div>

            <div className="space-y-2">
              <Input 
                label="Edição" 
                id="edicao" 
                error={errors.edicao?.message}
                {...register("edicao")}
                className="bg-input border-border" 
              />
            </div>

          </div>

          <div className="flex gap-3 pt-4">
            <Button 
              type="submit" 
              disabled={loading} 
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
            >
                {loading ? 'Salvando...' : 'Salvar'}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate('/livros')} 
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

export default function EditarLivroPage() {
  return (
    <LivrosProvider>
      <Page />
    </LivrosProvider>
  )
}
