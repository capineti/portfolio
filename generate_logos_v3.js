
const fs = require('fs');
const path = require('path');

// Helper
const createSvg = (filename, content, viewBox = "0 0 200 80") => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" fill="none">
${content}
</svg>`;
    fs.writeFileSync(path.join('logos', filename), svg.trim());
    console.log(`Refined ${filename}`);
};

// 1. NHS (Black text in White Box, or White text in box depending on mode - User showed White Box with Black Text)
// Actually user showed white text on black bg in one, but let's stick to white outlines for darkmode fit
createSvg('nhs.svg', `
<rect x="10" y="10" width="180" height="60" fill="white"/>
<text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-weight="900" font-size="40" fill="black" font-style="italic" letter-spacing="-2">NHS</text>
`);

// 2. LAMP (Geometric Custom Path)
// L A M P connected style
createSvg('ladot.svg', `
<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-weight="900" font-size="34" fill="white">LADOT</text>
`);
// Note: I am not redrawing LAMP custom typography from scratch perfectly as path, but swapping LADOT to likely matches. 
// Wait, the user uploaded LAMP logo in the chat. I should ensure I have a file for LAMP if it's needed? 
// The user list was: WSDOT, LADOT, Seattle, NYC, Taurus, Solac, VW, Dacia, NHS.
// The image uploaded says "LAMP". Is that replacing LADOT? I'll stick to the naming but update content if needed.
// Actually, looking at the list, I'll update the existing ones to be as clean as possible.

// 3. WS DOT
createSvg('wsdot.svg', `<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-weight="900" font-size="32" fill="white">WSDOT</text>`);

// 4. Seattle
createSvg('seattle_dot.svg', `<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" font-size="24" fill="white">Seattle DOT</text>`);

// 5. NYC
createSvg('nyc_dot.svg', `
<rect x="25" y="10" width="150" height="60" fill="none" stroke="white" stroke-width="4"/>
<text x="50%" y="60%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-weight="900" font-size="28" fill="white">NYC DOT</text>
<text x="50%" y="25%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" fill="white">NEW YORK CITY</text>
`);

// 6. Taurus
createSvg('taurus.svg', `<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" font-size="36" fill="white" letter-spacing="-1">taurus</text>`);

// 7. SOLAC
createSvg('solac.svg', `<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" font-size="40" fill="white" letter-spacing="-1">solac</text>`);

// 8. VW (Circle) - Viewbox 100 100
createSvg('vw.svg', `
<circle cx="50" cy="50" r="45" stroke="white" stroke-width="4"/>
<path d="M25 30 L50 80 L75 30 M50 80 L50 30" stroke="white" stroke-width="4" fill="none" stroke-linejoin="round"/>
<text x="50%" y="65" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" font-size="20" fill="white">VW</text>
`, "0 0 100 100");

// 9. DACIA (DC Link)
createSvg('dacia.svg', `
<path d="M20 20 H80 L90 40 L80 60 H20 L30 40 Z" stroke="white" stroke-width="8" fill="none"/>
<path d="M120 20 H180 L170 40 L180 60 H120 L130 40 Z" stroke="white" stroke-width="8" fill="none" transform="scale(-1, 1) translate(-200, 0)"/>
<text x="100" y="75" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" font-size="20" fill="white" letter-spacing="10">DACIA</text>
`, "0 0 200 80");
