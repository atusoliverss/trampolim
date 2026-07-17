-- Popular Tabela de Cursos (Para o Rian - Cursos de SENAI, SEBRAE)
INSERT INTO cursos (titulo, carga_horaria, instituicao, descricao, link_oficial, categoria) VALUES 
('Técnicas de Vendas no Varejo', '40h', 'SEBRAE', 'Aprenda as melhores estratégias de vendas e atendimento ao cliente no varejo, melhorando sua performance.', 'https://www.sebrae.com.br/cursos', 'Vendas'),
('Marketing Digital para Empreendedores', '60h', 'SEBRAE', 'Entenda como usar as redes sociais e o marketing digital para alavancar suas vendas online.', 'https://www.sebrae.com.br/cursos', 'Vendas'),
('Excelência no Atendimento', '20h', 'SENAC', 'Desenvolva habilidades de comunicação e atendimento para encantar o cliente e fidelizar seu público.', 'https://www.ba.senac.br/cursos', 'Atendimento'),
('Comunicação Assertiva e Relacionamento', '30h', 'SEBRAE', 'Melhore a forma como você se comunica no ambiente de trabalho e com clientes.', 'https://www.sebrae.com.br/cursos', 'Atendimento'),
('Introdução à Lógica de Programação', '80h', 'SENAI', 'Aprenda os conceitos básicos de programação e dê o primeiro passo na área de tecnologia.', 'https://www.fieb.org.br/senai', 'Tecnologia'),
('Montagem e Manutenção de Computadores', '120h', 'SENAI', 'Curso prático para quem deseja trabalhar com manutenção de hardware e suporte de TI.', 'https://www.fieb.org.br/senai', 'Tecnologia'),
('Empreendedorismo Básico', '40h', 'SEBRAE', 'Dicas essenciais de como começar seu próprio negócio e ter uma visão empreendedora do mercado.', 'https://www.sebrae.com.br/cursos', 'Geral');

-- Popular Tabela de Vagas (Para o Flavio - Teste do Match)
INSERT INTO vagas (empresa, titulo, local, periodo, descricao, contatos, created_at, updated_at) VALUES 
('Lojas Irecê Center', 'Vendedor de Loja', 'Irecê - BA', 'INTEGRAL', 'Buscamos jovem proativo para atuar em vendas diretas na loja física.', 'contato@lojasirece.com.br', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Tech Soluções', 'Suporte Técnico Nível 1', 'Irecê - BA', 'INTEGRAL', 'Vaga para auxiliar no suporte de TI, manutenção de computadores e atendimento aos usuários.', 'rh@techsolucoes.com.br', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Mercadinho São João', 'Atendente de Caixa', 'Irecê - BA', 'MEIO_PERIODO', 'Oportunidade para primeiro emprego atuando no caixa e atendimento ao cliente.', 'vagas@mercadinhosaojoao.com', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Popular Tabela de Requisitos das Vagas
-- Vendedor de Loja (ID 1)
INSERT INTO vaga_requisitos (vaga_id, requisito) VALUES (1, 'Vendas');
INSERT INTO vaga_requisitos (vaga_id, requisito) VALUES (1, 'Boa comunicação');
INSERT INTO vaga_requisitos (vaga_id, requisito) VALUES (1, 'Disponibilidade integral');

-- Suporte Técnico Nível 1 (ID 2)
INSERT INTO vaga_requisitos (vaga_id, requisito) VALUES (2, 'Tecnologia');
INSERT INTO vaga_requisitos (vaga_id, requisito) VALUES (2, 'Conhecimento em Informática');
INSERT INTO vaga_requisitos (vaga_id, requisito) VALUES (2, 'Suporte');

-- Atendente de Caixa (ID 3)
INSERT INTO vaga_requisitos (vaga_id, requisito) VALUES (3, 'Atendimento');
INSERT INTO vaga_requisitos (vaga_id, requisito) VALUES (3, 'Organização');
INSERT INTO vaga_requisitos (vaga_id, requisito) VALUES (3, 'Meio Período');
