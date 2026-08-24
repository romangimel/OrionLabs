/** Minimal accessible fallback shown only while a secondary route chunk arrives. */
export function RouteLoadingFallback() {
  return (
    <main className="flex min-h-[100svh] items-center justify-center bg-[hsl(262_48%_6%)]">
      <div role="status" aria-live="polite">
        <span
          aria-hidden="true"
          className="block h-2 w-2 animate-pulse rounded-full bg-[hsl(43_74%_66%)] shadow-[0_0_18px_hsl(43_74%_66%_/_0.55)] motion-reduce:animate-none"
        />
        <span className="sr-only">Loading page</span>
      </div>
    </main>
  );
}
