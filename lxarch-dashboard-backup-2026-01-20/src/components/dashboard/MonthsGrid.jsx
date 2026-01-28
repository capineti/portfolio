
import React from 'react';

export const MonthsGrid = ({ months, onSelectMonth }) => {
    return (
        <div className="months-grid-view">
            {months.map(month => (
                <div
                    key={month.id}
                    className={`month-card ${month.status === 'active' ? 'active' : ''} ${month.status === 'past' ? 'past' : ''} ${month.status === 'future' ? 'disabled' : ''}`}
                    onClick={() => !month.disabled && onSelectMonth(month)}
                >
                    <span className="month-label">{month.label}</span>
                </div>
            ))}
        </div>
    );
};
