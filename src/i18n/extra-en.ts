// Extended page content (Pricing, Downloads, Visa) — English source.
// Used by AR/RU/ZH as well; AR overrides labels, RU/ZH use EN fallbacks for now.
import { TranslationKeys } from "./types";

export const pricingPageEN: TranslationKeys["pricingPage"] = {
  label: "FLAGSHIP PRODUCT",
  title1: "Shahmco",
  title2: "E-Invoicing Platform",
  subtitle:
    "UAE FTA and ZATCA-compliant e-invoicing software, plus website creation and digital storefront packages for SMEs and enterprises across the GCC. Generate, send, and manage compliant invoices — in Arabic and English — from one platform.",
  monthly: "Monthly",
  annual: "Annual",
  save: "SAVE 20%",
  perMonth: "/mo",
  billedAnnually: "Billed annually",
  fineprint:
    "All prices exclusive of UAE VAT (5%). Annual plans billed as a single payment. Cancel or downgrade anytime with 30 days notice.",
  cta: "Start Free Trial",
  plans: [
    {
      name: "Starter",
      desc: "For freelancers and micro-businesses getting started with e-invoicing.",
      monthly: 99,
      annual: 79,
      included: [
        "UAE FTA-compliant e-invoices",
        "Up to 100 invoices / month",
        "1 user account",
        "PDF & email delivery",
        "Basic dashboard",
        "Standard support (48h)",
        "Starter website (1-page) add-on",
      ],
      excluded: ["ZATCA compliance", "API access", "Multi-entity"],
    },
    {
      name: "Professional",
      badge: "Most Popular",
      desc: "For growing SMEs requiring dual UAE + Saudi Arabia compliance.",
      monthly: 249,
      annual: 199,
      included: [
        "UAE FTA + ZATCA dual compliance",
        "Up to 500 invoices / month",
        "5 user accounts",
        "PDF, email & XML delivery",
        "Advanced dashboard & reports",
        "Priority support (12h)",
        "VAT return summary export",
        "Business website (up to 5 pages) included",
      ],
      excluded: ["API access", "Multi-entity"],
      featured: true,
    },
    {
      name: "Enterprise",
      desc: "For corporations, accountants, and multi-entity operations.",
      monthly: 599,
      annual: 479,
      included: [
        "UAE FTA + ZATCA dual compliance",
        "Unlimited invoices",
        "Unlimited users",
        "All delivery formats + API",
        "Custom dashboard & white-label",
        "Dedicated account manager",
        "VAT return summary export",
        "Full API access",
        "Multi-entity & branch support",
        "Custom website & e-commerce build",
      ],
      excluded: [],
    },
  ],
  faqTitle1: "Product",
  faqTitle2: "FAQs",
  faqs: [
    {
      q: "Is the e-invoicing platform available now?",
      a: "The platform is currently completing accreditation with UAE FTA and ZATCA. Early access and free trials are available — contact us to be first on the list.",
    },
    {
      q: "Can I pay in installments?",
      a: "Yes. Flexible installment payment options are available for qualifying purchases. Details are presented at checkout based on your location and order value.",
    },
    {
      q: "Are digital downloads refundable?",
      a: "Digital products are non-refundable once downloaded and accessed. If you experience a technical issue preventing access, contact our support team within 48 hours of purchase.",
    },
    {
      q: "Are prices inclusive of tax?",
      a: "All displayed prices are exclusive of applicable taxes. A tax invoice is issued automatically upon payment, referencing TRN: 105208778800001.",
    },
    {
      q: "Can I upgrade my plan later?",
      a: "Yes. You can upgrade at any time and pay only the pro-rated difference. Downgrades take effect at the next billing cycle with 30 days notice.",
    },
    {
      q: "Are service bundles available internationally?",
      a: "Digital downloads and advisory bundles are available globally. On-site service delivery is primarily available in the UAE and GCC region.",
    },
  ],
};

