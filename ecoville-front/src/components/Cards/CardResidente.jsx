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
  const dataColeta = parseDateLocal(solicitacao.dataAgendada);
  const hoje = new Date();

  const diffDias = Math.ceil((dataColeta - hoje) / (1000 * 60 * 60 * 24));

  let indicadorTempo;
  if (diffDias === 0) {
    indicadorTempo = "Hoje";
  } else if (diffDias > 0) {
    indicadorTempo = `Daqui a ${diffDias} dia${diffDias > 1 ? "s" : ""}`;
  } else {
    indicadorTempo = `Há ${Math.abs(diffDias)} dia${
      Math.abs(diffDias) > 1 ? "s" : ""
    }`;
  }

  const textoData =
    dataColeta >= hoje
      ? `Agendado para ${dataColeta.toLocaleDateString("pt-BR")}`
      : `Coletado em ${dataColeta.toLocaleDateString("pt-BR")}`;

  const textoDataTeste =
    solicitacao.status === "AGUARDANDO"
      ? `Agendado para ${dataColeta.toLocaleDateString("pt-BR")}`
      : solicitacao.status === "COLETADA"
      ? `Coletado em ${dataColeta.toLocaleDateString("pt-BR")}`
      : dataColeta.toLocaleDateString("pt-BR"); // fallback se vier outro status

  const handleDeleteClick = () => {
    if (window.confirm(`Deseja realmente deletar "${solicitacao.nome}"?`)) {
      onCancelar(solicitacao.id);
    }
  };

  return (
    <div className="cards">
      <h3 className="cards-title">Solicitação #{solicitacao.id} ({solicitacao.status})</h3>

      <p className="cards-info">
        <FaClipboardList className="icon" />
        <strong>Itens:</strong>
      </p>
      <ul>
        {solicitacao.itens.map((item) => (
          <li key={item.id}>
            {item.tipo}: {item.quantidadeEstimadaKg}kg
          </li>
        ))}
      </ul>

      <p className="cards-info">
        <FaCalendarAlt className="icon" />
        <strong>{textoDataTeste}</strong>
      </p>

      <p className="cards-indicador">
        <em>{indicadorTempo}</em>
      </p>

      {/* Botões condicionais */}
      <div className="card-actions">
        {solicitacao.status === "AGUARDANDO" && (
          <>
            <button
              className="btn-card"
              onClick={() => onEditar(solicitacao.id)}
            >
              Editar
            </button>
            <button
              className="delete-btn"
              onClick={() => onCancelar(solicitacao.id)}
            >
              Cancelar
            </button>
          </>
        )}

        {(solicitacao.status === "COLETADA" ||
          solicitacao.status === "FINALIZADA") && (
          <button
            className="btn-card"
            onClick={() => onFeedback(solicitacao.id)}
          >
            Feedback
          </button>
        )}
      </div>
    </div>
  );
}

export default CardResidente;
