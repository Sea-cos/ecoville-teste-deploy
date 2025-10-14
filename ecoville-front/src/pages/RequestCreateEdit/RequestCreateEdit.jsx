import React, { useState } from "react";
import Menu from "../../components/Menu/Menu.jsx";
import { Add, Remove } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import "./RequestCreateEdit.css";

export default function RequestCreateEdit() {
  const [materiais, setMateriais] = useState([
    { tipo: "PLASTICO", quantidade: 0 },
    { tipo: "VIDRO", quantidade: 0 },
    { tipo: "PAPEL", quantidade: 0 },
    { tipo: "METAL", quantidade: 0 },
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hoje = new Date().toLocaleDateString("en-CA");
    const dataSelecionada = dataColeta;
    console.log("Hoje:" + hoje + " selecionada: " + dataSelecionada);

    if (dataSelecionada < hoje) {
      toast.warning("A data da coleta deve ser hoje ou uma data futura.");
      return;
    }

    const temMaterialValido = materiais.some((mat) => mat.quantidade >= 1);

    if (!temMaterialValido) {
      toast.warning(
        "Selecione pelo menos um material com quantidade maior ou igual a 1."
      );
      return;
    }

    const faltandoEstado = materiais.some(
      (mat) => mat.quantidade > 0 && !mat.estado
    );
    if (faltandoEstado) {
      toast.warning(
        "Selecione o estado para todos os materiais com quantidade preenchida."
      );
      return;
    }

    const itens = materiais
      .filter((mat) => mat.quantidade > 0)
      .map((mat) => ({
        tipo: mat.tipo,
        quantidadeEstimadaKg: mat.quantidade,
        estado: mat.estado,
      }));

    const dadosSolicitacao = {
      dataAgendada: dataColeta,
      observacoes: observacao,
      itens,
    };

    console.log(dadosSolicitacao);

    //TODO: Implementar JWT (issue #17)
    const usuarioId = localStorage.getItem("userID");
    const user = localStorage.getItem("user");
    const senha = localStorage.getItem("senha");

    try {
      const response = await fetch(
        `http://localhost:8080/api/coletas?usuarioId=${usuarioId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + btoa(user + ":" + senha),
          },
          body: JSON.stringify(dadosSolicitacao),
        }
      );

      if (response.ok) {
        toast.success("Solicitação registrada!");
      } else {
        const errorText = await response.text();
        toast.error("Erro: " + errorText);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Menu />
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
                      value="RUIM"
                      checked={material.estado === "RUIM"}
                      onChange={(e) => atualizarEstado(index, e.target.value)}
                    />
                    Ruim
                  </label>
                  <label>
                    <input
                      type="radio"
                      name={`estado-${index}`}
                      value="BOM"
                      checked={material.estado === "BOM"}
                      onChange={(e) => atualizarEstado(index, e.target.value)}
                    />
                    Bom
                  </label>
                  <label>
                    <input
                      type="radio"
                      name={`estado-${index}`}
                      value="OTIMO"
                      checked={material.estado === "OTIMO"}
                      onChange={(e) => atualizarEstado(index, e.target.value)}
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
    </>
  );
}
