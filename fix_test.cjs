const fs = require('fs');
let content = fs.readFileSync('./src/pages/Home.tsx', 'utf8');

content = content.replace('flex gap-8 overflow-x-auto no-scrollbar pb-10 snap-x snap-mandatory pr-10', 'flex gap-4 sm:gap-8 overflow-x-auto no-scrollbar pb-10 snap-x snap-mandatory -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8');

content = content.replace('className="glass min-w-[85vw] md:min-w-[500px] max-w-[600px] p-4 sm:p-6 lg:p-8 lg:p-4 sm:p-6 lg:p-8 rounded-2xl shrink-0 snap-start relative group hover:bg-white/[0.04] transition-colors duration-300"', 'className="glass min-w-[85vw] md:min-w-[500px] max-w-[600px] p-6 sm:p-8 rounded-2xl shrink-0 snap-start relative group hover:bg-white/[0.04] transition-colors duration-300"');

fs.writeFileSync('./src/pages/Home.tsx', content, 'utf8');
