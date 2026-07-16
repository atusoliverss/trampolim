package com.trampolim.api.modules.core.diagnostico.repository;

import com.trampolim.api.modules.core.diagnostico.model.Diagnostico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DiagnosticoRepository extends JpaRepository<Diagnostico, Long> {
    Optional<Diagnostico> findByUsuarioId(Long usuarioId);
}
