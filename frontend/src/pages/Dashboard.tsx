import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Header } from "../components/sections/Header";
import { Footer } from "../components/sections/Footer";
import { ResultsDashboard } from "../features/diagnostic/ResultsDashboard";
import { CoursesList } from "../components/sections/CoursesList";
import { JobsList } from "../components/sections/JobsList";
import { DetailsModal } from "../components/ui/DetailsModal";
import { getCourses, getJobs, type Course, type Job } from "../services/catalog";
import { useAuth } from "../features/auth/useAuth";

export function Dashboard() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [userProfile] = useState<string | null>(location.state?.profile || null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [coursesError, setCoursesError] = useState("");
  const [jobsError, setJobsError] = useState("");
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [loadingJobs, setLoadingJobs] = useState(false);
  const [selected, setSelected] = useState<Course | Job | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
      return;
    }

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
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Meu Painel</h1>
          {userProfile && (
             <div className="mb-12">
               <ResultsDashboard profile={userProfile} onRetake={() => navigate("/")} />
             </div>
          )}
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
        </div>
      </main>
      <Footer />
      <DetailsModal
        item={selected}
        type={selected && "workload" in selected ? "course" : "job"}
        onClose={() => setSelected(null)}
      />
    </>
  );
}
