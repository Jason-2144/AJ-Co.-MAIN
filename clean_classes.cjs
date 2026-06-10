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

  // Clean up all the messed up classes
  content = content.replace(/px-4 sm:px-4 sm:px-6 lg:px-8 lg:px-4 sm:px-6 lg:px-8/g, "px-4 sm:px-6 lg:px-8");
  content = content.replace(/px-4 sm:px-6 lg:px-8 py-3 sm:px-4 sm:px-6 lg:px-8 sm:py-4/g, "px-6 py-3 sm:px-8 sm:py-4");
  content = content.replace(/px-4 sm:px-4 sm:px-6 lg:px-8/g, "px-4 sm:px-6 lg:px-8");
  content = content.replace(/px-4 sm:px-6 lg:px-4 sm:px-6 lg:px-8/g, "px-4 sm:px-6 lg:px-8");
  content = content.replace(/py-16 sm:py-16 sm:py-20 lg:py-28/g, "py-16 sm:py-20 lg:py-28");
  content = content.replace(/py-16 sm:py-20 lg:py-28 lg:py-28/g, "py-16 sm:py-20 lg:py-28");
  content = content.replace(/grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:grid-cols-3/g, "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3");
  content = content.replace(/text-3xl sm:text-4xl md:text-5xl lg:text-7xl lg:text-7xl/g, "text-3xl sm:text-4xl md:text-5xl lg:text-7xl");

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
  }
});
