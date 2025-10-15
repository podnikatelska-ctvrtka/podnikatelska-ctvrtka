/**
 * SEO utilities and metadata
 */

export const siteConfig = {
  name: "Podnikatelská čtvrtka",
  title: "Podnikatelská čtvrtka - Online kurz Business Model Canvas",
  description: "Naučte se vytvořit ziskový byznys model za 4 týdny. Kompletní online kurz s Business Model Canvas a Value Proposition Canvas.",
  url: "https://podnikatelskactvrtka.cz",
  ogImage: "/og-image.png",
  links: {
    email: "kurz@podnikatelskactvrtka.cz"
  }
};

export interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
}

export function generateMetadata({
  title,
  description,
  image,
  url,
  type = "website"
}: SEOProps = {}) {
  const metaTitle = title 
    ? `${title} | ${siteConfig.name}` 
    : siteConfig.title;
  
  const metaDescription = description || siteConfig.description;
  const metaImage = image || siteConfig.ogImage;
  const metaUrl = url || siteConfig.url;

  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      type,
      url: metaUrl,
      title: metaTitle,
      description: metaDescription,
      images: [
        {
          url: metaImage,
          width: 1200,
          height: 630,
          alt: metaTitle
        }
      ],
      siteName: siteConfig.name
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [metaImage]
    }
  };
}

// Structured data pro Rich Snippets
export function generateCourseStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Podnikatelská čtvrtka",
    "description": "Online kurz Business Model Canvas a Value Proposition Canvas",
    "provider": {
      "@type": "Organization",
      "name": "Podnikatelská čtvrtka",
      "url": siteConfig.url
    },
    "offers": {
      "@type": "Offer",
      "category": "Online kurz",
      "priceCurrency": "CZK"
    },
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "online",
      "courseWorkload": "PT4W"
    }
  };
}

// FAQ Structured Data
export function generateFAQStructuredData(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}
