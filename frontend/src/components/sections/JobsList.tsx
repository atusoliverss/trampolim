import type { Job } from '../../services/catalog';

interface JobsListProps { jobs: Job[]; loading: boolean; error?: string; onSelect: (job: Job) => void; }

export function JobsList({ jobs, loading, error, onSelect }: JobsListProps) {
  return <section className="py-[80px] px-[6vw]" id="vagas">
    <div className="text-[13px] font-extrabold tracking-[1.5px] uppercase text-brand-red mb-3">Vagas parceiras</div>
    <h2 className="text-[clamp(26px,3.5vw,38px)] max-w-[640px] mb-6">Empresas da região com vaga aberta agora.</h2>
    {error && <p role="alert" className="mb-5 rounded-xl bg-[#fbe7e8] p-4 text-brand-red">{error}</p>}
    {loading ? <p className="text-[#5a6480]">Carregando vagas...</p> : jobs.length === 0 ? <p className="text-[#5a6480]">Nenhuma vaga disponível no momento.</p> : <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-5">
      {jobs.map((job) => <button key={job.id} onClick={() => onSelect(job)} className="text-left bg-brand-white rounded-[16px] p-6 border border-solid border-[#e7e0d0] cursor-pointer hover:border-brand-yellow transition-colors"><div className="text-[12px] font-extrabold text-brand-blue uppercase">{job.company || 'Empresa parceira'}</div><h3 className="text-[18px] my-2 font-sans font-bold">{job.title || 'Vaga'}</h3><p className="text-[13px] text-[#5a6480] mb-3.5">{[job.location, job.modality].filter(Boolean).join(' · ') || 'Localização a confirmar'}</p>{job.salary && <span className="inline-block bg-[#e9f5ee] text-brand-green font-extrabold text-[12px] px-3 py-[5px] rounded-full">{job.salary}</span>}</button>)}
    </div>}
  </section>;
}
