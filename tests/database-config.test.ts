import assert from 'node:assert/strict';
import test from 'node:test';
import path from 'node:path';
import { resolveDatabaseConfig } from '../src/db/config';

test('uses Turso when both production credentials are present', () => {
  assert.deepEqual(
    resolveDatabaseConfig({
      NODE_ENV: 'production',
      TURSO_DATABASE_URL: 'libsql://example.turso.io',
      TURSO_AUTH_TOKEN: 'token',
    }),
    {
      url: 'libsql://example.turso.io',
      authToken: 'token',
    }
  );
});

test('supports the legacy Orchids Turso URL variable', () => {
  assert.deepEqual(
    resolveDatabaseConfig({
      NODE_ENV: 'production',
      TURSO_CONNECTION_URL: 'libsql://legacy-example.turso.io',
      TURSO_AUTH_TOKEN: 'token',
    }),
    {
      url: 'libsql://legacy-example.turso.io',
      authToken: 'token',
    }
  );
});

test('uses local SQLite only outside production', () => {
  const cwd = path.join('workspace', 'ephesus-ai');

  assert.deepEqual(resolveDatabaseConfig({ NODE_ENV: 'development' }, cwd), {
    url: `file:${path.join(cwd, 'local.db')}`,
  });
});

test('rejects missing production database credentials', () => {
  assert.throws(
    () => resolveDatabaseConfig({ NODE_ENV: 'production' }),
    /required in production/
  );
});

test('rejects partially configured Turso credentials', () => {
  assert.throws(
    () =>
      resolveDatabaseConfig({
        NODE_ENV: 'production',
        TURSO_DATABASE_URL: 'libsql://example.turso.io',
      }),
    /must be configured together/
  );
});
