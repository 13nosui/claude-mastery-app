#!/bin/bash
# PreToolUse hook: Write/Edit/MultiEdit で編集対象ファイルが 500 行以上なら警告して exit 2 でブロック。
# stdin にツール呼び出しの JSON が渡される。
# exit 0: 通過 / exit 2: ブロック（stderr のメッセージが Claude に返る）

set -e

INPUT=$(cat)

FILE_PATH=$(printf '%s' "$INPUT" | python3 -c "
import json, sys
try:
    d = json.load(sys.stdin)
    print(d.get('tool_input', {}).get('file_path', ''))
except Exception:
    print('')
" 2>/dev/null)

# 新規作成や file_path が取れない場合はスルー
if [ -z "$FILE_PATH" ] || [ ! -f "$FILE_PATH" ]; then
  exit 0
fi

LINE_COUNT=$(wc -l < "$FILE_PATH" | tr -d ' ')

if [ "$LINE_COUNT" -ge 800 ]; then
  {
    echo "⚠️  [PreToolUse 安全ガード] 大きなファイルの編集がブロックされました"
    echo ""
    echo "    対象ファイル: $FILE_PATH"
    echo "    行数: ${LINE_COUNT} 行 (閾値: 800 行)"
    echo ""
    echo "    500 行を超えるファイルの編集は、変更の影響範囲が大きくなりがちです。"
    echo "    次のいずれかを検討してください:"
    echo "      1. ファイルを複数のモジュールに分割する"
    echo "      2. どうしても編集が必要な場合、ユーザーに明示的に許可を求める"
    echo "      3. 一時的にこの警告を無効化したい場合は settings.local.json から"
    echo "         check-large-file.sh の PreToolUse エントリを削除する"
  } >&2
  exit 2
fi

exit 0
