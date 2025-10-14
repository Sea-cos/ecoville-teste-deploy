import Menu from "../../components/Menu/Menu.jsx";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./Coletas.css";
import { useNavigate } from "react-router";
import CardColetor from "../../components/Cards/CardColetor.jsx";

const Coletas = () => {
  const solicitacoesExemplo = [
    {
      id: 1,
      numeroSolicitacao: 1023,
      itens: {
        plastico: "12kg",
        papel: "5kg",
        vidro: "8kg",
      },
      dataColeta: "2025-10-07",
      status: "AGUARDANDO",
    },
    {
      id: 2,
      numeroSolicitacao: 1024,
      itens: {
        metal: "3kg",
        vidro: "10kg",
      },
      dataColeta: "2025-10-02",
      status: "COLETADA",
    },
    {
      id: 3,
      numeroSolicitacao: 1025,
      itens: {
        organico: "20kg",
      },
      dataColeta: "2025-10-02",
      status: "FINALIZADA",
    },
    {
      id: 4,
      numeroSolicitacao: 1026,
      itens: {
        plastico: "7kg",
        papel: "2kg",
      },
      dataColeta: "2025-10-12",
      status: "AGUARDANDO",
    },
    {
      id: 5,
      numeroSolicitacao: 1027,
      itens: {
        eletronicos: "4kg",
        vidro: "6kg",
      },
      dataColeta: "2025-10-05",
      status: "COLETADA",
    },
  ];

  const [statusFiltro, setStatusFiltro] = useState("");
  const [dataFiltro, setDataFiltro] = useState("");
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

  const handleColetar = (id) => {
    console.log("Coletar solicitação", id);
    // TODO: Implementar coletar ( issue #16)
  };

  const navigate = useNavigate();

  const cadastrar = () => {
    navigate("/locais/novo");
  };

  const fetchColetas = async () => {
    const userID = localStorage.getItem("userID");
    const user = localStorage.getItem("user") || "marcos";
    const senha = localStorage.getItem("senha") || "123";

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
