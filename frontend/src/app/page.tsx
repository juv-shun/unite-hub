'use client';

import { useAuth } from '@/lib/auth';
import { LoginButton } from '@/components/auth/LoginButton';
import { UserProfile } from '@/components/auth/UserProfile';

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
            <h1 className="text-2xl font-bold text-gray-900">UniteHub</h1>
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
            <p className="text-gray-600 mb-8">
              UniteHubでスクリムの管理を始めましょう。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-2">チーム管理</h3>
                <p className="text-gray-600">チームの作成・編集・メンバー管理</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-2">スクリム募集</h3>
                <p className="text-gray-600">練習試合の募集・応募</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-2">スケジュール管理</h3>
                <p className="text-gray-600">確定済みスクリムの管理</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
