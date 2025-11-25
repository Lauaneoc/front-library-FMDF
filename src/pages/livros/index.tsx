import { Plus, Edit, Eye, Trash2 } from "lucide-react"
import { Link } from "react-router-dom"
import { useMemo, useState } from "react"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { FiltersDrawer } from "../../components/filters-drawer"
import { TableSimple } from "../../components/table-simple"
import { Badge } from "../../components/ui/badge"
import { LivrosProvider } from "../../@shared/contexts/livros/LivrosProvider"
import { useLivros } from "../../@shared/contexts/livros/useLivros"
import { ExemplaresProvider } from "../../@shared/contexts/exemplares/ExemplaresProvider"
import { useExemplares } from "../../@shared/contexts/exemplares/useExemplares"
import { LivroInterface } from "../../@shared/interfaces/livroInterface"
import { ExemplarInterface } from "../../@shared/interfaces/exemplarInterface"
import { livroService } from "../../@shared/services/livroService"
import { queryClient } from "../../@shared/api/queryClient"
import { useToast } from "../../hooks/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "../../components/ui/alert-dialog"

const columns = [
  { key: "isbn", label: "ISBN" },
  { key: "nome", label: "Nome" },
  { key: "disciplina", label: "Disciplina" },
  { key: "serie", label: "Série" },
  {
    key: "exemplares",
    label: "Exemplares (Disp./Total)",
    className: "text-center",
  },
]

const filters = [
  { key: "nome", label: "Nome", type: "text" as const },
  {
    key: "disciplina",
    label: "Disciplina",
    type: "select" as const,
    options: [
      { value: "Matemática", label: "Matemática" },
      { value: "Português", label: "Português" },
      { value: "História", label: "História" },
      { value: "Geografia", label: "Geografia" },
      { value: "Física", label: "Física" },
      { value: "Química", label: "Química" },
      { value: "Biologia", label: "Biologia" },
    ],
  },
  {
    key: "serie",
    label: "Série",
    type: "select" as const,
    options: [
      { value: "1º Ano", label: "1º Ano" },
      { value: "2º Ano", label: "2º Ano" },
      { value: "3º Ano", label: "3º Ano" },
      { value: "4º Ano", label: "4º Ano" },
    ],
  },
]

export default function LivrosPage() {
  return (
    <ExemplaresProvider>
      <LivrosProvider>
        <InnerLivrosPage />
      </LivrosProvider>
    </ExemplaresProvider>
  )
}

function InnerLivrosPage() {
  const { livros } = useLivros()
  const { exemplares } = useExemplares()
  const { toast } = useToast()
  const [deleteIsbn, setDeleteIsbn] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({})

  const handleDeleteClick = (isbn: string) => {
    setDeleteIsbn(isbn)
  }

  const handleConfirmDelete = async () => {
    if (!deleteIsbn) return
    setDeleting(true)
    try {
      await livroService.remove(deleteIsbn)
      await queryClient.invalidateQueries({ queryKey: ["livros"] })
      toast({
        title: "Sucesso",
        description: "Livro removido com sucesso",
      })
      setDeleteIsbn(null)
    } catch (err: any) {
      toast({
        title: "Erro",
        description: err.response?.data?.message || "Erro ao remover livro",
        variant: "destructive",
      })
    } finally {
      setDeleting(false)
    }
  }

  const counts = useMemo(() => {
    const map = new Map<string, { total: number }>();
    ;(exemplares ?? []).forEach((ex: ExemplarInterface) => {
      const isbn = ex.isbn_livro
      const prev = map.get(isbn) ?? { total: 0 }
      prev.total += 1
      map.set(isbn, prev)
    })
    return map
  }, [exemplares])

  const data = (livros as LivroInterface[] | null)?.map((l) => {
    const c = counts.get(l.isbn) ?? { total: 0 }
    const exemplaresText = `${c.total}`
    return {
      isbn: l.isbn,
      nome: l.nome,
      disciplina: l.disciplina,
      serie: l.serie,
      exemplares: (
        <div className="flex items-center justify-center gap-2">
          <span>{exemplaresText}</span>
          <Badge variant={c.total > 0 ? "default" : "destructive"} className={c.total > 0 ? "bg-primary text-primary-foreground" : ""}>
            {c.total > 0 ? "Tem exemplares" : "Sem exemplares"}
          </Badge>
        </div>
      ),
    }
  }) ?? []

  const renderActions = (row: any) => (
    <div className="flex items-center gap-2">
      <Link to={`/livros/${row.isbn}`}>
        <Button variant="ghost" size="sm">
          <Eye className="h-4 w-4" />
        </Button>
      </Link>
      <Link to={`/livros/${row.isbn}/editar`}>
        <Button variant="ghost" size="sm">
          <Edit className="h-4 w-4" />
        </Button>
      </Link>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleDeleteClick(row.isbn)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )

  const handleFiltersChange = (filters: Record<string, string>) => {
    setActiveFilters(filters)
  }

  const normalize = (value: string) =>
    value
      .toString()
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .toLowerCase()

  const filteredData = useMemo(() => {
    return data.filter((row: any) => {
      if (activeFilters.nome && !row.nome.toLowerCase().includes(activeFilters.nome.toLowerCase())) {
        return false
      }

      if (activeFilters.disciplina && activeFilters.disciplina !== "all") {
        const rowVal = row.disciplina ? normalize(row.disciplina) : ""
        const filterVal = normalize(activeFilters.disciplina)
        if (!rowVal.includes(filterVal)) return false
      }

      if (activeFilters.serie && activeFilters.serie !== "all") {
        const rowVal = row.serie ? normalize(row.serie) : ""
        const filterVal = normalize(activeFilters.serie)
        if (!rowVal.includes(filterVal)) return false
      }

      return true
    })
  }, [data, activeFilters])

  return (
    <>
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-foreground">Gerenciar Livros</h2>
              <p className="text-muted-foreground">Visualize e gerencie todos os livros cadastrados no sistema</p>
            </div>
            <Link to="/livros/novo">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Novo Livro
              </Button>
            </Link>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Lista de Livros</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <FiltersDrawer filters={filters} onFiltersChange={handleFiltersChange} />
                <TableSimple
                  columns={columns}
                  data={filteredData}
                  actions={renderActions}
                  pagination={{
                    currentPage: 1,
                    totalPages: 2,
                    onPageChange: (page) => console.log("Page:", page),
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <AlertDialog open={deleteIsbn !== null} onOpenChange={() => setDeleteIsbn(null)}>
        <AlertDialogContent className="bg-[#242424] border border-border">
          <AlertDialogTitle>Remover Livro</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja remover este livro? Esta ação não pode ser desfeita.
          </AlertDialogDescription>
          <div className="flex gap-3 justify-end">
            <AlertDialogCancel className="border-border hover:bg-muted">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              disabled={deleting}
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
            >
              {deleting ? "Removendo..." : "Remover"}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
