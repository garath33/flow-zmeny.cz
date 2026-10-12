# SEO a bezpečnost

## Co je na stránce

- Jeden nadpis `h1`, popis, canonical `https://flow-zmeny.cz/`, jazyk `cs`.
- Open Graph a Twitter karta se společnou fotkou.
- `robots.txt` a `sitemap.xml`.
- Strukturovaná data `WebSite` a `Event` pro akci 20. června 2026.
- Fotky mají popisek, šířku a výšku. Portréty se načítají líně, úvodní fotka má přednost.
- Písma jsou v repozitáři (Source Sans 3 a Source Serif 4, licence SIL OFL ve `public/fonts/`). Stránka nenačítá nic z cizí domény.
- Vlastní JavaScript na stránce není. Jediný `script` jsou strukturovaná data a CSP ho pouští jen podle hashe.
- Odkazy na novou kartu mají `rel="noopener noreferrer"`.
- E-mail je `mailto:` odkaz.
- U publikovaných fotek je odstraněný EXIF.

GitHub Pages neumí vlastní HTTP hlavičky (HSTS, `X-Frame-Options`, CSP jako hlavičku). CSP je proto v meta značce. `frame-ancestors` v meta značce prohlížeče ignorují. Až bude doména na Cloudflare, stejná pravidla patří do HTTP hlaviček a meta CSP může zůstat jako druhá vrstva.

## Návrhy, které zatím nejsou ve stránce

Čekají na rozhodnutí, nejsou součást nasazení:

- Další akce a jednoduchý archiv proběhlých workshopů. Dnes je na stránce jedna akce natvrdo v HTML.
- Vlastní přihláška místo odkazu na Google Form, pokud má zůstat na naší doméně.
- Krátké texty k jednotlivým termínům (pro koho workshop je, cena, co s sebou), ať je ve výsledcích vyhledávání víc než název.
- Přesměrování `www` na holou doménu až při přepnutí DNS.
- Cloudflare před GitHub Pages kvůli HSTS a CSP v HTTP hlavičce.
