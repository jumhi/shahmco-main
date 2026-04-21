import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { ArrowRight, AlertCircle, MessageCircle, Printer, RotateCcw, ShieldCheck, Lock, Mail } from "lucide-react";
import { Section, FadeIn } from "@/components/SectionComponents";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/i18n/LanguageContext";
import type { Language } from "@/i18n/types";
import afwaajLogo from "@/assets/partners/afwaaj.png";
import sultanLogo from "@/assets/partners/sultan-global.png";
import hamumyLogo from "@/assets/partners/al-hamumy.png";
import coastHajjLogo from "@/assets/partners/coast-hajj.png";
import northCoastLogo from "@/assets/partners/north-coast.png";

const PARTNERS = [
  { name: "Coast Hajj Affairs", logo: coastHajjLogo, tagKey: "p_coast" },
  { name: "AFWAAJ Group", logo: afwaajLogo, tagKey: "p_afwaaj" },
  { name: "North Coast Travel", logo: northCoastLogo, tagKey: "p_north" },
  { name: "Sultan Global Group", logo: sultanLogo, tagKey: "p_sultan" },
  { name: "AL-HAMUMY LTD", logo: hamumyLogo, tagKey: "p_hamumy" },
];

// ═══════════════════════════════════════ I18N ═══════════════════════════════════════
type VS = {
  brand: string; titleA: string; titleB: string; subtitle: string;
  badgeLicensed: string; badgeEncrypted: string; badgeReviewed: string;
  poweredBy: string; partnerNetA: string; partnerNetB: string; partnerNote: string;
  p_coast: string; p_afwaaj: string; p_north: string; p_sultan: string; p_hamumy: string;
  steps: [string, string, string, string];
  s1Title1: string; s1Title2: string; s1Sub: string; s1Threshold: string; s1Continue: string;
  s2Title: string; s2Intro: string; s2For: string;
  s2Name: string; s2NameP: string; s2Email: string; s2EmailP: string;
  s2Wa: string; s2WaP: string; s2Nat: string; s2NatP: string;
  s2Cat: string; s2CatP: string; s2Days: string;
  s2Consent: string; s2Back: string; s2Begin: string;
  s3Total: string; s3Verdict: string; s3Of: string; s3Scored: string; s3Dest: string;
  s3Pts: string; s3Flags: string; s3FlagsTitle: string;
  s3Notes: string; s3NotesP: string; s3Back: string; s3Submit: string; s3Sending: string;
  lvl: [string, string, string, string]; notScored: string;
  s4Book: string; s4BookSub: string; s4Contact: string;
  s4Save: string; s4SaveSub: string; s4Print: string;
  s4RecTitle: string;
  s4FinalScore: string; s4Threshold: string; s4FlagsRaised: string;
  s4Booking: string; s4New: string;
  verdictPass: string; verdictReview: string; verdictFail: string; verdictFlagged: string;
  flagInfo: (n: number) => string;
  passInfo: (s: number, name: string, t: number) => string;
  reviewInfo: (s: number, t: number) => string;
  failInfo: (s: number, t: number) => string;
  recPass: (n: string, t: number, name: string) => React.ReactNode;
  recReview: (n: string, t: number, name: string) => React.ReactNode;
  recFail: (n: string, t: number, name: string) => React.ReactNode;
  resultPass: (n: string, name: string, s: number, t: number) => string;
  resultReview: (n: string, name: string, s: number, t: number) => string;
  resultFail: (n: string, name: string, s: number, t: number) => string;
  resultFlag: (n: string, c: number) => string;
  toastSent: string; toastSentDesc: string; toastFail: string; toastFailDesc: string;
  errName: string; errEmail: string; errWa: string; errNat: string; errCat: string;
  disclaimer1: string; disclaimer2: string;
  // criteria
  cFunds: string; cFundsD: string; cAvg: string; cAvgD: string; cSrc: string; cSrcD: string;
  cEmp: string; cEmpD: string; cRatio: string; cRatioD: string; cTax: string; cTaxD: string;
  cProp: string; cPropD: string; cFamily: string; cFamilyD: string; cHist: string; cHistD: string;
  cAcc: string; cAccD: string; cIns: string; cInsD: string; cItin: string; cItinD: string;
  sect1: string; sect2: string; sect3: string; sect4: string;
  flagParking: string; flagRefusal: string; flagOverstay: string; flagInconsist: string;
  flagLowbal: string; flagNoincome: string; flagCriminal: string;
};

