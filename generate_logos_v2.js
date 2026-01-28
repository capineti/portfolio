
const fs = require('fs');
const path = require('path');

// Helper to create SVG file
const createSvg = (filename, content, viewBox = "0 0 200 60") => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" fill="none" preserveAspectRatio="xMidYMid meet">
${content}
</svg>`;
    fs.writeFileSync(path.join('logos', filename), svg.trim());
    console.log(`Updated ${filename}`);
};

// 1. WSDOT (Simple Text)
createSvg('wsdot.svg', `<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-weight="900" font-size="28" fill="white">WSDOT</text>`);

// 2. LADOT (Simple Text)
createSvg('ladot.svg', `<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-weight="900" font-size="28" fill="white">LADOT</text>`);

// 3. SEATTLE DOT
createSvg('seattle_dot.svg', `<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" font-size="22" fill="white">Seattle DOT</text>`);

// 4. NYC DOT
createSvg('nyc_dot.svg', `
<rect x="20" y="5" width="160" height="50" fill="none" stroke="white" stroke-width="3"/>
<text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-weight="900" font-size="24" fill="white">NYC DOT</text>
`);

// 5. TAURUS (Simple Lowercase)
createSvg('taurus.svg', `<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" font-size="28" fill="white">taurus</text>`);

// 6. SOLAC (Stylized O)
createSvg('solac.svg', `
<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" font-size="32" fill="white" letter-spacing="-1">solac</text>
<circle cx="83" cy="30" r="8" fill="none" stroke="white" stroke-width="2" />
`);

// 7. VW (Circle Logo) - ViewBox 60 60
createSvg('vw.svg', `
<circle cx="30" cy="30" r="28" stroke="white" stroke-width="2"/>
<path d="M16 20 L30 50 L44 20 M30 50 L30 20" stroke="white" stroke-width="2" fill="none"/> 
<text x="50%" y="38" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" font-size="14" fill="white">VW</text>
`, "0 0 60 60");

// 8. DACIA (Stylized DC)
createSvg('dacia.svg', `
<path d="M40 20 H80 L90 40 L80 60 H40 L50 40 Z" stroke="white" stroke-width="4" fill="none"/>
<path d="M120 20 H160 L150 40 L160 60 H120 L130 40 Z" stroke="white" stroke-width="4" fill="none" transform="scale(-1, 1) translate(-200, 0)"/>
<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" font-size="28" fill="white" letter-spacing="4">DACIA</text>
`);

// 9. NHS (Rectangle)
createSvg('nhs.svg', `
<rect x="50" y="10" width="100" height="40" fill="none" stroke="white" stroke-width="3"/>
<text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-weight="900" font-size="24" fill="white" font-style="italic">NHS</text>
`);

