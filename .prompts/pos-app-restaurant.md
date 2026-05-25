# Prompt: POS App Restaurant

> Copy-paste this entire prompt to your AI agent (Claude Code, Gemini CLI, Cursor, opencode).
> The AI will read `core.md` + all referenced files for full context.

---

Read `core.md`. Then load all these files for context:

- `.agent/frontend-architect.md`
- `.agent/feature-generator.md`
- `.agent/ui-engineer.md`
- `.agent/api-integrator.md`
- `.agent/form-engineer.md`
- `.agent/state-manager.md`
- `.agent/animation-engineer.md`
- `.architecture/folder-structure.md`
- `.architecture/state-management.md`
- `.architecture/api-layer.md`
- `.architecture/form-architecture.md`
- `.architecture/routing.md`
- `.architecture/ui-hierarchy.md`
- `.architecture/validation.md`
- `.templates/feature/feature-template.md`
- `.templates/component/component-template.md`
- `.templates/hook/hook-template.md`
- `.templates/api/api-template.md`
- `.templates/form/form-template.md`
- `.templates/state/state-template.md`
- `.templates/page/page-template.md`
- `.workflows/feature-planning.md`
- `.workflows/api-integration.md`
- `.workflows/state-decision-tree.md`
- `.rules/scalability.md`
- `.rules/feature-isolation.md`
- `.rules/reusability.md`
- `.design/design-taste-frontend/SKILL.md`

---

## Project: Restaurant POS

Build a Point of Sale web app for a restaurant. The app is already bootstrapped — all dependencies installed, directory structure ready, all architecture files present.

---

## 1. Feature Scaffolding

Run these commands one by one:

```bash
bash .scaffolds/feature-scaffold.sh menu
bash .scaffolds/feature-scaffold.sh orders
bash .scaffolds/feature-scaffold.sh tables
bash .scaffolds/feature-scaffold.sh payments
bash .scaffolds/feature-scaffold.sh kitchen
```

---

## 2. Feature Definitions

### 2a. Menu Feature (`src/features/menu/`)

**types/index.ts** — define:
- `MenuItem` — id, name, description, price (number), category (food | beverage | snack), imageUrl (string | null), isAvailable (boolean), createdAt
- `CreateMenuItemDto` — name, description, price, category, imageUrl?, isAvailable
- `MenuItemFilters` — category?, isAvailable?, search?

**schemas/index.ts** — define:
- `menuItemSchema` — zod validation: name min 2 chars required, price positive number, category enum food/beverage/snack

**api/index.ts** — create with:
- GET `/menu` (list, with filters)
- GET `/menu/:id` (detail)
- POST `/menu` (create)
- PATCH `/menu/:id` (update)
- DELETE `/menu/:id` (remove)

**hooks/index.ts** — create:
- `useMenuList(filters?)` — query with staleTime: 1 minute
- `useMenuItemDetail(id)` — query, enabled only when id exists
- `useCreateMenuItem` — mutation, invalidates menu list on success
- `useUpdateMenuItem` — mutation
- `useDeleteMenuItem` — mutation

