"use client";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Card } from "../../../components/ui/card";
import { useUpdateExemplar } from "./useUpdateExemplar";
import { ExemplaresProvider } from "../../../@shared/contexts/exemplares/ExemplaresProvider";
import { Controller } from "react-hook-form";

function Page() {
  const { id } = useParams();

  const {
    onSubmit,
    register,
    control,
    isLoadingExemplar,
    isPendingUpdateExemplar,
    errors,
  } = useUpdateExemplar(id ?? "");
  const navigate = useNavigate();

  if (isLoadingExemplar) return <div>Carregando...</div>;

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/exemplares")}
          className="hover:bg-muted"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            Editar Exemplar
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Atualize os dados do exemplar
          </p>
        </div>
      </div>

      <Card className="p-6 md:p-8 bg-card border border-border max-w-2xl">
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* ISBN */}
            <div className="space-y-2">
              <Input
                id="isbn_livro"
                placeholder="978-85-16-07234-5"
                label="ISBN *"
                {...register("isbn_livro")}
                className="bg-input border-border"
                error={errors.isbn_livro?.message}
              />
            </div>

            {/* Estado */}
            <div className="space-y-2">
              <Controller
                name="estado"
                control={control}
                rules={{ required: "Estado é obrigatória" }}
                render={({ field, fieldState }) => (
                  <div className="space-y-2">
                    <Label
                      htmlFor="estado"
                      className="text-foreground font-medium"
                    >
                      Estado *
                    </Label>

                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      key={field.value ?? "estado-empty"}
                    >
                      <SelectTrigger
                        className="bg-input border-border"
                        id="estado"
                      >
                        <SelectValue placeholder="Selecione o estado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Novo">Novo</SelectItem>
                        <SelectItem value="Regular">Regular</SelectItem>
                        <SelectItem value="Danificado">Danificado</SelectItem>
                        <SelectItem value="Perdido">Perdido</SelectItem>
                      </SelectContent>
                    </Select>

                    {fieldState.error && (
                      <p className="text-xs text-destructive">
                        {fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>

            {/* Ano de Aquisição */}
            <div className="space-y-2">
              <Input
                id="ano_aquisicao"
                placeholder={new Date().getFullYear().toString()}
                label="Ano de Aquisição *"
                {...register("ano_aquisicao")}
                className="bg-input border-border"
                error={errors.ano_aquisicao?.message}
              />
            </div>

            {/* Ano de Descarte */}
            <div className="space-y-2">
              <Input
                id="ano_descarte"
                placeholder={(new Date().getFullYear() + 2).toString()}
                label="Ano de Descarte *"
                {...register("ano_descarte")}
                className="bg-input border-border"
                error={errors.ano_descarte?.message}
              />
            </div>
          </div>

          {/* Botões */}
          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
            >
              {isPendingUpdateExemplar ? "Salvando..." : "Salvar"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/exemplares")}
              className="border-border hover:bg-muted"
            >
              Cancelar
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default function EditarExemplarPage() {
  return (
    <ExemplaresProvider>
      <Page />
    </ExemplaresProvider>
  );
}
