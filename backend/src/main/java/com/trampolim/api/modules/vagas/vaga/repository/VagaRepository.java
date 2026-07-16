package com.trampolim.api.modules.vagas.vaga.repository;

import com.trampolim.api.modules.vagas.vaga.model.Vaga;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VagaRepository extends JpaRepository<Vaga, Long> {
}
