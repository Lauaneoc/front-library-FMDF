import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./pages/auth/login";
import { DefaultLayout } from "./components/default-layout";
import DashboardPage from "./pages/dashboard";

/* TURMAS */
import TurmasPage from "./pages/turmas";
import NovaTurmaPage from "./pages/turmas/new";
import VerTurmaPage from "./pages/turmas/view";
import EditarTurmaPage from "./pages/turmas/update";

/* RELATÓRIOS */
import RelatoriosPage from "./pages/relatorios";

/* LOCAÇÕES */
import LocacoesPage from "./pages/locacoes";
import LocacaoDetalhesPage from "./pages/locacoes/view";
import EditarLocacaoPage from "./pages/locacoes/update";

/* EXEMPLARES */
import ExemplaresPage from "./pages/exemplares";
import ExemplarPage from "./pages/exemplares/id";
import NovoExemplarPage from "./pages/exemplares/novo";
import EditarExemplarPage from "./pages/exemplares/editar";

/* LIVROS */
import LivrosPage from "./pages/livros";
import NovoLivroPage from "./pages/livros/novo";
import LivroIsbnPage from "./pages/livros/isbn";
import EditarLivroPage from "./pages/livros/update";

/* ALUNOS */
import AlunosPage from "./pages/alunos/page";
import NovoAlunoPage from "./pages/alunos/novo";
import AlunoDetalhePage from "./pages/alunos/[id]/page";
import EditAlunoPage from "./pages/alunos/[matricula]/editar";

/* CONFIG */
import ConfiguracoesPage from "./pages/configuracoes";

export function RoutesPage() {
  return (
    <BrowserRouter>
      <Routes>
        {/* LOGIN */}
        <Route path="/login" element={<LoginPage />} />

        {/* LAYOUT */}
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />

          {/* DASHBOARD */}
          <Route path="dashboard" element={<DashboardPage />} />

          {/* ALUNOS */}
          <Route path="alunos" element={<AlunosPage />} />
          <Route path="alunos/novo" element={<NovoAlunoPage />} />
          <Route path="alunos/:matricula" element={<AlunoDetalhePage />} />
          <Route path="alunos/:matricula/editar" element={<EditAlunoPage />} />

          {/* TURMAS */}
          <Route path="turmas" element={<TurmasPage />} />
          <Route path="turmas/nova" element={<NovaTurmaPage />} />
          <Route path="turmas/:id" element={<VerTurmaPage />} />
          <Route path="turmas/:id/editar" element={<EditarTurmaPage />} />

          {/* LIVROS */}
          <Route path="livros" element={<LivrosPage />} />
          <Route path="livros/novo" element={<NovoLivroPage />} />
          <Route path="livros/:isbn" element={<LivroIsbnPage />} />
          <Route path="livros/:isbn/editar" element={<EditarLivroPage />} />

          {/* EXEMPLARES */}
          <Route path="exemplares" element={<ExemplaresPage />} />
          <Route path="exemplares/novo" element={<NovoExemplarPage />} />
          <Route path="exemplares/:id" element={<ExemplarPage />} />
          <Route path="exemplares/:id/editar" element={<EditarExemplarPage />} />

          {/* LOCAÇÕES */}
          <Route path="locacoes" element={<LocacoesPage />} />
          <Route path="locacoes/:id" element={<LocacaoDetalhesPage />} />
          <Route path="locacoes/:id/editar" element={<EditarLocacaoPage />} />

          {/* RELATÓRIOS */}
          <Route path="relatorios" element={<RelatoriosPage />} />

          {/* CONFIG */}
          <Route path="configuracoes" element={<ConfiguracoesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
