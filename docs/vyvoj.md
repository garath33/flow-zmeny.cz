# Vývoj a schvalování

Ostrá verze je větev `main`. Na ni se nepřidává práce přímo. Každá změna jde přes vlastní větev a pull request.

## Postup

1. Větev od `main`, třeba `cursor/nazev-zmeny`.
2. Úprava v `public/` (texty, fotky, styly) a k tomu aktualizace testů, které ta změna rozbije.
3. Lokálně `npm test` a `npm run test:lighthouse`.
4. Pull request. GitHub v něm spustí stejné kontroly (workflow `CI`).
5. V popisu pull requestu je náhled, co se mění a jak to vypadá.
6. Schválení je výslovné. Bez něj se do `main` nemerguje.
7. Po mergi do `main` musí `CI` znovu projít. Teprve potom workflow `Deploy site to GitHub Pages` nahraje složku `public/` na GitHub Pages.

Ruční nasazení bez nového commitu je v Actions u workflow Deploy, tlačítko Run workflow. I to předpokládá, že Pages jsou v repozitáři zapnuté (Settings → Pages → Source: GitHub Actions).

## Co kam patří

| Složka | Účel |
| --- | --- |
| `public/` | To, co vidí návštěvník |
| `assets/originals/` | Původní fotky před zmenšením |
| `tests/` | Automatické testy |
| `docs/` | Tahle dokumentace |
| `scripts/optimize-images.py` | Zmenšení fotek a smazání EXIF |

Nová fotka se uloží do `assets/originals/`, doplní se do `scripts/optimize-images.py` a skript se spustí. Do `public/images/` patří až výsledek.

## Co merge ještě neudělá

Merge nezmění DNS u Hukotu a hosting nezruší. Dokud doména ukazuje na Hukot, návštěvníci `https://flow-zmeny.cz` uvidí starý web. GitHub Pages jsou připravená verze, která se přepne až se záznamy domény přesměrují.
