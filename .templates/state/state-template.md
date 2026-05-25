# State Module Template

## Store Pattern (Zustand v5)

```
stores/{{storeName}}/
├── {{store-name}}.store.ts      # Zustand store definition (create from 'zustand')
├── {{store-name}}.selectors.ts  # Selector hooks
├── {{store-name}}.test.ts       # Store tests
└── index.ts
```

## Store Structure (with devtools middleware)

```ts
// {{store-name}}.store.ts
import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';

interface {{StoreName}}State {
  // Data
  items: {{ItemType}}[];
  selectedId: string | null;

  // Status
  isOpen: boolean;
  isLoading: boolean;

  // Actions
  setItems: (items: {{ItemType}}[]) => void;
  select: (id: string | null) => void;
  toggle: () => void;
  reset: () => void;
}
```

## Store Implementation

```ts
export const use{{StoreName}}Store = create<{{StoreName}}State>()(
  devtools(
    (set) => ({
      // Initial state
      items: [],
      selectedId: null,
      isOpen: false,
      isLoading: false,

      // Actions
      setItems: (items) => set({ items, isLoading: false }),

      select: (id) => set({ selectedId: id }),

      toggle: () => set((state) => ({ isOpen: !state.isOpen })),

      reset: () => set({
        items: [],
        selectedId: null,
        isOpen: false,
        isLoading: false,
      }),
    }),
    { name: '{{StoreName}}Store' },
  ),
);
```

## With Persist Middleware

```ts
export const use{{StoreName}}Store = create<{{StoreName}}State>()(
  devtools(
    persist(
      (set) => ({
        items: [],
        selectedId: null,
        isOpen: false,
        isLoading: false,

        setItems: (items) => set({ items, isLoading: false }),
        select: (id) => set({ selectedId: id }),
        toggle: () => set((state) => ({ isOpen: !state.isOpen })),
        reset: () => set({
          items: [],
          selectedId: null,
          isOpen: false,
          isLoading: false,
        }),
      }),
      {
        name: '{{storeName}}-storage',
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          items: state.items,
          selectedId: state.selectedId,
        }),
        version: 1,
      },
    ),
    { name: '{{StoreName}}Store' },
  ),
);
```

## Selector Patterns

```ts
// {{store-name}}.selectors.ts
import { use{{StoreName}}Store } from './{{store-name}}.store';

// Primitive selectors — prevent unnecessary re-renders
export const use{{StoreName}}Items = () =>
  use{{StoreName}}Store((state) => state.items);

export const use{{StoreName}}SelectedId = () =>
  use{{StoreName}}Store((state) => state.selectedId);

export const useIs{{StoreName}}Open = () =>
  use{{StoreName}}Store((state) => state.isOpen);

// Derived selectors
export const useSelectedItem = () =>
  use{{StoreName}}Store((state) =>
    state.items.find((item) => item.id === state.selectedId) ?? null,
  );
```

- **Always create selector hooks** — never access store directly in components.
- Select the minimum required slice to avoid unnecessary re-renders.
- Derive computed values inside selectors, not in components.

## Middleware Reference

| Middleware | Import | Purpose |
|------------|--------|---------|
| `devtools` | `import { devtools } from 'zustand/middleware'` | Redux DevTools debugging (always include) |
| `persist` | `import { persist, createJSONStorage } from 'zustand/middleware'` | Persist to localStorage / AsyncStorage |
| `subscribeWithSelector` | `import { subscribeWithSelector } from 'zustand/middleware'` | Selective subscriptions outside React |

## Testing State

```ts
// {{store-name}}.test.ts
import { use{{StoreName}}Store } from './{{store-name}}.store';

describe('{{StoreName}}Store', () => {
  beforeEach(() => {
    use{{StoreName}}Store.setState({
      items: [],
      selectedId: null,
      isOpen: false,
      isLoading: false,
    });
  });

  it('should select an item', () => {
    use{{StoreName}}Store.getState().select('id-1');
    expect(use{{StoreName}}Store.getState().selectedId).toBe('id-1');
  });

  it('should derive selected item', () => {
    const item = { id: '1', name: 'Test' };
    use{{StoreName}}Store.setState({ items: [item], selectedId: '1' });
    const selected = use{{StoreName}}Store.getState().items.find((i) => i.id === '1');
    expect(selected).toEqual(item);
  });
});
```

## Zustand + TanStack Query

When server state is involved, prefer TanStack Query over Zustand. Use Zustand only for **client-only** UI state (modals, toggles, multi-step form progress, etc.).
