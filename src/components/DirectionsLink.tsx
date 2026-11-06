import { createContext, useContext, useEffect, useState, type ComponentProps, type ReactNode } from 'react';
import { mapQuery } from '../lib/content';
import { directionsLinks, prefersAppleMaps } from '../lib/directions';

// The page is rendered with the Google link (right for every non-Apple device, and with JavaScript
// off). On an Apple device the provider flips once after mount, and every Directions link opens Apple
// Maps instead.
const AppleFirst = createContext(false);

export function DirectionsProvider({ children }: { children: ReactNode }) {
  const [apple, setApple] = useState(false);
  useEffect(() => {
    setApple(prefersAppleMaps(navigator.userAgent, navigator.platform, navigator.maxTouchPoints));
  }, []);
  return <AppleFirst.Provider value={apple}>{children}</AppleFirst.Provider>;
}

export const useMapLinks = () => directionsLinks(mapQuery, useContext(AppleFirst));

type AnchorProps = Omit<ComponentProps<'a'>, 'href' | 'rel' | 'target'>;

export function DirectionsLink(props: AnchorProps) {
  const { primary } = useMapLinks();
  return <a {...props} href={primary.url} rel="noopener noreferrer" target="_blank" />;
}
