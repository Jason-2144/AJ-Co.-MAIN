const fs = require('fs');

let content = fs.readFileSync('public/sitemap.xml', 'utf8');

const additionalUrls = `
  <url>
    <loc>https://ajandco.site/case-studies/ecommerce-support-automation</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://ajandco.site/case-studies/sales-lead-qualification</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://ajandco.site/case-studies/internal-operations-assistant</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>`;

content = content.replace('</urlset>', additionalUrls);
fs.writeFileSync('public/sitemap.xml', content);
