'use client';

import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';

const VapiChatbot = dynamic(() => import('./VapiChatbot'), { ssr: false });

export default function VapiWrapper() {
  const pathname = usePathname();
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/admin') || pathname.startsWith('/login') || pathname.startsWith('/signup')) {
    return null;
  }
  return <VapiChatbot />;
}
