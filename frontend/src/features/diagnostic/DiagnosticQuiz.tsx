import { useState } from "react";
import { Button } from "../../components/ui/Button";

const questions = [
  {
    q: "O que mais chama sua atenção no dia a dia?",
    opts: [
      "Lidar diretamente e ajudar outras pessoas",
      "Organizar processos, números ou dados",
      "Construir, consertar ou trabalhar com as mãos",
    ],
  },
  {
    q: "Onde você se sente mais produtivo?",
    opts: [
      "Em movimento ou ao ar livre",
      "Fixo em um local interno estruturado",
      "Em ambientes práticos e técnicos",
    ],
  },
  {
    q: "Como você costuma agir diante de um imprevisto?",
    opts: [
      "Busco conversar para encontrar uma solução",
      "Analiso as opções de forma lógica antes de agir",
      "Tento resolver na prática por tentativa e erro",
    ],
  },
  {
    q: "Qual o seu nível de conforto com tecnologia?",
    opts: [
      "Tenho facilidade e aprendo ferramentas rápido",
      "Sei o básico para o dia a dia",
      "Prefiro atividades que dependam pouco de telas",
    ],
  },
  {
    q: "Como você lida com a rotina de trabalho?",
    opts: [
      "Gosto de rotinas previsíveis e estáveis",
      "Gosto de equilíbrio, sem estresse extremo",
      "Prefiro que cada dia seja diferente e dinâmico",
    ],
  },
  {
    q: "O que você mais valoriza em uma oportunidade HOJE?",
    opts: [
      "Retorno financeiro rápido",
      "Estabilidade e segurança a longo prazo",
      "Aprender uma profissão e ter plano de carreira",
    ],
  },
  {
    q: "Em relação ao trabalho em equipe, você prefere:",
    opts: [
      "Trabalhar em grupo, colaborando constantemente",
      "Trabalhar sozinho, focado nas minhas tarefas",
      "Assumir a frente e liderar outras pessoas",
    ],
  },
  {
    q: "Como você prefere aprender algo novo?",
    opts: [
      "Lendo e estudando a teoria primeiro",
      "Colocando a mão na massa na prática",
      "Ouvindo conselhos de quem já faz",
    ],
  },
  {
    q: "Qual a sua disponibilidade atual para estudar?",
    opts: [
      "Tempo restrito (Até 3 horas por semana)",
      "Consigo me organizar (De 3 a 8 horas por semana)",
      "Tenho bastante tempo (Mais de 8 horas por semana)",
    ],
  },
  {
    q: "Como você se sente lidando com clientes diariamente?",
    opts: [
      "Adoro interagir e conversar o dia todo",
      "Faço se precisar, mas prefiro tarefas internas",
      "Evito ao máximo; meu foco é puramente técnico",
    ],
  },
];

export function DiagnosticQuiz({
  onResultsRequested,
}: {
  onResultsRequested: () => void;
}) {
  const [current, setCurrent] = useState(0);
  const [complete, setComplete] = useState(false);

  const answer = () => {
    if (current < questions.length - 1) {
      setCurrent((value) => value + 1);
    } else {
      setComplete(true);
    }
  };

  const question = questions[current];

  return (
    <section className="py-[80px] px-[6vw] bg-brand-white" id="diagnostico">
      <div className="text-[13px] font-extrabold tracking-[1.5px] uppercase text-brand-red mb-3">
        Experimente
      </div>
      <h2 className="text-[clamp(26px,3.5vw,38px)] max-w-[640px] mb-11">
        Veja o diagnóstico funcionando
      </h2>
      <div className="bg-brand-white rounded-[22px] p-[38px] max-w-[640px] mx-auto shadow-[0_20px_50px_-20px_rgba(24,38,66,0.25)]">
        {complete ? (
          <div className="text-center">
            <span className="inline-block bg-brand-yellow text-ink font-extrabold py-2 px-[18px] rounded-full text-[13px] mb-4">
              Diagnóstico concluído
            </span>
            <h3 className="text-[24px] mb-2">Seu próximo passo começa agora</h3>
            <p className="text-[#5a6480]">
              Entre para ver os cursos e vagas indicados para você.
            </p>
            <div className="mt-7">
              <Button onClick={onResultsRequested}>Ver meus resultados</Button>
            </div>
          </div>
        ) : (
          <div>
            <div className="h-1.5 bg-[#e7e0d0] rounded-full overflow-hidden mb-6">
              <div
                className="h-full bg-brand-green transition-all duration-300"
                style={{
                  width: `${((current + 1) / questions.length) * 100}%`,
                }}
              />
            </div>
            <div className="text-[13px] font-extrabold text-brand-blue tracking-[1px]">
              PERGUNTA {current + 1} DE {questions.length}
            </div>
            <h3 className="text-[24px] my-2.5">{question.q}</h3>
            <div className="flex flex-col gap-2.5 mt-5">
              {question.opts.map((option) => (
                <button
                  key={option}
                  onClick={answer}
                  className="block w-full text-left p-[14px_18px] rounded-[12px] border-2 border-solid border-[#e7e0d0] bg-paper font-sans font-semibold text-[15px] cursor-pointer hover:border-brand-yellow hover:bg-[#fdf6e3]"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
