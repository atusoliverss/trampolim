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

    <main className="min-h-screen pt-20 bg-[#F7F3EA]">

      {/* HERO */}

      <section className="relative overflow-hidden">

        <div className="absolute inset-0 pointer-events-none">

          <div className="absolute -top-40 right-0 w-[420px] h-[420px] rounded-full bg-yellow-200/30 blur-3xl" />

          <div className="absolute bottom-0 left-0 w-[420px] h-[420px] rounded-full bg-red-200/20 blur-3xl" />

        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-14">

          <div className="rounded-[36px] bg-gradient-to-r from-brand-blue via-brand-green to-brand-blue text-white p-10 shadow-2xl">

            <span className="inline-flex rounded-full bg-white/20 px-4 py-2 text-sm font-bold">

              Painel Inteligente

            </span>

            <h1 className="font-serif text-5xl font-black mt-6">

              Bem-vindo de volta 👋

            </h1>

            <p className="mt-5 max-w-2xl text-lg opacity-90">

              Continue sua jornada profissional.
              Acompanhe sua evolução, descubra novos cursos
              e encontre vagas compatíveis com seu perfil.

            </p>

          </div>

        </div>

      </section>

      <div className="max-w-7xl mx-auto px-6 pb-20">

        {/* KPI */}

        <section className="grid lg:grid-cols-4 gap-6 mb-12">

          <div className="rounded-3xl bg-white p-8 shadow border">

            <div className="text-5xl font-black text-brand-green">

              94%

            </div>

            <p className="mt-3 text-slate-500">

              Empregabilidade

            </p>

          </div>

          <div className="rounded-3xl bg-white p-8 shadow border">

            <div className="text-5xl font-black text-brand-yellow">

              {courses.length}

            </div>

            <p className="mt-3 text-slate-500">

              Cursos

            </p>

          </div>

          <div className="rounded-3xl bg-white p-8 shadow border">

            <div className="text-5xl font-black text-brand-red">

              {jobs.length}

            </div>

            <p className="mt-3 text-slate-500">

              Vagas

            </p>

          </div>

          <div className="rounded-3xl bg-white p-8 shadow border">

            <div className="text-5xl font-black text-brand-blue">

              IA

            </div>

            <p className="mt-3 text-slate-500">

              Perfil analisado

            </p>

          </div>

        </section>

        {/* RESULTADO */}

        {userProfile && (

          <section className="mb-14">

            <ResultsDashboard
              profile={userProfile}
              onRetake={() => navigate("/")}
            />

          </section>

        )}

        {/* GRID */}

        <section className="grid xl:grid-cols-5 gap-8">

          {/* CURSOS */}

          <div className="xl:col-span-2">

            <div className="bg-white rounded-[32px] border shadow-xl p-8">

              <div className="flex items-center justify-between mb-8">

                <div>

                  <span className="text-sm uppercase tracking-widest text-brand-green font-bold">

                    Qualificação

                  </span>

                  <h2 className="font-serif text-3xl font-black mt-2">

                    Cursos Recomendados

                  </h2>

                </div>

              </div>

              <CoursesList
                courses={courses}
                loading={loadingCourses}
                error={coursesError}
                onSelect={setSelected}
              />

            </div>

          </div>

          {/* VAGAS */}

          <div className="xl:col-span-3">

            <div className="bg-white rounded-[32px] border shadow-xl p-8">

              <div className="flex items-center justify-between mb-8">

                <div>

                  <span className="text-sm uppercase tracking-widest text-brand-red font-bold">

                    Oportunidades

                  </span>

                  <h2 className="font-serif text-3xl font-black mt-2">

                    Vagas Compatíveis

                  </h2>

                </div>

              </div>

              <JobsList
                jobs={jobs}
                loading={loadingJobs}
                error={jobsError}
                onSelect={setSelected}
              />

            </div>

          </div>

        </section>

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
