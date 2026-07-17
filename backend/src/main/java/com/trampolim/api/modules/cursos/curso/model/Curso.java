package com.trampolim.api.modules.cursos.curso.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "cursos")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Curso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String titulo;

    @Column(nullable = false)
    private String cargaHoraria;

    @Column(nullable = false)
    private String instituicao;

    @Column(columnDefinition = "TEXT")
    private String descricao;

    @Column(nullable = false)
    private String linkOficial;

    @Column(nullable = false)
    private String categoria; // Para facilitar o match (ex: Atendimento, Vendas, Tecnologia)
}
