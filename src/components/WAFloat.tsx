import { MessageCircle } from "lucide-react";
import "./wafloat.css";

const WA_NUMBER = "971567878746";
const WA_MESSAGE = "Hello Shahmco Team, I am interested in your services.";
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`;

export function WAFloat() {
  return (
    <a
      href={WA_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="wa-pill"
      aria-label="Chat with Shahmco on WhatsApp"
    >
      <span className="wa-pulse" aria-hidden="true" />
      <span className="wa-icon">
        <MessageCircle size={22} strokeWidth={2} />
      </span>
      <span className="wa-text">CHAT WITH US</span>
    </a>
  );
}

export default WAFloat;
