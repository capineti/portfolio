
import React from 'react';

export const CallCard = ({ call, onClick }) => {
    const getScoreClass = (score) => {
        if (score >= 80) return 'score-high';
        if (score >= 60) return 'score-med';
        return 'score-low';
    };

    const isDarkVariant = call.status === 'Cerrado' || call.status === 'Perdido';

    return (
        <div
            className={`call-card ${isDarkVariant ? 'dark-variant' : ''}`}
            onClick={onClick}
        >
            <div className="call-header">
                <span className="client-name">{call.client}</span>
                <span className={`call-score-badge ${getScoreClass(call.score)}`}>
                    {call.score}%
                </span>
            </div>
            <div className="call-date">{call.date}</div>

            <div className="call-details">
                <div className="cd-row">
                    <span className="cd-label">Estado:</span>
                    <span className="cd-val">{call.status}</span>
                </div>
                <div className="cd-row">
                    <span className="cd-label">Próx. Reunión:</span>
                    <span className="cd-val">{call.nextMeeting}</span>
                </div>
            </div>
        </div>
    );
};
