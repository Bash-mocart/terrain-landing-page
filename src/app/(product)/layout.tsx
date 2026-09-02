import { ProductNav } from "@/components/shell/ProductNav";

// Shell for the product routes. The landing page keeps its own chrome; every
// route in this group shares one header.

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-dvh grid-cols-[minmax(0,1fr)] grid-rows-[auto_1fr] bg-canvas pb-[calc(4.5rem+env(safe-area-inset-bottom))] md:pb-0">
      <ProductNav />
      {children}
    </div>
  );
}
