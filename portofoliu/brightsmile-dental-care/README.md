# BrightSmile Dental Care — website demo

Website demo (7 pagini) pentru o clinică stomatologică, construit pe designul ACCsite (mozaic-puzzle interactiv, forme rotunjite, animații) și re-tematizat pentru domeniul stomatologic.

## Structură

```
brightsmile-dental-demo/
├── index.html        Acasă — hero + mozaic puzzle (6 scene din clinică)
├── despre.html        Despre noi / poveste / echipă
├── servicii.html       Servicii & prețuri (pe categorii)
├── galerie.html         Galerie foto (cu filtre pe categorii)
├── recenzii.html         Recenzii pacienți
├── faq.html                Întrebări frecvente (accordion)
├── contact.html           Formular contact + hartă + WhatsApp/telefon
├── css/style.css
├── js/main.js
├── images/                  placeholder-uri SVG (de înlocuit cu poze reale)
├── robots.txt
└── sitemap.xml
```

## Ce e deja făcut

- **Mozaic-puzzle interactiv** — 6 piese care se îmbină ca un puzzle real (SVG clip-path, generat matematic), fiecare cu o scenă din clinică (recepție, cabinet, echipamente, echipă, zonă copii, locație). Click/tap pe o piesă deschide un modal cu detalii.
- **Paletă proprie** — albastru medical + mentă + coral cald, diferită de ACCsite, gândită pentru încredere + reducerea anxietății pacienților.
- **Servicii & prețuri** — 6 categorii (consultații, tratamente generale, estetică, ortodonție, implantologie, pedodonție), fiecare cu prețuri orientative.
- **Echipă** — 3 carduri medici, cu specializare și scurt bio.
- **Galerie filtrabilă** — pe categorii (cabinet, echipamente, echipă, zonă copii).
- **FAQ accordion** — 8 întrebări frecvente specifice stomatologiei (durere, urgențe, copii, asigurări, plata în rate).
- **Recenzii** — 9 testimoniale cu rating.
- **Responsive 100%** — meniu hamburger pe mobil, mozaicul puzzle rămâne proporțional la orice dimensiune.
- **WhatsApp + telefon**, fixe pe toate paginile.
- **Google Maps** embed în `contact.html`.

## Ce trebuie completat înainte de lansare

### 1. Imagini și video reale
Toate imaginile din `images/` sunt placeholder-uri SVG generate — trebuie înlocuite cu poze/video reale ale clinicii (generate în Leonardo AI sau poze reale făcute la fața locului). Vezi mai jos ideile de prompturi.

**⚠️ Atenție etică/legală**: pentru o clinică reală, echipa medicală și rezultatele „înainte/după" din galerie **trebuie să fie poze reale**, nu generate AI — pacienții au dreptul să vadă cine îi tratează cu adevărat, iar rezultate fictive pot induce în eroare.

**Idei de prompturi Leonardo** (aceeași direcție cromatică — albastru/mentă/coral, forme rotunjite, lumină clinică blândă):
- Recepție: `Modern dental clinic reception area, warm welcoming lighting, rounded furniture, soft blue and white tones, professional photography, 4k`
- Cabinet: `Modern dental treatment room, state-of-the-art dental chair, clean rounded furniture, soft blue accent tones, gentle clinical lighting, 4k`
- Echipamente: `Dental instruments tray close-up, clean modern equipment, digital X-ray screen in background, soft blue tones, professional photography, 4k`
- Zonă copii: `Friendly pediatric dental corner, colorful but calm, small chairs, toys, warm inviting lighting, 4k`

### 2. Nume, contact, adresă
Numele „BrightSmile Dental Care", adresa, telefonul (`0740223456`) și emailul sunt fictive — actualizează-le peste tot (`tel:`/`wa.me` links apar în toate paginile).

### 3. Configurare domeniu + hosting
Recomandat: **Netlify**, **Vercel** sau **GitHub Pages** (gratuite, HTTPS automat).

### 4. Formular de contact funcțional
Formularul din `contact.html` trimite prin `mailto:` (deschide clientul de email local). Pentru producție: [Formspree](https://formspree.io) sau [EmailJS](https://www.emailjs.com).

### 5. Programări online (opțional)
Momentan „Programează-te" duce la WhatsApp/telefon. Pentru automatizare completă: **Calendly**, **SimplyBook.me** sau un sistem dedicat de clinică.

## Cum vezi demo-ul local

```bash
python3 -m http.server 8080
```

apoi accesează `http://localhost:8080`.
