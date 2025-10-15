package senai.lab365.futurodev.ecoville_back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import senai.lab365.futurodev.ecoville_back.entity.SolicitacaoColeta;
import java.util.List;

public interface SolicitacaoColetaRepository extends JpaRepository<SolicitacaoColeta, Integer> {

//    List<SolicitacaoColeta> findByIdUsuario(Long idUsuario);

    List<SolicitacaoColeta> findByUsuarioResidencialId(Integer idUsuario);
}
