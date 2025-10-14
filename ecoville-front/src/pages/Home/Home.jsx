import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Menu from "../../components/Menu/Menu.jsx";
import "./Home.css";
import imagemColeta from "../../assets/imagem-coleta.webp";

function Dashboard() {

  return (
    <>
      <Menu />
      <div className="home-container">
        <div className="card-home">
          <h2>Seja bem vindo a plataforma EcoVille!</h2>
          <p>Sua plataforma digital que facilita a gestão de coletas seletivas e a interação entre moradores e coletores de residuos recicláveis!</p>
          <p>Comece acessando o menu superior.</p>

          <img src={imagemColeta} alt="imagem descrevendo os tipos de coletas" />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
