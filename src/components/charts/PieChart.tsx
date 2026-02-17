'use client';
import { PieChart as RePieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function PieChart({ correct, incorrect }: { correct: number, incorrect: number }) {
    const data = [
        { name: 'SUCCESS', value: correct },
        { name: 'FAILURE', value: incorrect },
    ];
    const COLORS = ['#00f0ff', '#ff007a'];

    return (
        <ResponsiveContainer width="100%" height="100%">
            <RePieChart>
                <defs>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur in="SourceAlpha" stdDeviation="5" result="blur" />
                        <feOffset dx="0" dy="0" result="offsetblur" />
                        <feFlood floodColor="#00f0ff" floodOpacity="0.3" result="offsetColor" />
                        <feComposite in="offsetColor" in2="offsetblur" operator="in" result="glow" />
                        <feMerge>
                            <feMergeNode in="glow" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={100}
                    paddingAngle={10}
                    dataKey="value"
                    stroke="none"
                    animationBegin={200}
                    animationDuration={2000}
                >
                    {data.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                            style={{ filter: index === 0 ? 'url(#glow)' : 'none' }}
                        />
                    ))}
                </Pie>
                <Tooltip
                    contentStyle={{
                        backgroundColor: 'rgba(5, 5, 5, 0.9)',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        borderRadius: '20px',
                        backdropFilter: 'blur(20px)',
                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
                        padding: '16px'
                    }}
                />
                <Legend
                    verticalAlign="bottom"
                    height={36}
                    iconType="circle"
                    formatter={(value) => <span className="text-gray-600 font-black text-[10px] uppercase tracking-widest ml-2">{value}</span>}
                />
            </RePieChart>
        </ResponsiveContainer>
    );
}
