# AquaShine Car Wash — website demo

Website demo (1 pagină) pentru o spălătorie auto, gândit ca exemplu de portofoliu pentru **Pachetul START (150 €)**.

## Structură

```
spalatorie-aquashine-demo/
├── index.html          1 pagină cu toate secțiunile (Acasă, Servicii, Galerie, Despre, Testimoniale, Contact)
├── css/style.css
├── js/main.js
├── images/             hero-photo.jpg + og-image.jpg (poze reale) și placeholder-uri SVG pentru galerie/avatare
├── robots.txt
└── sitemap.xml
```

## Ce e deja făcut (conform Pachetului START)

- **1 pagină de prezentare** — navigare cu ancore (Acasă/Servicii/Galerie/Despre/Contact), fără reîncărcări de pagină.
- **Design modern, adaptat domeniului** — hero + secțiunea „Cum lucrăm" pe fundal întunecat, dramatic (albastru electric #0a66ff / cyan #00c2ff pe negru-albastru #070b12), restul paginii pe fundal deschis pentru lizibilitate — contrast puternic, în stil detailing auto premium. Tipografie Poppins + Inter.
- **Proces în 4 pași** — secțiune „Cum lucrăm" (Spălare → Săpunire → Clătire → Lucioasă), recreată ca HTML/CSS real (nu imagine) pentru a rămâne editabilă, responsive și SEO-friendly.
- **Prezentarea firmei și a serviciilor** — 6 servicii cu prețuri de pornire (spălare exterior/interior, pachet complet, motor, polish faruri, ceruire).
- **Galerie foto** — grilă cu lightbox (fără librării externe).
- **Date de contact** — adresă, telefon, email, program.
- **Buton de apel telefonic** — fix pe toate ecranele + în header/footer.
- **Buton WhatsApp** — fix pe toate ecranele + în hero/CTA.
- **Integrare Google Maps** — embed în secțiunea Contact (fără cheie API — merge din prima).
- **Formular de contact** — validare client-side; vezi mai jos cum îl conectezi la un email real.
- **Adaptare telefon / tabletă / desktop** — meniu hamburger pe mobil, grile responsive.
- **Optimizare de bază pentru Google** — title/description, Open Graph, `schema.org/AutoWash` (JSON-LD), `robots.txt`, `sitemap.xml`.
- **Imagini optimizate** — placeholder-uri SVG (câțiva KB fiecare), `loading="lazy"`, dimensiuni explicite (evită layout shift).

## Ce trebuie completat înainte de lansare

### 1. Conținut real
`images/hero-photo.jpg` (fundalul din hero) și `images/og-image.jpg` (preview-ul pentru Facebook/WhatsApp) sunt deja poze reale. Rămân de înlocuit doar fișierele SVG din galerie (`gallery-1..6.svg`) și avatarele testimonialelor cu poze reale ale spălătoriei (JPG/WebP, comprimate la ~150–300KB pentru poze mari). Actualizează numele firmei, adresa, telefonul (`+40731456789` apare în `tel:`/`wa.me` links) și textele din secțiunea „Despre”.

### 2. Configurare domeniu + hosting
- Cumpără domeniul (ex. de la un registrar RO — rotld.ro, sau GoDaddy/Namecheap).
- Hosting recomandat pentru un site static ca acesta: **Netlify**, **Vercel** sau **GitHub Pages** (gratuite, rapide, cu HTTPS automat) — sau hosting clasic RO dacă vrei email @domeniu inclus.
- Configurează DNS-ul domeniului către hosting (înregistrări A/CNAME conform providerului ales).
- Certificatul SSL (HTTPS) e automat pe Netlify/Vercel/GitHub Pages.

### 3. Google Analytics 4 + Search Console
- Creează o proprietate GA4 → obții un `Measurement ID` (`G-XXXXXXXXXX`).
- Decomentează blocul `<script>` din `<head>` (marcat cu comentariul „Google Analytics 4”) și înlocuiește `G-XXXXXXXXXX` cu ID-ul tău.
- Verifică proprietatea în **Google Search Console** (prin DNS TXT sau prin meta tag) și înlocuiește `ADAUGA_AICI_CODUL_DE_VERIFICARE` din `<head>` cu codul primit.
- Trimite `sitemap.xml` din Search Console → Sitemaps.

### 4. Formular de contact funcțional
Formularul din secțiunea Contact e doar demo (afișează un mesaj de succes local). Pentru producție, cea mai rapidă variantă fără backend propriu:
- [Formspree](https://formspree.io) sau [EmailJS](https://www.emailjs.com) — adaugi `action`/API key și mesajele ajung direct pe email.
- Alternativ, un backend propriu (Node/PHP) dacă vrei să integrezi și un CRM.

### 5. Optimizare imagini & viteză (după ce adaugi poze reale)
- Exportă pozele în **WebP**, lățime maximă ~1600px pentru poza hero, ~800px pentru galerie.
- Păstrează `loading="lazy"` (deja setat) și dimensiunile `width`/`height` (deja setate) pentru a evita layout shift.
- Testează scorul cu [PageSpeed Insights](https://pagespeed.web.dev) după deploy.

## Cum vezi demo-ul local

Deschide `index.html` direct în browser, sau rulează un mic server local din acest folder:

```bash
python3 -m http.server 8080
```

apoi accesează `http://localhost:8080`.
