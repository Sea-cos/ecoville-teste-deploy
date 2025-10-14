import Menu from "../../components/Menu/Menu.jsx";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CardPonto from "../../components/Cards/CardResidente.jsx";
import "./Solicitacoes.css";
import { useNavigate } from "react-router";
import CardResidente from "../../components/Cards/CardResidente.jsx";

const Solicitacoes = () => {
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const userID = localStorage.getItem("userID");
  const user = localStorage.getItem("user") || "marcos";
  const senha = localStorage.getItem("senha") || "123";
  const [feedbackText, setFeedbackText] = useState(
    "Teste de feedback retornado pelo back-end"
  );
  const [selectedId, setSelectedId] = useState(null);

  const handleCancelar = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/coletas/${id}/cancelar`,
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
        toast.success("Solicitação cancelada!");
        setSolicitacoes((prev) => prev.map((s) => (s.id === id ? updated : s))); //atualizar local para não ter que recarregar a pagina.
      } else {
        const errorText = await response.text();
        toast.warn("Erro ao cancelar: ", errorText);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditar = (id) => {
    console.log("Editar solicitação", id);
    // TODO: Implementar edição, modal ou nova tela (issue #12)
  };

  const handleFeedback = (id) => {
    const solicitacao = solicitacoes.find((s) => s.id === id);

    if (solicitacao) {
      console.log("Feedback da solicitação:", solicitacao.feedback);
      setSelectedId(id);
      setFeedbackText(solicitacao.feedback || "Sem feedback disponível");
      setOpenModal(true);
    }
  };

  const closeModal = () => {
    setOpenModal(false);
    setFeedbackText("");
    setSelectedId(null);
  };

  const navigate = useNavigate();

  const cadastrar = () => {
    navigate("/cadastro-coleta");
  };

  const fetchColetas = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/coletas/minhas?usuarioId=${userID}`,
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
        <h2>Minhas solicitações</h2>
        <button className="btn-cadastrar" onClick={cadastrar}>
          + Nova
        </button>

        <div className="div-cards">
          {solicitacoes
            .slice()
            .sort(
              (a, b) =>
                new Date(b.dataSolicitacao) - new Date(a.dataSolicitacao)
            )
            .map((sol) => (
              <CardResidente
                key={sol.id}
                solicitacao={sol}
                onCancelar={(id) => handleCancelar(id)}
                onEditar={(id) => handleEditar(id)}
                onFeedback={handleFeedback}
              />
            ))}
          {openModal && (
            <div className="overlay">
              <div className="modal">
                <h2>Feedback da solicitação #{selectedId}</h2>
                <p>{feedbackText}</p>
                <button onClick={closeModal}>Fechar</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Solicitacoes;
