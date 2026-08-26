import { ProductNav } from "@/components/shell/ProductNav";

// Shell for the product routes. The landing page keeps its own chrome; every
// route in this group shares one header.

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-canvas">
      <ProductNav />
      {children}
    </div>
  );
}
