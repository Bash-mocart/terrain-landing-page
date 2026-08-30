import { ExploreLoadingIndicator } from "@/components/explore/ExploreLoadingIndicator";

export default function ExploreLoading() {
  return (
    <section className="relative min-h-[65vh] overflow-hidden bg-border-rule">
      <ExploreLoadingIndicator />
    </section>
  );
}
