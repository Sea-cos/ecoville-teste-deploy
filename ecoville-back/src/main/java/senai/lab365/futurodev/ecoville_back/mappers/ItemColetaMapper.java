package senai.lab365.futurodev.ecoville_back.mappers;

import senai.lab365.futurodev.ecoville_back.dtos.ItemColetaRequestDto;
import senai.lab365.futurodev.ecoville_back.dtos.ItemColetaResponseDto;
import senai.lab365.futurodev.ecoville_back.entity.ItemColeta;

public class ItemColetaMapper {

    public static ItemColeta toEntity(ItemColetaRequestDto dto) {
        return new ItemColeta(
                dto.tipo(),
                dto.quantidadeEstimadaKg(),
                dto.quantidadeValidadaKg(),
                dto.estado()
        );
    }

    public static ItemColetaResponseDto toDto (ItemColeta ic) {
        return new ItemColetaResponseDto(
                ic.getId(),
                ic.getTipo(),
                ic.getQuantidadeEstimadaKg(),
                ic.getQuantidadeValidadaKg(),
                ic.getEstado()
        );
    }


}
