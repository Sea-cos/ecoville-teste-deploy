package senai.lab365.futurodev.ecoville_back.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import senai.lab365.futurodev.ecoville_back.enums.StatusColeta;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class SolicitacaoColetaResponseDto {
    private Integer id;
    private StatusColeta status;
    private LocalDateTime dataSolicitacao;
    private LocalDate dataAgendada;
    private String observacoes;
    private String feedback;
    private List<ItemColetaResponseDto> itens;
}
