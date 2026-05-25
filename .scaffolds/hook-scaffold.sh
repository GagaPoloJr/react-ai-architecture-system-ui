#!/usr/bin/env bash
set -euo pipefail

# ============================================================================
# Hook Scaffold Script
# Usage:   bash .scaffolds/hook-scaffold.sh <HookName> [path]
# Example: bash .scaffolds/hook-scaffold.sh useDebounce shared/hooks
#          bash .scaffolds/hook-scaffold.sh useUserFilters features/user-management/hooks
#
# All filenames are kebab-case. Functions stay camelCase.
#
# Creates:
#   shared/hooks/use-debounce/
#   ├── use-debounce.ts
#   └── index.ts
# ============================================================================

RED='\033[0;31m'; GREEN='\033[0;32m'; CYAN='\033[0;36m'; NC='\033[0m'

usage() {
  echo "Usage: $0 <HookName> [path]"
  echo ""
  echo "Arguments:"
  echo "  HookName   'use' prefix + PascalCase (e.g., useDebounce)"
  echo "  path       Target dir relative to src/ (default: shared/hooks)"
  echo ""
  echo "Examples:"
  echo "  $0 useDebounce"
  echo "  $0 useDebounce shared/hooks"
  echo "  $0 useUserFilters features/user-management/hooks"
  exit 1
}

if [ $# -lt 1 ] || [ $# -gt 2 ]; then usage; fi

HOOK_NAME="$1"  # e.g. "useDebounce"
TARGET_PATH="${2:-shared/hooks}"

if ! echo "$HOOK_NAME" | grep -qE '^use[A-Z][a-zA-Z0-9]*$'; then
  echo -e "${RED}Error:${NC} Hook name must start with 'use' followed by PascalCase (e.g., useDebounce)."
  echo "  Got: '$HOOK_NAME'"
  exit 1
fi

# PascalCase → kebab-case: "useDebounce" → "use-debounce"
kebab() {
  local n="$1" r="" i=0 c
  while [ $i -lt ${#n} ]; do
    c="${n:$i:1}"
    if [[ "$c" =~ [A-Z] ]]; then
      [ $i -gt 0 ] && r+="-"
      r+="$(tr '[:upper:]' '[:lower:]' <<< "$c")"
    else
      r+="$c"
    fi
    ((i++))
  done
  echo "$r"
}
FILE_NAME=$(kebab "$HOOK_NAME")

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BASE_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
HOOK_DIR="$BASE_DIR/src/$TARGET_PATH/$FILE_NAME"

if [ -d "$HOOK_DIR" ]; then
  echo -e "${RED}Error:${NC} Hook directory already exists: $HOOK_DIR"
  exit 1
fi

mkdir -p "$HOOK_DIR"
echo -e "${CYAN}Scaffolding hook:${NC} $HOOK_NAME"
echo "  Directory: src/$TARGET_PATH/$FILE_NAME/"
echo ""

NOUN="${HOOK_NAME#use}"
PARAMS_TYPE="${NOUN}Params"
RETURN_TYPE="${NOUN}Return"

# Hook file (kebab-case filename, camelCase function inside)
cat > "$HOOK_DIR/$FILE_NAME.ts" <<EOF
import { useState, useCallback } from 'react'

export interface ${PARAMS_TYPE}<T = unknown> {
  initialValue?: T
}

export interface ${RETURN_TYPE}<T = unknown> {
  value: T | null
  setValue: (value: T | null) => void
  reset: () => void
}

export function ${HOOK_NAME}<T = unknown>(
  params?: ${PARAMS_TYPE}<T>,
): ${RETURN_TYPE}<T> {
  const [value, setValue] = useState<T | null>(params?.initialValue ?? null)

  const reset = useCallback(() => {
    setValue(params?.initialValue ?? null)
  }, [params?.initialValue])

  return { value, setValue, reset }
}
EOF

# Barrel export
cat > "$HOOK_DIR/index.ts" <<EOF
export { ${HOOK_NAME} } from './$FILE_NAME'
export type { ${PARAMS_TYPE}, ${RETURN_TYPE} } from './$FILE_NAME'
EOF

echo -e "${GREEN}✓${NC} Hook '$HOOK_NAME' scaffolded successfully!"
echo ""
echo "Files:"
find "$HOOK_DIR" -type f | sed "s|$BASE_DIR/||" | sed 's/^/  /'
echo ""
echo -e "${CYAN}Next steps:${NC}"
echo "  1. Implement the hook logic in $FILE_NAME.ts"
echo "  2. Import via '@/$TARGET_PATH/$FILE_NAME'"
echo ""
