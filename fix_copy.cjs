const fs = require('fs');
let content = fs.readFileSync('./src/pages/Home.tsx', 'utf8');

content = content.replace('AJ &amp; Co. helps companies identify high-impact AI opportunities, build custom solutions, and train teams to deliver measurable outcomes.', 'We help companies identify AI opportunities, build custom solutions, and train teams to deliver results.');

fs.writeFileSync('./src/pages/Home.tsx', content, 'utf8');
