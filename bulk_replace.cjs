const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    try {
      filelist = fs.statSync(dirFile).isDirectory() ? walkSync(dirFile, filelist) : filelist.concat(dirFile);
    } catch (err) {
      if (err.code === 'OOM' || err.code === 'EMFILE') throw err;
    }
  });
  return filelist;
};

const tsxFiles = walkSync('./src').filter(file => file.endsWith('.tsx'));

const replacements = [
  { search: /measurable business outcomes/gi, replace: "results your team can see" },
  { search: /\bLeverage\b/g, replace: "Use" },
  { search: /\bleverage\b/g, replace: "use" },
  { search: /cutting-edge/gi, replace: "modern" },
  { search: /transformative/gi, replace: "meaningful" },
  { search: /empower your team/gi, replace: "train your team" },
  { search: /seamlessly integrate/gi, replace: "plug into your existing tools" },
  { search: /unlock the full potential/gi, replace: "" },
  { search: /game-changing/gi, replace: "" },
  { search: /state-of-the-art/gi, replace: "" },
  { search: /\brobust\b/gi, replace: "reliable" },
  { search: /scalable solutions/gi, replace: "solutions that grow with you" },
  { search: /\bstreamline\b/gi, replace: "simplify" },
  { search: /in today's fast-paced world/gi, replace: "" },
  { search: /harness the power of AI/gi, replace: "" },
  { search: /your AI journey/gi, replace: "" },
  { search: /paradigm shift/gi, replace: "" },
  { search: /at the forefront/gi, replace: "" },
  { search: /innovative solutions/gi, replace: "targeted implementations" },
  { search: /viewport=\{\{\s*once:\s*true\s*\}\}/g, replace: 'viewport={{ once: true, margin: "-80px" }}' },
];

tsxFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  replacements.forEach(r => {
    content = content.replace(r.search, r.replace);
  });
  
  // Clean up any double spaces or broken periods from replacements
  content = content.replace(/ \./g, '.');
  content = content.replace(/  +/g, ' ');

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated', file);
  }
});
