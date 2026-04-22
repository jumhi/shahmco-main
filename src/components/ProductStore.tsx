import { useState, useEffect, useRef, ChangeEvent } from "react";
import { useLanguage } from "@/i18n/useLanguage";

/* ═══════════════════════════════════════════
   BRAND TOKENS
═══════════════════════════════════════════ */
const C = {
  bg: "#07070F",
  card: "#0D0D1E",
  cardAlt: "#130E28",
  border: "#1C1C35",
  borderAlt: "#2C2050",
  gold: "#C9A227",
  goldDim: "#C9A22718",
  goldMid: "#A07818",
  purple: "#6B2D8B",
  green: "#1A7A5E",
  text: "#EDE8DC",
  muted: "#7A6E95",
  sub: "#C5C0D8",
  tabby: "#4FC3F7",
  tamara: "#CE93D8",
};

/* ═══════════════════════════════════════════
   UI STRINGS (en / ar)
═══════════════════════════════════════════ */
type Lang = "en" | "ar";
const UI = {
  en: {
    eyebrow: "◆ Premium Corporate & Digital Solutions",
    titleSuffix: "Global Store",
    intro: "Service packages, digital guides, compliance kits, and expert consultations — purchase directly or enquire for a tailored scope.",
    uae: "United Arab Emirates",
    ksa: "Saudi Arabia",
    pricesUae: "Prices in AED",
    pricesKsa: "Prices in SAR · AED & USD shown for reference",
    servicePackages: "◆ Service Packages",
    digitalResources: "◆ Digital Resources & Consultations",
    directPurchase: "⚡ Direct Purchase · B2C",
    advisoryService: "🤝 Advisory Service · B2B",
    payNow: "⚡ Pay Now",
    enquireFirst: "or Enquire First",
    enquireNow: "Enquire Now",
    personalisedScope: "Personalised scope · Payment link after assessment",
    pricingTBA: "Pricing TBA",
    notifyMe: "Notify Me 🔔",
    buyNow: "Buy Now ⚡",
    enquire: "Enquire",
    taxDisclaimer: "All prices are exclusive of applicable taxes. Tax treatment varies by client jurisdiction and registration status.",
    whyTitle: "Why Clients Choose SHAHMCO Global",
    whySub: "Precision, accountability, and GCC-grade results — every time.",
    quote: "\"Our commitment is not to simply deliver a service — it is to deliver a standard that speaks before you do.\"",
    quoteCaption: "SHAHMCO Global FZC LLC · Sharjah Publishing City Free Zone, UAE",
    orderSummary: "Order Summary",
    yourDetails: "Your Details",
    continuePayment: "Continue to Payment →",
    dataProtected: "🔒 Your data is protected and never shared",
    detailsConfirmed: "Details Confirmed",
    helloSelectPay: (n: string) => `Hello ${n} — select your payment method below.`,
    secureCheckout: "SECURE CHECKOUT",
    pciNote: "PCI-DSS compliant · Encrypted · Protected",
    selectPayment: "Select Payment Method",
    paymentNote: "🔒 Upon payment confirmation, you will receive an onboarding brief or download link within 24 hours.",
    comingSoonBadge: "🔔 Coming Soon · Beta Access",
    earlyAccessTitle: "Register for Early Access",
    enquireAboutTitle: "Enquire About This Package",
    earlyAccessDesc: "Our e-invoicing platform is currently undergoing ZATCA & FTA testing and approval. Register now to be notified at launch and receive early-adopter pricing.",
    enquireB2CDesc: "Prefer a consultation first? Fill this form — we respond within 4 business hours via email or WhatsApp.",
    enquireB2BDesc: "Our advisory scope is tailored per client. Share your details and we will prepare a proposal with payment options.",
    registerEarly: "Register for Early Access 🔔",
    submitEnquiry: "Submit Enquiry →",
    notifyAtLaunch: "We will notify you at launch · Arabic & English",
    respondHours: "We respond within 4 business hours · Arabic & English",
    registrationConfirmed: "Registration Confirmed",
    enquiryReceived: "Enquiry Received",
    thanksEarlyAccess: (n: string) => <>Thank you, <strong style={{ color: C.text }}>{n}</strong>. You are now registered for early access to the SHAHMCO E-Invoicing Platform. We will notify you when the platform receives ZATCA & FTA approval and is ready for launch.</>,
    thanksEnquiry: (n: string, isB2B: boolean) => <>Thank you, <strong style={{ color: C.text }}>{n}</strong>. Our team will respond via email or WhatsApp within 4 business hours.{isB2B && " A tailored proposal and secure payment link will follow after our initial assessment."}</>,
    urgent: <>For urgent enquiries, contact us on WhatsApp or at <strong>info@shahmco.com</strong></>,
    close: "Close",
    fullName: "Full Name *",
    fullNamePh: "Your full name",
    email: "Email Address *",
    emailPh: "your@email.com",
    company: "Company / Entity Name",
    companyPh: "Optional",
    phone: "Phone / WhatsApp *",
    phonePh: "Phone number",
    message: "Message / Requirements",
    messagePh: "Tell us about your needs…",
    clientType: "Client Type *",
    countrySearch: "🔍  Country name or dial code…",
    noResults: "No results",
    filters: { all: "All Products", downloads: "📥 Downloads", compliance: "⚖️ Compliance", consulting: "🎯 Consulting", ksa: "🇸🇦 KSA Exclusive", software: "💻 Software" },
  },
  ar: {
    eyebrow: "◆ حلول رقمية ومؤسسية متميزة",
    titleSuffix: "المتجر العالمي",
    intro: "باقات خدمية، أدلة رقمية، حزم امتثال، واستشارات متخصصة — اشترِ مباشرةً أو اطلب نطاقًا مخصصًا.",
    uae: "الإمارات العربية المتحدة",
    ksa: "المملكة العربية السعودية",
    pricesUae: "الأسعار بالدرهم الإماراتي",
    pricesKsa: "الأسعار بالريال السعودي · يُعرض الدرهم والدولار للمرجعية",
    servicePackages: "◆ باقات الخدمات",
    digitalResources: "◆ الموارد الرقمية والاستشارات",
    directPurchase: "⚡ شراء مباشر · B2C",
    advisoryService: "🤝 خدمة استشارية · B2B",
    payNow: "⚡ ادفع الآن",
    enquireFirst: "أو استفسر أولاً",
    enquireNow: "استفسر الآن",
    personalisedScope: "نطاق مخصص · رابط الدفع يُرسل بعد التقييم",
    pricingTBA: "السعر يُحدد لاحقًا",
    notifyMe: "أبلغني 🔔",
    buyNow: "اشترِ الآن ⚡",
    enquire: "استفسر",
    taxDisclaimer: "جميع الأسعار غير شاملة للضرائب المطبقة. تختلف المعاملة الضريبية حسب اختصاص العميل وحالة التسجيل.",
    whyTitle: "لماذا يختار العملاء شَهْمكو العالمية",
    whySub: "دقة، مساءلة، ونتائج بمعايير دول الخليج — في كل مرة.",
    quote: "«التزامنا ليس مجرد تقديم خدمة — بل تقديم معيار يتحدث عنك قبل أن تتحدث.»",
    quoteCaption: "شَهْمكو غلوبال FZC LLC · المنطقة الحرة لمدينة الشارقة للنشر، الإمارات",
    orderSummary: "ملخص الطلب",
    yourDetails: "بياناتك",
    continuePayment: "← المتابعة إلى الدفع",
    dataProtected: "🔒 بياناتك محمية ولا تُشارك أبدًا",
    detailsConfirmed: "تم تأكيد البيانات",
    helloSelectPay: (n: string) => `مرحبًا ${n} — اختر طريقة الدفع أدناه.`,
    secureCheckout: "دفع آمن",
    pciNote: "متوافق مع PCI-DSS · مشفّر · محمي",
    selectPayment: "اختر طريقة الدفع",
    paymentNote: "🔒 عند تأكيد الدفع، ستستلم ملف الاستعداد أو رابط التحميل خلال 24 ساعة.",
    comingSoonBadge: "🔔 قريبًا · وصول مبكر",
    earlyAccessTitle: "سجّل للوصول المبكر",
    enquireAboutTitle: "استفسر عن هذه الباقة",
    earlyAccessDesc: "منصتنا للفوترة الإلكترونية تخضع حاليًا لاختبارات واعتماد هيئة الزكاة والضريبة والجمارك السعودية والاتحادية الإماراتية. سجّل الآن لتُبلَّغ عند الإطلاق وتحصل على تسعير المتبنّين الأوائل.",
    enquireB2CDesc: "تفضل استشارة أولاً؟ املأ هذا النموذج — نرد خلال 4 ساعات عمل عبر البريد أو واتساب.",
    enquireB2BDesc: "نطاق استشاراتنا مخصص لكل عميل. شاركنا بياناتك وسنُعدّ عرضًا مع خيارات الدفع.",
    registerEarly: "سجّل للوصول المبكر 🔔",
    submitEnquiry: "← إرسال الاستفسار",
    notifyAtLaunch: "سنبلغك عند الإطلاق · بالعربية والإنجليزية",
    respondHours: "نرد خلال 4 ساعات عمل · بالعربية والإنجليزية",
    registrationConfirmed: "تم تأكيد التسجيل",
    enquiryReceived: "تم استلام الاستفسار",
    thanksEarlyAccess: (n: string) => <>شكرًا لك، <strong style={{ color: C.text }}>{n}</strong>. لقد تم تسجيلك للوصول المبكر إلى منصة شَهْمكو للفوترة الإلكترونية. سنُبلّغك عند حصولها على اعتماد ZATCA وFTA وجاهزيتها للإطلاق.</>,
    thanksEnquiry: (n: string, isB2B: boolean) => <>شكرًا لك، <strong style={{ color: C.text }}>{n}</strong>. سيرد فريقنا عبر البريد أو واتساب خلال 4 ساعات عمل.{isB2B && " وسيُتبع ذلك بعرض مخصص ورابط دفع آمن بعد التقييم الأولي."}</>,
    urgent: <>للاستفسارات العاجلة، تواصل معنا عبر واتساب أو على <strong>info@shahmco.com</strong></>,
    close: "إغلاق",
    fullName: "الاسم الكامل *",
    fullNamePh: "اسمك الكامل",
    email: "البريد الإلكتروني *",
    emailPh: "your@email.com",
    company: "اسم الشركة / الجهة",
    companyPh: "اختياري",
    phone: "الهاتف / واتساب *",
    phonePh: "رقم الهاتف",
    message: "الرسالة / المتطلبات",
    messagePh: "أخبرنا عن احتياجاتك…",
    clientType: "نوع العميل *",
    countrySearch: "🔍  اسم الدولة أو رمز الاتصال…",
    noResults: "لا توجد نتائج",
    filters: { all: "كل المنتجات", downloads: "📥 تنزيلات", compliance: "⚖️ الامتثال", consulting: "🎯 استشارات", ksa: "🇸🇦 حصري للسعودية", software: "💻 برمجيات" },
  },
} as const;

