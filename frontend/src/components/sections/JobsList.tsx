import {
  BriefcaseBusiness,
  MapPin,
  Wallet,
  ArrowRight,
  BadgeCheck,
} from "lucide-react";

import type { Job } from "../../services/catalog";

interface JobsListProps {
  jobs: Job[];
  loading: boolean;
  error?: string;
  onSelect: (job: Job) => void;
}

export function JobsList({
  jobs,
  loading,
  error,
  onSelect,
}: JobsListProps) {

  if (loading)
    return (
      <p className="text-slate-500">
        Carregando vagas...
      </p>
    );

  if (error)
    return (
      <div className="rounded-2xl bg-red-50 border border-red-200 p-5 text-red-700">
        {error}
      </div>
    );

  if (!jobs.length)
    return (
      <p className="text-slate-500">
        Nenhuma vaga encontrada.
      </p>
    );

  return (

    <div className="space-y-6">

      {jobs.map((job)=>(

        <button
          key={job.id}
          onClick={()=>onSelect(job)}
          className="group w-full rounded-3xl border border-slate-200 bg-[#FAFAF9] hover:bg-white hover:border-brand-red hover:shadow-xl transition-all duration-300 text-left p-7"
        >

          <div className="flex justify-between">

            <div>

              <span className="flex items-center gap-2 uppercase text-brand-blue text-sm font-bold">

                <BriefcaseBusiness size={16}/>

                {job.company || "Empresa"}

              </span>

              <h3 className="text-2xl font-bold mt-5">

                {job.title}

              </h3>

            </div>

            <span className="rounded-full bg-brand-green/10 text-brand-green px-4 py-2 font-bold h-fit">

              Match IA

            </span>

          </div>

          <div className="flex flex-wrap gap-6 mt-7 text-slate-600">

            <span className="flex items-center gap-2">

              <MapPin size={16}/>

              {[job.location, job.modality]
                .filter(Boolean)
                .join(" · ") || "Local"}

            </span>

            {job.salary && (

              <span className="flex items-center gap-2">

                <Wallet size={16}/>

                {job.salary}

              </span>

            )}

          </div>

          <div className="flex justify-between items-center mt-8">

            <div className="flex items-center gap-2 text-brand-green">

              <BadgeCheck size={18}/>

              Compatível com seu perfil

            </div>

            <span className="flex items-center gap-2 font-bold text-brand-red">

              Ver detalhes

              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition"
              />

            </span>

          </div>

        </button>

      ))}

    </div>

  );
}