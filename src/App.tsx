import { Header } from './components/Header';
import { NavDrawer } from './components/NavDrawer';
import { Hero } from './components/Hero';
import { Truths } from './components/Truths';
import { Story } from './components/Story';
import { Menu } from './components/Menu';
import { Feed } from './components/Feed';
import { VisitDesktop } from './components/VisitDesktop';
import { FooterDesktop } from './components/FooterDesktop';
import { FooterMobile } from './components/FooterMobile';
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
        <Truths />
        <Story />
        <Menu />
        <Feed />
        <VisitDesktop />
      </main>
      <FooterDesktop />
      <FooterMobile />
    </DirectionsProvider>
  );
}
