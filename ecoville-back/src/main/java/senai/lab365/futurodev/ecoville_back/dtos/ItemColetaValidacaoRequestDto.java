package senai.lab365.futurodev.ecoville_back.dtos;

import senai.lab365.futurodev.ecoville_back.enums.EstadoMaterial;

import java.math.BigDecimal;

public record ItemColetaValidacaoRequestDto(
        Integer id,
        BigDecimal quantidadeValidadaKg,
        EstadoMaterial estado
) {

}
