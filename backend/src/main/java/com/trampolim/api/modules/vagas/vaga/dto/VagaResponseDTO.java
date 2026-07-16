package com.trampolim.api.modules.vagas.vaga.dto;

import com.trampolim.api.modules.vagas.vaga.model.Vaga;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VagaResponseDTO {
    private Long id;
    private String empresa;
    private String titulo;
    private String local;
    private String periodo;
    private String descricao;
    private String contatos;
    private List<String> requisitos;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static VagaResponseDTO fromEntity(Vaga vaga) {
        return VagaResponseDTO.builder()
                .id(vaga.getId())
                .empresa(vaga.getEmpresa())
                .titulo(vaga.getTitulo())
                .local(vaga.getLocal())
                .periodo(vaga.getPeriodo())
                .descricao(vaga.getDescricao())
                .contatos(vaga.getContatos())
                .requisitos(vaga.getRequisitos())
                .createdAt(vaga.getCreatedAt())
                .updatedAt(vaga.getUpdatedAt())
                .build();
    }
}
