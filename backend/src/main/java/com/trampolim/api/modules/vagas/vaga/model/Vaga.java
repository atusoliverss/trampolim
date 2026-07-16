package com.trampolim.api.modules.vagas.vaga.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "vagas")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Vaga {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String empresa;

    @Column(nullable = false)
    private String titulo;

    @Column(nullable = false)
    private String local;

    @Column(nullable = false)
    private String periodo; // INTEGRAL, MEIO_PERIODO

    @Column(columnDefinition = "TEXT")
    private String descricao;

    private String contatos;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "vaga_requisitos", joinColumns = @JoinColumn(name = "vaga_id"))
    @Column(name = "requisito")
    private List<String> requisitos;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

}
