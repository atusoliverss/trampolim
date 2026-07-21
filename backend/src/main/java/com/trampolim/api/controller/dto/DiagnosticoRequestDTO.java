package com.trampolim.api.controller.dto;

import java.util.List;

public record DiagnosticoRequestDTO(List<String> alternativasMarcadas, String perfil) {
}
