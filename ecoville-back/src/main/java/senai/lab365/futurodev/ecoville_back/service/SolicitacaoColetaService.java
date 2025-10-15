package senai.lab365.futurodev.ecoville_back.service;

import senai.lab365.futurodev.ecoville_back.dtos.SolicitacaoColetaRequestDto;
import senai.lab365.futurodev.ecoville_back.dtos.SolicitacaoColetaResponseDto;
import senai.lab365.futurodev.ecoville_back.dtos.SolicitacaoValidacaoRequestDto;
import senai.lab365.futurodev.ecoville_back.dtos.SolicitacaoColetaUpdateRequestDto;
import senai.lab365.futurodev.ecoville_back.dtos.SolicitacaoColetaUpdateResponseDto;
import senai.lab365.futurodev.ecoville_back.entity.SolicitacaoColeta;

import java.util.List;

public interface SolicitacaoColetaService {

    public SolicitacaoColetaResponseDto criarSolicitacao(Integer usuarioId, SolicitacaoColetaRequestDto dto);

    public List<SolicitacaoColetaResponseDto> listarMinhasSolicitacoes(Integer usuarioId);
    public List<SolicitacaoColetaResponseDto> listarTodasSolicitacoes();
    public SolicitacaoColetaResponseDto aceitarSolicitacao(Integer idSolicitacao, Integer coletorId);

    public SolicitacaoColetaResponseDto cancelarSolicitacao(Integer idSolicitacao);

    public SolicitacaoColetaResponseDto finalizarSolicitacao(Integer idSolicitacao, SolicitacaoValidacaoRequestDto validacaoDto);

    public SolicitacaoColetaResponseDto adicionarFeedback(Integer idSolicitacao, String feedback) ;

    public SolicitacaoColetaUpdateResponseDto atualizar(Integer idSolicitacao, SolicitacaoColetaUpdateRequestDto dto);
}
