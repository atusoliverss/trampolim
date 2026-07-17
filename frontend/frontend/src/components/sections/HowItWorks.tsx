export function HowItWorks() {
  return (
    <section className="py-[80px] px-[6vw]" id="como-funciona">
      <div className="text-[13px] font-extrabold tracking-[1.5px] uppercase text-brand-red mb-3">
        Como funciona
      </div>
      <h2 className="text-[clamp(26px,3.5vw,38px)] max-w-[640px] mb-11">
        Três passos, do diagnóstico ao primeiro contato com a vaga.
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[26px]">
        <div className="bg-brand-white rounded-[18px] p-[30px_26px] border-t-[6px] border-solid border-brand-yellow">
          <div className="font-serif font-black text-[15px] text-[#a5a08f] mb-3.5">passo um</div>
          <h3 className="text-[20px] mb-2.5">Diagnóstico rápido</h3>
          <p className="text-[15px] text-[#3a4560]">5 perguntas sobre o que você já sabe fazer, seu tempo disponível e sua região.</p>
        </div>
        <div className="bg-brand-white rounded-[18px] p-[30px_26px] border-t-[6px] border-solid border-brand-green">
          <div className="font-serif font-black text-[15px] text-[#a5a08f] mb-3.5">passo dois</div>
          <h3 className="text-[20px] mb-2.5">Trilha sob medida</h3>
          <p className="text-[15px] text-[#3a4560]">Indicamos cursos gratuitos (SENAI, SEBRAE, Trilhas de Futuro) que fecham o que falta pro seu perfil.</p>
        </div>
        <div className="bg-brand-white rounded-[18px] p-[30px_26px] border-t-[6px] border-solid border-brand-blue">
          <div className="font-serif font-black text-[15px] text-[#a5a08f] mb-3.5">passo três</div>
          <h3 className="text-[20px] mb-2.5">Conexão com vaga</h3>
          <p className="text-[15px] text-[#3a4560]">Ao concluir, seu perfil entra na lista de candidatos pra vagas de empresas parceiras da região.</p>
        </div>
      </div>
    </section>
  );
}
