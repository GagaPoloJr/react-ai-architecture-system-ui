#!/usr/bin/env bash
set -euo pipefail

# ============================================================================
# Component Scaffold Script
# Usage:   bash .scaffolds/component-scaffold.sh <ComponentName> [path]
# Example: bash .scaffolds/component-scaffold.sh Button
#          bash .scaffolds/component-scaffold.sh DataTable shared/ui
#          bash .scaffolds/component-scaffold.sh UserCard features/user-management/components
#
# All filenames are kebab-case. Functions/components stay PascalCase.
#
# Creates:
#   shared/ui/button/
#   ├── button.tsx
#   ├── button.types.ts
#   └── index.ts
# ============================================================================

RED='\033[0;31m'; GREEN='\033[0;32m'; CYAN='\033[0;36m'; NC='\033[0m'

usage() {
  echo "Usage: $0 <ComponentName> [path]"
  echo ""
  echo "Arguments:"
  echo "  ComponentName  PascalCase (e.g., Button, DataTable)"
  echo "  path           Target dir relative to src/ (default: shared/ui)"
  echo ""
  echo "Examples:"
  echo "  $0 Button"
  echo "  $0 DataTable shared/ui"
  echo "  $0 UserCard features/user-management/components"
  exit 1
}

if [ $# -lt 1 ] || [ $# -gt 2 ]; then usage; fi

COMPONENT_NAME="$1"  # PascalCase, e.g. "DataTable"
TARGET_PATH="${2:-shared/ui}"

if ! echo "$COMPONENT_NAME" | grep -qE '^[A-Z][a-zA-Z0-9]*$'; then
  echo -e "${RED}Error:${NC} Component name must be PascalCase (e.g., Button, DataTable)."
  echo "  Got: '$COMPONENT_NAME'"
  exit 1
fi

# PascalCase → kebab-case: "DataTable" → "data-table"
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
FILE_NAME=$(kebab "$COMPONENT_NAME")

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BASE_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
COMPONENT_DIR="$BASE_DIR/src/$TARGET_PATH/$FILE_NAME"

if [ -d "$COMPONENT_DIR" ]; then
  echo -e "${RED}Error:${NC} Component directory already exists: $COMPONENT_DIR"
  exit 1
fi

mkdir -p "$COMPONENT_DIR"
echo -e "${CYAN}Scaffolding component:${NC} $COMPONENT_NAME"
echo "  Directory: src/$TARGET_PATH/$FILE_NAME/"
echo ""

# Component file (kebab-case filename, PascalCase function inside)
cat > "$COMPONENT_DIR/$FILE_NAME.tsx" <<EOF
import { forwardRef } from 'react'
import type { ElementType, HTMLAttributes } from 'react'
import { cn } from '@shared/utils/cn'
import { cva, type VariantProps } from 'class-variance-authority'

export const ${COMPONENT_NAME}Variants = cva('', {
  variants: {
    variant: {
      default: '',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export interface ${COMPONENT_NAME}Props
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof ${COMPONENT_NAME}Variants> {
  asChild?: boolean
}

export const ${COMPONENT_NAME} = forwardRef<HTMLDivElement, ${COMPONENT_NAME}Props>(
  function ${COMPONENT_NAME}({ className, variant, asChild, ...props }, ref) {
    const Comp: ElementType = asChild ? 'span' : 'div'
    return (
      <Comp
        ref={ref}
        className={cn(${COMPONENT_NAME}Variants({ variant }), className)}
        {...props}
      />
    )
  },
)

${COMPONENT_NAME}.displayName = '${COMPONENT_NAME}'
EOF

# Types file (kebab-case)
cat > "$COMPONENT_DIR/$FILE_NAME.types.ts" <<EOF
export type { ${COMPONENT_NAME}Props } from './$FILE_NAME'
export { ${COMPONENT_NAME}Variants, ${COMPONENT_NAME} } from './$FILE_NAME'
EOF

# Barrel export
cat > "$COMPONENT_DIR/index.ts" <<EOF
export { ${COMPONENT_NAME} } from './$FILE_NAME'
export type { ${COMPONENT_NAME}Props } from './$FILE_NAME'
EOF

echo -e "${GREEN}✓${NC} Component '$COMPONENT_NAME' scaffolded successfully!"
echo ""
echo "Files:"
find "$COMPONENT_DIR" -type f | sed "s|$BASE_DIR/||" | sed 's/^/  /'
echo ""
echo -e "${CYAN}Next steps:${NC}"
echo "  1. Add CVA variants in the component file"
echo "  2. Implement the component logic"
echo "  3. Import via '@/$TARGET_PATH/$FILE_NAME'"
echo ""
