
import React from 'react';
import { ScoreCard } from './ScoreCard';
import { StatCard } from './StatCard';

export const TeamSummaryCards = ({ stats, selectedWeekLabel, onChartClick }) => {
    return (
        <section className="team-summary-cards">
            {/* Score Card Component Instance */}
            <ScoreCard
                type="team"
                title={selectedWeekLabel ? `Puntuación ${selectedWeekLabel}` : 'Puntuación General Semana 3'}
                score={stats.score}
                subtitle="Basado en las últimas 3 llamadas"
                onClick={onChartClick}
            />

            {/* Status Cards Group */}
            <div className="status-cards-group">
                <StatCard
                    type="team"
                    title="Oportunidades"
                    value={stats.opportunities}
                    subtitle="Activas"
                    statusColorClass="text-active"
                />
                <StatCard
                    type="team"
                    title="Cerradas"
                    value={stats.closed}
                    subtitle="Exitosas"
                    statusColorClass="text-closed"
                />
                <StatCard
                    type="team"
                    title="Perdidas"
                    value={stats.lost}
                    subtitle="Sin éxito"
                    statusColorClass="text-lost"
                />
            </div>
        </section>
    );
};
