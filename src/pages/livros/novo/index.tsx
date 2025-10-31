import { ArrowLeft, Save } from "lucide-react"
import { Link } from "react-router-dom"
import { AppSidebar } from "../../../components/app-sidebar"
import { AppHeader } from "../../../components/app-header"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { FormField } from "../../../components/form-field"

const disciplinaOptions = [
  { value: "matematica", label: "Matemática" },
  { value: "portugues", label: "Português" },
  { value: "historia", label: "História" },
  { value: "geografia", label: "Geografia" },
  { value: "fisica", label: "Física" },
  { value: "quimica", label: "Química" },
  { value: "biologia", label: "Biologia" },
  { value: "ingles", label: "Inglês" },
  { value: "educacao_fisica", label: "Educação Física" },
  { value: "artes", label: "Artes" },
]

const serieOptions = [
  { value: "1ano", label: "1º Ano" },
  { value: "2ano", label: "2º Ano" },
  { value: "3ano", label: "3º Ano" },
  { value: "4ano", label: "4º Ano" },
]

export default function NovoLivroPage() {
  return (
    <div className="flex h-screen bg-background">
      <AppSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AppHeader />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
              <Link to="/livros">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar
                </Button>
              </Link>
              <div>
                <h2 className="text-3xl font-bold text-foreground">Novo Livro</h2>
                <p className="text-muted-foreground">Cadastre um novo livro no sistema</p>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Dados do Livro</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField id="isbn" label="ISBN" placeholder="978-85-16-07234-5" required />

                    <FormField id="nome" label="Nome do Livro" placeholder="Digite o nome do livro" required />

                    <FormField id="autor" label="Autor" placeholder="Nome do autor" required />

                    <FormField id="editora" label="Editora" placeholder="Nome da editora" required />

                    <FormField
                      id="disciplina"
                      label="Disciplina"
                      type="select"
                      options={disciplinaOptions}
                      placeholder="Selecione a disciplina"
                      required
                    />

                    <FormField
                      id="serie"
                      label="Série"
                      type="select"
                      options={serieOptions}
                      placeholder="Selecione a série"
                      required
                    />

                    <FormField id="anoPublicacao" label="Ano de Publicação" placeholder="2024" required />

                    <FormField id="edicao" label="Edição" placeholder="1ª Edição" />
                  </div>

                  <div className="flex justify-end gap-4">
                    <Link to="/livros">
                      <Button variant="outline">Cancelar</Button>
                    </Link>
                    <Button>
                      <Save className="h-4 w-4 mr-2" />
                      Salvar Livro
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
