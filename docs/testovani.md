# Testy

Kontroly jsou ve vrstvách. Všechny musí projít, než změna smí do `main`.

| Vrstva | Soubor | Co hlídá |
| --- | --- | --- |
| Funkce | `tests/functional.spec.js` | Texty, fotky, přihlášku, e-mail, kliky v navigaci, přeskočení na obsah |
| Responzivita | `tests/responsive.spec.js` | Žádné vodorovné přetečení od 320 do 1440 px, skládání profilů, výška odkazů v menu |
| SEO a bezpečnost | `tests/seo-security.spec.js` | Popis, canonical, Open Graph, JSON-LD, sitemap, CSP, `noopener` u odkazů ven |
| Přístupnost | `tests/a11y.spec.js` | axe na mobilu a na desktopu, bez známých porušení |
| Vzhled | `tests/visual.spec.js` | Celá stránka na 1280 px a 390 px proti uloženému snímku |
| Kvalita | `npm run test:lighthouse` | Skóre výkon, přístupnost, best practices a SEO |

Vizuální snímky leží v `tests/visual.spec.js-snapshots/`. Vznikly v Linuxu se stejným Chromiem, jaký pouští CI. Když se vzhled mění schválně:

```bash
npm run test:update-snapshots
```

Nové snímky patří do stejného pull requestu, aby bylo vidět, co se opravdu změnilo.

Když se mění text akce, e-mail, odkaz na přihlášku nebo strukturovaná data, upraví se odpovídající očekávání v `tests/functional.spec.js` a `tests/seo-security.spec.js`. Hash v hlavičce CSP se musí shodovat s obsahem JSON-LD. Test to porovná a při rozdílu spadne. Hash se spočítá jako SHA-256 z přesného textu uvnitř `<script type="application/ld+json">` a do meta značky se zapíše jako `'sha256-...'`.

Lighthouse prahy jsou v `lighthouserc.json`: výkon aspoň 0,90, přístupnost, best practices a SEO aspoň 0,95.