export const downloadsPageEN: TranslationKeys["downloadsPage"] = {
  label: "DIGITAL RESOURCES",
  title1: "Downloads &",
  title2: "Service Bundles",
  subtitle:
    "Ready-to-use guides, templates, and compliance kits — purchased online and delivered instantly. Plus fixed-scope service bundles for businesses that want results without open-ended engagements.",
  digitalTitle1: "Digital",
  digitalTitle2: "Resources",
  digitalSubtitle:
    "Ready-to-use guides, templates, and compliance kits — purchased online and delivered instantly to your inbox.",
  items: [
    {
      tagLabel: "PDF Guide",
      title: "UAE Business Setup Guide 2025",
      desc: "40-page step-by-step guide covering mainland LLC, free zone, and offshore options. Includes cost tables and timeline estimates.",
      price: "AED 149",
    },
    {
      tagLabel: "Templates",
      title: "Commercial Contract Bundle",
      desc: "8 professionally drafted templates: NDA, Service Agreement, MOU, Consultancy Agreement, and more — UAE-law compliant.",
      price: "AED 199",
    },
    {
      tagLabel: "Compliance Kit",
      title: "UAE VAT & FTA Compliance Kit",
      desc: "FTA registration checklist, VAT invoice requirements, e-invoicing readiness guide, and filing calendar — updated 2025.",
      price: "AED 249",
    },
    {
      tagLabel: "Launch Kit",
      title: "E-Commerce UAE Launch Checklist",
      desc: "Complete step-by-step checklist to launch a compliant e-commerce operation in the UAE, including payment gateway and licensing.",
      price: "AED 99",
    },
    {
      tagLabel: "Bundle",
      title: "GCC Market Entry Pack",
      desc: "Market entry briefing documents for UAE, Saudi Arabia, and Kuwait — regulatory overview, commercial registration, and key contacts.",
      price: "AED 349",
    },
    {
      tagLabel: "Templates",
      title: "Business Plan & Pitch Template",
      desc: "Investor-ready bilingual business plan template (English/Arabic) with financial projection tables and executive summary framework.",
      price: "AED 179",
    },
    {
      tagLabel: "Consultation",
      title: "Visa Consultation — Individual",
      desc: "30-minute one-on-one advisory session covering visa requirements, document checklist, and application guidance for your chosen destination.",
      price: "USD 20",
    },
    {
      tagLabel: "Consultation",
      title: "Visa Consultation — Family",
      desc: "30-minute family-focused advisory session covering joint visa applications, dependent documentation, and travel planning for family destinations.",
      price: "USD 50",
    },
  ],
  bundlesTitle1: "Ready-to-Deploy",
  bundlesTitle2: "Service Bundles",
  bundlesSubtitle:
    "Fixed-scope, fixed-price packages for businesses that want results without the uncertainty of open-ended engagements.",
  bundles: [
    {
      label: "Digital Bundle",
      title: "Business Digital Launchpad",
      desc:
        "Everything a new business needs to establish a professional digital presence — delivered within 5 working days.",
      includes: [
        "5-page professional website",
        "Business email setup (up to 5 accounts)",
        "Google Workspace configuration",
        "Basic SEO setup",
        "1 month post-launch support",
      ],
      price: "AED 1,499",
      sub: "One-time payment · Delivered in 5 days",
    },
    {
      label: "E-Commerce Bundle",
      title: "E-Commerce Store Setup",
      desc:
        "A complete, payment-ready online store — built, tested, and handed over, ready to sell from day one.",
      includes: [
        "Full e-commerce store build",
        "Payment gateway integration",
        "Product catalogue setup (up to 50 products)",
        "Mobile-responsive design",
        "2 weeks post-launch support",
      ],
      price: "AED 2,999",
      sub: "One-time payment · Delivered in 10 days",
    },
    {
      label: "Advisory Bundle",
      title: "Business Advisory Starter Pack",
      desc:
        "Three months of structured advisory support to establish your UAE business operations with clarity and compliance.",
      includes: [
        "Initial business structure consultation",
        "UAE FTA registration guidance",
        "3x monthly advisory sessions (1hr each)",
        "Document review and drafting support",
        "Email support throughout",
      ],
      price: "AED 2,499",
      sub: "3-month package · Invoiced monthly",
    },
  ],
  stepsTitle1: "How to",
  stepsTitle2: "Buy",
  steps: [
    { t: "Choose Your Product", d: "Select a subscription plan, digital download, or service bundle that fits your needs." },
    { t: "Secure Checkout", d: "Pay online by card, mobile wallet, or installment plan. Bank transfer available for service bundles and larger engagements." },
    { t: "Instant Delivery", d: "Digital downloads sent immediately to your email. Platform access activated within minutes." },
    { t: "Ongoing Support", d: "All purchases include dedicated support. Service bundles include direct coordination with our team." },
  ],
  enquire: "Enquire",
  getStarted: "Get Started",
};

