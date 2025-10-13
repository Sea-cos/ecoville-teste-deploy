package senai.lab365.futurodev.ecoville_back.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import senai.lab365.futurodev.ecoville_back.enums.StatusColeta;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class SolicitacaoColeta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "usuarioResidencialId")
    private Usuario usuarioResidencial;

    @ManyToOne
    @JoinColumn(name = "coletorId")
    private Usuario coletor;

    private LocalDateTime dataSolicitacao;
    private LocalDate dataAgendada;

    @Column(length = 500)
    private String observacoes;

    @Enumerated(EnumType.STRING)
    private StatusColeta status = StatusColeta.AGUARDANDO;

    @Column(length = 500)
    private String feedback;

    @OneToMany(mappedBy = "solicitacaoColeta", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ItemColeta> items = new ArrayList<>();

    public void setUsuarioResidencial(Usuario usuario) {
        this.usuarioResidencial = usuario;
    }

    public void setColetor(Usuario coletor) {
        this.coletor = coletor;
    }

    public void adicionarFeedback(String feedback) {
        this.feedback = feedback;
    }

    public void aceitar(Usuario coletor) {
        this.coletor = coletor;
        this.status = StatusColeta.ACEITA;
    }

    public void cancelar() {
        this.status = StatusColeta.CANCELADA;
    }

    public void finalizar() {
        this.status = StatusColeta.FINALIZADA;
    }


}