export function Stats() {
  return (
    <div className="bg-ink text-brand-white py-[50px] px-[6vw] grid grid-cols-1 md:grid-cols-3 gap-[30px] text-center">
      <div>
        <div className="font-serif font-black text-[44px] text-brand-yellow">38%</div>
        <div className="text-[14px] opacity-85 mt-1.5">de jovens de 18-24 anos desempregados no Nordeste (referência regional)</div>
      </div>
      <div>
        <div className="font-serif font-black text-[44px] text-brand-yellow">1 em 3</div>
        <div className="text-[14px] opacity-85 mt-1.5">vagas locais fecham por falta de candidato qualificado</div>
      </div>
      <div>
        <div className="font-serif font-black text-[44px] text-brand-yellow">R$ 0</div>
        <div className="text-[14px] opacity-85 mt-1.5">custo pro jovem: toda a trilha usa cursos já gratuitos</div>
      </div>
    </div>
  );
}
