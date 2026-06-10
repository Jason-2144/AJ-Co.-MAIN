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

const replacements = [
  { search: /px-4 sm:px-6 lg:px-4 sm:px-6 lg:px-8/g, replace: "px-4 sm:px-6 lg:px-8" },
  { search: /py-16 sm:py-16 sm:py-20 lg:py-28 lg:py-28/g, replace: "py-16 sm:py-20 lg:py-28" },
  { search: /grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:grid-cols-3/g, replace: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" },
  { search: /text-3xl sm:text-4xl md:text-5xl lg:text-7xl lg:text-7xl/g, replace: "text-3xl sm:text-4xl md:text-5xl lg:text-7xl" },
];

tsxFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  replacements.forEach(r => {
    content = content.replace(r.search, r.replace);
  });
  
  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Fixed classes in', file);
  }
});
