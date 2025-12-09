"use client";

import { useState } from "react";
import { useLocacoes } from "../@shared/contexts/locacoes/useLocacoes";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { ChevronLeft, ChevronRight, User, BookOpen, Calendar } from "lucide-react";

interface WizardDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
}

export function WizardDialog({ isOpen, onClose, title, description }: WizardDialogProps) {
  const { alunos, exemplares, createLocacao } = useLocacoes();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedCopy, setSelectedCopy] = useState<number | null>(null);
  const [returnDate, setReturnDate] = useState("");
  const [observacao, setObservacao] = useState("");

  const steps = [
    { id: 1, title: "Selecionar Aluno", icon: User, description: "Escolha o aluno que fará a locação" },
    { id: 2, title: "Selecionar Exemplar", icon: BookOpen, description: "Escolha o exemplar a ser emprestado" },
    { id: 3, title: "Definir Datas", icon: Calendar, description: "Configure as datas da locação" },
  ];

  const handleNext = () => currentStep < 3 && setCurrentStep(currentStep + 1);
  const handlePrevious = () => currentStep > 1 && setCurrentStep(currentStep - 1);

  // Função para formatar datas para MySQL DATETIME
  const formatDateTime = (date: string | Date) => {
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toISOString().slice(0, 19).replace("T", " ");
  };

  const handleFinish = async () => {
    if (!selectedStudent || !selectedCopy || !returnDate) return;

    // Substitua pelo ID do bibliotecário logado, se houver
    const id_bibliotecario = 1;

    try {
      await createLocacao({
        id_bibliotecario,
        matricula_aluno: selectedStudent,
        id_exemplar: selectedCopy,
        data_emprestimo: formatDateTime(new Date()),  // data atual formatada
        data_prevista: formatDateTime(returnDate),    // data de devolução formatada
        descricao: observacao,
        status: "Aberto",
      });

      onClose();
      setCurrentStep(1);
      setSelectedStudent("");
      setSelectedCopy(null);
      setReturnDate("");
      setObservacao("");
    } catch (error) {
      console.error("Erro ao criar locação:", error);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <Input label="Buscar Aluno" placeholder="Digite o nome ou matrícula do aluno" />
            <Label>Alunos Encontrados</Label>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {alunos?.map((student) => (
                <Card
                  key={student.matricula}
                  className={`cursor-pointer transition-colors ${
                    selectedStudent === student.matricula ? "bg-primary/10 border-primary" : "hover:bg-muted"
                  }`}
                  onClick={() => setSelectedStudent(student.matricula)}
                >
                  <CardContent className="p-3 flex justify-between items-center">
                    <div>
                      <p className="font-medium">{student.nome}</p>
                      <p className="text-sm text-muted-foreground">
                        Matrícula: {student.matricula} • Turma: {student.id_turma}
                      </p>
                    </div>
                    {selectedStudent === student.matricula && <Badge variant="default">Selecionado</Badge>}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <Input label="Buscar Exemplar" placeholder="Digite o nome do livro ou ID do exemplar" />
            <Label>Exemplares Disponíveis</Label>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {exemplares?.map((copy) => (
                <Card
                  key={copy.id}
                  className={`cursor-pointer transition-colors ${
                    copy.disponibilidade === "Indisponível"
                      ? "opacity-50 cursor-not-allowed"
                      : selectedCopy === copy.id
                      ? "bg-primary/10 border-primary"
                      : "hover:bg-muted"
                  }`}
                  onClick={() => copy.disponibilidade !== "Indisponível" && setSelectedCopy(copy.id)}
                >
                  <CardContent className="p-3 flex justify-between items-center">
                    <div>
                      <p className="font-medium">{copy.nome_livro}</p>
                      <p className="text-sm text-muted-foreground">
                        ID: EX{String(copy.id).padStart(3, "0")} • Estado: {copy.estado}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {copy.disponibilidade === "Indisponível" && <Badge variant="destructive">Indisponível</Badge>}
                      {selectedCopy === copy.id && <Badge variant="default">Selecionado</Badge>}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input label="Data de Retirada" type="date" value={new Date().toISOString().split("T")[0]} disabled />
              <Input
                label="Data Prevista de Devolução"
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
            <Input
              label="Descrição (Opcional)"
              placeholder="Observações sobre a locação"
              value={observacao}
              onChange={(e) => setObservacao(e.target.value)}
            />

            <div className="mt-6 p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">Resumo da Locação</h4>
              <div className="space-y-1 text-sm">
                <p>
                  <strong>Aluno:</strong>{" "}
                  {selectedStudent ? alunos?.find((s) => s.matricula === selectedStudent)?.nome : "Não selecionado"}
                </p>
                <p>
                  <strong>Exemplar:</strong>{" "}
                  {selectedCopy ? exemplares?.find((c) => c.id === selectedCopy)?.nome_livro : "Não selecionado"}
                </p>
                <p>
                  <strong>Devolução prevista:</strong> {returnDate || "Não definida"}
                </p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {/* Steps indicator */}
        <div className="flex items-center justify-between mb-6">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                  currentStep >= step.id
                    ? "bg-primary border-primary text-primary-foreground"
                    : "border-muted-foreground text-muted-foreground"
                }`}
              >
                <step.icon className="w-4 h-4" />
              </div>
              <div className="ml-2">
                <p className={`text-sm font-medium ${currentStep >= step.id ? "text-foreground" : "text-muted-foreground"}`}>
                  {step.title}
                </p>
              </div>
              {index < steps.length - 1 && <div className={`w-12 h-px mx-4 ${currentStep > step.id ? "bg-primary" : "bg-muted"}`} />}
            </div>
          ))}
        </div>

        <div className="min-h-[300px]">{renderStepContent()}</div>

        <DialogFooter>
          <div className="flex justify-between w-full">
            <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
              <ChevronLeft className="w-4 h-4 mr-2" />
              Anterior
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              {currentStep < 3 ? (
                <Button
                  onClick={handleNext}
                  disabled={(currentStep === 1 && !selectedStudent) || (currentStep === 2 && !selectedCopy)}
                >
                  Próximo
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={handleFinish} disabled={!selectedStudent || !selectedCopy || !returnDate}>
                  Finalizar Locação
                </Button>
              )}
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
