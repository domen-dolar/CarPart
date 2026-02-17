<p align="center">
  <img src="https://i.imgur.com/rSyq3MW.png" alt="CarPart Banner" width="220" />
</p>

<h1 align="center">CarPart</h1>

<p align="center">
  Spletna trgovina za avtomobilske dele z Next.js, Sanity CMS in NextAuth.
</p>

<p align="center">
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-16-black" />
  <img alt="React" src="https://img.shields.io/badge/React-19-61dafb" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178c6" />
  <img alt="Cypress" src="https://img.shields.io/badge/Tests-Cypress-2ea44f" />
  <img alt="CI" src="https://img.shields.io/badge/CI-GitHub_Actions-2088ff" />
</p>

## Kazalo

- [Kazalo](#kazalo)
- [Pregled](#pregled)
- [Funkcionalnosti](#funkcionalnosti)
- [Tehnologije](#tehnologije)
- [Lokalni zagon](#lokalni-zagon)
- [Okoljske spremenljivke](#okoljske-spremenljivke)
- [NPM skripte](#npm-skripte)
- [Testiranje](#testiranje)
- [CI/CD](#cicd)
- [Struktura projekta](#struktura-projekta)
- [Live okolje](#live-okolje)

## Pregled

CarPart je spletna aplikacija za prodajo avtomobilskih delov. Omogoča pregled izdelkov, upravljanje košarice, avtentikacijo uporabnikov ter urejanje vsebine preko Sanity Studio.

## Funkcionalnosti

- pregled izdelkov in strani posameznega izdelka
- iskanje in filtriranje izdelkov
- košarica in urejanje količin
- registracija/prijava uporabnikov
- prijava z Google OAuth
- pregled naročil
- Sanity Studio na poti `/studio`

## Tehnologije

- Next.js 16 (App Router)
- React 19
- TypeScript
- Sanity (CMS + Studio)
- NextAuth v5
- Cypress (E2E + component testi)
- GitHub Actions (testiranje in deploy)

## Lokalni zagon

1. Namesti odvisnosti:

```bash
npm ci
```

2. Ustvari `.env.local` (primer spodaj).

3. Zaženi razvojni strežnik:

```bash
npm run dev
```

4. Odpri:

- App: `http://localhost:3000`
- Sanity Studio: `http://localhost:3000/studio`

## Okoljske spremenljivke

V `.env.local` nastavi:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-11-24
SANITY_EDIT_TOKEN=your_sanity_token
AUTH_SECRET=your_auth_secret
AUTH_GOOGLE_ID=your_google_client_id
AUTH_GOOGLE_SECRET=your_google_client_secret
```

## NPM skripte

- `npm run dev` - razvojni strežnik
- `npm run build` - produkcijski build
- `npm run start` - zagon produkcije
- `npm run lint` - ESLint
- `npm run cypress:open` - odpre Cypress UI
- `npm run test:e2e` - zažene E2E teste
- `npm run test:component` - zažene component teste

## Testiranje

E2E testi privzeto ciljajo `http://localhost:3000` (ali `CYPRESS_BASE_URL`).

Primer lokalnega zagona E2E:

```bash
npm run build
npm run start
npm run test:e2e
```

## CI/CD

Workflow datoteke:

- `.github/workflows/cypress.yml`
  - ob `push` in `pull_request` zažene E2E + component teste
- `.github/workflows/deploy.yml`
  - ob `push` na `main` izvede deploy na strežnik (Apache/PM2)

Potrebni GitHub Secrets:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `SANITY_EDIT_TOKEN`
- `AUTH_SECRET`
- `AUTH_GOOGLE_ID`
- `AUTH_GOOGLE_SECRET`
- `DEPLOY_HOST`
- `DEPLOY_USER`
- `DEPLOY_KEY`
- `DEPLOY_PASSPHRASE`

## Struktura projekta

```text
app/
  (root)/
  api/auth/[...nextauth]/
  components/
  studio/
sanity/
  lib/
  schemaTypes/
.github/workflows/
cypress/
```

## Live okolje

Produkcijska aplikacija:

- https://carpart.domendolar.eu
