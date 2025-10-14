import React from "react";
import "./CardResidente.css";
import {
  FaCalendarAlt,
  FaClipboardList,
  FaInfoCircle
} from "react-icons/fa";

function CardColetor({ solicitacao, onColetar, onValidar }) {
  const dataColeta = new Date(solicitacao.dataColeta + "T00:00:00");

  return (
    <div className="cards">
      <h3 className="cards-title">
        Solicitação #{solicitacao.numeroSolicitacao}
      </h3>

      <p className="cards-info">
        <FaClipboardList className="icon" />
        <strong>Itens:</strong>
      </p>
      <ul>
        {Object.entries(solicitacao.itens).map(([item, quantidade]) => (
          <li key={item}>
            {item.charAt(0).toUpperCase() + item.slice(1)}: {quantidade}
          </li>
        ))}
      </ul>
      <p className="cards-info">
        <FaCalendarAlt className="icon" />
        <strong>Data:</strong> {dataColeta.toLocaleDateString("pt-BR")}
      </p>

      <p className="cards-info">
        <FaInfoCircle className="icon" />
        <strong>Status:</strong> {solicitacao.status}
      </p>

      <div className="card-actions">
        {solicitacao.status === "AGUARDANDO" && (
          <button className="btn-card" onClick={() => onColetar(solicitacao.id)}>Coletar</button>
        )}

        {solicitacao.status === "COLETADA" && (
          <button className="btn-card" onClick={() => onValidar(solicitacao.id)}>Validar</button>
        )}
      </div>
    </div>
  );
}

export default CardColetor;
