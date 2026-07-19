const steps = [
  {
    number: "01",
    color: "bg-brand-yellow",
    badge: "Diagnóstico",
    title: "Descubra seu perfil profissional",
    description:
      "Responda algumas perguntas rápidas para identificarmos suas habilidades, interesses e nível de experiência.",
  },
  {
    number: "02",
    color: "bg-brand-green",
    badge: "Qualificação",
    title: "Receba uma trilha personalizada",
    description:
      "Nossa IA monta um plano de desenvolvimento utilizando cursos gratuitos do SENAI, SEBRAE, SENAC e parceiros.",
  },
  {
    number: "03",
    color: "bg-brand-blue",
    badge: "Oportunidades",
    title: "Conecte-se às empresas",
    description:
      "Ao concluir sua trilha, seu perfil é recomendado automaticamente para vagas compatíveis com suas competências.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="como-funciona"
      className="relative py-28 bg-[#F7F3EA] overflow-hidden"
    >
      {/* Background */}

      <div className="absolute inset-0 pointer-events-none">

        <div className="absolute left-0 top-0 w-80 h-80 rounded-full bg-yellow-200/20 blur-3xl" />

        <div className="absolute right-0 bottom-0 w-[420px] h-[420px] rounded-full bg-blue-200/20 blur-3xl" />

      </div>

      <div className="relative max-w-7xl mx-auto px-6">

        <div className="text-center max-w-3xl mx-auto">

          <span className="inline-flex px-4 py-2 rounded-full bg-brand-red/10 text-brand-red font-bold uppercase tracking-wider text-sm">
            Como funciona
          </span>

          <h2 className="font-serif text-5xl font-black text-ink mt-6 leading-tight">
            Da primeira resposta
            <br />
            até a contratação.
          </h2>

          <p className="mt-6 text-lg text-slate-600 leading-8">
            Desenvolvemos um processo simples para transformar pessoas em
            profissionais preparados para as oportunidades disponíveis na
            região.
          </p>

        </div>

        <div className="relative mt-24">

          {/* Linha */}

          <div className="hidden lg:block absolute top-16 left-[16%] right-[16%] h-[2px] bg-slate-200" />

          <div className="grid lg:grid-cols-3 gap-10">

            {steps.map((step) => (
              <div
                key={step.number}
                className="group relative rounded-3xl bg-white p-10 border border-slate-200 shadow-sm hover:shadow-2xl hover:-translate-y-3 transition-all duration-300"
              >
                {/* Número */}

                <div
                  className={`w-16 h-16 rounded-2xl ${step.color} flex items-center justify-center text-white font-black text-2xl shadow-lg`}
                >
                  {step.number}
                </div>

                {/* Badge */}

                <span className="inline-block mt-6 text-xs font-bold uppercase tracking-widest text-brand-red">
                  {step.badge}
                </span>

                {/* Título */}

                <h3 className="mt-3 text-2xl font-bold text-ink leading-snug">
                  {step.title}
                </h3>

                {/* Texto */}

                <p className="mt-5 text-slate-600 leading-8">
                  {step.description}
                </p>

                {/* Rodapé */}

                <div className="mt-8 flex items-center gap-3">

                  <div className="w-10 h-[3px] bg-brand-yellow rounded-full group-hover:w-20 transition-all duration-300" />

                  <span className="text-sm text-slate-400">
                    Etapa {step.number}
                  </span>

                </div>

              </div>
            ))}

          </div>

        </div>

        {/* Destaque */}

        <div className="mt-24 rounded-[36px] bg-gradient-to-r from-brand-yellow via-brand-red to-brand-blue p-[1px]">

          <div className="rounded-[35px] bg-white px-10 py-14">

            <div className="grid lg:grid-cols-2 gap-12 items-center">

              <div>

                <span className="inline-flex rounded-full bg-brand-green/10 px-4 py-2 text-brand-green font-bold text-sm">
                  Inteligência Artificial
                </span>

                <h3 className="font-serif text-4xl font-black text-ink mt-5">
                  Não mostramos apenas cursos.
                </h3>

                <p className="mt-6 text-slate-600 leading-8">
                  O Trampolim identifica competências, calcula o nível de
                  aderência às vagas e cria uma trilha personalizada para
                  aumentar suas chances de contratação.
                </p>

              </div>

              <div className="grid grid-cols-2 gap-6">

                <div className="rounded-2xl bg-[#F7F3EA] p-6 text-center">

                  <div className="text-5xl font-black text-brand-yellow">
                    IA
                  </div>

                  <p className="mt-3 text-slate-600">
                    Diagnóstico Inteligente
                  </p>

                </div>

                <div className="rounded-2xl bg-[#F7F3EA] p-6 text-center">

                  <div className="text-5xl font-black text-brand-green">
                    94%
                  </div>

                  <p className="mt-3 text-slate-600">
                    Match com vagas
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}