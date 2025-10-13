package senai.lab365.futurodev.ecoville_back.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import senai.lab365.futurodev.ecoville_back.enums.Perfil;

@Entity
@Getter
@Setter
@NoArgsConstructor

public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 50)
    private String nomeDeUsuario;

    @Column(nullable = false)
    private String senha;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Perfil perfil = Perfil.RESIDENCIAL;

    @OneToOne
    @JoinColumn(name="enderecoId", nullable = false)
    private Endereco idEndereco;

    public Usuario(String nomeDeUsuario, String senha, Perfil perfil, Endereco idEndereco) {
        this.nomeDeUsuario = nomeDeUsuario;
        this.senha = senha;
        this.perfil = perfil;
        this.idEndereco = idEndereco;
    }
}
