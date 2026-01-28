
import React from 'react';

export const AgentCard = ({ agent, onClick }) => {
    return (
        <div className="team-agent-card" onClick={onClick}>
            {/* Top Content (White Background) */}
            <div className="tac-top-content">
                <div className="tac-header">
                    <div className="tac-profile">
                        <img src={agent.image} alt={agent.name} />
                        <div className="tac-info">
                            <div className="tac-name">{agent.name}</div>
                        </div>
                    </div>
                    <div className="tac-score">{agent.progress} %</div>
                </div>

                <div className="tac-progress-row">
                    <div className="tac-bar-bg">
                        <div
                            className="tac-bar-fill"
                            style={{
                                width: `${agent.progress}%`,
                                backgroundColor: agent.status === 'No terminó la reunión' ? '#ef4444' : '#f97316'
                            }}
                        ></div>
                    </div>
                </div>
            </div>

            {/* Footer Content (Gray Background) */}
            <div className="tac-footer">
                <div className="tac-status-row">
                    <strong>Estado Actual:</strong> {agent.status === 'No terminó la reunión' ? 'Detenido' : 'En proceso'}
                </div>

                <div className="tac-spacer" style={{ height: '0.75rem' }}></div>

                <div className="tac-label-row">
                    <span className="orange-label">PRÓXIMO SEGUIMIENTO</span>
                </div>
                <div className="tac-value-row">
                    {agent.nextFollowUp || 'Mañana - 10:00 am'}
                </div>
            </div>
        </div>
    );
};
