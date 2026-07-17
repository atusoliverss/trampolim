package com.trampolim.api.modules.core.diagnostico.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import com.trampolim.api.modules.core.usuario.model.Usuario;

@Entity
@Table(name = "diagnosticos")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Diagnostico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    private String localizacao;

    private String disponibilidadeTempo; // e.g. INTEGRAL, MEIO_PERIODO

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "diagnostico_habilidades", joinColumns = @JoinColumn(name = "diagnostico_id"))
    @Column(name = "habilidade")
    private List<String> habilidades;

}
