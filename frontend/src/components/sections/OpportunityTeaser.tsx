import {
  LockIcon,
  BriefcaseIcon,
  GraduationCapIcon,
  ArrowRightIcon,
  SparklesIcon,
  MapPinIcon,
  WalletIcon,
} from "lucide-react";

interface OpportunityTeaserProps {
  isAuthenticated: boolean;
  onUnlock: () => void;
}

const jobs = [
  {
    title: "Operador de Caixa",
    company: "Mercado Bom Preço",
    location: "Irecê • BA",
    salary: "R$ 1.820",
    match: "94%",
  },
  {
    title: "Atendente",
    company: "Farmácia Extra Forte",
    location: "Irecê • BA",
    salary: "R$ 1.680",
    match: "91%",
  },
  {
    title: "Auxiliar Administrativo",
    company: "Grupo Líder",
    location: "Irecê • BA",
    salary: "R$ 2.150",
    match: "88%",
  },
];

const courses = [
  {
    title: "Excel Básico",
    provider: "Fundação Bradesco",
    duration: "20 horas",
  },
  {
    title: "Atendimento ao Cliente",
    provider: "SEBRAE",
    duration: "15 horas",
  },
  {
    title: "Operador de Caixa",
    provider: "SENAI",
    duration: "40 horas",
  },
];

export function OpportunityTeaser({
  isAuthenticated,
  onUnlock,
}: OpportunityTeaserProps) {
  return (
    <section className="relative py-28 bg-[#F7F3EA] overflow-hidden">

      <div className="absolute inset-0 pointer-events-none">

        <div className="absolute -top-20 right-0 w-96 h-96 rounded-full bg-yellow-200/30 blur-3xl"/>

        <div className="absolute bottom-0 left-0 w-[420px] h-[420px] rounded-full bg-red-200/20 blur-3xl"/>

      </div>

      <div className="relative max-w-7xl mx-auto px-6">

        <div className="text-center max-w-3xl mx-auto">

          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-yellow/20 text-brand-red font-bold text-sm uppercase tracking-wider">

            <SparklesIcon size={16}/>

            Oportunidades Inteligentes

          </span>

          <h2 className="font-serif text-5xl font-black text-ink mt-6">

            Depois do diagnóstico,

            <br />

            mostramos exatamente isso.

          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">

            Nossa IA cruza suas competências com vagas abertas e cursos
            gratuitos para acelerar sua contratação.

          </p>

        </div>

        <div className="relative mt-20">

          <div
            className={`grid lg:grid-cols-2 gap-10 transition duration-500 ${
              !isAuthenticated
                ? "blur-md opacity-50 pointer-events-none"
                : ""
            }`}
          >

            {/* VAGAS */}

            <div className="rounded-3xl bg-white border border-slate-200 shadow-xl p-8">

              <div className="flex items-center gap-3 mb-8">

                <BriefcaseIcon className="text-brand-red"/>

                <h3 className="font-bold text-2xl">
                  Vagas Compatíveis
                </h3>

              </div>

              <div className="space-y-5">

                {jobs.map((job) => (

                  <div
                    key={job.title}
                    className="rounded-2xl border border-slate-200 p-5 hover:border-brand-yellow hover:shadow-lg transition"
                  >

                    <div className="flex justify-between">

                      <div>

                        <h4 className="font-bold text-lg">
                          {job.title}
                        </h4>

                        <p className="text-slate-500 mt-1">
                          {job.company}
                        </p>

                      </div>

                      <span className="bg-green-100 text-green-700 font-bold rounded-full px-3 py-1 text-sm">
                        {job.match} Match
                      </span>

                    </div>

                    <div className="flex justify-between mt-5 text-sm text-slate-500">

                      <div className="flex items-center gap-2">

                        <MapPinIcon size={15}/>

                        {job.location}

                      </div>

                      <div className="flex items-center gap-2">

                        <WalletIcon size={15}/>

                        {job.salary}

                      </div>

                    </div>

                  </div>

                ))}

              </div>

            </div>

            {/* CURSOS */}

            <div className="rounded-3xl bg-white border border-slate-200 shadow-xl p-8">

              <div className="flex items-center gap-3 mb-8">

                <GraduationCapIcon className="text-brand-yellow"/>

                <h3 className="font-bold text-2xl">
                  Próximos Cursos
                </h3>

              </div>

              <div className="space-y-5">

                {courses.map((course) => (

                  <div
                    key={course.title}
                    className="rounded-2xl border border-slate-200 p-5 hover:border-brand-green hover:shadow-lg transition"
                  >

                    <div className="flex justify-between">

                      <div>

                        <h4 className="font-bold text-lg">
                          {course.title}
                        </h4>

                        <p className="text-slate-500 mt-2">
                          {course.provider}
                        </p>

                      </div>

                      <span className="rounded-full bg-brand-green/10 text-brand-green px-3 py-1 font-bold text-sm">
                        {course.duration}
                      </span>

                    </div>

                  </div>

                ))}

              </div>

            </div>

          </div>

          {!isAuthenticated && (

            <div className="absolute inset-0 flex items-center justify-center">

              <div className="rounded-[32px] bg-white p-10 shadow-2xl border border-slate-200 max-w-lg text-center">

                <div className="w-20 h-20 rounded-full bg-brand-yellow flex items-center justify-center mx-auto">

                  <LockIcon size={34} className="text-ink"/>

                </div>

                <h3 className="font-serif text-4xl font-black mt-8">

                  Desbloqueie seu futuro

                </h3>

                <p className="mt-5 leading-8 text-slate-600">

                  Faça seu cadastro gratuito para visualizar todas as vagas,
                  cursos personalizados e recomendações geradas pela IA.

                </p>

                <button
                  onClick={onUnlock}
                  className="mt-8 w-full rounded-full bg-brand-red hover:bg-red-700 transition text-white py-4 font-bold flex items-center justify-center gap-3"
                >

                  Criar Conta Gratuitamente

                  <ArrowRightIcon size={18}/>

                </button>

              </div>

            </div>

          )}

        </div>

      </div>

    </section>
  );
}