const STR: Record<Language, VS> = {
  en: {
    brand: "VISASCORE PRO™", titleA: "Visa Readiness", titleB: "Assessment",
    subtitle: "Pre-screening advisory tool — does not guarantee visa approval or replace official embassy assessment.",
    badgeLicensed: "SPCFZ Licensed · No. 4423928.01", badgeEncrypted: "Encrypted Submission", badgeReviewed: "Reviewed by Specialists",
    poweredBy: "Powered By", partnerNetA: "Our Trusted", partnerNetB: "Partner Network",
    partnerNote: "Operating in coordination with licensed corporate, travel & visa partners across the GCC.",
    p_coast: "Hajj & Umrah Affairs", p_afwaaj: "Hajj & Umrah Elite Services",
    p_north: "IATA Accredited Agent", p_sultan: "Corporate Partner", p_hamumy: "Travel & Visa Services",
    steps: ["Destination", "Your Details", "Score", "Results"],
    s1Title1: "Choose Your", s1Title2: "Destination",
    s1Sub: "Select the country you wish to apply for. We'll apply the correct financial thresholds and assessment criteria.",
    s1Threshold: "Threshold", s1Continue: "Continue — Enter Your Details",
    s2Title: "Your Details",
    s2Intro: "your information is used only for this assessment and follow-up.", s2For: "For",
    s2Name: "Full Name", s2NameP: "John Smith", s2Email: "Email", s2EmailP: "you@example.com",
    s2Wa: "WhatsApp Number", s2WaP: "+971 50 123 4567", s2Nat: "Nationality", s2NatP: "United Arab Emirates",
    s2Cat: "Visa Category", s2CatP: "Select category…", s2Days: "Trip Duration (days)",
    s2Consent: "By continuing you agree to be contacted by SHAHMCO Global about your visa assessment.",
    s2Back: "← Back", s2Begin: "Begin Scoring",
    s3Total: "Total Score", s3Verdict: "Verdict", s3Of: "of", s3Scored: "criteria scored",
    s3Dest: "Destination", s3Pts: "pts",
    s3Flags: "Automatic Disqualifiers — Check All That Apply", s3FlagsTitle: "Disqualifiers",
    s3Notes: "Consultant Notes", s3NotesP: "Additional context, special circumstances, or observations...",
    s3Back: "← Back", s3Submit: "View Full Results & Email Report", s3Sending: "Sending…",
    lvl: ["None", "Weak", "OK", "Strong"], notScored: "Not scored",
    s4Book: "Book a 1-on-1 Specialist",
    s4BookSub: "Speak directly with a certified SHAHMCO consultant who will review your complete file.",
    s4Contact: "Contact us",
    s4Save: "Save Your Score Report", s4SaveSub: "Download a printable copy to share with your consultant or keep for reference.",
    s4Print: "Print / Save",
    s4RecTitle: "SHAHMCO Consultant Recommendation",
    s4FinalScore: "Final Score", s4Threshold: "Threshold", s4FlagsRaised: "Flags Raised",
    s4Booking: "Book Consultation", s4New: "New Assessment",
    verdictPass: "✓ Recommend", verdictReview: "~ Review", verdictFail: "✕ Not Ready", verdictFlagged: "⚑ Flagged",
    flagInfo: (n) => `${n} disqualifier(s) triggered. Application not advisable.`,
    passInfo: (s, name, t) => `Score ${s}/100 meets ${name} threshold of ${t}.`,
    reviewInfo: (s, t) => `Borderline — ${s}/100 vs threshold ${t}. Strengthen weak areas.`,
    failInfo: (s, t) => `Insufficient — ${s}/100 well below threshold ${t}.`,
    recPass: (n, t, name) => <>Score above the threshold of {t} for {name}. The financial profile is credible. <strong className="text-foreground">Proceed to full application preparation.</strong> Ensure all documents are current (within 3 months) and consistent in purpose, itinerary, and financial narrative. A SHAHMCO specialist can perform a final document review before submission.</>,
    recReview: (n, t, name) => <>Below the threshold for {name}. Application is possible but carries elevated refusal risk. <strong className="text-foreground">Recommended actions:</strong> build bank balance over 2–3 months; obtain stronger employment documentation; add property/lease evidence; include all travel history. <strong className="text-foreground">A SHAHMCO consultation is strongly advised.</strong></>,
    recFail: (n, t, name) => <>Well below the threshold for {name}. <strong className="text-foreground">Submitting now carries very high refusal risk</strong>, creating a negative immigration record. <strong className="text-foreground">Preparation plan:</strong> build consistent balance over 4–6 months; obtain formal employment documentation; establish home country ties. <strong className="text-foreground">Book a SHAHMCO consultation for a personalised roadmap.</strong></>,
    resultPass: (n, name, s, t) => `${n} presents a strong financial profile for ${name}. Score of ${s}/100 exceeds the advisory threshold of ${t}.`,
    resultReview: (n, name, s, t) => `${n} is borderline for ${name}. Score of ${s}/100 is close to but below the threshold of ${t}.`,
    resultFail: (n, name, s, t) => `${n}'s current profile is significantly below requirements for ${name}. Score: ${s}/100, threshold: ${t}.`,
    resultFlag: (n, c) => `${n} has triggered ${c} disqualifier(s). These are hard stops regardless of financial score.`,
    toastSent: "Assessment sent", toastSentDesc: "A SHAHMCO specialist will follow up shortly.",
    toastFail: "Submission failed", toastFailDesc: "Please try again or contact us directly.",
    errName: "Name required", errEmail: "Valid email required", errWa: "WhatsApp required",
    errNat: "Nationality required", errCat: "Select a category",
    disclaimer1: "SHAHMCO Global FZC LLC · License No. 4423928.01 · SPCFZ, Sharjah, UAE",
    disclaimer2: "VisaScore Pro™ is a pre-screening advisory tool. It does not guarantee visa approval or replace official embassy assessment.",
    cFunds: "Minimum Daily Fund Requirement", cFundsD: "Required funds must be present and visible in statements before application date.",
    cAvg: "3–6 Month Average Balance Stability", cAvgD: "Consistent average — not a sudden pre-application peak. Stability matters more than any single high month.",
    cSrc: "Source of Funds Clarity", cSrcD: "Salary, business income, or investment returns clearly identifiable. No unexplained large cash deposits.",
    cEmp: "Employment Status & Duration", cEmpD: "Formal employment letter + payslips required. Min 12 months preferred. Self-employed: audited accounts + trade licence.",
    cRatio: "Monthly Income vs Total Trip Cost Ratio", cRatioD: "Net monthly income should be ≥ 2× total trip cost. Higher ratio = stronger profile.",
    cTax: "Tax Returns / Income Declarations", cTaxD: "Last 1–2 years of tax filings. Critical for Ireland, UK, Canada, Australia.",
    cProp: "Property / Real Estate Ownership", cPropD: "Title deed (owned) is strongest. Long-term lease acceptable. UAE residency holders score positively.",
    cFamily: "Family Dependents Remaining at Home", cFamilyD: "Spouse, children, aging parents in home country = strong return motive.",
    cHist: "Prior Visa Compliance & Travel History", cHistD: "Previous visas with no overstay. Prior visits to same destination = strong positive.",
    cAcc: "Accommodation & Invitation Evidence", cAccD: "Hotel bookings, Airbnb, notarized invitation, or Hajj/Umrah operator confirmation.",
    cIns: "Travel Insurance Coverage", cInsD: "Schengen mandatory €30k. Saudi/Hajj required by MOFA. Must cover full territory and duration.",
    cItin: "Itinerary Coherence & Purpose Clarity", cItinD: "Travel purpose must be consistent across ALL submitted documents.",
    sect1: "Bank Balance & Liquid Funds", sect2: "Employment & Income Stability",
    sect3: "Home Country Ties & Return Intent", sect4: "Travel Documentation Quality",
    flagParking: "Funds parking detected — large unexplained deposit within 30 days of application",
    flagRefusal: "Prior visa refusal(s) not disclosed upfront by applicant",
    flagOverstay: "Prior overstay or immigration violation on record",
    flagInconsist: "Income declared on statements inconsistent with employment letter or tax returns",
    flagLowbal: "Account balance drops to near-zero between salary credits",
    flagNoincome: "No verifiable employment or income source whatsoever",
    flagCriminal: "Known criminal record or pending legal matters",
  },
  ar: {
    brand: "فيزا سكور برو™", titleA: "تقييم جاهزية", titleB: "التأشيرة",
    subtitle: "أداة استشارية للفحص المسبق — لا تضمن الموافقة على التأشيرة ولا تحل محل التقييم الرسمي للسفارة.",
    badgeLicensed: "مرخّص من SPCFZ · رقم 4423928.01", badgeEncrypted: "إرسال مشفّر", badgeReviewed: "مراجعة من مختصين",
    poweredBy: "مدعوم من", partnerNetA: "شبكة شركائنا", partnerNetB: "الموثوقين",
    partnerNote: "نعمل بالتنسيق مع شركاء مرخصين في خدمات الشركات والسفر والتأشيرات في دول الخليج.",
    p_coast: "شؤون الحج والعمرة", p_afwaaj: "خدمات الحج والعمرة المميّزة",
    p_north: "وكيل معتمد لدى إياتا", p_sultan: "شريك مؤسسي", p_hamumy: "السفر وخدمات التأشيرات",
    steps: ["الوجهة", "بياناتك", "التقييم", "النتائج"],
    s1Title1: "اختر", s1Title2: "وجهتك",
    s1Sub: "اختر الدولة التي تنوي التقديم إليها. سنطبّق المعايير والحدّ المالي المناسب.",
    s1Threshold: "الحد", s1Continue: "متابعة — أدخل بياناتك",
    s2Title: "بياناتك",
    s2Intro: "تُستخدم بياناتك فقط لهذا التقييم والمتابعة.", s2For: "إلى",
    s2Name: "الاسم الكامل", s2NameP: "محمد أحمد", s2Email: "البريد الإلكتروني", s2EmailP: "you@example.com",
    s2Wa: "رقم واتساب", s2WaP: "+971 50 123 4567", s2Nat: "الجنسية", s2NatP: "الإمارات العربية المتحدة",
    s2Cat: "نوع التأشيرة", s2CatP: "اختر نوعًا…", s2Days: "مدة الرحلة (أيام)",
    s2Consent: "بمتابعتك، فإنك توافق على أن تتواصل معك شهمكو غلوبال بشأن تقييم تأشيرتك.",
    s2Back: "→ رجوع", s2Begin: "ابدأ التقييم",
    s3Total: "النتيجة الإجمالية", s3Verdict: "الحكم", s3Of: "من", s3Scored: "معايير تم تقييمها",
    s3Dest: "الوجهة", s3Pts: "نقطة",
    s3Flags: "موانع تلقائية — اختر ما ينطبق", s3FlagsTitle: "موانع",
    s3Notes: "ملاحظات المستشار", s3NotesP: "سياق إضافي أو ظروف خاصة...",
    s3Back: "→ رجوع", s3Submit: "عرض النتائج وإرسال التقرير", s3Sending: "جارٍ الإرسال…",
    lvl: ["لا يوجد", "ضعيف", "مقبول", "قوي"], notScored: "غير مُقيَّم",
    s4Book: "احجز جلسة استشارية فردية",
    s4BookSub: "تحدث مباشرة مع مستشار شهمكو معتمد لمراجعة ملفك بالكامل.",
    s4Contact: "تواصل معنا",
    s4Save: "احفظ تقرير نتيجتك", s4SaveSub: "حمّل نسخة قابلة للطباعة لمشاركتها مع مستشارك.",
    s4Print: "طباعة / حفظ",
    s4RecTitle: "توصية مستشار شهمكو",
    s4FinalScore: "النتيجة النهائية", s4Threshold: "الحد", s4FlagsRaised: "الموانع المُثارة",
    s4Booking: "احجز استشارة", s4New: "تقييم جديد",
    verdictPass: "✓ موصى به", verdictReview: "~ مراجعة", verdictFail: "✕ غير جاهز", verdictFlagged: "⚑ موانع",
    flagInfo: (n) => `تم تفعيل ${n} مانع. التقديم غير مستحسن.`,
    passInfo: (s, name, t) => `النتيجة ${s}/100 تتجاوز الحد المطلوب لـ ${name} (${t}).`,
    reviewInfo: (s, t) => `حدّي — ${s}/100 مقابل الحد ${t}. عزّز نقاط الضعف.`,
    failInfo: (s, t) => `غير كافٍ — ${s}/100 أقل بكثير من الحد ${t}.`,
    recPass: (n, t, name) => <>النتيجة تتجاوز الحد المطلوب لـ {name} ({t}). الملف المالي موثوق. <strong className="text-foreground">انتقل إلى تجهيز الطلب الكامل.</strong> تأكّد أن جميع الوثائق سارية (آخر 3 أشهر) ومتسقة. يمكن لمختص شهمكو إجراء مراجعة نهائية قبل التقديم.</>,
    recReview: (n, t, name) => <>أقل من الحد المطلوب لـ {name}. التقديم ممكن لكن مع مخاطر رفض مرتفعة. <strong className="text-foreground">إجراءات موصى بها:</strong> رفع الرصيد خلال 2–3 أشهر؛ تقوية وثائق العمل؛ إضافة دليل ملكية أو إيجار. <strong className="text-foreground">يُنصح بشدة باستشارة شهمكو.</strong></>,
    recFail: (n, t, name) => <>أقل بكثير من الحد المطلوب لـ {name}. <strong className="text-foreground">التقديم الآن يحمل مخاطر رفض عالية جدًا.</strong> <strong className="text-foreground">خطة التحضير:</strong> بناء رصيد ثابت خلال 4–6 أشهر؛ توثيق العمل رسميًا؛ إثبات روابط البلد. <strong className="text-foreground">احجز استشارة شهمكو لخارطة طريق شخصية.</strong></>,
    resultPass: (n, name, s, t) => `${n} يقدّم ملفًا ماليًا قويًا لـ ${name}. النتيجة ${s}/100 تتجاوز الحد الاستشاري ${t}.`,
    resultReview: (n, name, s, t) => `${n} في وضع حدّي لـ ${name}. النتيجة ${s}/100 قريبة لكنها أقل من الحد ${t}.`,
    resultFail: (n, name, s, t) => `ملف ${n} الحالي أقل بكثير من متطلبات ${name}. النتيجة: ${s}/100، الحد: ${t}.`,
    resultFlag: (n, c) => `أثار ${n} عدد ${c} من الموانع. هذه عوائق صارمة بغض النظر عن النتيجة المالية.`,
    toastSent: "تم إرسال التقييم", toastSentDesc: "سيتواصل معك مختص من شهمكو قريبًا.",
    toastFail: "فشل الإرسال", toastFailDesc: "حاول مرة أخرى أو تواصل معنا مباشرة.",
    errName: "الاسم مطلوب", errEmail: "بريد صحيح مطلوب", errWa: "رقم واتساب مطلوب",
    errNat: "الجنسية مطلوبة", errCat: "اختر نوعًا",
    disclaimer1: "شهمكو غلوبال FZC LLC · رخصة رقم 4423928.01 · SPCFZ، الشارقة، الإمارات",
    disclaimer2: "فيزا سكور برو™ أداة استشارية للفحص المسبق. لا تضمن الموافقة على التأشيرة ولا تحل محل تقييم السفارة الرسمي.",
    cFunds: "الحد الأدنى اليومي للأموال", cFundsD: "يجب أن تكون الأموال المطلوبة موجودة وظاهرة في الكشوف قبل تاريخ التقديم.",
    cAvg: "ثبات متوسط الرصيد لـ 3–6 أشهر", cAvgD: "متوسط ثابت — وليس قفزة مفاجئة قبل التقديم.",
    cSrc: "وضوح مصدر الأموال", cSrcD: "راتب أو دخل تجاري أو عوائد استثمارية واضحة. لا إيداعات نقدية كبيرة غير مبررة.",
    cEmp: "الوظيفة والمدة", cEmpD: "خطاب توظيف رسمي + كشوف رواتب. يفضّل 12 شهرًا. للأعمال الحرة: حسابات مدققة + رخصة.",
    cRatio: "الدخل الشهري مقابل تكلفة الرحلة", cRatioD: "يجب أن يكون الدخل الشهري ≥ ضعف تكلفة الرحلة.",
    cTax: "الإقرارات الضريبية", cTaxD: "آخر 1–2 سنة. مهم لإيرلندا، بريطانيا، كندا، أستراليا.",
    cProp: "ملكية عقار", cPropD: "صك الملكية الأقوى. عقد إيجار طويل مقبول. مقيمو الإمارات يحصلون على نقاط إيجابية.",
    cFamily: "المعالون في البلد", cFamilyD: "زوج/زوجة، أطفال، آباء كبار في البلد = دافع قوي للعودة.",
    cHist: "تاريخ الالتزام بالتأشيرات", cHistD: "تأشيرات سابقة دون تجاوز إقامة. زيارات سابقة لنفس الوجهة = إيجابي قوي.",
    cAcc: "إثبات الإقامة والدعوة", cAccD: "حجوزات فندقية، Airbnb، دعوة موثقة، أو تأكيد منظم حج/عمرة.",
    cIns: "تغطية تأمين السفر", cInsD: "شنغن إلزامي €30 ألف. السعودية/الحج إلزامي من وزارة الخارجية.",
    cItin: "اتساق خط الرحلة ووضوح الغرض", cItinD: "غرض السفر يجب أن يكون متسقًا في جميع الوثائق المقدمة.",
    sect1: "الرصيد والسيولة", sect2: "ثبات العمل والدخل",
    sect3: "روابط البلد ونيّة العودة", sect4: "جودة وثائق السفر",
    flagParking: "إيداع كبير غير مبرر خلال 30 يومًا من التقديم",
    flagRefusal: "رفض تأشيرة سابق لم يُفصح عنه مسبقًا",
    flagOverstay: "تجاوز إقامة سابق أو مخالفة هجرة مسجلة",
    flagInconsist: "الدخل في الكشوف لا يتطابق مع خطاب التوظيف أو الإقرارات",
    flagLowbal: "الرصيد ينخفض إلى الصفر تقريبًا بين الرواتب",
    flagNoincome: "لا يوجد مصدر عمل أو دخل قابل للتحقق",
    flagCriminal: "سجل جنائي معروف أو قضايا قانونية معلقة",
  },
  ru: {
    brand: "VISASCORE PRO™", titleA: "Оценка готовности", titleB: "к визе",
    subtitle: "Консультативный инструмент предварительной оценки — не гарантирует одобрение визы и не заменяет официальную оценку посольства.",
    badgeLicensed: "Лицензия SPCFZ · № 4423928.01", badgeEncrypted: "Шифрованная отправка", badgeReviewed: "Проверка специалистами",
    poweredBy: "Партнёры", partnerNetA: "Наша надёжная", partnerNetB: "партнёрская сеть",
    partnerNote: "Работаем совместно с лицензированными корпоративными, туристическими и визовыми партнёрами в странах GCC.",
    p_coast: "Хадж и Умра", p_afwaaj: "Премиум услуги Хадж и Умра",
    p_north: "Аккредитованный агент IATA", p_sultan: "Корпоративный партнёр", p_hamumy: "Путешествия и визы",
    steps: ["Направление", "Ваши данные", "Оценка", "Результаты"],
    s1Title1: "Выберите", s1Title2: "направление",
    s1Sub: "Выберите страну подачи. Мы применим правильные финансовые пороги и критерии оценки.",
    s1Threshold: "Порог", s1Continue: "Продолжить — Ввести данные",
    s2Title: "Ваши данные",
    s2Intro: "ваши данные используются только для этой оценки и связи.", s2For: "Для",
    s2Name: "Полное имя", s2NameP: "Иван Иванов", s2Email: "Email", s2EmailP: "you@example.com",
    s2Wa: "WhatsApp номер", s2WaP: "+971 50 123 4567", s2Nat: "Гражданство", s2NatP: "ОАЭ",
    s2Cat: "Категория визы", s2CatP: "Выберите категорию…", s2Days: "Длительность поездки (дней)",
    s2Consent: "Продолжая, вы соглашаетесь, что SHAHMCO Global свяжется с вами по поводу оценки визы.",
    s2Back: "← Назад", s2Begin: "Начать оценку",
    s3Total: "Общий балл", s3Verdict: "Вердикт", s3Of: "из", s3Scored: "критериев оценено",
    s3Dest: "Направление", s3Pts: "баллов",
    s3Flags: "Автоматические дисквалификаторы — отметьте применимые", s3FlagsTitle: "Дисквалификаторы",
    s3Notes: "Заметки консультанта", s3NotesP: "Дополнительный контекст или особые обстоятельства...",
    s3Back: "← Назад", s3Submit: "Полные результаты и отчёт на email", s3Sending: "Отправка…",
    lvl: ["Нет", "Слабо", "ОК", "Сильно"], notScored: "Не оценено",
    s4Book: "Записаться к специалисту 1-на-1",
    s4BookSub: "Поговорите напрямую с сертифицированным консультантом SHAHMCO.",
    s4Contact: "Связаться",
    s4Save: "Сохранить отчёт", s4SaveSub: "Скачайте печатную копию для консультанта.",
    s4Print: "Печать / Сохранить",
    s4RecTitle: "Рекомендация консультанта SHAHMCO",
    s4FinalScore: "Итоговый балл", s4Threshold: "Порог", s4FlagsRaised: "Дисквалификаторы",
    s4Booking: "Записаться", s4New: "Новая оценка",
    verdictPass: "✓ Рекомендуется", verdictReview: "~ Проверка", verdictFail: "✕ Не готов", verdictFlagged: "⚑ Флаги",
    flagInfo: (n) => `Сработало ${n} дисквалификатор(ов). Подача не рекомендуется.`,
    passInfo: (s, name, t) => `Балл ${s}/100 соответствует порогу ${name} (${t}).`,
    reviewInfo: (s, t) => `На грани — ${s}/100 против порога ${t}. Усильте слабые места.`,
    failInfo: (s, t) => `Недостаточно — ${s}/100 значительно ниже порога ${t}.`,
    recPass: (n, t, name) => <>Балл выше порога {t} для {name}. Финансовый профиль убедительный. <strong className="text-foreground">Переходите к полной подготовке заявления.</strong> Убедитесь, что все документы актуальны (3 месяца) и согласованы.</>,
    recReview: (n, t, name) => <>Ниже порога для {name}. Подача возможна, но риск отказа повышен. <strong className="text-foreground">Рекомендуется:</strong> наращивать баланс 2–3 месяца; усилить документы о работе. <strong className="text-foreground">Настоятельно рекомендуется консультация SHAHMCO.</strong></>,
    recFail: (n, t, name) => <>Значительно ниже порога для {name}. <strong className="text-foreground">Подача сейчас несёт очень высокий риск отказа.</strong> <strong className="text-foreground">План:</strong> стабильный баланс 4–6 месяцев; формальные документы. <strong className="text-foreground">Запишитесь на консультацию SHAHMCO.</strong></>,
    resultPass: (n, name, s, t) => `${n} имеет сильный финансовый профиль для ${name}. Балл ${s}/100 превышает порог ${t}.`,
    resultReview: (n, name, s, t) => `${n} на грани для ${name}. Балл ${s}/100 близок, но ниже порога ${t}.`,
    resultFail: (n, name, s, t) => `Профиль ${n} значительно ниже требований ${name}. Балл: ${s}/100, порог: ${t}.`,
    resultFlag: (n, c) => `${n} активировал ${c} дисквалификатор(ов). Это жёсткие стопы независимо от балла.`,
    toastSent: "Оценка отправлена", toastSentDesc: "Специалист SHAHMCO свяжется с вами.",
    toastFail: "Ошибка отправки", toastFailDesc: "Попробуйте снова или свяжитесь с нами.",
    errName: "Имя обязательно", errEmail: "Корректный email обязателен", errWa: "WhatsApp обязателен",
    errNat: "Гражданство обязательно", errCat: "Выберите категорию",
    disclaimer1: "SHAHMCO Global FZC LLC · Лицензия № 4423928.01 · SPCFZ, Шарджа, ОАЭ",
    disclaimer2: "VisaScore Pro™ — консультативный инструмент. Не гарантирует одобрения и не заменяет оценку посольства.",
    cFunds: "Минимальный дневной фонд", cFundsD: "Требуемые средства должны быть видны в выписках до даты подачи.",
    cAvg: "Стабильность среднего баланса 3–6 мес.", cAvgD: "Стабильное среднее, а не внезапный пик.",
    cSrc: "Прозрачность источника средств", cSrcD: "Зарплата, бизнес-доход или инвестиции четко видны.",
    cEmp: "Статус и стаж работы", cEmpD: "Письмо с работы + расчётные листы. Минимум 12 месяцев.",
    cRatio: "Доход к стоимости поездки", cRatioD: "Чистый доход ≥ 2× стоимости поездки.",
    cTax: "Налоговые декларации", cTaxD: "Последние 1–2 года. Критично для Ирландии, Великобритании, Канады, Австралии.",
    cProp: "Недвижимость", cPropD: "Свидетельство собственности — сильнее всего. Долгая аренда — приемлемо.",
    cFamily: "Иждивенцы дома", cFamilyD: "Супруг(а), дети, престарелые родители = сильный мотив возврата.",
    cHist: "История виз и поездок", cHistD: "Прошлые визы без нарушений. Прежние визиты — большой плюс.",
    cAcc: "Доказательство проживания", cAccD: "Бронь отеля, Airbnb, нотариальное приглашение.",
    cIns: "Страховка путешественника", cInsD: "Шенген обязательно €30k. Саудовская Аравия/Хадж — MOFA.",
    cItin: "Согласованность маршрута", cItinD: "Цель поездки одинакова во всех документах.",
    sect1: "Баланс и ликвидные средства", sect2: "Стабильность работы и дохода",
    sect3: "Связи с родиной и намерение вернуться", sect4: "Качество документов поездки",
    flagParking: "Подозрительный крупный депозит за 30 дней до подачи",
    flagRefusal: "Скрытые прошлые отказы в визах",
    flagOverstay: "Прошлое превышение срока пребывания",
    flagInconsist: "Доход в выписках не совпадает с письмом работодателя",
    flagLowbal: "Баланс падает почти до нуля между зарплатами",
    flagNoincome: "Нет проверяемого источника дохода",
    flagCriminal: "Судимость или незакрытые юридические дела",
  },
  zh: {
    brand: "VISASCORE PRO™", titleA: "签证准备", titleB: "评估",
    subtitle: "预筛选咨询工具——不保证签证批准，也不替代官方使馆评估。",
    badgeLicensed: "SPCFZ 持牌 · 编号 4423928.01", badgeEncrypted: "加密提交", badgeReviewed: "专家审核",
    poweredBy: "技术支持", partnerNetA: "我们值得信赖的", partnerNetB: "合作伙伴网络",
    partnerNote: "与海湾地区持牌企业、旅行和签证合作伙伴协作运营。",
    p_coast: "朝觐与副朝事务", p_afwaaj: "朝觐与副朝精英服务",
    p_north: "IATA 认证代理", p_sultan: "企业合作伙伴", p_hamumy: "旅行与签证服务",
    steps: ["目的地", "您的资料", "评分", "结果"],
    s1Title1: "选择您的", s1Title2: "目的地",
    s1Sub: "选择您打算申请的国家。我们将应用正确的财务门槛和评估标准。",
    s1Threshold: "门槛", s1Continue: "继续 — 输入资料",
    s2Title: "您的资料",
    s2Intro: "您的信息仅用于本次评估和后续跟进。", s2For: "对于",
    s2Name: "全名", s2NameP: "张三", s2Email: "邮箱", s2EmailP: "you@example.com",
    s2Wa: "WhatsApp 号码", s2WaP: "+971 50 123 4567", s2Nat: "国籍", s2NatP: "阿联酋",
    s2Cat: "签证类别", s2CatP: "选择类别…", s2Days: "行程天数",
    s2Consent: "继续即表示您同意 SHAHMCO Global 就您的签证评估与您联系。",
    s2Back: "← 返回", s2Begin: "开始评分",
    s3Total: "总分", s3Verdict: "结论", s3Of: "/", s3Scored: "项标准已评分",
    s3Dest: "目的地", s3Pts: "分",
    s3Flags: "自动取消资格项 — 勾选所有适用项", s3FlagsTitle: "取消资格项",
    s3Notes: "顾问备注", s3NotesP: "其他背景或特殊情况…",
    s3Back: "← 返回", s3Submit: "查看完整结果并发送报告", s3Sending: "发送中…",
    lvl: ["无", "弱", "可", "强"], notScored: "未评分",
    s4Book: "预约一对一专家",
    s4BookSub: "直接与 SHAHMCO 认证顾问交谈,审查您的完整文件。",
    s4Contact: "联系我们",
    s4Save: "保存评分报告", s4SaveSub: "下载可打印版本与顾问分享。",
    s4Print: "打印 / 保存",
    s4RecTitle: "SHAHMCO 顾问建议",
    s4FinalScore: "最终得分", s4Threshold: "门槛", s4FlagsRaised: "触发标记",
    s4Booking: "预约咨询", s4New: "新建评估",
    verdictPass: "✓ 推荐", verdictReview: "~ 复核", verdictFail: "✕ 未准备", verdictFlagged: "⚑ 已标记",
    flagInfo: (n) => `触发 ${n} 项取消资格。不建议申请。`,
    passInfo: (s, name, t) => `得分 ${s}/100 达到 ${name} 门槛 ${t}。`,
    reviewInfo: (s, t) => `临界 — ${s}/100 vs 门槛 ${t}。请加强弱项。`,
    failInfo: (s, t) => `不足 — ${s}/100 远低于门槛 ${t}。`,
    recPass: (n, t, name) => <>得分超过 {name} 的门槛 {t}。财务状况可信。<strong className="text-foreground">前往完整申请准备。</strong> 确保所有文件最新(3 个月内)且一致。</>,
    recReview: (n, t, name) => <>低于 {name} 的门槛。可申请但拒签风险升高。<strong className="text-foreground">建议:</strong> 2–3 个月内积累余额;加强工作文件。<strong className="text-foreground">强烈建议 SHAHMCO 咨询。</strong></>,
    recFail: (n, t, name) => <>远低于 {name} 的门槛。<strong className="text-foreground">现在提交拒签风险极高。</strong> <strong className="text-foreground">准备计划:</strong> 4–6 个月稳定余额;正式工作文件。<strong className="text-foreground">预约 SHAHMCO 咨询定制路线图。</strong></>,
    resultPass: (n, name, s, t) => `${n} 为 ${name} 提供了强大的财务档案。得分 ${s}/100 超过咨询门槛 ${t}。`,
    resultReview: (n, name, s, t) => `${n} 对 ${name} 处于临界。得分 ${s}/100 接近但低于门槛 ${t}。`,
    resultFail: (n, name, s, t) => `${n} 当前档案远低于 ${name} 要求。得分:${s}/100,门槛:${t}。`,
    resultFlag: (n, c) => `${n} 触发了 ${c} 项取消资格。无论财务得分如何,这些都是硬性阻断。`,
    toastSent: "评估已发送", toastSentDesc: "SHAHMCO 专家将很快跟进。",
    toastFail: "提交失败", toastFailDesc: "请重试或直接联系我们。",
    errName: "需要姓名", errEmail: "需要有效邮箱", errWa: "需要 WhatsApp",
    errNat: "需要国籍", errCat: "选择类别",
    disclaimer1: "SHAHMCO Global FZC LLC · 牌照号 4423928.01 · SPCFZ, 沙迦, 阿联酋",
    disclaimer2: "VisaScore Pro™ 是预筛选咨询工具。不保证签证批准也不替代官方使馆评估。",
    cFunds: "每日最低资金要求", cFundsD: "申请日期前所需资金必须在对账单中显示。",
    cAvg: "3–6 个月平均余额稳定性", cAvgD: "持续平均 — 而非申请前突增。",
    cSrc: "资金来源清晰度", cSrcD: "工资、营业收入或投资回报清晰可识别。",
    cEmp: "就业状况和时长", cEmpD: "正式雇佣信 + 工资单。最好 12 个月以上。",
    cRatio: "月收入与行程总成本比", cRatioD: "净月收入应 ≥ 2× 行程总成本。",
    cTax: "纳税申报", cTaxD: "过去 1–2 年。爱尔兰、英国、加拿大、澳大利亚至关重要。",
    cProp: "房产 / 不动产所有权", cPropD: "产权证最强。长期租约可接受。",
    cFamily: "留在国内的家庭家属", cFamilyD: "配偶、子女、年迈父母 = 强烈的回国动机。",
    cHist: "签证合规与旅行史", cHistD: "以往签证无逾期。曾访问同一目的地 = 强正向。",
    cAcc: "住宿和邀请证明", cAccD: "酒店预订、Airbnb、公证邀请或朝觐/副朝运营商确认。",
    cIns: "旅行保险", cInsD: "申根强制 €3 万。沙特/朝觐由 MOFA 强制。",
    cItin: "行程一致性和目的清晰度", cItinD: "旅行目的必须在所有提交文件中保持一致。",
    sect1: "银行余额和流动资金", sect2: "就业和收入稳定性",
    sect3: "国内联系和回国意向", sect4: "旅行文件质量",
    flagParking: "检测到资金停泊 — 申请前 30 天内大额无解释存款",
    flagRefusal: "申请人未提前披露的过往拒签",
    flagOverstay: "记录在案的过往逾期或移民违规",
    flagInconsist: "对账单上申报的收入与雇佣信或纳税申报不一致",
    flagLowbal: "账户余额在工资入账之间降至接近零",
    flagNoincome: "完全没有可核实的就业或收入来源",
    flagCriminal: "已知犯罪记录或未决法律事务",
  },
};

