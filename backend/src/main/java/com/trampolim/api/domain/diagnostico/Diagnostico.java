package com.trampolim.api.domain.diagnostico;

import com.trampolim.api.domain.usuario.Usuario;
import jakarta.persistence.*;
import lombok.*;

@Table(name = "diagnosticos")
@Entity(name = "Diagnostico")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Diagnostico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String perfil;

    @Column(columnDefinition = "TEXT")
    private String alternativasProcessadas;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;
}
