// A button label that rolls up on hover to a copy of itself. The copy is drawn by CSS from data-label, so
// it is never read out twice.
export function Roll({ children }: { children: string }) {
  return (
    <span className="roll" data-label={children}>
      <span>{children}</span>
    </span>
  );
}
