import React from 'react';

const AnalysisPanel = ({
    title = "Coaching AI | Revisión de Metodología LXArch",
    subtitle = "Análisis de venta de Consuelo Mardones",
    client = "Cliente",
    vendor = "Consuelo Mardones",
    date = "25/12/2025",
    isCollapsed = false
}) => {
    return (
        <div style={{
            background: '#111827',
            borderRadius: '16px',
            padding: isCollapsed ? '24px 32px' : '32px',
            color: '#F9FAFB',
            display: isCollapsed ? 'flex' : 'block',
            flexDirection: isCollapsed ? 'column' : 'initial',
            gap: isCollapsed ? '1.5rem' : 'initial'
        }}>

            {/* Header - Only visible when NOT collapsed */}
            {!isCollapsed && (
                <div style={{ marginBottom: '2rem' }}>
                    <div style={{ fontSize: '0.9rem', color: '#9CA3AF', marginBottom: '0.5rem' }}>{subtitle}</div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#fff', margin: 0 }}>{title}</h3>
                </div>
            )}

            {/* Metadata Row */}
            <div style={{
                display: 'flex',
                gap: '4rem',
                marginBottom: isCollapsed ? '0' : '2rem',
                fontSize: '0.85rem'
            }}>
                <div>
                    <span style={{ color: '#6B7280', textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em' }}>CLIENTE</span>
                    <span style={{ marginLeft: '1rem', fontWeight: 600, color: '#fff' }}>{client}</span>
                </div>
                <div>
                    <span style={{ color: '#6B7280', textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em' }}>VENDEDOR</span>
                    <span style={{ marginLeft: '1rem', fontWeight: 600, color: '#fff' }}>{vendor}</span>
                </div>
                <div>
                    <span style={{ color: '#6B7280', textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em' }}>FECHA</span>
                    <span style={{ marginLeft: '1rem', fontWeight: 600, color: '#fff' }}>{date}</span>
                </div>
            </div>

            {/* Progress Bar Container */}
            <div>
                {/* Multi-segment Progress Bar */}
                <div style={{ display: 'flex', height: '12px', borderRadius: '6px', overflow: 'hidden', marginBottom: isCollapsed ? '0.75rem' : '1rem', width: '100%' }}>
                    <div style={{ width: '15%', background: '#3B82F6' }}></div>
                    <div style={{ width: '45%', background: '#F97316' }}></div>
                    <div style={{ width: '30%', background: '#EF4444' }}></div>
                    <div style={{ width: '10%', background: '#4B5563' }}></div>
                </div>

                {/* Legend */}
                <div style={{ display: 'flex', gap: '2rem', fontSize: '0.75rem', color: '#9CA3AF' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: 8, height: 8, background: '#3B82F6', borderRadius: 2 }}></div> Conexión (15%)</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: 8, height: 8, background: '#F97316', borderRadius: 2 }}></div> Análisis (45%)</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: 8, height: 8, background: '#EF4444', borderRadius: 2 }}></div> Oferta (30%)</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: 8, height: 8, background: '#4B5563', borderRadius: 2 }}></div> Cierre (10%)</div>
                </div>
            </div>

        </div>
    );
};

export default AnalysisPanel;
