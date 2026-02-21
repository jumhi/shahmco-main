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
  };
  hero: {
    badge: string;
    title1: string;
    title2: string;
    title3: string;
    subtitle: string;
    cta: string;
    learnMore: string;
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
    services: string;
    company: string;
    contactTitle: string;
    address1: string;
    address2: string;
    getInTouch: string;
    rights: string;
    terms: string;
    advisoryLink: string;
    coordinationLink: string;
    softwareLink: string;
  };
  termsPage: {
    label: string;
    title1: string;
    title2: string;
    items: string[];
  };
};
