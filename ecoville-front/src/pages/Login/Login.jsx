import React, { useState } from "react";
import plantaLogin from "../../assets/planta-login.jpg";
import { ToastContainer, toast } from "react-toastify";
import { Navigate, useNavigate, Link } from "react-router";
import LoginLogo from "../../assets/logo.png";

import "./Login.css"

function LoginPage() {

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
     e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          senha: senha,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Login realizado com sucesso");
        // TODO: Armazenar o tipo de usuário no localStorage quando o backend retornar essa informação (ver issue #10)
        localStorage.setItem("usuarioID", data.usuario.id); 
        navigate("/dashboard");
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
          <img src={plantaLogin} alt="Banner" />
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
            Bem vindo ao <span style={{ color: "#28a745" }}>Recicla365!</span>
          </h2>
          <p>Sua plataforma de gerenciamento sustentável.</p>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            <Link to="/criar-conta">Criar conta</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
