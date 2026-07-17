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
        if (diagnostico == null || diagnostico.getHabilidades() == null || diagnostico.getHabilidades().isEmpty()) {
            return getDefaultCursos();
        }

        String categoriaPerfil = determinarCategoriaPerfil(diagnostico.getHabilidades());
        
        List<Curso> recomendados = cursoRepository.findByCategoriaIgnoreCase(categoriaPerfil);
        
        if (recomendados.isEmpty()) {
            recomendados = getDefaultCursos();
        }

        // Limita a 3 cursos
        return recomendados.stream().limit(3).collect(Collectors.toList());
    }

    private String determinarCategoriaPerfil(List<String> habilidades) {
        String habsConcatenadas = String.join(" ", habilidades).toLowerCase();
        
        if (habsConcatenadas.contains("vendas") || habsConcatenadas.contains("negociação") || habsConcatenadas.contains("comércio")) {
            return "Vendas";
        } else if (habsConcatenadas.contains("atendimento") || habsConcatenadas.contains("comunicação") || habsConcatenadas.contains("público")) {
            return "Atendimento";
        } else if (habsConcatenadas.contains("tecnologia") || habsConcatenadas.contains("computador") || habsConcatenadas.contains("programação")) {
            return "Tecnologia";
        }
        
        return "Geral";
    }

    private List<Curso> getDefaultCursos() {
        return cursoRepository.findAll().stream().limit(3).collect(Collectors.toList());
    }
}
