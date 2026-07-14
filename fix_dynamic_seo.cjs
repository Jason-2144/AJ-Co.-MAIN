const fs = require('fs');

function applyToServiceDetail() {
  let content = fs.readFileSync('src/pages/ServiceDetail.tsx', 'utf8');
  if (!content.includes('import SEO')) {
    content = content.replace("import { CheckCircle2 } from 'lucide-react';", "import { CheckCircle2 } from 'lucide-react';\nimport SEO from '../components/SEO';");
  }
  const seoTag = `<SEO title={\`\${data.headline} | AJ & Co.\`} description={data.sub} canonicalUrl={\`/services/\${id}\`} />`;
  if (!content.includes('<SEO')) {
    content = content.replace("return (\n  <>\n", `return (\n  <>\n    ${seoTag}\n`);
    content = content.replace("return (\n    <>\n", `return (\n    <>\n      ${seoTag}\n`);
    // wait, what if the return is just "return ("
    content = content.replace("return (\n    <>\n      <section", `return (\n    <>\n      ${seoTag}\n      <section`);
  }
  // Let's use a safer replacement
  content = content.replace(/return\s*\(\s*<>/, `return (\n    <>\n      ${seoTag}`);
  fs.writeFileSync('src/pages/ServiceDetail.tsx', content);
}

function applyToCaseStudyDetail() {
  let content = fs.readFileSync('src/pages/CaseStudyDetail.tsx', 'utf8');
  if (!content.includes('import SEO')) {
    content = content.replace("import { ArrowLeft } from 'lucide-react';", "import { ArrowLeft } from 'lucide-react';\nimport SEO from '../components/SEO';");
  }
  const seoTag = `<SEO title={\`\${study.title} | AJ & Co.\`} description={study.overview} canonicalUrl={\`/case-studies/\${id}\`} />`;
  if (!content.includes('<SEO')) {
    content = content.replace(/return\s*\(\s*<>/, `return (\n    <>\n      ${seoTag}`);
    content = content.replace(/return\s*\(\s*<div/, `return (\n    <>\n      ${seoTag}\n    <div`);
    // Make sure we close <> if we opened it for <div
    if (content.includes(`return (\n    <>\n      ${seoTag}\n    <div`)) {
       content = content.replace(/(\s*)(\);\n}\n?)$/, '$1</>\n$2');
    }
  }
  fs.writeFileSync('src/pages/CaseStudyDetail.tsx', content);
}

applyToServiceDetail();
applyToCaseStudyDetail();
