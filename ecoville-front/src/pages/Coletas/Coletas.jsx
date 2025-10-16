import Menu from "../../components/Menu/Menu.jsx";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./Coletas.css";
// import { useNavigate } from "react-router";
import CardColetor from "../../components/Cards/CardColetor.jsx";

const Coletas = () => {
  const [statusFiltro, setStatusFiltro] = useState("");
  const [dataFiltro, setDataFiltro] = useState("");
  const [feedbackText, setFeedbackText] = useState("");
  const userID = localStorage.getItem("userID");
  const user = localStorage.getItem("user") || "marcos";
  const senha = localStorage.getItem("senha") || "123";
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [openValidationModal, setOpenValidationModal] = useState(false);
  const [selectedSolicitacao, setSelectedSolicitacao] = useState(null);
  const [itensValidados, setItensValidados] = useState([]);

  const solicitacoesFiltradas = solicitacoes.filter((sol) => {
    const matchStatus = statusFiltro ? sol.status === statusFiltro : true;
    const matchData = dataFiltro ? sol.dataAgendada === dataFiltro : true;

    return matchStatus && matchData;
  });

  const handleModal = (id) => {
    const solicitacao = solicitacoes.find((s) => s.id === id);

    if (solicitacao) {
      setSelectedSolicitacao(solicitacao);

      const itensIniciais = solicitacao.itens.map((item) => ({
        ...item,
        quantidadeValidadaKg: item.quantidadeEstimadaKg,
        estadoValidado: item.estado,
      }));

      setItensValidados(itensIniciais);
      setOpenValidationModal(true);
    }
  };

  const handleChangeItem = (index, field, value) => {
    const novosItens = [...itensValidados];
    novosItens[index][field] = value;
    setItensValidados(novosItens);
  };

  const closeValidationModal = () => {
    setOpenValidationModal(false);
    setSelectedSolicitacao(null);
    setItensValidados([]);
    setFeedbackText("");
  };

  const handleValidar = async (id) => {
    try {
      const responseFinalizar = await fetch(
        `http://localhost:8080/api/coletas/${id}/finalizar?coletorId=${userID}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + btoa(user + ":" + senha),
          },
          body: JSON.stringify({
            itens: itensValidados.map((item) => ({
              id: item.id,
              quantidadeValidadaKg: item.quantidadeValidadaKg,
              estado: item.estadoValidado,
            })),
          }),
        }
      );

      if (!responseFinalizar.ok) throw new Error("Erro ao finalizar");

      if (feedbackText.trim() !== "") {
        await fetch(
          `http://localhost:8080/api/coletas/${id}/feedback?feedback=${encodeURIComponent(
            feedbackText
          )}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Basic " + btoa(user + ":" + senha),
            },
          }
        );
      }
      toast.success("Solicitação finalizada!")
      const updated = await responseFinalizar.json();
      setSolicitacoes((prev) => prev.map((s) => (s.id === id ? updated : s)));
      closeValidationModal();
    } catch (error) {
      console.log(error);
    }
  };

  const handleColetar = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/coletas/${id}/aceitar?coletorId=${userID}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + btoa(user + ":" + senha),
          },
        }
      );

      if (response.ok) {
        const updated = await response.json();
        toast.success("Solicitação coletada!");
        setSolicitacoes((prev) => prev.map((s) => (s.id === id ? updated : s)));
      } else {
        const errorText = await response.text();
        toast.warn("Erro ao cancelar: ", errorText);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const navigate = useNavigate();

  // const cadastrar = () => {
  //   navigate("/locais/novo");
  // };

  const fetchColetas = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/coletas/disponiveis`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + btoa(user + ":" + senha),
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setSolicitacoes(data);
        return data;
      } else {
        const errorText = await response.text();
        console.warn("erro: ", errorText);
        return [];
      }
    } catch (error) {
      console.error("Erro de rede: ", error);
      return [];
    }
  };

  useEffect(() => {
    fetchColetas();
  }, []);

  return (
    <>
      <Menu />

      <div className="locais">
        <h2>Solicitações</h2>
        <div className="filtros">
          <select
            value={statusFiltro}
            onChange={(e) => setStatusFiltro(e.target.value)}
          >
            <option value="">Todos os status</option>
            <option value="AGUARDANDO">Aguardando</option>
            <option value="COLETADA">Coletada</option>
            <option value="FINALIZADA">Finalizada</option>
            <option value="CANCELADA">Cancelada</option>
          </select>

          <input
            type="date"
            value={dataFiltro}
            onChange={(e) => setDataFiltro(e.target.value)}
          />
        </div>

        <div className="div-cards">
          {solicitacoesFiltradas.map((sol) => (
            <CardColetor
              key={sol.id}
              solicitacao={sol}
              onColetar={(id) => handleColetar(id)}
              onValidar={(id) => handleModal(id)}
            />
          ))}

          {openValidationModal && selectedSolicitacao && (
            <div className="overlay">
              <div className="modal">
                <h2>Validar Solicitação #{selectedSolicitacao.id}</h2>

                <div className="itens-container">
                  {itensValidados.map((item, index) => (
                    <div key={index} className="item-row">
                      <p>
                        <strong>{item.tipo}</strong> - Quantidade original:{" "}
                        {item.quantidadeEstimadaKg} | Estado original:{" "}
                        {item.estado}
                      </p>

                      <div className="inputs">
                        <label>
                          Quantidade validada:
                          <input
                            type="number"
                            value={item.quantidadeValidadaKg}
                            onChange={(e) =>
                              handleChangeItem(
                                index,
                                "quantidadeValidadaKg",
                                e.target.value
                              )
                            }
                          />
                        </label>

                        <label>
                          Estado validado:
                          <select
                            value={item.estadoValidado}
                            onChange={(e) =>
                              handleChangeItem(
                                index,
                                "estadoValidado",
                                e.target.value
                              )
                            }
                          >
                            <option value="RUIM">Ruim</option>
                            <option value="BOM">Bom</option>
                            <option value="OTIMO">Ótimo</option>
                          </select>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Feedback */}
                <div className="feedback-section">
                  <label>
                    Feedback do coletor:
                    <textarea
                      value={feedbackText}
                      onChange={(e) => setFeedbackText(e.target.value)}
                      placeholder="Digite observações ou feedback sobre a coleta..."
                    />
                  </label>
                </div>

                <div className="modal-actions">
                  <button onClick={() => handleValidar(selectedSolicitacao.id)}>
                    Salvar
                  </button>
                  <button onClick={closeValidationModal}>Cancelar</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Coletas;
