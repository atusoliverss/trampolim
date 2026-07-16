package com.trampolim.api.modules.vagas.vaga.controller;

import com.trampolim.api.modules.vagas.vaga.dto.VagaRequestDTO;
import com.trampolim.api.modules.vagas.vaga.dto.VagaResponseDTO;
import com.trampolim.api.modules.vagas.vaga.service.RecomendacaoService;
import com.trampolim.api.modules.vagas.vaga.service.VagaService;
import com.trampolim.api.modules.core.usuario.repository.UsuarioRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class VagaControllerTest {

    @InjectMocks
    private VagaController vagaController;

    @Mock
    private VagaService vagaService;

    @Mock
    private RecomendacaoService recomendacaoService;

    @Mock
    private UsuarioRepository usuarioRepository;

    private VagaRequestDTO requestDTO;
    private VagaResponseDTO responseDTO;

    @BeforeEach
    void setUp() {
        requestDTO = new VagaRequestDTO();
        requestDTO.setEmpresa("Empresa X");
        requestDTO.setTitulo("Dev Junior");

        responseDTO = VagaResponseDTO.builder()
                .id(1L)
                .empresa("Empresa X")
                .titulo("Dev Junior")
                .build();
    }

    @Test
    void testCriarVaga() {
        when(vagaService.criarVaga(any(VagaRequestDTO.class))).thenReturn(responseDTO);

        ResponseEntity<VagaResponseDTO> response = vagaController.criarVaga(requestDTO);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals("Empresa X", response.getBody().getEmpresa());
        verify(vagaService, times(1)).criarVaga(any());
    }

    @Test
    void testListarTodas() {
        when(vagaService.listarTodas()).thenReturn(List.of(responseDTO));

        ResponseEntity<List<VagaResponseDTO>> response = vagaController.listarTodas();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(1, response.getBody().size());
    }

    @Test
    void testDeletarVaga() {
        doNothing().when(vagaService).deletarVaga(1L);

        ResponseEntity<Void> response = vagaController.deletarVaga(1L);

        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        verify(vagaService, times(1)).deletarVaga(1L);
    }
}
