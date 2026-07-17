package com.trampolim.api.controller;

import com.trampolim.api.controller.dto.CadastroDTO;
import com.trampolim.api.controller.dto.LoginDTO;
import com.trampolim.api.controller.dto.TokenResponseDTO;
import com.trampolim.api.domain.usuario.Usuario;
import com.trampolim.api.domain.usuario.UsuarioRepository;
import com.trampolim.api.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @PostMapping("/cadastro")
    public ResponseEntity<?> cadastrar(@RequestBody CadastroDTO dto) {
        if (usuarioRepository.findByEmail(dto.email()).isPresent()) {
            return ResponseEntity.badRequest().body("Email já cadastrado");
        }

        Usuario novoUsuario = new Usuario();
        novoUsuario.setNome(dto.nome());
        novoUsuario.setEmail(dto.email());
        novoUsuario.setSenha(passwordEncoder.encode(dto.senha()));

        usuarioRepository.save(novoUsuario);

        return ResponseEntity.ok().body("Usuário cadastrado com sucesso!");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO dto) {
        var usuarioOptional = usuarioRepository.findByEmail(dto.email());

        if (usuarioOptional.isEmpty()) {
            return ResponseEntity.status(401).body("Credenciais inválidas");
        }

        var usuario = usuarioOptional.get();
        if (passwordEncoder.matches(dto.senha(), usuario.getSenha())) {
            var token = jwtUtil.generateToken(usuario.getEmail());
            return ResponseEntity.ok(new TokenResponseDTO(token));
        }

        return ResponseEntity.status(401).body("Credenciais inválidas");
    }
}
