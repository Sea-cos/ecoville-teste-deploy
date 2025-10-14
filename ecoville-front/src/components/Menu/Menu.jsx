import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import "./Menu.css"; // Importe o CSS

const Menu = () => {
  const navigate = useNavigate();
  const [perfil, setPerfil] = useState("");
  const handleLogout = () => {
    localStorage.removeItem("usuarioID");
    navigate("/");
  };

  useEffect(() => {
    const tipoPerfil = localStorage.getItem("tipoPerfil");
    setPerfil(tipoPerfil);
  }, []);

  return (
    <nav className="navbar">
      <ul className="nav-list">
        {perfil === "RESIDENCIAL" && (
          <li className="nav-item">
            <Link to="/minhas-solicitacoes" className="nav-link">
              Minhas Solicitações
            </Link>
          </li>
        )}

        {perfil === "COLETOR" && (
          <li className="nav-item">
            <Link to="/solicitacoes" className="nav-link">
              Solicitações
            </Link>
          </li>
        )}
      </ul>

      <button className="logout-button" onClick={handleLogout}>
        Sair
      </button>
    </nav>
  );
};

export default Menu;
