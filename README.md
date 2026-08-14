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

## Publicare (fără domeniu propriu)

Repo-ul nu are un domeniu cumpărat (`accsite.ro` nu e deținut). Site-ul poate fi
publicat gratuit prin **GitHub Pages**, la o adresă de forma:

```
https://acorivasi.github.io/ACCsite/
```

`canonical` / `og:url` din fiecare pagină sunt setate provizoriu spre această
adresă. Dacă mai târziu se cumpără un domeniu propriu, adresele trebuie
actualizate din nou (căutare rapidă după `acorivasi.github.io` în fișierele
`.html`).

## De completat înainte de lansare

- [x] Număr WhatsApp real (`0727731227`)
- [x] Adresă de email (`accsite@gmail.com`) — necesită creată efectiv contul, dacă nu există deja
- [ ] Activează GitHub Pages pe branch-ul `main` (Settings → Pages), dacă nu e deja activ
- [ ] Dacă se cumpără un domeniu propriu: actualizează `canonical` / `og:url` și configurează DNS-ul spre GitHub Pages
