"use client"
import { useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { Card } from "../../../components/ui/card"
import { useCreateBook } from "./useCreateBook"
import { LivrosProvider } from "../../../@shared/contexts/livros/LivrosProvider"
import { Controller } from "react-hook-form"

function Page() {
  const { onSubmit, register, control, isPendingCreateBook, errors } = useCreateBook()
  const navigate = useNavigate()

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
          <form onSubmit={onSubmit} className="space-y-6">

            <div className="grid md:grid-cols-2 gap-6">
              {/* ISBN */}
              <div className="space-y-2">
                <Input
                  id="isbn"
                  placeholder="978-85-16-07234-5"
                  label="ISBN *"
                  error={errors.isbn?.message}
                  {...register("isbn")}
                  className="bg-input border-border"
                />
              </div>

              {/* Nome */}
              <div className="space-y-2 md:col-span-2">
                <Input
                  id="nome"
                  placeholder="Matemática - Volume 1"
                  label="Nome do Livro *"
                  error={errors.nome?.message}
                  {...register("nome")}
                  className="bg-input border-border"
                />
              </div>

              {/* Autor */}
              <div className="space-y-2">
                <Input
                  id="autor"
                  placeholder="João Silva"
                  label="Autor *"
                  error={errors.autor?.message}
                  {...register("autor")}
                  className="bg-input border-border"
                />
              </div>

              {/* Editora */}
              <div className="space-y-2">
                <Input
                  id="editora"
                  placeholder="Editora ABC"
                  label="Editora *"
                  error={errors.editora?.message}
                  {...register("editora")}
                  className="bg-input border-border"
                />
              </div>

              {/* Disciplina */}
              <div className="space-y-2">
             <Input
                  id="disciplina"
                  placeholder="Matemática"
                  label="Disciplina"
                  {...register("disciplina")}
                  error={errors.disciplina?.message}
                  className="bg-input border-border"
                />
              </div>

              {/* Série */}
              <div className="space-y-2">
                <Controller
                  name="serie"
                  control={control}
                  rules={{ required: "Série é obrigatória" }}
                  render={({ field }) => (
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

              {/* Ano de Publicação */}
              <div className="space-y-2">
                <Input
                  id="ano_publicacao"
                  placeholder="2024"
                  error={errors.ano_publicacao?.message}
                  label="Ano de Publicação *"
                  type="number"
                  {...register("ano_publicacao")}
                  min="1900"
                  max="2099"
                  className="bg-input border-border"
                />
              </div>

              {/* Edição */}
              <div className="space-y-2">
                <Input
                  id="edicao"
                  placeholder="1ª Edição"
                  error={errors.edicao?.message}
                   label="Edição"
                  {...register("edicao")}
                  className="bg-input border-border"
                />
              </div>
            </div>

            {/* Botões */}
            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
              >
                {isPendingCreateBook ? "Criando..." : "Criar Livro"}
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

export default function NovoLivroPage() {
  return (
    <LivrosProvider>
      <Page />
    </LivrosProvider>
  )
}
