
import React from 'react';
import { ScoreCard } from './ScoreCard';
import { StatCard } from './StatCard';

export const VendorSummaryCards = ({ displayWeek, onChartClick }) => {
    return (
        <section className="vendor-summary-cards">
            {/* Reusable Score Card (Vendor Variant) */}
            <ScoreCard
                type="vendor"
                title={`Puntuación General ${displayWeek.label}`}
                score={displayWeek.stats.progress}
                subtitle={`Basado en las últimas ${displayWeek.count} llamadas`}
                onClick={onChartClick}
            />

            {/* Reusable Status Cards (Vendor Variant) */}
            <div className="status-cards-group">
                <StatCard
                    type="vendor"
                    title="Oportunidades"
                    value={displayWeek.stats.opportunities}
                    subtitle="Activas"
                    statusColorClass="text-active"
                />
                <StatCard
                    type="vendor"
                    title="Cerradas"
                    value={displayWeek.stats.closed}
                    subtitle="Exitosas"
                    statusColorClass="text-closed"
                />
                <StatCard
                    type="vendor"
                    title="Perdidas"
                    value={displayWeek.stats.lost}
                    subtitle="Sin éxito"
                    statusColorClass="text-lost"
                />
            </div>
        </section>
    );
};
