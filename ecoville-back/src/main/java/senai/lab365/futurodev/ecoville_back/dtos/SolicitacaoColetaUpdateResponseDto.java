package senai.lab365.futurodev.ecoville_back.dtos;

import senai.lab365.futurodev.ecoville_back.entity.Usuario;
import senai.lab365.futurodev.ecoville_back.enums.StatusColeta;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public record SolicitacaoColetaUpdateResponseDto(
        Integer idSolicitacao,
        Integer idUsuarioResidencial,
        Integer idColetor,
        LocalDateTime dataSolicitacao,
        LocalDate dataAgendada,
        String observacoes,
        StatusColeta status,
        String feedback,
        List<ItemColetaResponseDto> itens
) {
}
