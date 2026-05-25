# Mocking Strategy

## How It Works

The project uses an **Axios request interceptor-based mock system** — not MSW. In dev mode, the shared client registers a request interceptor that intercepts every outgoing HTTP request and returns mock data instead of hitting a real server.

```
Client → Axios → Request Interceptor → Mock Handler → Mock Response
                (setupMockInterceptor)  (handleRequest)
```

## File Locations

| File | Purpose |
|------|---------|
| `src/mocks/interceptor.ts` | Axios request interceptor + all mock endpoint handlers |
| `src/mocks/mock-data.ts` | Initial seed data for all entities (menu, orders, tables, payments) |

## How to Add a New Mock Endpoint

1. Add your endpoint handler inside `handleRequest()` in `interceptor.ts`:

```ts
async function handleRequest(method, path, params, body) {
  // Existing handlers...

  if (method === 'get' && path === '/your-entity') {
    let filtered = [..._yourData]
    if (params.status) filtered = filtered.filter((e) => e.status === params.status)
    return { data: filtered, status: 200, statusText: 'OK', headers: {}, config: {} as never }
  }

  if (method === 'post' && path === '/your-entity') {
    const newItem = { id: generateId(), ...body, createdAt: new Date().toISOString() }
    _yourData.unshift(newItem)
    return { data: newItem, status: 201, statusText: 'Created', headers: {}, config: {} as never }
  }

  return null // passthrough to real server
}
```

2. Add initial seed data in `mock-data.ts` (if needed for the new entity).

3. Create the corresponding API module following the template pattern in `features/{name}/api/`.

## Params Handling

The interceptor reads query parameters from both `config.params` (Axios params object) and the raw URL query string, merged together. This means both `client.get('/menu', { params: { category: 'food' } })` and `client.get('/menu?category=food')` work.

```ts
const queryParams = { ...urlParams, ...config.params } as Record<string, string>
```

All param values are strings — handle type coercion in your handler (e.g. `params.isAvailable === 'true'`).

## Stateful Behavior

Mock data is **mutable** during the session:
- Creating an item prepends to the mock array
- Updating patches in place
- Deleting splices from the array
- Creating an order also updates the table's status to `occupied`
- Creating a payment also updates the order's status to `paid`

Each dev server restart resets to the seed data in `mock-data.ts`.

## Swapping to a Real Backend

To connect to a real API:

1. Remove the two lines that register the mock interceptor in `src/shared/api/client.ts`:

```ts
// Delete or comment these:
if (import.meta.env.DEV) {
  setupMockInterceptor(client)
}
```

2. Set `VITE_API_URL` in `.env` to point at your backend:

```
VITE_API_URL=https://api.example.com
```

3. Restart the dev server. All `{name}-api.ts` service functions will now hit the real endpoint. No other code changes needed — the API layer structure stays identical.
