import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", orders: 120 },
  { month: "Feb", orders: 150 },
  { month: "Mar", orders: 180 },
  { month: "Apr", orders: 140 },
  { month: "May", orders: 200 },
  { month: "Jun", orders: 240 },
];

function Charts() {
  return (
    <div className="card">

      <h2 style={{ marginBottom: 20 }}>
        Monthly Orders
      </h2>

      <ResponsiveContainer
        width="100%"
        height={350}
      >
        <BarChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="orders"
            fill="#2563eb"
          />

        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}

export default Charts;