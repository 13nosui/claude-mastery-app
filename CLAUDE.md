# CLAUDE.md

このファイルはClaude Codeがこのリポジトリで作業する際のルールを定義します。

## プロジェクト概要

Next.js アプリケーション (`src` ディレクトリ構成)

---

## 必須ルール

### 1. Next.js `src` ディレクトリ構造の厳守

すべてのアプリケーションコードは `src/` 配下に配置すること。

```
src/
├── app/          # App Router のルート・レイアウト
├── components/   # 再利用可能なUIコンポーネント
├── hooks/        # カスタムフック
├── lib/          # ユーティリティ・ヘルパー
├── types/        # TypeScript 型定義
└── styles/       # グローバルスタイル
```

- `src/` の外にアプリケーションコードを置かない
- `pages/` や `app/` を `src/` の外に作成しない
- 設定ファイル (`next.config.ts`, `tailwind.config.ts` など) はルートに置く

### 2. コミット前に必ず `npm run lint` を実行する

コミットを作成する前に、**必ず** 以下のコマンドを実行してエラーがないことを確認すること：

```bash
npm run lint
```

- lint エラーがある場合はコミットしない
- lint 警告も可能な限り解消する
- `--no-verify` でフックをスキップしない

### 3. 新機能追加時の Checkpoint と Plan Mode

新機能を追加する際は以下のフローを厳守すること：

1. **Plan Mode で設計を提示する** — `/edit` を実行する前に、必ず Plan Mode に入り実装方針を提示してユーザーの承認を得る
2. **Checkpoint を作成する** — 実装開始前に `/checkpoint` で現在の状態を保存する
3. ユーザーが承認した後にのみ実装を開始する

```
新機能追加フロー:
  Plan Mode → 設計提示 → ユーザー承認 → Checkpoint 作成 → 実装
```

---

## コーディング規約

- TypeScript を使用し、`any` 型は避ける
- コンポーネントは関数コンポーネントで記述する
- ファイルは 800 行以内に収める
- 関数は 50 行以内に収める
- ネストは 4 階層以内に抑える

## コミットメッセージ

Conventional Commits 形式を使用する：

```
<type>: <description>
```

Types: `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `ci`
