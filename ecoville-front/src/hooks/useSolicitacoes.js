import { useContext } from "react";
import SolicitacoesContext from "../context/SolicitacoesContext.jsx"

export function useSolicitacoes() {
  return useContext(SolicitacoesContext);
}