// ═══════════════════════════════════════ DATA ═══════════════════════════════════════
type Destination = {
  id: string;
  flag: string;
  name: string;
  categories: string[];
  funds: string;
  threshold: number;
  badge: "hot" | "hajj" | null;
  badgeLabel?: string;
  insuranceNote: string;
  profile: string;
  /** Subtle flag-inspired gradient (used as card background tint) */
  gradient: string;
};

// Flag-color gradients — visible tint that reads on desktop and mobile
const G = {
  schengen: "linear-gradient(135deg, hsl(220 80% 35% / 0.55), hsl(48 95% 55% / 0.45))",
  uk:       "linear-gradient(135deg, hsl(220 70% 30% / 0.55), hsl(0 75% 45% / 0.50), hsl(0 0% 100% / 0.25))",
  ireland:  "linear-gradient(135deg, hsl(140 60% 35% / 0.55), hsl(0 0% 100% / 0.25), hsl(28 90% 55% / 0.50))",
  turkey:   "linear-gradient(135deg, hsl(0 80% 40% / 0.65), hsl(0 70% 30% / 0.45))",
  saudi:    "linear-gradient(135deg, hsl(140 70% 22% / 0.65), hsl(140 60% 30% / 0.50))",
  uae:      "linear-gradient(135deg, hsl(140 60% 30% / 0.55), hsl(0 0% 100% / 0.25), hsl(0 70% 40% / 0.50), hsl(0 0% 0% / 0.40))",
  canada:   "linear-gradient(135deg, hsl(0 75% 40% / 0.60), hsl(0 0% 100% / 0.25), hsl(0 75% 40% / 0.55))",
  australia:"linear-gradient(135deg, hsl(220 70% 25% / 0.60), hsl(0 70% 40% / 0.50), hsl(0 0% 100% / 0.20))",
  usa:      "linear-gradient(135deg, hsl(220 70% 28% / 0.60), hsl(0 0% 100% / 0.20), hsl(0 75% 40% / 0.55))",
  china:    "linear-gradient(135deg, hsl(0 80% 38% / 0.65), hsl(48 95% 55% / 0.50))",
};

