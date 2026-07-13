export function JobsList() {
  return (
    <section className="py-[80px] px-[6vw]" id="vagas">
      <div className="text-[13px] font-extrabold tracking-[1.5px] uppercase text-brand-red mb-3">Vagas parceiras</div>
      <h2 className="text-[clamp(26px,3.5vw,38px)] max-w-[640px] mb-11">Empresas da região com vaga aberta agora.</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-5">
        <div className="bg-brand-white rounded-[16px] p-6 border border-solid border-[#e7e0d0]">
          <div className="text-[12px] font-extrabold text-brand-blue uppercase">Mercado Bom Preço</div>
          <h4 className="text-[18px] my-2 font-sans font-bold">Operador de caixa</h4>
          <div className="text-[13px] text-[#5a6480] mb-3.5">Irecê, BA · meio período</div>
          <span className="inline-block bg-[#e9f5ee] text-brand-green font-extrabold text-[12px] px-3 py-[5px] rounded-full">92% de match</span>
        </div>
        
        <div className="bg-brand-white rounded-[16px] p-6 border border-solid border-[#e7e0d0]">
          <div className="text-[12px] font-extrabold text-brand-blue uppercase">Padaria Trigo Dourado</div>
          <h4 className="text-[18px] my-2 font-sans font-bold">Atendente</h4>
          <div className="text-[13px] text-[#5a6480] mb-3.5">Irecê, BA · período integral</div>
          <span className="inline-block bg-[#e9f5ee] text-brand-green font-extrabold text-[12px] px-3 py-[5px] rounded-full">87% de match</span>
        </div>
        
        <div className="bg-brand-white rounded-[16px] p-6 border border-solid border-[#e7e0d0]">
          <div className="text-[12px] font-extrabold text-brand-blue uppercase">Auto Peças Sertão</div>
          <h4 className="text-[18px] my-2 font-sans font-bold">Assistente administrativo</h4>
          <div className="text-[13px] text-[#5a6480] mb-3.5">Irecê, BA · período integral</div>
          <span className="inline-block bg-[#e9f5ee] text-brand-green font-extrabold text-[12px] px-3 py-[5px] rounded-full">74% de match</span>
        </div>
      </div>
    </section>
  );
}
