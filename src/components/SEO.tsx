import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  type?: string;
}

export default function SEO({ title, description, canonicalUrl, type = 'website' }: SEOProps) {
  const siteUrl = 'https://ajandco.site';
  const fullCanonicalUrl = canonicalUrl ? `${siteUrl}${canonicalUrl}` : siteUrl;
  // Ensure the title has the brand suffix if it's not the home page (or manage it directly in the props)
  const fullTitle = title.includes('AJ & Co.') ? title : `${title} | AJ & Co.`;

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullCanonicalUrl} />
      <meta name="robots" content="index, follow" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content="AJ & Co. builds high-converting websites and AI automation systems that help businesses attract more customers, streamline operations, and scale faster." />
      <meta property="og:image" content={`${siteUrl}/og-image.jpg`} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullCanonicalUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content="AJ & Co. builds high-converting websites and AI automation systems that help businesses attract more customers, streamline operations, and scale faster." />
      <meta property="twitter:image" content={`${siteUrl}/og-image.jpg`} />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": type === 'article' ? 'Article' : 'WebSite',
          "name": fullTitle,
          "url": fullCanonicalUrl,
          "description": description,
          "publisher": {
            "@type": "Organization",
            "name": "AJ & Co.",
            "url": siteUrl
          }
        })}
      </script>
    </Helmet>
  );
}