export const visaPageEN: TranslationKeys["visaPage"] = {
  label: "VISA & IMMIGRATION SERVICES",
  title1: "Expert Visa Consultation",
  title2: "& Application Support",
  subtitle:
    "Navigate your visa process with clarity and confidence. Professional guidance for tourist, business, residence, and investment visas — ensuring your application is accurate, complete, and aligned with current requirements.",
  stats: [
    { n: "14+", l: "Destinations" },
    { n: "30+", l: "Visa Categories" },
    { n: "24/7", l: "WhatsApp Support" },
    { n: "USD 20", l: "Starting From" },
  ],
  destTitle1: "Popular",
  destTitle2: "Destinations",
  destSubtitle:
    "Select your destination to view visa types, requirements, processing times, and application guidance.",
  destinations: [
    { code: "SA", name: "Saudi Arabia", tag: "E-Visa Available" },
    { code: "AE", name: "United Arab Emirates", tag: "Visa on Arrival" },
    { code: "GB", name: "United Kingdom", tag: "Standard Visitor" },
    { code: "US", name: "United States", tag: "B1/B2 Tourist" },
    { code: "CA", name: "Canada", tag: "Visitor / Express Entry" },
    { code: "EU", name: "Schengen Europe", tag: "27 Countries" },
    { code: "JP", name: "Japan", tag: "Short-Stay Visa" },
    { code: "IE", name: "Ireland", tag: "Short & Long Stay" },
    { code: "TR", name: "Turkey", tag: "e-Visa" },
    { code: "ID", name: "Indonesia", tag: "Visa on Arrival" },
    { code: "GE", name: "Georgia", tag: "Visa-Free 365 Days" },
    { code: "CN", name: "China", tag: "L / M / Transit" },
  ],
  countryDetails: [
    {
      code: "JP", name: "Japan",
      types: [
        { cat: "Tourist (Short-Stay)", req: "Valid passport · Return ticket · Bank statements (3 months) · Hotel bookings · Itinerary · No-objection letter if employed", duration: "Up to 90 days", processing: "5–10 business days" },
        { cat: "Business", req: "Invitation letter from Japanese company · Company registration docs · Employment letter", duration: "Up to 90 days", processing: "5–10 business days" },
        { cat: "Student / Cultural", req: "Admission letter from Japanese institution · Financial evidence · CoE (Certificate of Eligibility)", duration: "Duration of course", processing: "3–4 weeks" },
      ],
      note: "Japan visa is applied through the Japanese Embassy or consulate in your country of residence. No direct online application exists for tourist visas.",
    },
    {
      code: "EU", name: "Schengen (Europe)",
      types: [
        { cat: "Tourist / Visit (Type C)", req: "Valid passport (min. 3 months beyond stay) · Travel insurance (€30,000 min. cover) · Return ticket · Hotel bookings · Bank statements · Employment proof", duration: "Up to 90 days in 180-day period", processing: "15 calendar days (extendable to 45)" },
        { cat: "Business", req: "Invitation from EU company · Business registration · Employment letter · Insurance", duration: "Up to 90 days", processing: "15–30 days" },
        { cat: "Long-Stay (Type D)", req: "Purpose-specific — study, work, or family reunification. Issued by individual country consulate.", duration: "Over 90 days", processing: "Varies by country" },
      ],
      note: "Schengen covers 27 European countries. Apply at the embassy of your primary destination or longest stay.",
    },
    {
      code: "TR", name: "Turkey",
      types: [
        { cat: "e-Visa (Tourist / Business)", req: "Valid passport · Credit/debit card · Email address · Return ticket recommendation", duration: "30–90 days", processing: "Instant to 24 hours online" },
        { cat: "Long-Stay / Residence", req: "Applied through Turkish consulate · Purpose documentation · Financial proof", duration: "Over 90 days", processing: "2–4 weeks" },
      ],
      note: "Most nationalities can obtain an e-Visa for Turkey online at evisa.gov.tr. UAE residents may qualify for visa-on-arrival.",
    },
    {
      code: "US", name: "United States",
      types: [
        { cat: "B-1/B-2 Tourist / Business", req: "DS-160 form · Embassy interview · Passport · Financial evidence · Ties to home country", duration: "Up to 6 months per entry", processing: "Varies — weeks to months" },
        { cat: "F-1 Student", req: "SEVIS payment · I-20 from US institution · DS-160 · Financial evidence · Academic transcripts", duration: "Duration of study + 60 days", processing: "4–8 weeks" },
        { cat: "H-1B Work", req: "Employer sponsorship · LCA · Specialty occupation · Lottery-based", duration: "3 years (extendable to 6)", processing: "3–6 months" },
      ],
      note: "US visa interviews are mandatory for most applicants. Our consultation helps you prepare documentation and understand the interview process.",
    },
    {
      code: "GB", name: "United Kingdom",
      types: [
        { cat: "Standard Visitor", req: "Online application · Passport · Bank statements (6 months) · Employment proof · Accommodation · Return ticket", duration: "Up to 6 months", processing: "3 weeks standard · 5 days priority" },
        { cat: "Student Visa", req: "CAS · Financial evidence (28 days in account) · English language", duration: "Course duration + 4 months", processing: "3 weeks" },
        { cat: "Skilled Worker", req: "UK job offer with sponsor licence · Salary threshold · English language · Points-based", duration: "Up to 5 years", processing: "3 weeks" },
      ],
      note: "UK visa is separate from Schengen. Applied online at gov.uk. Biometrics required at a VAC.",
    },
    {
      code: "CA", name: "Canada",
      types: [
        { cat: "Visitor Visa (TRV)", req: "Passport · Online application · Financial evidence · Return ticket · Ties to home country · Biometrics", duration: "Up to 6 months per entry", processing: "4–8 weeks" },
        { cat: "Student Permit", req: "Acceptance from DLI · Financial evidence · Language proof · Biometrics", duration: "Duration of study", processing: "8–12 weeks" },
        { cat: "Express Entry (PR)", req: "Points-based (CRS) · Work experience · Education · Language (IELTS/CELPIP)", duration: "Permanent Residence", processing: "6 months" },
      ],
      note: "Canadian immigration is managed by IRCC. Most applications are now online via the IRCC portal.",
    },
    {
      code: "AU", name: "Australia",
      types: [
        { cat: "Tourist (subclass 600)", req: "ImmiAccount · Passport · Financial evidence · Health insurance · Return ticket", duration: "3–12 months", processing: "3–8 weeks" },
        { cat: "Student (subclass 500)", req: "CoE · Financial evidence (AUD 21,041/year) · English language · Health exam", duration: "Duration of course", processing: "4–6 weeks" },
        { cat: "Skilled Independent (189)", req: "Points-tested · Skills assessment · EOI via SkillSelect · Invitation required", duration: "Permanent Residence", processing: "12–24 months" },
      ],
      note: "All Australian visa applications are submitted online through Department of Home Affairs ImmiAccount portal.",
    },
    {
      code: "CN", name: "China",
      types: [
        { cat: "Tourist (L Visa)", req: "Application form · Passport · Photo · Hotel bookings · Return ticket · Itinerary · Bank statements", duration: "30–90 days", processing: "4–7 business days" },
        { cat: "Business (M Visa)", req: "Invitation letter · Business registration · Employment letter", duration: "30–90 days", processing: "4–7 business days" },
        { cat: "Student (X Visa)", req: "Admission letter · JW201/202 form · Physical examination · Financial proof", duration: "Duration of study", processing: "2–4 weeks" },
      ],
      note: "China has introduced 144-hour visa-free transit in many cities. Apply through Chinese Embassy or authorised visa centre.",
    },
    {
      code: "SA", name: "Saudi Arabia",
      types: [
        { cat: "e-Visa Tourist", req: "Passport (6+ months) · Online application via Visit Saudi · Photo · Health insurance", duration: "Up to 90 days per entry (1-year multi)", processing: "Within minutes online" },
        { cat: "Business Visa", req: "Invitation from Saudi entity · Chamber of Commerce attestation · Employment letter", duration: "Single or multi-entry", processing: "5–10 business days" },
        { cat: "Umrah Visa", req: "Vaccination certificates · Passport · Application via licensed agent", duration: "30 days", processing: "3–5 days" },
      ],
      note: "Saudi has expanded e-Visa to 60+ nationalities. UAE residents qualify for streamlined processing.",
    },
    {
      code: "AE", name: "United Arab Emirates",
      types: [
        { cat: "Tourist Visa (30/60/90 days)", req: "Passport · Photo · Return ticket · Hotel/sponsor", duration: "30, 60, or 90 days", processing: "3–5 business days" },
        { cat: "Visa on Arrival", req: "Passport from eligible country · Return ticket", duration: "30–90 days varies", processing: "On arrival" },
        { cat: "Golden Visa (10-Year)", req: "Real estate AED 2M+ · Investment · Talent / Skilled / Founder route", duration: "10 years renewable", processing: "1–8 weeks" },
      ],
      note: "UAE offers one of the most flexible visa regimes globally. Multiple pathways for tourists, investors, and professionals.",
    },
    {
      code: "IE", name: "Ireland",
      types: [
        { cat: "Short Stay (C)", req: "Online application AVATS · Passport · Financial evidence · Travel insurance", duration: "Up to 90 days", processing: "8 weeks" },
        { cat: "Long Stay (D)", req: "Purpose-specific — study, work, family · Online application · Document attestation", duration: "Over 90 days", processing: "8–12 weeks" },
      ],
      note: "Ireland is not part of the Schengen Area. A UK visa does not cover Ireland and vice versa. Applications via INIS.",
    },
    {
      code: "ID", name: "Indonesia",
      types: [
        { cat: "Visa on Arrival (B213)", req: "Passport (6+ months) · Return ticket · USD 35 fee", duration: "30 days (extendable once)", processing: "On arrival" },
        { cat: "e-Visa B211A", req: "Online application · Sponsor in Indonesia · Passport scan · Bank statement", duration: "60 days (extendable to 180)", processing: "5 business days" },
      ],
      note: "Indonesia offers VOA to 90+ nationalities. Bali is the most popular entry point for short-term visitors.",
    },
    {
      code: "GE", name: "Georgia",
      types: [
        { cat: "Visa-Free (90+ countries)", req: "Passport (6+ months validity)", duration: "Up to 365 days continuous stay", processing: "On arrival — no application" },
        { cat: "e-Visa", req: "Online application · Passport · Photo · USD 20 fee", duration: "30 or 90 days", processing: "5–10 business days" },
      ],
      note: "Georgia offers one of the most generous visa-free regimes — 365 days of stay for 90+ nationalities including UAE residents.",
    },
  ],
  detailLabel: "COUNTRY-BY-COUNTRY",
  detailDuration: "Duration",
  detailProcessing: "Processing",
  detailRequirements: "Requirements",
  detailSelectPrompt: "Select a country above to view detailed visa categories, requirements, duration, and processing times.",
  visaScoreCTA: "Check your visa score now for free",
  regionsTitle1: "Global",
  regionsTitle2: "Coverage",
  regions: [
    { title: "Asia & Far East", countries: "Japan · China · Indonesia · Thailand · Malaysia · Singapore" },
    { title: "Europe", countries: "Schengen Area · United Kingdom · Ireland · Germany · France · Italy" },
    { title: "Middle East & GCC", countries: "Saudi Arabia · UAE · Qatar · Oman · Kuwait · Bahrain" },
    { title: "Africa", countries: "Kenya · South Africa · Tanzania · Ethiopia · Morocco · Egypt" },
    { title: "Americas", countries: "United States · Canada · Brazil · Argentina · Mexico · Colombia" },
    { title: "Australia & Oceania", countries: "Australia · New Zealand · Fiji" },
  ],
  whyTitle1: "Why Choose",
  whyTitle2: "Our Visa Service",
  why: [
    { title: "Professional & Compliant", desc: "All consultation is structured around official government requirements and publicly available immigration guidelines." },
    { title: "Accurate Documentation", desc: "We guide document preparation to maximise accuracy and completeness before you submit to authorities." },
    { title: "Up-to-Date Requirements", desc: "We actively monitor changes in visa policies, processing times, and documentation requirements across all destinations." },
    { title: "Transparent Process", desc: "We clearly communicate what we can and cannot do. No misleading claims. No guarantees of outcomes." },
    { title: "Complex Applications", desc: "We support both straightforward applications and complex cases requiring multi-step document preparation." },
    { title: "24/7 WhatsApp Support", desc: "Direct advisory team access for urgent queries, document reviews, and application status guidance." },
  ],
  investTitle1: "Investment Residency",
  investTitle2: "& Citizenship Programs",
  investSubtitle:
    "Selected golden visa, residency-by-investment, and citizenship-by-investment pathways we coordinate alongside licensed immigration partners.",
  investments: [
    {
      country: "UAE Golden Visa",
      program: "10-Year Residency by Investment",
      invest: "AED 2,000,000",
      investLabel: "Min. (real estate / public funds / talent route)",
      pills: ["Real Estate", "Business Investment", "Talent / Profession", "Startup Founders"],
      features: [
        "10-year renewable residency",
        "No national sponsor required",
        "Sponsor family members",
        "100% business ownership",
        "No minimum stay required",
      ],
      note: "UAE Golden Visa does not lead to citizenship. Tax-free residency in one of the world's fastest-growing economies.",
    },
    {
      country: "Saudi Premium Residency",
      program: "Permanent & Temporary Residency",
      invest: "SAR 800,000",
      investLabel: "One-time fee (~USD 213,000) for permanent residency",
      pills: ["Permanent Residency", "Investor Route", "Talent Route"],
      features: [
        "Live, work, invest freely in KSA",
        "Own property in Saudi Arabia",
        "Sponsor family members",
        "No employer dependency",
      ],
      note: "Saudi Premium Residency (Iqama Mumayaz) launched to attract global talent and investors to the Kingdom.",
    },
    {
      country: "Portugal Golden Visa",
      program: "Residency → EU Citizenship Pathway",
      invest: "€500,000",
      investLabel: "Investment funds / research / cultural contribution",
      pills: ["Investment Funds", "EU Citizenship Path", "Schengen Access"],
      features: [
        "EU Residency — 27 EU states",
        "Citizenship after 5 years",
        "Schengen visa-free access",
        "Only 7 days/year physical presence",
      ],
      note: "Real estate route closed since 2023. Investment funds, research donations and cultural contributions are the qualifying routes.",
    },
    {
      country: "Greece Golden Visa",
      program: "Residency by Investment",
      invest: "€250,000",
      investLabel: "Min. real estate investment (higher in Athens / Thessaloniki)",
      pills: ["Real Estate", "Most Accessible EU Program"],
      features: [
        "EU Schengen residency",
        "Citizenship path after 7 years",
        "No minimum stay required",
        "Family included (spouse + children)",
      ],
      note: "Greece remains one of the most accessible EU Golden Visa programs by investment amount.",
    },
    {
      country: "Grenada Citizenship",
      program: "Citizenship by Investment",
      invest: "USD 235,000",
      investLabel: "National Transformation Fund donation",
      pills: ["No Residency Required", "US E-2 Treaty", "140+ Visa-Free"],
      features: [
        "Second passport in 4–6 months",
        "Visa-free UK, Schengen, China, Russia",
        "US E-2 investor visa eligibility",
        "No income or wealth tax",
      ],
      note: "Grenada is the only Caribbean CBI country with a US E-2 Treaty, enabling US business visa eligibility.",
    },
    {
      country: "Turkey Citizenship",
      program: "Citizenship by Investment",
      invest: "USD 400,000",
      investLabel: "Minimum real estate purchase (held 3 years)",
      pills: ["Real Estate Route", "Dual Citizenship"],
      features: [
        "Passport in 3–6 months",
        "Visa-free / on-arrival 110+ countries",
        "Dual citizenship permitted",
        "No minimum stay required",
      ],
      note: "Turkey's real estate CBI requires property held minimum 3 years.",
    },
  ],
  ctaTitle: "Ready to start your visa journey?",
  ctaSubtitle:
    "Book a consultation to assess your eligibility, prepare documentation, and apply with confidence.",
  ctaButton: "Book a Visa Consultation",
};
