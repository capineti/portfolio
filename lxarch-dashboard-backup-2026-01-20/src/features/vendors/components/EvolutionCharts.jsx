import React, { useState, useMemo } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
    AreaChart, Area, Cell, LineChart, Line, Legend
} from 'recharts';

// Shared Modal Container Style
const ModalOverlay = ({ onClose, title, children, darkMode = false, headerControls }) => (
    <div className="chart-modal-overlay" onClick={onClose}>
        <div className={`chart-modal-content ${darkMode ? 'dark-theme-modal' : ''}`} onClick={e => e.stopPropagation()}>
            <button className="chart-close-btn" onClick={onClose} style={darkMode ? { color: 'rgba(255,255,255,0.7)' } : {}}>×</button>
            <div className="chart-modal-header">
                <h3 style={darkMode ? { color: '#fff' } : {}}>{title}</h3>
                {headerControls && <div>{headerControls}</div>}
            </div>
            <div className="chart-modal-body">
                {children}
            </div>
        </div>
    </div>
);

// Reusable Dropdown Component
const ChartFilterDropdown = ({ value, onChange }) => {
    const [open, setOpen] = useState(false);
    const options = ['Anual', 'Mensual', 'Semanal'];

    return (
        <div className="custom-chart-dropdown" onClick={e => e.stopPropagation()}>
            <div
                className={`dropdown-trigger ${open ? 'open' : ''}`}
                onClick={() => setOpen(!open)}
            >
                <span className="current-val">{value}</span>
                <svg className="dropdown-arrow" width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>

            {open && (
                <div className="dropdown-menu">
                    {options.map(opt => (
                        <div
                            key={opt}
                            className={`dropdown-item ${value === opt ? 'active' : ''}`}
                            onClick={() => {
                                onChange(opt);
                                setOpen(false);
                            }}
                        >
                            {opt}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

// --- Component 1: Team Evolution (Comparison - Multi Line) ---
export const TeamEvolutionModal = ({ onClose }) => {
    const [filterValue, setFilterValue] = useState('Semanal');

    // Dynamic data generation for multiple agents
    const chartData = useMemo(() => {
        const agents = ['Cari Muñoz', 'Cecilia Bergh', 'Consuelo Mardones', 'Lucía Lebrato'];

        if (filterValue === 'Anual') {
            return Array.from({ length: 52 }, (_, i) => {
                const point = { label: `Sem ${i + 1}` };
                // Generate random consistent trends for each agent
                agents.forEach((agent, idx) => {
                    const offset = idx * 5; // Different start points
                    const trend = Math.sin((i + offset) / 10) * 15;
                    const random = Math.random() * 8 - 4;
                    point[agent] = Math.max(40, Math.min(100, Math.round(70 + trend + random)));
                });
                return point;
            });
        } else if (filterValue === 'Mensual') {
            return [
                { label: 'Sem 1', 'Cari Muñoz': 82, 'Cecilia Bergh': 76, 'Consuelo Mardones': 72, 'Lucía Lebrato': 65 },
                { label: 'Sem 2', 'Cari Muñoz': 85, 'Cecilia Bergh': 78, 'Consuelo Mardones': 68, 'Lucía Lebrato': 70 },
                { label: 'Sem 3', 'Cari Muñoz': 79, 'Cecilia Bergh': 80, 'Consuelo Mardones': 75, 'Lucía Lebrato': 68 },
                { label: 'Sem 4', 'Cari Muñoz': 88, 'Cecilia Bergh': 74, 'Consuelo Mardones': 71, 'Lucía Lebrato': 72 },
            ];
        } else {
            const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
            return days.map(day => ({
                label: day,
                'Cari Muñoz': Math.round(60 + Math.random() * 40),
                'Cecilia Bergh': Math.round(60 + Math.random() * 40),
                'Consuelo Mardones': Math.round(60 + Math.random() * 40),
                'Lucía Lebrato': Math.round(60 + Math.random() * 40),
            }));
        }
    }, [filterValue]);

    // X-Axis config
    const xAxisProps = useMemo(() => {
        if (filterValue === 'Anual') {
            return {
                tick: { fill: '#9CA3AF', fontSize: 10, angle: -90, textAnchor: 'end', dy: 10 },
                interval: 0
            };
        }
        return {
            tick: { fill: '#9CA3AF', fontSize: 12 },
            interval: 0
        };
    }, [filterValue]);

    return (
        <ModalOverlay
            onClose={onClose}
            title="Comparativa de Equipo"
            darkMode={true}
            headerControls={<ChartFilterDropdown value={filterValue} onChange={setFilterValue} />}
        >
            <ResponsiveContainer width="100%" height={450}>
                <LineChart data={chartData} margin={{ top: 10, right: 30, left: 10, bottom: filterValue === 'Anual' ? 85 : 30 }}>
                    <CartesianGrid vertical={false} stroke="#374151" strokeDasharray="3 3" opacity={0.3} />
                    <XAxis
                        dataKey="label"
                        axisLine={false}
                        tickLine={false}
                        {...xAxisProps}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#9CA3AF', fontSize: 12 }}
                        domain={[0, 100]}
                        tickFormatter={(value) => `${value}%`}
                        width={40}
                    />
                    <RechartsTooltip
                        contentStyle={{ backgroundColor: '#1f2937', borderRadius: '8px', border: 'none', color: '#fff' }}
                        itemStyle={{ color: '#fff' }}
                        labelStyle={{ color: '#9CA3AF' }}
                    />
                    <Legend iconType="circle" wrapperStyle={{ position: 'absolute', bottom: 0, width: '100%' }} />

                    <Line type="monotone" dataKey="Cari Muñoz" stroke="#f97316" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="Cecilia Bergh" stroke="#3B82F6" strokeWidth={3} dot={false} />
                    <Line type="monotone" dataKey="Consuelo Mardones" stroke="#10B981" strokeWidth={3} dot={false} />
                    <Line type="monotone" dataKey="Lucía Lebrato" stroke="#FFFFFF" strokeWidth={3} dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </ModalOverlay>
    );
};

// --- Component 2: Vendor Evolution (Weeks) ---
export const VendorEvolutionModal = ({ onClose, vendorName }) => {
    const [filterValue, setFilterValue] = useState('Semanal');

    // Dynamic data generation based on filter
    const chartData = useMemo(() => {
        if (filterValue === 'Anual') {
            return Array.from({ length: 52 }, (_, i) => {
                const baseScore = 70;
                const trend = Math.sin(i / 8) * 10;
                const random = Math.random() * 10 - 5;
                let score = Math.round(baseScore + trend + random);
                return { label: `Sem ${i + 1}`, score: Math.max(0, Math.min(100, score)) };
            });
        } else if (filterValue === 'Mensual') {
            return [
                { label: 'Sem 1', score: 72 },
                { label: 'Sem 2', score: 78 },
                { label: 'Sem 3', score: 85 },
                { label: 'Sem 4', score: 82 },
            ];
        } else {
            return [
                { label: 'Lun', score: 65 },
                { label: 'Mar', score: 70 },
                { label: 'Mié', score: 85 },
                { label: 'Jue', score: 78 },
                { label: 'Vie', score: 92 },
                { label: 'Sáb', score: 60 },
                { label: 'Dom', score: 55 },
            ];
        }
    }, [filterValue]);

    // X-Axis config based on filter
    const xAxisProps = useMemo(() => {
        if (filterValue === 'Anual') {
            return {
                tick: { fill: '#9CA3AF', fontSize: 10, angle: -90, textAnchor: 'end', dy: 10 },
                interval: 0
            };
        }
        return {
            tick: { fill: '#9CA3AF', fontSize: 12 },
            interval: 0
        };
    }, [filterValue]);

    return (
        <ModalOverlay
            onClose={onClose}
            title={`Evolución: ${vendorName}`}
            darkMode={true}
            headerControls={<ChartFilterDropdown value={filterValue} onChange={setFilterValue} />}
        >
            <ResponsiveContainer width="100%" height={450}>
                <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 10, bottom: filterValue === 'Anual' ? 60 : 20 }}>
                    <defs>
                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f97316" stopOpacity={0.2} />
                            <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis
                        dataKey="label"
                        axisLine={false}
                        tickLine={false}
                        {...xAxisProps}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#9CA3AF', fontSize: 12 }}
                        domain={[0, 100]}
                        tickFormatter={(value) => `${value}%`}
                        width={40}
                    />
                    <CartesianGrid vertical={false} stroke="#374151" strokeDasharray="3 3" opacity={0.3} />
                    <RechartsTooltip
                        contentStyle={{ backgroundColor: '#1f2937', borderRadius: '8px', border: 'none', color: '#fff' }}
                        itemStyle={{ color: '#fff' }}
                        labelStyle={{ color: '#9CA3AF' }}
                        formatter={(value) => [`${value}%`, 'Porcentaje']}
                    />
                    <Area
                        type="monotone"
                        dataKey="score"
                        stroke="#f97316"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorScore)"
                    />
                </AreaChart>
            </ResponsiveContainer>
            <div className="chart-legend dark-legend">
                <p>Tendencia ascendente constante en las últimas 3 semanas.</p>
            </div>
        </ModalOverlay>
    );
};
