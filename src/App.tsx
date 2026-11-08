import { Header } from './components/Header';
import { NavDrawer } from './components/NavDrawer';
import { Hero } from './components/Hero';
import { Story } from './components/Story';
import { Menu } from './components/Menu';
import { Feed } from './components/Feed';
import { Visit } from './components/Visit';
import { Footer } from './components/Footer';
import { DirectionsProvider } from './components/DirectionsLink';
import { useDrawer } from './lib/useDrawer';

export function App() {
  const drawer = useDrawer();
  return (
    <DirectionsProvider>
      <a href="#main" className="skip-link">Skip to main content</a>
      <Header drawer={drawer} />
      <NavDrawer drawer={drawer} />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Story />
        <Menu />
        <Feed />
        <Visit />
      </main>
      <Footer />
    </DirectionsProvider>
  );
}
