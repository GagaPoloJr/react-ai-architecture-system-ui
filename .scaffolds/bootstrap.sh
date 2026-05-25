#!/usr/bin/env bash
set -euo pipefail

# ─────────────────────────────────────────────────────────
# Bootstrap: Create a new project using this architecture
# Usage:
#   From arch repo:  ./.scaffolds/bootstrap.sh my-app
#   Or from any dir: bash ./path/to/bootstrap.sh my-app
# ─────────────────────────────────────────────────────────

RED='\033[0;31m'
GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
NC='\033[0m'

if [ $# -ne 1 ]; then
  echo "Usage: $0 <project-name>"
  exit 1
fi

PROJECT=$1

# Detect where the architecture files live
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ARCH_DIR="$(dirname "$SCRIPT_DIR")"

# If script was run from outside the arch repo (e.g. curl-piped or copied standalone),
# ARCH_DIR points to wherever bootstrap.sh sits.
# Validate that key arch dirs exist nearby.
if [ ! -f "$ARCH_DIR/core.md" ] && [ ! -f "$ARCH_DIR/.architecture/folder-structure.md" ]; then
  echo -e "${RED}Error: Architecture files not found.${NC}"
  echo "  Run this script from inside the architecture repository,"
  echo "  or keep bootstrap.sh inside the arch repo."
  echo "  Missing: $ARCH_DIR/core.md or $ARCH_DIR/.architecture/"
  exit 1
fi

PROJECT_DIR="$(pwd)/$PROJECT"

if [ -d "$PROJECT_DIR" ]; then
  echo -e "${RED}Error: Directory '$PROJECT_DIR' already exists.${NC}"
  exit 1
fi

echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${CYAN}  Bootstrap: $PROJECT${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

# ── 1. Create Vite project ────────────────────
echo -e "\n${GREEN}[1/8] Creating Vite + React + TypeScript project...${NC}"
npm create vite@latest "$PROJECT_DIR" -- --template react-ts
cd "$PROJECT_DIR"

# ── 2. Install dependencies ───────────────────
echo -e "\n${GREEN}[2/8] Installing core dependencies...${NC}"
npm install \
  react-router-dom \
  @tanstack/react-query \
  zustand \
  react-hook-form @hookform/resolvers zod \
  i18next react-i18next zod-i18n-map \
  axios \
  class-variance-authority clsx tailwind-merge \
  @radix-ui/react-alert-dialog \
  @radix-ui/react-avatar \
  @radix-ui/react-checkbox \
  @radix-ui/react-dialog \
  @radix-ui/react-dropdown-menu \
  @radix-ui/react-label \
  @radix-ui/react-select \
  @radix-ui/react-separator \
  @radix-ui/react-slot \
  @radix-ui/react-tabs \
  lucide-react \
  @tanstack/react-table \
  sonner \
  next-themes \
  react-helmet-async \
  date-fns \
  js-cookie \
  tw-animate-css \
  @fontsource-variable/inter

echo -e "\n${GREEN}[3/8] Installing dev dependencies...${NC}"
npm install -D \
  @tailwindcss/vite tailwindcss \
  @tanstack/react-query-devtools \
  eslint @eslint/js typescript-eslint \
  eslint-plugin-react-hooks eslint-plugin-react-refresh \
  prettier eslint-config-prettier prettier-plugin-tailwindcss \
  husky lint-staged \
  @types/node @types/js-cookie

# ── 3. Configure vite.config.ts ───────────────
echo -e "\n${GREEN}[4/8] Configuring vite.config.ts...${NC}"
cat > vite.config.ts << 'VITEEOF'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@features': path.resolve(__dirname, './src/features'),
      '@lib': path.resolve(__dirname, './src/lib'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@types': path.resolve(__dirname, './src/types'),
      '@utils': path.resolve(__dirname, './src/utils'),
    },
  },
})
VITEEOF

# ── 4. Configure tsconfig paths ───────────────
echo -e "\n${GREEN}[5/8] Configuring TypeScript paths...${NC}"
TSCONFIG="tsconfig.app.json"
if [ ! -f "$TSCONFIG" ]; then
  TSCONFIG="tsconfig.json"
fi

if ! grep -q '"paths"' "$TSCONFIG" 2>/dev/null; then
  # macOS sed: insert paths into compilerOptions
  sed -i '' 's/"strict": true,/"strict": true,\n    "noUncheckedIndexedAccess": true,\n    "noUnusedLocals": true,\n    "noUnusedParameters": true,\n    "verbatimModuleSyntax": true,\n    "paths": {\n      "@\/*": [".\/src\/*"],\n      "@components\/*": [".\/src\/components\/*"],\n      "@features\/*": [".\/src\/features\/*"],\n      "@lib\/*": [".\/src\/lib\/*"],\n      "@hooks\/*": [".\/src\/hooks\/*"],\n      "@types\/*": [".\/src\/types\/*"],\n      "@utils\/*": [".\/src\/utils\/*"]\n    },/' "$TSCONFIG"
