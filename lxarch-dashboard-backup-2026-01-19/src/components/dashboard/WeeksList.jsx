
import React from 'react';
// Assuming CSS is loaded globally or via parent, but ideally should be modular.
// For now, we rely on the existing classes in TeamAnalyticsScreen.css / VendorAnalyticsScreen.css

export const WeeksList = ({ weeks, onSelectWeek }) => {
    return (
        <div className="weeks-list-container">
            {weeks.map(week => (
                <div
                    key={week.id}
                    className={`week-item-row ${week.isCurrent ? 'current-week' : ''}`}
                    onClick={() => onSelectWeek(week)}
                >
                    <div className="week-info">
                        <span className="week-label">{week.label}</span>
                        <span className="week-date">{week.date}</span>
                    </div>
                    <div className="week-action">
                        {week.isCurrent ? (
                            <span className="report-status-badge status-current" style={{ padding: '4px 8px', fontSize: '0.65rem', marginRight: '8px' }}>
                                INFORME EJECUTIVO EN CURSO
                            </span>
                        ) : (
                            <span className="report-status-badge status-completed" style={{ padding: '4px 8px', fontSize: '0.65rem', marginRight: '8px' }}>
                                INFORME EJECUTIVO ENVIADO
                            </span>
                        )}
                        {week.count && <span className="week-count-badge">{week.count}</span>}
                        <span className="week-arrow">→</span>
                    </div>
                </div>
            ))}
        </div>
    );
};
