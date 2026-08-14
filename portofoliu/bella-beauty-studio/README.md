# Bella Beauty Studio — website demo

Website demo (7 pagini) pentru un salon de unghii & coafură, gândit ca exemplu de portofoliu pentru pachetul de servicii oferit companiilor mici/locale.

## Structură

```
salon-bella-demo/
├── index.html        Acasă
├── servicii.html      Servicii & Prețuri
├── galerie.html        Galerie foto (cu filtre + lightbox)
├── despre.html         Despre noi / echipă
├── recenzii.html        Recenzii clienți
├── faq.html               Întrebări frecvente
├── contact.html          Formular contact + hartă + WhatsApp/telefon
├── css/style.css
├── js/main.js
├── images/                placeholder-uri SVG (de înlocuit cu poze reale)
├── robots.txt
└── sitemap.xml
```

## Ce e deja făcut

- **Design personalizat** — paletă caldă/feminină, tipografie Playfair Display + Jost.
- **Responsive 100%** — meniu hamburger pe mobil, grile care se restructurează pe orice ecran.
- **Galerie foto** cu filtre pe categorii și lightbox (fără librării externe).
- **Servicii / prețuri** structurate pe categorii (unghii, coafură, machiaj).
- **Formular de contact** — validare client-side; vezi mai jos cum îl conectezi la un email real.
- **Buton WhatsApp + apel direct**, fixe pe toate paginile (`js/main.js` / `wa.me` link).
- **Google Maps** embed în `contact.html` (fără cheie API — merge din prima).
- **SEO local de bază** — title/description unice per pagină, Open Graph, `schema.org/BeautySalon` (JSON-LD), `robots.txt`, `sitemap.xml`.
- **Imagini optimizate** — placeholder-uri SVG (câțiva KB fiecare), `loading="lazy"` peste tot, dimensiuni explicite (evită layout shift).

## Ce trebuie completat înainte de lansare

### 1. Conținut real
Înlocuiește în `images/` fișierele SVG cu poze reale ale salonului (JPG/WebP, comprimate la ~150–300KB pentru poze mari). Actualizează numele companiei, adresa, telefonul (`+40745123456` apare în `tel:`/`wa.me` links din toate paginile) și textele din `despre.html`, `recenzii.html`.

### 2. Configurare domeniu + hosting
- Cumpără domeniul (ex. de la un registrar RO — rotld.ro, sau GoDaddy/Namecheap).
- Hosting recomandat pentru un site static ca acesta: **Netlify**, **Vercel** sau **GitHub Pages** (gratuite, rapide, cu HTTPS automat) — sau hosting clasic RO dacă vrei email @domeniu inclus.
- Configurează DNS-ul domeniului către hosting (înregistrări A/CNAME conform providerului ales).
- Certificatul SSL (HTTPS) e automat pe Netlify/Vercel/GitHub Pages.

### 3. Google Analytics 4 + Search Console
- Creează o proprietate GA4 → obții un `Measurement ID` (`G-XXXXXXXXXX`).
- Decomentează blocul `<script>` din `<head>`-ul fiecărei pagini (marcat cu comentariul „Google Analytics 4”) și înlocuiește `G-XXXXXXXXXX` cu ID-ul tău.
- Verifică proprietatea în **Google Search Console** (prin DNS TXT sau prin meta tag) și înlocuiește `ADAUGA_AICI_CODUL_DE_VERIFICARE` din `<head>` cu codul primit.
- Trimite `sitemap.xml` din Search Console → Sitemaps.

### 4. Formular de contact funcțional
Formularul din `contact.html` e doar demo (afișează un mesaj de succes local). Pentru producție, cea mai rapidă variantă fără backend propriu:
- [Formspree](https://formspree.io) sau [EmailJS](https://www.emailjs.com) — adaugi `action`/API key și mesajele ajung direct pe email.
- Alternativ, un backend propriu (Node/PHP) dacă vrei să integrezi și CRM-ul salonului.

### 5. Programări online (opțional)
Momentan „Programează-te” duce la WhatsApp/telefon. Pentru programări 100% automate, se poate integra:
- **Calendly** sau **SimplyBook.me** (widget încorporabil, plan gratuit disponibil).
- Un sistem dedicat de salon (ex. Booksy, Fresha) cu widget/link în site.

### 6. Optimizare imagini & viteză (după ce adaugi poze reale)
- Exportă pozele în **WebP**, lățime maximă ~1600px pentru poze hero, ~800px pentru galerie.
- Păstrează `loading="lazy"` (deja setat) și dimensiunile `width`/`height` (deja setate) pentru a evita layout shift.
- Testează scorul cu [PageSpeed Insights](https://pagespeed.web.dev) după deploy.

## Cum vezi demo-ul local

Deschide `index.html` direct în browser, sau rulează un mic server local din acest folder:

```bash
python3 -m http.server 8080
```

apoi accesează `http://localhost:8080`.
