import { useEffect } from "react";
import type { Course, Job } from "../../services/catalog";

interface DetailsModalProps {
  item: Course | Job | null;
  type: "course" | "job";
  onClose: () => void;
}

export function DetailsModal({ item, type, onClose }: DetailsModalProps) {
  useEffect(() => {
    const escape = (event: KeyboardEvent) =>
      event.key === "Escape" && onClose();
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#182642]/60 p-4"
    >
      <article
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onMouseDown={(event) => event.stopPropagation()}
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[20px] bg-brand-white p-7 shadow-2xl"
      >
        <div className="flex justify-between gap-4">
          <div>
            <p className="text-[12px] font-extrabold uppercase text-brand-red">
              {isCourseItem ? courseItem.institution : jobItem.company}
            </p>
            <h2 id="modal-title" className="mt-1 text-[28px]">
              {item.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="h-9 w-9 rounded-full border border-[#e7e0d0] bg-paper text-xl cursor-pointer"
          >
            ×
          </button>
        </div>
        {isCourseItem && courseItem.image && (
          <img
            src={courseItem.image}
            alt=""
            className="mt-5 h-52 w-full rounded-xl object-cover"
          />
        )}
        <p className="mt-5 whitespace-pre-line text-[#3a4560]">
          {item.description || "Descrição não informada."}
        </p>
        {isCourseItem ? (
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <Info label="Instituição" value={courseItem.institution} />
            <Info label="Duração" value={courseItem.workload} />
            <Info label="Categoria" value={courseItem.category} />
          </div>
        ) : (
          <JobInfo item={jobItem} />
        )}
        {(externalUrl || (!isCourseItem && jobItem.whatsapp)) && (
          <div className="mt-7 flex flex-wrap gap-3">
            {externalUrl && (
              <a
                href={externalUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-ink px-5 py-3 text-sm font-extrabold text-brand-white no-underline"
              >
                {isCourseItem ? "Acessar plataforma" : "Candidatar-se"}
              </a>
            )}
            {!isCourseItem && jobItem.whatsapp && (
              <a
                href={`https://wa.me/${jobItem.whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border-2 border-ink px-5 py-3 text-sm font-extrabold text-ink no-underline"
              >
                Falar no WhatsApp
              </a>
            )}
          </div>
        )}
      </article>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-paper p-3">
      <strong className="block text-xs text-brand-blue">{label}</strong>
      <span className="text-sm">{value || "Não informado"}</span>
    </div>
  );
}
function JobInfo({ item }: { item: Job }) {
  return (
    <div className="mt-5 space-y-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Info label="Localização" value={item.location} />
        <Info label="Modalidade" value={item.modality} />
        <Info label="Salário" value={item.salary ?? ""} />
      </div>
      <List title="Requisitos" values={item.requirements} />
      <List title="Benefícios" values={item.benefits} />
    </div>
  );
}
function List({ title, values }: { title: string; values: string[] }) {
  return values.length ? (
    <div>
      <h3 className="font-sans text-base font-extrabold">{title}</h3>
      <ul className="mt-2 list-disc pl-5 text-sm text-[#3a4560]">
        {values.map((value, index) => (
          <li key={`${value}-${index}`}>{value}</li>
        ))}
      </ul>
    </div>
  ) : null;
}
