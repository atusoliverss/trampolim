import { useState } from 'react';
import { Button } from '../../components/ui/Button';

const questions = [
  {
    q: "O que você mais gosta de fazer no dia a dia?",
    opts: ["Conversar e ajudar pessoas", "Organizar e mexer com números", "Trabalhar com as mãos, consertar coisas"]
  },
  {
    q: "Quanto tempo por semana você tem pra estudar?",
    opts: ["Até 3 horas", "De 3 a 8 horas", "Mais de 8 horas"]
  },
  {
    q: "Você já trabalhou em alguma dessas áreas?",
    opts: ["Comércio ou atendimento", "Nenhuma ainda", "Serviços gerais / manutenção"]
  }
];

export function DiagnosticQuiz() {
  const [current, setCurrent] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);

  const handleSelect = (idx: number) => {
    setSelectedOpt(idx);
    setTimeout(() => {
      if (current < questions.length - 1) {
        setCurrent(prev => prev + 1);
        setSelectedOpt(null);
      } else {
        setShowResult(true);
      }
    }, 350);
  };

  const currentQ = questions[current];
  const progress = ((current + 1) / questions.length) * 100;

  return (
    <section className="py-[80px] px-[6vw] bg-brand-white" id="diagnostico">
      <div className="text-[13px] font-extrabold tracking-[1.5px] uppercase text-brand-red mb-3">Experimente</div>
      <h2 className="text-[clamp(26px,3.5vw,38px)] max-w-[640px] mb-11">Veja o diagnóstico funcionando</h2>

      <div className="bg-brand-white rounded-[22px] p-[38px] max-w-[640px] mx-auto shadow-[0_20px_50px_-20px_rgba(24,38,66,0.25)]">
        {!showResult ? (
          <div>
            <div className="h-1.5 bg-[#e7e0d0] rounded-full overflow-hidden mb-6">
              <div 
                className="h-full bg-brand-green transition-all duration-300 ease-out" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="text-[13px] font-extrabold text-brand-blue tracking-[1px]">
              PERGUNTA {current + 1} DE {questions.length}
            </div>
            <h3 className="text-[24px] my-2.5">{currentQ.q}</h3>
            <div className="flex flex-col gap-2.5 mt-5">
              {currentQ.opts.map((opt, idx) => {
                const isSelected = selectedOpt === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    className={`
                      block w-full text-left p-[14px_18px] rounded-[12px] border-2 border-solid
                      font-sans font-semibold text-[15px] cursor-pointer transition-colors duration-150
                      ${isSelected 
                        ? 'border-brand-green bg-[#e9f5ee]' 
                        : 'border-[#e7e0d0] bg-paper hover:border-brand-yellow hover:bg-[#fdf6e3]'
                      }
                    `}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="text-center animate-in fade-in zoom-in duration-300">
            <span className="inline-block bg-brand-yellow text-ink font-extrabold py-2 px-[18px] rounded-full text-[13px] mb-4">
              Diagnóstico concluído
            </span>
            <h3 className="text-[24px] mb-1.5">Perfil: Atendimento & Vendas</h3>
            <p className="text-[#5a6480] text-[15px]">Com base nas suas respostas, essa é a trilha sugerida:</p>
            
            <div className="flex gap-4 mt-6 flex-wrap justify-center">
              <div className="flex-1 min-w-[160px] bg-paper rounded-[14px] p-4 text-left border border-solid border-[#e7e0d0]">
                <div className="text-[11px] font-extrabold text-brand-red uppercase">SEBRAE · grátis</div>
                <h4 className="text-[15px] my-1.5 font-sans font-bold">Atendimento ao cliente</h4>
                <p className="text-[13px] text-[#5a6480]">20h · certificado</p>
              </div>
              <div className="flex-1 min-w-[160px] bg-paper rounded-[14px] p-4 text-left border border-solid border-[#e7e0d0]">
                <div className="text-[11px] font-extrabold text-brand-red uppercase">SENAI · grátis</div>
                <h4 className="text-[15px] my-1.5 font-sans font-bold">Operador de caixa</h4>
                <p className="text-[13px] text-[#5a6480]">40h · certificado</p>
              </div>
              <div className="flex-1 min-w-[160px] bg-paper rounded-[14px] p-4 text-left border border-solid border-[#e7e0d0]">
                <div className="text-[11px] font-extrabold text-brand-red uppercase">Trilhas de Futuro</div>
                <h4 className="text-[15px] my-1.5 font-sans font-bold">Excel básico</h4>
                <p className="text-[13px] text-[#5a6480]">15h · certificado</p>
              </div>
            </div>
            
            <div className="mt-7">
              <Button onClick={() => document.getElementById('vagas')?.scrollIntoView()}>
                Ver vagas compatíveis
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
