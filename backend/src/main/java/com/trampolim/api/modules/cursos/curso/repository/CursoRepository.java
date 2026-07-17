package com.trampolim.api.modules.cursos.curso.repository;

import com.trampolim.api.modules.cursos.curso.model.Curso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CursoRepository extends JpaRepository<Curso, Long> {
    List<Curso> findByCategoriaIgnoreCase(String categoria);
}
