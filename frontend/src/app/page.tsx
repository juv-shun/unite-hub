"use client";

import { LoginButton } from "@/components/auth/LoginButton";
import { useAuth } from "@/lib/auth";
import Image from "next/image";
import AppLayout from "@/components/layout/AppLayout";

export default function Home() {
  const { user } = useAuth(); // AppLayout handles 'loading' and provides user context if needed directly by children

  return (
    <AppLayout>
      {/* Content specific to the Home page */}
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
        <div className="text-center p-8 bg-white rounded-xl shadow-lg">
          {/* Removed mt-5 as AppLayout's content container (max-w-2xl) already has mt-8 */}
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            ようこそ、{user.user_metadata.full_name || user.email}さん！
          </h1>
          <p className="text-xl text-gray-600">
            今週のスクリムの予定を確認しましょう。
          </p>
          {/* Add more content for logged-in users here */}
        </div>
      )}
    </AppLayout>
  );
}
