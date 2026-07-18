import { Button } from "../../components/ui/Button";

interface ResultsDashboardProps {
  profile: string | null;
  onRetake: () => void;
}

export function ResultsDashboard({ profile, onRetake }: ResultsDashboardProps) {
  return (
    <div className="bg-brand-white rounded-[22px] p-[38px] shadow-[0_20px_50px_-20px_rgba(24,38,66,0.25)] text-center">
      <span className="inline-block bg-brand-yellow text-ink font-extrabold py-2 px-[18px] rounded-full text-[13px] mb-4">
        Diagnóstico Concluído
      </span>
      <h3 className="text-[28px] font-bold mb-4 font-serif">
        Seu perfil é: <span className="text-brand-red">{profile || "Em análise"}</span>
      </h3>
      <p className="text-[#5a6480] text-lg max-w-lg mx-auto mb-8">
        Mapeamos as melhores oportunidades de cursos e vagas que combinam exatamente com suas habilidades e interesses. Role para baixo para explorar!
      </p>
      <Button onClick={onRetake}>Refazer Diagnóstico</Button>
    </div>
  );
}
