# CLAUDE.md

このファイルはClaude Codeがこのリポジトリで作業する際のルールを定義します。

---

## Claude Code マスター進捗チェックリスト

### セットアップ・基盤
- [x] CLAUDE.md の作成・プロジェクトルール設定
- [x] GitHub リポジトリの作成・初回プッシュ
- [x] Vercel デプロイ（`vercel login` / `vercel link` / `vercel deploy`）
- [x] Vercel Plugin の導入
- [ ] `.claude/settings.json` のカスタマイズ（allowedTools, permissions）

### Plan Mode & Checkpoints
- [x] Plan Mode の使用（設計提示 → ユーザー承認フロー）
- [x] Checkpoint の作成・活用（`/checkpoint`）
- [x] Checkpoint からのロールバック

### Hooks
- [ ] PostToolUse Hook の設定（自動 lint / format）
- [ ] PreToolUse Hook の設定（ファイルサイズガード等）
- [ ] Stop Hook の設定（セッション終了時の最終ビルド確認）

### Subagents & Agent ツール
- [ ] Explore agent の活用（コードベース調査）
- [ ] Planner agent の活用（実装計画）
- [ ] Code Reviewer agent の活用（コードレビュー）
- [ ] 並列 agent 実行（複数 agent を同時起動）
- [ ] Background agent の活用

### MCP (Model Context Protocol)
- [ ] MCP サーバーの設定（`/mcp`）
- [ ] Context7 MCP の導入（ライブラリドキュメント取得）
- [ ] Vercel MCP サーバーの活用
- [ ] カスタム MCP サーバーの作成

### Memory システム
- [ ] user / feedback / project / reference メモリの作成
- [ ] MEMORY.md インデックスの整備
- [ ] セッション間でのメモリ活用

### スキル (Skills)
- [ ] `/commit` スキルの活用
- [ ] `/review-pr` スキルの活用
- [ ] カスタムスキルの作成
- [ ] `vercel:deploy` / `vercel:env` スキルの活用

### 高度な機能
- [ ] Extended Thinking の制御（`Option+T` トグル）
- [ ] Multi-agent ワークフロー（orchestrate スキル）
- [ ] Sessions 管理（`/sessions`）
- [ ] `/loop` による定期実行タスク

---

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
