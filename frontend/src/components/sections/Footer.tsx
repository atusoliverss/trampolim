import {
  GraduationCap,
  BriefcaseBusiness,
  Mail,
  MapPin,
} from "lucide-react";

export function Footer() {
  return (
    <>
      {/* CTA */}

      <section className="bg-[#F7F3EA] py-24 px-6">

        <div className="max-w-7xl mx-auto">

          <div className="rounded-[40px] overflow-hidden bg-gradient-to-r from-brand-blue via-brand-green to-brand-blue text-white shadow-2xl">

            <div className="grid lg:grid-cols-2 gap-12 items-center p-12">

              <div>

                <span className="inline-flex rounded-full bg-white/20 px-4 py-2 font-bold text-sm">

                  Sua jornada começa agora

                </span>

                <h2 className="font-serif text-5xl font-black mt-8 leading-tight">

                  Transforme conhecimento

                  <br />

                  em oportunidade.

                </h2>

                <p className="mt-6 text-lg opacity-90 max-w-xl leading-8">

                  O Trampolim conecta pessoas, empresas e instituições
                  para acelerar a empregabilidade através da qualificação
                  profissional.

                </p>

              </div>

              <div className="grid grid-cols-2 gap-6">

                <div className="rounded-3xl bg-white/10 backdrop-blur p-6">

                  <GraduationCap size={36} />

                  <h3 className="mt-5 font-bold text-xl">

                    Cursos

                  </h3>

                  <p className="mt-3 opacity-80">

                    Trilhas gratuitas de capacitação.

                  </p>

                </div>

                <div className="rounded-3xl bg-white/10 backdrop-blur p-6">

                  <BriefcaseBusiness size={36} />

                  <h3 className="mt-5 font-bold text-xl">

                    Vagas

                  </h3>

                  <p className="mt-3 opacity-80">

                    Empresas procurando talentos.

                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* FOOTER */}

      <footer className="bg-[#10243D] text-white">

        <div className="max-w-7xl mx-auto px-6 py-20">

          <div className="grid lg:grid-cols-4 gap-14">

            {/* Marca */}

            <div>

              <h2 className="font-serif text-4xl font-black">

                Trampol

                <span className="text-brand-yellow">

                  i

                </span>

                m

              </h2>

              <p className="mt-6 text-white/70 leading-8">

                Plataforma inteligente que aproxima pessoas,
                empresas e oportunidades através da educação
                e da tecnologia.

              </p>

            </div>

            {/* Produto */}

            <div>

              <h3 className="font-bold text-lg mb-6">

                Produto

              </h3>

              <ul className="space-y-4 text-white/70">

                <li>
                  Diagnóstico Inteligente
                </li>

                <li>
                  Cursos Gratuitos
                </li>

                <li>
                  Vagas
                </li>

                <li>
                  Dashboard
                </li>

              </ul>

            </div>

            {/* Projeto */}

            <div>

              <h3 className="font-bold text-lg mb-6">

                Projeto

              </h3>

              <ul className="space-y-4 text-white/70">

                <li>
                  Sobre
                </li>

                <li>
                  Parceiros
                </li>

                <li>
                  Prefeituras
                </li>

                <li>
                  Empresas
                </li>

              </ul>

            </div>

            {/* Contato */}

            <div>

              <h3 className="font-bold text-lg mb-6">

                Contato

              </h3>

              <div className="space-y-5">

                <div className="flex items-center gap-3 text-white/70">

                  <Mail size={18} />

                  contato@trampolim.app

                </div>

                <div className="flex items-center gap-3 text-white/70">

                  <MapPin size={18} />

                  Irecê • Bahia

                </div>

              </div>

            </div>

          </div>

          <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">

            <p className="text-white/60 text-sm">

              © 2026 Trampolim • Projeto de inovação social.

            </p>

            <div className="flex items-center gap-8 text-white/60 text-sm">

              <span>
                Privacidade
              </span>

              <span>
                Termos
              </span>

              <span>
                Cookies
              </span>

            </div>

          </div>

        </div>

      </footer>
    </>
  );
}