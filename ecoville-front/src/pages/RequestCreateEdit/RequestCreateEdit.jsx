import React, { useState, useEffect } from "react";
import Menu from "../../components/Menu/Menu.jsx";
import { Add, Remove } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";
import "./RequestCreateEdit.css";
import { useSolicitacoes } from "../../hooks/useSolicitacoes.js";

export default function RequestCreateEdit() {
  const { id } = useParams();
  const { solicitacoes } = useSolicitacoes();
  const [materiais, setMateriais] = useState([
    { tipo: "PLASTICO", quantidade: 0, estado: "" },
    { tipo: "VIDRO", quantidade: 0, estado: "" },
    { tipo: "PAPEL", quantidade: 0, estado: "" },
    { tipo: "METAL", quantidade: 0, estado: "" },
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

  useEffect(() => {
    if (id) {
      const coleta = solicitacoes.find((c) => c.id === Number(id));
      if (coleta) {
        // Cria um clone da estrutura inicial
        const materiaisBase = [
          { tipo: "PLASTICO", quantidade: 0 },
          { tipo: "VIDRO", quantidade: 0 },
          { tipo: "PAPEL", quantidade: 0 },
          { tipo: "METAL", quantidade: 0 },
        ];
        console.log(coleta.itens);

        // Preenche os valores vindos do back
        const materiaisAtualizados = materiaisBase.map((mat) => {
          const item = coleta.itens.find((i) => i.tipo === mat.tipo);
          return {
            ...mat,
            quantidade: item ? item.quantidadeEstimadaKg : 0,
            estado: item ? item.estado : "",
          };
        });

        setMateriais(materiaisAtualizados);
        setDataColeta(coleta.dataAgendada?.split("T")[0] || ""); // garante formato yyyy-MM-dd
        setObservacao(coleta.observacoes || "");
      }
    }
  }, [id, solicitacoes]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const usuarioId = localStorage.getItem("userID");
    const user = localStorage.getItem("user");
    const senha = localStorage.getItem("senha");
    const hoje = new Date().toLocaleDateString("en-CA");
    const dataSelecionada = dataColeta;

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

    try {
      let response;

      if (id) {
        console.log("ID", id);
        response = await fetch(
          `http://localhost:8080/api/coletas/${id}/atualizar`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Basic " + btoa(user + ":" + senha),
            },
            body: JSON.stringify(dadosSolicitacao),
          }
        );
      } else {
        response = await fetch(
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
      }

      if (response.ok) {
        toast.success(
          id ? "Solicitação atualizada!" : "Solicitação registrada!"
        );
        setObservacao("");
        setDataColeta("");
        setMateriais([
          { tipo: "PLASTICO", quantidade: 0, estado: "" },
          { tipo: "VIDRO", quantidade: 0, estado: "" },
          { tipo: "PAPEL", quantidade: 0, estado: "" },
          { tipo: "METAL", quantidade: 0, estado: "" },
        ]);
      } else {
        const errorText = await response.text();
        toast.error("Erro: " + errorText);
      }
    } catch (error) {
      console.error("Erro", error);
    }
  };

  return (
    <>
      <Menu />
      <div className="solicitacao-container">
        <h2>{id ? "Editar solicitação" : "Nova Solicitação"}</h2>
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
            {id ? "Salvar Alterações" : "Cadastrar"}
          </button>
        </form>
      </div>
    </>
  );
}
