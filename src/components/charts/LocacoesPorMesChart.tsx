import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

type MesItem = {
  mes: string;  // "2025-01"
  total: number;
};

export type LocacoesPorMesData = {
  ano: number;
  meses: MesItem[];
};

export function LocacoesPorMesChart({ data }: { data: LocacoesPorMesData }) {

  const mesesFormatados = data.meses.map((item) => ({
    name: new Date(item.mes).toLocaleString("pt-BR", { month: "short" }),
    total: item.total
  }));

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="text-lg font-semibold mb-4">Locações por Mês</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={mesesFormatados}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" /> 
          <YAxis />
          <Tooltip />
          <Line 
            type="monotone" 
            dataKey="total" 
            stroke="#2563eb" 
            strokeWidth={3} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
