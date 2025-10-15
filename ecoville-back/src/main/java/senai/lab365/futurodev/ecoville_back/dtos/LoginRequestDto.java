package senai.lab365.futurodev.ecoville_back.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequestDto {
    private String nomeDeUsuario;
    private String senha;
}
