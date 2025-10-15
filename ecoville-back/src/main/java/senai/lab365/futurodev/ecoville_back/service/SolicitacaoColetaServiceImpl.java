package senai.lab365.futurodev.ecoville_back.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import senai.lab365.futurodev.ecoville_back.dtos.*;
import senai.lab365.futurodev.ecoville_back.entity.ItemColeta;
import senai.lab365.futurodev.ecoville_back.entity.SolicitacaoColeta;
import senai.lab365.futurodev.ecoville_back.entity.Usuario;
import senai.lab365.futurodev.ecoville_back.enums.StatusColeta;
import senai.lab365.futurodev.ecoville_back.mappers.ItemColetaMapper;
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
            item.setEstado(itemColetaDTO.estado());
            itens.add(item);
        }
    }

    solicitacao.setItems(itens);

    // Cascade já salva os itens junto
    return SolicitacaoColetaMapper.toDto(solicitacaoRepository.save(solicitacao));
}

    public List<SolicitacaoColetaResponseDto> listarMinhasSolicitacoes(Integer usuarioId) {
        return solicitacaoRepository.findByUsuarioResidencialId(usuarioId).stream().map(SolicitacaoColetaMapper::toDto).toList();
    }

    public List<SolicitacaoColetaResponseDto> listarTodasSolicitacoes() {
        return solicitacaoRepository.findAll()
                .stream()
                .map(SolicitacaoColetaMapper::toDto)
                .toList();
    }

    @Transactional
    public SolicitacaoColetaResponseDto aceitarSolicitacao(Integer idSolicitacao, Integer coletorId) {
        SolicitacaoColeta solicitacao = solicitacaoRepository.findById(idSolicitacao)
                .orElseThrow(() -> new RuntimeException("Solicitação não encontrada."));
        solicitacao.aceitar(usuarioRepository.getReferenceById(coletorId));
        return SolicitacaoColetaMapper.toDto(solicitacaoRepository.save(solicitacao));
    }

    @Transactional
    public SolicitacaoColetaResponseDto cancelarSolicitacao(Integer idSolicitacao) {
        SolicitacaoColeta solicitacao = solicitacaoRepository.findById(idSolicitacao)
                .orElseThrow(() -> new RuntimeException("Solicitação não encontrada."));
        solicitacao.cancelar();
        return SolicitacaoColetaMapper.toDto(solicitacaoRepository.save(solicitacao));
    }

    @Transactional
    public SolicitacaoColetaResponseDto finalizarSolicitacao(Integer idSolicitacao, SolicitacaoValidacaoRequestDto validacaoDto) {
        SolicitacaoColeta solicitacao = solicitacaoRepository.findById(idSolicitacao)
                .orElseThrow(() -> new RuntimeException("Solicitação não encontrada."));

        for (ItemColetaValidacaoRequestDto itemDto : validacaoDto.itens()){
            solicitacao.getItems().stream()
                    .filter(item -> item.getId().equals(itemDto.id()))
                    .findFirst()
                    .ifPresent(item -> {
                        item.setQuantidadeValidadaKg(itemDto.quantidadeValidadaKg());
                        item.setEstado(itemDto.estado());
                    });
        }
        solicitacao.finalizar();
        return SolicitacaoColetaMapper.toDto(solicitacaoRepository.save(solicitacao));
    }

    @Transactional
    public SolicitacaoColetaResponseDto adicionarFeedback(Integer idSolicitacao, String feedback) {
        SolicitacaoColeta solicitacao = solicitacaoRepository.findById(idSolicitacao)
                .orElseThrow(() -> new RuntimeException("Solicitação não encontrada."));
        solicitacao.adicionarFeedback(feedback);
        return SolicitacaoColetaMapper.toDto(solicitacaoRepository.save(solicitacao));
    }

    @Transactional
    public SolicitacaoColetaUpdateResponseDto atualizar(Integer idSolicitacao, SolicitacaoColetaUpdateRequestDto dto) {
        SolicitacaoColeta solicitacao = solicitacaoRepository.findById(idSolicitacao)
                .orElseThrow();

        solicitacao.setUsuarioResidencial(usuarioRepository.findById(dto.idUsuarioResidencial())
                .orElseThrow(()->new RuntimeException("Usuario residencial não encontrado.")));
        solicitacao.setColetor(usuarioRepository.findById(dto.idColetor())
                .orElseThrow(()->new RuntimeException("Usuario coletor não encontrado.")));
        solicitacao.setDataSolicitacao(dto.dataSolicitacao());
        solicitacao.setDataAgendada(dto.dataAgendada());
        solicitacao.setObservacoes(dto.observacoes());
        solicitacao.setStatus(dto.status());
        solicitacao.setFeedback(dto.feedback());


        List<ItemColeta> itens = new ArrayList<>();

        if (dto.itens() != null) {
            for (ItemColetaRequestDto itemColetaDTO : dto.itens()) {
                ItemColeta item = new ItemColeta();
                item.setTipo(itemColetaDTO.tipo());
                item.setQuantidadeEstimadaKg(itemColetaDTO.quantidadeEstimadaKg());
                item.setQuantidadeValidadaKg(itemColetaDTO.quantidadeValidadaKg());
                item.setEstado(itemColetaDTO.estado());
                item.setSolicitacaoColeta(solicitacao);
                itens.add(item);
            }
        }

        solicitacao.getItems().clear();
        solicitacao.getItems().addAll(itens);

        solicitacao = solicitacaoRepository.save(solicitacao);

        return SolicitacaoColetaMapper.toDtoUpdate(solicitacao);

    }
}
