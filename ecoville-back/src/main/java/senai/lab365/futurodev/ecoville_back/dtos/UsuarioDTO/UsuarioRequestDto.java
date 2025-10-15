package senai.lab365.futurodev.ecoville_back.dtos;


import senai.lab365.futurodev.ecoville_back.entity.Endereco;
import senai.lab365.futurodev.ecoville_back.enums.Perfil;

public record UsuarioRequestDto(
        String nomeDeUsuario,
        String senha,
        Perfil perfil,
        Endereco endereco
) {
}
