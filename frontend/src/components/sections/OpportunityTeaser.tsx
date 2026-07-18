import { LockIcon, BriefcaseIcon, GraduationCapIcon } from "lucide-react";

interface OpportunityTeaserProps {
  isAuthenticated: boolean;
  onUnlock: () => void;
}

const mockJobs = [
  { id: 1, title: "Jovem Aprendiz Administrativo", company: "Ambev", location: "São Paulo, SP", salary: "R$ 900" },
  { id: 2, title: "Auxiliar de Logística", company: "Mercado Livre", location: "Osasco, SP", salary: "R$ 1.800" },
  { id: 3, title: "Atendimento ao Cliente", company: "NuBank", location: "Remoto", salary: "R$ 2.100" },
];

const mockCourses = [
  { id: 1, title: "Gestão de Tempo e Produtividade", provider: "Sebrae", duration: "10h", level: "Iniciante" },
  { id: 2, title: "Informática Básica", provider: "Fundação Bradesco", duration: "20h", level: "Iniciante" },
  { id: 3, title: "Comunicação Efetiva", provider: "Senai", duration: "15h", level: "Intermediário" },
];

export function OpportunityTeaser({ isAuthenticated, onUnlock }: OpportunityTeaserProps) {
  return (
    <section className="py-20 px-[6vw] bg-gray-50 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-ink mb-4">
            Mural de Oportunidades
          </h2>
          <p className="text-lg text-[#3a4560] max-w-2xl mx-auto">
            Mais de 50 vagas de emprego e cursos de capacitação esperando por você na sua região.
          </p>
        </div>

        <div className="relative">
          {/* Container com blur se não estiver logado */}
          <div className={`grid md:grid-cols-2 gap-12 transition-all duration-500 ${!isAuthenticated ? 'blur-[6px] pointer-events-none select-none opacity-60' : ''}`}>
            
            {/* Vagas */}
            <div id="vagas">
              <div className="flex items-center gap-3 mb-8">
                <BriefcaseIcon className="w-6 h-6 text-brand-red" />
                <h3 className="text-2xl font-bold text-ink">Vagas em Destaque</h3>
              </div>
              <div className="flex flex-col gap-4">
                {mockJobs.map(job => (
                  <div key={job.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center hover:shadow-md transition-shadow">
                    <div>
                      <h4 className="font-bold text-lg text-ink">{job.title}</h4>
                      <p className="text-gray-500 text-sm mt-1">{job.company} • {job.location}</p>
                    </div>
                    <div className="text-right">
                      <span className="bg-green-100 text-green-700 font-bold px-3 py-1 rounded-full text-sm">{job.salary}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cursos */}
            <div id="cursos">
              <div className="flex items-center gap-3 mb-8">
                <GraduationCapIcon className="w-6 h-6 text-brand-yellow" />
                <h3 className="text-2xl font-bold text-ink">Cursos Recomendados</h3>
              </div>
              <div className="flex flex-col gap-4">
                {mockCourses.map(course => (
                  <div key={course.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center hover:shadow-md transition-shadow">
                    <div>
                      <h4 className="font-bold text-lg text-ink">{course.title}</h4>
                      <p className="text-gray-500 text-sm mt-1">{course.provider}</p>
                    </div>
                    <div className="text-right flex flex-col items-end gap-2">
                      <span className="bg-blue-100 text-blue-700 font-semibold px-3 py-1 rounded-full text-xs">{course.level}</span>
                      <span className="text-gray-400 text-xs font-medium">{course.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Overlay Paywall */}
          {!isAuthenticated && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 text-center">
              <div className="bg-white/90 backdrop-blur-sm p-10 rounded-3xl shadow-xl border border-gray-100 max-w-md transform transition-transform hover:scale-105">
                <div className="w-16 h-16 bg-brand-yellow rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                  <LockIcon className="w-8 h-8 text-ink" />
                </div>
                <h3 className="text-2xl font-bold text-ink mb-4 font-serif">
                  Acesso Exclusivo
                </h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Crie sua conta gratuitamente agora mesmo para revelar as vagas, se candidatar e acessar os cursos gratuitos mapeados para o seu perfil.
                </p>
                <button
                  onClick={onUnlock}
                  className="w-full bg-brand-red text-white font-bold text-lg py-4 px-8 rounded-full shadow-lg hover:bg-red-600 hover:shadow-xl transition-all"
                >
                  Criar Conta Grátis
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
