package senai.lab365.futurodev.ecoville_back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import senai.lab365.futurodev.ecoville_back.entity.Usuario;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

    Optional<Usuario> findByNomeDeUsuario(String nomeDeUsuario);
}
