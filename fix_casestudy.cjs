const fs = require('fs');
let content = fs.readFileSync('src/pages/CaseStudyDetail.tsx', 'utf8');
if (!content.includes('import SEO')) {
  content = `import SEO from '../components/SEO';\n` + content;
  fs.writeFileSync('src/pages/CaseStudyDetail.tsx', content);
}
