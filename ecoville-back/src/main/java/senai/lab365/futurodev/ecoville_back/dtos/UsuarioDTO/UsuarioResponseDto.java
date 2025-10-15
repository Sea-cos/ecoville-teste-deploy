package senai.lab365.futurodev.ecoville_back.dtos;

import senai.lab365.futurodev.ecoville_back.entity.Endereco;
import senai.lab365.futurodev.ecoville_back.enums.Perfil;

public record UsuarioResponseDto(
        Integer id,
        String nomeDeUsuario,
        Perfil perfil,
        Endereco idEndereco
) {

}
