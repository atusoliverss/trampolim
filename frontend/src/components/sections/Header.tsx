export function Header() {
  return (
    <header className="px-[6vw] py-5 flex justify-between items-center">
      <div className="font-serif font-black text-[22px] tracking-[-0.5px]">
        Trampol<span className="text-brand-red">i</span>m
      </div>
      <nav className="hidden md:block">
        <a href="#como-funciona" className="text-ink no-underline font-semibold text-[14px] ml-7">Como funciona</a>
        <a href="#diagnostico" className="text-ink no-underline font-semibold text-[14px] ml-7">Diagnóstico</a>
        <a href="#vagas" className="text-ink no-underline font-semibold text-[14px] ml-7">Vagas</a>
      </nav>
    </header>
  );
}
