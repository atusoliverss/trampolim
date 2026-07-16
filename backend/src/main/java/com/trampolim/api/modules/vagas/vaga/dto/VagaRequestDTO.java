package com.trampolim.api.modules.vagas.vaga.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import java.util.List;

@Data
public class VagaRequestDTO {
    @NotBlank(message = "A empresa é obrigatória")
    private String empresa;
    
    @NotBlank(message = "O título é obrigatório")
    private String titulo;
    
    @NotBlank(message = "O local é obrigatório")
    private String local;
    
    @NotBlank(message = "O período é obrigatório")
    private String periodo;
    
    private String descricao;
    private String contatos;
    private List<String> requisitos;
}
