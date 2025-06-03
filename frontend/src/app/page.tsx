"use client";

import { LoginButton } from "@/components/auth/LoginButton";
import { UserProfile } from "@/components/auth/UserProfile"; // UserProfile might be used if header is restored or for logged-in state
import { useAuth } from "@/lib/auth";
import Image from "next/image";

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-violet-50 flex items-center justify-center">
        <div className="text-lg text-violet-700">読み込み中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-violet-50 flex flex-col items-center justify-center p-4">
      {/* For unauthenticated view, header is removed to simplify and focus the landing page. */}
      {/* If a header is desired for the unauthenticated view, it would need styling like: */}
      {/* <header className="bg-violet-100 shadow-md border-b border-violet-200 w-full fixed top-0 left-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Image src="/unitehub-logo.png" alt="UniteHub" width={180} height={45} />
            {user && <UserProfile />}
          </div>
        </div>
      </header> */}

      <main className="w-full max-w-2xl mt-0">
        {!user ? (
          <div className="text-center bg-white p-8 sm:p-12 rounded-2xl shadow-xl transform transition-all hover:scale-105 duration-300">
            <div className="mb-8">
              <Image
                src="/unitehub-logo.png"
                alt="UniteHub"
                width={280}
                height={70}
                className="mx-auto"
                priority
              />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-violet-600 mb-6 tracking-tight">
              ポケモンユナイトのスクリム管理プラットフォーム
            </h1>
            <p className="text-lg text-violet-500 mb-10 leading-relaxed">
              チーム同士のスクリム（練習試合）の募集・マッチングを効率的に行えるプラットフォームです。
            </p>
            <div className="flex justify-center">
              <LoginButton />
            </div>
          </div>
        ) : (
          // Logged-in view
          <div className="text-center p-8 bg-white rounded-xl shadow-lg">
            <header className="bg-violet-100 shadow-sm border-b border-violet-200 w-full fixed top-0 left-0 z-50 mb-24">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                  <Image
                    src="/unitehub-logo.png"
                    alt="UniteHub"
                    width={180}
                    height={45}
                  />
                  {user && <UserProfile />}
                </div>
              </div>
            </header>
            <div className="mt-5">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                ようこそ、{user.user_metadata.full_name || user.email}さん！
              </h1>
              <p className="text-xl text-gray-600">
                今週のスクリムの予定を確認しましょう。
              </p>
              {/* Add more content for logged-in users here */}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
