import { useState, useEffect } from 'react';
import './AgentGridScreen.css';
import { fetchAgents } from '../../services/dataService';
import { TeamEvolutionModal } from './components/EvolutionCharts';
import './components/EvolutionCharts.css';

const AlertCard = () => (
    <div className="alert-card">
        <div className="alert-icon-circle">!</div>
        <div className="alert-content">
            <span className="alert-title">2 vendedores requieren seguimiento esta semana</span>
            <span className="alert-subtitle">El rendimiento del equipo se mantiene estable (+1% vs mes anterior).</span>
        </div>
    </div>
);

const PriorityItem = ({ agent, onClick }) => {
    // Determine status color based on some mock logic or existing props
    // Image shows: Red for 'No terminó reunión', Orange for standard?
    // We'll map existing status to colors
    let statusColor = '#22c55e'; // default green
    if (agent.status === 'No terminó la reunión') statusColor = '#ef4444'; // red
    if (agent.status === 'Cierre débil') statusColor = '#f97316'; // orange

    const displayStatus = agent.status;
    const timeInfo = 'Hace 5 días'; // Mock for now

    const badgeStyle = {
        backgroundColor: '#dcfce7',
        color: '#166534'
    };

    if (agent.status === 'No terminó la reunión') {
        badgeStyle.backgroundColor = '#fee2e2';
        badgeStyle.color = '#991b1b';
    } else if (agent.status === 'Cierre débil') {
        badgeStyle.backgroundColor = '#ffedd5';
        badgeStyle.color = '#9a3412';
    }

    return (
        <div className="priority-item" onClick={onClick}>
            <div className="priority-main">
                <img src={agent.image} alt={agent.name} className="priority-avatar" />
                <span className="priority-name">{agent.name}</span>
            </div>

            <div className="priority-status">
                <div className="status-indicator" style={{ backgroundColor: statusColor }}></div>
                <span className="priority-status-text">{displayStatus}</span>
            </div>

            <div className="priority-info">
                <span className="priority-info-label">{agent.nextFollowUp ? 'Próx. reunión:' : 'Última rurión:'}</span>
                <span className="priority-info-val">{agent.nextFollowUp || timeInfo}</span>
            </div>

            <div className="priority-score">
                <span className="score-badge" style={badgeStyle}>
                    {agent.progress}%
                </span>
            </div>
        </div>
    );
};

const HistoryFooter = ({ onClick }) => (
    <div className="history-footer">
        <div className="history-header-group" onClick={() => onClick('months')} style={{ cursor: 'pointer' }}>
            <span className="history-title">Historial de llamadas 2026</span>

        </div>
        <div className="history-toggle">
            <button className="toggle-btn active" onClick={() => onClick('weeks')}>Por equipo</button>
        </div>
    </div>
);

export const AgentGridScreen = ({ onAgentSelect, onViewHistory }) => {
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showTeamChart, setShowTeamChart] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchAgents();
                setAgents(data);
            } catch (error) {
                console.error("Failed to load agents", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    if (loading) {
        return <div className="p-10 text-center">Cargando equipo...</div>;
    }

    return (
        <div className="agent-screen-container">
            {/* Header Greeting */}
            <div className="dashboard-header-text">
                <h1>Hola, Caterina!</h1>
                <p>Aquí tienes las métricas de tus vendedores</p>
            </div>

            {/* Notification Alert */}
            <AlertCard />

            {/* Main Content Card */}
            <div className="performance-summary-container">
                <h2 className="section-title">Resumen de rendimiento y llamadas recientes</h2>

                {/* Hero Black Card - Clickable for Modal */}
                <div
                    className="black-score-card"
                    onClick={() => setShowTeamChart(true)}
                >
                    <div className="score-card-content">
                        <span className="score-card-label">Puntuación General Semana 3</span>
                        <div className="score-display">
                            <span className="big-score">82.3%</span>
                            <div className="score-progress-bar">
                                <div className="score-progress-fill" style={{ width: '82.3%' }}></div>
                            </div>
                        </div>
                        <span className="score-subtext">Basado en las últimas 3 llamadas</span>
                    </div>
                </div>

                {/* Priorities List */}
                <div className="priorities-section">
                    <h3 className="priorities-title">Prioridades</h3>
                    <div className="priorities-list">
                        {agents.map(agent => (
                            <PriorityItem key={agent.id} agent={agent} onClick={() => onAgentSelect(agent)} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <HistoryFooter onClick={onViewHistory} />

            {showTeamChart && <TeamEvolutionModal onClose={() => setShowTeamChart(false)} />}
        </div>
    );
};
