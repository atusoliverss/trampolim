package com.trampolim.api.modules.vagas.vaga.service;

import com.trampolim.api.modules.vagas.vaga.dto.VagaRecomendadaDTO;
import com.trampolim.api.modules.vagas.vaga.dto.VagaResponseDTO;
import com.trampolim.api.modules.core.diagnostico.model.Diagnostico;
import com.trampolim.api.modules.vagas.vaga.model.Vaga;
import com.trampolim.api.modules.core.diagnostico.repository.DiagnosticoRepository;
import com.trampolim.api.modules.vagas.vaga.repository.VagaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RecomendacaoService {

    private final VagaRepository vagaRepository;
    private final DiagnosticoRepository diagnosticoRepository;

    public List<VagaRecomendadaDTO> recomendarVagasParaUsuario(Long usuarioId) {
        Diagnostico diagnostico = diagnosticoRepository.findByUsuarioId(usuarioId).orElse(null);

        List<Vaga> todasVagas = vagaRepository.findAll().stream().distinct().collect(Collectors.toList());
        
        if (diagnostico == null) {
            // Se o usuário não tem diagnóstico, retorna as últimas vagas como default
            return todasVagas.stream()
                    .limit(5)
                    .map(vaga -> VagaRecomendadaDTO.builder()
                            .vaga(VagaResponseDTO.fromEntity(vaga))
                            .matchScore(0.0)
                            .build())
                    .collect(Collectors.toList());
        }

        List<VagaRecomendadaDTO> vagasRecomendadas = new ArrayList<>();

        for (Vaga vaga : todasVagas) {
            double score = calcularMatchScore(diagnostico, vaga);
            vagasRecomendadas.add(VagaRecomendadaDTO.builder()
                    .vaga(VagaResponseDTO.fromEntity(vaga))
                    .matchScore(score)
                    .build());
        }

        // Ordena por maior pontuação (match score) decrescente
        return vagasRecomendadas.stream()
                .sorted(Comparator.comparingDouble(VagaRecomendadaDTO::getMatchScore).reversed())
                .collect(Collectors.toList());
    }

    public double calcularMatchScore(Diagnostico diagnostico, Vaga vaga) {
        double scoreTotal = 0.0;

        // 1. Localização (Peso: 30)
        // Ignora case e trim para facilitar comparação. Pode ser mais complexo no futuro (Raio geográfico).
        if (diagnostico.getLocalizacao() != null && vaga.getLocal() != null) {
            if (vaga.getLocal().trim().equalsIgnoreCase(diagnostico.getLocalizacao().trim())) {
                scoreTotal += 30.0;
            } else if (vaga.getLocal().trim().equalsIgnoreCase("Remoto")) {
                scoreTotal += 20.0; // Vaga remota atende qualquer localidade parcialmente (ou totalmente dependendo da regra, definindo 20)
            }
        }

        // 2. Período (Peso: 20)
        if (diagnostico.getDisponibilidadeTempo() != null && vaga.getPeriodo() != null) {
            if (vaga.getPeriodo().trim().equalsIgnoreCase(diagnostico.getDisponibilidadeTempo().trim())) {
                scoreTotal += 20.0;
            }
            // Se o usuário tem disponibilidade INTEGRAL e a vaga é MEIO_PERIODO, atende.
            else if (diagnostico.getDisponibilidadeTempo().trim().equalsIgnoreCase("INTEGRAL")
                    && vaga.getPeriodo().trim().equalsIgnoreCase("MEIO_PERIODO")) {
                scoreTotal += 20.0; 
            }
        }

        // 3. Requisitos/Habilidades (Peso: 50)
        List<String> habilidadesUser = diagnostico.getHabilidades() != null ? diagnostico.getHabilidades() : new ArrayList<>();
        List<String> requisitosVaga = vaga.getRequisitos() != null ? vaga.getRequisitos() : new ArrayList<>();

        if (requisitosVaga.isEmpty()) {
            // Se a vaga não exige nada, tem 100% de match nesse quesito?
            scoreTotal += 50.0;
        } else {
            // Se o perfil bate diretamente com um requisito (ex: Requisito = "Logistica", Perfil = "Logistica")
            boolean hasProfileMatch = diagnostico.getPerfil() != null &&
                    requisitosVaga.stream().anyMatch(req -> req.trim().equalsIgnoreCase(diagnostico.getPerfil().trim()));
            
            if (hasProfileMatch) {
                scoreTotal += 50.0;
            } else if (!habilidadesUser.isEmpty()) {
                // Normalizar para case insensitive
                List<String> userSkillsLower = habilidadesUser.stream()
                        .map(String::toLowerCase)
                        .map(String::trim)
                        .toList();

                long countMatch = requisitosVaga.stream()
                        .map(String::toLowerCase)
                        .map(String::trim)
                        .filter(userSkillsLower::contains)
                        .count();

                double percentualRequisitos = (double) countMatch / requisitosVaga.size();
                scoreTotal += (percentualRequisitos * 50.0);
            }
        }

        // Arredondar para duas casas decimais
        return Math.round(scoreTotal * 100.0) / 100.0;
    }
}
