import React from 'react';

const InterestSummaryWidget = ({
    interest = 88,
    status = "En proceso",
    nextFollowUp = "10/01/2026 11:00 am",
    isCollapsed = false
}) => {
    return (
        <div style={{
            background: '#111827',
            borderRadius: '16px',
            padding: '24px',
            color: '#F9FAFB',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: isCollapsed ? 'flex-start' : 'space-between'
        }}>

            {/* Interest Score Section */}
            <div>
                {!isCollapsed && (
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff', marginBottom: '1rem' }}>Summary</div>
                )}

                <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '4rem', fontWeight: 700, lineHeight: 1 }}>{interest}</span>
                    <span style={{ fontSize: '1.25rem', marginLeft: '0.5rem' }}>% interés</span>
                </div>

                <div style={{ width: '100%', height: '8px', background: '#374151', borderRadius: '4px', overflow: 'hidden', marginBottom: isCollapsed ? '0' : '2rem' }}>
                    <div style={{ width: `${interest}%`, height: '100%', background: '#F97316' }}></div>
                </div>
            </div>

            {/* Status Footer - Only visible when NOT collapsed */}
            {!isCollapsed && (
                <div style={{ background: '#E5E7EB', borderRadius: '12px', padding: '16px', color: '#111729' }}>
                    <div style={{ fontWeight: 700, marginBottom: '0.5rem', fontSize: '0.95rem' }}>Estado Actual: {status}</div>
                    <div style={{ fontSize: '0.85rem', color: '#C2410C', fontWeight: 600, marginBottom: '0.25rem' }}>Próximo seguimiento</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 600 }}>{nextFollowUp}</div>
                </div>
            )}

        </div>
    );
};

export default InterestSummaryWidget;
