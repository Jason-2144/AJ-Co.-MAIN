import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const BASE_URL = 'https://ajandco.vercel.app';

type ServiceSchema = {
  name: string;
  description?: string;
  serviceType?: string;
  url?: string;
};

type Props = {
  title?: string;
  description?: string;
  keywords?: string;
  url?: string;
  image?: string;
  service?: ServiceSchema | null;
};

export default function SEO({ title, description, keywords, url, image, service }: Props) {
  const location = useLocation();
  const canonical = url || `${BASE_URL}${location.pathname}`;
  const metaTitle = title || 'AJ & Co.';
  const metaDesc = description || 'AJ & Co. helps businesses automate workflows and build AI systems that generate measurable business results.';
  const metaImage = image || `${BASE_URL}/og-image.png`;

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: 'AJ & Co.',
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    email: 'team.ajandco@gmail.com',
    telephone: '+918500071123',
    sameAs: []
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: 'AJ & Co.',
    url: BASE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${BASE_URL}/?s={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  const serviceSchema = service ? {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description || metaDesc,
    serviceType: service.serviceType || undefined,
    provider: { "@type": "Organization", name: 'AJ & Co.', url: BASE_URL },
    url: service.url || canonical
  } : null;

  return (
    <Helmet>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDesc} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:url" content={canonical} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDesc} />
      <meta name="twitter:image" content={metaImage} />

      {/* JSON-LD structured data */}
      <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
      {serviceSchema && <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>}
    </Helmet>
  );
}
