import React, { useEffect } from "react";
import type { Course, Job } from "../../services/catalog";

import {
  X,
  Building2,
  MapPin,
  GraduationCap,
  ExternalLink,
  MessageCircle,
} from "lucide-react";

interface DetailsModalProps {
  item: Course | Job | null;
  type: "course" | "job";
  onClose: () => void;
}

export function DetailsModal({
  item,
  type,
  onClose,
}: DetailsModalProps) {

  useEffect(() => {
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", escape);

    return () =>
      window.removeEventListener("keydown", escape);

  }, [onClose]);

  if (!item) return null;

  const isCourseItem = type === "course";

  const courseItem = item as Course;
  const jobItem = item as Job;

  const externalUrl = isCourseItem
    ? courseItem.platformUrl
    : jobItem.applicationUrl;

  return (

    <div
      role="presentation"
      onMouseDown={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-md p-6"
    >

      <article
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onMouseDown={(event) => event.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-[34px] bg-white shadow-[0_40px_120px_rgba(15,23,42,.35)] animate-in fade-in zoom-in-95 duration-300"
      >

        <div className="relative overflow-hidden">

          <div className="absolute inset-0 bg-gradient-to-br from-brand-blue via-brand-green to-brand-blue" />

          <div className="absolute -top-16 right-[-70px] h-72 w-72 rounded-full bg-white/10 blur-3xl" />

          <div className="absolute bottom-[-120px] left-[-60px] h-72 w-72 rounded-full bg-brand-yellow/20 blur-3xl" />

          <button
            onClick={onClose}
            aria-label="Fechar"
            className="absolute right-6 top-6 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 backdrop-blur border border-white/20 text-white transition hover:bg-white hover:text-brand-blue"
          >
            <X size={20} />
          </button>

          <div className="relative z-10 px-10 pt-10 pb-8 text-white">

            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-bold backdrop-blur">

              {isCourseItem ? (

                <>
                  <GraduationCap size={16} />

                  {courseItem.institution || "Instituição Parceira"}
                </>

              ) : (

                <>
                  <Building2 size={16} />

                  {jobItem.company || "Empresa Parceira"}
                </>

              )}

            </span>

            <h2
              id="modal-title"
              className="mt-6 max-w-3xl font-serif text-4xl font-black leading-tight"
            >
              {item.title}
            </h2>

            {!isCourseItem && (
              <div className="mt-5 flex flex-wrap gap-3">

                {jobItem.location && (

                  <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm backdrop-blur">

                    <MapPin size={15} />

                    {jobItem.location}

                  </span>

                )}

                {jobItem.modality && (

                  <span className="rounded-full bg-white/15 px-4 py-2 text-sm backdrop-blur">

                    {jobItem.modality}

                  </span>

                )}

                {jobItem.salary && (

                  <span className="rounded-full bg-brand-yellow px-4 py-2 font-bold text-brand-blue">

                    {jobItem.salary}

                  </span>

                )}

              </div>
            )}

          </div>

        </div>

        <div className="px-10 py-8">

          {isCourseItem && courseItem.image && (

            <img
              src={courseItem.image}
              alt=""
              className="mb-8 h-72 w-full rounded-3xl object-cover shadow-xl"
            />

          )}

          <div className="prose prose-slate max-w-none">

            <p className="text-lg leading-8 text-slate-600">

              {item.description || "Descrição não informada."}

            </p>

          </div>

          {isCourseItem ? (

  <div className="mt-10 grid gap-5 md:grid-cols-3">

    <Info
      icon={<Building2 size={20} />}
      label="Instituição"
      value={courseItem.institution}
    />

    <Info
      icon={<GraduationCap size={20} />}
      label="Carga Horária"
      value={courseItem.workload}
    />

    <Info
      icon={<GraduationCap size={20} />}
      label="Categoria"
      value={courseItem.category}
    />

  </div>

) : (

  <div className="mt-10 space-y-8">

    <div className="grid gap-5 md:grid-cols-3">

      <Info
        icon={<MapPin size={20} />}
        label="Localização"
        value={jobItem.location}
      />

      <Info
        icon={<Building2 size={20} />}
        label="Modalidade"
        value={jobItem.modality}
      />

      <Info
        icon={<ExternalLink size={20} />}
        label="Salário"
        value={jobItem.salary}
      />

    </div>

    <div className="flex flex-col gap-6">

      <List
        title="Requisitos"
        values={jobItem.requirements}
      />

      <List
        title="Benefícios"
        values={jobItem.benefits}
      />

    </div>

  </div>

)}

<div className="mt-12 flex flex-wrap gap-4">

  {externalUrl && (

    <a
      href={externalUrl}
      target="_blank"
      rel="noreferrer"
      className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-brand-red to-brand-yellow px-8 py-4 font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
    >

      {isCourseItem
        ? "Acessar Plataforma"
        : "Candidatar-se"}

      <ExternalLink
        size={18}
        className="transition-transform group-hover:translate-x-1"
      />

    </a>

  )}

  {!isCourseItem && jobItem.whatsapp && (

    <a
      href={`https://wa.me/${jobItem.whatsapp.replace(/\D/g, "")}`}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-3 rounded-2xl border-2 border-brand-green px-8 py-4 font-bold text-brand-green transition hover:bg-brand-green hover:text-white"
    >

      <MessageCircle size={20} />

      Conversar pelo WhatsApp

    </a>

  )}

</div>

</div>

</article>

</div>

);
}

interface InfoProps {
  icon: React.ReactNode;
  label: string;
  value?: string | null;
}

function Info({
  icon,
  label,
  value,
}: InfoProps) {
  return (
    <div className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-yellow hover:shadow-xl">

      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-yellow/15 text-brand-blue">

        {icon}

      </div>

      <div className="mt-5">

        <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">

          {label}

        </span>

        <p className="mt-2 text-base font-semibold leading-7 text-slate-700">

          {value || "Não informado"}

        </p>

      </div>

    </div>
  );
}

function List({
  title,
  values,
}: {
  title: string;
  values: string[];
}) {

  if (!values?.length) return null;

  return (

    <section className="rounded-3xl border border-slate-200 bg-slate-50 p-7">

      <h3 className="mb-6 text-xl font-black text-brand-blue">

        {title}

      </h3>

      <div className="space-y-4">

        {values.map((value, index) => (

          <div
            key={`${value}-${index}`}
            className="flex items-start gap-4 rounded-2xl bg-white p-4 shadow-sm"
          >

            <div className="mt-2 h-2.5 w-2.5 rounded-full bg-brand-green shrink-0" />

            <p className="leading-7 text-slate-600">

              {value}

            </p>

          </div>

        ))}

      </div>

    </section>

  );
}