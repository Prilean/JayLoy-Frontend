"use client";
import '../styles/globals.css';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      router.push('/');
    }
  }, [router]);

  return <>{children}</>;
}
