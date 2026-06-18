'use client';

import { createAuthClient } from 'better-auth/react';

// Use relative URL so it always hits the same domain the browser is on.
// This works in all environments (Orchids, Vercel, custom domain) without
// needing NEXT_PUBLIC_APP_URL to be set.
export const authClient = createAuthClient({
  baseURL: typeof window !== 'undefined' ? window.location.origin : undefined,
});

export const { signIn, signOut, signUp, useSession } = authClient;