fi

# ── 5. Create src/ directory structure ────────
echo -e "\n${GREEN}[6/8] Creating src/ directory structure...${NC}"
mkdir -p src/{shared/{ui/{atoms,molecules,organisms},lib,api,hooks,utils,types,config},features,pages,routes,layouts,stores,translations,middleware,configs,types,models,lib,hooks,providers}

# Stub files
cat > src/index.css << 'CSSEOF'
@import 'tailwindcss';
@import 'tw-animate-css';
@import '@fontsource-variable/inter';
CSSEOF

cat > src/providers/app-provider.tsx << 'PROVEOF'
import { HelmetProvider } from 'react-helmet-async'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'sonner'
import { BrowserRouter } from 'react-router-dom'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 30,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <BrowserRouter>
            {children}
            <Toaster position="top-right" richColors />
          </BrowserRouter>
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </HelmetProvider>
  )
}
PROVEOF

cat > src/shared/utils/cn.ts << 'CNEOF'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
CNEOF

cat > src/configs/http/client.ts << 'HTTPEOF'
import axios from 'axios'
import Cookies from 'js-cookie'

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' },
})

client.interceptors.request.use((config) => {
  const token = Cookies.get('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      Cookies.remove('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  },
)
HTTPEOF

cat > src/main.tsx << 'MAINEOF'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppProvider } from '@/providers/app-provider'
import { Router } from '@/routes/router'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <Router />
    </AppProvider>
  </StrictMode>,
)
MAINEOF

cat > src/routes/router.tsx << 'ROUTEREOF'
import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

const HomePage = lazy(() => import('@/pages/home-page'))

export function Router() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  )
}
ROUTEREOF

cat > src/pages/home-page.tsx << 'HOMEEOF'
import { Helmet } from 'react-helmet-async'

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <main className="flex min-h-screen flex-col items-center justify-center gap-4">
        <h1 className="text-4xl font-bold">Welcome</h1>
        <p className="text-muted-foreground text-lg">
          Built with the Frontend Engineering OS
        </p>
      </main>
    </>
  )
}
HOMEEOF

# ── 6. Set up ESLint + Prettier ───────────────
echo -e "\n${GREEN}[7/8] Setting up ESLint + Prettier + Husky...${NC}"

cat > .prettierrc << 'PRETTIER'
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "all",
  "plugins": ["prettier-plugin-tailwindcss"]
}
PRETTIER

npx husky init 2>/dev/null || true
cat > .husky/pre-commit << 'HUSKYEOF'
npx lint-staged
HUSKYEOF

node -e "
const pkg = require('./package.json')
pkg['lint-staged'] = {
  '*.{ts,tsx}': ['eslint --fix', 'prettier --write'],
  '*.{json,css,md}': ['prettier --write']
}
require('fs').writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n')
" 2>/dev/null || true

# ── 7. Copy architecture files ────────────────
echo -e "\n${GREEN}[8/8] Copying architecture system...${NC}"

cp "$ARCH_DIR/core.md" ./core.md 2>/dev/null || true
cp "$ARCH_DIR/opencode.json" ./opencode.json 2>/dev/null || true
cp "$ARCH_DIR/skills-lock.json" ./skills-lock.json 2>/dev/null || true

for dir in .agent .architecture .rules .templates .workflows .docs .design .scaffolds; do
  if [ -d "$ARCH_DIR/$dir" ]; then
    cp -r "$ARCH_DIR/$dir" "./$dir"
    echo "  ✓ $dir"
  fi
done

# ── 8. Done ──────────────────────────────────
echo -e "\n${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}  Project '$PROJECT' created at:${NC}"
echo -e "${CYAN}    $PROJECT_DIR${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "  Next steps:"
echo "    cd $PROJECT"
echo "    npm run dev"
echo ""
echo "  Architecture docs:"
echo "    core.md          — Central reference"
echo "    .agent/          — AI agent definitions (10 roles)"
echo "    .architecture/   — Architecture docs (15 files)"
echo "    .rules/           — Engineering rules (5 files)"
echo "    .templates/       — Reusable templates (8 files)"
echo "    .workflows/       — Engineering workflows (8 files)"
echo "    .design/          — Taste Skill design system (12 skills)"
echo "    .docs/            — Developer guides"
echo ""
echo "  AI prompt:"
echo "    > Read core.md then load .agent/feature-generator.md."
echo "    > Scaffold a 'billing' feature following .templates/feature/feature-template.md"
echo ""
