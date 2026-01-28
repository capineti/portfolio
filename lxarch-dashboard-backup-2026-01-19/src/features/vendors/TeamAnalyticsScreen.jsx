import { useState, useEffect } from 'react';
import './TeamAnalyticsScreen.css';
import { TeamEvolutionModal } from './components/EvolutionCharts';
import { WeeksList } from '../../components/dashboard/WeeksList';
import { MonthsGrid } from '../../components/dashboard/MonthsGrid';
import { AgentCard } from '../../components/dashboard/AgentCard';
import { TeamSummaryCards } from '../../components/dashboard/TeamSummaryCards';

const MOCK_AGENTS = [
    { id: 4, name: 'Lucía Lebrato', progress: 0.5, status: 'No terminó la reunión', nextFollowUp: 'Mañana - 10:00 am', image: 'https://cdn.prod.website-files.com/646f20f4fae8845a741735a7/692661c127f8512b6243e47a_Lu%20(1).png' },
    { id: 1, name: 'Cari Muñoz', progress: 78, status: 'Cierre débil', nextFollowUp: 'Hoy - 11:00 am', image: 'https://cdn.prod.website-files.com/646f20f4fae8845a741735a7/674660fa8d3ec6de228b8b60_Cari%20Mun%CC%83oz.webp' },
    { id: 2, name: 'Cecilia Bergh', progress: 82, status: 'Buen progreso', nextFollowUp: 'Hace 5 días', image: 'https://cdn.prod.website-files.com/646f20f4fae8845a741735a7/69308553b00053eab41884b5_Cecilia%20web%20(1).png' },
    { id: 3, name: 'Consuelo Mardones', progress: 88, status: 'Buen progreso', nextFollowUp: '02/12/2026 - 09:00 am', image: 'https://cdn.prod.website-files.com/646f20f4fae8845a741735a7/6746603da9ebbbd9ae0133d1_Consuelo%20Mardones.webp' },
];

const WEEKS = [
    { id: 4, label: 'Semana 4', date: '22/01/2026 - 28/01/2026', count: '5 llamadas', isCurrent: true },
    { id: 3, label: 'Semana 3', date: '15/01/2026 - 21/01/2026', count: '3 llamadas' },
    { id: 2, label: 'Semana 2', date: '08/01/2026 - 14/01/2026', count: '6 llamadas' },
    { id: 1, label: 'Semana 1', date: '01/01/2026 - 07/01/2026', count: '4 llamadas' },
];

export const TeamAnalyticsScreen = ({ onBack, onAgentSelect, initialWeek, initialViewMode = 'months' }) => {
    const [selectedWeek, setSelectedWeek] = useState(initialWeek || null);
    // New state for Month View
    const [showMonths, setShowMonths] = useState(!initialWeek && initialViewMode === 'months');
    const [showTeamChart, setShowTeamChart] = useState(false);

    useEffect(() => {
        if (!initialWeek) {
            setShowMonths(initialViewMode === 'months');
        }
    }, [initialViewMode, initialWeek]);

    const handleInternalBack = () => {
        if (selectedWeek) {
            setSelectedWeek(null);
            setShowMonths(false); // Return to Weeks List
        } else {
            onBack(); // Return to Main Dashboard
        }
    };

    const handleMonthSelect = (month) => {
        if (month.disabled) return;
        setShowMonths(false); // Go to Weeks List
    };

    // Month Data
    const currentMonthIndex = 0; // Jan
    const monthLabels = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const months = monthLabels.map((label, index) => {
        let status = 'future';
        if (index === currentMonthIndex) status = 'active';
        else if (index < currentMonthIndex) status = 'past';
        return { id: index, label, status, disabled: status === 'future' };
    });

    // Hardcoded team stats for the demo
    const teamStats = {
        score: 82.3,
        opportunities: 2,
        closed: 1,
        lost: 0
    };

    return (
        <div className="team-screen-container">
            {/* Header */}
            <header className="team-header-block">
                <button className="ts-back-btn" onClick={handleInternalBack}>
                    {selectedWeek ? '← Volver a semanas' : '← Volver al Dashboard Principal'}
                </button>
                <div className="team-header">
                    <div className="team-info-block">
                        <h1>Dashboard de equipo</h1>
                        <p>Resumen de rendimiento y llamadas recientes</p>
                    </div>
                </div>
            </header>

            {/* Top Black Cards (Team Aggregated) */}
            <TeamSummaryCards
                stats={teamStats}
                selectedWeekLabel={selectedWeek ? selectedWeek.label : null}
                onChartClick={() => setShowTeamChart(true)}
            />

            {/* Team Members or Weeks List or Months Grid */}
            <section className="team-members-section">
                <div className="section-header-row">
                    <div className="flex-center-row" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <h3>Historial de llamadas 2026</h3>


                        {/* Breadcrumbs */}
                        {!showMonths && (
                            <span style={{ marginLeft: '0.5rem', color: '#6b7280', fontWeight: 400, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span
                                    className="breadcrumb-link"
                                    onClick={() => { setShowMonths(true); setSelectedWeek(null); }}
                                    style={{ cursor: 'pointer', textDecoration: 'underline' }}
                                >
                                    Meses
                                </span>
                                {selectedWeek && (
                                    <>
                                        <span>/</span>
                                        <span
                                            className="breadcrumb-link"
                                            onClick={() => setSelectedWeek(null)}
                                            style={{ cursor: 'pointer', textDecoration: 'underline' }}
                                        >
                                            Enero
                                        </span>
                                        <span>/ {selectedWeek.label}</span>
                                    </>
                                )}
                                {!selectedWeek && <span> / Enero</span>}
                            </span>
                        )}
                    </div>
                    {selectedWeek && selectedWeek.isCurrent ? (
                        <span className="report-status-badge status-current" style={{ padding: '4px 8px', fontSize: '0.75rem' }}>
                            INFORME EJECUTIVO EN CURSO
                        </span>
                    ) : (selectedWeek &&
                        <span className="report-status-badge status-completed" style={{ padding: '4px 8px', fontSize: '0.75rem' }}>
                            INFORME EJECUTIVO ENVIADO
                        </span>
                    )}
                </div>

                {selectedWeek ? (
                    <div className="team-grid">
                        {MOCK_AGENTS.map(agent => (
                            <AgentCard
                                key={agent.id}
                                agent={agent}
                                onClick={() => onAgentSelect(agent, selectedWeek)}
                            />
                        ))}
                    </div>
                ) : showMonths ? (
                    <MonthsGrid
                        months={months}
                        onSelectMonth={handleMonthSelect}
                    />
                ) : (
                    <WeeksList
                        weeks={WEEKS}
                        onSelectWeek={setSelectedWeek}
                    />
                )}
            </section>
            {showTeamChart && (
                <TeamEvolutionModal onClose={() => setShowTeamChart(false)} />
            )}
        </div>
    );
};