const DESTINATIONS: Destination[] = [
  { id: "schengen", flag: "🇪🇺", name: "Schengen Zone",
    categories: ["Tourism","Business","Medical","Student","Family Visit"],
    funds: "€50–100/day", threshold: 65, badge: "hot", badgeLabel: "High Demand",
    insuranceNote: "Mandatory: €30,000 min medical coverage",
    profile: "26 EU countries. Tourism is the #1 category. Travel insurance mandatory. Strict financial proof required.",
    gradient: G.schengen },
  { id: "uk", flag: "🇬🇧", name: "United Kingdom",
    categories: ["Tourism","Business","Medical Treatment","Student","Family Visit","Transit"],
    funds: "£100/day", threshold: 68, badge: "hot", badgeLabel: "High Demand",
    insuranceNote: "Highly recommended. Full trip coverage.",
    profile: "Standard Visitor Visa. Home country ties weighted heavily. Biometrics required at VFS.",
    gradient: G.uk },
  { id: "ireland", flag: "🇮🇪", name: "Ireland",
    categories: ["Tourism","Business","Medical","Student","Family Visit","Transit"],
    funds: "€50–100/day", threshold: 70, badge: null,
    insuranceNote: "Strongly recommended.",
    profile: "Conservative assessment. Source of funds scrutinized closely. High refusal rate for weak profiles.",
    gradient: G.ireland },
  { id: "turkey", flag: "🇹🇷", name: "Turkey",
    categories: ["Tourism","Business","Medical","Student","Transit"],
    funds: "$50/day", threshold: 55, badge: "hot", badgeLabel: "High Demand",
    insuranceNote: "Recommended.",
    profile: "e-Visa available for many nationalities. Popular tourism & medical destination. GCC residents often eligible.",
    gradient: G.turkey },
  { id: "saudi", flag: "🇸🇦", name: "Saudi Arabia",
    categories: ["Tourism","Business","Hajj","Umrah","Residence / Iqama","Family Visit","Medical","Work"],
    funds: "SAR 200/day", threshold: 60, badge: "hajj", badgeLabel: "Hajj / Umrah",
    insuranceNote: "Required by MOFA. Hajj/Umrah insurance mandatory for pilgrims.",
    profile: "Multiple visa categories. Hajj & Umrah via specialist partners. Iqama (residence) requires employer sponsorship. Tourist e-visa available.",
    gradient: G.saudi },
  { id: "uae", flag: "🇦🇪", name: "UAE",
    categories: ["Tourism","Business","Residence / Golden Visa","Family Sponsorship","Medical","Student","Transit"],
    funds: "AED 300/day", threshold: 55, badge: null,
    insuranceNote: "Recommended for all visitors.",
    profile: "Entry visa, residence visa, and Golden Visa categories available. Business setup services via SHAHMCO. GCC residents may enter visa-free.",
    gradient: G.uae },
  { id: "canada", flag: "🇨🇦", name: "Canada",
    categories: ["Tourism","Business","Student","Family Sponsorship","Medical","PR / Immigration","Transit"],
    funds: "CAD 100/day", threshold: 72, badge: "hot", badgeLabel: "High Demand",
    insuranceNote: "Highly recommended.",
    profile: "TRV (Visitor Visa) or eTA. High financial bar. Biometrics required. Strong ties to home country are critical.",
    gradient: G.canada },
  { id: "australia", flag: "🇦🇺", name: "Australia",
    categories: ["Tourism","Business","Student","Medical","Family Visit","Skilled Migration"],
    funds: "AUD 100/day", threshold: 70, badge: null,
    insuranceNote: "Highly recommended.",
    profile: "Subclass 600 tourist visa. GTE (Genuine Temporary Entrant) criterion assessed strictly. Strong ties required.",
    gradient: G.australia },
  { id: "usa", flag: "🇺🇸", name: "USA",
    categories: ["Tourism (B2)","Business (B1)","Student (F1)","Medical","Family Visit","Transit (C)"],
    funds: "$100/day", threshold: 70, badge: null,
    insuranceNote: "Strongly recommended.",
    profile: "DS-160 form. Embassy interview required. Strong financial & social ties assessed. Refusal rate high for first-time applicants.",
    gradient: G.usa },
  { id: "china", flag: "🇨🇳", name: "China",
    categories: ["Tourism (L)","Business (M)","Student (X)","Work (Z)","Family Visit (Q)","Transit"],
    funds: "CNY 500/day", threshold: 58, badge: null,
    insuranceNote: "Recommended.",
    profile: "L (tourist) or M (business) visa most common. Invitation letter often required. Full itinerary and financial proof submitted.",
    gradient: G.china },
];

