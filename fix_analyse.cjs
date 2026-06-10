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

  content = content.replace(/We analyse/g, 'We analyze');
  
  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
  }
});
