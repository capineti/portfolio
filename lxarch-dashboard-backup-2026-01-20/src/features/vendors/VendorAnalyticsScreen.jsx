import { useState, useEffect } from 'react';
import './VendorAnalyticsScreen.css';
import { fetchVendorCalls } from '../../services/dataService';
import { VendorEvolutionModal } from './components/EvolutionCharts';
import './components/EvolutionCharts.css';
import { MonthsGrid } from '../../components/dashboard/MonthsGrid';
import { CallCard } from '../../components/dashboard/CallCard';
import { VendorSummaryCards } from '../../components/dashboard/VendorSummaryCards';

export const VendorAnalyticsScreen = ({ agent, onBack, onSelectCall, initialWeek }) => {
    const [calls, setCalls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showVendorChart, setShowVendorChart] = useState(false);

    // Fallback if no agent passed (dev mode)
    const currentAgent = agent || { name: 'Sofía Martínez', progress: 82.3 };

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchVendorCalls(currentAgent.id);
                setCalls(data);
            } catch (error) {
                console.error("Failed to load calls", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [currentAgent]);

    const weeksAvailable = [
        {
            id: 4,
            label: 'Semana 4',
            dateRange: '22/01/2026 - 28/01/2026',
            count: 5,
            isCurrent: true,
            stats: { progress: 85.0, opportunities: 3, closed: 1, lost: 1 }
        },
        {
            id: 3,
            label: 'Semana 3',
            dateRange: '15/01/2026 - 21/01/2026',
            count: 3,
            stats: { progress: 82.3, opportunities: 2, closed: 1, lost: 0 }
        },
        {
            id: 2,
            label: 'Semana 2',
            dateRange: '08/01/2026 - 14/01/2026',
            count: 6,
            stats: { progress: 75.5, opportunities: 3, closed: 2, lost: 1 }
        },
        {
            id: 1,
            label: 'Semana 1',
            dateRange: '01/01/2026 - 07/01/2026',
            count: 4,
            stats: { progress: 88.0, opportunities: 2, closed: 2, lost: 0 }
        },
    ];

    const [selectedWeek, setSelectedWeek] = useState(() => {
        if (initialWeek) {
            // Try to find the week in our local list to get full stats
            // If not found, use the initialWeek object provided (fallback)
            return weeksAvailable.find(w => w.id === initialWeek.id) || initialWeek;
        }
        return null;
    });

    const [isMonthGridView, setIsMonthGridView] = useState(false);

    // Month data with dynamic status
    // Hardcoded to January (0) as per request "estamos en enero"
    const currentMonthIndex = 0;

    const monthLabels = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const months = monthLabels.map((label, index) => {
        let status = 'future';
        if (index === currentMonthIndex) status = 'active';
        else if (index < currentMonthIndex) status = 'past';

        return {
            id: index,
            label,
            status, // 'active', 'past', 'future'
            disabled: status === 'future'
        };
    });

    const handleMonthSelect = (month) => {
        if (month.disabled) return;
        // Logic to filter weeks by month would go here
        setIsMonthGridView(false);
    };

    // Determine which statistics to show: Active selection or Default (Current Week)
    const displayWeek = selectedWeek || weeksAvailable.find(w => w.isCurrent) || weeksAvailable[0];



    return (
        <div className="vendor-screen-container">
            {/* Header */}
            <header className="vendor-header-block">
                <button className="vs-back-btn" onClick={() => onBack('dashboard')}>
                    ← Volver al Dashboard Principal
                </button>
                <div className="vendor-header">
                    <div className="vendor-info-block">
                        <h1>Dashboard de {currentAgent.name}</h1>
                        <p>Resumen de rendimiento y llamadas recientes</p>
                    </div>
                </div>
            </header>



            {/* Top Black Cards */}
            <VendorSummaryCards
                displayWeek={displayWeek}
                onChartClick={() => setShowVendorChart(true)}
            />

            {/* Calls History Section */}
            <section className="calls-grid-section">
                <div className="section-header-row">
                    <div className="flex-center-row" style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
                        <h3 style={{ margin: 0 }}>Historial de llamadas 2026</h3>
                        {!isMonthGridView && (
                            <div className="week-breadcrumb" style={{ display: 'flex', alignItems: 'baseline', position: 'relative', zIndex: 10 }}>
                                <span className="breadcrumb-link" onClick={() => onBack('months')} style={{ cursor: 'pointer', textDecoration: 'underline' }}>Meses</span>
                                <span className="separator" style={{ margin: '0 0.5rem' }}>/</span>
                                <span className="breadcrumb-link" onClick={() => onBack('weeks')} style={{ cursor: 'pointer', textDecoration: 'underline' }}>Enero</span>
                                <span className="separator" style={{ margin: '0 0.5rem' }}>/</span>
                                <button
                                    className="breadcrumb-link current"
                                    onClick={() => onBack('current_week')}
                                    style={{
                                        cursor: 'pointer',
                                        textDecoration: 'underline',
                                        fontWeight: 'bold',
                                        background: 'none',
                                        border: 'none',
                                        padding: 0,
                                        font: 'inherit',
                                        color: 'inherit'
                                    }}
                                >
                                    {selectedWeek?.label || displayWeek.label}
                                </button>
                            </div>
                        )}

                    </div>
                </div>

                {/* Back to Weeks Breadcrumb */}


                {/* Main Content Area - GRID ONLY - List Removed */}
                {loading ? (
                    <div className="loading-state">Cargando datos...</div>
                ) : (
                    <>
                        {isMonthGridView ? (
                            <MonthsGrid
                                months={months}
                                onSelectMonth={handleMonthSelect}
                            />
                        ) : (
                            <div className="calls-grid">
                                {calls.map(call => (
                                    <CallCard
                                        key={call.id}
                                        call={call}
                                        onClick={() => onSelectCall(call)}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </section>

            {showVendorChart && (
                <VendorEvolutionModal
                    onClose={() => setShowVendorChart(false)}
                    vendorName={currentAgent.name}
                />
            )}
        </div >
    );
};
