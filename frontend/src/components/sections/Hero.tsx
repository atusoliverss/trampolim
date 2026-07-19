import { Button } from "../ui/Button";

export function Hero() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });

  return (
    <section className="relative overflow-hidden bg-[#F7F3EA]">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-32 w-[500px] h-[500px] rounded-full bg-yellow-200/20 blur-3xl" />
        <div className="absolute bottom-0 -left-32 w-[400px] h-[400px] rounded-full bg-red-200/20 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-24">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Texto */}

          <div>

            <span className="inline-flex items-center rounded-full bg-yellow-100 text-[#182642] font-bold px-4 py-2 text-sm mb-8">
              Plataforma inteligente de qualificação profissional
            </span>

            <h1 className="font-serif font-black text-5xl lg:text-7xl leading-tight tracking-tight text-[#182642]">

              Sua qualificação

              <br />

              é a

              <span className="text-[#C2333B] underline decoration-[#F2B705] decoration-8 underline-offset-8">
                {" "}
                ponte{" "}
              </span>

              para seu emprego.
            </h1>

            <p className="mt-8 text-xl leading-9 text-slate-600 max-w-xl">
              Descubra suas habilidades, receba uma trilha personalizada de
              cursos gratuitos e encontre vagas compatíveis com o seu perfil.
            </p>

            <div className="flex flex-wrap gap-4 mt-10">

              <Button onClick={() => scrollTo("diagnostico")}>
                Fazer diagnóstico
              </Button>

              <Button
                variant="ghost"
                onClick={() => scrollTo("diagnostico")}
              >
                Explorar oportunidades
              </Button>

            </div>

            <div className="grid grid-cols-3 gap-6 mt-14">

              <div>
                <h3 className="text-4xl font-black text-[#182642]">
                  +250
                </h3>
                <p className="text-sm text-slate-500">
                  Cursos gratuitos
                </p>
              </div>

              <div>
                <h3 className="text-4xl font-black text-[#2F6E4F]">
                  +800
                </h3>
                <p className="text-sm text-slate-500">
                  Vagas disponíveis
                </p>
              </div>

              <div>
                <h3 className="text-4xl font-black text-[#C2333B]">
                  94%
                </h3>
                <p className="text-sm text-slate-500">
                  Match inteligente
                </p>
              </div>

            </div>

          </div>

          {/* Painel */}

          <div className="relative">

            <div className="rounded-3xl bg-white shadow-2xl border border-slate-200 overflow-hidden">

              <div className="bg-[#182642] text-white px-6 py-5">

                <h3 className="font-bold text-xl">
                  Diagnóstico Inteligente
                </h3>

                <p className="text-sm opacity-80 mt-1">
                  Perfil profissional em poucos minutos
                </p>

              </div>

              <div className="p-8 space-y-6">

                <div>

                  <div className="flex justify-between text-sm mb-2">
                    <span>Progresso</span>
                    <span>80%</span>
                  </div>

                  <div className="w-full bg-slate-200 rounded-full h-3">

                    <div className="bg-[#2F6E4F] h-3 rounded-full w-4/5" />

                  </div>

                </div>

                <div className="rounded-2xl bg-[#F7F3EA] p-5">

                  <h4 className="font-bold text-lg text-[#182642]">
                    Perfil encontrado
                  </h4>

                  <p className="text-slate-600 mt-2">
                    Atendimento & Vendas
                  </p>

                </div>

                <div className="space-y-4">

                  {[
                    "Atendimento ao Cliente",
                    "Operador de Caixa",
                    "Excel Básico",
                  ].map((curso) => (
                    <div
                      key={curso}
                      className="flex items-center justify-between rounded-xl border border-slate-200 px-5 py-4 hover:border-[#F2B705] transition"
                    >
                      <div>
                        <p className="font-semibold">{curso}</p>
                        <small className="text-slate-500">
                          Curso gratuito
                        </small>
                      </div>

                      <span className="bg-green-100 text-green-700 rounded-full px-3 py-1 text-xs font-bold">
                        Recomendado
                      </span>
                    </div>
                  ))}

                </div>

              </div>

            </div>

            <div className="absolute -top-6 -right-6 bg-[#F2B705] text-[#182642] rounded-full px-5 py-3 font-bold shadow-xl">
              IA
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}