package com.trampolim.api.modules.cursos.curso.service;

import com.trampolim.api.modules.core.diagnostico.model.Diagnostico;
import com.trampolim.api.modules.core.diagnostico.repository.DiagnosticoRepository;
import com.trampolim.api.modules.core.usuario.model.Usuario;
import com.trampolim.api.modules.core.usuario.repository.UsuarioRepository;
import com.trampolim.api.modules.cursos.curso.model.Curso;
import com.trampolim.api.modules.cursos.curso.repository.CursoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CursoService {

    private final CursoRepository cursoRepository;
    private final DiagnosticoRepository diagnosticoRepository;
    private final UsuarioRepository usuarioRepository;

    public List<Curso> recomendarCursos(String email) {
        Usuario usuario = usuarioRepository.findByEmail(email).orElse(null);
        if (usuario == null) {
            return getDefaultCursos();
        }

        Diagnostico diagnostico = diagnosticoRepository.findByUsuarioId(usuario.getId()).orElse(null);
        if (diagnostico == null || diagnostico.getPerfil() == null || diagnostico.getPerfil().isBlank()) {
            return getDefaultCursos();
        }

        String categoriaPerfil = diagnostico.getPerfil();
        
        List<Curso> recomendados = cursoRepository.findByCategoriaIgnoreCase(categoriaPerfil);
        
        if (recomendados.isEmpty()) {
            recomendados = getDefaultCursos();
        }

        // Limita a 3 cursos
        return recomendados.stream().limit(3).collect(Collectors.toList());
    }



    private List<Curso> getDefaultCursos() {
        return cursoRepository.findAll().stream().limit(3).collect(Collectors.toList());
    }
}
