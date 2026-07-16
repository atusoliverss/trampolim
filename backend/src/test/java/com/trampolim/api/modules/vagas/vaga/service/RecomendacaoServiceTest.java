package com.trampolim.api.modules.vagas.vaga.service;

import com.trampolim.api.modules.core.diagnostico.model.Diagnostico;
import com.trampolim.api.modules.vagas.vaga.model.Vaga;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(MockitoExtension.class)
class RecomendacaoServiceTest {

    @InjectMocks
    private RecomendacaoService recomendacaoService;

    private Diagnostico diagnosticoMock;

    @BeforeEach
    void setUp() {
        diagnosticoMock = Diagnostico.builder()
                .localizacao("Irecê - BA")
                .disponibilidadeTempo("INTEGRAL")
                .habilidades(List.of("Java", "Spring Boot", "SQL"))
                .build();
    }

    @Test
    void testCalcularMatchScore_100PorCento() {
        Vaga vaga = Vaga.builder()
                .local("Irecê - BA")
                .periodo("INTEGRAL")
                .requisitos(List.of("Java", "Spring Boot", "SQL"))
                .build();

        double score = recomendacaoService.calcularMatchScore(diagnosticoMock, vaga);
        assertEquals(100.0, score, "Deveria ser 100% de match");
    }

    @Test
    void testCalcularMatchScore_SemRequisitos() {
        Vaga vaga = Vaga.builder()
                .local("Irecê - BA") // +30
                .periodo("INTEGRAL") // +20
                .requisitos(List.of()) // +50 (se vaga não exige, o match é 100% nos requisitos)
                .build();

        double score = recomendacaoService.calcularMatchScore(diagnosticoMock, vaga);
        assertEquals(100.0, score);
    }

    @Test
    void testCalcularMatchScore_LocalRemoto() {
        Vaga vaga = Vaga.builder()
                .local("Remoto") // +20
                .periodo("INTEGRAL") // +20
                .requisitos(List.of("Java")) // (1/1) * 50 = +50
                .build();

        double score = recomendacaoService.calcularMatchScore(diagnosticoMock, vaga);
        assertEquals(90.0, score, "Deveria ser 90% (20 local remoto, 20 periodo, 50 requisitos)");
    }

    @Test
    void testCalcularMatchScore_MatchParcialRequisitos() {
        Vaga vaga = Vaga.builder()
                .local("Irecê - BA") // +30
                .periodo("INTEGRAL") // +20
                .requisitos(List.of("Java", "React", "AWS", "Spring Boot")) // 2 skills batem de 4 (50% de 50 = 25)
                .build();

        double score = recomendacaoService.calcularMatchScore(diagnosticoMock, vaga);
        assertEquals(75.0, score, "Deveria ser 75% (30 + 20 + 25)");
    }

    @Test
    void testCalcularMatchScore_DisponibilidadeIntegralParaVagaMeioPeriodo() {
        Vaga vaga = Vaga.builder()
                .local("Irecê - BA") // +30
                .periodo("MEIO_PERIODO") // +20 (Porque user é INTEGRAL e atende MEIO_PERIODO)
                .requisitos(List.of("SQL")) // +50
                .build();

        double score = recomendacaoService.calcularMatchScore(diagnosticoMock, vaga);
        assertEquals(100.0, score, "Usuário integral deveria pontuar para vaga meio-período");
    }

    @Test
    void testCalcularMatchScore_DisponibilidadeMeioPeriodoParaVagaIntegral() {
        Diagnostico diagnosticoMeioPeriodo = Diagnostico.builder()
                .localizacao("Irecê - BA")
                .disponibilidadeTempo("MEIO_PERIODO")
                .habilidades(List.of("Java"))
                .build();

        Vaga vaga = Vaga.builder()
                .local("Irecê - BA") // +30
                .periodo("INTEGRAL") // +0 (Meio periodo nao atende integral)
                .requisitos(List.of("Java")) // +50
                .build();

        double score = recomendacaoService.calcularMatchScore(diagnosticoMeioPeriodo, vaga);
        assertEquals(80.0, score, "Usuário meio-período NÃO pontua para vaga integral");
    }
}
