package senai.lab365.futurodev.ecoville_back.config;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import senai.lab365.futurodev.ecoville_back.entity.Endereco;
import senai.lab365.futurodev.ecoville_back.entity.Usuario;
import senai.lab365.futurodev.ecoville_back.enums.Perfil;
import senai.lab365.futurodev.ecoville_back.repository.EnderecoRepository;
import senai.lab365.futurodev.ecoville_back.repository.UsuarioRepository;

import java.math.BigDecimal;

@Configuration
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final EnderecoRepository enderecoRepository;
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if(usuarioRepository.count() == 0) { // evita duplicar usuários

            // Usuário 1

            Endereco endereco1 = enderecoRepository.save(new Endereco("85895-100", "Avenida Brasil", "PR", "Maringá",
                    "Vila Madalena", "284", "", BigDecimal.valueOf( -26.265729), BigDecimal.valueOf(-48.861439)));

            usuarioRepository.save(
                    new Usuario(
                            "suzane",
                            passwordEncoder.encode("1234"),
                            Perfil.COLETOR,
                            endereco1
                    )
            );

            // Usuário 2
            Endereco endereco2 = enderecoRepository.save(new Endereco("85895-101", "Rua das Flores", "PR", "Maringá",
                    "Centro", "100", "Apto 101", BigDecimal.valueOf(-26.265800), BigDecimal.valueOf(-48.861500)));
            usuarioRepository.save(
                    new Usuario(
                            "bob",
                            passwordEncoder.encode("1234"),
                            Perfil.COLETOR,
                            endereco2
                    )
            );

            // Usuário 3
            Endereco endereco3 = enderecoRepository.save(new Endereco("85895-102", "Rua Primavera", "PR", "Maringá",
                    "Jardim América", "50", "", BigDecimal.valueOf(-26.266000), BigDecimal.valueOf(-48.861600)));
            usuarioRepository.save(
                    new Usuario(
                            "alice",
                            passwordEncoder.encode("1234"),
                            Perfil.COLETOR,
                            endereco3
                    )
            );

            System.out.println("Usuários iniciais criados!");
        }
    }
}
