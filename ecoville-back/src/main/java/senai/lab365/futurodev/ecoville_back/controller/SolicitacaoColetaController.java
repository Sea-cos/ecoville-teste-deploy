package senai.lab365.futurodev.ecoville_back.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import senai.lab365.futurodev.ecoville_back.dtos.SolicitacaoColetaRequestDto;
import senai.lab365.futurodev.ecoville_back.dtos.SolicitacaoColetaResponseDto;
import senai.lab365.futurodev.ecoville_back.entity.SolicitacaoColeta;
import senai.lab365.futurodev.ecoville_back.service.SolicitacaoColetaService;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/coletas")
public class SolicitacaoColetaController {

    private final SolicitacaoColetaService solicitacaoService;

    @PostMapping
    public ResponseEntity<SolicitacaoColetaResponseDto> criarSolicitacao(@RequestParam Integer usuarioId,
                                                                         @RequestBody SolicitacaoColetaRequestDto dto) {
        return ResponseEntity.ok(solicitacaoService.criarSolicitacao(usuarioId, dto));
    }

    @GetMapping("/minhas")
    public ResponseEntity<List<SolicitacaoColetaResponseDto>> listarMinhas(@RequestParam Long usuarioId) {
        return ResponseEntity.ok(solicitacaoService.listarMinhasSolicitacoes(usuarioId));
    }

    @PatchMapping("/{id}/aceitar")
    public ResponseEntity<SolicitacaoColetaResponseDto> aceitar(@PathVariable Integer id,
                                                     @RequestParam Integer coletorId) {
        return ResponseEntity.ok(solicitacaoService.aceitarSolicitacao(id, coletorId));
    }

    @PatchMapping("/{id}/cancelar")
    public ResponseEntity<SolicitacaoColetaResponseDto> cancelar(@PathVariable Integer id) {
        return ResponseEntity.ok(solicitacaoService.cancelarSolicitacao(id));
    }

    @PatchMapping("/{id}/finalizar")
    public ResponseEntity<SolicitacaoColetaResponseDto> finalizar(@PathVariable Integer id) {
        return ResponseEntity.ok(solicitacaoService.finalizarSolicitacao(id));
    }

    @PatchMapping("/{id}/feedback")
    public ResponseEntity<SolicitacaoColetaResponseDto> feedback(@PathVariable Integer id,
                                                      @RequestParam String feedback) {
        return ResponseEntity.ok(solicitacaoService.adicionarFeedback(id, feedback));
    }
}
