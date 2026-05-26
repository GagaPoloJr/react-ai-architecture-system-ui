import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import { AppLayout } from "@layouts/app-layout";

const Loading = () => (
  <div className="min-h-[100dvh] bg-canvas flex items-center justify-center">
    <div className="size-8 rounded-full border-2 border-accent border-t-transparent animate-spin" />
  </div>
);

const HomePage = lazy(() =>
  import("@pages/home-page").then((m) => ({ default: m.HomePage })),
);
const AboutPage = lazy(() =>
  import("@pages/about-page").then((m) => ({ default: m.AboutPage })),
);
const ContactPage = lazy(() =>
  import("@pages/contact-page").then((m) => ({ default: m.ContactPage })),
);
const BlogListPage = lazy(() =>
  import("@pages/blog/blog-list-page").then((m) => ({
    default: m.BlogListPage,
  })),
);
const BlogDetailPage = lazy(() =>
  import("@pages/blog/blog-detail-page").then((m) => ({
    default: m.BlogDetailPage,
  })),
);
const PrivacyPage = lazy(() =>
  import("@pages/privacy-page").then((m) => ({ default: m.PrivacyPage })),
);

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loading />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: "about",
        element: (
          <Suspense fallback={<Loading />}>
            <AboutPage />
          </Suspense>
        ),
      },
      {
        path: "blog",
        element: (
          <Suspense fallback={<Loading />}>
            <BlogListPage />
          </Suspense>
        ),
      },
      {
        path: "blog/:slug",
        element: (
          <Suspense fallback={<Loading />}>
            <BlogDetailPage />
          </Suspense>
        ),
      },
      {
        path: "contact",
        element: (
          <Suspense fallback={<Loading />}>
            <ContactPage />
          </Suspense>
        ),
      },
      {
        path: "privacy",
        element: (
          <Suspense fallback={<Loading />}>
            <PrivacyPage />
          </Suspense>
        ),
      },
    ],
  },
]);
