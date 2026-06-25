import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — The Artistry Haven",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-blush-50 font-body">
      {children}
    </div>
  );
}
