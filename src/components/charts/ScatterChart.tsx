'use client';
import { ScatterChart as ReScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ZAxis } from 'recharts';

export default function ScatterChart({ data }: { data: { question: string, time: number, isCorrect: boolean }[] }) {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <ReScatterChart margin={{ top: 20, right: 20, bottom: 0, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis
                    dataKey="question"
                    type="category"
                    stroke="#ffffff20"
                    allowDuplicatedCategory={false}
                    tick={{ fill: '#ffffff40', fontSize: 10, fontWeight: 900 }}
                    axisLine={false}
                    tickLine={false}
                />
                <YAxis
                    dataKey="time"
                    type="number"
                    stroke="#ffffff20"
                    name="Time"
                    unit="s"
                    tick={{ fill: '#ffffff40', fontSize: 10, fontWeight: 900 }}
                    axisLine={false}
                    tickLine={false}
                />
                <ZAxis type="number" range={[200, 600]} />
                <Tooltip
                    cursor={{ strokeDasharray: '3 3', stroke: '#ffffff10' }}
                    contentStyle={{
                        backgroundColor: 'rgba(5, 5, 5, 0.9)',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        borderRadius: '20px',
                        backdropFilter: 'blur(20px)',
                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
                        padding: '16px'
                    }}
                />
                <Scatter name="Performance" data={data} animationDuration={2000}>
                    {data.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={entry.isCorrect ? '#00f0ff' : '#ff007a'}
                            stroke={entry.isCorrect ? '#00f0ff40' : '#ff007a40'}
                            strokeWidth={15}
                        />
                    ))}
                </Scatter>
            </ReScatterChart>
        </ResponsiveContainer>
    );
}
