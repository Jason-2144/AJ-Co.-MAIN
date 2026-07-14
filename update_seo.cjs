const fs = require('fs');

let content = fs.readFileSync('src/components/SEO.tsx', 'utf8');
content = content.replace(
  '<link rel="canonical" href={fullCanonicalUrl} />',
  '<link rel="canonical" href={fullCanonicalUrl} />\n      <meta name="robots" content="index, follow" />'
);

fs.writeFileSync('src/components/SEO.tsx', content);