/* ═══════════════════════════════════════════
   COUNTRY CODES
═══════════════════════════════════════════ */
type Country = { iso: string; name: string; d: string };

const COUNTRIES: Country[] = [
  { iso: "AF", name: "Afghanistan", d: "93" }, { iso: "AL", name: "Albania", d: "355" }, { iso: "DZ", name: "Algeria", d: "213" },
  { iso: "AD", name: "Andorra", d: "376" }, { iso: "AO", name: "Angola", d: "244" }, { iso: "AR", name: "Argentina", d: "54" },
  { iso: "AM", name: "Armenia", d: "374" }, { iso: "AU", name: "Australia", d: "61" }, { iso: "AT", name: "Austria", d: "43" },
  { iso: "AZ", name: "Azerbaijan", d: "994" }, { iso: "BH", name: "Bahrain", d: "973" }, { iso: "BD", name: "Bangladesh", d: "880" },
  { iso: "BE", name: "Belgium", d: "32" }, { iso: "BJ", name: "Benin", d: "229" }, { iso: "BT", name: "Bhutan", d: "975" },
  { iso: "BO", name: "Bolivia", d: "591" }, { iso: "BA", name: "Bosnia & Herzegovina", d: "387" }, { iso: "BW", name: "Botswana", d: "267" },
  { iso: "BR", name: "Brazil", d: "55" }, { iso: "BN", name: "Brunei", d: "673" }, { iso: "BG", name: "Bulgaria", d: "359" },
  { iso: "BF", name: "Burkina Faso", d: "226" }, { iso: "BI", name: "Burundi", d: "257" }, { iso: "CV", name: "Cabo Verde", d: "238" },
  { iso: "KH", name: "Cambodia", d: "855" }, { iso: "CM", name: "Cameroon", d: "237" }, { iso: "CA", name: "Canada", d: "1" },
  { iso: "CF", name: "Central African Republic", d: "236" }, { iso: "TD", name: "Chad", d: "235" }, { iso: "CL", name: "Chile", d: "56" },
  { iso: "CN", name: "China", d: "86" }, { iso: "CO", name: "Colombia", d: "57" }, { iso: "KM", name: "Comoros", d: "269" },
  { iso: "CG", name: "Congo", d: "242" }, { iso: "CD", name: "Congo DRC", d: "243" }, { iso: "CR", name: "Costa Rica", d: "506" },
  { iso: "HR", name: "Croatia", d: "385" }, { iso: "CU", name: "Cuba", d: "53" }, { iso: "CY", name: "Cyprus", d: "357" },
  { iso: "CZ", name: "Czech Republic", d: "420" }, { iso: "DK", name: "Denmark", d: "45" }, { iso: "DJ", name: "Djibouti", d: "253" },
  { iso: "DO", name: "Dominican Republic", d: "1809" }, { iso: "EC", name: "Ecuador", d: "593" }, { iso: "EG", name: "Egypt", d: "20" },
  { iso: "SV", name: "El Salvador", d: "503" }, { iso: "GQ", name: "Equatorial Guinea", d: "240" }, { iso: "ER", name: "Eritrea", d: "291" },
  { iso: "EE", name: "Estonia", d: "372" }, { iso: "ET", name: "Ethiopia", d: "251" }, { iso: "FJ", name: "Fiji", d: "679" },
  { iso: "FI", name: "Finland", d: "358" }, { iso: "FR", name: "France", d: "33" }, { iso: "GA", name: "Gabon", d: "241" },
  { iso: "GM", name: "Gambia", d: "220" }, { iso: "GE", name: "Georgia", d: "995" }, { iso: "DE", name: "Germany", d: "49" },
  { iso: "GH", name: "Ghana", d: "233" }, { iso: "GR", name: "Greece", d: "30" }, { iso: "GT", name: "Guatemala", d: "502" },
  { iso: "GN", name: "Guinea", d: "224" }, { iso: "GW", name: "Guinea-Bissau", d: "245" }, { iso: "GY", name: "Guyana", d: "592" },
  { iso: "HT", name: "Haiti", d: "509" }, { iso: "HN", name: "Honduras", d: "504" }, { iso: "HU", name: "Hungary", d: "36" },
  { iso: "IS", name: "Iceland", d: "354" }, { iso: "IN", name: "India", d: "91" }, { iso: "ID", name: "Indonesia", d: "62" },
  { iso: "IR", name: "Iran", d: "98" }, { iso: "IQ", name: "Iraq", d: "964" }, { iso: "IE", name: "Ireland", d: "353" },
  { iso: "IL", name: "Israel", d: "972" }, { iso: "IT", name: "Italy", d: "39" }, { iso: "JM", name: "Jamaica", d: "1876" },
  { iso: "JP", name: "Japan", d: "81" }, { iso: "JO", name: "Jordan", d: "962" }, { iso: "KZ", name: "Kazakhstan", d: "7" },
  { iso: "KE", name: "Kenya", d: "254" }, { iso: "KW", name: "Kuwait", d: "965" }, { iso: "KG", name: "Kyrgyzstan", d: "996" },
  { iso: "LA", name: "Laos", d: "856" }, { iso: "LV", name: "Latvia", d: "371" }, { iso: "LB", name: "Lebanon", d: "961" },
  { iso: "LS", name: "Lesotho", d: "266" }, { iso: "LR", name: "Liberia", d: "231" }, { iso: "LY", name: "Libya", d: "218" },
  { iso: "LT", name: "Lithuania", d: "370" }, { iso: "LU", name: "Luxembourg", d: "352" }, { iso: "MG", name: "Madagascar", d: "261" },
  { iso: "MW", name: "Malawi", d: "265" }, { iso: "MY", name: "Malaysia", d: "60" }, { iso: "MV", name: "Maldives", d: "960" },
  { iso: "ML", name: "Mali", d: "223" }, { iso: "MT", name: "Malta", d: "356" }, { iso: "MR", name: "Mauritania", d: "222" },
  { iso: "MU", name: "Mauritius", d: "230" }, { iso: "MX", name: "Mexico", d: "52" }, { iso: "MD", name: "Moldova", d: "373" },
  { iso: "MC", name: "Monaco", d: "377" }, { iso: "MN", name: "Mongolia", d: "976" }, { iso: "ME", name: "Montenegro", d: "382" },
  { iso: "MA", name: "Morocco", d: "212" }, { iso: "MZ", name: "Mozambique", d: "258" }, { iso: "MM", name: "Myanmar", d: "95" },
  { iso: "NA", name: "Namibia", d: "264" }, { iso: "NP", name: "Nepal", d: "977" }, { iso: "NL", name: "Netherlands", d: "31" },
  { iso: "NZ", name: "New Zealand", d: "64" }, { iso: "NI", name: "Nicaragua", d: "505" }, { iso: "NE", name: "Niger", d: "227" },
  { iso: "NG", name: "Nigeria", d: "234" }, { iso: "MK", name: "North Macedonia", d: "389" }, { iso: "NO", name: "Norway", d: "47" },
  { iso: "OM", name: "Oman", d: "968" }, { iso: "PK", name: "Pakistan", d: "92" }, { iso: "PA", name: "Panama", d: "507" },
  { iso: "PG", name: "Papua New Guinea", d: "675" }, { iso: "PY", name: "Paraguay", d: "595" }, { iso: "PE", name: "Peru", d: "51" },
  { iso: "PH", name: "Philippines", d: "63" }, { iso: "PL", name: "Poland", d: "48" }, { iso: "PT", name: "Portugal", d: "351" },
  { iso: "QA", name: "Qatar", d: "974" }, { iso: "RO", name: "Romania", d: "40" }, { iso: "RU", name: "Russia", d: "7" },
  { iso: "RW", name: "Rwanda", d: "250" }, { iso: "SA", name: "Saudi Arabia", d: "966" }, { iso: "SN", name: "Senegal", d: "221" },
  { iso: "RS", name: "Serbia", d: "381" }, { iso: "SC", name: "Seychelles", d: "248" }, { iso: "SL", name: "Sierra Leone", d: "232" },
  { iso: "SG", name: "Singapore", d: "65" }, { iso: "SK", name: "Slovakia", d: "421" }, { iso: "SI", name: "Slovenia", d: "386" },
  { iso: "SO", name: "Somalia", d: "252" }, { iso: "ZA", name: "South Africa", d: "27" }, { iso: "SS", name: "South Sudan", d: "211" },
  { iso: "ES", name: "Spain", d: "34" }, { iso: "LK", name: "Sri Lanka", d: "94" }, { iso: "SD", name: "Sudan", d: "249" },
  { iso: "SE", name: "Sweden", d: "46" }, { iso: "CH", name: "Switzerland", d: "41" }, { iso: "SY", name: "Syria", d: "963" },
  { iso: "TW", name: "Taiwan", d: "886" }, { iso: "TJ", name: "Tajikistan", d: "992" }, { iso: "TZ", name: "Tanzania", d: "255" },
  { iso: "TH", name: "Thailand", d: "66" }, { iso: "TG", name: "Togo", d: "228" }, { iso: "TT", name: "Trinidad & Tobago", d: "1868" },
  { iso: "TN", name: "Tunisia", d: "216" }, { iso: "TR", name: "Turkey", d: "90" }, { iso: "TM", name: "Turkmenistan", d: "993" },
  { iso: "UG", name: "Uganda", d: "256" }, { iso: "UA", name: "Ukraine", d: "380" }, { iso: "AE", name: "United Arab Emirates", d: "971" },
  { iso: "GB", name: "United Kingdom", d: "44" }, { iso: "US", name: "United States", d: "1" }, { iso: "UY", name: "Uruguay", d: "598" },
  { iso: "UZ", name: "Uzbekistan", d: "998" }, { iso: "VU", name: "Vanuatu", d: "678" }, { iso: "VE", name: "Venezuela", d: "58" },
  { iso: "VN", name: "Vietnam", d: "84" }, { iso: "YE", name: "Yemen", d: "967" }, { iso: "ZM", name: "Zambia", d: "260" }, { iso: "ZW", name: "Zimbabwe", d: "263" },
];
const PRI = ["AE", "SA", "YE", "EG", "IQ", "SY", "JO", "LB", "KW", "QA", "BH", "OM", "GB", "US", "IN", "PK", "NG", "KE", "GH", "ET", "TZ", "PH", "MY", "SG", "FR", "DE", "IT", "TR", "MA", "TN"];
const gf = (iso: string) => iso.toUpperCase().replace(/./g, (c) => String.fromCodePoint(127397 + c.charCodeAt(0)));
const SORTED: Country[] = (() => {
  const p = PRI.map((i) => COUNTRIES.find((c) => c.iso === i)).filter(Boolean) as Country[];
  const r = COUNTRIES.filter((c) => !PRI.includes(c.iso)).sort((a, b) => a.name.localeCompare(b.name));
  return [...p, { iso: "__d", name: "", d: "" }, ...r];
})();

