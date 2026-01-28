
const fs = require('fs');
const path = require('path');

const logos = [
    { name: 'wsdot.svg', text: 'WSDOT' },
    { name: 'ladot.svg', text: 'LADOT' },
    { name: 'seattle_dot.svg', text: 'Seattle DOT' },
    { name: 'nyc_dot.svg', text: 'NYC DOT' },
    { name: 'taurus.svg', text: 'taurus' },
    { name: 'solac.svg', text: 'solac' },
    { name: 'vw.svg', text: 'VW' },
    { name: 'dacia.svg', text: 'DACIA' },
    { name: 'nhs.svg', text: 'NHS' }
];

const svgTemplate = (text) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" fill="none">
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" font-size="24" fill="white">${text}</text>
</svg>
`;

// Special VW circle logic roughly
const vwSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" fill="none">
  <circle cx="30" cy="30" r="28" stroke="white" stroke-width="3"/>
  <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" font-size="18" fill="white">VW</text>
</svg>
`;

logos.forEach(logo => {
    let content = svgTemplate(logo.text);
    if (logo.name === 'vw.svg') content = vwSvg;
    fs.writeFileSync(path.join('logos', logo.name), content.trim());
    console.log(`Created ${logo.name}`);
});
