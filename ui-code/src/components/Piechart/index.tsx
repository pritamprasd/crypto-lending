import { PieChart, Pie, Cell } from "recharts";

const data = [
    { name: "Stable coin 1", value: 400 },
    { name: "Stable coin 2", value: 300 },
    { name: "Stable coin 3", value: 300 },
];

const COLORS = ["#F8D08C", "#E98624", "#662200"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
}: any) => {
    // eslint-disable-next-line
    const radius = 25 + innerRadius + (outerRadius - innerRadius);
    // eslint-disable-next-line
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    // eslint-disable-next-line
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <>
            <text
                x={x}
                y={y}
                fill="black"
                textAnchor={x > cx ? "start" : "end"}
                dominantBaseline="central"
            >
                {percent * 100}% { data[index].name}
            </text>
        </>
    );
};
export default function App() {
    return (
        <PieChart height={450} width={450}>
            <Pie
                data={data}
                cx={225}
                cy={225}
                labelLine={true}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
            >
                {data.map((entry, index) => (
                    <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                    />
                ))}
            </Pie>
        </PieChart>
    );
}
