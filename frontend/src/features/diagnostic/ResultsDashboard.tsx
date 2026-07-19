import {
  BrainCircuit,
  Trophy,
  Sparkles,
  BriefcaseBusiness,
  GraduationCap,
  RotateCcw,
  ArrowRight,
  BadgeCheck,
} from "lucide-react";

import { Button } from "../../components/ui/Button";

interface ResultsDashboardProps {
  profile: string | null;
  onRetake: () => void;
}

const profileData: Record<
  string,
  {
    description: string;
    courses: string[];
    jobs: string[];
    skills: string[];
    employability: number;
  }
> = {
  Comercial: {
    description:
      "Você demonstra facilidade para negociação, relacionamento interpessoal e alcance de metas.",
    employability: 94,
    skills: [
      "Comunicação",
      "Persuasão",
      "Relacionamento",
      "Proatividade",
    ],
    courses: [
      "Vendas Consultivas",
      "Atendimento ao Cliente",
      "Marketing Digital",
    ],
    jobs: [
      "Vendedor",
      "Consultor Comercial",
      "Representante",
    ],
  },

  Administrativo: {
    description:
      "Seu perfil é organizado, analítico e voltado para processos e gestão.",
    employability: 91,
    skills: [
      "Organização",
      "Excel",
      "Planejamento",
      "Documentação",
    ],
    courses: [
      "Excel Básico",
      "Rotinas Administrativas",
      "Gestão Empresarial",
    ],
    jobs: [
      "Auxiliar Administrativo",
      "Assistente Financeiro",
      "Recepcionista",
    ],
  },

  Atendimento: {
    description:
      "Você possui facilidade para lidar com pessoas e solucionar necessidades dos clientes.",
    employability: 92,
    skills: [
      "Empatia",
      "Comunicação",
      "Escuta",
      "Relacionamento",
    ],
    courses: [
      "Atendimento Humanizado",
      "Comunicação",
      "Excelência no Atendimento",
    ],
    jobs: [
      "Atendente",
      "Recepcionista",
      "Operador de Caixa",
    ],
  },

  Operacional: {
    description:
      "Seu perfil indica boa execução prática e foco em produtividade.",
    employability: 90,
    skills: [
      "Agilidade",
      "Execução",
      "Disciplina",
      "Responsabilidade",
    ],
    courses: [
      "Segurança do Trabalho",
      "Operação Industrial",
      "Boas Práticas",
    ],
    jobs: [
      "Auxiliar de Produção",
      "Operador",
      "Serviços Gerais",
    ],
  },

  Logistica: {
    description:
      "Você demonstra organização, controle e facilidade com processos logísticos.",
    employability: 89,
    skills: [
      "Controle",
      "Estoque",
      "Planejamento",
      "Organização",
    ],
    courses: [
      "Logística",
      "Gestão de Estoque",
      "Almoxarifado",
    ],
    jobs: [
      "Estoquista",
      "Conferente",
      "Auxiliar de Logística",
    ],
  },

  Tecnologia: {
    description:
      "Você apresenta perfil analítico e facilidade para aprender ferramentas tecnológicas.",
    employability: 96,
    skills: [
      "Lógica",
      "Tecnologia",
      "Aprendizado",
      "Resolução de Problemas",
    ],
    courses: [
      "Python",
      "HTML e CSS",
      "Git",
    ],
    jobs: [
      "Suporte Técnico",
      "Desenvolvedor Júnior",
      "Analista de Sistemas",
    ],
  },
};

