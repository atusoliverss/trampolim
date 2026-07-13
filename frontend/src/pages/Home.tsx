import { RibbonStrip } from '../components/ui/RibbonStrip';
import { Header } from '../components/sections/Header';
import { Hero } from '../components/sections/Hero';
import { Stats } from '../components/sections/Stats';
import { HowItWorks } from '../components/sections/HowItWorks';
import { DiagnosticQuiz } from '../features/diagnostic/DiagnosticQuiz';
import { JobsList } from '../components/sections/JobsList';
import { Footer } from '../components/sections/Footer';

export function Home() {
  return (
    <>
      <RibbonStrip />
      <Header />
      <main>
        <Hero />
        <Stats />
        <HowItWorks />
        <DiagnosticQuiz />
        <JobsList />
      </main>
      <Footer />
    </>
  );
}
