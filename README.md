# Ephesus AI Solutions Website

Next.js website and client portal for Ephesus AI Solutions.

## Local development

1. Copy `.env.example` to `.env` and configure the services you use.
2. Install dependencies with `npm install`.
3. Initialize the local SQLite database with `npm run db:push`.
4. Start the app with `npm run dev`.

When Turso credentials are absent in development, the app uses `local.db` in
the project root. That file is intentionally ignored by Git.

## Production database

Production requires both of these environment variables:

- `TURSO_CONNECTION_URL`
- `TURSO_AUTH_TOKEN`

The application fails fast if either value is missing. It never falls back to
the bundled local SQLite database in production because serverless files are
not a durable database.

Before deploying a schema change, configure the Turso variables locally and
run:

```bash
npm run db:push
```

## Verification

```bash
npm test
npm run typecheck
npm run build
```
