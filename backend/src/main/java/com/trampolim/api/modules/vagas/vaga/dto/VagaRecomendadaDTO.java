package com.trampolim.api.modules.vagas.vaga.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VagaRecomendadaDTO {
    private VagaResponseDTO vaga;
    private Double matchScore; // e.g. 92.5
}
