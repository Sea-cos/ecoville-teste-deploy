import { Route, Routes } from "react-router";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import Solicitacoes from "./pages/Solicitacoes/Solicitacoes"
import Coletas from "./pages/Coletas/Coletas"
import Places from "./pages/Places/Places";
import CadastroColeta from "./pages/RequestCreateEdit/RequestCreateEdit"
import { ToastContainer } from "react-toastify";
import { SolicitacoesProvider } from "./context/SolicitacoesContext";

function App() {

  

  return (
    <>
      {/* MENU */}
      <SolicitacoesProvider>
      <Routes>
        <Route path="/" Component={Login} />
        <Route path="/criar-conta" Component={Register} />
        <Route path="/home" Component={Home} />
        <Route path="/cadastro-coleta" Component={CadastroColeta} />
        <Route path="/cadastro-coleta/:id" element={<CadastroColeta />} />
        <Route path="/solicitacoes" Component={Solicitacoes} />
        <Route path="/coletas" Component={Coletas} />
        <Route path="/locais" Component={Places} />
      </Routes>
       {/* RODAPE */}
       <ToastContainer />
       </SolicitacoesProvider>
    </>
  );
}

export default App;