// ── Country name & badge translations ──
const COUNTRY_I18N: Record<Language, Record<string, string>> = {
  en: { schengen:"Schengen Zone", uk:"United Kingdom", ireland:"Ireland", turkey:"Turkey",
        saudi:"Saudi Arabia", uae:"UAE", canada:"Canada", australia:"Australia", usa:"USA", china:"China" },
  ar: { schengen:"منطقة شنغن", uk:"المملكة المتحدة", ireland:"أيرلندا", turkey:"تركيا",
        saudi:"المملكة العربية السعودية", uae:"الإمارات", canada:"كندا", australia:"أستراليا", usa:"الولايات المتحدة", china:"الصين" },
  ru: { schengen:"Шенгенская зона", uk:"Великобритания", ireland:"Ирландия", turkey:"Турция",
        saudi:"Саудовская Аравия", uae:"ОАЭ", canada:"Канада", australia:"Австралия", usa:"США", china:"Китай" },
  zh: { schengen:"申根区", uk:"英国", ireland:"爱尔兰", turkey:"土耳其",
        saudi:"沙特阿拉伯", uae:"阿联酋", canada:"加拿大", australia:"澳大利亚", usa:"美国", china:"中国" },
};

const BADGE_I18N: Record<Language, { hot: string; hajj: string }> = {
  en: { hot: "High Demand", hajj: "Hajj / Umrah" },
  ar: { hot: "إقبال عالٍ", hajj: "حج / عمرة" },
  ru: { hot: "Высокий спрос", hajj: "Хадж / Умра" },
  zh: { hot: "高需求", hajj: "朝觐 / 副朝" },
};

