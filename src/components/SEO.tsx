import React from 'react';
import { useLocation } from 'react-router-dom';

const BASE_URL = 'https://ajandco.ai';

type Props = {
  title?: string;
  description?: string;
  keywords?: string;
  url?: string;
  image?: string;
};

function setMetaTag({ attr, key, value }: { attr: 'name' | 'property' | 'itemprop'; key: string; value: string }) {
  if (!value) return;
  const selector = `${attr}="${key}"`;
  let el = document.head.querySelector(`meta[${selector}]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
}

function setLinkRel(rel: string, href: string) {
  if (!href) return;
  let el = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function setJsonLd(id: string, obj: object) {
  if (!obj) return;
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement('script');
    el.id = id;
    el.type = 'application/ld+json';
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(obj);
}

export default function SEO({ title, description, keywords, url, image }: Props) {
  const location = useLocation();
  const canonical = url || `${BASE_URL}${location.pathname}`;
  const metaTitle = title || 'AJ & Co.';
  const metaDesc = description || 'AJ & Co. helps businesses automate workflows and build AI systems that generate measurable business results.';
  const metaImage = image || `${BASE_URL}/og-image.png`;

  React.useEffect(() => {
    const previousTitle = document.title;
    document.title = metaTitle;

    setMetaTag({ attr: 'name', key: 'description', value: metaDesc });
    if (keywords) setMetaTag({ attr: 'name', key: 'keywords', value: keywords });

    setMetaTag({ attr: 'property', key: 'og:title', value: metaTitle });
    setMetaTag({ attr: 'property', key: 'og:description', value: metaDesc });
    setMetaTag({ attr: 'property', key: 'og:image', value: metaImage });
    setMetaTag({ attr: 'property', key: 'og:url', value: canonical });
    setMetaTag({ attr: 'property', key: 'og:type', value: 'website' });

    setMetaTag({ attr: 'name', key: 'twitter:card', value: 'summary_large_image' });
    setMetaTag({ attr: 'name', key: 'twitter:title', value: metaTitle });
    setMetaTag({ attr: 'name', key: 'twitter:description', value: metaDesc });
    setMetaTag({ attr: 'name', key: 'twitter:image', value: metaImage });

    setLinkRel('canonical', canonical);

    const orgSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: 'AJ & Co.',
      url: BASE_URL,
      logo: `${BASE_URL}/logo.png`,
      email: 'team.ajandco@gmail.com',
      telephone: '+918500071123',
      sameAs: []
    };
    setJsonLd('ajandco-org-schema', orgSchema);

    return () => {
      document.title = previousTitle;
    };
  }, [metaTitle, metaDesc, keywords, metaImage, canonical]);

  return null;
}
