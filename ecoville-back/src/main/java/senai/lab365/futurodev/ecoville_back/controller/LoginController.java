package senai.lab365.futurodev.ecoville_back.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import senai.lab365.futurodev.ecoville_back.dtos.LoginRequestDto;
import senai.lab365.futurodev.ecoville_back.dtos.LoginResponseDto;
import senai.lab365.futurodev.ecoville_back.service.UsuarioService;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class LoginController {

    private final UsuarioService usuarioService;

    @PostMapping("/login")
    public LoginResponseDto login(@RequestBody LoginRequestDto dto) {

        return usuarioService.authenticate(dto);
    }
}
