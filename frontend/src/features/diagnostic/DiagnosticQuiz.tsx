import { useState } from "react";
import { Button } from "../../components/ui/Button";
import {
  ChevronRight,
  Brain,
  CheckCircle2,
} from "lucide-react";

type Area =
  | "Comercial"
  | "Administrativo"
  | "Atendimento"
  | "Operacional"
  | "Logistica"
  | "Tecnologia";

interface Option {
  text: string;
  score: Partial<Record<Area, number>>;
}

interface Question {
  q: string;
  opts: Option[];
}

const questions: Question[] = [
  {
    q: "Qual tipo de atividade você mais gosta de fazer no trabalho ou no dia a dia?",
    opts: [
      {
        text: "Conversar e convencer pessoas",
        score: { Comercial: 2, Atendimento: 1 },
      },
      {
        text: "Organizar documentos, números e processos",
        score: { Administrativo: 2 },
      },
      {
        text: "Resolver problemas técnicos ou usar computador",
        score: { Tecnologia: 2 },
      },
      {
        text: "Trabalhar com ferramentas ou equipamentos",
        score: { Operacional: 2 },
      },
      {
        text: "Organizar produtos e materiais",
        score: { Logistica: 2 },
      },
    ],
  },

  {
    q: "Você prefere trabalhar...",
    opts: [
      {
        text: "Com muitas pessoas",
        score: { Atendimento: 2 },
      },
      {
        text: "Em equipe",
        score: { Operacional: 1, Logistica: 1 },
      },
      {
        text: "De forma mais independente",
        score: { Administrativo: 1, Tecnologia: 2 },
      },
    ],
  },

  {
    q: "Quando surge um problema você normalmente...",
    opts: [
      {
        text: "Conversa com alguém para resolver",
        score: { Atendimento: 2 },
      },
      {
        text: "Analisa antes de agir",
        score: { Administrativo: 2 },
      },
      {
        text: "Resolve imediatamente",
        score: { Operacional: 2 },
      },
      {
        text: "Pesquisa alternativas",
        score: { Tecnologia: 2 },
      },
    ],
  },

  {
    q: "Qual ambiente você prefere?",
    opts: [
      {
        text: "Escritório",
        score: { Administrativo: 2 },
      },
      {
        text: "Loja ou atendimento",
        score: { Comercial: 2 },
      },
      {
        text: "Produção",
        score: { Operacional: 2 },
      },
      {
        text: "Estoque",
        score: { Logistica: 2 },
      },
      {
        text: "Computador e sistemas",
        score: { Tecnologia: 2 },
      },
    ],
  },

  {
    q: "O que mais motiva você em um trabalho?",
    opts: [
      {
        text: "Ganhar comissão e bater metas",
        score: { Comercial: 2 },
      },
      {
        text: "Organização e estabilidade",
        score: { Administrativo: 2 },
      },
      {
        text: "Ajudar pessoas",
        score: { Atendimento: 2 },
      },
      {
        text: "Produzir resultados",
        score: { Operacional: 2 },
      },
      {
        text: "Resolver desafios",
        score: { Tecnologia: 2 },
      },
    ],
  },

  {
    q: "Qual característica mais combina com você?",
    opts: [
      {
        text: "Comunicativo",
        score: { Comercial: 2 },
      },
      {
        text: "Organizado",
        score: { Administrativo: 2 },
      },
      {
        text: "Prestativo",
        score: { Atendimento: 2 },
      },
      {
        text: "Ágil",
        score: { Operacional: 2 },
      },
      {
        text: "Detalhista",
        score: { Logistica: 2 },
      },
      {
        text: "Analítico",
        score: { Tecnologia: 2 },
      },
    ],
  },

  {
    q: "Você aprende melhor...",
    opts: [
      {
        text: "Conversando",
        score: { Atendimento: 2 },
      },
      {
        text: "Lendo",
        score: { Administrativo: 2 },
      },
      {
        text: "Na prática",
        score: { Operacional: 2 },
      },
      {
        text: "Observando",
        score: { Logistica: 2 },
      },
      {
        text: "Testando sozinho",
        score: { Tecnologia: 2 },
      },
    ],
  },

  {
    q: "Qual atividade escolheria hoje?",
    opts: [
      {
        text: "Vender um produto",
        score: { Comercial: 2 },
      },
      {
        text: "Organizar documentos",
        score: { Administrativo: 2 },
      },
      {
        text: "Atender clientes",
        score: { Atendimento: 2 },
      },
      {
        text: "Montar algo",
        score: { Operacional: 2 },
      },
      {
        text: "Organizar estoque",
        score: { Logistica: 2 },
      },
      {
        text: "Resolver problema no computador",
        score: { Tecnologia: 2 },
      },
    ],
  },

  {
    q: "Como seus amigos descrevem você?",
    opts: [
      {
        text: "Comunicativo",
        score: { Comercial: 2 },
      },
      {
        text: "Organizado",
        score: { Administrativo: 2 },
      },
      {
        text: "Prestativo",
        score: { Atendimento: 2 },
      },
      {
        text: "Trabalhador",
        score: { Operacional: 2 },
      },
      {
        text: "Responsável",
        score: { Logistica: 2 },
      },
      {
        text: "Resolve problemas",
        score: { Tecnologia: 2 },
      },
    ],
  },

  {
    q: "Qual área desperta mais seu interesse?",
    opts: [
      { text: "Comercial", score: { Comercial: 3 } },
      { text: "Administrativo", score: { Administrativo: 3 } },
      { text: "Atendimento", score: { Atendimento: 3 } },
      { text: "Operacional", score: { Operacional: 3 } },
      { text: "Logística", score: { Logistica: 3 } },
      { text: "Tecnologia", score: { Tecnologia: 3 } },
    ],
  },
];

