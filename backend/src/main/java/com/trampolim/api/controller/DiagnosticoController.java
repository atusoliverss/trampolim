package com.trampolim.api.controller;

import com.trampolim.api.controller.dto.DiagnosticoRequestDTO;
import com.trampolim.api.controller.dto.DiagnosticoResponseDTO;
import com.trampolim.api.modules.core.diagnostico.model.Diagnostico;
import com.trampolim.api.modules.core.diagnostico.repository.DiagnosticoRepository;
import com.trampolim.api.modules.core.usuario.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/diagnostico")
@RequiredArgsConstructor
public class DiagnosticoController {

    private final DiagnosticoRepository diagnosticoRepository;
    private final UsuarioRepository usuarioRepository;

    @PostMapping
    public ResponseEntity<?> processarDiagnostico(@RequestBody DiagnosticoRequestDTO dto) {
        var email = SecurityContextHolder.getContext().getAuthentication().getName();

        var usuarioOptional = usuarioRepository.findByEmail(email);
        if (usuarioOptional.isEmpty()) {
            return ResponseEntity.status(401).body("Usuário não encontrado ou não autenticado.");
        }

        var usuario = usuarioOptional.get();

        // Lógica simples de processamento do perfil baseada nas respostas
        String perfil = determinarPerfil(dto);

        Diagnostico diagnostico = new Diagnostico();
        diagnostico.setLocalizacao("Remoto"); // Preenchimento default
        diagnostico.setDisponibilidadeTempo("INTEGRAL"); // Preenchimento default
        diagnostico.setHabilidades(dto.alternativasMarcadas());
        diagnostico.setUsuario(usuario);

        diagnosticoRepository.save(diagnostico);

        return ResponseEntity.ok(new DiagnosticoResponseDTO(perfil, "Diagnóstico processado e salvo com sucesso!"));
    }

    private String determinarPerfil(DiagnosticoRequestDTO dto) {
        // Exemplo simples: caso as respostas contenham "vendas" ou a lista seja de um certo tamanho
        // Na prática, você pode injetar um Service com as regras de negócio reais do cliente
        if (dto.alternativasMarcadas() != null && dto.alternativasMarcadas().stream().anyMatch(a -> a.toLowerCase().contains("vendas") || a.toLowerCase().contains("atendimento"))) {
            return "Atendimento & Vendas";
        } else if (dto.alternativasMarcadas() != null && dto.alternativasMarcadas().stream().anyMatch(a -> a.toLowerCase().contains("tecnologia"))) {
            return "Tecnologia & Dados";
        }
        
        return "Perfil Geral / A Definir";
    }
}
