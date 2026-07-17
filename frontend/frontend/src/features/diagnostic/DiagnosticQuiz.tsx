import { useState } from 'react';
import { Button } from '../../components/ui/Button';

const questions = [
  { q: 'O que você mais gosta de fazer no dia a dia?', opts: ['Conversar e ajudar pessoas', 'Organizar e mexer com números', 'Trabalhar com as mãos'] },
  { q: 'Quanto tempo por semana você tem para estudar?', opts: ['Até 3 horas', 'De 3 a 8 horas', 'Mais de 8 horas'] },
  { q: 'Você já trabalhou em alguma dessas áreas?', opts: ['Comércio ou atendimento', 'Nenhuma ainda', 'Serviços gerais ou manutenção'] },
];

export function DiagnosticQuiz({ onResultsRequested }: { onResultsRequested: () => void }) {
  const [current, setCurrent] = useState(0); const [complete, setComplete] = useState(false);
  const answer = () => current < questions.length - 1 ? setCurrent((value) => value + 1) : setComplete(true);
  const question = questions[current];
  return <section className="py-[80px] px-[6vw] bg-brand-white" id="diagnostico"><div className="text-[13px] font-extrabold tracking-[1.5px] uppercase text-brand-red mb-3">Experimente</div><h2 className="text-[clamp(26px,3.5vw,38px)] max-w-[640px] mb-11">Veja o diagnóstico funcionando</h2><div className="bg-brand-white rounded-[22px] p-[38px] max-w-[640px] mx-auto shadow-[0_20px_50px_-20px_rgba(24,38,66,0.25)]">{complete ? <div className="text-center"><span className="inline-block bg-brand-yellow text-ink font-extrabold py-2 px-[18px] rounded-full text-[13px] mb-4">Diagnóstico concluído</span><h3 className="text-[24px] mb-2">Seu próximo passo começa agora</h3><p className="text-[#5a6480]">Entre para ver os cursos e vagas indicados para você.</p><div className="mt-7"><Button onClick={onResultsRequested}>Ver meus resultados</Button></div></div> : <div><div className="h-1.5 bg-[#e7e0d0] rounded-full overflow-hidden mb-6"><div className="h-full bg-brand-green transition-all duration-300" style={{ width: `${((current + 1) / questions.length) * 100}%` }} /></div><div className="text-[13px] font-extrabold text-brand-blue tracking-[1px]">PERGUNTA {current + 1} DE {questions.length}</div><h3 className="text-[24px] my-2.5">{question.q}</h3><div className="flex flex-col gap-2.5 mt-5">{question.opts.map((option) => <button key={option} onClick={answer} className="block w-full text-left p-[14px_18px] rounded-[12px] border-2 border-solid border-[#e7e0d0] bg-paper font-sans font-semibold text-[15px] cursor-pointer hover:border-brand-yellow hover:bg-[#fdf6e3]">{option}</button>)}</div></div>}</div></section>;
}
