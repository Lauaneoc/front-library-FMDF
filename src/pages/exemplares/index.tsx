import { useState } from "react";
import { Plus, Edit, Eye, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { FiltersDrawer } from "../../components/filters-drawer";
import { TableSimple } from "../../components/table-simple";
import { EstadoBadge } from "../../components/estado-badge";
import { Badge } from "../../components/ui/badge";
import { ExemplaresProvider } from "../../@shared/contexts/exemplares/ExemplaresProvider";
import { useExemplares } from "../../@shared/contexts/exemplares/useExemplares";
import { ExemplarInterface } from "../../@shared/interfaces/exemplarInterface";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "../../components/ui/alert-dialog";
import { maskExemplarId } from "../../utils/masks";

const columns = [
  {
    key: "id",
    label: "ID",
    render: (value: string) => maskExemplarId(value),
  },
  { key: "livro", label: "Livro" },
  {
    key: "estado",
    label: "Estado",
  },
  { key: "bienio", label: "Biênio" },
  {
    key: "disponibilidade",
    label: "Disponibilidade",
  },
];

const filters = [
  { key: "livro", label: "Livro", type: "text" as const },
  {
    key: "estado",
    label: "Estado",
    type: "select" as const,
    options: [
      { value: "novo", label: "Novo" },
      { value: "regular", label: "Regular" },
      { value: "danificado", label: "Danificado" },
      { value: "perdido", label: "Perdido" },
    ],
  },
  {
    key: "disponibilidade",
    label: "Disponibilidade",
    type: "select" as const,
    options: [
      { value: "disponivel", label: "Disponível" },
      { value: "emprestado", label: "Emprestado" },
      { value: "indisponivel", label: "Indisponível" },
    ],
  },
];

export default function ExemplaresPage() {
  return (
    <ExemplaresProvider>
      <InnerExemplaresPage />
    </ExemplaresProvider>
  );
}

function InnerExemplaresPage() {
  const { exemplares, deleteOneExemplar, isPendingDeleteExemplar } =
    useExemplares();
  const [deleteExemplarId, setDeleteExemplarId] = useState<string | null>(null);

  const handleDeleteClick = (id: string) => {
    setDeleteExemplarId(id);
  };

  const handleConfirmDelete = async () => {
    console.log({deleteExemplarId})
    if (!deleteExemplarId) return;
    await deleteOneExemplar(deleteExemplarId);
    setDeleteExemplarId(null);
  };

  const renderActions = (row: any) => (
    <div className="flex items-center gap-2">
      <Link to={`/exemplares/${row.id}`}>
        <Button variant="ghost" size="sm">
          <Eye className="h-4 w-4" />
        </Button>
      </Link>
      <Link to={`/exemplares/${row.id}/editar`}>
        <Button variant="ghost" size="sm">
          <Edit className="h-4 w-4" />
        </Button>
      </Link>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleDeleteClick(row.id)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );

  const data =
    (exemplares as ExemplarInterface[] | null)?.map((e) => ({
      id: e.id,
      livro: e.nome_livro ?? e.isbn_livro,
      estado: <EstadoBadge estado={e.estado as any} />,
      bienio: `${e.ano_aquisicao} - ${e.ano_descarte}`,
      disponibilidade: <Badge variant="secondary">{e.disponibilidade}</Badge>,
    })) ?? [];

  return (
    <>
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-foreground">
                Gerenciar Exemplares
              </h2>
              <p className="text-muted-foreground">
                Visualize e gerencie todos os exemplares cadastrados no sistema
              </p>
            </div>
            <Link to="/exemplares/novo">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Novo Exemplar
              </Button>
            </Link>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Lista de Exemplares</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <FiltersDrawer filters={filters} />
                <TableSimple
                  columns={columns}
                  data={data}
                  actions={renderActions}
                  pagination={{
                    currentPage: 1,
                    totalPages: 3,
                    onPageChange: (page) => console.log("Page:", page),
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <AlertDialog
        open={deleteExemplarId !== null}
        onOpenChange={() => setDeleteExemplarId(null)}
      >
        <AlertDialogContent className="bg-white border border-border text-foreground">
          <AlertDialogTitle>Remover Livro</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja remover este livro? Esta ação não pode ser
            desfeita.
          </AlertDialogDescription>
          <div className="flex gap-3 justify-end">
            <AlertDialogCancel className="border-border hover:bg-muted">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              disabled={isPendingDeleteExemplar}
              className="bg-destructive border-border hover:bg-destructive/90 text-destructive-foreground"
            >
              {isPendingDeleteExemplar ? "Removendo..." : "Remover"}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
