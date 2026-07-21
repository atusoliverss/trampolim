import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { RibbonStrip } from "../components/ui/RibbonStrip";
import { AuthModal } from "../components/ui/AuthModal";
import { Header } from "../components/sections/Header";
import { Hero } from "../components/sections/Hero";
import { Stats } from "../components/sections/Stats";
import { HowItWorks } from "../components/sections/HowItWorks";
import { DiagnosticQuiz } from "../features/diagnostic/DiagnosticQuiz";
import { Footer } from "../components/sections/Footer";
import { useAuth } from "../features/auth/useAuth";
import { submitDiagnostic } from "../services/api";
import { OpportunityTeaser } from "../components/sections/OpportunityTeaser";

export function Home() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("register");
  const [authContext, setAuthContext] = useState<"diagnostic" | "default">(
    "default",
  );
  const [pendingDiagnostic, setPendingDiagnostic] = useState<{ answers: string[]; perfil: string } | null>(null);

  const requestResults = async (answers: string[], perfil: string) => {
    if (!isAuthenticated) {
      setPendingDiagnostic({ answers, perfil });
      setAuthMode("register");
      setAuthContext("diagnostic");
      setShowAuthModal(true);
    } else {
      try {
        const response = await submitDiagnostic(answers, perfil);
        navigate("/dashboard", { state: { profile: response.perfil } });
      } catch (err) {
        console.error("Falha ao salvar diagnóstico", err);
        navigate("/dashboard");
      }
    }
  };

  const handleOpenLogin = () => {
    setAuthMode("login");
    setAuthContext("default");
    setShowAuthModal(true);
  };

  const handleOpenRegister = () => {
    setAuthMode("register");
    setAuthContext("default");
    setShowAuthModal(true);
  };

  const handleAuthSuccess = async () => {
    setShowAuthModal(false);
    if (pendingDiagnostic) {
      try {
        const response = await submitDiagnostic(pendingDiagnostic.answers, pendingDiagnostic.perfil);
        setPendingDiagnostic(null);
        navigate("/dashboard", { state: { profile: response.perfil } });
      } catch (err) {
        console.error("Falha ao salvar diagnóstico pós-login", err);
        navigate("/dashboard");
      }
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <>
      <RibbonStrip />
      <Header
        onOpenLogin={handleOpenLogin}
        onOpenRegister={handleOpenRegister}
      />
      <main>
        <Hero />
        <Stats />
        <HowItWorks />
        <section id="diagnostico" className="py-20 px-[6vw]">
          <div className="max-w-4xl mx-auto">
            <DiagnosticQuiz onResultsRequested={requestResults} />
          </div>
        </section>
        <OpportunityTeaser
          isAuthenticated={isAuthenticated}
          onUnlock={handleOpenRegister}
        />
      </main>
      <Footer />
      {showAuthModal && (
        <AuthModal
          initialMode={authMode}
          context={authContext}
          onClose={() => setShowAuthModal(false)}
          onSuccess={handleAuthSuccess}
        />
      )}
    </>
  );
}
