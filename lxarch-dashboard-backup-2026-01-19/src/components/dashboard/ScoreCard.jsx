
import React from 'react';

export const ScoreCard = ({
    title,
    score,
    subtitle,
    onClick,
    type = 'team',
    interactive = true
}) => {
    // Prefix: 't' or 'v'
    const p = type === 'team' ? 't' : 'v';

    return (
        <div
            className={`${p}-summary-card score-card-expanded`}
            onClick={interactive ? onClick : undefined}
            style={interactive ? { cursor: 'pointer', transition: 'transform 0.2s' } : {}}
            // Only adding hover scale effect if it's the vendor type or requested (matching existing behavior)
            onMouseEnter={interactive && type === 'vendor' ? (e) => e.currentTarget.style.transform = 'scale(1.01)' : undefined}
            onMouseLeave={interactive && type === 'vendor' ? (e) => e.currentTarget.style.transform = 'scale(1)' : undefined}
        >
            <div>
                <div className={`${p}-card-title`}>{title}</div>
                <div className="score-row">
                    <div className={`${p}-card-value ${type === 'team' ? 'text-white' : ''}`}>{score}%</div>
                    <div className="score-progress-bar">
                        <div
                            className="score-progress-fill"
                            style={{ width: `${score}%` }}
                        ></div>
                    </div>
                </div>
                {subtitle && <div className={`${p}-card-sub`}>{subtitle}</div>}
            </div>
        </div>
    );
};
