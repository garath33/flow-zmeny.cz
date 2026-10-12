# flow-zmeny.cz

Statický web Flow Změny (Martin Šimůnek a Kristýna Poláková).

Veřejná část je ve složce `public/`. Větev `main` je ostrá verze: po schváleném mergi a zelených testech ji GitHub Pages nasadí. Doména `flow-zmeny.cz` na ten hosting ukáže až po přepnutí DNS.

## Mapa

- [Jak se web vyvíjí a schvaluje](docs/vyvoj.md)
- [Co testy hlídají a jak je aktualizovat](docs/testovani.md)
- [SEO, bezpečnost a další návrhy](docs/seo-a-bezpecnost.md)

## Lokálně

```bash
npm ci
npx playwright install --with-deps chromium
npm start
```

Web běží na http://127.0.0.1:4173 . Testy:

```bash
npm test
npm run test:lighthouse
```
