package com.trampolim.api.modules.vagas.vaga.service;

import com.trampolim.api.modules.vagas.vaga.dto.VagaRequestDTO;
import com.trampolim.api.modules.vagas.vaga.dto.VagaResponseDTO;
import com.trampolim.api.modules.vagas.vaga.model.Vaga;
import com.trampolim.api.modules.vagas.vaga.repository.VagaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VagaService {

    private final VagaRepository vagaRepository;

    public VagaResponseDTO criarVaga(VagaRequestDTO request) {
        Vaga vaga = Vaga.builder()
                .empresa(request.getEmpresa())
                .titulo(request.getTitulo())
                .local(request.getLocal())
                .periodo(request.getPeriodo())
                .descricao(request.getDescricao())
                .contatos(request.getContatos())
                .requisitos(request.getRequisitos())
                .build();
        
        Vaga vagaSalva = vagaRepository.save(vaga);
        return VagaResponseDTO.fromEntity(vagaSalva);
    }

    public List<VagaResponseDTO> listarTodas() {
        return vagaRepository.findAll().stream()
                .map(VagaResponseDTO::fromEntity)
                .collect(Collectors.toList());
    }

    public VagaResponseDTO buscarPorId(Long id) {
        Vaga vaga = vagaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vaga não encontrada com ID: " + id));
        return VagaResponseDTO.fromEntity(vaga);
    }

    public VagaResponseDTO atualizarVaga(Long id, VagaRequestDTO request) {
        Vaga vaga = vagaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vaga não encontrada com ID: " + id));

        vaga.setEmpresa(request.getEmpresa());
        vaga.setTitulo(request.getTitulo());
        vaga.setLocal(request.getLocal());
        vaga.setPeriodo(request.getPeriodo());
        vaga.setDescricao(request.getDescricao());
        vaga.setContatos(request.getContatos());
        vaga.setRequisitos(request.getRequisitos());

        Vaga vagaAtualizada = vagaRepository.save(vaga);
        return VagaResponseDTO.fromEntity(vagaAtualizada);
    }

    public void deletarVaga(Long id) {
        if (!vagaRepository.existsById(id)) {
            throw new RuntimeException("Vaga não encontrada com ID: " + id);
        }
        vagaRepository.deleteById(id);
    }
}
