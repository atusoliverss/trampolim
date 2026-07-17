import { Link } from 'react-router-dom';
import { useAuth } from '../../features/auth/AuthContext';

export function Header() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="px-[6vw] py-5 flex justify-between items-center">
      <div className="font-serif font-black text-[22px] tracking-[-0.5px]">
        Trampol<span className="text-brand-red">i</span>m
      </div>
      <nav className="hidden md:flex items-center">
        <a href="#como-funciona" className="text-ink no-underline font-semibold text-[14px] ml-7">Como funciona</a>
        <a href="#diagnostico" className="text-ink no-underline font-semibold text-[14px] ml-7">Diagnóstico</a>
        <a href="#vagas" className="text-ink no-underline font-semibold text-[14px] ml-7">Vagas</a>
        
        <div className="ml-10 flex items-center gap-4 border-l border-gray-200 pl-6">
          {isAuthenticated ? (
            <button 
              onClick={logout}
              className="text-gray-600 hover:text-gray-900 font-semibold text-[14px]"
            >
              Sair
            </button>
          ) : (
            <>
              <Link to="/login" className="text-ink no-underline font-semibold text-[14px]">
                Entrar
              </Link>
              <Link to="/cadastro" className="bg-brand-red text-white px-4 py-2 rounded-full font-semibold text-[14px] hover:bg-red-600 transition-colors">
                Cadastre-se
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
