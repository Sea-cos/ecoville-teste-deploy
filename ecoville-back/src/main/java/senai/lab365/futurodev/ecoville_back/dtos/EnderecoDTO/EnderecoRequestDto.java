package senai.lab365.futurodev.ecoville_back.dtos;

import java.math.BigDecimal;

public record EnderecoRequestDto (
        String cep,
        String logradouro,
        String estado,
        String cidade,
        String bairro,
        String numero,
        String complemento,
        BigDecimal latitude,
        BigDecimal longitude
) {
}
