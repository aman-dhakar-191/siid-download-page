import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { DownloadSection } from './components/DownloadSection';
import { VersionHistory } from './components/VersionHistory';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <DownloadSection />
      <VersionHistory />
      <Footer />
    </div>
  );
}

export default App;
