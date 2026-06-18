import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config();

const tursoUrl =
  process.env.TURSO_DATABASE_URL || process.env.TURSO_CONNECTION_URL;
const tursoAuthToken = process.env.TURSO_AUTH_TOKEN;

export default defineConfig(
  tursoUrl && tursoAuthToken
    ? {
        schema: './src/db/schema.ts',
        out: './drizzle',
        dialect: 'turso',
        dbCredentials: {
          url: tursoUrl,
          authToken: tursoAuthToken,
        },
      }
    : {
        schema: './src/db/schema.ts',
        out: './drizzle',
        dialect: 'sqlite',
        dbCredentials: {
          url: 'local.db',
        },
      }
);
