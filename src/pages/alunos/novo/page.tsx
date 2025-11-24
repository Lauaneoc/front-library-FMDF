
import { ArrowLeft, Save } from "lucide-react"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Label } from "../../../components/ui/label"
import { Input } from "../../../components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"

export default function NovoAlunoPage() {
  return (
    <div className="flex h-screen bg-background">
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
            <div>
              <h2 className="text-3xl font-bold text-foreground">Novo Aluno</h2>
              <p className="text-muted-foreground">Cadastre um novo aluno no sistema</p>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Dados do Aluno</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="matricula">Matrícula</Label>
                    <Input id="matricula" placeholder="Ex: 2024001" disabled value="2024005" />
                    <p className="text-xs text-muted-foreground">Gerada automaticamente</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome Completo</Label>
                    <Input id="nome" placeholder="Digite o nome completo do aluno" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cpf">CPF</Label>
                    <Input id="cpf" placeholder="000.000.000-00" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nascimento">Data de Nascimento</Label>
                    <Input id="nascimento" type="date" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="turma">Turma</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a turma" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1a">1º Ano A - Ensino Médio</SelectItem>
                        <SelectItem value="1b">1º Ano B - Ensino Médio</SelectItem>
                        <SelectItem value="1c">1º Ano C - Ensino Médio</SelectItem>
                        <SelectItem value="2a">2º Ano A - Ensino Médio</SelectItem>
                        <SelectItem value="2b">2º Ano B - Ensino Médio</SelectItem>
                        <SelectItem value="3a">3º Ano A - Ensino Médio</SelectItem>
                        <SelectItem value="3b">3º Ano B - Ensino Médio</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end gap-4">
                    <Button variant="outline">Cancelar</Button>
                  <Button>
                    <Save className="h-4 w-4 mr-2" />
                    Salvar Aluno
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
