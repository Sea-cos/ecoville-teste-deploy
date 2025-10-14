package senai.lab365.futurodev.ecoville_back.service;

import org.springframework.security.core.userdetails.UserDetailsService;
import senai.lab365.futurodev.ecoville_back.dtos.LoginRequestDto;
import senai.lab365.futurodev.ecoville_back.dtos.LoginResponseDto;
import senai.lab365.futurodev.ecoville_back.dtos.UsuarioRequestDto;
import senai.lab365.futurodev.ecoville_back.dtos.UsuarioResponseDto;

public interface UsuarioService extends UserDetailsService {

    public UsuarioResponseDto create(UsuarioRequestDto dto);

    LoginResponseDto authenticate(LoginRequestDto dto);
}
