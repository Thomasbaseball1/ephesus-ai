export const ADMIN_EMAIL = 'tmore.haller@yahoo.com';

export function isAdminEmail(email: string | null | undefined): boolean {
  return email?.trim().toLowerCase() === ADMIN_EMAIL;
}
