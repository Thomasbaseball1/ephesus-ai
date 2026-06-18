import path from 'path';

export type DatabaseConnectionConfig = {
  url: string;
  authToken?: string;
};

export function resolveDatabaseConfig(
  env: NodeJS.ProcessEnv = process.env,
  cwd = process.cwd()
): DatabaseConnectionConfig {
  const url =
    env.TURSO_DATABASE_URL?.trim() || env.TURSO_CONNECTION_URL?.trim();
  const authToken = env.TURSO_AUTH_TOKEN?.trim();

  if (url || authToken) {
    if (!url || !authToken) {
      throw new Error(
        'TURSO_DATABASE_URL (or TURSO_CONNECTION_URL) and TURSO_AUTH_TOKEN must be configured together.'
      );
    }

    return { url, authToken };
  }

  if (env.NODE_ENV === 'production') {
    throw new Error(
      'TURSO_DATABASE_URL (or TURSO_CONNECTION_URL) and TURSO_AUTH_TOKEN are required in production.'
    );
  }

  return { url: `file:${path.join(cwd, 'local.db')}` };
}