export function DiagnosticQuiz({
  onResultsRequested,
}: {
  onResultsRequested: (answers: string[], perfil: string) => void;
}) {
  const [current, setCurrent] = useState(0);

  const [scores, setScores] = useState<Record<Area, number>>({
    Comercial: 0,
    Administrativo: 0,
    Atendimento: 0,
    Operacional: 0,
    Logistica: 0,
    Tecnologia: 0,
  });

  const complete = current >= questions.length;

  function answer(option: Option) {
  const updated = { ...scores };

  Object.entries(option.score).forEach(([k, v]) => {
    updated[k as Area] += v ?? 0;
  });

  setAnswers((prev) => [...prev, option.text]);

  setScores(updated);
  setCurrent((c) => c + 1);
}

  const [answers, setAnswers] = useState<string[]>([]);

  if (complete) {
  const ranking = Object.entries(scores).sort((a, b) => b[1] - a[1]);

  const total = ranking.reduce((acc, [, pts]) => acc + pts, 0);

  const percentage =
    total === 0 ? 0 : Math.round((ranking[0][1] / total) * 100);

  return (
    <section
      id="diagnostico"
      className="relative py-28 bg-[#F7F3EA] overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">

        <div className="absolute left-0 top-0 w-96 h-96 rounded-full bg-yellow-200/20 blur-3xl" />

        <div className="absolute right-0 bottom-0 w-[450px] h-[450px] rounded-full bg-green-200/20 blur-3xl" />

      </div>

      <div className="relative max-w-6xl mx-auto px-6">

        <div className="rounded-[36px] bg-white shadow-2xl border border-slate-200 overflow-hidden">

          <div className="bg-gradient-to-r from-brand-green to-brand-blue text-white p-10">

            <span className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 text-sm font-bold">

              <CheckCircle2 size={16} />

              Perfil identificado

            </span>

            <h2 className="font-serif text-5xl font-black mt-6">
              {ranking[0][0]}
            </h2>

            <p className="mt-5 text-lg opacity-90 max-w-2xl">
              Nossa IA analisou suas respostas e encontrou o perfil com maior
              compatibilidade para iniciar sua jornada profissional.
            </p>

          </div>

          <div className="grid lg:grid-cols-2 gap-12 p-10">

            {/* Score */}

            <div>

              <div className="w-56 h-56 rounded-full mx-auto border-[14px] border-brand-green flex flex-col items-center justify-center">

                <span className="text-6xl font-black text-brand-green">

                  {percentage}%

                </span>

                <span className="text-slate-500 mt-2">

                  Compatibilidade

                </span>

              </div>

              <div className="mt-10 rounded-2xl bg-[#F7F3EA] p-6">

                <h3 className="font-bold text-xl">

                  Competências identificadas

                </h3>

                <div className="flex flex-wrap gap-3 mt-6">

                  <span className="bg-brand-green/10 text-brand-green rounded-full px-4 py-2">
                    Comunicação
                  </span>

                  <span className="bg-brand-yellow/20 text-brand-red rounded-full px-4 py-2">
                    Organização
                  </span>

                  <span className="bg-brand-blue/10 text-brand-blue rounded-full px-4 py-2">
                    Trabalho em equipe
                  </span>

                  <span className="bg-brand-red/10 text-brand-red rounded-full px-4 py-2">
                    Aprendizado rápido
                  </span>

                </div>

              </div>

            </div>

            {/* Ranking */}

            <div>

              <h3 className="text-2xl font-bold">

                Compatibilidade por área

              </h3>

              <div className="space-y-6 mt-8">

                {ranking.map(([area, pontos]) => {

                  const width = Math.round((pontos / ranking[0][1]) * 100);

                  return (

                    <div key={area}>

                      <div className="flex justify-between font-semibold">

                        <span>{area}</span>

                        <span>{pontos} pts</span>

                      </div>

                      <div className="mt-2 h-3 rounded-full bg-slate-200 overflow-hidden">

                        <div
                          className="h-full rounded-full bg-brand-yellow"
                          style={{
                            width: `${width}%`,
                          }}
                        />

                      </div>

                    </div>

                  );

                })}

              </div>

              <div className="mt-10 rounded-3xl border border-brand-green bg-brand-green/5 p-6">

                <h4 className="font-bold text-xl">

                  Próximo passo

                </h4>

                <p className="mt-4 text-slate-600 leading-8">

                  Agora vamos recomendar cursos gratuitos,
                  gerar seu plano de desenvolvimento e
                  apresentar vagas compatíveis com seu perfil.

                </p>

              </div>

              <div className="mt-10">
  <Button onClick={() => onResultsRequested(answers, ranking[0][0])}>
    Ver vagas recomendadas
  </Button>
</div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

  const question = questions[current];

  const progress = ((current + 1) / questions.length) * 100;

  return (
      <section
      id="diagnostico"
      className="relative py-28 bg-[#F7F3EA] overflow-hidden"
      >

      <div className="absolute inset-0 pointer-events-none">

      <div className="absolute -left-32 top-0 w-[420px] h-[420px] rounded-full bg-yellow-200/20 blur-3xl"/>

      <div className="absolute right-0 bottom-0 w-[500px] h-[500px] rounded-full bg-red-200/20 blur-3xl"/>

      </div>

      <div className="relative max-w-5xl mx-auto px-6">

      <div className="text-center mb-16">

      <span className="inline-flex items-center gap-2 rounded-full bg-brand-yellow/20 px-4 py-2 text-brand-red font-bold text-sm">

      <Brain size={16}/>

      Diagnóstico Inteligente

      </span>

      <h2 className="font-serif text-5xl font-black text-ink mt-6">

      Descubra seu perfil profissional

      </h2>

      <p className="mt-5 text-lg text-slate-600 max-w-2xl mx-auto leading-8">

      Responda algumas perguntas.

      Nossa IA identifica suas competências e recomenda cursos e vagas compatíveis.

      </p>

      </div>

      <div className="bg-white rounded-[36px] shadow-2xl border border-slate-200 overflow-hidden">

      <div className="px-10 pt-10">

      <div className="flex justify-between text-sm font-bold">

      <span>

      Pergunta {current + 1}

      </span>

      <span>

      {questions.length} etapas

      </span>

      </div>

      <div className="mt-4 h-3 rounded-full bg-slate-200 overflow-hidden">

      <div

      className="h-full rounded-full bg-brand-green transition-all duration-500"

      style={{

      width: `${progress}%`

      }}

      />

      </div>

      </div>

      <div className="px-10 py-12">

      <h3 className="text-3xl font-bold leading-snug text-ink">

      {question.q}

      </h3>

      <div className="mt-10 grid gap-4">

      {question.opts.map((option)=>(

      <button

      key={option.text}

      onClick={()=>answer(option)}

      className="group rounded-2xl border border-slate-200 p-6 text-left hover:border-brand-yellow hover:bg-[#FFFBEF] hover:shadow-lg transition-all duration-300"

      >

      <div className="flex items-center justify-between">

      <span className="text-lg font-semibold">

      {option.text}

      </span>

      <ChevronRight

      size={20}

      className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition"

      />

      </div>

      </button>

      ))}

      </div>

      </div>

      </div>

      <div className="mt-10 grid md:grid-cols-3 gap-6">

      <div className="rounded-3xl bg-white p-6 shadow border">

      <div className="text-brand-green text-4xl font-black">

      IA

      </div>

      <p className="mt-2 text-slate-600">

      Análise comportamental

      </p>

      </div>

      <div className="rounded-3xl bg-white p-6 shadow border">

      <div className="text-brand-yellow text-4xl font-black">

      100%

      </div>

      <p className="mt-2 text-slate-600">

      Cursos gratuitos

      </p>

      </div>

      <div className="rounded-3xl bg-white p-6 shadow border">

      <div className="text-brand-red text-4xl font-black">

      Match

      </div>

      <p className="mt-2 text-slate-600">

      Vagas compatíveis

      </p>

      </div>

      </div>

      </div>

      </section>
  );
}