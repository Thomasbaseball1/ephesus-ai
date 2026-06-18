import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from '@/db/schema';
import { resolveDatabaseConfig } from '@/db/config';

const client = createClient(resolveDatabaseConfig());

export const db = drizzle(client, { schema });

export type Database = typeof db;
