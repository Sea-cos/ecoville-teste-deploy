import Menu from "../../components/Menu/Menu.jsx";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CardPonto from "../../components/Cards/CardResidente.jsx";
import "./Places.css";
import { useNavigate } from "react-router";

const Places = () => {
  const [coletas, setColetas] = useState([]);
  const navigate = useNavigate();

  const cadastrar = () =>{
    navigate("/locais/novo");
  }

  const handleDelete = async (id) => {
    try {
      const userID = localStorage.getItem("usuarioID");
      const res = await fetch(`http://localhost:3000/coletas/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          usuarioId: userID,
        },
      });

      if (!res.ok) throw new Error("Erro ao deletar!");
      toast.success("Ponto de coleta deletado!");
      fetchColetas();
    } catch (err) {
      toast.error(`Não foi possivel deletar: ${err.message}`);
    }
  };

  const fetchColetas = async () => {
    try {
      const userID = localStorage.getItem("usuarioID");
      const res = await fetch("http://localhost:3000/coletas", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          usuarioId: userID,
        },
      });

      if (!res.ok) throw new Error("Erro ao buscar coletas");
      const data = await res.json();
      if (data.length === 0) {
        toast.warning("Nenhum ponto encontrado!");
      }

      setColetas(data);
    } catch (err) {
      toast.error(`Erro ao buscar coletas: ${err.message}`);
    }
  };

  useEffect(() => {
    fetchColetas();
  }, []);

  return (
    <>
      <Menu />
      <div className="locais">
        <h2>Seus pontos cadastrados</h2>
        <button className="btn-cadastrar" onClick={cadastrar}>+ Novo ponto</button>

        <div className="div-cards">
          {coletas.map((ponto) => (
            <CardPonto key={ponto.id} ponto={ponto} onDelete={handleDelete} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Places;
