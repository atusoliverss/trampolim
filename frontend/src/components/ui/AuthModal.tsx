import { useState, useEffect } from "react";
import { useAuth } from "../../features/auth/useAuth";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";

interface AuthModalProps {
  onClose: () => void;
  onSuccess: () => void;
  initialMode?: "login" | "register";
  context?: "diagnostic" | "default";
}

export function AuthModal({ onClose, onSuccess, initialMode = "register", context = "default" }: AuthModalProps) {
  const { login } = useAuth();
  const [mode, setMode] = useState<"login" | "register">(initialMode);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "register") {
        if (senha !== confirmarSenha) {
          setError("As senhas não coincidem");
          setLoading(false);
          return;
        }

        // Fluxo de Cadastro
        const registerResponse = await fetch(
          "/api/auth/cadastro",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome, email, senha, role: "USER" }),
          },
        );

        if (!registerResponse.ok) {
          const text = await registerResponse.text();
          throw new Error(text || "Erro ao realizar o cadastro");
        }
      }

      const loginResponse = await fetch(
        "/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, senha }),
        },
      );

      if (!loginResponse.ok) {
        throw new Error("Credenciais inválidas");
      }

      const data = await loginResponse.json();
      login(data.token);
      onSuccess();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
  <div
    role="presentation"
    onMouseDown={onClose}
    className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 backdrop-blur-md p-5"
  >
    <article
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
      onMouseDown={(event) => event.stopPropagation()}
      className="relative w-full max-w-5xl overflow-hidden rounded-[32px] bg-white shadow-[0_45px_120px_rgba(15,23,42,.35)]"
    >
      <div className="grid min-h-[600px] lg:grid-cols-[1fr_480px]">

        {/* ========================================= */}
        {/* LADO ESQUERDO                             */}
        {/* ========================================= */}

        <aside className="relative hidden overflow-hidden bg-gradient-to-br from-brand-blue via-[#174d73] to-brand-green lg:flex">

          <div className="absolute inset-0">

            <div className="absolute -top-20 -right-16 h-72 w-72 rounded-full bg-brand-yellow/15 blur-3xl" />

            <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-white/5 blur-3xl" />

            <div className="absolute top-1/3 left-10 h-40 w-40 rounded-full border border-white/10" />

          </div>

          <div className="relative flex h-full flex-col justify-between p-10 text-white">

            <div>

              <span className="inline-flex items-center rounded-full bg-white/15 px-5 py-2 text-xs font-bold uppercase tracking-[2px] backdrop-blur">

                Plataforma Inteligente

              </span>

              <h1 className="mt-8 font-serif text-5xl font-black leading-[1.05]">

                Descubra
                <br />
                seu próximo
                <br />
                emprego.

              </h1>

              <p className="mt-8 max-w-md text-lg leading-8 text-white/85">

                O Trampolim conecta pessoas,
                empresas e oportunidades por
                meio de inteligência, qualificação
                e empregabilidade.

              </p>

            </div>

            <div className="space-y-5">

              <div className="rounded-3xl bg-white/10 p-6 backdrop-blur">

                <div className="mb-2 text-xl font-bold">

                  Diagnóstico Inteligente

                </div>

                <p className="leading-7 text-white/80">

                  Descubra automaticamente
                  quais áreas profissionais
                  combinam mais com você.

                </p>

              </div>

              <div className="rounded-3xl bg-white/10 p-6 backdrop-blur">

                <div className="mb-2 text-xl font-bold">

                  Recomendações Personalizadas

                </div>

                <p className="leading-7 text-white/80">

                  Cursos gratuitos e vagas
                  selecionadas conforme
                  seu perfil.

                </p>

              </div>

              <div className="rounded-3xl bg-white/10 p-6 backdrop-blur">

                <div className="mb-2 text-xl font-bold">

                  Empresas Parceiras

                </div>

                <p className="leading-7 text-white/80">

                  Conectamos você
                  diretamente com empresas
                  que realmente estão contratando.

                </p>

              </div>

            </div>

          </div>

        </aside>

        {/* ========================================= */}
        {/* LADO DIREITO                              */}
        {/* ========================================= */}

        <section className="relative flex flex-col justify-center p-8 lg:px-10 lg:py-8">

          <button
            onClick={onClose}
            aria-label="Fechar"
            className="absolute right-7 top-7 flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-xl transition hover:bg-slate-100"
          >
            ×
          </button>

          <span className="inline-flex w-fit rounded-full bg-brand-yellow/20 px-4 py-2 text-xs font-black uppercase tracking-[2px] text-brand-red">

            {mode === "register"
              ? "Criar Conta"
              : "Entrar"}

          </span>

          <h2
            id="auth-modal-title"
            className="mt-5 font-serif text-3xl font-black leading-tight text-slate-900"
          >
            {context === "diagnostic"
              ? "Veja seus resultados personalizados"
              : "Bem-vindo ao Trampolim"}
          </h2>

          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-slate-600">

            {context === "diagnostic"
              ? "Crie sua conta gratuitamente para desbloquear recomendações inteligentes de cursos e vagas compatíveis com seu perfil."
              : "Entre na plataforma ou crie sua conta gratuitamente para acessar oportunidades exclusivas."}

          </p>

          <div className="mt-6 flex rounded-full bg-slate-100 p-1">

            <button
              type="button"
              onClick={() => setMode("register")}
              className={`flex-1 rounded-full py-3 text-sm font-bold transition-all ${
                mode === "register"
                  ? "bg-white shadow text-brand-blue"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Criar Conta
            </button>

            <button
              type="button"
              onClick={() => setMode("login")}
              className={`flex-1 rounded-full py-3 text-sm font-bold transition-all ${
                mode === "login"
                  ? "bg-white shadow text-brand-blue"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Entrar
            </button>

          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-6 space-y-4"
          >
          {error && (
  <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
    {error}
  </div>
)}

{mode === "register" && (
  <div>
    <label
      htmlFor="nome"
      className="mb-2 block text-sm font-bold text-slate-700"
    >
      Nome completo
    </label>

    <div className="relative">

      <User
        size={18}
        className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <input
        id="nome"
        type="text"
        required
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="Digite seu nome completo"
        className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-14 pr-5 transition-all outline-none focus:border-brand-green focus:bg-white focus:ring-4 focus:ring-brand-green/10"
      />

    </div>
  </div>
)}

<div>

  <label
    htmlFor="email"
    className="mb-2 block text-sm font-bold text-slate-700"
  >
    E-mail
  </label>

  <div className="relative">

    <Mail
      size={18}
      className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
    />

    <input
      id="email"
      type="email"
      required
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="voce@email.com"
      className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-14 pr-5 transition-all outline-none focus:border-brand-green focus:bg-white focus:ring-4 focus:ring-brand-green/10"
    />

  </div>

</div>

<div>

  <label
    htmlFor="senha"
    className="mb-2 block text-sm font-bold text-slate-700"
  >
    Senha
  </label>

  <div className="relative">

    <Lock
      size={18}
      className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
    />

    <input
      id="senha"
      type={showPassword ? "text" : "password"}
      required
      value={senha}
      onChange={(e) => setSenha(e.target.value)}
      placeholder="••••••••"
      className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-14 pr-14 transition-all outline-none focus:border-brand-green focus:bg-white focus:ring-4 focus:ring-brand-green/10"
    />

    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-brand-blue transition"
    >
      {showPassword ? (
        <EyeOff size={20} />
      ) : (
        <Eye size={20} />
      )}
    </button>

  </div>

</div>

{mode === "register" && (

  <div>

    <label
      htmlFor="confirmarSenha"
      className="mb-2 block text-sm font-bold text-slate-700"
    >
      Confirmar senha
    </label>

    <div className="relative">

      <Lock
        size={18}
        className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <input
        id="confirmarSenha"
        type={showConfirmPassword ? "text" : "password"}
        required
        value={confirmarSenha}
        onChange={(e) => setConfirmarSenha(e.target.value)}
        placeholder="Repita sua senha"
        className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-14 pr-14 transition-all outline-none focus:border-brand-green focus:bg-white focus:ring-4 focus:ring-brand-green/10"
      />

      <button
        type="button"
        onClick={() =>
          setShowConfirmPassword(!showConfirmPassword)
        }
        className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-brand-blue transition"
      >
        {showConfirmPassword ? (
          <EyeOff size={20} />
        ) : (
          <Eye size={20} />
        )}
      </button>

    </div>

  </div>

)}

<div className="pt-3">

  <button
    type="submit"
    disabled={loading}
    className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-brand-red via-[#d74b43] to-brand-yellow py-4 text-base font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-60"
  >
    {loading ? (
      <>
        <Loader2
          size={20}
          className="animate-spin"
        />
        Aguarde...
      </>
    ) : (
      <>
        {mode === "register"
          ? context === "diagnostic"
            ? "Cadastrar e Ver Resultados"
            : "Criar Conta"
          : context === "diagnostic"
            ? "Entrar e Ver Resultados"
            : "Entrar"}

        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          className="transition-transform duration-300 group-hover:translate-x-1"
        >
          <path
            d="M5 12H19"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />

          <path
            d="M13 6L19 12L13 18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </>
    )}
  </button>

</div>

{mode === "login" && (

  <div className="text-center">

    <button
      type="button"
      className="text-sm font-semibold text-brand-blue transition hover:text-brand-red"
    >
      Esqueceu sua senha?
    </button>

  </div>

)}

<div className="rounded-3xl bg-slate-50 p-5">

  <div className="flex items-start gap-3">

    <div className="mt-2 h-2.5 w-2.5 rounded-full bg-brand-green" />

    <p className="text-sm leading-7 text-slate-600">

      Seus dados são protegidos e utilizados
      exclusivamente para recomendar vagas,
      cursos e oportunidades compatíveis
      com seu perfil profissional.

    </p>

  </div>

</div>

<div className="border-t border-slate-200 pt-6">

  <p className="text-center text-sm leading-7 text-slate-500">

    Ao continuar você concorda com nossos

    <button
      type="button"
      className="mx-1 font-semibold text-brand-blue hover:text-brand-red"
    >
      Termos de Uso
    </button>

    e

    <button
      type="button"
      className="ml-1 font-semibold text-brand-blue hover:text-brand-red"
    >
      Política de Privacidade
    </button>

  </p>

</div>

</form>

</section>

</div>

</article>

</div>
);
}
