import { hours } from './content';
import { useOpenState } from './useOpenState';

const PRINTED = 'Open daily ' + hours.groups[0]?.open + ' — ' + hours.groups[0]?.close;

// What the open-now chip shows: the printed hours until the page is live, then the real state.
// `dot` is the dot colour (green open, grey closed), or `printedDot` while there is no state.
export function useOpenChip(printedDot?: string) {
  const state = useOpenState();
  if (!state || !state.label) return { label: PRINTED, dot: printedDot };
  return { label: state.label, dot: state.open ? '#15803D' : '#6B7A90' };
}
