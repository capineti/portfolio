
const fs = require('fs');
const path = require('path');

// Creator helper
const createSvg = (filename, content, viewBox = "0 0 200 80") => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" fill="none">
${content}
</svg>`;
    fs.writeFileSync(path.join('logos', filename), svg.trim());
    console.log(`Generated FINAL ${filename}`);
};

// 1. NHS (White Box, Black Text)
// Based on user image: Solid white rectangle, NHS text cutout (or black).
createSvg('nhs.svg', `
<rect x="10" y="10" width="180" height="60" fill="white"/>
<path d="M45 55 L35 25 H45 L55 45 L65 25 H75 L65 55 H55 L50 35 L45 55 Z" fill="black"/>
<path d="M85 25 H95 V35 H105 V25 H115 V55 H105 V45 H95 V55 H85 V25 Z" fill="black"/> 
<path d="M125 45 H135 Q135 55 145 55 Q155 55 155 45 Q155 35 145 35 H135 Q125 35 125 25 Q125 15 145 15 Q165 15 165 25 H155 Q155 20 145 20 Q135 20 135 25 Q135 30 145 30 H155 Q165 30 165 45 Q165 55 145 55 Q125 55 125 45 Z" fill="black"/>
`, "0 0 200 80");
// Note: Hand-coded text 'NHS' roughly. 

// 2. WSDOT
createSvg('wsdot.svg', `<text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-weight="900" font-size="34" fill="white">WSDOT</text>`);

// 3. LADOT
createSvg('ladot.svg', `<text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-weight="900" font-size="34" fill="white">LADOT</text>`);

// 4. Seattle DOT (Icon + Text style)
createSvg('seattle_dot.svg', `
<text x="50%" y="40%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" font-size="18" fill="white">Seattle</text>
<text x="50%" y="70%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" fill="white">Department of</text>
<text x="50%" y="90%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" fill="white">Transportation</text>
`, "0 0 200 100");

// 5. NYC DOT
createSvg('nyc_dot.svg', `
<rect x="40" y="10" width="120" height="60" fill="none" stroke="white" stroke-width="4"/>
<text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-weight="900" font-size="30" fill="white">DOT</text>
<text x="50%" y="25%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" fill="white" font-weight="bold">NEW YORK CITY</text>
`);

// 6. Taurus (Lowercase bold)
createSvg('taurus.svg', `<text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" font-size="40" fill="white" letter-spacing="-1">taurus</text>`);

// 7. Solac (Geometric)
createSvg('solac.svg', `
<text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" font-size="44" fill="white" letter-spacing="-2">solac</text>
`);

// 8. Dacia (DC Geometric)
createSvg('dacia.svg', `
<path d="M30 20 H90 L100 40 L90 60 H30 L40 40 Z" stroke="white" stroke-width="8" fill="none"/>
<path d="M110 20 H170 L160 40 L170 60 H110 L120 40 Z" stroke="white" stroke-width="8" fill="none" transform="scale(-1, 1) translate(-200, 0)"/>
<text x="100" y="85" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" font-size="20" fill="white" letter-spacing="8">DACIA</text>
`, "0 0 200 100");

// 9. VW (Circle)
createSvg('vw.svg', `
<circle cx="50" cy="50" r="45" stroke="white" stroke-width="5" fill="none"/>
<path d="M20 20 L50 85 L80 20 M50 85 L50 20" stroke="white" stroke-width="5" fill="none" stroke-linejoin="round"/>
<text x="50" y="70" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" font-size="16" fill="white">VW</text>
`, "0 0 100 100");
