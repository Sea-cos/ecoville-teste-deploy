import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Navigate, useNavigate, Link } from "react-router";
import LoginLogo from "../../assets/logo.png";

import "./Login.css";

function LoginPage() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nomeDeUsuario: usuario,
          senha: senha,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Login realizado com sucesso");
        console.log(response);
        localStorage.setItem("tipoPerfil", data.perfil);
        localStorage.setItem("user", usuario);
        localStorage.setItem("senha", senha);
        localStorage.setItem("userID", data.id);
        navigate("/home");
      } else {
        toast.warning("Credenciais inválidas!!");
      }

      console.log("Resposta:", data);
    } catch (error) {
      console.log(error);

      toast.error("Erro no consumo da api");
    }
  };

  return (
    <div className="cadastro-container">
      <div className="cadastro-box-lg">
        <div className="cadastro-banner">
          <img className src="/imagem.avif" alt="Banner" />
        </div>
        <div className="cadastro-form">
          <img
            src={LoginLogo}
            alt="logo"
            style={{
              width: 50,
              height: 50,
              borderRadius: 12,
              marginBottom: 16,
            }}
          />
          <h2>
            Bem vindo ao <span style={{ color: "#28a745" }}>EcoVille!</span>
          </h2>
          <p>Gerenciamento eficaz de suas coletas.</p>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <button type="submit">Acessar</button>
          </form>
          <div style={{ marginTop: 16 }}>
            <Link to="/criar-conta" className="btn-secundario">
              Criar conta
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
