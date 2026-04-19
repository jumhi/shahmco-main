

## Plan: Hidden VisaScore React Page + Lead Email

### 1. Routing & Navigation
- **Add hidden route** `/visa-score` in `src/App.tsx` mounting new `VisaScore.tsx` page (inside `Layout`).
- **Remove** the `VisaScore` item from the `navItems` array in `src/components/Navbar.tsx` (both desktop + mobile) and ensure it does not appear in `Footer.tsx`.
- **Floating Gold Pill**: Add a fixed gold pill inside `src/pages/VisaServices.tsx` only — using `react-router-dom` `Link to="/visa-score"` (same tab, no `target="_blank"`). Reuse the gold shimmer/float animation styles from `index.css`.

### 2. Convert `public/visascore.html` → `src/pages/VisaScore.tsx`
Build a single React component with the same 4-step flow:
1. **Step 1 — Destination**: Grid of destinations (UK, Schengen, Saudi/Hajj, USA, Canada, Australia, China, etc.) from the HTML data block. Each card selectable.
2. **Step 2 — Lead capture form**: Full Name, Email, WhatsApp, Nationality, Visa Category (dropdown driven by selected destination), Trip Duration (days). Validated with `zod`.
3. **Step 3 — Scoring dashboard**: 12 criteria (funds, avgbal, source, emp, ratio, tax, prop, family, hist, acc, ins, itin) each with 4 levels (Missing/Weak/Adequate/Strong). Live total /100, threshold check per destination.
4. **Step 4 — Results**: Big score, pass/review/fail status, flags, recommendations, CTA back to `/contact`.

Styling: Tailwind + existing dark/gold theme tokens (no inline `<style>` blocks). Reuse `Section`, `FadeIn` components where natural.

### 3. Email Lead Capture (Backend, replacing EmailJS)
- **Create edge function** `supabase/functions/visa-score-lead/index.ts`:
  - Validates payload with zod (name, email, whatsapp, nationality, category, destination, days, score, status, breakdown).
  - Inserts row into existing `leads` table (full_name, email, phone, company="VisaScore", message=formatted summary including score + breakdown).
  - Sends email via **Resend** (using existing `RESEND_API_KEY` secret) to `info@shahmco.com` with all user details + score results + per-criterion breakdown.
  - CORS headers + 400 on validation errors.
- **Trigger from React**: On Step 2 submit, call function once (capture lead). On Step 4 (after scoring complete), call function again with final score, OR call once at the end with everything bundled — simpler and matches user requirement of "score included in the data packet". I'll go with **one final submission** when user reaches Results, so the email contains both lead + score.
- Deploy function automatically.

### 4. Structural Reminders (verify, not rebuild)
- Slogan already "Corporate Advisory & Software Solutions" in Navbar/Footer ✓
- Nav order already Home → About → Services → B2C → Visa → How → Compliance → Contact ✓ (just remove VisaScore)
- B2C Family Consultation already shows "30-minute" ✓
- Payment banner on B2C — verify it includes Visa, Mastercard, Mada, Apple/Google/Samsung Pay (will spot-check during implementation)
- VisaServices country click → detail panel already works ✓

### 5. Cleanup
- Keep `public/visascore.html` for now but it becomes orphaned. Optionally delete — I'll delete it to avoid stale duplicate.

### Files touched
```
EDIT   src/App.tsx                       (add /visa-score route, remove visascore.html refs)
EDIT   src/components/Navbar.tsx         (remove VisaScore nav item + external link branch)
EDIT   src/pages/VisaServices.tsx        (add floating gold pill Link → /visa-score)
EDIT   src/index.css                     (re-add/keep gold pill keyframes)
NEW    src/pages/VisaScore.tsx           (full React port of the HTML tool)
NEW    supabase/functions/visa-score-lead/index.ts  (Resend + leads insert)
DEL    public/visascore.html             (orphaned)
EDIT   src/pages/Services.tsx            (update any /visascore.html link → /visa-score)
```

### Tech notes
- Email: Resend via existing `RESEND_API_KEY`, sender `onboarding@resend.dev` (no verified domain configured), recipient `info@shahmco.com`.
- All scoring math, destination data, and criterion definitions copied verbatim from the HTML so the algorithm is identical.
- No `target="_blank"` anywhere for the pill.

