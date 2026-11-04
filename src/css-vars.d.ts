import 'react';

// Lets style props carry CSS custom properties, e.g. style={{ '--i': 2 }}.
declare module 'react' {
  interface CSSProperties {
    [key: `--${string}`]: string | number | undefined;
  }
}
