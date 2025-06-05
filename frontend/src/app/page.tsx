"use client";

import { useAuth } from "@/lib/auth";
import AppLayout from "@/components/layout/AppLayout";

export default function Home() {
  const { user } = useAuth(); // AppLayout handles 'loading' and provides user context if needed directly by children

  return (
    <AppLayout>
      {/* Content specific to the Home page */}
      {user && (
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
      {/* AppLayoutがloadingを処理し、middlewareが未認証ユーザーを/loginへリダイレクト */}
    </AppLayout>
  );
}
