const fs = require('fs');
let content = fs.readFileSync('./src/pages/Home.tsx', 'utf8');
content = content.replace('text-5xl sm:text-6xl md:text-7xl lg:text-[5rem]', 'text-3xl sm:text-4xl md:text-5xl lg:text-7xl');
fs.writeFileSync('./src/pages/Home.tsx', content, 'utf8');
