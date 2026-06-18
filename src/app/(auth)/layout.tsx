import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Client Portal | Ephesus AI Solutions',
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="auth-shell min-h-screen flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#0D9488_0%,_transparent_60%)] opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_#2DD4BF_0%,_transparent_60%)] opacity-10 pointer-events-none" />
      <div className="relative w-full max-w-md">
        {children}
      </div>
    </div>
  );
}
