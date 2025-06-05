    # CLAUDE.md

このファイルは、Claude Code (claude.ai/code) がこのリポジトリでコードを操作する際のガイダンスを提供します。

## プロジェクト概要

UniteHub は、ポケモンユナイトの競技チームがスクリム（練習試合）を組むためのプラットフォームです。現在チームが Twitter/X でスクリム募集を行っており、練習スケジュールの追跡と整理が困難である課題を解決します。

## アーキテクチャ

- **フロントエンド**: `frontend/` にある Next.js 15、TypeScript、React 19、Tailwind CSS
- **バックエンド**: `supabase/` にローカル開発設定がある Supabase
- **ドキュメント**: `docs/core.yaml` の製品仕様と `docs/user_story_map.yaml` のユーザーストーリーマップ

アプリケーションは認証とデータベース管理に Supabase SSR を使用し、Discord OAuth 連携を予定しています。

## 開発コマンド

### フロントエンド開発（`frontend/` ディレクトリで実行）

```bash
# 開発サーバーを起動（http://localhost:3000）
npm run dev

# 本番用ビルド
npm run build

# 本番サーバー起動
npm start

# リンター実行
npm run lint
```

### Supabase ローカル開発

```bash
# ローカルSupabaseインスタンス起動
supabase start

# Supabase Studio: http://127.0.0.1:54323
# API: http://127.0.0.1:54321
# データベースポート: 54322
```

## 主要機能

ユーザーストーリーマップに基づく機能：

- Discord 認証
- チーム管理（作成、メンバー管理、オーナー権限移譲）
- スクリムスケジューリングと募集
- マッチング申請と承認システム
- 確定済みスクリムのスケジュール管理

## 開発ガイドライン

### 技術スタックルール

- **データベース**: Supabase 経由の PostgreSQL
- **認証**: Supabase Auth
- **CSS フレームワーク**: Tailwind CSS
- **レンダリング**: 特に指定がない限り CSR（Client Side Rendering）

### 実装要件

- 機能を実装する際は、必ず `docs/core.yaml` と `docs/user_story_map.yaml` を参照し、プロダクト全体像を理解した上で設計すること
- バックエンドは、Next.js の API Router、もしくは Supabase の Edge Functions で実現する
- 本アプリケーションは、スマホもしくは PC から利用されることを想定しているため、レスポンシブ対応必須
