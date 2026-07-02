export const ADMIN_EMAILS = [
  'tmore.haller@yahoo.com',
  'sreid@algobull.ai',
  'deenwest@gmail.com',
] as const;

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.trim().toLowerCase() as (typeof ADMIN_EMAILS)[number]);
}
