"use client";

import { LoginButton } from "@/components/auth/LoginButton";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-violet-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
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
      </div>
    </div>
  );
}
