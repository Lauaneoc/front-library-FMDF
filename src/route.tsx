import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./pages/auth/login";
import { DefaultLayout } from "./components/default-layout";
import DashboardPage from "./pages/dashboard";
import TurmasPage from "./pages/turmas";
import NovaTurmaPage from "./pages/turmas/nova";
import RelatoriosPage from "./pages/relatorios";
import LocacoesPage from "./pages/locacoes";
import LocacaoDetalhesPage from "./pages/locacoes/id";
import ExemplaresPage from "./pages/exemplares";
import LivrosPage from "./pages/livros";
import NovoLivroPage from "./pages/livros/novo";
import LivroIsbnPage from "./pages/livros/isbn";
import EditarLivroPage from "./pages/livros/update";
import ConfiguracoesPage from "./pages/configuracoes";
import AlunosPage from "./pages/alunos/page";
import NovoAlunoPage from "./pages/alunos/novo";
import EditAlunoPage from "./pages/alunos/[matricula]/editar";
import AlunoDetalhePage from "./pages/alunos/[id]/page";

export function RoutesPage() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<DefaultLayout />}>
            {/* Rota raiz redireciona para o dashboard */}
            <Route index element={<Navigate to="/dashboard" replace />} />
            
            {/* Dashboard */}
            <Route path="dashboard" element={<DashboardPage />} />

            {/* Alunos */}
            <Route path="alunos" element={<AlunosPage />} />
            <Route path="alunos/novo" element={<NovoAlunoPage />} />
            <Route path="alunos/:matricula" element={<AlunoDetalhePage />} />
            <Route path="alunos/:matricula/editar" element={<EditAlunoPage />} />
            
            {/* Turmas */}
            <Route path="turmas" element={<TurmasPage />} />
            <Route path="turmas/nova" element={<NovaTurmaPage />} />
            
            {/* Livros */}
            <Route path="livros" element={<LivrosPage />} />
            <Route path="livros/novo" element={<NovoLivroPage />} />
            <Route path="livros/:isbn" element={<LivroIsbnPage />} />
            <Route path="livros/:isbn/editar" element={<EditarLivroPage />} />
            
            {/* Exemplares */}
            <Route path="exemplares" element={<ExemplaresPage />} />
            
            {/* Locações */}
            <Route path="locacoes" element={<LocacoesPage />} />
            <Route path="locacoes/:id" element={<LocacaoDetalhesPage />} />
            
            {/* Relatórios */}
            <Route path="relatorios" element={<RelatoriosPage />} />
            
            {/* Configurações */}
            <Route path="configuracoes" element={<ConfiguracoesPage />} />
          </Route>
        </Routes>
    </BrowserRouter>
  );
}
