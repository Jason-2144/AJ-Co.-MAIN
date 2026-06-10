const fs = require('fs');
let content = fs.readFileSync('./src/pages/Home.tsx', 'utf8');

// Replace standard absolute with hidden sm:block absolute
content = content.replace(/className="absolute top-\[20%\]/g, 'className="hidden sm:block absolute top-[20%]');
content = content.replace(/className="absolute bottom-\[20%\]/g, 'className="hidden sm:block absolute bottom-[20%]');

// ProcessSection ProcessStep circles hidden lg:flex
// Wait, they are.
// Testimonial emerald background
content = content.replace(/className="absolute -left-10/g, 'className="hidden md:block absolute -left-10');

// WhyUsSection lines
// FinalCTA big gradient
content = content.replace(/className="absolute top-1\/2 left-1\/2/g, 'className="hidden sm:block absolute top-[50%] left-[50%]');

fs.writeFileSync('./src/pages/Home.tsx', content, 'utf8');
