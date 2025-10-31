import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth/login";
import { DefaultLayout } from "./components/default-layout";
import TurmasPage from "./pages/turmas";
import NovaTurmaPage from "./pages/turmas/nova";
import RelatoriosPage from "./pages/relatorios";

export function RoutesPage() {
  return (
    <BrowserRouter>
        <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<DefaultLayout />}>
            <Route path="turmas" element={<TurmasPage />} />
            <Route path="turmas/nova" element={<NovaTurmaPage />} />

            <Route path="relatorios" element={<RelatoriosPage />} />
        </Route>
        </Routes>
    </BrowserRouter>
  );
}
