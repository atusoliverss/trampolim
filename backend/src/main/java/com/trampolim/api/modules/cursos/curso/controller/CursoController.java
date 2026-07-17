package com.trampolim.api.modules.cursos.curso.controller;

import com.trampolim.api.modules.cursos.curso.model.Curso;
import com.trampolim.api.modules.cursos.curso.service.CursoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/cursos")
@RequiredArgsConstructor
public class CursoController {

    private final CursoService cursoService;

    @GetMapping("/recomendados")
    public ResponseEntity<List<Curso>> getCursosRecomendados() {
        String email = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        List<Curso> recomendados = cursoService.recomendarCursos(email);
        return ResponseEntity.ok(recomendados);
    }
}
