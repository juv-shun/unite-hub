---
trigger: always_on
---

## 技術スタック

- Next.js と Supabase の組み合わせで実現する。
- バックエンドは、Next.js の API Router、もしくは Supabase の Edge Functions で実現する。
- DB: PostgreSQL (Supabase)
- 認証: Supabase Auth
- CSS: Tailwind CSS

### Next.js

特に指定がない限りは、CSR (Client Side Rendering)で実装する。

## 実装時のルール

- ある機能を実装する際は、docs/product_core.yaml、および docs/user_story_map.yaml を必ず参照し、プロダクトの全体像を想定した上で設計すること
- 本アプリケーションは、スマホもしくは PC から利用されることを想定しています。したがって、画面を作るときは、レスポンシブ対応してください。