/* ═══════════════════════════════════════════
   PHONE INPUT
═══════════════════════════════════════════ */
type UIStrings = (typeof UI)[Lang];
function PhoneInput({ onChange, ui }: { onChange: (v: string) => void; ui: UIStrings }) {
  const [dial, setDial] = useState("971");
  const [iso, setIso] = useState("AE");
  const [num, setNum] = useState("");
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const sRef = useRef<HTMLInputElement>(null);

  useEffect(() => { onChange(`+${dial}${num}`); }, [dial, num, onChange]);
  useEffect(() => { if (open) setTimeout(() => sRef.current?.focus(), 60); else setQ(""); }, [open]);
  useEffect(() => {
    const fn = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  const fil = q.trim()
    ? COUNTRIES.filter((c) => c.name.toLowerCase().includes(q.toLowerCase()) || c.d.includes(q.replace(/\D/g, ""))).sort((a, b) => a.name.localeCompare(b.name))
    : SORTED;

  const sel = (c: Country) => { if (c.iso === "__d") return; setDial(c.d); setIso(c.iso); setOpen(false); };

  return (
    <div style={{ position: "relative" }} ref={ref}>
      <div style={{ display: "flex", gap: 8 }}>
        <button type="button" onClick={() => setOpen((o) => !o)} style={{ background: C.card, border: `1px solid ${open ? C.gold : C.border}`, borderRadius: 10, padding: "0 12px", height: 44, display: "flex", alignItems: "center", gap: 7, cursor: "pointer", color: C.text, fontFamily: "'DM Sans',sans-serif", fontSize: 13, whiteSpace: "nowrap", flexShrink: 0, transition: "border-color .2s", minWidth: 100 }}>
          <span style={{ fontSize: 18, lineHeight: 1 }}>{gf(iso)}</span>
          <span style={{ color: C.gold, fontWeight: 600 }}>+{dial}</span>
          <span style={{ color: "#4A4A6A", fontSize: 9 }}>▾</span>
        </button>
        <input type="tel" placeholder={ui.phonePh} value={num} onChange={(e) => setNum(e.target.value.replace(/[^\d\s\-]/g, ""))} className="fi" style={{ flex: 1, height: 44 }} onFocus={(e) => (e.target.style.borderColor = C.gold)} onBlur={(e) => (e.target.style.borderColor = C.border)} />
      </div>
      {open && (
        <div style={{ position: "absolute", top: "calc(100% + 6px)", insetInlineStart: 0, width: 290, maxHeight: 250, background: "#13132A", border: `1px solid ${C.borderAlt}`, borderRadius: 12, overflow: "hidden", zIndex: 9999, boxShadow: "0 20px 60px rgba(0,0,0,.8)", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "10px", borderBottom: `1px solid ${C.border}`, flexShrink: 0 }}>
            <input ref={sRef} type="text" placeholder={ui.countrySearch} value={q} onChange={(e) => setQ(e.target.value)} style={{ width: "100%", background: C.card, border: `1px solid ${C.borderAlt}`, borderRadius: 8, padding: "8px 12px", color: C.text, fontFamily: "'DM Sans',sans-serif", fontSize: 12, outline: "none" }} />
          </div>
          <div style={{ overflowY: "auto", flex: 1 }}>
            {fil.length === 0 && <p style={{ padding: 16, fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: C.muted, textAlign: "center" }}>{ui.noResults}</p>}
            {fil.map((c, i) =>
              c.iso === "__d" ? (
                <div key="dv" style={{ height: 1, background: C.border, margin: "4px 0" }} />
              ) : (
                <div key={c.iso + i} onClick={() => sel(c)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 14px", cursor: "pointer", background: iso === c.iso ? "rgba(201,162,39,.12)" : "transparent", transition: "background .12s" }} onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.background = "rgba(201,162,39,.07)")} onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.background = iso === c.iso ? "rgba(201,162,39,.12)" : "transparent")}>
                  <span style={{ fontSize: 17, flexShrink: 0 }}>{gf(c.iso)}</span>
                  <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: C.sub, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.name}</span>
                  <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: C.gold, flexShrink: 0, fontWeight: 600 }}>+{c.d}</span>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════
   SERVICE PRODUCTS
═══════════════════════════════════════════ */
type Bil = { en: string; ar: string };
type BilArr = { en: string[]; ar: string[] };

type ServiceProduct = {
  id: string; section: "service"; type: "B2C" | "B2B"; tag: Bil; tagC: string;
  name: Bil; short: Bil; badge: Bil | null; desc: Bil; features: BilArr; why: Bil;
  uae: { aed: string; period: Bil };
  ksa: { sar: string; aed: string; usd: string; period: Bil };
};

const SERVICES: ServiceProduct[] = [
  {
    id: "svc-launch", section: "service", type: "B2C",
    tag: { en: "Digital Product", ar: "منتج رقمي" }, tagC: "#C9A227",
    name: { en: "Business Digital Launchpad", ar: "منصة الإطلاق الرقمي للأعمال" },
    short: { en: "Digital Launchpad", ar: "منصة الإطلاق الرقمي" }, badge: null,
    desc: { en: "A launch-ready, SEO-optimised digital presence — engineered to corporate standard and delivered within 5 working days.", ar: "حضور رقمي جاهز للإطلاق، مُحسَّن لمحركات البحث — مُصمَّم بمعايير مؤسسية ويُسلَّم خلال 5 أيام عمل." },
    features: {
      en: ["5-page premium professional website", "Business email setup (up to 5 accounts)", "Google Workspace configuration & onboarding", "Advanced SEO foundation & meta architecture", "1 month dedicated post-launch support"],
      ar: ["موقع احترافي راقٍ من 5 صفحات", "إعداد بريد العمل (حتى 5 حسابات)", "إعداد وتشغيل Google Workspace", "أساس متقدم للسيو وبنية الميتا", "دعم متخصص لمدة شهر بعد الإطلاق"],
    },
    why: { en: "Template agencies take weeks. We deliver a bilingual-ready, compliance-grade digital presence in 5 days.", ar: "وكالات القوالب تستغرق أسابيع. نحن نسلّم حضورًا رقميًا ثنائي اللغة ومتوافقًا تنظيميًا خلال 5 أيام." },
    uae: { aed: "4,500", period: { en: "One-time · Delivered in 7 working days", ar: "دفعة واحدة · يُسلَّم خلال 7 أيام عمل" } },
    ksa: { sar: "4,800", aed: "4,700", usd: "1,307", period: { en: "One-time · Delivered in 7 working days", ar: "دفعة واحدة · يُسلَّم خلال 7 أيام عمل" } },
  },
  {
    id: "svc-ecom", section: "service", type: "B2C",
    tag: { en: "E-Commerce Product", ar: "منتج تجارة إلكترونية" }, tagC: "#6B2D8B",
    name: { en: "E-Commerce Store Setup", ar: "إعداد متجر إلكتروني" },
    short: { en: "E-Commerce Setup", ar: "إعداد التجارة الإلكترونية" },
    badge: { en: "MOST POPULAR", ar: "الأكثر طلبًا" },
    desc: { en: "A complete, payment-ready online store — built, tested, and handed over ready to generate revenue from day one.", ar: "متجر إلكتروني متكامل جاهز للدفع — يُبنى، يُختبر، ويُسلَّم جاهزًا لتوليد الإيرادات من اليوم الأول." },
    features: {
      en: ["Full e-commerce store build (Shopify / WooCommerce)", "GCC-native payment gateway integration", "Product catalogue setup — up to 50 products", "Mobile-first Arabic & English bilingual design", "Secure checkout & compliance configuration", "2 weeks dedicated post-launch support"],
      ar: ["بناء متجر إلكتروني كامل (Shopify / WooCommerce)", "تكامل بوابة دفع خليجية أصلية", "إعداد كتالوج المنتجات — حتى 50 منتجًا", "تصميم ثنائي اللغة بأولوية الجوال (عربي وإنجليزي)", "إعداد دفع آمن وامتثال تنظيمي", "دعم متخصص لمدة أسبوعين بعد الإطلاق"],
    },
    why: { en: "We integrate GCC-native gateways most agencies skip. Revenue-ready from day one — not week three.", ar: "ندمج بوابات الدفع الخليجية التي تتجاهلها معظم الوكالات. جاهز للإيرادات من اليوم الأول — لا من الأسبوع الثالث." },
    uae: { aed: "8,999", period: { en: "One-time · Delivered in 10 working days", ar: "دفعة واحدة · يُسلَّم خلال 10 أيام عمل" } },
    ksa: { sar: "9,800", aed: "9,600", usd: "2,452", period: { en: "One-time · Delivered in 10 working days", ar: "دفعة واحدة · يُسلَّم خلال 10 أيام عمل" } },
  },
  {
    id: "svc-adv", section: "service", type: "B2B",
    tag: { en: "Advisory Service", ar: "خدمة استشارية" }, tagC: "#1A7A5E",
    name: { en: "Business Advisory Starter Pack", ar: "باقة الاستشارات التأسيسية للأعمال" },
    short: { en: "Advisory Pack", ar: "باقة استشارية" }, badge: null,
    desc: { en: "Three months of senior-level advisory to establish your operations with precision, regulatory clarity, and full GCC compliance.", ar: "ثلاثة أشهر من الاستشارات على مستوى الإدارة العليا لتأسيس عملياتك بدقة ووضوح تنظيمي وامتثال خليجي كامل." },
    features: {
      en: ["Initial business structure consultation", "UAE FTA / KSA ZATCA registration guidance", "3× monthly advisory sessions (1 hour each)", "Document review and professional drafting", "Corporate Tax & VAT compliance strategy", "Priority bilingual email support throughout"],
      ar: ["استشارة أولية لهيكلة الأعمال", "إرشاد للتسجيل لدى الهيئة الاتحادية للضرائب وZATCA السعودية", "3 جلسات استشارية شهرية (ساعة لكل جلسة)", "مراجعة وصياغة احترافية للوثائق", "استراتيجية امتثال ضريبة الشركات وضريبة القيمة المضافة", "دعم بريدي ثنائي اللغة بأولوية طوال الفترة"],
    },
    why: { en: "We draft, review, and file alongside you — not just advise. Active cross-border GCC expertise.", ar: "نصوغ ونراجع ونقدم الإيداعات معك — لا نكتفي بالاستشارة. خبرة فعلية عابرة للحدود في دول الخليج." },
    uae: { aed: "5,999", period: { en: "3-month package · Invoiced monthly", ar: "باقة 3 أشهر · فوترة شهرية" } },
    ksa: { sar: "6,500", aed: "6,400", usd: "1,769", period: { en: "3-month package · Invoiced monthly", ar: "باقة 3 أشهر · فوترة شهرية" } },
  },
];

/* ═══════════════════════════════════════════
   STORE PRODUCTS
═══════════════════════════════════════════ */
type StoreProduct = {
  id: number; section: "store"; tag: string; type: string; cta: "buy" | "enquire" | "notify";
  cat: Bil;
  name: Bil; short: Bil; badge: Bil | null; isNew: boolean; ksaOnly: boolean; comingSoon?: boolean;
  desc: Bil;
  prices: { uae: { aed: number }; ksa: { sar: number; aed: number; usd: number } };
};

const STORE: StoreProduct[] = [
  { id: 1, section: "store", tag: "downloads", type: "B2C", cta: "buy", cat: { en: "PDF GUIDE", ar: "دليل PDF" }, name: { en: "UAE Business Setup Guide 2025", ar: "دليل تأسيس الأعمال في الإمارات 2025" }, short: { en: "UAE Setup Guide", ar: "دليل التأسيس في الإمارات" }, badge: null, isNew: false, ksaOnly: false, desc: { en: "40-page guide covering mainland LLC, free zone, and offshore options — cost tables and timeline estimates included.", ar: "دليل من 40 صفحة يغطي شركات الذمة المحدودة في البر الرئيسي والمناطق الحرة والأوفشور — مع جداول التكاليف والجداول الزمنية." }, prices: { uae: { aed: 149 }, ksa: { sar: 155, aed: 150, usd: 41 } } },
  { id: 2, section: "store", tag: "downloads", type: "B2C", cta: "buy", cat: { en: "TEMPLATES", ar: "نماذج" }, name: { en: "Commercial Contract Bundle", ar: "حزمة العقود التجارية" }, short: { en: "Contract Bundle", ar: "حزمة العقود" }, badge: { en: "BESTSELLER", ar: "الأكثر مبيعًا" }, isNew: false, ksaOnly: false, desc: { en: "8 UAE-law compliant templates: NDA, Service Agreement, MOU, Consultancy Agreement, and more.", ar: "8 نماذج متوافقة مع القانون الإماراتي: اتفاقية عدم إفصاح، اتفاقية خدمات، مذكرة تفاهم، اتفاقية استشارات، وغيرها." }, prices: { uae: { aed: 199 }, ksa: { sar: 207, aed: 200, usd: 54 } } },
  { id: 3, section: "store", tag: "downloads", type: "B2C", cta: "buy", cat: { en: "BUNDLE", ar: "حزمة" }, name: { en: "Arab Investor UAE Entry Kit", ar: "حزمة دخول المستثمر العربي للإمارات" }, short: { en: "UAE Entry Kit", ar: "حزمة دخول الإمارات" }, badge: { en: "عربي / EN", ar: "عربي / EN" }, isNew: true, ksaOnly: false, desc: { en: "Bilingual Arabic/English guide for Arab investors entering UAE — SPCFZ, mainland, banking, residency visas, and real cost breakdowns.", ar: "دليل ثنائي اللغة للمستثمرين العرب الداخلين إلى الإمارات — SPCFZ، البر الرئيسي، البنوك، تأشيرات الإقامة، وتفاصيل التكاليف الفعلية." }, prices: { uae: { aed: 229 }, ksa: { sar: 238, aed: 232, usd: 62 } } },
  { id: 4, section: "store", tag: "downloads", type: "B2C", cta: "buy", cat: { en: "TEMPLATES", ar: "نماذج" }, name: { en: "Business Plan & Pitch Template", ar: "نموذج خطة العمل والعرض الاستثماري" }, short: { en: "Business Plan Template", ar: "نموذج خطة العمل" }, badge: null, isNew: false, ksaOnly: false, desc: { en: "Investor-ready bilingual (English/Arabic) business plan with financial projection tables and executive summary framework.", ar: "خطة عمل ثنائية اللغة (عربي/إنجليزي) جاهزة للمستثمرين مع جداول التوقعات المالية وإطار الملخص التنفيذي." }, prices: { uae: { aed: 179 }, ksa: { sar: 186, aed: 180, usd: 49 } } },
  { id: 5, section: "store", tag: "downloads", type: "B2C", cta: "buy", cat: { en: "PDF GUIDE", ar: "دليل PDF" }, name: { en: "UAE Corporate Banking Guide", ar: "دليل البنوك المؤسسية في الإمارات" }, short: { en: "UAE Banking Guide", ar: "دليل البنوك في الإمارات" }, badge: null, isNew: true, ksaOnly: false, desc: { en: "Which banks accept new free zone companies, required documents, timelines, and tips for companies with thin banking history.", ar: "البنوك التي تقبل شركات المناطق الحرة الجديدة، الوثائق المطلوبة، الجداول الزمنية، ونصائح للشركات ذات السجل البنكي المحدود." }, prices: { uae: { aed: 199 }, ksa: { sar: 207, aed: 200, usd: 54 } } },
  { id: 6, section: "store", tag: "downloads", type: "B2C", cta: "buy", cat: { en: "PDF GUIDE", ar: "دليل PDF" }, name: { en: "Schengen / UK Visa Workbook", ar: "دفتر تأشيرات شنغن والمملكة المتحدة" }, short: { en: "Visa Workbook", ar: "دفتر التأشيرات" }, badge: null, isNew: true, ksaOnly: false, desc: { en: "Self-assessment workbook replicating officer scoring logic for Schengen, UK, and Ireland applications. Know your approval likelihood before you apply.", ar: "دفتر تقييم ذاتي يحاكي منطق تقييم الضباط لطلبات شنغن والمملكة المتحدة وأيرلندا. اعرف احتمالية الموافقة قبل التقديم." }, prices: { uae: { aed: 99 }, ksa: { sar: 103, aed: 100, usd: 27 } } },
  { id: 7, section: "store", tag: "downloads", type: "B2C", cta: "buy", cat: { en: "LAUNCH KIT", ar: "حزمة إطلاق" }, name: { en: "E-Commerce UAE Launch Checklist", ar: "قائمة إطلاق التجارة الإلكترونية في الإمارات" }, short: { en: "E-Com Launch Checklist", ar: "قائمة إطلاق التجارة" }, badge: null, isNew: false, ksaOnly: false, desc: { en: "Step-by-step checklist to launch a compliant UAE e-commerce business — licensing, payment gateways, and FTA registration.", ar: "قائمة خطوة بخطوة لإطلاق نشاط تجاري إلكتروني ممتثل في الإمارات — التراخيص وبوابات الدفع والتسجيل لدى الهيئة الاتحادية للضرائب." }, prices: { uae: { aed: 79 }, ksa: { sar: 82, aed: 80, usd: 22 } } },
  { id: 8, section: "store", tag: "compliance", type: "B2C", cta: "buy", cat: { en: "COMPLIANCE KIT", ar: "حزمة امتثال" }, name: { en: "UAE VAT & FTA Compliance Kit", ar: "حزمة امتثال ضريبة القيمة المضافة والهيئة الاتحادية الإماراتية" }, short: { en: "UAE VAT Kit", ar: "حزمة ضريبة القيمة المضافة" }, badge: null, isNew: false, ksaOnly: false, desc: { en: "FTA registration checklist, VAT invoice requirements, e-invoicing readiness guide, and 2025 filing calendar.", ar: "قائمة التسجيل لدى الهيئة الاتحادية، متطلبات فواتير ضريبة القيمة المضافة، دليل جاهزية الفوترة الإلكترونية، وتقويم الإيداعات لعام 2025." }, prices: { uae: { aed: 199 }, ksa: { sar: 207, aed: 200, usd: 54 } } },
  { id: 9, section: "store", tag: "compliance", type: "B2C", cta: "enquire", cat: { en: "COMPLIANCE KIT", ar: "حزمة امتثال" }, name: { en: "ZATCA + UAE E-Invoicing Kit", ar: "حزمة الفوترة الإلكترونية ZATCA والإمارات" }, short: { en: "ZATCA E-Invoicing Kit", ar: "حزمة فوترة ZATCA" }, badge: { en: "KSA + UAE", ar: "السعودية + الإمارات" }, isNew: true, ksaOnly: false, desc: { en: "Dual compliance kit for Saudi ZATCA Phase 1 & 2 and UAE FTA e-invoicing — gap-check templates, QR specs, and UBL 2.1 XML schema guide.", ar: "حزمة امتثال مزدوجة لـ ZATCA السعودية المرحلتين 1 و2 وفوترة الهيئة الاتحادية الإماراتية — نماذج فحص الفجوات، مواصفات QR، ودليل مخطط UBL 2.1 XML." }, prices: { uae: { aed: 349 }, ksa: { sar: 363, aed: 349, usd: 95 } } },
  { id: 10, section: "store", tag: "compliance", type: "B2C", cta: "enquire", cat: { en: "BUNDLE", ar: "حزمة" }, name: { en: "GCC Market Entry Pack", ar: "حزمة دخول الأسواق الخليجية" }, short: { en: "GCC Entry Pack", ar: "حزمة الدخول الخليجية" }, badge: null, isNew: false, ksaOnly: false, desc: { en: "Market entry briefing for UAE, Saudi Arabia, and Kuwait — regulatory overview, commercial registration steps, and key contacts.", ar: "إحاطة دخول الأسواق للإمارات والسعودية والكويت — نظرة تنظيمية، خطوات التسجيل التجاري، وجهات الاتصال الرئيسية." }, prices: { uae: { aed: 349 }, ksa: { sar: 363, aed: 349, usd: 95 } } },
  { id: 11, section: "store", tag: "compliance", type: "B2C", cta: "enquire", cat: { en: "BUNDLE", ar: "حزمة" }, name: { en: "Africa–UAE Trade Starter Pack", ar: "حزمة بداية التجارة بين أفريقيا والإمارات" }, short: { en: "Africa-UAE Trade Pack", ar: "حزمة تجارة أفريقيا–الإمارات" }, badge: { en: "NEW", ar: "جديد" }, isNew: true, ksaOnly: false, desc: { en: "Practical import/export guide for the Africa-UAE corridor: HS codes, Incoterms, UAE customs procedures, and supplier verification checklist.", ar: "دليل عملي للاستيراد والتصدير على ممر أفريقيا–الإمارات: رموز HS، شروط Incoterms، إجراءات الجمارك الإماراتية، وقائمة التحقق من الموردين." }, prices: { uae: { aed: 299 }, ksa: { sar: 311, aed: 299, usd: 81 } } },
  { id: 12, section: "store", tag: "consulting", type: "B2C", cta: "buy", cat: { en: "CONSULTATION", ar: "استشارة" }, name: { en: "30-Min Strategy Call", ar: "مكالمة استراتيجية 30 دقيقة" }, short: { en: "Strategy Call (30 min)", ar: "مكالمة استراتيجية (30 د)" }, badge: null, isNew: true, ksaOnly: false, desc: { en: "Direct advisory with SHAHMCO's managing director — business setup, banking, market entry, or compliance. Your agenda.", ar: "استشارة مباشرة مع المدير العام لشَهْمكو — تأسيس الأعمال، البنوك، دخول الأسواق، أو الامتثال. جدول أعمالك أنت." }, prices: { uae: { aed: 299 }, ksa: { sar: 311, aed: 299, usd: 81 } } },
  { id: 13, section: "store", tag: "consulting", type: "B2C", cta: "buy", cat: { en: "CONSULTATION", ar: "استشارة" }, name: { en: "Business Setup Consultation (60 min)", ar: "استشارة تأسيس الأعمال (60 دقيقة)" }, short: { en: "Setup Consultation (60 min)", ar: "استشارة التأسيس (60 د)" }, badge: { en: "MOST VALUE", ar: "الأكثر قيمة" }, isNew: true, ksaOnly: false, desc: { en: "Full 60-minute session covering entity structure, free zone selection, and cost optimisation. Includes written action summary.", ar: "جلسة كاملة من 60 دقيقة تغطي هيكل الكيان، اختيار المنطقة الحرة، وتحسين التكاليف. تشمل ملخصًا تنفيذيًا مكتوبًا." }, prices: { uae: { aed: 599 }, ksa: { sar: 623, aed: 599, usd: 163 } } },
  { id: 14, section: "store", tag: "ksa", type: "B2C", cta: "buy", cat: { en: "KSA GUIDE", ar: "دليل سعودي" }, name: { en: "Saudi Arabia Vision 2030 Business Guide", ar: "دليل الأعمال في رؤية السعودية 2030" }, short: { en: "Vision 2030 Guide", ar: "دليل رؤية 2030" }, badge: { en: "KSA EXCLUSIVE", ar: "حصري للسعودية" }, isNew: true, ksaOnly: true, desc: { en: "Complete investor guide to establishing business in KSA — CR registration, foreign investment rules, MISA procedures, sector opportunities, and cost breakdowns.", ar: "دليل مستثمر شامل لتأسيس الأعمال في السعودية — تسجيل السجل التجاري، قواعد الاستثمار الأجنبي، إجراءات MISA، فرص القطاعات، وتفاصيل التكاليف." }, prices: { uae: { aed: 185 }, ksa: { sar: 189, aed: 183, usd: 50 } } },
  { id: 15, section: "store", tag: "ksa", type: "B2C", cta: "buy", cat: { en: "COMPLIANCE", ar: "امتثال" }, name: { en: "ZATCA Phase 2 Technical Guide", ar: "الدليل التقني للمرحلة الثانية من ZATCA" }, short: { en: "ZATCA Phase 2 Guide", ar: "دليل ZATCA المرحلة 2" }, badge: { en: "KSA EXCLUSIVE", ar: "حصري للسعودية" }, isNew: true, ksaOnly: true, desc: { en: "Step-by-step technical implementation for Saudi ZATCA Phase 2 — UBL 2.1 XML, cryptographic stamping, ZATCA portal integration, QR code generation, and testing environment setup.", ar: "تنفيذ تقني خطوة بخطوة للمرحلة الثانية من ZATCA السعودية — UBL 2.1 XML، الختم التشفيري، تكامل بوابة ZATCA، توليد رمز QR، وإعداد بيئة الاختبار." }, prices: { uae: { aed: 290 }, ksa: { sar: 299, aed: 290, usd: 79 } } },
  { id: 16, section: "store", tag: "ksa", type: "B2C", cta: "buy", cat: { en: "TEMPLATES", ar: "نماذج" }, name: { en: "KSA Commercial Contract Bundle", ar: "حزمة العقود التجارية السعودية" }, short: { en: "KSA Contract Bundle", ar: "حزمة عقود السعودية" }, badge: { en: "عربي / EN", ar: "عربي / EN" }, isNew: true, ksaOnly: false, desc: { en: "8 Saudi-law compliant templates in Arabic and English: Service Agreement, NDA, Agency Agreement, Employment Contract, Distribution Agreement, and more.", ar: "8 نماذج متوافقة مع النظام السعودي بالعربية والإنجليزية: اتفاقية خدمات، عدم إفصاح، وكالة، عمل، توزيع، وغيرها." }, prices: { uae: { aed: 222 }, ksa: { sar: 229, aed: 222, usd: 61 } } },
  { id: 17, section: "store", tag: "ksa", type: "B2C", cta: "buy", cat: { en: "PDF GUIDE", ar: "دليل PDF" }, name: { en: "Saudi Banking & Account Setup Guide", ar: "دليل البنوك وفتح الحسابات في السعودية" }, short: { en: "Saudi Banking Guide", ar: "دليل البنوك السعودية" }, badge: null, isNew: true, ksaOnly: true, desc: { en: "Open a business account in KSA — bank selection, Absher/Nafath setup, required documents, Mada merchant onboarding, STC Pay, and timeline expectations.", ar: "افتح حساب أعمال في السعودية — اختيار البنك، إعداد أبشر/نفاذ، الوثائق المطلوبة، تسجيل تاجر مدى، STC Pay، والجداول الزمنية المتوقعة." }, prices: { uae: { aed: 183 }, ksa: { sar: 189, aed: 183, usd: 50 } } },
  { id: 18, section: "store", tag: "software", type: "B2C", cta: "notify", cat: { en: "SOFTWARE", ar: "برمجيات" }, name: { en: "SHAHMCO E-Invoicing Platform", ar: "منصة شَهْمكو للفوترة الإلكترونية" }, short: { en: "E-Invoicing Platform", ar: "منصة الفوترة الإلكترونية" }, badge: { en: "COMING SOON", ar: "قريبًا" }, isNew: true, ksaOnly: false, comingSoon: true, desc: { en: "Our proprietary e-invoicing software — bilingual, UAE FTA & Saudi ZATCA compliant. Currently undergoing regulatory testing and approval. Register now to be notified at launch and access the early-adopter beta.", ar: "برنامجنا الخاص للفوترة الإلكترونية — ثنائي اللغة، متوافق مع الهيئة الاتحادية الإماراتية وZATCA السعودية. يخضع حاليًا للاختبار والاعتماد التنظيمي. سجّل الآن لتُبلَّغ عند الإطلاق والوصول للنسخة التجريبية." }, prices: { uae: { aed: 0 }, ksa: { sar: 0, aed: 0, usd: 0 } } },
];

const FILTER_KEYS = ["all", "downloads", "compliance", "consulting", "ksa", "software"] as const;

const DIFFS: { icon: string; t: Bil; b: Bil }[] = [
  { icon: "🌐", t: { en: "Bilingual GCC", ar: "ثنائية اللغة الخليجية" }, b: { en: "Native Arabic & English across every deliverable.", ar: "عربي وإنجليزي أصليان في كل ما نقدمه." } },
  { icon: "🏛️", t: { en: "Licensed Entity", ar: "كيان مرخّص" }, b: { en: "Sharjah Publishing City Free Zone — fully compliant.", ar: "المنطقة الحرة لمدينة الشارقة للنشر — متوافق بالكامل." } },
  { icon: "⚖️", t: { en: "FTA & ZATCA Ready", ar: "جاهزون لـ FTA وZATCA" }, b: { en: "UAE & KSA tax compliance embedded in all advisory.", ar: "امتثال ضريبي لدولتي الإمارات والسعودية مدمج في كل استشارة." } },
  { icon: "⚡", t: { en: "Fast Delivery", ar: "تسليم سريع" }, b: { en: "Digital Launchpad in 7 working days. E-Commerce in 10 working days.", ar: "منصة الإطلاق خلال 7 أيام عمل. التجارة الإلكترونية خلال 10 أيام عمل." } },
  { icon: "🎯", t: { en: "Senior Advisor", ar: "مستشار خبير" }, b: { en: "Direct access — no account managers, no relay.", ar: "وصول مباشر — بدون مدراء حسابات أو وسطاء." } },
  { icon: "📋", t: { en: "Full Documentation", ar: "توثيق كامل" }, b: { en: "Every engagement backed by formal contracts.", ar: "كل ارتباط مدعوم بعقود رسمية." } },
];

const fmtAED = (n: number) => `AED ${Number(n).toLocaleString()}`;

type FormData = { name: string; email: string; phone: string; company: string; message: string; clientType: string };
const EMPTY: FormData = { name: "", email: "", phone: "", company: "", message: "", clientType: "" };

const CLIENT_TYPES = [
  { v: "company", en: "Company", ar: "شركة" },
  { v: "establishment", en: "Personal Establishment", ar: "مؤسسة فردية" },
  { v: "shop", en: "Shop / Store", ar: "محل / متجر" },
  { v: "ecommerce", en: "E-Commerce Business", ar: "تجارة إلكترونية" },
  { v: "freelancer", en: "Freelancer / Individual", ar: "فريلانسر / فرد" },
  { v: "other", en: "Other", ar: "أخرى" },
];

/* ═══════════════════════════════════════════
   FORM FIELDS
═══════════════════════════════════════════ */
function Fields({ fd, setFd, showMsg, ui, lang }: { fd: FormData; setFd: React.Dispatch<React.SetStateAction<FormData>>; showMsg: boolean; ui: UIStrings; lang: Lang }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div>
        <label style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: C.muted, letterSpacing: ".05em", display: "block", marginBottom: 8, textTransform: "uppercase" }}>
          {ui.clientType}
        </label>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {CLIENT_TYPES.map((ct) => (
            <div key={ct.v} onClick={() => setFd((p) => ({ ...p, clientType: ct.v }))} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", borderRadius: 10, border: `1px solid ${fd.clientType === ct.v ? C.gold : C.border}`, background: fd.clientType === ct.v ? `${C.gold}10` : C.card, cursor: "pointer", transition: "all .18s" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: fd.clientType === ct.v ? C.text : C.sub, fontWeight: fd.clientType === ct.v ? 500 : 400 }}>
                  {lang === "ar" ? ct.ar : ct.en}
                </span>
              </div>
              <div style={{ width: 18, height: 18, borderRadius: "50%", border: `2px solid ${fd.clientType === ct.v ? C.gold : C.border}`, background: fd.clientType === ct.v ? C.gold : "transparent", flexShrink: 0, transition: "all .18s", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {fd.clientType === ct.v && <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#07070F" }} />}
              </div>
            </div>
          ))}
        </div>
      </div>

      {[
        { k: "name" as const, l: ui.fullName, p: ui.fullNamePh, t: "text" },
        { k: "email" as const, l: ui.email, p: ui.emailPh, t: "email" },
        { k: "company" as const, l: ui.company, p: ui.companyPh, t: "text" },
      ].map((f) => (
        <div key={f.k}>
          <label style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: C.muted, letterSpacing: ".05em", display: "block", marginBottom: 5, textTransform: "uppercase" }}>{f.l}</label>
          <input className="fi" type={f.t} placeholder={f.p} value={fd[f.k]} onChange={(e: ChangeEvent<HTMLInputElement>) => setFd((p) => ({ ...p, [f.k]: e.target.value }))} />
        </div>
      ))}

      <div>
        <label style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: C.muted, letterSpacing: ".05em", display: "block", marginBottom: 5, textTransform: "uppercase" }}>{ui.phone}</label>
        <PhoneInput onChange={(v) => setFd((p) => ({ ...p, phone: v }))} ui={ui} />
      </div>

      {showMsg && (
        <div>
          <label style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: C.muted, letterSpacing: ".05em", display: "block", marginBottom: 5, textTransform: "uppercase" }}>{ui.message}</label>
          <textarea className="fi" rows={3} placeholder={ui.messagePh} value={fd.message} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setFd((p) => ({ ...p, message: e.target.value }))} style={{ resize: "vertical" }} />
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════ */
type AnyProduct = ServiceProduct | StoreProduct;
type Modal = { prod: AnyProduct; mode: "pay" | "enquire" } | null;

export default function ProductStore() {
  const { language } = useLanguage();
  const lang: Lang = language === "ar" ? "ar" : "en";
  const ui = UI[lang];
  const isRTL = lang === "ar";
  const pick = (b: Bil) => b[lang];

  const [mkt, setMkt] = useState<"UAE" | "KSA">("UAE");
  const [anim, setAnim] = useState(false);
  const [filter, setFilter] = useState<typeof FILTER_KEYS[number]>("all");
  const [modal, setModal] = useState<Modal>(null);
  const [fd, setFd] = useState<FormData>(EMPTY);
  const [step, setStep] = useState<"form" | "payment" | "success">("form");
  const [vis, setVis] = useState([false, false, false]);
  const oRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    [0, 140, 280].forEach((d, i) =>
      setTimeout(() => setVis((p) => { const n = [...p]; n[i] = true; return n; }), 400 + d)
    );
  }, []);

  const swMkt = (m: "UAE" | "KSA") => {
    if (m === mkt) return;
    setAnim(true);
    setTimeout(() => { setMkt(m); setAnim(false); }, 200);
  };
  const openM = (prod: AnyProduct, mode: "pay" | "enquire") => { setModal({ prod, mode }); setStep("form"); setFd(EMPTY); };
  const closeM = () => setModal(null);
  const onOverlay = (e: React.MouseEvent<HTMLDivElement>) => { if (e.target === oRef.current) closeM(); };
  const canGo = !!(fd.name.trim() && fd.email.trim() && fd.phone.trim() && fd.phone.length > 4 && fd.clientType !== "");
  const submit = () => { if (!canGo || !modal) return; setStep(modal.mode === "pay" ? "payment" : "success"); };

  const svcPrice = (p: ServiceProduct) => {
    if (mkt === "UAE") return { main: `AED ${p.uae.aed}`, sub: null as string | null, period: pick(p.uae.period) };
    return { main: `SAR ${p.ksa.sar}`, sub: `AED ${p.ksa.aed} · USD ${p.ksa.usd}`, period: pick(p.ksa.period) };
  };
  const storePrice = (p: StoreProduct) => {
    if (mkt === "UAE") return { main: fmtAED(p.prices.uae.aed), sub: null as string | null };
    return { main: `SAR ${p.prices.ksa.sar}`, sub: `AED ${p.prices.ksa.aed} · USD ${p.prices.ksa.usd}` };
  };
  const modalPrice = () => {
    if (!modal) return "";
    const p = modal.prod;
    if (p.section === "service") return svcPrice(p as ServiceProduct).main;
    return storePrice(p as StoreProduct).main;
  };

  const filteredStore = () => {
    let list = STORE;
    if (mkt === "UAE") list = list.filter((p) => !p.ksaOnly);
    if (filter !== "all") list = list.filter((p) => p.tag === filter);
    return list;
  };

  // Payment methods (translated)
  const PAY_METHODS = lang === "ar"
    ? [
        { icon: "💳", l: "بطاقة ائتمان / خصم", s: "فيزا · ماستركارد · أمريكان إكسبريس" },
        { icon: "🟢", l: "مدى", s: "بطاقة الخصم السعودية" },
        { icon: "📱", l: "Apple Pay / Google Pay", s: "ادفع باللمس" },
        { icon: "⚡", l: "محافظ رقمية (عالميًا)", s: "M-Pesa · MTN Money · Vodafone Cash · Alipay وغيرها — رهن موافقة Paymob" },
        { icon: "🏦", l: "تحويل بنكي (IBAN)", s: "تُصدر فاتورة — التحويل إلى آيبان شَهْمكو" },
        { icon: "🇨🇳", l: "UnionPay", s: "بطاقات الخصم والائتمان الصينية — رهن موافقة Paymob" },
        { icon: "🔵", l: "اشترِ الآن وادفع لاحقًا", s: "Tabby أو Tamara · بدون فوائد · عبر Paymob BNPL" },
      ]
    : [
        { icon: "💳", l: "Credit / Debit Card", s: "Visa · Mastercard · AMEX" },
        { icon: "🟢", l: "Mada", s: "Saudi debit card" },
        { icon: "📱", l: "Apple Pay / Google Pay", s: "Tap to pay" },
        { icon: "⚡", l: "Digital Wallets (Global)", s: "M-Pesa · MTN Money · Vodafone Cash · Alipay · and more — subject to Paymob approval" },
        { icon: "🏦", l: "Bank Transfer (IBAN)", s: "Invoice issued — transfer to SHAHMCO IBAN" },
        { icon: "🇨🇳", l: "UnionPay", s: "Chinese debit & credit cards — subject to Paymob approval" },
        { icon: "🔵", l: "Buy Now Pay Later", s: "Tabby or Tamara · 0% interest · via Paymob BNPL" },
      ];

  return (
    <div dir={isRTL ? "rtl" : "ltr"} style={{ background: `radial-gradient(ellipse at 20% 0%,#0E0A1F 0%,${C.bg} 60%)`, fontFamily: isRTL ? "'DM Sans','Segoe UI',sans-serif" : "'Cormorant Garamond','Georgia',serif", color: C.text, paddingBottom: 80, position: "relative", overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Cinzel:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');
        .ps-root *{box-sizing:border-box;}
        .ps-root input,.ps-root textarea{font-family:'DM Sans',sans-serif;}
        .ps-root .fi{width:100%;background:${C.card};border:1px solid ${C.border};border-radius:10px;padding:11px 14px;color:${C.text};font-family:'DM Sans',sans-serif;font-size:13px;outline:none;transition:border-color .2s;}
        .ps-root .fi:focus{border-color:${C.gold}!important;}.ps-root .fi::placeholder{color:#3A3A5A;}
        @keyframes ps-sh{0%{background-position:-200% center}100%{background-position:200% center}}
        .ps-root .gs{background:linear-gradient(90deg,${C.gold},#E8C965 40%,${C.gold} 60%,${C.goldMid});background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:ps-sh 4s linear infinite;}
        @keyframes ps-fu{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        .ps-root .ci{animation:ps-fu .5s ease forwards;}.ps-root .co{opacity:0;}
        @keyframes ps-mi{from{opacity:0;transform:scale(.96) translateY(20px)}to{opacity:1;transform:scale(1) translateY(0)}}
        .ps-root .mbox{animation:ps-mi .28s cubic-bezier(.22,1,.36,1) forwards;}
        .ps-root .pf{transition:opacity .2s,transform .2s;}.ps-root .pf.out{opacity:0;transform:translateY(5px);}
        .ps-root .fl{display:flex;align-items:flex-start;gap:9px;font-family:'DM Sans',sans-serif;font-size:12.5px;color:${C.sub};line-height:1.6;margin-bottom:7px;}
        .ps-root .fl::before{content:'◆';font-size:7px;color:${C.gold};flex-shrink:0;margin-top:5px;}
        .ps-root .pc{transition:transform .2s,box-shadow .2s;}.ps-root .pc:hover{transform:translateY(-3px);box-shadow:0 12px 36px rgba(201,162,39,.1);}
        .ps-root .dc{transition:all .22s;}.ps-root .dc:hover{border-color:rgba(201,162,39,.4)!important;transform:translateY(-3px);}
        .ps-root .btnb{background:linear-gradient(135deg,${C.gold},${C.goldMid});color:#07070F;border:none;font-family:'Cinzel',serif;font-size:10.5px;letter-spacing:.16em;padding:11px 0;border-radius:40px;cursor:pointer;width:100%;font-weight:700;text-transform:uppercase;box-shadow:0 4px 18px rgba(201,162,39,.3);transition:all .25s;}
        .ps-root .btnb:hover{box-shadow:0 6px 26px rgba(201,162,39,.5);filter:brightness(1.08);}
        .ps-root .btnb:disabled{opacity:.5;cursor:not-allowed;}
        .ps-root .btne{background:transparent;border:1.5px solid ${C.gold};color:${C.gold};font-family:'Cinzel',serif;font-size:10.5px;letter-spacing:.16em;padding:11px 0;border-radius:40px;cursor:pointer;width:100%;text-transform:uppercase;transition:all .25s;}
        .ps-root .btne:hover{background:${C.gold};color:#07070F;}
        .ps-root .btneg{background:transparent;border:1.5px solid ${C.green};color:${C.green};font-family:'Cinzel',serif;font-size:10.5px;letter-spacing:.16em;padding:11px 0;border-radius:40px;cursor:pointer;width:100%;text-transform:uppercase;transition:all .25s;}
        .ps-root .btneg:hover{background:${C.green};color:${C.text};}
        .ps-root .blink{background:none;border:none;color:${C.muted};font-family:'DM Sans',sans-serif;font-size:11px;cursor:pointer;text-decoration:underline;width:100%;padding:3px 0;transition:color .2s;}
        .ps-root .blink:hover{color:${C.gold};}
        .ps-root .popt{background:${C.card};border:1px solid ${C.border};border-radius:12px;padding:14px;cursor:pointer;transition:all .22s;display:flex;align-items:center;gap:12px;width:100%;}
        .ps-root .popt:hover{border-color:${C.gold}60;background:#13132A;}
        .ps-root .ftab{padding:7px 16px;border-radius:20px;border:1px solid;font-family:'DM Sans',sans-serif;font-size:11px;font-weight:500;cursor:pointer;white-space:nowrap;transition:all .2s;}
        .ps-root .b2cl{display:inline-flex;align-items:center;gap:5px;background:rgba(201,162,39,.1);border:1px solid rgba(201,162,39,.25);border-radius:20px;padding:3px 10px;font-family:'DM Sans',sans-serif;font-size:9.5px;color:${C.gold};letter-spacing:.07em;}
        .ps-root .b2bl{display:inline-flex;align-items:center;gap:5px;background:rgba(26,122,94,.1);border:1px solid rgba(26,122,94,.25);border-radius:20px;padding:3px 10px;font-family:'DM Sans',sans-serif;font-size:9.5px;color:#2DC99A;letter-spacing:.07em;}
        .ps-root .seclabel{font-family:'Cinzel',serif;font-size:10px;color:${C.gold};letter-spacing:.3em;text-transform:uppercase;display:block;margin-bottom:12px;}
      `}</style>

      <div className="ps-root">
        <div style={{ position: "absolute", top: "-200px", insetInlineEnd: "-200px", width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(circle,${C.purple}18 0%,transparent 70%)`, pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-150px", insetInlineStart: "-150px", width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle,${C.gold}10 0%,transparent 70%)`, pointerEvents: "none" }} />

        {/* HERO + MARKET TOGGLE */}
        <div style={{ textAlign: "center", padding: "60px 24px 40px", position: "relative" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, border: `1px solid ${C.gold}40`, borderRadius: 40, padding: "6px 18px", marginBottom: 22, background: C.goldDim }}>
            <span style={{ color: C.gold, fontFamily: "'DM Sans',sans-serif", fontSize: 10, letterSpacing: ".22em", textTransform: "uppercase" }}>{ui.eyebrow}</span>
          </div>
          <h1 style={{ fontFamily: isRTL ? "'DM Sans',sans-serif" : "'Cinzel',serif", fontSize: "clamp(26px,5vw,52px)", fontWeight: 600, lineHeight: 1.15, marginBottom: 14, letterSpacing: ".03em" }}>
            <span className="gs">SHAHMCO</span> <span style={{ color: C.text }}>{ui.titleSuffix}</span>
          </h1>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "clamp(13px,2vw,16px)", color: C.muted, maxWidth: 520, margin: "0 auto 36px", lineHeight: 1.75, fontWeight: 300 }}>
            {ui.intro}
          </p>
          <div style={{ display: "inline-flex", background: C.border, border: `1px solid ${C.border}`, borderRadius: 50, padding: 4, position: "relative" }}>
            <div style={{ position: "absolute", top: 4, insetInlineStart: mkt === "UAE" ? "4px" : "calc(50% + 2px)", width: "calc(50% - 6px)", height: "calc(100% - 8px)", background: `linear-gradient(135deg,${C.gold},${C.goldMid})`, borderRadius: 40, transition: "inset-inline-start .3s cubic-bezier(.4,0,.2,1)", boxShadow: `0 2px 12px ${C.gold}50` }} />
            {([["UAE", "🇦🇪", ui.uae], ["KSA", "🇸🇦", ui.ksa]] as const).map(([m, f, l]) => (
              <button key={m} onClick={() => swMkt(m)} style={{ background: "transparent", border: "none", cursor: "pointer", fontFamily: isRTL ? "'DM Sans',sans-serif" : "'Cinzel',serif", fontSize: 11, letterSpacing: ".14em", padding: "11px 24px", borderRadius: 40, position: "relative", zIndex: 1, color: mkt === m ? "#07070F" : C.muted, fontWeight: mkt === m ? 700 : 400, minWidth: 155, transition: "color .25s" }}>
                {f} {l}
              </button>
            ))}
          </div>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: `${C.gold}80`, marginTop: 12, letterSpacing: ".05em" }}>
            {mkt === "UAE" ? ui.pricesUae : ui.pricesKsa}
          </p>
        </div>

        {/* SERVICE PACKAGES */}
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px 16px", position: "relative" }}>
          <span className="seclabel">{ui.servicePackages}</span>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 18 }}>
            {SERVICES.map((p, i) => {
              const pr = svcPrice(p);
              const hl = !!p.badge;
              return (
                <div key={p.id} className={`pc ${vis[i] ? "ci" : "co"}`} style={{ background: hl ? "linear-gradient(160deg,#130D2B,#0D0D1E)" : C.card, border: `1px solid ${hl ? C.gold + "50" : C.border}`, borderRadius: 20, padding: "30px 26px 26px", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden", boxShadow: hl ? `0 0 60px ${C.gold}18,0 20px 40px rgba(0,0,0,.4)` : "0 8px 30px rgba(0,0,0,.3)" }}>
                  {hl && p.badge && <div style={{ position: "absolute", top: 0, insetInlineStart: "50%", transform: "translateX(-50%)", background: `linear-gradient(90deg,${C.gold},${C.goldMid})`, color: "#07070F", fontFamily: isRTL ? "'DM Sans',sans-serif" : "'Cinzel',serif", fontSize: 9, letterSpacing: ".22em", padding: "5px 20px", borderRadius: "0 0 12px 12px", fontWeight: 700 }}>{pick(p.badge)}</div>}
                  <div style={{ position: "absolute", top: 0, insetInlineEnd: 0, width: 120, height: 120, background: `radial-gradient(circle at top right,${p.tagC}12,transparent 70%)`, pointerEvents: "none" }} />
                  <div style={{ marginTop: hl ? "16px" : "0", marginBottom: 8 }}>
                    {p.type === "B2C" ? <span className="b2cl">{ui.directPurchase}</span> : <span className="b2bl">{ui.advisoryService}</span>}
                  </div>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: `${p.tagC}18`, border: `1px solid ${p.tagC}40`, borderRadius: 30, padding: "5px 14px", marginBottom: 14, alignSelf: "flex-start" }}>
                    <span style={{ fontSize: 9, color: p.tagC }}>◆</span>
                    <span style={{ color: p.tagC, fontFamily: "'DM Sans',sans-serif", fontSize: 10, letterSpacing: ".15em", textTransform: "uppercase", fontWeight: 500 }}>{pick(p.tag)}</span>
                  </div>
                  <h2 style={{ fontFamily: isRTL ? "'DM Sans',sans-serif" : "'Cinzel',serif", fontSize: "clamp(16px,2vw,20px)", fontWeight: 600, lineHeight: 1.2, color: C.text, marginBottom: 10, letterSpacing: ".02em" }}>{pick(p.name)}</h2>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: C.muted, lineHeight: 1.7, marginBottom: 16, fontWeight: 300 }}>{pick(p.desc)}</p>
                  <div style={{ height: 1, background: `linear-gradient(90deg,${p.tagC}30,transparent)`, marginBottom: 16 }} />
                  <ul style={{ listStyle: "none", marginBottom: 16, flex: 1, padding: 0 }}>
                    {p.features[lang].map((f, fi) => <li key={fi} className="fl">{f}</li>)}
                  </ul>
                  <div style={{ background: `${p.tagC}0D`, border: `1px solid ${p.tagC}25`, borderRadius: 10, padding: "11px 14px", marginBottom: 18 }}>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: `${p.tagC}CC`, lineHeight: 1.6, fontStyle: "italic" }}>💡 {pick(p.why)}</p>
                  </div>
                  <div className={`pf${anim ? " out" : ""}`} style={{ marginBottom: 16 }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
                      <span style={{ fontFamily: isRTL ? "'DM Sans',sans-serif" : "'Cinzel',serif", fontSize: "clamp(22px,3vw,30px)", fontWeight: 700, color: C.gold }}>{pr.main}</span>
                    </div>
                    {pr.sub && <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: `${C.gold}70`, marginTop: 3 }}>{pr.sub}</p>}
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: C.muted, marginTop: 4, letterSpacing: ".03em" }}>{pr.period}</p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {p.type === "B2C" ? (
                      <><button className="btnb" onClick={() => openM(p, "pay")}>{ui.payNow}</button><button className="blink" onClick={() => openM(p, "enquire")}>{ui.enquireFirst}</button></>
                    ) : (
                      <><button className="btneg" onClick={() => openM(p, "enquire")}>{ui.enquireNow}</button><p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, color: C.muted, textAlign: "center", lineHeight: 1.5 }}>{ui.personalisedScope}</p></>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* DIGITAL STORE */}
        <div style={{ maxWidth: 1100, margin: "48px auto 0", padding: "0 20px", position: "relative" }}>
          <span className="seclabel">{ui.digitalResources}</span>
          <div style={{ display: "flex", gap: 8, marginBottom: 20, overflowX: "auto", paddingBottom: 4 }}>
            {FILTER_KEYS.filter((k) => mkt === "KSA" || k !== "ksa").map((k) => (
              <button key={k} className="ftab" onClick={() => setFilter(k)} style={{ borderColor: filter === k ? C.gold : C.border, background: filter === k ? C.goldDim : "transparent", color: filter === k ? C.gold : C.muted }}>
                {ui.filters[k]}
              </button>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 14, marginBottom: 20 }}>
            {filteredStore().map((p) => {
              const pr = storePrice(p);
              return (
                <div key={p.id} className="pc" style={{ background: p.comingSoon ? `linear-gradient(160deg,#0D0B1E,#130D2B)` : C.card, border: `1px solid ${p.comingSoon ? C.purple + "60" : C.border}`, borderRadius: 14, padding: 16, display: "flex", flexDirection: "column", gap: 8, position: "relative", overflow: "hidden", opacity: p.comingSoon ? 0.92 : 1 }}>
                  <div style={{ position: "absolute", top: 0, insetInlineStart: 0, insetInlineEnd: 0, height: 2, background: p.comingSoon ? `linear-gradient(90deg,${C.purple},#A020F0)` : `linear-gradient(90deg,${C.purple},${C.gold})` }} />
                  {p.isNew && <span style={{ position: "absolute", top: 8, insetInlineEnd: 8, fontSize: 8, fontWeight: 700, background: C.purple, color: "white", padding: "2px 7px", borderRadius: 4, letterSpacing: ".1em" }}>{lang === "ar" ? "جديد ★" : "NEW ★"}</span>}
                  {p.badge && (() => {
                    const badgeText = pick(p.badge);
                    const isHot = ["BESTSELLER", "MOST VALUE", "الأكثر مبيعًا", "الأكثر قيمة"].includes(badgeText);
                    return (
                      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: ".12em", color: isHot ? "#09071A" : C.gold, background: isHot ? C.gold : C.goldDim, border: `1px solid ${C.gold}50`, padding: "2px 8px", borderRadius: 4, alignSelf: "flex-start" }}>{badgeText}</div>
                    );
                  })()}
                  <div style={{ fontSize: 8, color: C.gold, letterSpacing: ".22em", fontWeight: 600, fontFamily: "'DM Sans',sans-serif" }}>{pick(p.cat)}</div>
                  <h3 style={{ fontFamily: isRTL ? "'DM Sans',sans-serif" : "'Cinzel',serif", fontSize: "clamp(13px,1.8vw,16px)", fontWeight: 700, lineHeight: 1.3, color: "white", flex: 1 }}>{pick(p.name)}</h3>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: C.muted, lineHeight: 1.6 }}>{pick(p.desc)}</p>
                  <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 10, display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 6 }}>
                    <div>
                      {p.comingSoon ? (
                        <div style={{ fontFamily: isRTL ? "'DM Sans',sans-serif" : "'Cinzel',serif", fontSize: 13, fontWeight: 700, color: C.muted, letterSpacing: ".05em" }}>{ui.pricingTBA}</div>
                      ) : (
                        <>
                          <div style={{ fontFamily: isRTL ? "'DM Sans',sans-serif" : "'Cinzel',serif", fontSize: 17, fontWeight: 700, color: C.gold }}>{pr.main}</div>
                          {pr.sub && <div style={{ fontSize: 9, color: `${C.gold}70`, fontFamily: "'DM Sans',sans-serif", marginTop: 2 }}>{pr.sub}</div>}
                        </>
                      )}
                    </div>
                    {p.comingSoon ? (
                      <button onClick={() => openM(p, "enquire")} style={{ padding: "8px 13px", borderRadius: 8, border: `1px solid ${C.purple}`, background: "transparent", color: C.purple, fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap", transition: "all .2s", flexShrink: 0 }}>
                        {ui.notifyMe}
                      </button>
                    ) : (
                      <button onClick={() => openM(p, p.cta === "buy" ? "pay" : "enquire")} style={{ padding: "8px 13px", borderRadius: 8, background: p.cta === "buy" ? C.gold : "transparent", color: p.cta === "buy" ? "#07070F" : C.gold, border: p.cta !== "buy" ? `1px solid ${C.gold}` : "none", fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap", transition: "all .2s", flexShrink: 0 }}>
                        {p.cta === "buy" ? ui.buyNow : ui.enquire}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* TAX DISCLAIMER */}
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "8px 20px 48px", textAlign: "center", position: "relative" }}>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: C.muted, lineHeight: 1.7, fontWeight: 300 }}>
            {ui.taxDisclaimer}
          </p>
        </div>

        {/* DIFFERENTIATORS */}
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px", position: "relative" }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, letterSpacing: ".25em", color: C.gold, textTransform: "uppercase", marginBottom: 10 }}>◆ ◆ ◆</p>
            <h3 style={{ fontFamily: isRTL ? "'DM Sans',sans-serif" : "'Cinzel',serif", fontSize: "clamp(16px,2.5vw,22px)", fontWeight: 600, color: C.text, letterSpacing: ".04em" }}>{ui.whyTitle}</h3>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: C.muted, marginTop: 8, fontWeight: 300 }}>{ui.whySub}</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(165px,1fr))", gap: 12, marginBottom: 40 }}>
            {DIFFS.map((d, i) => (
              <div key={i} className="dc" style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 14px", textAlign: "center" }}>
                <div style={{ fontSize: 22, marginBottom: 10 }}>{d.icon}</div>
                <h4 style={{ fontFamily: isRTL ? "'DM Sans',sans-serif" : "'Cinzel',serif", fontSize: 10, color: C.gold, letterSpacing: ".1em", marginBottom: 6, textTransform: "uppercase" }}>{pick(d.t)}</h4>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: C.muted, lineHeight: 1.6, fontWeight: 300 }}>{pick(d.b)}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", padding: 26, border: `1px solid ${C.gold}25`, borderRadius: 16, background: C.goldDim, marginBottom: 20 }}>
            <p style={{ fontFamily: isRTL ? "'DM Sans',sans-serif" : "'Cormorant Garamond',serif", fontSize: "clamp(14px,2.5vw,19px)", color: `${C.text}CC`, fontStyle: "italic", fontWeight: 400, lineHeight: 1.7, marginBottom: 12 }}>
              {ui.quote}
            </p>
            <span style={{ fontFamily: isRTL ? "'DM Sans',sans-serif" : "'Cinzel',serif", fontSize: 10, color: C.gold, letterSpacing: ".2em", textTransform: "uppercase" }}>
              {ui.quoteCaption}
            </span>
          </div>
        </div>

        {/* MODAL */}
        {modal && (
          <div ref={oRef} onClick={onOverlay} dir={isRTL ? "rtl" : "ltr"} style={{ position: "fixed", inset: 0, background: "rgba(7,7,15,.88)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 16 }}>
            <div className="mbox" style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 20, width: "100%", maxWidth: 480, maxHeight: "92vh", overflowY: "auto", position: "relative" }}>
              <button onClick={closeM} style={{ position: "absolute", top: 16, insetInlineEnd: 18, background: "none", border: "none", color: C.muted, fontSize: 20, cursor: "pointer", lineHeight: 1, zIndex: 10 }}>✕</button>

              {modal.mode === "pay" && (
                <div style={{ padding: "30px 26px" }}>
                  {step === "form" && (
                    <>
                      <div style={{ background: `${C.gold}0A`, border: `1px solid ${C.gold}30`, borderRadius: 12, padding: 16, marginBottom: 22 }}>
                        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, color: C.gold, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: 6 }}>{ui.orderSummary}</p>
                        <p style={{ fontFamily: isRTL ? "'DM Sans',sans-serif" : "'Cinzel',serif", fontSize: 14, color: C.text, marginBottom: 6 }}>{pick(modal.prod.name)}</p>
                        <span style={{ fontFamily: isRTL ? "'DM Sans',sans-serif" : "'Cinzel',serif", fontSize: 24, color: C.gold, fontWeight: 700 }}>{modalPrice()}</span>
                        {modal.prod.section === "service" && svcPrice(modal.prod as ServiceProduct).sub && (
                          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, color: `${C.gold}70`, marginTop: 3 }}>{svcPrice(modal.prod as ServiceProduct).sub}</p>
                        )}
                        {modal.prod.section === "store" && storePrice(modal.prod as StoreProduct).sub && (
                          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, color: `${C.gold}70`, marginTop: 3 }}>{storePrice(modal.prod as StoreProduct).sub}</p>
                        )}
                      </div>
                      <h3 style={{ fontFamily: isRTL ? "'DM Sans',sans-serif" : "'Cinzel',serif", fontSize: 15, color: C.text, marginBottom: 18, letterSpacing: ".04em" }}>{ui.yourDetails}</h3>
                      <Fields fd={fd} setFd={setFd} showMsg={false} ui={ui} lang={lang} />
                      <div style={{ marginTop: 22 }}>
                        <button className="btnb" onClick={submit} style={{ marginBottom: 10 }} disabled={!canGo}>{ui.continuePayment}</button>
                        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, color: C.muted, textAlign: "center" }}>{ui.dataProtected}</p>
                      </div>
                    </>
                  )}
                  {step === "payment" && (
                    <>
                      <div style={{ textAlign: "center", marginBottom: 22 }}>
                        <div style={{ width: 50, height: 50, background: `${C.gold}18`, border: `1px solid ${C.gold}40`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, margin: "0 auto 14px" }}>✓</div>
                        <h3 style={{ fontFamily: isRTL ? "'DM Sans',sans-serif" : "'Cinzel',serif", fontSize: 15, color: C.text, marginBottom: 6 }}>{ui.detailsConfirmed}</h3>
                        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: C.muted }}>{ui.helloSelectPay(fd.name)}</p>
                      </div>
                      <div style={{ background: `${C.gold}08`, border: `1px solid ${C.gold}25`, borderRadius: 10, padding: "12px 14px", marginBottom: 18, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: C.muted }}>{pick(modal.prod.short)}</span>
                        <span style={{ fontFamily: isRTL ? "'DM Sans',sans-serif" : "'Cinzel',serif", fontSize: 16, color: C.gold, fontWeight: 700 }}>{modalPrice()}</span>
                      </div>
                      <div style={{ background: `${C.green}0A`, border: `1px solid ${C.green}25`, borderRadius: 12, padding: "12px 14px", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ fontSize: 18 }}>🔒</span>
                        <div>
                          <p style={{ fontFamily: isRTL ? "'DM Sans',sans-serif" : "'Cinzel',serif", fontSize: 11, color: "#2DC99A", letterSpacing: ".1em" }}>{ui.secureCheckout}</p>
                          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, color: C.muted, marginTop: 2 }}>{ui.pciNote}</p>
                        </div>
                      </div>
                      <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, color: C.muted, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 12 }}>{ui.selectPayment}</p>
                      <div style={{ display: "flex", flexDirection: "column", gap: 9, marginBottom: 20 }}>
                        {PAY_METHODS.map((o, i) => (
                          <a key={i} href="https://paymob.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                            <div className="popt">
                              <span style={{ fontSize: 20, flexShrink: 0 }}>{o.icon}</span>
                              <div style={{ flex: 1 }}>
                                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: C.text, fontWeight: 500 }}>{o.l}</p>
                                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: C.muted, marginTop: 2 }}>{o.s}</p>
                              </div>
                              <span style={{ color: C.gold, fontSize: 15, flexShrink: 0 }}>{isRTL ? "←" : "→"}</span>
                            </div>
                          </a>
                        ))}
                      </div>
                      <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, color: C.muted, textAlign: "center", lineHeight: 1.6 }}>
                        {ui.paymentNote}
                      </p>
                    </>
                  )}
                </div>
              )}

              {modal.mode === "enquire" && (
                <div style={{ padding: "30px 26px" }}>
                  {step === "form" && (
                    <>
                      <div style={{ marginBottom: 18 }}>
                        {(modal.prod as StoreProduct).comingSoon ? (
                          <span style={{ display: "inline-flex", alignItems: "center", gap: 5, background: `${C.purple}18`, border: `1px solid ${C.purple}40`, borderRadius: 20, padding: "3px 10px", fontFamily: "'DM Sans',sans-serif", fontSize: 9.5, color: "#C090E8", letterSpacing: ".07em" }}>{ui.comingSoonBadge}</span>
                        ) : modal.prod.type === "B2C" ? <span className="b2cl">{ui.directPurchase}</span> : <span className="b2bl">{ui.advisoryService}</span>}
                        <h3 style={{ fontFamily: isRTL ? "'DM Sans',sans-serif" : "'Cinzel',serif", fontSize: 16, color: C.text, marginTop: 10, marginBottom: 8, letterSpacing: ".03em" }}>
                          {(modal.prod as StoreProduct).comingSoon ? ui.earlyAccessTitle : ui.enquireAboutTitle}
                        </h3>
                        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: C.muted, lineHeight: 1.6 }}>
                          {(modal.prod as StoreProduct).comingSoon
                            ? ui.earlyAccessDesc
                            : modal.prod.type === "B2C"
                              ? ui.enquireB2CDesc
                              : ui.enquireB2BDesc}
                        </p>
                      </div>
                      <div style={{ background: `${C.gold}0A`, border: `1px solid ${C.gold}25`, borderRadius: 10, padding: "12px 14px", marginBottom: 18, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: C.muted }}>{pick(modal.prod.short)}</span>
                        <span style={{ fontFamily: isRTL ? "'DM Sans',sans-serif" : "'Cinzel',serif", fontSize: 14, color: C.gold, fontWeight: 700 }}>{modalPrice()}</span>
                      </div>
                      <Fields fd={fd} setFd={setFd} showMsg={true} ui={ui} lang={lang} />
                      <div style={{ marginTop: 22 }}>
                        <button className={(modal.prod as StoreProduct).comingSoon ? "btneg" : modal.prod.type === "B2C" ? "btnb" : "btneg"} onClick={submit} style={{ marginBottom: 10 }} disabled={!canGo}>
                          {(modal.prod as StoreProduct).comingSoon ? ui.registerEarly : ui.submitEnquiry}
                        </button>
                        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, color: C.muted, textAlign: "center" }}>
                          {(modal.prod as StoreProduct).comingSoon ? ui.notifyAtLaunch : ui.respondHours}
                        </p>
                      </div>
                    </>
                  )}
                  {step === "success" && (
                    <div style={{ textAlign: "center", padding: "16px 0" }}>
                      <div style={{ width: 60, height: 60, background: `${C.gold}18`, border: `1px solid ${C.gold}40`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, margin: "0 auto 18px" }}>✓</div>
                      <h3 style={{ fontFamily: isRTL ? "'DM Sans',sans-serif" : "'Cinzel',serif", fontSize: 17, color: C.text, marginBottom: 12 }}>
                        {(modal.prod as StoreProduct).comingSoon ? ui.registrationConfirmed : ui.enquiryReceived}
                      </h3>
                      <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: C.muted, lineHeight: 1.75, marginBottom: 22 }}>
                        {(modal.prod as StoreProduct).comingSoon
                          ? ui.thanksEarlyAccess(fd.name)
                          : ui.thanksEnquiry(fd.name, modal.prod.type === "B2B")}
                      </p>
                      <div style={{ background: `${C.gold}08`, border: `1px solid ${C.gold}25`, borderRadius: 12, padding: 14, marginBottom: 18 }}>
                        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: `${C.gold}CC`, lineHeight: 1.6 }}>
                          {ui.urgent}
                        </p>
                      </div>
                      <button className="btne" onClick={closeM}>{ui.close}</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
