-- Popular Tabela de Cursos (Para o Rian - Cursos de SENAI, SEBRAE)
INSERT INTO cursos (titulo, carga_horaria, instituicao, descricao, link_oficial, categoria) VALUES 
('Técnicas de Vendas no Varejo', '40h', 'SEBRAE', 'Aprenda as melhores estratégias de vendas e atendimento ao cliente no varejo, melhorando sua performance.', 'https://www.sebrae.com.br/cursos', 'Comercial'),
('Marketing Digital para Empreendedores', '60h', 'SEBRAE', 'Entenda como usar as redes sociais e o marketing digital para alavancar suas vendas online.', 'https://www.sebrae.com.br/cursos', 'Comercial'),

('Excelência no Atendimento', '20h', 'SENAC', 'Desenvolva habilidades de comunicação e atendimento para encantar o cliente e fidelizar seu público.', 'https://www.ba.senac.br/cursos', 'Atendimento'),
('Comunicação Assertiva e Relacionamento', '30h', 'SEBRAE', 'Melhore a forma como você se comunica no ambiente de trabalho e com clientes.', 'https://www.sebrae.com.br/cursos', 'Atendimento'),

('Introdução à Lógica de Programação', '80h', 'SENAI', 'Aprenda os conceitos básicos de programação e dê o primeiro passo na área de tecnologia.', 'https://www.fieb.org.br/senai', 'Tecnologia'),
('Montagem e Manutenção de Computadores', '120h', 'SENAI', 'Curso prático para quem deseja trabalhar com manutenção de hardware e suporte de TI.', 'https://www.fieb.org.br/senai', 'Tecnologia'),

('Gestão Financeira e Administrativa', '40h', 'SENAC', 'Organização de planilhas, controle de fluxo de caixa e rotinas de escritório.', 'https://www.ba.senac.br/cursos', 'Administrativo'),
('Rotinas Administrativas Práticas', '60h', 'SEBRAE', 'Aprenda o essencial para a gestão do dia a dia e rotinas administrativas de pequenos negócios.', 'https://www.sebrae.com.br/cursos', 'Administrativo'),

('Noções de Logística e Estoque', '30h', 'SENAI', 'Aprenda a organizar almoxarifados, fazer inventários e controlar estoques de forma eficiente.', 'https://www.fieb.org.br/senai', 'Logistica'),
('Gestão de Almoxarifado', '40h', 'SENAC', 'Curso prático focado nas melhores práticas de armazenamento e distribuição.', 'https://www.ba.senac.br/cursos', 'Logistica'),

('Segurança do Trabalho e Operações', '20h', 'SENAI', 'Fundamentos de segurança e operação em ambientes de produção industrial e comercial.', 'https://www.fieb.org.br/senai', 'Operacional'),
('Boas Práticas de Fabricação', '40h', 'SENAI', 'Procedimentos operacionais padrão essenciais para o setor de indústrias e fábricas.', 'https://www.fieb.org.br/senai', 'Operacional'),

('Empreendedorismo Básico', '40h', 'SEBRAE', 'Dicas essenciais de como começar seu próprio negócio e ter uma visão empreendedora do mercado.', 'https://www.sebrae.com.br/cursos', 'Geral');

-- Popular Tabela de Vagas (Para o Flavio - Teste do Match)
INSERT INTO vagas (empresa, titulo, local, periodo, descricao, contatos, created_at, updated_at) VALUES 
('Lojas Irecê Center', 'Vendedor de Loja', 'Irecê - BA', 'INTEGRAL', 'Buscamos jovem proativo para atuar em vendas diretas na loja física.', 'contato@lojasirece.com.br', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Tech Soluções', 'Suporte Técnico Nível 1', 'Irecê - BA', 'INTEGRAL', 'Vaga para auxiliar no suporte de TI, manutenção de computadores e atendimento aos usuários.', 'rh@techsolucoes.com.br', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Mercadinho São João', 'Atendente de Caixa', 'Irecê - BA', 'MEIO_PERIODO', 'Oportunidade para primeiro emprego atuando no caixa e atendimento ao cliente.', 'vagas@mercadinhosaojoao.com', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Escritório Contábil Silva', 'Auxiliar Administrativo', 'Irecê - BA', 'INTEGRAL', 'Vaga para organização de documentos, preenchimento de planilhas e apoio na rotina do escritório.', 'rh@contabilsilva.com', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Distribuidora Irecê', 'Auxiliar de Logística', 'Irecê - BA', 'INTEGRAL', 'Apoio na separação de mercadorias, conferência de lotes e controle rigoroso de estoque.', 'vagas@distribuidorairece.com', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Indústria Alpha', 'Auxiliar de Produção', 'Irecê - BA', 'INTEGRAL', 'Atuação direta na linha de montagem, operação de maquinário básico e organização do setor.', 'rh@alpha.ind.br', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Popular Tabela de Requisitos das Vagas
-- Vendedor de Loja (ID 1)
INSERT INTO vaga_requisitos (vaga_id, requisito) VALUES (1, 'Comercial');
INSERT INTO vaga_requisitos (vaga_id, requisito) VALUES (1, 'Boa comunicação');
INSERT INTO vaga_requisitos (vaga_id, requisito) VALUES (1, 'Persuasão');

-- Suporte Técnico Nível 1 (ID 2)
INSERT INTO vaga_requisitos (vaga_id, requisito) VALUES (2, 'Tecnologia');
INSERT INTO vaga_requisitos (vaga_id, requisito) VALUES (2, 'Conhecimento em Informática');
INSERT INTO vaga_requisitos (vaga_id, requisito) VALUES (2, 'Hardware e Redes');

-- Atendente de Caixa (ID 3)
INSERT INTO vaga_requisitos (vaga_id, requisito) VALUES (3, 'Atendimento');
INSERT INTO vaga_requisitos (vaga_id, requisito) VALUES (3, 'Organização');
INSERT INTO vaga_requisitos (vaga_id, requisito) VALUES (3, 'Empatia');

-- Auxiliar Administrativo (ID 4)
INSERT INTO vaga_requisitos (vaga_id, requisito) VALUES (4, 'Administrativo');
INSERT INTO vaga_requisitos (vaga_id, requisito) VALUES (4, 'Pacote Office (Excel)');
INSERT INTO vaga_requisitos (vaga_id, requisito) VALUES (4, 'Organização de Documentos');

-- Auxiliar de Logística (ID 5)
INSERT INTO vaga_requisitos (vaga_id, requisito) VALUES (5, 'Logistica');
INSERT INTO vaga_requisitos (vaga_id, requisito) VALUES (5, 'Atenção aos Detalhes');
INSERT INTO vaga_requisitos (vaga_id, requisito) VALUES (5, 'Controle de Estoque');

-- Auxiliar de Produção (ID 6)
INSERT INTO vaga_requisitos (vaga_id, requisito) VALUES (6, 'Operacional');
INSERT INTO vaga_requisitos (vaga_id, requisito) VALUES (6, 'Agilidade');
INSERT INTO vaga_requisitos (vaga_id, requisito) VALUES (6, 'Trabalho em Equipe');
