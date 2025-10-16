package senai.lab365.futurodev.ecoville_back.dtos;

import senai.lab365.futurodev.ecoville_back.enums.EstadoMaterial;
import senai.lab365.futurodev.ecoville_back.enums.TipoMaterial;

import java.math.BigDecimal;

public record ItemColetaUpdRequestDto(
    TipoMaterial tipo,
    BigDecimal quantidadeEstimadaKg,
    EstadoMaterial estado
            )
{}
