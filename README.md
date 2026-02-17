# CarPart

Spletna trgovina za avtomobilske dele, zgrajena z Next.js, Sanity CMS in NextAuth.

## Glavne funkcionalnosti

- pregled izdelkov in podrobnosti izdelka
- iskanje/filtriranje izdelkov
- košarica in upravljanje količin
- registracija in prijava uporabnikov (Credentials + Google OAuth)
- pregled naročil
- Sanity Studio za urejanje vsebine na poti `/studio`

## Tehnologije

- Next.js 16 (App Router)
- React 19
- TypeScript
- Sanity (CMS + Studio)
- NextAuth v5
- Cypress (E2E + component testi)
- GitHub Actions (testi + deploy)

## Zahteve

- Node.js 20+
- npm 10+
- dostop do Sanity projekta
- Google OAuth credentials (za Google prijavo)

## Lokalni zagon

1. Namesti odvisnosti:

```bash
npm install
```

2. Ustvari datoteko `.env.local` in nastavi spremenljivke:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-11-24
SANITY_EDIT_TOKEN=your_sanity_token
AUTH_SECRET=your_auth_secret
AUTH_GOOGLE_ID=your_google_client_id
AUTH_GOOGLE_SECRET=your_google_client_secret
```

3. Zaženi razvojni strežnik:

```bash
npm run dev
```

4. Odpri aplikacijo:

- App: http://localhost:3000
- Sanity Studio: http://localhost:3000/studio

## NPM skripte

- `npm run dev` - development server
- `npm run build` - production build
- `npm run start` - zagon production builda
- `npm run lint` - ESLint
- `npm run cypress:open` - Cypress UI
- `npm run test:e2e` - E2E testi
- `npm run test:component` - component testi

## Testiranje

E2E testi pričakujejo delujočo aplikacijo na `http://localhost:3000` (ali `CYPRESS_BASE_URL`).

Primer lokalnega pogona E2E:

```bash
npm run build
npm run start
npm run test:e2e
```

## CI/CD

Repo vsebuje 2 workflowa:

- `.github/workflows/cypress.yml`
  - ob `push` in `pull_request` zažene E2E + component teste
- `.github/workflows/deploy.yml`
  - ob `push` na `main` izvede deploy na Apache/PM2 strežnik

### GitHub Secrets

Za CI/CD so potrebni vsaj:

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

## Live okolje

Produkcijska aplikacija je dosegljiva na:

- https://carpart.domendolar.eu
