import { Header } from './components/Header';
import { NavDrawer } from './components/NavDrawer';
import { Hero } from './components/Hero';
import { Story } from './components/Story';
import { Words } from './components/Words';
import { Menu } from './components/Menu';
import { Feed } from './components/Feed';
import { Visit } from './components/Visit';
import { ComeIn } from './components/ComeIn';
import { Footer } from './components/Footer';
import { DirectionsProvider } from './components/DirectionsLink';
import { useDrawer } from './lib/useDrawer';
import { useMagnets } from './lib/useMagnets';

export function App() {
  const drawer = useDrawer();
  useMagnets();
  return (
    <DirectionsProvider>
      <a href="#main" className="skip-link">Skip to main content</a>
      <Header drawer={drawer} />
      <NavDrawer drawer={drawer} />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Words />
        <Story />
        <Menu />
        <Feed />
        <Visit />
        <ComeIn />
      </main>
      <Footer />
    </DirectionsProvider>
  );
}
