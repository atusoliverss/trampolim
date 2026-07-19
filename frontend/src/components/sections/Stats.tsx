const stats = [
  {
    value: "38%",
    title: "Jovens desempregados",
    description:
      "Entre 18 e 24 anos no Nordeste, segundo dados de referência utilizados pelo projeto.",
    color: "text-brand-yellow",
  },
  {
    value: "1 em 3",
    title: "Vagas sem candidatos",
    description:
      "Empresas deixam de contratar por falta de profissionais qualificados.",
    color: "text-brand-green",
  },
  {
    value: "R$ 0",
    title: "Investimento do candidato",
    description:
      "Toda a trilha é construída utilizando cursos gratuitos e parceiros.",
    color: "text-brand-red",
  },
];

export function Stats() {
  return (
    <section className="relative bg-ink py-24 overflow-hidden">

      {/* Background */}

      <div className="absolute inset-0 opacity-10">

        <div className="absolute -top-40 left-0 w-96 h-96 rounded-full bg-brand-yellow blur-3xl" />

        <div className="absolute bottom-0 right-0 w-[420px] h-[420px] rounded-full bg-brand-blue blur-3xl" />

      </div>

      <div className="relative max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <span className="inline-flex px-4 py-2 rounded-full bg-white/10 text-brand-yellow font-bold text-sm tracking-wide uppercase">
            O desafio
          </span>

          <h2 className="font-serif text-4xl lg:text-5xl font-black text-white mt-6">
            O mercado precisa de pessoas qualificadas.
          </h2>

          <p className="text-slate-300 mt-6 max-w-3xl mx-auto text-lg leading-8">
            O Trampolim conecta pessoas, cursos gratuitos e empresas em uma
            única plataforma, reduzindo a distância entre quem procura uma
            oportunidade e quem precisa contratar.
          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {stats.map((item) => (
            <div
              key={item.title}
              className="group rounded-3xl bg-white/5 backdrop-blur border border-white/10 p-8 hover:bg-white/10 hover:-translate-y-2 transition-all duration-300"
            >
              <div
                className={`font-serif text-6xl font-black ${item.color}`}
              >
                {item.value}
              </div>

              <h3 className="text-white text-xl font-bold mt-6">
                {item.title}
              </h3>

              <p className="text-slate-300 mt-4 leading-7">
                {item.description}
              </p>

              <div className="mt-8 h-1 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-brand-yellow rounded-full w-3/4 group-hover:w-full transition-all duration-700"
                />
              </div>

            </div>
          ))}

        </div>

        <div className="mt-20 rounded-[32px] bg-gradient-to-r from-brand-yellow via-brand-red to-brand-blue p-[1px]">

          <div className="rounded-[31px] bg-ink px-10 py-12 flex flex-col lg:flex-row items-center justify-between gap-8">

            <div>

              <h3 className="font-serif text-3xl text-white font-black">
                Qualificação inteligente.
              </h3>

              <p className="text-slate-300 mt-3 max-w-2xl leading-7">
                Nossa inteligência identifica o perfil do candidato,
                recomenda cursos gratuitos e apresenta vagas compatíveis
                com suas competências.
              </p>

            </div>

            <div className="grid grid-cols-2 gap-6">

              <div className="text-center">
                <div className="text-brand-yellow text-4xl font-black">
                  IA
                </div>
                <span className="text-slate-400 text-sm">
                  Diagnóstico
                </span>
              </div>

              <div className="text-center">
                <div className="text-brand-green text-4xl font-black">
                  Match
                </div>
                <span className="text-slate-400 text-sm">
                  Empresas
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}