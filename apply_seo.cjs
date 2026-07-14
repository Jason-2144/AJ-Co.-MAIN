const fs = require('fs');
const path = require('path');

const pages = [
  { file: 'Home.tsx', url: '/', title: 'AJ & Co. | Enterprise AI & Full-Stack Web Development', desc: 'We build production-ready AI agents, workflow automations, and web systems for growing businesses.' },
  { file: 'About.tsx', url: '/about', title: 'About Us | AJ & Co.', desc: 'AJ & Co. is a team of AI engineers and full-stack developers building real solutions for businesses.' },
  { file: 'Services.tsx', url: '/services', title: 'Services | AJ & Co.', desc: 'From AI opportunity assessments to custom agents and full web systems.' },
  { file: 'Process.tsx', url: '/process', title: 'Our Process | AJ & Co.', desc: 'How we build scalable AI solutions and web applications.' },
  { file: 'CaseStudies.tsx', url: '/case-studies', title: 'Case Studies | AJ & Co.', desc: 'See how we have transformed businesses with AI and web development.' },
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
  
  // Find return ( <> or return ( <div> to insert the SEO tag right after the opening tag
  if (content.includes('return (\n    <>')) {
    content = content.replace('return (\n    <>', `return (\n    <>\n      ${seoTag}`);
  } else if (content.includes('return (\n  <>')) {
    content = content.replace('return (\n  <>', `return (\n  <>\n      ${seoTag}`);
  } else if (content.includes('return (\n    <div')) {
    content = content.replace('return (\n    <div', `return (\n    <>\n      ${seoTag}\n    <div`);
    // and close it at the end
    content = content.replace(/(\s*)(\);\n}\n)$/, '$1</>\n$2');
  } else if (content.includes('return (\n  <div')) {
    content = content.replace('return (\n  <div', `return (\n  <>\n      ${seoTag}\n  <div`);
    // and close it at the end
    content = content.replace(/(\s*)(\);\n}\n?)$/, '$1</>\n$2');
  } else if (content.includes('return (\n    <main')) {
    content = content.replace('return (\n    <main', `return (\n    <>\n      ${seoTag}\n    <main`);
    content = content.replace(/(\s*)(\);\n}\n?)$/, '$1</>\n$2');
  } else if (content.includes('return (\n  <main')) {
    content = content.replace('return (\n  <main', `return (\n  <>\n      ${seoTag}\n  <main`);
    content = content.replace(/(\s*)(\);\n}\n?)$/, '$1</>\n$2');
  } else if (content.includes('return <>')) {
    content = content.replace('return <>', `return <>\n      ${seoTag}`);
  } else if (content.includes('return <div')) {
    content = content.replace('return <div', `return <>\n      ${seoTag}\n      <div`);
    content = content.replace(/(\s*)(\);\n}\n?)$/, '$1</>\n$2');
  }

  fs.writeFileSync(filePath, content);
}
