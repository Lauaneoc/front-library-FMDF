import { Save, User, Settings, Shield } from "lucide-react"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { FormField } from "../../components/form-field"
import { Separator } from "../../components/ui/separator"
import { Button } from "../../components/ui/button"
import { BibliotecarioProvider } from "../../@shared/contexts/bibliotecario/BibliotecarioProvider"
import { useBibliotecario } from "../../@shared/contexts/bibliotecario/useBibliotecario"

export default function ConfiguracoesPage() {
  return (
    <BibliotecarioProvider id={1}>
      <InnerConfiguracoesPage />
    </BibliotecarioProvider>
  )
}

function InnerConfiguracoesPage() {
  const { bibliotecario } = useBibliotecario()
  const [formData, setFormData] = useState({
    cpf: bibliotecario?.cpf || "",
    nome: bibliotecario?.nome || "",
    email: bibliotecario?.email || "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSavePerfil = () => {
    console.log("Salvando perfil:", formData)
    // TODO: chamar bibliotecarioService.update(bibliotecario?.id, formData)
  }

  return (
    <>
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-foreground">Configurações</h2>
              <p className="text-muted-foreground">Gerencie as configurações do sistema e seu perfil</p>
            </div>

            <Tabs defaultValue="perfil" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="perfil" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Perfil
                </TabsTrigger>
                <TabsTrigger value="sistema" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Sistema
                </TabsTrigger>
                <TabsTrigger value="seguranca" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Segurança
                </TabsTrigger>
              </TabsList>

              <TabsContent value="perfil">
                <Card>
                  <CardHeader>
                    <CardTitle>Perfil do Bibliotecário</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          id="id"
                          label="ID"
                          value={bibliotecario?.id?.toString() || ""}
                          disabled
                          description="Identificador único (somente leitura)"
                        />

                        <FormField
                          id="cpf"
                          label="CPF"
                          placeholder="000.000.000-00"
                          value={formData.cpf}
                          onChange={(value) => handleInputChange("cpf", value)}
                        />

                        <FormField
                          id="nome"
                          label="Nome Completo"
                          placeholder="Digite seu nome completo"
                          value={formData.nome}
                          onChange={(value) => handleInputChange("nome", value)}
                          required
                        />

                        <FormField
                          id="email"
                          label="Email"
                          type="email"
                          placeholder="seu.email@escola.com"
                          value={formData.email}
                          onChange={(value) => handleInputChange("email", value)}
                          required
                        />
                      </div>

                      <Separator />

                      <div className="flex justify-end">
                        <Button onClick={handleSavePerfil}>
                          <Save className="h-4 w-4 mr-2" />
                          Salvar Alterações
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="sistema">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Parâmetros do Sistema</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            id="prazo_padrao"
                            label="Prazo Padrão de Empréstimo (dias)"
                            placeholder="14"
                            value="14"
                            description="Número de dias padrão para devolução"
                          />

                          <FormField
                            id="limite_aluno"
                            label="Limite de Livros por Aluno"
                            placeholder="3"
                            value="3"
                            description="Máximo de livros que um aluno pode emprestar"
                          />

                          <FormField
                            id="renovacao_max"
                            label="Máximo de Renovações"
                            placeholder="2"
                            value="2"
                            description="Quantas vezes um empréstimo pode ser renovado"
                          />

                          <FormField
                            id="multa_diaria"
                            label="Multa Diária (R$)"
                            placeholder="0.50"
                            value="0.50"
                            description="Valor da multa por dia de atraso"
                          />
                        </div>

                        <Separator />

                        <div className="space-y-4">
                          <h4 className="text-lg font-semibold">Notificações</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              id="aviso_devolucao"
                              label="Aviso de Devolução (dias antes)"
                              placeholder="3"
                              value="3"
                              description="Quantos dias antes avisar sobre a devolução"
                            />

                            <FormField
                              id="email_bibliotecario"
                              label="Email para Notificações"
                              type="email"
                              placeholder="notificacoes@escola.com"
                              value="notificacoes@escola.com"
                            />
                          </div>
                        </div>

                        <Separator />

                        <div className="flex justify-end">
                          <Button>
                            <Save className="h-4 w-4 mr-2" />
                            Salvar Configurações
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="seguranca">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Alterar Senha</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form className="space-y-6">
                        <FormField
                          id="senha_atual"
                          label="Senha Atual"
                          type="password"
                          placeholder="Digite sua senha atual"
                          required
                        />

                        <FormField
                          id="nova_senha"
                          label="Nova Senha"
                          type="password"
                          placeholder="Digite a nova senha"
                          required
                        />

                        <FormField
                          id="confirmar_senha"
                          label="Confirmar Nova Senha"
                          type="password"
                          placeholder="Confirme a nova senha"
                          required
                        />

                        <Separator />

                        <div className="flex justify-end">
                          <Button>
                            <Save className="h-4 w-4 mr-2" />
                            Alterar Senha
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Sessões Ativas</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <p className="font-medium">Sessão Atual</p>
                            <p className="text-sm text-muted-foreground">Chrome no Windows • IP: 192.168.1.100</p>
                            <p className="text-xs text-muted-foreground">Ativo agora</p>
                          </div>
                          <Button variant="outline" size="sm" disabled>
                            Sessão Atual
                          </Button>
                        </div>

                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <p className="font-medium">Biblioteca - Computador 2</p>
                            <p className="text-sm text-muted-foreground">Firefox no Windows • IP: 192.168.1.102</p>
                            <p className="text-xs text-muted-foreground">Há 2 horas</p>
                          </div>
                          <Button variant="outline" size="sm">
                            Encerrar
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
    </>
  )
}
