'use client';

import { useAuth } from '@/lib/auth';

export function UserProfile() {
  const { user, signOut } = useAuth();

  if (!user) return null;

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <img
          src={user.user_metadata.avatar_url}
          alt={user.user_metadata.full_name}
          className="w-8 h-8 rounded-full"
        />
        <span className="text-sm font-medium">
          {user.user_metadata.full_name}
        </span>
      </div>
      <button
        onClick={signOut}
        className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded transition-colors"
      >
        ログアウト
      </button>
    </div>
  );
}