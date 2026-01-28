import { useState, useEffect, useMemo } from 'react';
import './PlaygroundScreen.css';
import laptopMockup from '../../assets/laptop_analytics_restored.png';
import {
    AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip,
    LineChart, Line, Legend, CartesianGrid
} from 'recharts';

// --- COMPONENTS ---
import { StatCard } from '../../components/dashboard/StatCard';
import { AgentCard } from '../../components/dashboard/AgentCard';
import { CallCard } from '../../components/dashboard/CallCard';
import { ScoreCard } from '../../components/dashboard/ScoreCard';
import { TeamSummaryCards } from '../../components/dashboard/TeamSummaryCards';
import { VendorSummaryCards } from '../../components/dashboard/VendorSummaryCards';
import { WeeksList } from '../../components/dashboard/WeeksList';
import { MonthsGrid } from '../../components/dashboard/MonthsGrid';
import AnalysisPanel from '../../components/dashboard/AnalysisPanel';
import InterestSummaryWidget from '../../components/dashboard/InterestSummaryWidget';

// --- MOCK DATA ---
const MOCK_AGENT = {
    id: 1, name: "Cari Muñoz", role: "Ventas Senior", image: "https://i.pravatar.cc/150?u=cari",
    status: "active", progress: 88, nextFollowUp: "Mañana, 10:00"
};
const MOCK_CALL = {
    id: 101, client: "Hotel Riu Palace", date: "18 Oct 2025", status: "Cerrado", score: 95, nextMeeting: "Completado"
};
const MOCK_WEEKS = [
    { id: 1, label: "Sem 1", date: "1-7 Oct", count: 12, isCurrent: false },
    { id: 2, label: "Sem 2", date: "8-14 Oct", count: 15, isCurrent: true }
];
const MOCK_MONTHS = [
    { id: 'oct', label: 'OCT', status: 'active' },
    { id: 'nov', label: 'NOV', status: 'future' }
];

// --- LIVE CHART DEMO COMPONENT ---
const LiveMotionChart = () => {
    const [dataStep, setDataStep] = useState(0);

    // Three states of data to cycle through
    const datasets = useMemo(() => [
        [
            { label: 'Lun', val: 40 }, { label: 'Mar', val: 65 }, { label: 'Mié', val: 50 },
            { label: 'Jue', val: 80 }, { label: 'Vie', val: 60 }, { label: 'Sáb', val: 90 },
            { label: 'Dom', val: 75 }
        ],
        [
            { label: 'Lun', val: 60 }, { label: 'Mar', val: 45 }, { label: 'Mié', val: 70 },
            { label: 'Jue', val: 50 }, { label: 'Vie', val: 80 }, { label: 'Sáb', val: 65 },
            { label: 'Dom', val: 85 }
        ],
        [
            { label: 'Lun', val: 30 }, { label: 'Mar', val: 55 }, { label: 'Mié', val: 85 },
            { label: 'Jue', val: 95 }, { label: 'Vie', val: 50 }, { label: 'Sáb', val: 70 },
            { label: 'Dom', val: 60 }
        ]
    ], []);

    useEffect(() => {
        const interval = setInterval(() => {
            setDataStep(prev => (prev + 1) % datasets.length);
        }, 2000); // Change every 2 seconds
        return () => clearInterval(interval);
    }, [datasets]);

    return (
        <div style={{ width: '100%', height: 450, background: '#1C1C1C', padding: 20, borderRadius: 12, position: 'relative' }}>
            <h4 style={{ color: '#fff', marginBottom: 10, fontSize: '0.8rem', opacity: 0.7, textTransform: 'uppercase' }}>Live Data Loop</h4>
            <ResponsiveContainer width="100%" height="90%">
                <AreaChart data={datasets[dataStep]}>
                    <defs>
                        <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#F0712C" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#F0712C" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="label" hide />
                    <YAxis hide domain={[0, 100]} />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#333', border: 'none', borderRadius: 4, color: '#fff' }}
                        itemStyle={{ color: '#F0712C' }}
                    />
                    <Area
                        type="monotone"
                        dataKey="val"
                        stroke="#F0712C"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorVal)"
                        isAnimationActive={true}
                        animationDuration={1500}
                    />
                </AreaChart>
            </ResponsiveContainer>
            <div style={{ position: 'absolute', bottom: 10, right: 15, fontSize: 10, color: '#555', fontFamily: 'monospace' }}>
                Cycle State: {dataStep + 1}/3
            </div>
        </div>
    );
};

