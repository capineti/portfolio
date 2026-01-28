
import React from 'react';

// Maps styling prefixes based on usage context (Team vs Vendor)
// In Figma, this would be a "Variant" property.
export const StatCard = ({ title, value, subtitle, statusColorClass, type = 'team' }) => {
    // Determine prefix: 't' for team, 'v' for vendor to match existing CSS
    const p = type === 'team' ? 't' : 'v';

    return (
        <div className={`${p}-summary-card square-card`}>
            <div className={`${p}-card-title`}>{title}</div>
            <div className={`${p}-card-value ${statusColorClass}`}>{value}</div>
            <div className={`${p}-card-sub`}>{subtitle}</div>
        </div>
    );
};
