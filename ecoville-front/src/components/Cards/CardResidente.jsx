import React from "react";
import "./CardResidente.css";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaRecycle,
  FaTrash,
  FaClipboardList,
} from "react-icons/fa";

function CardResidente({ solicitacao, onCancelar, onEditar, onFeedback }) {
  const parseDateLocal = (dateString) => {
    const [ano, mes, dia] = dateString.split("-");
    return new Date(ano, mes - 1, dia);
  };
  const dataColeta = parseDateLocal(solicitacao.dataColeta);
  const hoje = new Date();

  const diffDias = Math.ceil((dataColeta - hoje) / (1000 * 60 * 60 * 24));

  const indicadorTempo =
    diffDias > 0
      ? `Daqui a ${diffDias} dia${diffDias > 1 ? "s" : ""}`
      : `Há ${Math.abs(diffDias)} dia${Math.abs(diffDias) > 1 ? "s" : ""}`;

  const textoData =
    dataColeta >= hoje
      ? `Agendado para ${dataColeta.toLocaleDateString("pt-BR")}`
      : `Coletado em ${dataColeta.toLocaleDateString("pt-BR")}`;

  const handleDeleteClick = () => {
    if (window.confirm(`Deseja realmente deletar "${solicitacao.nome}"?`)) {
      onCancelar(solicitacao.id);
    }
  };

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
        <strong>{textoData}</strong>
      </p>

      <p className="cards-indicador">
        <em>{indicadorTempo}</em>
      </p>

      {/* Botões condicionais */}
      <div className="card-actions">
        {solicitacao.status === "AGUARDANDO" && (
          <>
            <button className="btn-card" onClick={() => onEditar(solicitacao.id)}>Editar</button>
            <button className="delete-btn" onClick={() => onCancelar(solicitacao.id)}>Cancelar</button>
          </>
        )}

        {(solicitacao.status === "COLETADA" ||
          solicitacao.status === "FINALIZADA") && (
          <button className="btn-card" onClick={() => onFeedback(solicitacao.id)}>Feedback</button>
        )}
      </div>
    </div>
  );
}

export default CardResidente;
