import { useEffect, useState } from "react";
import { useAuth } from "../../features/auth/useAuth";
import { Link } from "react-router-dom";
import {
  Menu,
  X,
  ArrowRight,
} from "lucide-react";

interface HeaderProps {
  onOpenLogin?: () => void;
  onOpenRegister?: () => void;
}

export function Header({ onOpenLogin, onOpenRegister }: HeaderProps) {
  const { isAuthenticated, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
const [mobileOpen, setMobileOpen] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 20);
  };

  window.addEventListener("scroll", handleScroll);

  return () =>
    window.removeEventListener("scroll", handleScroll);
}, []);

  return (
      <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
      ? "backdrop-blur-xl bg-white/80 shadow-lg border-b border-slate-200"
      : "bg-transparent"
      }`}
      >

      <div className="max-w-7xl mx-auto px-6">

      <div className="h-20 flex items-center justify-between">

      {/* LOGO */}

      <Link
      to="/"
      className="font-serif text-3xl font-black tracking-tight"
      >

      Trampol

      <span className="text-brand-red">

      i

      </span>

      m

      </Link>

      {/* MENU DESKTOP */}

      <nav className="hidden lg:flex items-center gap-10">

      <a
      href="#como-funciona"
      className="font-semibold text-slate-700 hover:text-brand-red transition"
      >
      Como funciona
      </a>

      <a
      href="#diagnostico"
      className="font-semibold text-slate-700 hover:text-brand-red transition"
      >
      Diagnóstico
      </a>

      <a
      href="#vagas"
      className="font-semibold text-slate-700 hover:text-brand-red transition"
      >
      Vagas
      </a>

      {isAuthenticated && (

      <Link
      to="/dashboard"
      className="font-semibold text-slate-700 hover:text-brand-red transition"
      >

      Dashboard

      </Link>

      )}

      </nav>

      {/* BOTÕES */}

      <div className="hidden lg:flex items-center gap-4">

      {isAuthenticated ? (

      <button
      onClick={logout}
      className="font-semibold text-slate-600 hover:text-black transition"
      >

      Sair

      </button>

      ) : (

      <>

      <button
      onClick={onOpenLogin}
      className="font-semibold text-slate-700 hover:text-brand-red transition"
      >

      Entrar

      </button>

      <button
      onClick={onOpenRegister}
      className="rounded-full bg-brand-red hover:bg-red-700 text-white px-6 py-3 font-bold flex items-center gap-2 transition"
      >

      Começar

      <ArrowRight size={18}/>

      </button>

      </>

      )}

      </div>

      {/* MOBILE */}

      <button
      onClick={() => setMobileOpen(!mobileOpen)}
      className="lg:hidden"
      >

      {mobileOpen ? <X /> : <Menu />}

      </button>

      </div>

      {mobileOpen && (

      <div className="lg:hidden bg-white border-t">

      <div className="flex flex-col p-6 gap-5">

      <a href="#como-funciona">

      Como funciona

      </a>

      <a href="#diagnostico">

      Diagnóstico

      </a>

      <a href="#vagas">

      Vagas

      </a>

      {isAuthenticated && (

      <Link to="/dashboard">

      Dashboard

      </Link>

      )}

      {isAuthenticated ? (

      <button
      onClick={logout}
      className="text-left"
      >

      Sair

      </button>

      ) : (

      <>

      <button
      onClick={onOpenLogin}
      className="text-left"
      >

      Entrar

      </button>

      <button
      onClick={onOpenRegister}
      className="rounded-full bg-brand-red text-white py-3 font-bold mt-2"
      >

      Criar conta

      </button>

      </>

      )}

      </div>

      </div>

      )}

      </div>

      </header>
    );
}
