import type { Course } from '../../services/catalog';

interface CoursesListProps { courses: Course[]; loading: boolean; error?: string; onSelect: (course: Course) => void; }

export function CoursesList({ courses, loading, error, onSelect }: CoursesListProps) {
  return <section className="py-[80px] px-[6vw] bg-brand-white" id="cursos">
    <div className="text-[13px] font-extrabold tracking-[1.5px] uppercase text-brand-red mb-3">Cursos gratuitos</div>
    <h2 className="text-[clamp(26px,3.5vw,38px)] max-w-[640px] mb-6">Capacitação para o seu próximo passo.</h2>
    {error && <p role="alert" className="mb-5 rounded-xl bg-[#fbe7e8] p-4 text-brand-red">{error}</p>}
    {loading ? <p className="text-[#5a6480]">Carregando cursos...</p> : courses.length === 0 ? <p className="text-[#5a6480]">Nenhum curso disponível no momento.</p> : <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-5">
      {courses.map((course) => <button key={course.id} onClick={() => onSelect(course)} className="overflow-hidden text-left bg-paper rounded-[16px] border border-solid border-[#e7e0d0] cursor-pointer hover:border-brand-yellow transition-colors">
        {course.image && <img src={course.image} alt="" className="h-36 w-full object-cover" />}
        <div className="p-6"><div className="text-[12px] font-extrabold text-brand-red uppercase">{course.institution || 'Instituição parceira'}</div><h3 className="text-[18px] my-2 font-sans font-bold">{course.title || 'Curso'}</h3><p className="text-[13px] text-[#5a6480] line-clamp-2">{course.description}</p><div className="mt-4 flex gap-2 text-[12px] font-bold text-brand-green">{course.workload && <span>{course.workload}</span>}{course.category && <span>· {course.category}</span>}</div></div>
      </button>)}
    </div>}
  </section>;
}
