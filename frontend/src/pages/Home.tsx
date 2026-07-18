import { useEffect, useState } from "react";

import { RibbonStrip } from "../components/ui/RibbonStrip";
import { DetailsModal } from "../components/ui/DetailsModal";
import { AuthModal } from "../components/ui/AuthModal";
import { Header } from "../components/sections/Header";
import { Hero } from "../components/sections/Hero";
import { Stats } from "../components/sections/Stats";
import { HowItWorks } from "../components/sections/HowItWorks";
import { DiagnosticQuiz } from "../features/diagnostic/DiagnosticQuiz";
import { CoursesList } from "../components/sections/CoursesList";
import { JobsList } from "../components/sections/JobsList";
import { Footer } from "../components/sections/Footer";
import {
  getCourses,
  getJobs,
  type Course,
  type Job,
} from "../services/catalog";
import { useAuth } from "../features/auth/useAuth";
import { OpportunityTeaser } from "../components/sections/OpportunityTeaser";

export function Home() {
  const { isAuthenticated } = useAuth();

  const [showResults, setShowResults] = useState(false);

  const [courses, setCourses] = useState<Course[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [coursesError, setCoursesError] = useState("");
  const [jobsError, setJobsError] = useState("");
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [loadingJobs, setLoadingJobs] = useState(false);
  const [selected, setSelected] = useState<Course | Job | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("register");
  const [authContext, setAuthContext] = useState<"diagnostic" | "default">(
    "default",
  );

  const requestResults = () => {
    if (!isAuthenticated) {
      setAuthMode("register");
      setAuthContext("diagnostic");
      setShowAuthModal(true);
    } else {
      setShowResults(true);
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

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    setShowResults(true);
  };

  useEffect(() => {
    if (!isAuthenticated || !showResults) return;
    setLoadingCourses(true);
    setLoadingJobs(true);
    getCourses()
      .then(setCourses)
      .catch((error: Error) => setCoursesError(error.message))
      .finally(() => setLoadingCourses(false));
    getJobs()
      .then(setJobs)
      .catch((error: Error) => setJobsError(error.message))
      .finally(() => setLoadingJobs(false));
    window.setTimeout(
      () =>
        document
          .getElementById("cursos")
          ?.scrollIntoView({ behavior: "smooth" }),
      0,
    );
  }, [isAuthenticated, showResults]);

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
        <DiagnosticQuiz onResultsRequested={requestResults} />
        {showResults && isAuthenticated && (
          <>
            <CoursesList
              courses={courses}
              loading={loadingCourses}
              error={coursesError}
              onSelect={setSelected}
            />
            <JobsList
              jobs={jobs}
              loading={loadingJobs}
              error={jobsError}
              onSelect={setSelected}
            />
          </>
        )}
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
      <DetailsModal
        item={selected}
        type={selected && "workload" in selected ? "course" : "job"}
        onClose={() => setSelected(null)}
      />
    </>
  );
}
