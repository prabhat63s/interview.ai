'use client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function TimeChart({ times }: { times: number[] }) {
    const data = times.map((t, i) => ({ name: `Q${i + 1}`, time: parseFloat(t.toFixed(1)) }));

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00f0ff" stopOpacity={0.8} />
                        <stop offset="100%" stopColor="#bf00ff" stopOpacity={0.2} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis
                    dataKey="name"
                    stroke="#ffffff20"
                    tick={{ fill: '#ffffff40', fontSize: 10, fontWeight: 900 }}
                    axisLine={false}
                    tickLine={false}
                />
                <YAxis
                    stroke="#ffffff20"
                    tick={{ fill: '#ffffff40', fontSize: 10, fontWeight: 900 }}
                    axisLine={false}
                    tickLine={false}
                />
                <Tooltip
                    cursor={{ fill: '#ffffff03' }}
                    contentStyle={{
                        backgroundColor: 'rgba(5, 5, 5, 0.9)',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        borderRadius: '20px',
                        backdropFilter: 'blur(20px)',
                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
                        padding: '16px'
                    }}
                    itemStyle={{ color: '#00f0ff', fontWeight: '900', fontSize: '12px', textTransform: 'uppercase' }}
                />
                <Bar
                    dataKey="time"
                    fill="url(#barGradient)"
                    radius={[8, 8, 0, 0]}
                    name="LATENCY"
                    animationDuration={2000}
                />
            </BarChart>
        </ResponsiveContainer>
    );
}
