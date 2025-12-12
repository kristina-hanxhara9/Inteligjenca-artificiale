
export type Language = 'en' | 'sq';

export interface ContentSection {
  title: string;
  subtitle?: string;
  description?: string;
  items?: Array<{
    title: string;
    desc: string;
    icon?: string;
  }>;
  cta?: string;
}

export interface DemoSection {
  title: string;
  subtitle: string;
  smartAgent: {
    title: string;
    desc: string;
    stats: string;
    systemLabel: string;
  };
  automation: {
    title: string;
    desc: string;
  };
  booking: {
    title: string;
    desc: string;
    notification: string;
  };
  growth: {
    title: string;
    desc: string;
    revenue: string;
    efficiency: string;
  };
}

export interface CaseStudyDetails {
  id: string;
  title: string;
  clientType: string;
  heroImage: string; // Abstract representation class
  problem: {
    title: string;
    desc: string;
  };
  solution: {
    title: string;
    desc: string;
    steps: Array<{title: string, desc: string}>;
  };
  results: Array<{
    value: string;
    label: string;
  }>;
}

export interface UseCaseItem {
  id: string;
  title: string;
  category: string;
  desc: string;
  stats: string;
}

export interface Translation {
  nav: {
    home: string;
    services: string;
    useCases: string;
    about: string;
    contact: string;
    bookBtn: string;
    backBtn?: string;
  };
  hero: {
    badge: string;
    headline: string;
    subheadline: string;
    ctaPrimary: string;
    ctaSecondary: string;
    techText: string;
  };
  stats: Array<{ label: string; value: string }>;
  about: {
    title: string;
    description: string;
    cards: Array<{ title: string; desc: string }>;
  };
  services: ContentSection;
  demos: DemoSection;
  useCases: {
    title: string;
    subtitle: string;
    cases: UseCaseItem[];
    details: Record<string, CaseStudyDetails>;
  };
  reviews: {
    title: string;
    subtitle: string;
    items: Array<{
      name: string;
      role: string;
      company: string;
      text: string;
    }>;
  };
  education: {
    title: string;
    desc: string;
    points: string[];
    credentialCode: string;
    credentialLabel: string;
  };
  contact: {
    title: string;
    desc: string;
    form: {
      name: string;
      email: string;
      business: string;
      message: string;
      submit: string;
    };
  };
  footer: {
    rights: string;
    tagline: string;
    columns: {
        company: string;
        legal: string;
        social: string;
    };
    links: {
        about: string;
        services: string;
        privacy: string;
        terms: string;
    }
  };
}
