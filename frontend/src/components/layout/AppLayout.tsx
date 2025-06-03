"use client";

import { useAuth } from "@/lib/auth";
import { UserProfile } from "@/components/auth/UserProfile";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-violet-50 flex items-center justify-center">
        <div className="text-lg text-violet-700">読み込み中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-violet-50">
      {user && (
        <header className="bg-violet-100 shadow-sm border-b border-violet-200 w-full fixed top-0 left-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/">
                <Image
                  src="/unitehub-logo.png"
                  alt="UniteHub"
                  width={180}
                  height={45}
                  className="cursor-pointer"
                />
              </Link>
              <div className="flex items-center space-x-6">
                <nav className="flex items-center space-x-4">
                  <Link href="/" className="text-violet-700 hover:text-violet-900 hover:bg-violet-200 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150">
                    トップ
                  </Link>
                  <Link href="/scrim/find" className="text-violet-700 hover:text-violet-900 hover:bg-violet-200 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150">
                    スクリムを探す
                  </Link>
                  <Link href="/scrim/recruit" className="text-violet-700 hover:text-violet-900 hover:bg-violet-200 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150">
                    スクリムを募集する
                  </Link>
                </nav>
                <UserProfile />
              </div>
            </div>
          </div>
        </header>
      )}
      <main className={`${user ? 'pt-16' : ''} flex flex-col items-center justify-start p-4 min-h-[calc(100vh-4rem)]`}>
        {/* The 'min-h-[calc(100vh-4rem)]' ensures that the content area takes at least the full viewport height minus the header height if the user is logged in, and full viewport height otherwise. */}
        {/* 'flex flex-col items-center justify-start' helps in centering the content block if it's narrower than the viewport and aligning it to the top. */}
        <div className="w-full max-w-2xl mt-8">
             {/* This div acts as the main content container, similar to what was in page.tsx */}
            {children}
        </div>
      </main>
    </div>
  );
}
