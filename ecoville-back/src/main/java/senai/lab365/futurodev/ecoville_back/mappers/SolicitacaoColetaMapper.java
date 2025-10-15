package senai.lab365.futurodev.ecoville_back.mappers;

import senai.lab365.futurodev.ecoville_back.dtos.SolicitacaoColetaResponseDto;
import senai.lab365.futurodev.ecoville_back.entity.SolicitacaoColeta;

public class SolicitacaoColetaMapper {

    public static SolicitacaoColetaResponseDto toDto(SolicitacaoColeta solicitacaoColeta) {
        return new SolicitacaoColetaResponseDto(
                solicitacaoColeta.getId(),
                solicitacaoColeta.getStatus(),
                solicitacaoColeta.getDataSolicitacao(),
                solicitacaoColeta.getDataAgendada(),
                solicitacaoColeta.getObservacoes(),
                solicitacaoColeta.getFeedback(),
                solicitacaoColeta.getItems().stream().map(ItemColetaMapper::toDto).toList()
        );
    }

//    public static SolicitacaoColeta toEntity(SolicitacaoColetaRequestDto dto) {
//        return new SolicitacaoColeta(
//                dto.getDataAgendada(),
//                dto.getObservacoes(),
//                dto.getItens()
//        );
//    }
}
