#!/usr/bin/env bash
set -euo pipefail

# ============================================================================
# Feature Scaffold Script
# Usage:   bash .scaffolds/feature-scaffold.sh <feature-name>
# Example: bash .scaffolds/feature-scaffold.sh user-management
#
# Creates:
#   features/user-management/
#   ├── api/index.ts
#   ├── components/index.ts
#   ├── hooks/index.ts
#   ├── types/index.ts
#   ├── schemas/index.ts
#   └── index.ts
# ============================================================================

RED='\033[0;31m'; GREEN='\033[0;32m'; CYAN='\033[0;36m'; NC='\033[0m'

usage() {
  echo "Usage: $0 <feature-name>"
  echo ""
  echo "Scaffold a new feature module under features/."
  echo ""
  echo "Arguments:"
  echo "  feature-name    Kebab-case name (e.g., user-management)"
  echo ""
  echo "Example:"
  echo "  $0 report-builder"
  exit 1
}

if [ $# -ne 1 ]; then usage; fi

FEATURE_NAME="$1"

# Validate kebab-case
if ! echo "$FEATURE_NAME" | grep -qE '^[a-z][a-z0-9-]*$'; then
  echo -e "${RED}Error:${NC} Feature name must be kebab-case (lowercase letters, numbers, hyphens)."
  echo "  Got: '$FEATURE_NAME'"
  exit 1
fi

# Convert kebab-case to PascalCase (e.g., user-management → UserManagement)
PASCAL_NAME=""
IFS='-' read -ra PARTS <<< "$FEATURE_NAME"
for part in "${PARTS[@]}"; do
  PASCAL_NAME+="$(tr '[:lower:]' '[:upper:]' <<< "${part:0:1}")${part:1}"
done
# Convert kebab-case to camelCase (e.g., user-management → userManagement)
CAMEL_NAME="$(tr '[:upper:]' '[:lower:]' <<< "${PASCAL_NAME:0:1}")${PASCAL_NAME:1}"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BASE_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
FEATURE_DIR="$BASE_DIR/src/features/$FEATURE_NAME"

if [ -d "$FEATURE_DIR" ]; then
  echo -e "${RED}Error:${NC} Feature directory already exists: $FEATURE_DIR"
  exit 1
fi

echo -e "${CYAN}Scaffolding feature:${NC} $FEATURE_NAME"
echo ""

DIRS=(
  "$FEATURE_DIR/api"
  "$FEATURE_DIR/components"
  "$FEATURE_DIR/hooks"
  "$FEATURE_DIR/types"
  "$FEATURE_DIR/schemas"
)

for dir in "${DIRS[@]}"; do
  mkdir -p "$dir"
  echo "  Created: $dir"
done

# types/index.ts
cat > "$FEATURE_DIR/types/index.ts" <<EOF
export interface ${PASCAL_NAME} {
  id: string
}

export type Create${PASCAL_NAME}Dto = Record<string, unknown>
export type Update${PASCAL_NAME}Dto = Partial<Create${PASCAL_NAME}Dto>
export type ${PASCAL_NAME}Filters = Record<string, unknown>
EOF

# schemas/index.ts
cat > "$FEATURE_DIR/schemas/index.ts" <<EOF
import { z } from 'zod'

export const ${CAMEL_NAME}Schema = z.object({
  // TODO: define fields
})

export type ${PASCAL_NAME}FormValues = z.infer<typeof ${CAMEL_NAME}Schema>
EOF

# api/index.ts
cat > "$FEATURE_DIR/api/index.ts" <<EOF
import { client } from '@configs/http/client'
import type { ${PASCAL_NAME}, Create${PASCAL_NAME}Dto, Update${PASCAL_NAME}Dto } from '../types'

const BASE = '/${FEATURE_NAME}'

export const ${CAMEL_NAME}Api = {
  list: (params?: Record<string, unknown>) =>
    client.get<${PASCAL_NAME}[]>(BASE, { params }).then(r => r.data),
  byId: (id: string) =>
    client.get<${PASCAL_NAME}>(\`\${BASE}/\${id}\`).then(r => r.data),
  create: (data: Create${PASCAL_NAME}Dto) =>
    client.post<${PASCAL_NAME}>(BASE, data).then(r => r.data),
  update: (id: string, data: Update${PASCAL_NAME}Dto) =>
    client.patch<${PASCAL_NAME}>(\`\${BASE}/\${id}\`, data).then(r => r.data),
  remove: (id: string) =>
    client.delete(\`\${BASE}/\${id}\`),
}
EOF

# hooks/index.ts
cat > "$FEATURE_DIR/hooks/index.ts" <<EOF
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ${CAMEL_NAME}Api } from '../api'
import type { ${PASCAL_NAME}, Create${PASCAL_NAME}Dto } from '../types'

const queryKeys = {
  all: ['${FEATURE_NAME}'] as const,
  list: (params?: Record<string, unknown>) => ['${FEATURE_NAME}', 'list', params] as const,
  detail: (id: string) => ['${FEATURE_NAME}', 'detail', id] as const,
}

export function use${PASCAL_NAME}List(params?: Record<string, unknown>) {
  return useQuery({
    queryKey: queryKeys.list(params),
    queryFn: () => ${CAMEL_NAME}Api.list(params),
  })
}

export function use${PASCAL_NAME}Detail(id: string) {
  return useQuery({
    queryKey: queryKeys.detail(id),
    queryFn: () => ${CAMEL_NAME}Api.byId(id),
    enabled: !!id,
  })
}

export function useCreate${PASCAL_NAME}() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: Create${PASCAL_NAME}Dto) => ${CAMEL_NAME}Api.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
    },
  })
}
EOF

# components/index.ts
cat > "$FEATURE_DIR/components/index.ts" <<EOF
export { ${PASCAL_NAME}List } from './${PASCAL_NAME}List'
EOF

# Feature barrel
cat > "$FEATURE_DIR/index.ts" <<EOF
export { use${PASCAL_NAME}List, use${PASCAL_NAME}Detail, useCreate${PASCAL_NAME} } from './hooks'
export type { ${PASCAL_NAME}, Create${PASCAL_NAME}Dto, Update${PASCAL_NAME}Dto } from './types'
EOF

echo ""
echo -e "${GREEN}✓${NC} Feature '$FEATURE_NAME' scaffolded successfully!"
echo ""
echo "Structure:"
find "$FEATURE_DIR" -type f | sed "s|$BASE_DIR/||" | sed 's/^/  /'
echo ""
echo -e "${CYAN}Next steps:${NC}"
echo "  1. Define types in src/features/$FEATURE_NAME/types/index.ts"
echo "  2. Add zod schema in src/features/$FEATURE_NAME/schemas/index.ts"
echo "  3. Build UI components in src/features/$FEATURE_NAME/components/"
echo "  4. Register route in your router config"
echo ""
