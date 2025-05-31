'use client';

import { useAuth } from '@/lib/auth';
import { LoginButton } from '@/components/auth/LoginButton';
import { UserProfile } from '@/components/auth/UserProfile';
import Image from 'next/image';

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">読み込み中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Image src="/unitehub-logo.png" alt="UniteHub" width={200} height={50} />
            {user && <UserProfile />}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!user ? (
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              ポケモンユナイトのスクリム管理プラットフォーム
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              チーム同士のスクリム（練習試合）の募集・マッチングを効率的に行えるプラットフォームです。
            </p>
            <LoginButton />
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              ようこそ、{user.user_metadata.full_name}さん！
            </h2>
          </div>
        )}
      </main>
    </div>
  );
}
