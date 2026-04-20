export type Language = "en" | "ar" | "zh" | "ru";

export const languageNames: Record<Language, string> = {
  en: "English",
  ar: "العربية",
  zh: "中文",
  ru: "Русский",
};

export const isRTL = (lang: Language) => lang === "ar";

export type TranslationKeys = {
  nav: {
    home: string;
    about: string;
    services: string;
    howWeWork: string;
    compliance: string;
    clients: string;
    contact: string;
    privacy: string;
    pricing: string;
    downloads: string;
    visa: string;
  };
  hero: {
    badge: string;
    title1: string;
    title2: string;
    title3: string;
    subtitle: string;
    cta: string;
    learnMore: string;
    browseProducts: string;
    badges: string[];
  };
  intro: {
    label: string;
    title1: string;
    title2: string;
    description: string;
    stat1: string;
    stat1Label: string;
    stat2: string;
    stat2Label: string;
  };
  servicesSection: {
    title: string;
    subtitle: string;
    advisory: string;
    advisoryDesc: string;
    coordination: string;
    coordinationDesc: string;
    software: string;
    softwareDesc: string;
  };
  whyChoose: {
    title1: string;
    title2: string;
    subtitle: string;
    b2b: string;
    b2bDesc: string;
    milestone: string;
    milestoneDesc: string;
    compliance: string;
    complianceDesc: string;
  };
  cta: {
    title: string;
    subtitle: string;
    button: string;
    foundationLabel: string;
    foundationTitle: string;
    foundationHighlight: string;
    foundationBrowse: string;
    foundationView: string;
  };
  about: {
    label: string;
    title1: string;
    title2: string;
    title3: string;
    p1: string;
    p2: string;
    p3: string;
    philosophyTitle: string;
    philosophySubtitle: string;
    items: string[];
    geoTitle1: string;
    geoTitle2: string;
    geoSubtitle: string;
    regions: string[];
  };
  servicesPage: {
    label: string;
    title1: string;
    title2: string;
    subtitle: string;
    advisoryTitle: string;
    advisoryItems: string[];
    advisoryNote: string;
    coordTitle: string;
    coordItems: string[];
    coordNote: string;
    techTitle: string;
    techItems: string[];
    techNote: string;
    commercialTitle: string;
    commercialItems: string[];
    commercialNote: string;
    travelTitle: string;
    travelItems: string[];
    travelNote: string;
  };
  howWeWorkPage: {
    label: string;
    title1: string;
    title2: string;
    subtitle: string;
    steps: { title: string; desc: string }[];
    billingTitle: string;
    billingSubtitle: string;
    billingItems: string[];
  };
  compliancePage: {
    label: string;
    title1: string;
    title2: string;
    subtitle: string;
    internalTitle: string;
    internalItems: string[];
    amlTitle: string;
    amlItems: string[];
    noEngageTitle: string;
    noEngageItems: string[];
    paymentsTitle: string;
    paymentsB2BHeading: string;
    paymentsB2B: string;
    paymentsB2CHeading: string;
    paymentsB2C: string;
  };
  clientsPage: {
    label: string;
    title1: string;
    title2: string;
    subtitle: string;
    types: string[];
    note: string;
  };
  contactPage: {
    label: string;
    title1: string;
    title2: string;
    subtitle: string;
    address: string;
    addressValue: string;
    email: string;
    phone: string;
    phoneValue: string;
    formTitle: string;
    nameLabel: string;
    namePlaceholder: string;
    companyLabel: string;
    companyPlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submit: string;
    successTitle: string;
    successDesc: string;
  };
  footer: {
    description: string;
    paymentsNote: string;
    services: string;
    company: string;
    contactTitle: string;
    address1: string;
    address2: string;
    getInTouch: string;
    rights: string;
    terms: string;
    privacy: string;
    legal: string;
    advisoryLink: string;
    coordinationLink: string;
    softwareLink: string;
    licenseLine: string;
  };
  termsPage: {
    label: string;
    title1: string;
    title2: string;
    items: string[];
    paymentTermsTitle: string;
    paymentTermsIntro: string;
    paymentTermsB2B: string;
    paymentTermsB2C: string;
    paymentTermsClosing: string;
  };
  privacyPage: {
    label: string;
    title1: string;
    title2: string;
    meta: string;
    sections: { h: string; paragraphs?: string[]; items?: string[] }[];
    contactNote: string;
  };
  pricingPage: {
    label: string;
    title1: string;
    title2: string;
    subtitle: string;
    monthly: string;
    annual: string;
    save: string;
    perMonth: string;
    billedAnnually: string;
    fineprint: string;
    cta: string;
    plans: {
      name: string;
      badge?: string;
      desc: string;
      monthly: number;
      annual: number;
      included: string[];
      excluded: string[];
      featured?: boolean;
    }[];
    faqTitle1: string;
    faqTitle2: string;
    faqs: { q: string; a: string }[];
  };
  downloadsPage: {
    label: string;
    title1: string;
    title2: string;
    subtitle: string;
    digitalTitle1: string;
    digitalTitle2: string;
    digitalSubtitle: string;
    items: { tagLabel: string; title: string; desc: string; price: string }[];
    bundlesTitle1: string;
    bundlesTitle2: string;
    bundlesSubtitle: string;
    bundles: { label: string; title: string; desc: string; includes: string[]; price: string; sub: string }[];
    stepsTitle1: string;
    stepsTitle2: string;
    steps: { t: string; d: string }[];
    enquire: string;
    getStarted: string;
  };
  visaPage: {
    label: string;
    title1: string;
    title2: string;
    subtitle: string;
    stats: { n: string; l: string }[];
    destTitle1: string;
    destTitle2: string;
    destSubtitle: string;
    destinations: { code: string; name: string; tag: string }[];
    countryDetails: { code: string; name: string; types: { cat: string; req: string; duration: string; processing: string }[]; note: string }[];
    detailLabel: string;
    detailDuration: string;
    detailProcessing: string;
    detailRequirements: string;
    detailSelectPrompt: string;
    visaScoreCTA: string;
    regionsTitle1: string;
    regionsTitle2: string;
    regions: { title: string; countries: string }[];
    whyTitle1: string;
    whyTitle2: string;
    why: { title: string; desc: string }[];
    investTitle1: string;
    investTitle2: string;
    investSubtitle: string;
    investments: {
      country: string;
      program: string;
      invest: string;
      investLabel: string;
      pills: string[];
      features: string[];
      note: string;
    }[];
    ctaTitle: string;
    ctaSubtitle: string;
    ctaButton: string;
  };
};
