"use client";
import { ArrowLeft } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Card } from "../../../components/ui/card";
import { useParams } from "react-router-dom";
import { useUpdateTurma } from "./useUpdateTurma";
import { TurmasProvider } from "../../../@shared/contexts/turmas/TurmasProvider";

function Page() {
  const { id } = useParams<{ id: string }>();

  const {
    onSubmit,
    register,
    loading,
    navigate,
    isLoadingTurma
  } = useUpdateTurma(Number(id));

  if (isLoadingTurma) return <p>Carregando...</p>;

  return (
    <div className="p-6 space-y-6">
      <Button variant="ghost" onClick={() => navigate("/turmas")}>
        <ArrowLeft className="h-4 w-4" /> Voltar
      </Button>

      <Card className="p-6 max-w-xl">
        <form onSubmit={onSubmit} className="space-y-4">
          <Input label="Curso" {...register("curso")} />
          <Input label="Série" {...register("serie")} />
          <Input label="Ano Letivo" type="number" {...register("ano_letivo")} />

          <Button type="submit" disabled={loading}>
            {loading ? "Salvando..." : "Salvar"}
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default function EditarTurmaPage() {
  return (
    <TurmasProvider>
      <Page />
    </TurmasProvider>
  );
}
