import { createContext, useState } from "react";

const SolicitacoesContext = createContext();
export default SolicitacoesContext;

export function SolicitacoesProvider({ children }){
    const [solicitacoes, setSolicitacoes] = useState([]);
    return (
        <SolicitacoesContext.Provider value={{ solicitacoes, setSolicitacoes }}>
            {children}
        </SolicitacoesContext.Provider>
    );
}

