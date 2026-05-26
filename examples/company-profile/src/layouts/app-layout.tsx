import { Outlet } from "react-router-dom";
import { SiteHeader } from "./components/site-header";
import { SiteFooter } from "./components/site-footer";
import { useScrollToTop } from "@shared/hooks";

export function AppLayout() {
  useScrollToTop()

  return (
    <div className="min-h-[100dvh] bg-canvas text-text-primary antialiased selection:bg-accent/20">
      <SiteHeader />

      <main>
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}
