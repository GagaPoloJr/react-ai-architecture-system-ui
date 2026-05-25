import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { PosLayout } from "@layouts/pos-layout";
import { RouteErrorFallback } from "./error-fallback";

const PosPage = lazy(() => import("@pages/pos-page"));
const MenuPage = lazy(() => import("@pages/menu-page"));
const OrdersPage = lazy(() => import("@pages/orders-page"));
const KitchenPage = lazy(() => import("@pages/kitchen-page"));
const PaymentsPage = lazy(() => import("@pages/payments-page"));

function SuspenseWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[100dvh] items-center justify-center">
          Loading...
        </div>
      }
    >
      {children}
    </Suspense>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/pos" replace />,
  },
  {
    path: "/pos",
    element: <PosLayout />,
    errorElement: <RouteErrorFallback />,
    children: [
      {
        index: true,
        element: (
          <SuspenseWrapper>
            <PosPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: "menu",
        element: (
          <SuspenseWrapper>
            <MenuPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: "orders",
        element: (
          <SuspenseWrapper>
            <OrdersPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: "kitchen",
        element: (
          <SuspenseWrapper>
            <KitchenPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: "payments",
        element: (
          <SuspenseWrapper>
            <PaymentsPage />
          </SuspenseWrapper>
        ),
      },
    ],
  },
]);
