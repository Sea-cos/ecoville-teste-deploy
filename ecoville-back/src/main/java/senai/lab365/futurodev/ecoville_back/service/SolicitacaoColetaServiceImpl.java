package senai.lab365.futurodev.ecoville_back.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import senai.lab365.futurodev.ecoville_back.dtos.ItemColetaRequestDto;
import senai.lab365.futurodev.ecoville_back.dtos.SolicitacaoColetaRequestDto;
import senai.lab365.futurodev.ecoville_back.dtos.SolicitacaoColetaResponseDto;
import senai.lab365.futurodev.ecoville_back.entity.ItemColeta;
import senai.lab365.futurodev.ecoville_back.entity.SolicitacaoColeta;
import senai.lab365.futurodev.ecoville_back.entity.Usuario;
import senai.lab365.futurodev.ecoville_back.enums.StatusColeta;
import senai.lab365.futurodev.ecoville_back.mappers.SolicitacaoColetaMapper;
import senai.lab365.futurodev.ecoville_back.repository.SolicitacaoColetaRepository;
import senai.lab365.futurodev.ecoville_back.repository.UsuarioRepository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SolicitacaoColetaServiceImpl implements SolicitacaoColetaService {

    private final SolicitacaoColetaRepository solicitacaoRepository;
    private final UsuarioRepository usuarioRepository;


@Transactional
public SolicitacaoColetaResponseDto criarSolicitacao(Integer usuarioId, SolicitacaoColetaRequestDto dto) {
    Usuario usuario = usuarioRepository.findById(usuarioId)
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado."));

    SolicitacaoColeta solicitacao = new SolicitacaoColeta();
    solicitacao.setUsuarioResidencial(usuario);
    solicitacao.setDataSolicitacao(LocalDateTime.now());
    solicitacao.setDataAgendada(dto.getDataAgendada());
    solicitacao.setObservacoes(dto.getObservacoes());
    solicitacao.setStatus(StatusColeta.AGUARDANDO);

    // Certifica que a lista de items não é nula
    List<ItemColeta> itens = new ArrayList<>();

    if (dto.getItens() != null) {
        for (ItemColetaRequestDto itemColetaDTO : dto.getItens()) {
            ItemColeta item = new ItemColeta();
            item.setTipo(itemColetaDTO.tipo());
            item.setQuantidadeEstimadaKg(itemColetaDTO.quantidadeEstimadaKg());
            item.setSolicitacaoColeta(solicitacao);
            itens.add(item);
        }
    }

    solicitacao.setItems(itens);

    // Graças ao cascade, isso já salva os itens junto
    return SolicitacaoColetaMapper.toDto(solicitacaoRepository.save(solicitacao));
}

    public List<SolicitacaoColeta> listarMinhasSolicitacoes(Long usuarioId) {
        return solicitacaoRepository.findByUsuarioResidencialId(usuarioId);
    }

    @Transactional
    public SolicitacaoColeta aceitarSolicitacao(Integer idSolicitacao, Integer coletorId) {
        SolicitacaoColeta solicitacao = solicitacaoRepository.findById(idSolicitacao)
                .orElseThrow(() -> new RuntimeException("Solicitação não encontrada."));
        solicitacao.aceitar(usuarioRepository.getReferenceById(coletorId));
        return solicitacaoRepository.save(solicitacao);
    }

    @Transactional
    public SolicitacaoColeta cancelarSolicitacao(Integer idSolicitacao) {
        SolicitacaoColeta solicitacao = solicitacaoRepository.findById(idSolicitacao)
                .orElseThrow(() -> new RuntimeException("Solicitação não encontrada."));
        solicitacao.cancelar();
        return solicitacaoRepository.save(solicitacao);
    }

    @Transactional
    public SolicitacaoColeta finalizarSolicitacao(Integer idSolicitacao) {
        SolicitacaoColeta solicitacao = solicitacaoRepository.findById(idSolicitacao)
                .orElseThrow(() -> new RuntimeException("Solicitação não encontrada."));
        solicitacao.finalizar();
        return solicitacaoRepository.save(solicitacao);
    }

    @Transactional
    public SolicitacaoColeta adicionarFeedback(Integer idSolicitacao, String feedback) {
        SolicitacaoColeta solicitacao = solicitacaoRepository.findById(idSolicitacao)
                .orElseThrow(() -> new RuntimeException("Solicitação não encontrada."));
        solicitacao.adicionarFeedback(feedback);
        return solicitacaoRepository.save(solicitacao);
    }
}
