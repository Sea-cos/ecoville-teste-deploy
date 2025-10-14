import Menu from "../../components/Menu/Menu.jsx";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./Coletas.css";
import { useNavigate } from "react-router";
import CardColetor from "../../components/Cards/CardColetor.jsx";

const Coletas = () => {
  const [statusFiltro, setStatusFiltro] = useState("");
  const [dataFiltro, setDataFiltro] = useState("");
  const userID = localStorage.getItem("userID");
  const user = localStorage.getItem("user") || "marcos";
  const senha = localStorage.getItem("senha") || "123";
  const [solicitacoes, setSolicitacoes] = useState([]);

  const solicitacoesFiltradas = solicitacoes.filter((sol) => {
    const matchStatus = statusFiltro ? sol.status === statusFiltro : true;
    const matchData = dataFiltro ? sol.dataAgendada === dataFiltro : true;

    return matchStatus && matchData;
  });

  const handleValidar = (id) => {
    console.log("Validar solicitação", id);
    // TODO: Implementar validação( issue #16)
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

  const navigate = useNavigate();

  const cadastrar = () => {
    navigate("/locais/novo");
  };

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
              onValidar={(id) => handleValidar(id)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Coletas;
