import React, { useState } from "react";
import { Add, Remove } from "@mui/icons-material";
import "./RequestCreateEdit.css";

export default function RequestCreateEdit() {
  const [materiais, setMateriais] = useState([
    { tipo: "Plástico", quantidade: 0 },
    { tipo: "Papel", quantidade: 0 },
    { tipo: "Vidro", quantidade: 0 },
    { tipo: "Metal", quantidade: 0 },
  ]);

  const [dataColeta, setDataColeta] = useState("");
  const [observacao, setObservacao] = useState("");

  const atualizarQuantidade = (index, operacao) => {
    const novosMateriais = [...materiais];
    if (operacao === "incrementar") {
      novosMateriais[index].quantidade += 1;
    } else if (
      operacao === "decrementar" &&
      novosMateriais[index].quantidade > 0
    ) {
      novosMateriais[index].quantidade -= 1;
    }
    setMateriais(novosMateriais);
  };

  const atualizarEstado = (index, estado) => {
    const novosMateriais = [...materiais];
    novosMateriais[index].estado = estado;
    setMateriais(novosMateriais);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dadosSolicitacao = {
      materiais,
      dataColeta,
      observacao,
    };
    console.log("Solicitação enviada:", dadosSolicitacao);
    alert("Solicitação enviada com sucesso!");
  };

  return (
    <div className="solicitacao-container">
      <h2>Solicitação de Coleta de Materiais Recicláveis</h2>
      <form onSubmit={handleSubmit} className="solicitacao-form">
        <div className="materiais-grid">
          {materiais.map((material, index) => (
            <div key={index} className="material-card">
              <h3>{material.tipo}</h3>
              {/* Botões para incrementar e decrementar quantidade */}
              <div className="quantidade-control">
                <button
                  type="button"
                  onClick={() => atualizarQuantidade(index, "decrementar")}
                >
                  <Remove />
                </button>
                <span>{material.quantidade} KG</span>
                <button
                  type="button"
                  onClick={() => atualizarQuantidade(index, "incrementar")}
                >
                  <Add />
                </button>
              </div>
{/* Estado dos materiais */}
       <div className="estado">
                <p>Estado dos materiais:</p>
                <label>
                  <input
                    type="radio"
                    name={`estado-${index}`}
                    value="Novo"
                    checked={material.estado === "Novo"}
                    onChange={() => atualizarEstado(index, "Novo")}
                  />
                  Novo
                </label>
                <label> 
                  <input
                    type="radio"
                    name={`estado-${index}`}
                    value="Bom"
                    checked={material.estado === "Bom"}
                    onChange={() => atualizarEstado(index, "Bom")}
                  />
                  Bom
                </label>
                <label>
                  <input
                    type="radio"
                    name={`estado-${index}`}
                    value="Ótimo"
                    checked={material.estado === "Ótimo"}
                    onChange={() => atualizarEstado(index, "Ótimo")}
                  />
                  Ótimo
                </label>
              </div>
            </div>
          ))}
        </div>
        {/* Data da Coleta */}
        <div className="form-group">
          <label>Data da Coleta:</label>
          <input
            type="date"
            value={dataColeta}
            onChange={(e) => setDataColeta(e.target.value)}
            required
          />
        </div>
        {/* Observação */}
        <div className="form-group">
          <label>Observação:</label>
          <textarea
            value={observacao}
            onChange={(e) => setObservacao(e.target.value)}
            placeholder="Insira qualquer observação adicional aqui..."
          />
        </div>
        <button type="submit" className="btn-cadastrar">
          Enviar Solicitação
        </button>
      </form>
    </div>
  );
}
