# Cabana Poiana Zimbrului — website demo

Website demo (5 pagini) pentru o pensiune/cabană de munte, gândit ca exemplu de portofoliu pentru **Pachetul Business (250 €)**.

## Structură

```
cabana-poiana-zimbrului-demo/
├── index.html          Acasă
├── despre.html         Despre noi
├── servicii.html       Cazare & Servicii (prețuri camere + servicii adiționale)
├── galerie.html        Galerie foto (cu filtre + lightbox)
├── contact.html        Formular rezervare + hartă + WhatsApp/telefon
├── css/style.css
├── js/main.js
├── images/             placeholder-uri SVG (de înlocuit cu poze reale)
├── robots.txt
└── sitemap.xml
```

## Ce e deja făcut (conform Pachetului Business)

- **Design personalizat** — paletă verde crud & maro, culori din natură; tipografie Cormorant Garamond + Nunito Sans.
- **Pagina principală** — hero, beneficii, tipuri de cazare, preview galerie, testimoniale, CTA de rezervare.
- **Despre noi** — poveste, valori, facilități generale, gazdele pensiunii.
- **Servicii / produse** — prețuri pe categorii (camere & apartamente, servicii incluse, servicii adiționale: drumeții ghidate, foc de tabără, ciubar).
- **Galerie foto** cu filtre pe categorii (camere, exterior, natură, activități) și lightbox (fără librării externe).
- **Formular de contact / rezervare** — validare client-side, câmpuri check-in/check-out; vezi mai jos cum îl conectezi la un email real.
- **Buton WhatsApp + apel direct**, fixe pe toate paginile (`js/main.js` / `wa.me` link).
- **Integrare link-uri către rețelele sociale** (Instagram, Facebook) în footer.
- **Google Maps** embed în `contact.html` (fără cheie API — merge din prima).
- **Website optimizat pentru telefon, tabletă și desktop** — meniu hamburger pe mobil, grile responsive.
- **Optimizare SEO de bază** — title/description unice per pagină, Open Graph, `schema.org/LodgingBusiness` (JSON-LD), `robots.txt`, `sitemap.xml`.
- **Optimizarea imaginilor** — placeholder-uri SVG (câțiva KB fiecare), `loading="lazy"` peste tot, dimensiuni explicite (evită layout shift).

## Ce trebuie completat înainte de lansare

### 1. Conținut real
`images/hero-main.jpg` este deja o poză reală (folosită și ca fundal hero, și ca og:image). Rămân de înlocuit fișierele SVG din galerie (`gallery-*.svg`), `despre-poveste.svg` și portretele gazdelor (`gazda-1.svg`, `gazda-2.svg`) cu poze reale ale cabanei/pensiunii (JPG/WebP, comprimate la ~150–300KB pentru poze mari). Actualizează numele pensiunii, adresa, telefonul (`+40766112233` apare în `tel:`/`wa.me` links din toate paginile) și textele din `despre.html`.

### 2. Configurare domeniu + hosting
- Cumpără domeniul (ex. de la un registrar RO — rotld.ro, sau GoDaddy/Namecheap).
- Hosting recomandat pentru un site static ca acesta: **Netlify**, **Vercel** sau **GitHub Pages** (gratuite, rapide, cu HTTPS automat) — sau hosting clasic RO dacă vrei email @domeniu inclus.
- Configurează DNS-ul domeniului către hosting (înregistrări A/CNAME conform providerului ales).
- Certificatul SSL (HTTPS) e automat pe Netlify/Vercel/GitHub Pages.

### 3. Google Analytics 4 + Search Console
- Creează o proprietate GA4 → obții un `Measurement ID` (`G-XXXXXXXXXX`).
- Decomentează blocul `<script>` din `<head>`-ul fiecărei pagini (marcat cu comentariul „Google Analytics 4") și înlocuiește `G-XXXXXXXXXX` cu ID-ul tău.
- Verifică proprietatea în **Google Search Console** (prin DNS TXT sau prin meta tag) și înlocuiește `ADAUGA_AICI_CODUL_DE_VERIFICARE` din `<head>` cu codul primit.
- Trimite `sitemap.xml` din Search Console → Sitemaps.

### 4. Formular de contact funcțional
Formularul din `contact.html` e doar demo (afișează un mesaj de succes local). Pentru producție, cea mai rapidă variantă fără backend propriu:
- [Formspree](https://formspree.io) sau [EmailJS](https://www.emailjs.com) — adaugi `action`/API key și mesajele ajung direct pe email.
- Alternativ, un backend propriu (Node/PHP) dacă vrei să integrezi și un sistem de rezervări (channel manager, Booking.com, Airbnb).

### 5. Sistem de rezervări online (opțional)
Momentan formularul trimite doar o cerere; confirmarea se face manual prin telefon/WhatsApp. Pentru rezervări automate cu calendar de disponibilitate, se poate integra:
- **Smoobu**, **Beds24** sau **Little Hotelier** (widget de rezervare încorporabil).
- Sincronizare cu Booking.com/Airbnb prin channel manager, dacă pensiunea e listată și pe aceste platforme.

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