// Visa category translations (canonical EN key → translated label)
const CATEGORY_I18N: Record<Language, Record<string, string>> = {
  en: {
    "Tourism":"Tourism","Business":"Business","Medical":"Medical","Student":"Student","Family Visit":"Family Visit",
    "Medical Treatment":"Medical Treatment","Transit":"Transit","Hajj":"Hajj","Umrah":"Umrah",
    "Residence / Iqama":"Residence / Iqama","Work":"Work","Residence / Golden Visa":"Residence / Golden Visa",
    "Family Sponsorship":"Family Sponsorship","PR / Immigration":"PR / Immigration","Skilled Migration":"Skilled Migration",
    "Tourism (B2)":"Tourism (B2)","Business (B1)":"Business (B1)","Student (F1)":"Student (F1)","Transit (C)":"Transit (C)",
    "Tourism (L)":"Tourism (L)","Business (M)":"Business (M)","Student (X)":"Student (X)","Work (Z)":"Work (Z)","Family Visit (Q)":"Family Visit (Q)",
  },
  ar: {
    "Tourism":"سياحة","Business":"أعمال","Medical":"علاج","Student":"دراسة","Family Visit":"زيارة عائلية",
    "Medical Treatment":"علاج طبي","Transit":"عبور","Hajj":"حج","Umrah":"عمرة",
    "Residence / Iqama":"إقامة","Work":"عمل","Residence / Golden Visa":"إقامة / ذهبية",
    "Family Sponsorship":"كفالة عائلية","PR / Immigration":"إقامة دائمة / هجرة","Skilled Migration":"هجرة مهارات",
    "Tourism (B2)":"سياحة (B2)","Business (B1)":"أعمال (B1)","Student (F1)":"دراسة (F1)","Transit (C)":"عبور (C)",
    "Tourism (L)":"سياحة (L)","Business (M)":"أعمال (M)","Student (X)":"دراسة (X)","Work (Z)":"عمل (Z)","Family Visit (Q)":"زيارة عائلية (Q)",
  },
  ru: {
    "Tourism":"Туризм","Business":"Бизнес","Medical":"Лечение","Student":"Учёба","Family Visit":"Визит к семье",
    "Medical Treatment":"Лечение","Transit":"Транзит","Hajj":"Хадж","Umrah":"Умра",
    "Residence / Iqama":"ВНЖ / Икама","Work":"Работа","Residence / Golden Visa":"ВНЖ / Золотая виза",
    "Family Sponsorship":"Воссоединение семьи","PR / Immigration":"ПМЖ / Иммиграция","Skilled Migration":"Квалиф. миграция",
    "Tourism (B2)":"Туризм (B2)","Business (B1)":"Бизнес (B1)","Student (F1)":"Студент (F1)","Transit (C)":"Транзит (C)",
    "Tourism (L)":"Туризм (L)","Business (M)":"Бизнес (M)","Student (X)":"Студент (X)","Work (Z)":"Работа (Z)","Family Visit (Q)":"Визит (Q)",
  },
  zh: {
    "Tourism":"旅游","Business":"商务","Medical":"就医","Student":"学生","Family Visit":"探亲",
    "Medical Treatment":"医疗","Transit":"过境","Hajj":"朝觐","Umrah":"副朝",
    "Residence / Iqama":"居留 / 伊卡马","Work":"工作","Residence / Golden Visa":"居留 / 黄金签证",
    "Family Sponsorship":"家庭担保","PR / Immigration":"永居 / 移民","Skilled Migration":"技术移民",
    "Tourism (B2)":"旅游 (B2)","Business (B1)":"商务 (B1)","Student (F1)":"学生 (F1)","Transit (C)":"过境 (C)",
    "Tourism (L)":"旅游 (L)","Business (M)":"商务 (M)","Student (X)":"学生 (X)","Work (Z)":"工作 (Z)","Family Visit (Q)":"探亲 (Q)",
  },
};

type Criterion = { id: string; sectionKey: keyof Pick<VS,"sect1"|"sect2"|"sect3"|"sect4">; sectionIcon: string; sectionPts: number; max: number; nameKey: keyof VS; descKey: keyof VS };

const CRITERIA: Criterion[] = [
  { id: "funds", sectionKey: "sect1", sectionIcon: "💰", sectionPts: 30, max: 10, nameKey: "cFunds", descKey: "cFundsD" },
  { id: "avgbal", sectionKey: "sect1", sectionIcon: "💰", sectionPts: 30, max: 10, nameKey: "cAvg", descKey: "cAvgD" },
  { id: "source", sectionKey: "sect1", sectionIcon: "💰", sectionPts: 30, max: 10, nameKey: "cSrc", descKey: "cSrcD" },
  { id: "emp", sectionKey: "sect2", sectionIcon: "💼", sectionPts: 25, max: 10, nameKey: "cEmp", descKey: "cEmpD" },
  { id: "ratio", sectionKey: "sect2", sectionIcon: "💼", sectionPts: 25, max: 10, nameKey: "cRatio", descKey: "cRatioD" },
  { id: "tax", sectionKey: "sect2", sectionIcon: "💼", sectionPts: 25, max: 5, nameKey: "cTax", descKey: "cTaxD" },
  { id: "prop", sectionKey: "sect3", sectionIcon: "🏠", sectionPts: 25, max: 10, nameKey: "cProp", descKey: "cPropD" },
  { id: "family", sectionKey: "sect3", sectionIcon: "🏠", sectionPts: 25, max: 8, nameKey: "cFamily", descKey: "cFamilyD" },
  { id: "hist", sectionKey: "sect3", sectionIcon: "🏠", sectionPts: 25, max: 7, nameKey: "cHist", descKey: "cHistD" },
  { id: "acc", sectionKey: "sect4", sectionIcon: "📋", sectionPts: 20, max: 7, nameKey: "cAcc", descKey: "cAccD" },
  { id: "ins", sectionKey: "sect4", sectionIcon: "📋", sectionPts: 20, max: 7, nameKey: "cIns", descKey: "cInsD" },
  { id: "itin", sectionKey: "sect4", sectionIcon: "📋", sectionPts: 20, max: 6, nameKey: "cItin", descKey: "cItinD" },
];

const FLAGS = [
  { id: "parking", textKey: "flagParking" as const },
  { id: "refusal", textKey: "flagRefusal" as const },
  { id: "overstay", textKey: "flagOverstay" as const },
  { id: "inconsist", textKey: "flagInconsist" as const },
  { id: "lowbal", textKey: "flagLowbal" as const },
  { id: "noincome", textKey: "flagNoincome" as const },
  { id: "criminal", textKey: "flagCriminal" as const },
];

const LEVEL_ICONS = ["✕", "⚠", "✓", "★"];

