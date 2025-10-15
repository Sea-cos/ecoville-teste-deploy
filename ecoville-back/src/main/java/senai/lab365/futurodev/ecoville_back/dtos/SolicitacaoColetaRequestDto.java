package senai.lab365.futurodev.ecoville_back.dtos;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
public class SolicitacaoColetaRequestDto {
    private LocalDate dataAgendada;
    private String observacoes;
    private List<ItemColetaRequestDto> itens;
}