import { ShieldCheck, Wallet, Building2, CreditCard, Smartphone } from "lucide-react";
import visaLogo from "@/assets/payments/visa.svg";
import mastercardLogo from "@/assets/payments/mastercard.svg";
import amexLogo from "@/assets/payments/amex.svg";
import applePayLogo from "@/assets/payments/applepay.svg";
import googlePayLogo from "@/assets/payments/googlepay.svg";
import samsungPayLogo from "@/assets/payments/samsungpay.svg";

type Method = {
  label: string;
  sub?: string;
  logos?: string[];
  icon?: typeof CreditCard;
  text?: string;
};

const METHODS: Method[] = [
  { label: "Visa / Mastercard", sub: "Credit & Debit Cards", logos: [visaLogo, mastercardLogo] },
  { label: "American Express", sub: "Credit Card", logos: [amexLogo] },
  { label: "Mada", sub: "Saudi Debit Network", text: "mada", icon: CreditCard },
  { label: "Apple Pay", sub: "Tap to Pay", logos: [applePayLogo] },
  { label: "Google Pay", sub: "Tap to Pay", logos: [googlePayLogo] },
  { label: "Samsung Pay", sub: "Tap to Pay", logos: [samsungPayLogo] },
  { label: "STC Pay", sub: "Saudi Wallet", text: "STC Pay", icon: Smartphone },
  { label: "e-Wallet", sub: "Apple / Google / Samsung Pay", icon: Wallet },
  { label: "Bank Transfer", sub: "IBAN / SWIFT", icon: Building2 },
];

const PaymentMethodsBanner = () => {
  return (
    <div className="bg-card border border-border rounded-2xl p-8 shadow-card">
      <div className="flex items-center gap-2 mb-5">
        <ShieldCheck size={18} className="text-accent" />
        <span className="text-accent font-heading text-xs tracking-widest">SECURE PAYMENT METHODS</span>
      </div>
      <h3 className="font-heading text-xl font-bold text-foreground mb-2">
        We accept all major payment methods
      </h3>
      <p className="text-muted-foreground text-sm mb-6">
        All transactions are SSL-encrypted and processed via PCI-DSS compliant gateways.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3">
        {METHODS.map((m) => {
          const Icon = m.icon;
          return (
            <div
              key={m.label}
              className="flex items-center gap-3 p-4 rounded-xl bg-secondary/40 border border-border hover:border-accent/40 hover:bg-secondary/70 transition-all min-h-[72px]"
            >
              {m.logos ? (
                <div className="flex items-center gap-2 flex-shrink-0 h-7">
                  {m.logos.map((logo, i) => (
                    <img
                      key={i}
                      src={logo}
                      alt=""
                      className="h-7 w-auto object-contain"
                      style={{ filter: "brightness(0) invert(1)" }}
                    />
                  ))}
                </div>
              ) : m.text ? (
                <div className="flex items-center justify-center h-7 px-2.5 rounded bg-foreground/10 border border-foreground/20 flex-shrink-0">
                  <span className="font-heading font-bold text-foreground text-xs tracking-wide whitespace-nowrap">
                    {m.text}
                  </span>
                </div>
              ) : Icon ? (
                <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center flex-shrink-0">
                  <Icon size={16} className="text-accent" />
                </div>
              ) : null}
              <div className="flex-1 min-w-0">
                <div className="text-[12px] font-medium text-foreground leading-tight truncate">
                  {m.label}
                </div>
                {m.sub && (
                  <div className="text-[10px] text-muted-foreground mt-0.5 truncate">{m.sub}</div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-[11px] text-muted-foreground mt-6 leading-relaxed text-center">
        Online payments are processed through a CBUAE-licensed payment gateway. Shahmco Global FZC LLC is the
        direct seller — funds are never held on behalf of third parties.
      </p>
    </div>
  );
};

export default PaymentMethodsBanner;
