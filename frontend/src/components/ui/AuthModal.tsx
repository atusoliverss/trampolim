import { useState, useEffect } from "react";
import { useAuth } from "../../features/auth/useAuth";

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

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
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
          "http://localhost:8080/api/auth/cadastro",
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

      // Login Automático (no caso do cadastro) ou fluxo de Login normal
      const loginResponse = await fetch(
        "http://localhost:8080/api/auth/login",
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#182642]/20 p-4 backdrop-blur-sm"
    >
      <article
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
        onMouseDown={(event) => event.stopPropagation()}
        className="w-full max-w-xl overflow-hidden rounded-[20px] bg-brand-white p-9 shadow-[0_20px_50px_-20px_rgba(24,38,66,0.25)]"
      >
        <div className="flex justify-between items-start mb-6">
          <h2
            id="auth-modal-title"
            className="text-[24px] font-serif leading-tight"
          >
            {context === "diagnostic" ? "Descubra o seu próximo passo" : "Bem-vindo ao Trampolim"}
          </h2>
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="h-9 w-9 shrink-0 rounded-full border border-[#e7e0d0] bg-paper text-xl cursor-pointer ml-4"
          >
            ×
          </button>
        </div>

        <p className="text-[#3a4560] text-sm mb-6">
          {context === "diagnostic"
            ? "Para revelar seus resultados exclusivos de vagas e cursos, crie uma conta gratuita ou faça login. O Trampolim usa seu perfil para mapear as melhores oportunidades para você!"
            : "Acesse sua conta ou cadastre-se gratuitamente para explorar cursos e vagas ideais para o seu perfil profissional."}
        </p>

        <div className="flex bg-[#e7e0d0] p-1 rounded-full mb-6">
          <button
            onClick={() => setMode("register")}
            className={`flex-1 py-2 text-sm font-bold rounded-full transition-colors ${
              mode === "register"
                ? "bg-brand-white text-ink shadow-sm"
                : "text-[#5a6480] hover:text-ink"
            }`}
          >
            Criar Conta
          </button>
          <button
            onClick={() => setMode("login")}
            className={`flex-1 py-2 text-sm font-bold rounded-full transition-colors ${
              mode === "login"
                ? "bg-brand-white text-ink shadow-sm"
                : "text-[#5a6480] hover:text-ink"
            }`}
          >
            Entrar
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && (
            <div className="bg-red-50 border border-brand-red text-brand-red px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          {mode === "register" && (
            <div>
              <label
                htmlFor="nome"
                className="block text-sm font-bold text-brand-blue mb-1"
              >
                Nome completo
              </label>
              <input
                id="nome"
                type="text"
                required
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full px-4 py-3 border border-[#e7e0d0] rounded-xl focus:outline-none focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow"
                placeholder="Seu nome"
              />
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-bold text-brand-blue mb-1"
            >
              E-mail
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-[#e7e0d0] rounded-xl focus:outline-none focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label
              htmlFor="senha"
              className="block text-sm font-bold text-brand-blue mb-1"
            >
              Senha
            </label>
            <input
              id="senha"
              type="password"
              required
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full px-4 py-3 border border-[#e7e0d0] rounded-xl focus:outline-none focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow"
              placeholder="••••••••"
            />
          </div>

          {mode === "register" && (
            <div>
              <label
                htmlFor="confirmarSenha"
                className="block text-sm font-bold text-brand-blue mb-1"
              >
                Confirmar senha
              </label>
              <input
                id="confirmarSenha"
                type="password"
                required
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                className="w-full px-4 py-3 border border-[#e7e0d0] rounded-xl focus:outline-none focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow"
                placeholder="••••••••"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 rounded-full bg-brand-yellow text-ink px-5 py-3.5 text-sm font-extrabold shadow-sm hover:bg-yellow-400 focus:outline-none disabled:opacity-50"
          >
            {loading 
              ? "Aguarde..." 
              : mode === "register" 
                ? (context === "diagnostic" ? "Cadastrar e Ver Resultados" : "Cadastrar") 
                : (context === "diagnostic" ? "Entrar e Ver Resultados" : "Entrar")
            }
          </button>
        </form>
      </article>
    </div>
  );
}
