import { Header } from './components/Header';
import { NavDrawer } from './components/NavDrawer';
import { Hero } from './components/Hero';
import { Facts } from './components/Facts';
import { StepInside } from './components/StepInside';
import { Story } from './components/Story';
import { Words } from './components/Words';
import { Menu } from './components/Menu';
import { Feed } from './components/Feed';
import { Visit } from './components/Visit';
import { ComeIn } from './components/ComeIn';
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
        <Facts />
        <StepInside />
        <Story />
        <Words />
        <Menu />
        <Feed />
        <Visit />
        <ComeIn />
      </main>
      <Footer />
    </DirectionsProvider>
  );
}
