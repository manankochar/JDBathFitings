import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = "JD Bath Fittings - Premium Bathroom Fittings & Sanitaryware",
  description = "Leading supplier of premium bathroom fittings, sanitaryware, faucets, showers, and accessories in Delhi. German engineering, world-class quality. Shop luxury bath products.",
  keywords = "bath fittings, sanitaryware, bathroom fittings, faucets, shower systems, toilet seats, wash basins, bathroom accessories, luxury bathroom, premium sanitaryware, JD Bath Fittings, bathroom products Delhi, health faucets, towel rails, plumbing fittings, bathroom mixers, overhead showers, rain showers",
  ogTitle,
  ogDescription,
  ogImage = "https://jdbathfittings.com/jankidas-logo.png",
  ogUrl,
  canonical
}) => {
  const siteUrl = "https://jdbathfittings.com";
  const finalOgTitle = ogTitle || title;
  const finalOgDescription = ogDescription || description;
  const finalOgUrl = ogUrl || (typeof window !== 'undefined' ? window.location.href : siteUrl);
  const finalCanonical = canonical || finalOgUrl;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Store",
    "name": "JD Bath Fittings",
    "description": "Premium bathroom fittings and sanitaryware supplier in Delhi",
    "url": siteUrl,
    "logo": `${siteUrl}/jankidas-logo.png`,
    "image": ogImage,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Delhi",
      "addressCountry": "IN"
    },
    "telephone": "+91-8527161330",
    "email": "jd95royal@gmail.com",
    "priceRange": "₹₹₹",
    "openingHours": "Mo-Sa 09:00-19:00",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "127"
    }
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={finalOgUrl} />
      <meta property="og:title" content={finalOgTitle} />
      <meta property="og:description" content={finalOgDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="JD Bath Fittings" />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={finalOgUrl} />
      <meta property="twitter:title" content={finalOgTitle} />
      <meta property="twitter:description" content={finalOgDescription} />
      <meta property="twitter:image" content={ogImage} />

      {/* Canonical URL */}
      <link rel="canonical" href={finalCanonical} />

      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="author" content="JD Bath Fittings" />
      <meta name="geo.region" content="IN-DL" />
      <meta name="geo.placename" content="Delhi" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default SEO;
