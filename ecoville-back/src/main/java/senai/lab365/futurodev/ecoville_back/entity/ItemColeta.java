package senai.lab365.futurodev.ecoville_back.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import senai.lab365.futurodev.ecoville_back.enums.EstadoMaterial;
import senai.lab365.futurodev.ecoville_back.enums.TipoMaterial;

import java.math.BigDecimal;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class ItemColeta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private TipoMaterial tipo;

    @Column(nullable = false)
    private BigDecimal quantidadeEstimadaKg;

    @Column(nullable = true)
    private BigDecimal quantidadeValidadaKg;

    @Enumerated(EnumType.STRING)
    private EstadoMaterial estado;

    @ManyToOne
    @JoinColumn(nullable = false, name = "solicitacaoId")
    private SolicitacaoColeta solicitacaoColeta;

    public ItemColeta(TipoMaterial tipo, BigDecimal quantidadeEstimadaKg, BigDecimal quantidadeValidadaKg, EstadoMaterial estado, SolicitacaoColeta solicitacaoColeta) {
        this.tipo = tipo;
        this.quantidadeEstimadaKg = quantidadeEstimadaKg;
        this.quantidadeValidadaKg = quantidadeValidadaKg;
        this.estado = estado;
        this.solicitacaoColeta = solicitacaoColeta;
    }

    public ItemColeta(TipoMaterial tipo, BigDecimal quantidadeEstimadaKg, BigDecimal quantidadeValidadaKg, EstadoMaterial estado) {
        this.tipo = tipo;
        this.quantidadeEstimadaKg = quantidadeEstimadaKg;
        this.quantidadeValidadaKg = quantidadeValidadaKg;
        this.estado = estado;
    }
}