// --- TEAM COMPARISON DEMO COMPONENT ---
const TeamComparisonDemo = () => {
    const [dataStep, setDataStep] = useState(0);

    // Generate 3 sets of data for animation frames
    const datasets = useMemo(() => {
        const agents = ['Cari Muñoz', 'Cecilia Bergh', 'Consuelo Mardones', 'Lucía Lebrato'];

        // Helper to generate a full dataset with a specific phase shift
        const generateData = (phaseShift) => {
            return Array.from({ length: 52 }, (_, i) => {
                const point = { label: `Sem ${i + 1}` };
                agents.forEach((agent, idx) => {
                    const offset = idx * 5 + phaseShift; // Add phase shift for animation
                    // Slightly modify frequency or amplitude per step for "alive" feel
                    const trend = Math.sin((i + offset) / 12) * 20;
                    const jitter = Math.sin((i * idx) + phaseShift) * 5;

                    // Upward trend: Start lower (30) and increase by factor of index (i * 1.2)
                    const upwardSlope = i * 1.2;
                    point[agent] = Math.max(10, Math.min(100, Math.round(30 + upwardSlope + trend + jitter)));
                });
                return point;
            });
        };

        return [generateData(0), generateData(2), generateData(4)];
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setDataStep(prev => (prev + 1) % datasets.length);
        }, 2500); // Slightly slower loop for the complex lines
        return () => clearInterval(interval);
    }, [datasets]);

    return (
        <div style={{ width: '100%', height: 450, background: '#1C1C1C', padding: 20, borderRadius: 12, position: 'relative', display: 'flex', flexDirection: 'column' }}>
            <h4 style={{ color: '#fff', marginBottom: 10, fontSize: '0.8rem', opacity: 0.7, textTransform: 'uppercase' }}>Live Data Loop</h4>

            <ResponsiveContainer width="100%" height="95%">
                <LineChart data={datasets[dataStep]} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    {/* Hide axes and grid for pure visual motion style */}
                    <XAxis dataKey="label" hide />
                    <YAxis hide domain={[0, 100]} />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#1f2937', borderRadius: '8px', border: 'none', color: '#fff' }}
                        itemStyle={{ color: '#fff' }}
                        labelStyle={{ color: '#9CA3AF' }}
                    />

                    {/* Animated Lines */}
                    <Line type="basis" dataKey="Cari Muñoz" stroke="#f97316" strokeWidth={3} dot={false} isAnimationActive={true} animationDuration={2000} />
                    <Line type="basis" dataKey="Cecilia Bergh" stroke="#3B82F6" strokeWidth={3} dot={false} isAnimationActive={true} animationDuration={2000} />
                    <Line type="basis" dataKey="Consuelo Mardones" stroke="#10B981" strokeWidth={3} dot={false} isAnimationActive={true} animationDuration={2000} />
                    <Line type="basis" dataKey="Lucía Lebrato" stroke="#FFFFFF" strokeWidth={3} dot={false} isAnimationActive={true} animationDuration={2000} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export const PlaygroundScreen = ({ onBack }) => {
    const [activeTab, setActiveTab] = useState(0);

    const TABS = [
        "0. Overview", "1. Foundations", "2. Atoms", "3. Primitives",
        "4. Molecules", "5. Components", "6. Panels", "7. Navigation",
        "8. Interaction", "9. Data & Analytics", "10. Data Viz"
    ];

    return (
        <div className="playground-container atomic-lab-mode">
            <header className="lab-header">
                <button onClick={onBack} className="back-btn">← Exit</button>
                <div className="lab-title">
                    <h1>DESIGN LIBRARY</h1>

                </div>
                <nav className="lab-nav">
                    {TABS.map((label, idx) => (
                        <button key={idx}
                            className={`lab-tab ${activeTab === idx ? 'active' : ''}`}
                            onClick={() => setActiveTab(idx)}>
                            {label}
                        </button>
                    ))}
                </nav>
            </header>

            <main className="lab-content" style={activeTab === 0 ? { padding: 0, overflow: 'hidden' } : {}}>


                {/* OVERVIEW */}
                {activeTab === 0 && (
                    <section className="lab-section overview-section" style={{
                        backgroundColor: '#EFF1F3', // Matched to image bg
                        margin: 0,
                        padding: 0,
                        borderRadius: '0',
                        maxWidth: 'none',
                        color: '#111729',
                        height: '100%',
                        display: 'flex',
                        overflow: 'hidden'
                    }}>
                        <div className="overview-container" style={{
                            display: 'flex',
                            width: '100%',
                            height: '100%'
                        }}>
                            <div className="overview-content" style={{
                                flex: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                justifyContent: 'center', // Vertically center text
                                textAlign: 'left',
                                padding: '5rem 4rem 5rem 6rem', // Padding moved here
                                zIndex: 10
                            }}>
                                <h2 style={{
                                    fontSize: '3.5rem',
                                    fontWeight: 400,
                                    color: '#000',
                                    marginBottom: '3rem',
                                    lineHeight: 1.1,
                                    fontFamily: 'Suisse Intl, sans-serif'
                                }}>
                                    About the Library
                                </h2>

                                <h3 style={{
                                    fontSize: '1.5rem',
                                    fontWeight: 500,
                                    color: '#111729',
                                    marginBottom: '2rem'
                                }}>
                                    LxArch Analytics Design System
                                </h3>

                                <div style={{
                                    fontSize: '1.125rem',
                                    color: '#4B5563',
                                    lineHeight: 1.6,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '1.5rem',
                                    maxWidth: '600px'
                                }}>
                                    <p>
                                        This Analytics Design System centralizes the foundations, components, and interaction patterns used across the platform.
                                    </p>
                                    <p>
                                        The coded components serve as the source of truth. <strong>Components are synchronized with code changes to ensure the library is always up to date.</strong> Please check the structure regularly for styles, components (including documentation, usage, availability, and functionality), as well as the latest updates.
                                    </p>
                                    <p style={{ marginTop: '1rem' }}>
                                        <a href="#" style={{ color: '#000', textDecoration: 'underline', textUnderlineOffset: '4px' }}>
                                            View Documentation →
                                        </a>
                                    </p>
                                </div>
                            </div>

                            <div className="overview-image" style={{
                                flex: 1.2,
                                display: 'flex',
                                position: 'relative',
                                height: 'auto', // Stretch to fill container
                                backgroundColor: 'transparent', // Transparent to blend
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <img
                                    src={laptopMockup}
                                    alt="Laptop showing Analytics Dashboard"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        objectPosition: 'center'
                                    }}
                                />
                            </div>
                        </div>
                    </section>
                )}

                {/* 1. FOUNDATIONS */}
                {activeTab === 1 && (
                    <section className="lab-section">
                        <h2 className="section-header">1. Foundations</h2>

                        <div className="foundation-group">
                            <h3 style={{ textTransform: 'uppercase', letterSpacing: '0.05em', color: '#6B7280', fontSize: '0.9rem', marginBottom: '1.5rem' }}>1.1 Brand Colors</h3>
                            <div className="swatch-grid">
                                <Swatch name="--lx-orange" hex="#F0712C" />
                                <Swatch name="--lx-beige" hex="#E6E0D6" />
                                <Swatch name="--lx-charcoal" hex="#1C1C1C" />
                            </div>

                            {/* OKLCH PALETTE GENERATOR */}
                            <div className="palette-container" style={{ marginTop: '6rem' }}>
                                <div style={{ marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'white', marginBottom: '1rem' }}>
                                        PALETTE / <span style={{ color: '#3B82F6' }}>OKLCH COLOR VARIATIONS</span>
                                    </h3>

                                    <h4 style={{ color: 'white', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Why OKLCH over HSL?</h4>

                                    <p style={{ color: '#aaa', fontSize: '0.9rem', lineHeight: '1.6', maxWidth: '65ch' }}>
                                        Even HSL allows you to think of colors as these individual parameters, but HSL is not perfect.
                                        Different Hues with same luminescence, and saturation values can produce colors with different contrast levels
                                        (for example, yellow and blue). This makes it hard to consistently produce <span style={{ color: '#3B82F6', fontWeight: 600 }}>accessible interface designs</span>.
                                        OKLCH color space solves this because it's modelled to be close to human perception of color.
                                    </p>
                                </div>

                                <div className="palette-header-row">
                                    <span></span>
                                    <span>900</span><span>800</span><span>700</span><span>600</span><span>500</span>
                                    <span>400</span><span>300</span><span>200</span><span>100</span>
                                </div>

                                <PaletteRow label="Orange" hue={45} chroma={0.22} baseStepIndex={4} />
                                <PaletteRow label="Green" hue={150} chroma={0.18} baseStepIndex={4} />
                                <PaletteRow label="Blue" hue={260} chroma={0.18} baseStepIndex={4} />
                                <PaletteRow label="Red" hue={25} chroma={0.20} baseStepIndex={4} />

                                <div style={{ height: '1rem' }}></div> {/* Spacer */}

                                <PaletteRow label="Beige" hue={85} chroma={0.04} baseStepIndex={7} />
                                <PaletteRow label="Charcoal" hue={260} chroma={0.02} baseStepIndex={0} />

                                <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.5rem', fontSize: '0.75rem', color: 'white', fontFamily: 'monospace' }}>
                                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'white' }}></div>
                                    <span>= Brand Base Color</span>
                                </div>

                                {/* CONTRAST CHECKER (GRAYSCALE LIGHTNESS) */}
                            </div>

                            {/* CONTRAST CHECKER (SEPARATED CARD) */}
                            <div className="palette-container" style={{ marginTop: '2rem' }}>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'white', marginBottom: '1rem' }}>
                                    CONTRAST
                                </h3>

                                <div className="palette-header-row">
                                    <span></span>
                                    <span>900</span><span>800</span><span>700</span><span>600</span><span>500</span>
                                    <span>400</span><span>300</span><span>200</span><span>100</span>
                                </div>

                                <PaletteRow label="Orange" hue={45} chroma={0} baseStepIndex={-1} />
                                <PaletteRow label="Green" hue={150} chroma={0} baseStepIndex={-1} />
                                <PaletteRow label="Blue" hue={260} chroma={0} baseStepIndex={-1} />
                                <PaletteRow label="Red" hue={25} chroma={0} baseStepIndex={-1} />

                                <div style={{ height: '1rem' }}></div>

                                <PaletteRow label="Beige" hue={85} chroma={0} baseStepIndex={-1} />
                                <PaletteRow label="Charcoal" hue={260} chroma={0} baseStepIndex={-1} />
                            </div>
                        </div>

                        <div className="foundation-group">
                            <h3 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '1rem', color: '#111729' }}>
                                <span>1.2 TYPOGRAPHY</span>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>FONT FAMILY: SUISSE INTL</span>
                            </h3>

                            <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#4B5563', marginBottom: '1rem', marginTop: '1rem' }}>Desktop</h4>
                            <div className="type-stack">
                                <div className="type-row">
                                    <span className="type-label">Display</span>
                                    <span className="type-demo display">125k</span>
                                    <span className="type-meta">Light 2.5rem</span>
                                </div>
                                <div className="type-row">
                                    <span className="type-label">H1</span>
                                    <span className="type-demo" style={{ fontSize: '1.5rem', fontWeight: 600 }}>Main Title</span>
                                    <span className="type-meta">SemiBold 1.5rem</span>
                                </div>
                                <div className="type-row">
                                    <span className="type-label">H2</span>
                                    <span className="type-demo" style={{ fontSize: '1.25rem', fontWeight: 600 }}>Section Subtitle</span>
                                    <span className="type-meta">SemiBold 1.25rem</span>
                                </div>
                                <div className="type-row">
                                    <span className="type-label">H3</span>
                                    <span className="type-demo" style={{ fontSize: '1.1rem', fontWeight: 500 }}>Card Header</span>
                                    <span className="type-meta">Medium 1.1rem</span>
                                </div>
                                <div className="type-row">
                                    <span className="type-label">Body</span>
                                    <span className="type-demo body">Standard body text</span>
                                    <span className="type-meta">Regular 1rem</span>
                                </div>
                            </div>

                            <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#4B5563', marginBottom: '1rem', marginTop: '2rem' }}>Tablet (Portrait)</h4>
                            <div className="type-stack">
                                <div className="type-row">
                                    <span className="type-label">Display</span>
                                    <span className="type-demo display" style={{ fontSize: '2rem' }}>125k</span>
                                    <span className="type-meta">Light 2rem</span>
                                </div>
                                <div className="type-row">
                                    <span className="type-label">H1</span>
                                    <span className="type-demo" style={{ fontSize: '1.35rem', fontWeight: 600 }}>Main Title</span>
                                    <span className="type-meta">SemiBold 1.35rem</span>
                                </div>
                                <div className="type-row">
                                    <span className="type-label">H2</span>
                                    <span className="type-demo" style={{ fontSize: '1.15rem', fontWeight: 600 }}>Section Subtitle</span>
                                    <span className="type-meta">SemiBold 1.15rem</span>
                                </div>
                                <div className="type-row">
                                    <span className="type-label">H3</span>
                                    <span className="type-demo" style={{ fontSize: '1rem', fontWeight: 500 }}>Card Header</span>
                                    <span className="type-meta">Medium 1rem</span>
                                </div>
                                <div className="type-row">
                                    <span className="type-label">Body</span>
                                    <span className="type-demo body" style={{ fontSize: '0.95rem' }}>Standard body text</span>
                                    <span className="type-meta">Regular 0.95rem</span>
                                </div>
                            </div>

                            <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#4B5563', marginBottom: '1rem', marginTop: '2rem' }}>Mobile</h4>
                            <div className="type-stack">
                                <div className="type-row">
                                    <span className="type-label">Display</span>
                                    <span className="type-demo display" style={{ fontSize: '1.75rem' }}>125k</span>
                                    <span className="type-meta">Light 1.75rem</span>
                                </div>
                                <div className="type-row">
                                    <span className="type-label">H1</span>
                                    <span className="type-demo" style={{ fontSize: '1.25rem', fontWeight: 600 }}>Main Title</span>
                                    <span className="type-meta">SemiBold 1.25rem</span>
                                </div>
                                <div className="type-row">
                                    <span className="type-label">H2</span>
                                    <span className="type-demo" style={{ fontSize: '1.1rem', fontWeight: 600 }}>Section Subtitle</span>
                                    <span className="type-meta">SemiBold 1.1rem</span>
                                </div>
                                <div className="type-row">
                                    <span className="type-label">H3</span>
                                    <span className="type-demo" style={{ fontSize: '0.95rem', fontWeight: 500 }}>Card Header</span>
                                    <span className="type-meta">Medium 0.95rem</span>
                                </div>
                                <div className="type-row">
                                    <span className="type-label">Body</span>
                                    <span className="type-demo body" style={{ fontSize: '0.9rem' }}>Standard body text</span>
                                    <span className="type-meta">Regular 0.9rem</span>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* 2. ATOMS */}
                {activeTab === 2 && (
                    <section className="lab-section">
                        <h2 className="section-header">2. Atoms</h2>
                        <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#111729', marginBottom: '1.5rem' }}>2.1 Base Elements</h3>
                        <div className="atom-grid">
                            <AtomBox name="Label Text">
                                <span className="atom-label">CLIENTE</span>
                            </AtomBox>
                            <AtomBox name="Value Text">
                                <span className="atom-value">Texto Principal</span>
                            </AtomBox>
                            <AtomBox name="Status Dot">
                                <span className="status-tag green">●</span>
                            </AtomBox>
                            <AtomBox name="Divider">
                                <hr style={{ width: 150, borderTop: '1px solid #ddd' }} />
                            </AtomBox>
                        </div>
                    </section>
                )}

                {/* 3. PRIMITIVES */}
                {activeTab === 3 && (
                    <section className="lab-section">
                        <h2 className="section-header">3. Primitives</h2>
                        <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#111729', marginBottom: '1.5rem' }}>3.1 Status & Progress</h3>
                        <div className="atom-grid">
                            <AtomBox name="Progress Bar">
                                <div style={{ width: 120, height: 6, background: '#eee', borderRadius: 4 }}>
                                    <div style={{ width: '60%', height: '100%', background: '#F0712C', borderRadius: 4 }}></div>
                                </div>
                            </AtomBox>
                            <AtomBox name="Badge">
                                <span className="report-status-badge status-completed">ENVIADO</span>
                            </AtomBox>
                        </div>
                    </section>
                )}

                {/* 4. MOLECULES */}
                {activeTab === 4 && (
                    <section className="lab-section">
                        <h2 className="section-header">4. Molecules</h2>
                        <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#111729', marginBottom: '1.5rem' }}>4.1 Information Blocks</h3>
                        <div className="atom-grid">
                            <AtomBox name="Avatar-Name Block">
                                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                    <img src="https://i.pravatar.cc/150?u=cari" style={{ width: 40, height: 40, borderRadius: '50%' }} />
                                    <div>
                                        <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>Cari Muñoz</div>
                                        <div style={{ fontSize: '0.75rem', color: '#737373' }}>Ventas Senior</div>
                                    </div>
                                </div>
                            </AtomBox>

                            <AtomBox name="Metric Label Pair">
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span className="atom-label">OPORTUNIDADES</span>
                                    <span className="atom-value">14</span>
                                </div>
                            </AtomBox>
                        </div>

                        <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#111729', marginBottom: '1.5rem', marginTop: '3rem' }}>4.2 Status Categories</h3>
                        <div className="atom-grid">

                            {/* STATUS INDICATORS */}
                            <AtomBox name="Status Rows">
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#F9FAFB', padding: '12px', borderRadius: '8px' }}>
                                        <div style={{ width: 12, height: 12, background: '#EF4444', borderRadius: 2 }}></div>
                                        <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#111729' }}>No terminó la reunión</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#F9FAFB', padding: '12px', borderRadius: '8px' }}>
                                        <div style={{ width: 12, height: 12, background: '#F97316', borderRadius: 2 }}></div>
                                        <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#111729' }}>Cierre débil</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#F9FAFB', padding: '12px', borderRadius: '8px' }}>
                                        <div style={{ width: 12, height: 12, background: '#10B981', borderRadius: 2 }}></div>
                                        <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#111729' }}>Buen progreso</span>
                                    </div>
                                </div>
                            </AtomBox>

                            {/* PERCENTAGE PILLS */}
                            <AtomBox name="Percentage Pills">
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    <span style={{ background: '#FEE2E2', color: '#991B1B', padding: '4px 12px', borderRadius: '16px', fontWeight: 600, fontSize: '0.9rem', width: 'fit-content' }}>0.5%</span>
                                    <span style={{ background: '#FFEDD5', color: '#9A3412', padding: '4px 12px', borderRadius: '16px', fontWeight: 600, fontSize: '0.9rem', width: 'fit-content' }}>78%</span>
                                    <span style={{ background: '#D1FAE5', color: '#065F46', padding: '4px 12px', borderRadius: '16px', fontWeight: 600, fontSize: '0.9rem', width: 'fit-content' }}>82%</span>
                                    <span style={{ background: '#DCFCE7', color: '#166534', padding: '4px 12px', borderRadius: '16px', fontWeight: 600, fontSize: '0.9rem', width: 'fit-content' }}>88%</span>
                                </div>
                            </AtomBox>

                            {/* EXECUTIVE BANNERS */}
                            <AtomBox name="Executive Status Banners">
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
                                    <div style={{
                                        background: '#FFF7ED',
                                        color: '#C2410C',
                                        border: '1px solid #C2410C',
                                        padding: '12px 24px',
                                        borderRadius: '8px',
                                        width: '100%',
                                        textAlign: 'center',
                                        fontWeight: 700,
                                        fontSize: '0.9rem',
                                        letterSpacing: '0.05em'
                                    }}>
                                        INFORME EJECUTIVO EN CURSO
                                    </div>
                                    <div style={{
                                        background: '#ECFDF5',
                                        color: '#047857',
                                        border: '1px solid #047857',
                                        padding: '12px 24px',
                                        borderRadius: '8px',
                                        width: '100%',
                                        textAlign: 'center',
                                        fontWeight: 700,
                                        fontSize: '0.9rem',
                                        letterSpacing: '0.05em'
                                    }}>
                                        INFORME EJECUTIVO ENVIADO
                                    </div>
                                </div>
                            </AtomBox>

                        </div>
                    </section>
                )}

                {/* 5. COMPONENTS */}
                {activeTab === 5 && (
                    <section className="lab-section">
                        <h2 className="section-header">5. Components</h2>
                        <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#111729', marginBottom: '1.5rem' }}>5.1 Dashboard Cards</h3>
                        <div className="component-inventory">
                            <ComponentSpec name="ScoreCard" width="562px">
                                <ScoreCard title="Puntuación" score={85} subtitle="Media Semanal" />
                            </ComponentSpec>
                            <ComponentSpec name="StatCard" width="234px">
                                <StatCard title="Ventas" value="125k" trend="+5%" trendUp={true} />
                            </ComponentSpec>
                            <ComponentSpec name="AgentCard" width="320px">
                                <AgentCard agent={MOCK_AGENT} />
                            </ComponentSpec>
                        </div>


                        <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#111729', marginBottom: '1.5rem', marginTop: '3rem' }}>5.2 Metric Cards</h3>
                        <div className="component-inventory">
                            <ComponentSpec name="Metric Highlight Card" width="320px">
                                <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', textAlign: 'center' }}>
                                    <div style={{ fontSize: '0.8rem', color: '#9CA3AF', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em', marginBottom: '1rem' }}>DUDA EN OFERTA</div>
                                    <div style={{ fontSize: '3.5rem', fontWeight: 600, color: '#F97316', lineHeight: 1, marginBottom: '1.5rem' }}>12 %</div>
                                    <div style={{ width: '100%', height: '8px', background: '#F3F4F6', borderRadius: '4px', overflow: 'hidden' }}>
                                        <div style={{ width: '12%', height: '100%', background: '#F97316' }}></div>
                                    </div>
                                </div>
                            </ComponentSpec>
                        </div>
                    </section>
                )}

                {/* 6. PANELS */}
                {activeTab === 6 && (
                    <section className="lab-section">
                        <h2 className="section-header">6. Panels</h2>

                        <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#111729', marginBottom: '1.5rem' }}>6.1 Summary Dashboard</h3>
                        <div className="panel-inventory">
                            <ComponentSpec name="Summary Dashboard Panel" width="100%">
                                {/* Using one representative panel to avoid duplication */}
                                <TeamSummaryCards stats={{ score: 82, opportunities: 14, closed: 8, lost: 2 }} selectedWeekLabel="Sem 3" />
                            </ComponentSpec>
                        </div>


                        <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#111729', marginBottom: '1.5rem', marginTop: '3rem' }}>6.2 Diagnostic Panels</h3>
                        <div className="panel-inventory">
                            <ComponentSpec name="Agent Diagnostic Panel" width="100%">
                                <div style={{ background: '#fff', borderRadius: '16px', padding: '0', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', display: 'grid', gridTemplateColumns: '1fr 2fr', minHeight: '300px' }}>

                                    {/* Left Column */}
                                    <div style={{ padding: '24px', borderRight: '1px solid #F3F4F6' }}>
                                        <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#111729', marginBottom: '0.5rem' }}>Diagnostico del agente de ventas</h4>
                                        <div style={{ fontSize: '0.9rem', color: '#6B7280', marginBottom: '1.5rem' }}>
                                            Resultado de la llamada <span style={{ color: '#10B981', fontWeight: 600 }}>■ Oportunidad Activa</span>
                                        </div>

                                        <div style={{ background: '#F97316', color: '#fff', padding: '4px 12px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600, display: 'inline-block', marginBottom: '1rem' }}>Top 3 Fallos</div>

                                        <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem', color: '#374151', lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                            <li style={{ display: 'flex', gap: '8px' }}><span style={{ color: '#EF4444' }}>■</span> 1. Ovidó: Pregunta para evitar objecciones</li>
                                            <li style={{ display: 'flex', gap: '8px' }}><span style={{ color: '#F97316' }}>■</span> 2. Insuficiente: No profundizó en "dolores clave".</li>
                                            <li style={{ display: 'flex', gap: '8px' }}><span style={{ color: '#EF4444' }}>■</span> 3. Tono: No mantuvo el tono "experto" al final.</li>
                                        </ul>
                                    </div>

                                    {/* Right Column */}
                                    <div style={{ padding: '24px', background: '#FAFAFA' }}>
                                        <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#111729', marginBottom: '1.5rem' }}>Instrucción para Consuelo Mardones:</h4>
                                        <p style={{ fontSize: '0.9rem', color: '#374151', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                                            La IA detectó una baja profundidad de dolor (55%) y un alto nivel de miedo o duda del cliente durante el cierre. Esto indica una falla en la etapa 2.
                                        </p>

                                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#F97316', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Acción Requerida</div>

                                        <ol style={{ paddingLeft: '1.2rem', fontSize: '0.9rem', color: '#374151', lineHeight: 1.6 }}>
                                            <li style={{ marginBottom: '0.5rem' }}>Revisa la grabación entre los minutos [12:30] y [15:00]. Observa cómo el cliente menciona "la dificultad de implementar un cambio".</li>
                                            <li style={{ marginBottom: '0.5rem' }}>Práctica: En la próxima llamada, aplica la técnica de la Doble Pregunta Profunda para descubrir el costo de no cambiar.</li>
                                            <li>Objetivo: Elevar el puntaje de Detección de Dudas Internas por encima del 70%.</li>
                                        </ol>
                                    </div>
                                </div>
                            </ComponentSpec>
                        </div>

                        <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#111729', marginBottom: '1.5rem', marginTop: '3rem' }}>6.3 Detailed Analysis Modules (Scroll States)</h3>
                        <div className="panel-inventory" style={{ display: 'grid', gap: '4rem' }}>

                            {/* GROUP 1: DARK ANALYSIS PANEL */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                <h4 style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', color: '#111729', borderBottom: '1px solid #E5E7EB', paddingBottom: '0.5rem' }}>Main Analysis Header</h4>

                                {/* Normal State */}
                                <ComponentSpec name="Dark Analysis Panel (Expanded)" width="100%">
                                    <AnalysisPanel />
                                </ComponentSpec>

                                {/* Collapsed State */}
                                <ComponentSpec name="Dark Analysis Panel (Collapsed / Sticky)" width="100%">
                                    <AnalysisPanel isCollapsed={true} />
                                </ComponentSpec>
                            </div>

                            {/* GROUP 2: INTEREST SUMMARY */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                <h4 style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', color: '#111729', borderBottom: '1px solid #E5E7EB', paddingBottom: '0.5rem' }}>Interest Sidebar Widget</h4>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                    {/* Normal State */}
                                    <ComponentSpec name="Interest Summary (Expanded)" width="360px">
                                        <InterestSummaryWidget />
                                    </ComponentSpec>

                                    {/* Collapsed State */}
                                    <ComponentSpec name="Interest Summary (Collapsed)" width="360px">
                                        <InterestSummaryWidget isCollapsed={true} />
                                    </ComponentSpec>
                                </div>
                            </div>

                        </div>
                    </section>
                )}

                {/* 7. NAVIGATION */}
                {
                    activeTab === 7 && (
                        <section className="lab-section">
                            <h2 className="section-header">7. Navigation Structure</h2>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>

                                {/* LIVE COMPONENT DEMO */}
                                <div>
                                    <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#111729', marginBottom: '1.5rem' }}>7.1 Component Behavior</h3>
                                    <ComponentSpec name="Weeks List / Navigation" width="100%">
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', width: '100%' }}>

                                            {/* DEFAULT STATE */}
                                            <div style={{ width: '100%' }}>
                                                <div style={{ marginBottom: '0.75rem', fontSize: '0.85rem', color: '#6B7280', lineHeight: '1.5' }}>
                                                    <strong>Default (Past):</strong> Gray border, white background. Shows "INFORME EJECUTIVO ENVIADO" (Green).
                                                </div>
                                                <div className="weeks-list-container">
                                                    <WeeksList
                                                        weeks={[{ id: 1, label: 'Sem 1', date: '1-7 Oct', isCurrent: false, count: 12 }]}
                                                        onSelectWeek={() => { }}
                                                    />
                                                </div>
                                            </div>

                                            {/* ACTIVE STATE */}
                                            <div style={{ width: '100%' }}>
                                                <div style={{ marginBottom: '0.75rem', fontSize: '0.85rem', color: '#6B7280', lineHeight: '1.5' }}>
                                                    <strong>Active (Current):</strong> Orange border, subtle orange tint background. Shows "INFORME EJECUTIVO EN CURSO" (Orange).
                                                </div>
                                                <div className="weeks-list-container">
                                                    <WeeksList
                                                        weeks={[{ id: 1, label: 'Sem 1', date: '8-14 Oct', isCurrent: true, count: 15 }]}
                                                        onSelectWeek={() => { }}
                                                    />
                                                </div>
                                            </div>

                                            {/* HOVER STATE (MOCKED) */}
                                            <div style={{ width: '100%' }}>
                                                <div style={{ marginBottom: '0.75rem', fontSize: '0.85rem', color: '#6B7280', lineHeight: '1.5' }}>
                                                    <strong>Hover:</strong> Cards shift right (+4px) and border color highlights to indicate interactivity.
                                                </div>

                                                <div className="weeks-list-container">
                                                    {/* Manual Mock for Hover Logic */}
                                                    <div className="week-item-row" style={{
                                                        transform: 'translateX(4px)',
                                                        borderColor: 'var(--primary)',
                                                        backgroundColor: 'var(--bg-card-hover)',
                                                        cursor: 'pointer'
                                                    }}>
                                                        <div className="week-info">
                                                            <span className="week-label">Sem 1</span>
                                                            <span className="week-date">15-21 Oct</span>
                                                        </div>
                                                        <div className="week-action">
                                                            <span className="report-status-badge status-completed" style={{ padding: '4px 8px', fontSize: '0.65rem', marginRight: '8px' }}>
                                                                INFORME EJECUTIVO ENVIADO
                                                            </span>
                                                            <span className="week-count-badge">8</span>
                                                            <span className="week-arrow">→</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </ComponentSpec>
                                </div>

                                {/* 7.2 MONTHLY NAVIGATION GRID */}
                                <div>
                                    <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#111729', marginBottom: '1.5rem' }}>7.2 Monthly Navigation Grid</h3>

                                    <ComponentSpec name="Month Card States" width="100%">
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem', width: '100%' }}>

                                            {/* STATES BREAKDOWN */}
                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '2rem' }}>

                                                {/* DEFAULT */}
                                                <div>
                                                    <div style={{ marginBottom: '0.75rem', fontSize: '0.85rem', color: '#6B7280', lineHeight: '1.5' }}>
                                                        <strong>Default:</strong> Selectable (Grey).
                                                    </div>
                                                    <div className="month-card" style={{ width: '100%', maxWidth: '160px' }}>Feb</div>
                                                </div>

                                                {/* ACTIVE */}
                                                <div>
                                                    <div style={{ marginBottom: '0.75rem', fontSize: '0.85rem', color: '#6B7280', lineHeight: '1.5' }}>
                                                        <strong>Active:</strong> Current selection (Orange).
                                                    </div>
                                                    <div className="month-card active" style={{ width: '100%', maxWidth: '160px' }}>Ene</div>
                                                </div>

                                                {/* DISABLED */}
                                                <div>
                                                    <div style={{ marginBottom: '0.75rem', fontSize: '0.85rem', color: '#6B7280', lineHeight: '1.5' }}>
                                                        <strong>Disabled:</strong> Future / Data Unavailable.
                                                    </div>
                                                    <div className="month-card disabled" style={{ width: '100%', maxWidth: '160px' }}>Mar</div>
                                                </div>
                                            </div>

                                            {/* FULL GRID LAYOUT */}
                                            <div>
                                                <h4 style={{ fontSize: '1rem', fontWeight: 600, color: '#111729', marginBottom: '1rem' }}>Full Grid Layout (12 Months)</h4>
                                                <div style={{ marginBottom: '1rem', fontSize: '0.85rem', color: '#6B7280' }}>
                                                    Responsive 6-column grid structure used for annual navigation.
                                                </div>
                                                <MonthsGrid
                                                    months={[
                                                        { id: 'jan', label: 'Ene', status: 'active' },
                                                        { id: 'feb', label: 'Feb' },
                                                        { id: 'mar', label: 'Mar', status: 'future' },
                                                        { id: 'apr', label: 'Abr', status: 'future' },
                                                        { id: 'may', label: 'May', status: 'future' },
                                                        { id: 'jun', label: 'Jun', status: 'future' },
                                                        { id: 'jul', label: 'Jul', status: 'future' },
                                                        { id: 'aug', label: 'Ago', status: 'future' },
                                                        { id: 'sep', label: 'Sep', status: 'future' },
                                                        { id: 'oct', label: 'Oct', status: 'future' },
                                                        { id: 'nov', label: 'Nov', status: 'future' },
                                                        { id: 'dec', label: 'Dic', status: 'future' }
                                                    ]}
                                                    onSelectMonth={() => { }}
                                                />
                                            </div>

                                        </div>
                                    </ComponentSpec>
                                </div>
                            </div>
                        </section>
                    )
                }

                {/* 8. INTERACTION */}
                {
                    activeTab === 8 && (
                        <section className="lab-section">
                            <h2 className="section-header">8. Interaction & Motion</h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6rem' }}>

                                <div className="interaction-demo-block">
                                    <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#111729', marginBottom: '1rem' }}>8.1 Hover States</h3>
                                    <div className="demo-hover-card">Hover Me</div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                                    <div className="interaction-demo-block">
                                        <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#111729', marginBottom: '1rem' }}>8.2 Live Motion</h3>
                                        {/* LIVE CHART COMPONENT INCORPORATED HERE */}
                                        <div className="chart-wrapper-fix">
                                            <LiveMotionChart />
                                        </div>
                                    </div>

                                    <div className="interaction-demo-block">
                                        <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#111729', marginBottom: '1rem' }}>8.3 Comparison Chart</h3>
                                        <div className="chart-wrapper-fix">
                                            <TeamComparisonDemo />
                                        </div>
                                    </div>
                                </div>

                                <div className="interaction-demo-block" style={{ borderTop: '1px solid #E5E7EB', paddingTop: '3rem' }}>
                                    <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#111729', marginBottom: '1.5rem' }}>8.4 Motion Principles</h3>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem', fontSize: '0.9rem', color: '#4B5563' }}>
                                        <div>
                                            <strong style={{ display: 'block', color: '#111729', marginBottom: '0.5rem' }}>Standard Durations</strong>
                                            <ul style={{ listStyle: 'none', padding: 0, lineHeight: 1.8 }}>
                                                <li><strong>150ms:</strong> Micro-interactions (Hover, Toggle)</li>
                                                <li><strong>300ms:</strong> Content transitions (Fade, Slide)</li>
                                                <li><strong>500ms+:</strong> Complex data entry / exits</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <strong style={{ display: 'block', color: '#111729', marginBottom: '0.5rem' }}>Do's</strong>
                                            <ul style={{ listStyle: 'none', padding: 0, lineHeight: 1.6 }}>
                                                <li>✓ Animate state changes (e.g. graph updates) to preserve context.</li>
                                                <li>✓ Use eased curves (ease-out) for natural feel.</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <strong style={{ display: 'block', color: '#111729', marginBottom: '0.5rem' }}>Don'ts</strong>
                                            <ul style={{ listStyle: 'none', padding: 0, lineHeight: 1.6 }}>
                                                <li>✕ Never animate purely decorative elements that distract from data.</li>
                                                <li>✕ Avoid linear motion for UI elements.</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </section>
                    )
                }

                {/* 9. DATA & ANALYTICS */}
                {
                    activeTab === 9 && (
                        <section className="lab-section">
                            <h2 className="section-header">9. Data & Analytics (Conceptual)</h2>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
                                <div>
                                    <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#111729', marginBottom: '1rem' }}>9.1 Data Flows</h3>
                                    <p style={{ color: '#6B7280', lineHeight: 1.6, marginBottom: '2rem' }}>
                                        <strong>Flow A — Event-driven:</strong> Near real-time updates triggering alerts and status changes.<br /><br />
                                        <strong>Flow B — Aggregated:</strong> Scheduled data processing feeding main dashboards and trends.
                                    </p>

                                    <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#111729', marginBottom: '1rem' }}>9.2 Design Implications by Data Latency</h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                        <div>
                                            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#111729' }}>Real-time (&lt; 1s)</div>
                                            <div style={{ fontSize: '0.85rem', color: '#6B7280' }}>UI must handle rapid updates without flashing. Use interpolation for values. Ideal for: Operational monitoring.</div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#111729' }}>Near Real-time (~mins)</div>
                                            <div style={{ fontSize: '0.85rem', color: '#6B7280' }}>Requires explicit "Last updated" timestamps. User expects freshness but accepts slight delay.</div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#111729' }}>Delayed Batch (&gt; 24h)</div>
                                            <div style={{ fontSize: '0.85rem', color: '#6B7280' }}>Static reporting. Emphasis on stability and historical accuracy rather than liveliness.</div>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ background: '#f9fafb', padding: '2rem', borderRadius: '8px', border: '1px dashed #e5e7eb' }}>
                                    <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#111729', marginBottom: '1rem' }}>9.3 Data States</h3>
                                    <div className="atom-grid" style={{ gap: '1rem' }}>
                                        <AtomBox name="Loading">
                                            <span className="status-tag" style={{ background: '#e5e7eb', color: '#6b7280' }}>...</span>
                                        </AtomBox>
                                        <AtomBox name="Stale">
                                            <span className="status-tag" style={{ background: '#fef3c7', color: '#d97706' }}>Last updated: 2h ago</span>
                                        </AtomBox>
                                        <AtomBox name="Error">
                                            <span className="status-tag" style={{ background: '#fee2e2', color: '#dc2626' }}>Sync Failed</span>
                                        </AtomBox>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )
                }

                {/* 10. DATA VIZ */}
                {
                    activeTab === 10 && (
                        <section className="lab-section">
                            <h2 className="section-header">10. Data Visualization</h2>
                            <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#111729', marginBottom: '1.5rem' }}>10.1 Chart Elements</h3>
                            <div className="atom-grid">
                                <AtomBox name="Tooltip Molecule">
                                    <div style={{ background: '#1f2937', color: 'white', padding: '8px 12px', borderRadius: 8, fontSize: 12, minWidth: 100 }}>
                                        <div style={{ color: '#9CA3AF', marginBottom: 4 }}>Dato</div>
                                        <div style={{ fontWeight: 'bold', fontSize: 14 }}>85%</div>
                                    </div>
                                </AtomBox>
                            </div>
                        </section>
                    )
                }

            </main >
        </div >
    );
};

// --- HELPERS (Optimized) ---

const Swatch = ({ name, hex }) => (
    <div className="swatch">
        <div className="swatch-color" style={{ backgroundColor: hex }}></div>
        <div className="swatch-info"><span className="swatch-name">{name}</span><span className="swatch-hex">{hex}</span></div>
    </div>
);

const AtomBox = ({ name, children }) => (
    <div className="atom-box">
        <div className="atom-render">{children}</div>
        <div className="atom-name">{name}</div>
    </div>
);

const ComponentSpec = ({ name, width, children }) => (
    <div className="spec-container">
        <div className="spec-render" style={{ width: width }}>{children}</div>
        <div className="spec-meta"><span className="spec-name">{name}</span><span className="spec-width">W: {width}</span></div>
    </div>
);

const PaletteRow = ({ label, hue, chroma, baseStepIndex = 4 }) => {
    // Lightness steps from 900 (dark) to 100 (light)
    const steps = [0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 0.85, 0.92, 0.97];

    return (
        <div className="palette-row">
            <div className="palette-label">{label}</div>
            {steps.map((l, i) => (
                <div
                    key={i}
                    className="color-step"
                    style={{
                        backgroundColor: `oklch(${l} ${chroma} ${hue})`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}
                    title={`oklch(${l} ${chroma} ${hue})`}
                >
                    {i === baseStepIndex && (
                        <div style={{
                            width: 6, height: 6, borderRadius: '50%',
                            background: 'white', boxShadow: '0 0 4px rgba(0,0,0,0.5)'
                        }} title="Base Brand Color" />
                    )}
                </div>
            ))}
        </div>
    );
};
