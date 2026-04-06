#!/bin/bash
# Stop hook: セッション終了前に npm run build を実行してビルドエラーを検知する。
# ビルドが失敗した場合は exit 2 で警告を出す（Claude の終了処理は続行）。

PROJECT_DIR="/Users/sugawara/Service/claude-mastery-app"

cd "$PROJECT_DIR" || {
  echo "[Stop] プロジェクトディレクトリに移動できませんでした: $PROJECT_DIR" >&2
  exit 0
}

echo "[Stop 最終チェック] npm run build を実行中..." >&2

BUILD_OUTPUT=$(npm run build 2>&1)
BUILD_EXIT=$?

if [ $BUILD_EXIT -ne 0 ]; then
  {
    echo ""
    echo "❌ [Stop 最終チェック] ビルドエラーが検出されました"
    echo ""
    echo "--- ビルドログ (末尾 25 行) ---"
    printf '%s\n' "$BUILD_OUTPUT" | tail -25
    echo "--- ログ終わり ---"
    echo ""
    echo "セッションを終了する前に、上記のエラーを修正することをおすすめします。"
  } >&2
  exit 2
fi

echo "[Stop 最終チェック] ✓ ビルド成功 — 安全に終了できます" >&2
exit 0
