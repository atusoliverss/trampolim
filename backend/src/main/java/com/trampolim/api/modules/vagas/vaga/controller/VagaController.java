package com.trampolim.api.modules.vagas.vaga.controller;

import com.trampolim.api.modules.vagas.vaga.dto.VagaRecomendadaDTO;
import com.trampolim.api.modules.vagas.vaga.dto.VagaRequestDTO;
import com.trampolim.api.modules.vagas.vaga.dto.VagaResponseDTO;
import com.trampolim.api.modules.core.usuario.model.Usuario;
import com.trampolim.api.modules.core.usuario.repository.UsuarioRepository;
import com.trampolim.api.modules.vagas.vaga.service.RecomendacaoService;
import com.trampolim.api.modules.vagas.vaga.service.VagaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vagas")
@RequiredArgsConstructor
public class VagaController {

    private final VagaService vagaService;
    private final RecomendacaoService recomendacaoService;
    private final UsuarioRepository usuarioRepository;

    @PostMapping
    public ResponseEntity<VagaResponseDTO> criarVaga(@RequestBody @Valid VagaRequestDTO request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(vagaService.criarVaga(request));
    }

    @GetMapping
    public ResponseEntity<List<VagaResponseDTO>> listarTodas() {
        return ResponseEntity.ok(vagaService.listarTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<VagaResponseDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(vagaService.buscarPorId(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<VagaResponseDTO> atualizarVaga(@PathVariable Long id, @RequestBody @Valid VagaRequestDTO request) {
        return ResponseEntity.ok(vagaService.atualizarVaga(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarVaga(@PathVariable Long id) {
        vagaService.deletarVaga(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/recomendadas")
    public ResponseEntity<List<VagaRecomendadaDTO>> obterVagasRecomendadas() {
        // Extrai o usuário logado via Spring Security Context
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String email = authentication.getName(); // Assumindo que o principal é o email (padrão em JWT)
        
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado com o email: " + email));

        List<VagaRecomendadaDTO> recomendadas = recomendacaoService.recomendarVagasParaUsuario(usuario.getId());
        return ResponseEntity.ok(recomendadas);
    }
}
