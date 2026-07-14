const fs = require('fs');
const path = require('path');

const pages = [
  { file: 'Contact.tsx', url: '/contact', title: 'Contact | AJ & Co.', desc: 'Get in touch to discuss your AI or web project.' },
  { file: 'PrivacyPolicy.tsx', url: '/privacy-policy', title: 'Privacy Policy | AJ & Co.', desc: 'Our privacy policy and data handling practices.' },
  { file: 'TermsOfService.tsx', url: '/terms-of-service', title: 'Terms of Service | AJ & Co.', desc: 'Terms and conditions for using our website and services.' }
];

for (const p of pages) {
  const filePath = path.join(__dirname, 'src/pages', p.file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (!content.includes('import SEO')) {
    content = `import SEO from '../components/SEO';\n` + content;
  }
  
  const seoTag = `<SEO title="${p.title}" description="${p.desc}" canonicalUrl="${p.url}" />`;
  
  if (!content.includes('<SEO')) {
    content = content.replace(/return\s*\(\s*<section/, `return (\n    <>\n      ${seoTag}\n    <section`);
    content = content.replace(/return\s*\(\s*<div/, `return (\n    <>\n      ${seoTag}\n    <div`);
    
    // Close <> at the end
    if (content.includes(`return (\n    <>\n      ${seoTag}\n    <section`) || content.includes(`return (\n    <>\n      ${seoTag}\n    <div`)) {
      content = content.replace(/(\s*)(\);\n}\n?)$/, '$1</>\n$2');
    }
  }

  fs.writeFileSync(filePath, content);
}
