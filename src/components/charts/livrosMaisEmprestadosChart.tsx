import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export function LivrosMaisEmprestadosChart({
  data,
}: {
  data: { nome: string; emprestimos: number }[];
}) {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="text-lg font-semibold mb-4">Livros Mais Emprestados</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="nome" tick={{ fontSize: 10 }} interval={0} />
          <YAxis />
          <Tooltip />
          <Bar dataKey="emprestimos" fill="#7c3aed" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
