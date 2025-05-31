# UniteHub

UniteHub は、ポケモンユナイトの競技チームがスクリム(練習試合)を組むためのプラットフォームです。

## 🎯 対象ユーザー

ポケモンユナイトで競技シーンに臨んでいるチーム、およびメンバー

## 課題 (Pain)

ポケモンユナイトの競技シーンで活躍しているチームは、ほぼ毎日スクリムを組む必要があります。
しかし、スクリム管理に適したアプリケーションは存在せず、スクリムの募集は X (旧 Twitter) で行っているのが主流です。
そのため、以下のような課題があります。

- 募集がタイムラインで流れてしまいやすい
- どのチームがどの時間にスクリムを募集しているのか把握するのが困難
- チーム内でも、どのスケジュールでどのチームとスクリムを行うのか把握するのが困難

## 提供価値 (Gain)

UniteHub を利用することで、以下のメリットがあります。

- 他チームがどのスケジュールでスクリムを募集しているのかが容易に把握できる
- 自チームがどのスケジュールでどのチームとスクリムを行うスケジュールになっているのかが容易に把握できる
- Web アプリケーション内で、容易にスクリムを募集したり、スクリムを組むことができる

## 🚀 技術スタック

### フロントエンド

- [Next.js](https://nextjs.org/) (React フレームワーク)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Supabase](https://supabase.io/) (データベース、認証)
- [ESLint](https://eslint.org/) (リンター)
- [Prettier](https://prettier.io/) (フォーマッター)

### バックエンド (想定)

- [Python](https://www.python.org/)
- Web フレームワーク (例: [FastAPI](https://fastapi.tiangolo.com/), [Flask](https://flask.palletsprojects.com/))
- [uv](https://github.com/astral-sh/uv) (パッケージ管理)
- [Ruff](https://github.com/astral-sh/ruff) (リンター, フォーマッター, 型チェッカー)
- [PostgreSQL](https://www.postgresql.org/) (Supabase 経由)

## 📁 プロジェクト構成 (例)

```
unite-hub/
├── frontend/             # Next.jsフロントエンドコード
│   ├── public/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── lib/          # Supabaseクライアントなど
│   │   └── styles/
│   ├── .env.local.example # 環境変数サンプル
│   ├── next.config.mjs   # Next.js設定 (または .js)
│   ├── package.json
│   ├── tsconfig.json
│   ├── postcss.config.js # Tailwind CSS設定
│   └── tailwind.config.ts # Tailwind CSS設定
├── docs/                 # ドキュメント
│   ├── core.yaml
│   └── user_story_map.yaml
├── supabase/             # Supabaseマイグレーション (存在する場合)
│   └── migrations/
├── .gitignore
└── README.md             # このファイル
```

## 🏁 はじめに

### 前提条件

- [Node.js](https://nodejs.org/) (最新の LTS 版を推奨)
- パッケージマネージャー: [npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/), または [pnpm](https://pnpm.io/)
- [Python](https://www.python.org/) (3.9 以上を推奨)
- [uv](https://github.com/astral-sh/uv) (`pip install uv`)

### Supabase プロジェクトのセットアップ

1.  [Supabase](https://supabase.com/) でプロジェクトを作成します。
2.  プロジェクトの URL と`anon`キーを取得します。
3.  （オプション）ローカル開発用に Supabase CLI をセットアップし、マイグレーションファイルを `supabase/migrations` に配置します。

### インストールと設定

#### 1. リポジトリをクローン

```bash
git clone https://github.com/juv-shun/unite-hub.git
cd unite-hub
```

#### 2. フロントエンドのセットアップ

```bash
cd frontend
npm install # または yarn install / pnpm install
cp .env.local.example .env.local
```

`frontend/.env.local` に Supabase のプロジェクト URL と`anon`キーを設定します:

```env
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

#### 3. Supabase 環境設定 (ローカル開発用)

ローカルで Supabase の機能 (例: Discord OAuth) を利用する際には、関連する環境変数を設定する必要があります。

まず、`frontend` ディレクトリからプロジェクトのルートディレクトリに戻り、`supabase` ディレクトリへ移動します。
```bash
cd .. # frontend ディレクトリからプロジェクトルートへ
cd supabase
cp .env.local.example .env.local
```

次に、`supabase/.env.local` ファイルを開き、`supabase/.env.local.example` を参考にしながら、必要な値を設定してください。例えば、Discord OAuth を利用する場合は、クライアントIDやシークレットなどを設定します。

設定後、プロジェクトのルートディレクトリに戻っておくと、次の「開発サーバーの起動」ステップに進みやすくなります。
```bash
cd .. # supabase ディレクトリからプロジェクトルートへ
```

### 開発サーバーの起動

#### 1. Supabase (ローカル開発環境)

Supabase CLI を使用して、ローカルの Supabase 環境を起動します。
プロジェクトのルートディレクトリ (または `supabase` ディレクトリが存在する場所) で以下のコマンドを実行してください。

```bash
supabase start
```

これにより、ローカルのデータベースや認証機能が利用可能になります。
初回起動時や `supabase/migrations` に変更があった場合は、マイグレーションが適用されます。

#### 2. フロントエンド (Next.js)

```bash
cd frontend
npm run dev # または yarn dev / pnpm dev
```

ブラウザで [`http://localhost:3000`](http://localhost:3000) を開きます。

## 🔧 リンティングとフォーマット

### フロントエンド

```bash
cd frontend
npm run lint
npm run format # Prettierによるフォーマット (package.jsonにスクリプト定義が必要)
```

## 🤝 貢献

貢献を歓迎します！貢献方法については、`CONTRIBUTING.md`（未作成の場合は作成を検討）を参照してください。

## 📜 ライセンス

このプロジェクトは [ライセンス名] ライセンスの下で公開されています。詳細は `LICENSE` ファイル（未作成の場合は作成を検討）を参照してください。
