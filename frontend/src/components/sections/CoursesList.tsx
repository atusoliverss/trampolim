import {
  GraduationCap,
  Clock3,
  ArrowRight,
} from "lucide-react";

import type { Course } from "../../services/catalog";

interface CoursesListProps {
  courses: Course[];
  loading: boolean;
  error?: string;
  onSelect: (course: Course) => void;
}

export function CoursesList({
  courses,
  loading,
  error,
  onSelect,
}: CoursesListProps) {

  if (loading)
    return (
      <p className="text-slate-500">
        Carregando cursos...
      </p>
    );

  if (error)
    return (
      <div className="rounded-2xl bg-red-50 border border-red-200 p-5 text-red-700">
        {error}
      </div>
    );

  if (!courses.length)
    return (
      <p className="text-slate-500">
        Nenhum curso encontrado.
      </p>
    );

  return (

    <div className="space-y-6">

      {courses.map((course)=>(

        <button
          key={course.id}
          onClick={()=>onSelect(course)}
          className="group w-full text-left rounded-3xl border border-slate-200 bg-[#FAFAF9] hover:bg-white hover:border-brand-yellow hover:shadow-xl transition-all duration-300 overflow-hidden"
        >

          {course.image && (

            <img
              src={course.image}
              alt=""
              className="h-48 w-full object-cover group-hover:scale-105 transition duration-500"
            />

          )}

          <div className="p-7">

            <div className="flex justify-between items-center">

              <span className="flex items-center gap-2 text-brand-red text-sm font-bold uppercase">

                <GraduationCap size={16}/>

                {course.institution || "Parceiro"}

              </span>

              {course.category && (

                <span className="rounded-full bg-brand-green/10 text-brand-green px-3 py-1 text-xs font-bold">

                  {course.category}

                </span>

              )}

            </div>

            <h3 className="text-2xl font-bold mt-5">

              {course.title}

            </h3>

            <p className="mt-4 text-slate-600 leading-7 line-clamp-3">

              {course.description}

            </p>

            <div className="flex justify-between items-center mt-8">

              <span className="flex items-center gap-2 text-slate-500">

                <Clock3 size={16}/>

                {course.workload || "Carga horária"}

              </span>

              <span className="flex items-center gap-2 font-bold text-brand-red">

                Ver detalhes

                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition"
                />

              </span>

            </div>

          </div>

        </button>

      ))}

    </div>

  );
}