const VisaScore = () => {
  const { toast } = useToast();
  const { language } = useLanguage();
  const v = STR[language];

  const leadSchema = useMemo(() => z.object({
    fullName: z.string().trim().min(2, v.errName).max(100),
    email: z.string().trim().email(v.errEmail).max(255),
    whatsapp: z.string().trim().min(5, v.errWa).max(30),
    nationality: z.string().trim().min(2, v.errNat).max(80),
    category: z.string().min(1, v.errCat),
    days: z.coerce.number().int().min(1).max(365),
  }), [v]);
  type LeadForm = z.infer<typeof leadSchema>;

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedDestId, setSelectedDestId] = useState<string | null>(null);
  const [lead, setLead] = useState<LeadForm>({ fullName: "", email: "", whatsapp: "", nationality: "", category: "", days: 7 });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [scores, setScores] = useState<Record<string, { level: number; val: number; max: number }>>({});
  const [activeFlags, setActiveFlags] = useState<Set<string>>(new Set());
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const dest = useMemo(() => DESTINATIONS.find((d) => d.id === selectedDestId) || null, [selectedDestId]);
  const total = useMemo(() => Object.values(scores).reduce((a, b) => a + b.val, 0), [scores]);
  const scoredCount = Object.keys(scores).length;
  const hasFlags = activeFlags.size > 0;

  const verdict = useMemo(() => {
    const thresh = dest?.threshold ?? 65;
    if (hasFlags) return { cls: "fail" as const, label: v.verdictFlagged, info: v.flagInfo(activeFlags.size) };
    if (total >= thresh) return { cls: "pass" as const, label: v.verdictPass, info: v.passInfo(total, dest?.name ?? "", thresh) };
    if (total >= thresh - 15) return { cls: "review" as const, label: v.verdictReview, info: v.reviewInfo(total, thresh) };
    return { cls: "fail" as const, label: v.verdictFail, info: v.failInfo(total, thresh) };
  }, [total, hasFlags, dest, activeFlags.size, v]);

  const verdictColor = verdict.cls === "pass" ? "text-emerald-400" : verdict.cls === "review" ? "text-amber-400" : "text-rose-400";
  const verdictBg = verdict.cls === "pass" ? "bg-emerald-500" : verdict.cls === "review" ? "bg-amber-500" : "bg-rose-500";

  const setScore = (id: string, level: number, max: number) => {
    const val = level === 0 ? 0 : level === 1 ? Math.round(max * 0.4) : level === 2 ? Math.round(max * 0.7) : max;
    setScores((p) => ({ ...p, [id]: { level, val, max } }));
  };

  const toggleFlag = (id: string) => {
    setActiveFlags((p) => {
      const n = new Set(p);
      if (n.has(id)) n.delete(id); else n.add(id);
      return n;
    });
  };

  const goStep2 = () => { if (dest) setStep(2); };

  const submitLead = () => {
    const result = leadSchema.safeParse(lead);
    if (!result.success) {
      const errs: Record<string, string> = {};
      result.error.issues.forEach((i) => { errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    setStep(3);
  };

  const finalizeAndEmail = async () => {
    if (!dest) return;
    setSubmitting(true);
    try {
      const breakdown = CRITERIA.map((c) => ({
        id: c.id, name: v[c.nameKey] as string, section: v[c.sectionKey] as string,
        level: scores[c.id]?.level ?? -1,
        levelLabel: scores[c.id] ? v.lvl[scores[c.id].level] : v.notScored,
        val: scores[c.id]?.val ?? 0, max: c.max,
      }));
      const flagList = FLAGS.filter((f) => activeFlags.has(f.id)).map((f) => v[f.textKey] as string);

      const { error } = await supabase.functions.invoke("visa-score-lead", {
        body: {
          fullName: lead.fullName, email: lead.email, whatsapp: lead.whatsapp,
          nationality: lead.nationality, category: lead.category, days: lead.days,
          destination: dest.name, destinationId: dest.id, threshold: dest.threshold,
          score: total, status: verdict.cls, verdict: verdict.label,
          breakdown, flags: flagList, notes,
        },
      });
      if (error) throw error;
      toast({ title: v.toastSent, description: v.toastSentDesc });
      setStep(4);
    } catch (e) {
      console.error(e);
      toast({ title: v.toastFail, description: v.toastFailDesc, variant: "destructive" });
      setStep(4);
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    setStep(1); setSelectedDestId(null);
    setLead({ fullName: "", email: "", whatsapp: "", nationality: "", category: "", days: 7 });
    setScores({}); setActiveFlags(new Set()); setNotes(""); setErrors({});
  };

  const StepIndicator = () => (
    <div className="flex items-center gap-2 mb-10">
      {[1, 2, 3, 4].map((n, i) => (
        <div key={n} className="flex items-center gap-2 flex-1">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 ${
            step === n ? "bg-primary border-primary text-primary-foreground" : step > n ? "bg-accent border-accent text-accent-foreground" : "border-border text-muted-foreground"
          }`}>{step > n ? "✓" : n}</div>
          <span className={`text-xs uppercase tracking-wider hidden sm:inline ${step === n ? "text-accent" : "text-muted-foreground"}`}>
            {v.steps[i]}
          </span>
          {i < 3 && <div className="flex-1 h-px bg-border" />}
        </div>
      ))}
    </div>
  );

  const recNode = verdict.cls === "pass"
    ? v.recPass(lead.fullName, dest?.threshold ?? 0, dest?.name ?? "")
    : verdict.cls === "review"
    ? v.recReview(lead.fullName, dest?.threshold ?? 0, dest?.name ?? "")
    : v.recFail(lead.fullName, dest?.threshold ?? 0, dest?.name ?? "");

  return (
    <Section className="min-h-screen">
      <FadeIn>
        <div className="text-center mb-8">
          <p className="text-accent font-heading text-sm tracking-widest mb-2">{v.brand}</p>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
            {v.titleA} <span className="text-gradient-gold">{v.titleB}</span>
          </h1>
          <p className="text-muted-foreground text-sm max-w-2xl mx-auto mt-3">{v.subtitle}</p>

          <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
            <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-muted-foreground bg-card/60 border border-border rounded-full px-3 py-1.5">
              <ShieldCheck size={13} className="text-accent" /> {v.badgeLicensed}
            </span>
            <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-muted-foreground bg-card/60 border border-border rounded-full px-3 py-1.5">
              <Lock size={13} className="text-accent" /> {v.badgeEncrypted}
            </span>
            <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-muted-foreground bg-card/60 border border-border rounded-full px-3 py-1.5">
              <Mail size={13} className="text-accent" /> {v.badgeReviewed}
            </span>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="mb-12 bg-card/40 border border-border rounded-2xl p-6 md:p-8">
          <div className="text-center mb-6">
            <p className="text-[10px] uppercase tracking-[0.3em] text-accent font-heading mb-1">{v.poweredBy}</p>
            <h3 className="font-heading text-lg md:text-xl text-foreground">
              {v.partnerNetA} <span className="text-gradient-gold">{v.partnerNetB}</span>
            </h3>
            <p className="text-muted-foreground text-xs mt-1">{v.partnerNote}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {PARTNERS.map((p) => (
              <div
                key={p.name}
                className="group relative bg-background/60 border border-border hover:border-accent/50 rounded-xl p-5 flex flex-col items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:shadow-gold overflow-hidden"
              >
                <div className="h-20 w-full flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110">
                  <img
                    src={p.logo}
                    alt={`${p.name} logo`}
                    className="max-h-20 max-w-[180px] w-auto h-auto object-contain filter grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100 transition-all duration-500"
                  />
                </div>
                <div className="text-center">
                  <div className="font-heading text-sm font-semibold text-foreground tracking-wide">{p.name}</div>
                  <div className="text-[10px] uppercase tracking-widest text-accent mt-0.5">{v[p.tagKey as keyof VS] as string}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      <StepIndicator />

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="s1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <h2 className="font-heading text-2xl text-foreground mb-2">{v.s1Title1} <span className="text-gradient-gold">{v.s1Title2}</span></h2>
            <p className="text-muted-foreground text-sm mb-8">{v.s1Sub}</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
              {DESTINATIONS.map((d) => {
                const localName = COUNTRY_I18N[language][d.id] ?? d.name;
                const localBadge = d.badge === "hot" ? BADGE_I18N[language].hot : d.badge === "hajj" ? BADGE_I18N[language].hajj : null;
                return (
                  <motion.button
                    key={d.id}
                    whileHover={{ y: -2 }}
                    onClick={() => setSelectedDestId(d.id)}
                    style={{ backgroundImage: d.gradient }}
                    className={`relative text-start bg-card border rounded-xl p-4 transition-all overflow-hidden ${
                      selectedDestId === d.id ? "border-accent shadow-gold" : "border-border hover:border-primary/40"
                    }`}
                  >
                    {/* Light dark overlay — keeps text readable while letting flag color show */}
                    <span className="absolute inset-0 bg-card/20 pointer-events-none" aria-hidden />
                    <span className="relative block">
                      {d.badge && (
                        <span className={`absolute top-0 end-0 text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                          d.badge === "hajj" ? "bg-accent/15 text-accent border-accent/30" : "bg-rose-500/15 text-rose-400 border-rose-500/30"
                        }`}>{localBadge}</span>
                      )}
                      <span className="block text-2xl mb-2">{d.flag}</span>
                      <span className="block font-heading font-semibold text-foreground text-sm">{localName}</span>
                      <span className="block text-[10px] text-muted-foreground mt-1 uppercase tracking-wider">{v.s1Threshold} {d.threshold}/100</span>
                      <span className="block text-[11px] text-accent mt-1.5">{d.funds}</span>
                    </span>
                  </motion.button>
                );
              })}
            </div>

            <div className="flex justify-end">
              <button
                disabled={!dest}
                onClick={goStep2}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-accent-foreground font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90"
              >
                {v.s1Continue} <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && dest && (
          <motion.div key="s2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <div className="max-w-xl mx-auto bg-card border border-accent/30 rounded-2xl p-8 shadow-card">
              <h3 className="font-heading text-2xl text-foreground mb-1">{v.s2Title}</h3>
              <p className="text-muted-foreground text-sm mb-6">{v.s2For} <span className="text-accent">{dest.flag} {COUNTRY_I18N[language][dest.id] ?? dest.name}</span> — {v.s2Intro}</p>

              <div className="space-y-4">
                {[
                  { k: "fullName", label: v.s2Name, type: "text", placeholder: v.s2NameP },
                  { k: "email", label: v.s2Email, type: "email", placeholder: v.s2EmailP },
                  { k: "whatsapp", label: v.s2Wa, type: "tel", placeholder: v.s2WaP },
                  { k: "nationality", label: v.s2Nat, type: "text", placeholder: v.s2NatP },
                ].map((f) => (
                  <div key={f.k}>
                    <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-1.5">{f.label}</label>
                    <input
                      type={f.type}
                      value={(lead as never)[f.k]}
                      onChange={(e) => setLead({ ...lead, [f.k]: e.target.value })}
                      placeholder={f.placeholder}
                      className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-2.5 text-foreground text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                    />
                    {errors[f.k] && <p className="text-rose-400 text-xs mt-1">{errors[f.k]}</p>}
                  </div>
                ))}

                <div>
                  <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-1.5">{v.s2Cat}</label>
                  <select
                    value={lead.category}
                    onChange={(e) => setLead({ ...lead, category: e.target.value })}
                    className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-2.5 text-foreground text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                  >
                    <option value="">{v.s2CatP}</option>
                    {dest.categories.map((c) => <option key={c} value={c}>{CATEGORY_I18N[language][c] ?? c}</option>)}
                  </select>
                  {errors.category && <p className="text-rose-400 text-xs mt-1">{errors.category}</p>}
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-1.5">{v.s2Days}</label>
                  <input
                    type="number" min={1} max={365}
                    value={lead.days}
                    onChange={(e) => setLead({ ...lead, days: Number(e.target.value) })}
                    className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-2.5 text-foreground text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                  />
                  {errors.days && <p className="text-rose-400 text-xs mt-1">{errors.days}</p>}
                </div>
              </div>

              <p className="text-[11px] text-muted-foreground text-center mt-5 leading-relaxed">{v.s2Consent}</p>
            </div>

            <div className="flex justify-between mt-6 max-w-xl mx-auto">
              <button onClick={() => setStep(1)} className="px-5 py-2.5 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-accent/30 text-sm">{v.s2Back}</button>
              <button onClick={submitLead} className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-accent-foreground hover:opacity-90 font-medium text-sm">
                {v.s2Begin} <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && dest && (
          <motion.div key="s3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-card border border-border rounded-xl p-5 border-t-2 border-t-primary">
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">{v.s3Total}</div>
                <div className={`font-heading text-4xl ${verdictColor}`}>{total} <span className="text-base text-muted-foreground">/ 100</span></div>
                <div className="h-1.5 bg-border rounded-full mt-3 overflow-hidden">
                  <div className={`h-full ${verdictBg} transition-all`} style={{ width: `${Math.min(total, 100)}%` }} />
                </div>
              </div>
              <div className="bg-card border border-border rounded-xl p-5 border-t-2 border-t-accent">
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">{v.s3Verdict}</div>
                <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${verdictColor} bg-secondary/50`}>{verdict.label}</div>
                <p className="text-xs text-muted-foreground mt-2">{verdict.info}</p>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-3">{scoredCount} {v.s3Of} {CRITERIA.length} {v.s3Scored}</div>
                <div className="h-1 bg-border rounded-full mt-1 overflow-hidden">
                  <div className="h-full bg-accent" style={{ width: `${(scoredCount / CRITERIA.length) * 100}%` }} />
                </div>
              </div>
              <div className="bg-card border border-border rounded-xl p-5 border-t-2 border-t-border">
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">{v.s3Dest}</div>
                <div className="font-heading text-foreground">{dest.flag} {COUNTRY_I18N[language][dest.id] ?? dest.name}</div>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{dest.profile}</p>
              </div>
            </div>

            {(["sect1","sect2","sect3","sect4"] as const).map((sk) => {
              const items = CRITERIA.filter((c) => c.sectionKey === sk);
              const sectionPts = items[0]?.sectionPts ?? 0;
              const icon = items[0]?.sectionIcon ?? "";
              return (
                <div key={sk} className="mb-6 bg-card border border-border rounded-xl overflow-hidden">
                  <div className="flex items-center gap-3 p-4 border-b border-border bg-secondary/30">
                    <span className="text-xl">{icon}</span>
                    <h4 className="font-heading font-semibold text-foreground flex-1">{v[sk]}</h4>
                    <span className="text-xs text-accent font-mono">{sectionPts} {v.s3Pts}</span>
                  </div>
                  <div className="p-4 space-y-4">
                    {items.map((c) => {
                      const sc = scores[c.id];
                      return (
                        <div key={c.id} className="flex flex-col md:flex-row md:items-center gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
                          <div className="flex-1">
                            <div className="font-medium text-foreground text-sm">{v[c.nameKey] as string}</div>
                            <div className="text-xs text-muted-foreground mt-1 leading-relaxed">{v[c.descKey] as string}</div>
                          </div>
                          <div className="md:w-[280px]">
                            <div className="grid grid-cols-4 gap-1">
                              {[0, 1, 2, 3].map((lvl) => (
                                <button
                                  key={lvl}
                                  onClick={() => setScore(c.id, lvl, c.max)}
                                  className={`text-[11px] py-1.5 rounded border transition-all ${
                                    sc?.level === lvl
                                      ? lvl === 0 ? "bg-rose-500/20 border-rose-500/50 text-rose-300"
                                      : lvl === 1 ? "bg-amber-500/20 border-amber-500/50 text-amber-300"
                                      : lvl === 2 ? "bg-primary/30 border-primary text-foreground"
                                      : "bg-emerald-500/20 border-emerald-500/50 text-emerald-300"
                                      : "bg-secondary/30 border-border text-muted-foreground hover:border-accent/30"
                                  }`}
                                >
                                  {LEVEL_ICONS[lvl]} {v.lvl[lvl]}
                                </button>
                              ))}
                            </div>
                            <div className="text-[10px] text-muted-foreground mt-1 text-end">
                              {sc ? `${LEVEL_ICONS[sc.level]} ${v.lvl[sc.level]} — ${sc.val}/${c.max} ${v.s3Pts}` : v.notScored}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            <div className="bg-card border border-rose-500/30 rounded-xl p-5 mb-6">
              <h4 className="font-heading font-semibold text-rose-400 mb-3 flex items-center gap-2">
                <AlertCircle size={16} /> {v.s3Flags}
              </h4>
              <div className="space-y-2">
                {FLAGS.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => toggleFlag(f.id)}
                    className={`w-full text-start flex items-start gap-3 p-3 rounded-lg border transition-all ${
                      activeFlags.has(f.id) ? "bg-rose-500/15 border-rose-500/50" : "bg-secondary/30 border-border hover:border-rose-500/30"
                    }`}
                  >
                    <span className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 mt-0.5 text-xs ${
                      activeFlags.has(f.id) ? "bg-rose-500 border-rose-500 text-white" : "border-border"
                    }`}>{activeFlags.has(f.id) && "✕"}</span>
                    <span className="text-sm text-foreground">{v[f.textKey] as string}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">{v.s3Notes}</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={v.s3NotesP}
                rows={3}
                className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-foreground text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 resize-none"
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-3">
              <button onClick={() => setStep(2)} className="px-5 py-2.5 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-accent/30 text-sm">{v.s3Back}</button>
              <button
                onClick={finalizeAndEmail}
                disabled={submitting || scoredCount === 0}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-accent text-accent-foreground hover:opacity-90 disabled:opacity-40 font-medium text-sm"
              >
                {submitting ? v.s3Sending : v.s3Submit} <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        )}

        {step === 4 && dest && (
          <motion.div key="s4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <div className="bg-card border border-accent/30 rounded-2xl p-8 md:p-12 text-center shadow-card mb-8">
              <div className={`font-heading text-6xl md:text-7xl font-bold mb-3 ${verdictColor}`}>{total}/100</div>
              <div className={`text-2xl font-heading mb-3 ${verdictColor}`}>{verdict.label}</div>
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {hasFlags
                  ? v.resultFlag(lead.fullName, activeFlags.size)
                  : verdict.cls === "pass"
                  ? v.resultPass(lead.fullName, dest.name, total, dest.threshold)
                  : verdict.cls === "review"
                  ? v.resultReview(lead.fullName, dest.name, total, dest.threshold)
                  : v.resultFail(lead.fullName, dest.name, total, dest.threshold)}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <Link to="/contact" className="group bg-card border border-accent/30 hover:border-accent rounded-xl p-6 shadow-card transition-all">
                <MessageCircle className="text-accent mb-3" size={28} />
                <h4 className="font-heading font-semibold text-foreground mb-2">{v.s4Book}</h4>
                <p className="text-muted-foreground text-sm mb-3">{v.s4BookSub}</p>
                <span className="text-accent text-sm font-medium inline-flex items-center gap-1">{v.s4Contact} <ArrowRight size={14} /></span>
              </Link>
              <button onClick={() => window.print()} className="group text-start bg-card border border-border hover:border-accent/30 rounded-xl p-6 shadow-card transition-all">
                <Printer className="text-accent mb-3" size={28} />
                <h4 className="font-heading font-semibold text-foreground mb-2">{v.s4Save}</h4>
                <p className="text-muted-foreground text-sm mb-3">{v.s4SaveSub}</p>
                <span className="text-accent text-sm font-medium inline-flex items-center gap-1">{v.s4Print} <Printer size={14} /></span>
              </button>
            </div>

            <div className="bg-card border border-accent/30 rounded-xl p-6 mb-8">
              <div className="font-heading text-accent mb-3">{v.s4RecTitle}</div>
              <p className="text-muted-foreground text-sm leading-relaxed">{recNode}</p>
            </div>

            <div className="grid sm:grid-cols-3 gap-3 text-xs text-muted-foreground mb-8">
              <div className="bg-secondary/30 rounded-lg p-3"><div className="text-accent uppercase tracking-wider mb-1">{v.s4FinalScore}</div>{total}/100</div>
              <div className="bg-secondary/30 rounded-lg p-3"><div className="text-accent uppercase tracking-wider mb-1">{v.s4Threshold}</div>{dest.threshold}/100</div>
              <div className="bg-secondary/30 rounded-lg p-3"><div className="text-accent uppercase tracking-wider mb-1">{v.s4FlagsRaised}</div>{activeFlags.size}</div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-accent text-accent-foreground hover:opacity-90 font-medium text-sm">
                <MessageCircle size={16} /> {v.s4Booking}
              </Link>
              <button onClick={reset} className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-accent/30 text-sm">
                <RotateCcw size={14} /> {v.s4New}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="text-[11px] text-muted-foreground/70 text-center mt-12 max-w-3xl mx-auto leading-relaxed">
        <strong>{v.disclaimer1}</strong><br />
        {v.disclaimer2}
      </p>
    </Section>
  );
};

export default VisaScore;
