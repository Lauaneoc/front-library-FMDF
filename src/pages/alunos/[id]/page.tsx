import { ArrowLeft, Edit, BookOpen, Calendar, User } from "lucide-react"
import { StatusBadge } from "../../../components/status-badge"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Label } from "../../../components/ui/label"
import { Badge } from "../../../components/ui/badge"
import { TableSimple } from "../../../components/table-simple"

// Mock data
const mockStudent = {
  matricula: "2024001",
  nome: "Ana Silva Santos",
  cpf: "123.456.789-00",
  nascimento: "15/03/2007",
  turma: "1º Ano A - Ensino Médio",
  totalLocacoes: 12,
  atrasos: 1,
  status: "Ativo",
}

const mockRentals = [
  {
    id: "LOC001",
    livro: "Matemática - Volume 1",
    exemplar: "EX001",
    status: "Aberto",
    retirada: "15/01/2024",
    prevista: "29/01/2024",
    devolucao: "-",
  },
  {
    id: "LOC002",
    livro: "História do Brasil",
    exemplar: "EX045",
    status: "Finalizado",
    retirada: "02/01/2024",
    prevista: "16/01/2024",
    devolucao: "14/01/2024",
  },
  {
    id: "LOC003",
    livro: "Física Moderna",
    exemplar: "EX123",
    status: "Finalizado",
    retirada: "20/12/2023",
    prevista: "03/01/2024",
    devolucao: "28/12/2023",
  },
]

const rentalColumns = [
  { key: "id", label: "ID" },
  { key: "livro", label: "Livro" },
  { key: "exemplar", label: "Exemplar" },
  {
    key: "status",
    label: "Status",
    render: (value: string) => <StatusBadge status={value as any} />,
  },
  { key: "retirada", label: "Retirada" },
  { key: "prevista", label: "Prev. Devolução" },
  { key: "devolucao", label: "Devolução" },
]

export default function AlunoDetalhePage() {
  const renderRentalActions = (row: any) => (
    <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm">
          <BookOpen className="h-4 w-4" />
        </Button>
    </div>
  )

  return (
    <div className="flex h-screen bg-background">
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-foreground">{mockStudent.nome}</h2>
              <p className="text-muted-foreground">Matrícula: {mockStudent.matricula}</p>
            </div>
              <Button>
                <Edit className="h-4 w-4 mr-2" />
                Editar
              </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Student Info */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Informações Pessoais
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">CPF</Label>
                    <p className="text-foreground">{mockStudent.cpf}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Data de Nascimento</Label>
                    <p className="text-foreground">{mockStudent.nascimento}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Turma</Label>
                    <p className="text-foreground">{mockStudent.turma}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Status</Label>
                    <Badge variant="default" className="bg-primary text-primary-foreground">
                      {mockStudent.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Stats */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Estatísticas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total de Locações</span>
                    <span className="font-semibold text-foreground">{mockStudent.totalLocacoes}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Atrasos</span>
                    <span className="font-semibold text-destructive">{mockStudent.atrasos}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Rental History */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Histórico de Locações
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <TableSimple
                    columns={rentalColumns}
                    data={mockRentals.map((rental) => ({
                      ...rental,
                      status: <StatusBadge status={rental.status as any} />,
                    }))}
                    actions={renderRentalActions}
                    pagination={{
                      currentPage: 1,
                      totalPages: 2,
                      onPageChange: (page) => console.log("Page:", page),
                    }}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
