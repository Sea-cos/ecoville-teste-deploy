package senai.lab365.futurodev.ecoville_back.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import senai.lab365.futurodev.ecoville_back.dtos.LoginRequestDto;
import senai.lab365.futurodev.ecoville_back.dtos.LoginResponseDto;
import senai.lab365.futurodev.ecoville_back.entity.Endereco;
import senai.lab365.futurodev.ecoville_back.mappers.UsuarioMapper;
import senai.lab365.futurodev.ecoville_back.dtos.UsuarioRequestDto;
import senai.lab365.futurodev.ecoville_back.dtos.UsuarioResponseDto;
import senai.lab365.futurodev.ecoville_back.entity.Usuario;
import senai.lab365.futurodev.ecoville_back.repository.EnderecoRepository;
import senai.lab365.futurodev.ecoville_back.repository.UsuarioRepository;

import java.util.Base64;

@Service
@RequiredArgsConstructor
public class UsuarioServiceImpl implements UsuarioService {

    private final PasswordEncoder encoder;
    private final EnderecoRepository enderecoRepository;
    private final UsuarioRepository usuarioRepository;
    private final AuthenticationConfiguration authenticationConfiguration;

    @Override
    @Transactional
    public UsuarioResponseDto create (UsuarioRequestDto usuarioDto) {

        Endereco endereco = enderecoRepository.save(usuarioDto.endereco());

        Usuario usuario = UsuarioMapper.toEntity(usuarioDto);
        usuario.setSenha(encoder.encode(usuarioDto.senha()));

        return UsuarioMapper.toDto(usuarioRepository.save(usuario));

    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return usuarioRepository.findByNomeDeUsuario(username)
                .orElseThrow(() -> new UsernameNotFoundException(username));
    }

    public LoginResponseDto authenticate(LoginRequestDto dto) {
        try {
            AuthenticationManager authenticationManager = authenticationConfiguration.getAuthenticationManager();
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(dto.getNomeDeUsuario(), dto.getSenha())
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);
            return new LoginResponseDto("Login realizado com sucesso!", dto.getNomeDeUsuario(),usuarioRepository.findByNomeDeUsuario(dto.getNomeDeUsuario()).get().getPerfil());
        } catch (Exception e) {
            throw new BadCredentialsException("Usuário ou senha inválidos");
        }
    }
}
