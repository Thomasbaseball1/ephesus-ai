import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config();

export default defineConfig(
  process.env.TURSO_CONNECTION_URL && process.env.TURSO_AUTH_TOKEN
    ? {
        schema: './src/db/schema.ts',
        out: './drizzle',
        dialect: 'turso',
        dbCredentials: {
          url: process.env.TURSO_CONNECTION_URL,
          authToken: process.env.TURSO_AUTH_TOKEN,
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
