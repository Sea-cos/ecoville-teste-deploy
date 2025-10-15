package senai.lab365.futurodev.ecoville_back.dtos;

import java.util.List;

public record SolicitacaoValidacaoRequestDto(
        List<ItemColetaValidacaoRequestDto> itens
) {
}
