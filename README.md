# ACCsite

Site de prezentare — portofoliu creare website-uri pentru afaceri mici locale.

## Structură

- `index.html` — pagina principală, cu hero + carusel video (cele 6 domenii)
- `despre.html` — despre ACCsite
- `portofoliu.html` — direcțiile de design pentru fiecare domeniu
- `contact.html` — formular și metode de contact
- `css/style.css` — design system (culori, tipografie, componente)
- `js/main.js` — temă, meniu interactiv, carusel video, animații la scroll
- `media/` — clipurile video generate (Leonardo) pentru cele 6 domenii

## Teme

Site-ul are două teme, comutabile din header (butonul oval de lângă CTA) și persistate în `localStorage`:

- **Noir** (implicit) — fundal negru, text alb, accent turcoaz oceanic
- **Alb** — fundal alb, text negru, același accent turcoaz oceanic

Temele sunt definite ca variabile CSS în `css/style.css`, sub `:root`/`[data-theme="noir"]` și `[data-theme="alb"]`.

## Rulare locală

Fiind un site static, se poate deschide direct `index.html` în browser, sau servit local:

```bash
python3 -m http.server 8000
```

apoi accesează `http://localhost:8000`.

## Publicare

Site-ul e publicat prin **GitHub Pages** (branch `main`), pe domeniul propriu:

```
https://accsite.ro/
```

DNS-ul e găzduit pe **Cloudflare** (nameservere puse la ROTLD, în modul
"DNS only" — fără proxy, ca certificatul SSL emis de GitHub să funcționeze
corect): 4 înregistrări `A` pe `@` spre IP-urile GitHub Pages, plus un
`CNAME` pentru `www` spre `acorivasi.github.io`. Fișierul `CNAME` din
rădăcina repo-ului (creat automat de GitHub la activarea domeniului custom)
conține `accsite.ro`.

`canonical` / `og:url` / `sitemap.xml` / `robots.txt` / datele structurate
JSON-LD din `index.html` sunt toate pe adresa finală.

## De completat înainte de lansare

- [x] Număr WhatsApp real (`0727731227`)
- [x] Adresă de email (`accsite@gmail.com`) — necesită creată efectiv contul, dacă nu există deja
- [x] Activează GitHub Pages pe branch-ul `main` (Settings → Pages)
- [x] Cumpără domeniul propriu, configurează DNS-ul (Cloudflare) și activează-l ca domeniu custom în GitHub Pages
- [ ] Google Search Console + Google Business Profile pe domeniul final
