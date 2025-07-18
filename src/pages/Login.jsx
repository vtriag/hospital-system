import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import HeroSection from "../components/HeroSection";

function Login() {
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [tipo, setTipo] = useState("paciente");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const nomeRef = useRef(null);

  const sectionRef = useRef(null);

  useEffect(() => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!nome.trim()) newErrors.nome = "Por favor, digite seu nome";
    if (!senha.trim()) newErrors.senha = "Por favor, digite sua senha";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!validate()) return;

    if (senha !== "1234") {
      setErrors({ senha: "Senha incorreta" });
      return;
    }

    localStorage.setItem("usuario", JSON.stringify({ nome, tipo }));

    if (tipo === "paciente") {
      navigate("/PatientRegistration");
    } else if (tipo === "medico") {
      localStorage.setItem("usuario", JSON.stringify({ nome, tipo, pacientes: [] }));
      navigate("/Doctor");
    }
  };

  return (
    <>
      <HeroSection
        title="Login"
        subtitle={`Acesse sua conta para continuar.
                  Seu espaço está aqui esperando por você!`}
        iconName="mdi:login"
      />

      <main className="flex items-center justify-center min-h-screen p-6 bg-gray-100 font-inter">
        <section className="w-full max-w-4xl p-10 bg-white border-2 border-blue-600 shadow-md rounded-2xl">

          <form onSubmit={handleLogin} className="max-w-lg mx-auto space-y-8 text-base" noValidate>
            {/* Nome */}
            <div className="relative p-4 border-2 border-blue-600 rounded-2xl">
              <label htmlFor="nome" className="absolute px-1 text-sm font-semibold text-blue-600 bg-white select-none -top-3 left-4">
                Nome de usuário *
              </label>
              <input
                type="text"
                id="nome"
                placeholder="Digite seu nome"
                className={`w-full text-base text-blue-900 placeholder-blue-400 bg-transparent border-none outline-none ${errors.nome ? "border-red-500" : ""}`}
                autoComplete="username"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                ref={nomeRef}
              />
              {errors.nome && <p className="mt-1 text-sm text-red-600">{errors.nome}</p>}
            </div>

            {/* Senha */}
            <div className="relative p-4 border-2 border-blue-600 rounded-2xl">
              <label htmlFor="senha" className="absolute px-1 text-sm font-semibold text-blue-600 bg-white select-none -top-3 left-4">
                Senha *
              </label>
              <input
                type="password"
                id="senha"
                placeholder="Digite sua senha"
                className={`w-full text-base text-blue-900 placeholder-blue-400 bg-transparent border-none outline-none ${errors.senha ? "border-red-500" : ""}`}
                autoComplete="current-password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
              {errors.senha && <p className="mt-1 text-sm text-red-600">{errors.senha}</p>}
            </div>

            {/* Tipo de usuário */}
            <div className="relative p-4 border-2 border-blue-600 rounded-2xl">
              <label htmlFor="tipo" className="absolute px-1 text-sm font-semibold text-blue-600 bg-white select-none -top-3 left-4">
                Tipo de usuário
              </label>
              <select id="tipo" className="w-full text-base text-blue-900 bg-transparent border-none outline-none" value={tipo} onChange={(e) => setTipo(e.target.value)}>
                <option value="paciente">Paciente</option>
                <option value="medico">Médico</option>
              </select>
            </div>

            {/* Botão */}
            <button type="submit" className="w-full py-4 font-semibold text-white transition-colors duration-300 bg-blue-600 hover:bg-blue-700 rounded-2xl">
              Entrar
            </button>
          </form>
        </section>
      </main>
    </>
  );
}

export default Login;
