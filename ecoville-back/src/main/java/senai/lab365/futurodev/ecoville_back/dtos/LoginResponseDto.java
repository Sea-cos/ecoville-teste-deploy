package senai.lab365.futurodev.ecoville_back.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import senai.lab365.futurodev.ecoville_back.enums.Perfil;

@Getter
@Builder
@AllArgsConstructor
public class LoginResponseDto {
    private String message;
    private String username;
    private Perfil perfil;
    private Integer id;
}
