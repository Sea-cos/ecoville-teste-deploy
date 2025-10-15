package senai.lab365.futurodev.ecoville_back.dtos;

import senai.lab365.futurodev.ecoville_back.enums.EstadoMaterial;
import senai.lab365.futurodev.ecoville_back.enums.TipoMaterial;

import java.math.BigDecimal;

public record ItemColetaResponseDto(
        Integer id,
        TipoMaterial tipo,
        BigDecimal quantidadeEstimadaKg,
        BigDecimal quantidadeValidadaKg,
        EstadoMaterial estado
) {
}
