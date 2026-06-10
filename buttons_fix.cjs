const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    try {
      filelist = fs.statSync(dirFile).isDirectory() ? walkSync(dirFile, filelist) : filelist.concat(dirFile);
    } catch {}
  });
  return filelist;
};

const tsxFiles = walkSync('./src').filter(file => file.endsWith('.tsx'));

tsxFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Add w-full sm:w-auto to specific buttons where it's missing, mostly buttons and contact Links
  // Ensure we don't duplicate it.
  content = content.replace(/className="([^"]*(?:inline-flex items-center|Book Strategy Call|bg-\[\#10B981\] text-black|hover:brightness-110)[^"]*)"/g, (match, p1) => {
    // Only if it doesn't already have w-full
    if (!p1.includes('w-full') && !p1.includes('hidden md:flex')) {
      return `className="${p1} w-full sm:w-auto text-center justify-center flex"`;
    }
    return match;
  });

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated buttons in', file);
  }
});
