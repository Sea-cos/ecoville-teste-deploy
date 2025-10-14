import { Route, Routes } from "react-router";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import Solicitacoes from "./pages/Solicitacoes/Solicitacoes"
import Places from "./pages/Places/Places";
import CadastroColeta from "./pages/RequestCreateEdit/RequestCreateEdit"
import { ToastContainer } from "react-toastify";

function App() {

  

  return (
    <>
      {/* MENU */}
      <Routes>
        <Route path="/" Component={Login} />
        <Route path="/criar-conta" Component={Register} />
        <Route path="/home" Component={Home} />
        <Route path="/cadastro-coleta" Component={CadastroColeta} />
        <Route path="/cadastro-coleta/:id" element={<CadastroColeta />} />
        <Route path="/solicitacoes" Component={Solicitacoes} />
        <Route path="/locais" Component={Places} />
      </Routes>
       {/* RODAPE */}
       <ToastContainer />
    </>
  );
}

export default App;