export function ResultsDashboard({
  profile,
  onRetake,
}: ResultsDashboardProps) {
  const data =
    profile && profileData[profile]
      ? profileData[profile]
      : {
          description:
            "Estamos finalizando a análise do seu perfil.",
          employability: 0,
          skills: [],
          courses: [],
          jobs: [],
        };

  return (
    <section className="relative py-24 bg-[#F7F3EA] overflow-hidden">

      <div className="absolute inset-0 pointer-events-none">

        <div className="absolute left-0 top-0 w-96 h-96 rounded-full bg-yellow-200/20 blur-3xl"/>

        <div className="absolute right-0 bottom-0 w-[450px] h-[450px] rounded-full bg-blue-200/20 blur-3xl"/>

      </div>

      <div className="relative max-w-7xl mx-auto px-6">

        <div className="rounded-[40px] overflow-hidden shadow-2xl border border-slate-200 bg-white">

          {/* HERO */}

          <div className="bg-gradient-to-r from-brand-blue via-brand-green to-brand-blue text-white p-12">

            <span className="inline-flex items-center gap-2 bg-white/20 rounded-full px-5 py-2 text-sm font-bold">

              <BrainCircuit size={16} />

              Diagnóstico concluído

            </span>

            <h1 className="font-serif text-5xl font-black mt-8">

              Perfil identificado:

              <br />

              <span className="text-brand-yellow">

                {profile}

              </span>

            </h1>

            <p className="mt-6 text-lg max-w-3xl opacity-90">

              {data.description}

            </p>

          </div>

          {/* KPI */}

          <div className="grid lg:grid-cols-4 gap-6 p-10">

            <div className="rounded-3xl bg-[#F7F3EA] p-6">

              <Trophy className="text-brand-yellow"/>

              <div className="text-5xl font-black mt-5">

                {data.employability}%

              </div>

              <p className="text-slate-500 mt-2">

                Empregabilidade

              </p>

            </div>

            <div className="rounded-3xl bg-[#F7F3EA] p-6">

              <Sparkles className="text-brand-red"/>

              <div className="text-5xl font-black mt-5">

                IA

              </div>

              <p className="text-slate-500 mt-2">

                Perfil analisado

              </p>

            </div>

            <div className="rounded-3xl bg-[#F7F3EA] p-6">

              <GraduationCap className="text-brand-green"/>

              <div className="text-5xl font-black mt-5">

                {data.courses.length}

              </div>

              <p className="text-slate-500 mt-2">

                Cursos

              </p>

            </div>

            <div className="rounded-3xl bg-[#F7F3EA] p-6">

              <BriefcaseBusiness className="text-brand-blue"/>

              <div className="text-5xl font-black mt-5">

                {data.jobs.length}

              </div>

              <p className="text-slate-500 mt-2">

                Vagas

              </p>

            </div>

          </div>

          {/* Conteúdo */}

          <div className="grid lg:grid-cols-3 gap-8 px-10 pb-12">

            {/* Skills */}

            <div className="rounded-3xl border p-8">

              <h3 className="font-bold text-2xl mb-6">

                Competências

              </h3>

              <div className="flex flex-wrap gap-3">

                {data.skills.map((skill) => (

                  <span
                    key={skill}
                    className="bg-brand-green/10 text-brand-green rounded-full px-4 py-2 font-semibold"
                  >
                    {skill}
                  </span>

                ))}

              </div>

            </div>

            {/* Cursos */}

            <div className="rounded-3xl border p-8">

              <h3 className="font-bold text-2xl mb-6">

                Cursos recomendados

              </h3>

              <div className="space-y-4">

                {data.courses.map((course) => (

                  <div
                    key={course}
                    className="flex items-center justify-between"
                  >

                    <span>{course}</span>

                    <ArrowRight size={18}/>

                  </div>

                ))}

              </div>

            </div>

            {/* Vagas */}

            <div className="rounded-3xl border p-8">

              <h3 className="font-bold text-2xl mb-6">

                Vagas indicadas

              </h3>

              <div className="space-y-4">

                {data.jobs.map((job) => (

                  <div
                    key={job}
                    className="flex items-center justify-between"
                  >

                    <div className="flex items-center gap-3">

                      <BadgeCheck
                        size={18}
                        className="text-brand-green"
                      />

                      {job}

                    </div>

                  </div>

                ))}

              </div>

            </div>

          </div>

          {/* Footer */}

          <div className="border-t px-10 py-8 flex flex-col md:flex-row justify-between items-center gap-6">

            <p className="text-slate-500">
              Você pode refazer o diagnóstico a qualquer momento.
            </p>

            <Button onClick={onRetake}>
              <RotateCcw size={18} />
              Refazer Diagnóstico
            </Button>

          </div>

        </div>

      </div>

    </section>
  );
}