**components/** — create:
- `menu-grid.tsx` — grid display of menu items with image, name, price, category badge (component: `MenuGrid`)
- `menu-item-card.tsx` — single card with add-to-order button, stock indicator (component: `MenuItemCard`)
- `menu-filter-bar.tsx` — filter by category, search input (component: `MenuFilterBar`)
- `menu-form-dialog.tsx` — modal form for add/edit menu item using RHF + zod (component: `MenuFormDialog`)

### 2b. Orders Feature (`src/features/orders/`)

**types/index.ts** — define:
- `OrderItem` — menuItemId, name, price, quantity, notes?
- `Order` — id, tableId, items (OrderItem[]), status (pending | preparing | served | paid), total, createdAt
- `CreateOrderDto` — tableId, items
- `OrderFilters` — status?, tableId?, date?

**schemas/index.ts** — define:
- `orderItemSchema` — menuItemId required, quantity min 1, notes optional
- `orderSchema` — tableId required, items array min 1 item

**api/index.ts** — CRUD + status update PATCH `/orders/:id/status`

**hooks/index.ts** — useOrderList, useOrderDetail, useCreateOrder, useUpdateOrderStatus

**components/** — create:
- `active-orders-board.tsx` — kanban-style columns by status (component: `ActiveOrdersBoard`)
- `order-card.tsx` — compact order card with items, total, time, action buttons (component: `OrderCard`)
- `order-detail-drawer.tsx` — slide-out drawer with full order details (component: `OrderDetailDrawer`)
- `new-order-modal.tsx` — create order: select table, add items from menu, set quantities (component: `NewOrderModal`)

### 2c. Tables Feature (`src/features/tables/`)

**types/index.ts** — define:
- `Table` — id, number, capacity, status (available | occupied | reserved)
- `TableFilters` — status?

**api/index.ts** — GET `/tables`, PATCH `/tables/:id/status`

**hooks/index.ts** — useTableList, useUpdateTableStatus

**components/** — create:
- `table-grid.tsx` — visual grid of tables with status colors, capacity indicator (component: `TableGrid`)
- `table-card.tsx` — single table: number, capacity, status, click to view orders (component: `TableCard`)

### 2d. Payments Feature (`src/features/payments/`)

**types/index.ts** — define:
- `Payment` — id, orderId, amount, method (cash | card | qris), status, paidAt
- `CreatePaymentDto` — orderId, amount, method

**schemas/index.ts** — payment method enum validation

**api/index.ts** — POST `/payments`, GET `/payments/order/:orderId`

**hooks/index.ts** — useCreatePayment, usePaymentByOrder

**components/** — create:
- `payment-modal.tsx` — payment method selection, amount display, confirmation (component: `PaymentModal`)
- `payment-receipt.tsx` — printable receipt summary (component: `PaymentReceipt`)

### 2e. Kitchen Feature (`src/features/kitchen/`)

**types/index.ts** — define:
- `KitchenOrder` — id, tableNumber, items, status, createdAt, notes
- `KitchenFilters` — status?, date?

**components/** — create:
- `kitchen-display.tsx` — large screen display showing pending/preparing orders (component: `KitchenDisplay`)
- `kitchen-order-card.tsx` — large card with item list, timer, action buttons (component: `KitchenOrderCard`)
- `kitchen-header.tsx` — current time, order count stats (component: `KitchenHeader`)

---

## 3. Shared Components

Create these in `src/shared/ui/`:

Run:
```bash
bash .scaffolds/component-scaffold.sh StatusBadge shared/ui
bash .scaffolds/component-scaffold.sh SearchInput shared/ui
bash .scaffolds/component-scaffold.sh ConfirmDialog shared/ui
```

Then implement each:
- `StatusBadge` — colored pill for order/table status with CVA variants (pending=amber, preparing=blue, served=green, paid=gray)
- `SearchInput` — lucide-react Search icon, debounced onChange via custom hook
- `ConfirmDialog` — Radix AlertDialog wrapper for delete/confirm actions

---

## 4. Shared Store (Zustand)

Create `src/stores/order-store.ts`:

- `activeOrderItems` — items currently being added to a new order (before submit)
- `selectedTableId` — currently selected table
- `addItem(item)`, `removeItem(menuItemId)`, `updateQuantity(menuItemId, qty)`, `clearOrder()`

Use zustand v5 with `create` + `devtools` middleware.

---

## 5. Routing

Create `src/routes/index.tsx` with react-router-dom v7 `createBrowserRouter`:

| Path | Page | Auth? |
|------|------|-------|
| `/` | Redirect to `/pos` | - |
| `/pos` | POS main screen (tables + order panel) | No |
| `/pos/menu` | Menu management page | No |
| `/pos/orders` | Active orders board | No |
| `/pos/kitchen` | Kitchen display screen | No |
| `/pos/payments` | Payment history | No |

Use `lazy()` for every route. Wrap inside `src/pages/`:
- `pos-page.tsx` — main POS layout with table grid + order sidebar
- `menu-page.tsx` — menu management
- `orders-page.tsx` — orders board
- `kitchen-page.tsx` — kitchen display
- `payments-page.tsx` — payment history

---

## 6. App Layout

Create `src/layouts/pos-layout.tsx`:

- Top navbar: logo, nav links (Menu, Orders, Kitchen, Payments), clock
- Sidebar: table status overview (compact)
- Main content area with `<Outlet />`
- Responsive: sidebar collapses on mobile

---

## 7. Design System — Taste Skill

Follow the `design-taste-frontend` skill with these dials:

```
DESIGN_VARIANCE: 6
MOTION_INTENSITY: 4
VISUAL_DENSITY: 5
```

### Anti-Slop Rules (REQUIRED)
- **NO** 3-column equal card grids — use asymmetric bento layout
- **NO** centered hero/H1 sections — left-align content
- **NO** Inter font — use `Geist` or `Satoshi` (via `@fontsource-variable/inter` as fallback)
- **NO** pure black (`#000000`) — use off-black, zinc-950
- **NO** neon glows or gradient text
- **NO** emojis anywhere in code or text — use lucide-react icons instead
- **NO** "Acme", "Nexus", "Demo" or generic startup names
- **NO** generic SVG egg avatars
- **NO** "John Doe", fake phone numbers, or `99.99%` fake data
- **NO** `h-screen` — always use `min-h-[100dvh]`
- **NO** flexbox percentage math (`w-[calc(33%-1rem)]`) — use CSS Grid
- **NO** Unsplash placeholder images — use colored gradient placeholders or `https://placehold.co`

### UI Style: Bright & Clean
- **Primary palette**: Bright teal/emerald (`#0d9488` or `#059669`) + warm amber (`#d97706`) for accents
- **Background**: Warm white (`#fafaf9` or `#f8fafc`) — not pure white
- **Cards**: White (`#ffffff`) with subtle shadow `shadow-[0_1px_3px_rgba(0,0,0,0.06)]`
- **Typography**: Dark slate (`#0f172a` / zinc-900) for headings, slate-600 for body
- **Status colors**: Pending=amber, Preparing=blue, Served=green, Paid=gray
- **Spacing**: Generous — `p-6` cards, `gap-4` grids, `space-y-8` sections
- **Border radius**: `rounded-xl` for cards, `rounded-lg` for buttons/inputs
- **Table occupied**: subtle red/amber border, **Available**: green border

---

## 8. POS Main Page (`src/pages/pos-page.tsx`)

This is the core screen. Layout:

```
┌──────────────────────────────────────────────────────┐
│  Header: Logo | Nav tabs | Clock           │
├──────────────────────┬───────────────────────────────┤
│  Table Grid          │  Order Panel (side drawer)    │
│  ┌──┐ ┌──┐ ┌──┐     │  ┌─────────────────────────┐  │
│  │T1│ │T2│ │T3│     │  │ Table #5                │  │
│  └──┘ └──┘ └──┘     │  ├─────────────────────────┤  │
│  ┌──┐ ┌──┐ ┌──┐     │  │ Item    Qty  Price      │  │
│  │T4│ │T5│ │T6│     │  │ Nasi G. 2   Rp 30k     │  │
│  └──┘ └──┘ └──┘     │  │ Es Teh  1   Rp 5k      │  │
│                      │  ├─────────────────────────┤  │
│                      │  │ Total:         Rp 35k   │  │
│                      │  ├─────────────────────────┤  │
│                      │  │ [Add Item] [Pay] [Send] │  │
│                      └──────────────────────────┘  │
├──────────────────────┴───────────────────────────────┤
│  Footer: Order count | Total revenue today           │
└──────────────────────────────────────────────────────┘
```

### States to handle:
- **Loading**: Skeleton placeholders for table grid, shimmer effect
- **Empty**: "No tables configured" with add button for tables
- **Error**: "Failed to load tables" with retry button (sonner toast on error)
- **Edge cases**: 
  - Clicking occupied table shows existing order
  - Clicking available table starts new order flow
  - Adding item to order opens menu item selector modal
  - Pay button opens payment modal
  - Send to kitchen sends order items to kitchen display

---

## 9. Implementation Order

Build features in this exact sequence:

1. **Shared components** — StatusBadge, SearchInput, ConfirmDialog
2. **Zustand store** — order-store with active items
3. **Tables feature** — list, status grid
4. **Menu feature** — CRUD, categories, grid display
5. **Orders feature** — create, list, status management
6. **POS page** — combine tables + menu + orders into main screen
7. **Payments feature** — simple payment flow
8. **Kitchen feature** — read-only display for kitchen
9. **Layout + Routing** — wire everything together

---

## 10. Coding Standards

- **NO** `React.FC` — always `function ComponentName()`
- **NO** default exports — use named exports always
- All files = kebab-case (e.g., `menu-item-card.tsx`)
- All functions/components = PascalCase or camelCase
- Imports: `@/` alias for `src/`, `@features/menu`, `@shared/ui/button`
- TanStack Query v5 object syntax (`queryKey`, `queryFn`)
- Zustand v5 `create()` + `devtools` middleware
- RHF v7 + `@hookform/resolvers/zod`
- Tailwind v4 classes (no `@apply`, no style objects)
- `cn()` utility from `@shared/utils/cn` for class merging
- sonner `toast.success()` / `toast.error()` for user notifications
- lucide-react icons only — no emojis

---

Generate all files in order. After each feature, wait for confirmation before proceeding to the next.
