package senai.lab365.futurodev.ecoville_back.service;

import senai.lab365.futurodev.ecoville_back.dtos.SolicitacaoColetaRequestDto;
import senai.lab365.futurodev.ecoville_back.dtos.SolicitacaoColetaResponseDto;
import senai.lab365.futurodev.ecoville_back.entity.SolicitacaoColeta;

import java.util.List;

public interface SolicitacaoColetaService {

    public SolicitacaoColetaResponseDto criarSolicitacao(Integer usuarioId, SolicitacaoColetaRequestDto dto);

    public List<SolicitacaoColetaResponseDto> listarMinhasSolicitacoes(Long usuarioId);
    public List<SolicitacaoColetaResponseDto> listarTodasSolicitacoes();

    public SolicitacaoColetaResponseDto aceitarSolicitacao(Integer idSolicitacao, Integer coletorId);

    public SolicitacaoColetaResponseDto cancelarSolicitacao(Integer idSolicitacao);

    public SolicitacaoColetaResponseDto finalizarSolicitacao(Integer idSolicitacao);

    public SolicitacaoColetaResponseDto adicionarFeedback(Integer idSolicitacao, String feedback) ;
}
