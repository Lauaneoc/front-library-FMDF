"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"
import { ChevronLeft, ChevronRight, User, BookOpen, Calendar } from "lucide-react"

interface WizardDialogProps {
  isOpen: boolean
  onClose: () => void
  title: string
  description: string
}

const mockStudents = [
  { matricula: "2024001", nome: "Ana Silva Santos", turma: "1º Ano A" },
  { matricula: "2024002", nome: "Carlos Eduardo Lima", turma: "2º Ano B" },
  { matricula: "2024003", nome: "Maria Fernanda Costa", turma: "3º Ano A" },
]

const mockCopies = [
  { id: "EX001", livro: "Matemática - Volume 1", estado: "Novo", disponivel: true },
  { id: "EX002", livro: "História do Brasil", estado: "Regular", disponivel: true },
  { id: "EX003", livro: "Física Moderna", estado: "Regular", disponivel: false },
]

export function WizardDialog({ isOpen, onClose, title, description }: WizardDialogProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedStudent, setSelectedStudent] = useState("")
  const [selectedCopy, setSelectedCopy] = useState("")
  const [returnDate, setReturnDate] = useState("")

  const steps = [
    {
      id: 1,
      title: "Selecionar Aluno",
      icon: User,
      description: "Escolha o aluno que fará a locação",
    },
    {
      id: 2,
      title: "Selecionar Exemplar",
      icon: BookOpen,
      description: "Escolha o exemplar a ser emprestado",
    },
    {
      id: 3,
      title: "Definir Datas",
      icon: Calendar,
      description: "Configure as datas da locação",
    },
  ]

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleFinish = () => {
    // Here would be the logic to create the rental
    console.log("Creating rental:", { selectedStudent, selectedCopy, returnDate })
    onClose()
    setCurrentStep(1)
    setSelectedStudent("")
    setSelectedCopy("")
    setReturnDate("")
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Buscar Aluno</Label>
              <Input placeholder="Digite o nome ou matrícula do aluno" />
            </div>
            <div className="space-y-2">
              <Label>Alunos Encontrados</Label>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {mockStudents.map((student) => (
                  <Card
                    key={student.matricula}
                    className={`cursor-pointer transition-colors ${
                      selectedStudent === student.matricula ? "bg-primary/10 border-primary" : "hover:bg-muted"
                    }`}
                    onClick={() => setSelectedStudent(student.matricula)}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{student.nome}</p>
                          <p className="text-sm text-muted-foreground">
                            Matrícula: {student.matricula} • {student.turma}
                          </p>
                        </div>
                        {selectedStudent === student.matricula && <Badge variant="default">Selecionado</Badge>}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Buscar Exemplar</Label>
              <Input placeholder="Digite o nome do livro ou ID do exemplar" />
            </div>
            <div className="space-y-2">
              <Label>Exemplares Disponíveis</Label>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {mockCopies.map((copy) => (
                  <Card
                    key={copy.id}
                    className={`cursor-pointer transition-colors ${
                      !copy.disponivel
                        ? "opacity-50 cursor-not-allowed"
                        : selectedCopy === copy.id
                          ? "bg-primary/10 border-primary"
                          : "hover:bg-muted"
                    }`}
                    onClick={() => copy.disponivel && setSelectedCopy(copy.id)}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{copy.livro}</p>
                          <p className="text-sm text-muted-foreground">
                            ID: {copy.id} • Estado: {copy.estado}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {!copy.disponivel && <Badge variant="destructive">Indisponível</Badge>}
                          {selectedCopy === copy.id && <Badge variant="default">Selecionado</Badge>}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Data de Retirada</Label>
                <Input type="date" value={new Date().toISOString().split("T")[0]} disabled />
                <p className="text-xs text-muted-foreground">Data atual (automática)</p>
              </div>
              <div className="space-y-2">
                <Label>Data Prevista de Devolução</Label>
                <Input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Descrição (Opcional)</Label>
              <Input placeholder="Observações sobre a locação" />
            </div>

            {/* Summary */}
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">Resumo da Locação</h4>
              <div className="space-y-1 text-sm">
                <p>
                  <strong>Aluno:</strong>{" "}
                  {selectedStudent
                    ? mockStudents.find((s) => s.matricula === selectedStudent)?.nome
                    : "Não selecionado"}
                </p>
                <p>
                  <strong>Exemplar:</strong>{" "}
                  {selectedCopy ? mockCopies.find((c) => c.id === selectedCopy)?.livro : "Não selecionado"}
                </p>
                <p>
                  <strong>Devolução prevista:</strong> {returnDate || "Não definida"}
                </p>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

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
                <p
                  className={`text-sm font-medium ${currentStep >= step.id ? "text-foreground" : "text-muted-foreground"}`}
                >
                  {step.title}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-12 h-px mx-4 ${currentStep > step.id ? "bg-primary" : "bg-muted"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step content */}
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
  )
}
