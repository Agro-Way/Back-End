CREATE DATABASE agroway 
DEFAULT CHARACTER SET utf8mb4 
DEFAULT COLLATE utf8mb4_general_ci;

USE agroway;

-- Tabela: funcao
CREATE TABLE funcao (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabela: usuario
CREATE TABLE usuario (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    status ENUM('ativo', 'inativo', 'pendente', 'banido') NOT NULL DEFAULT 'ativo',
    id_funcao INT NOT NULL DEFAULT 1,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(id_funcao) REFERENCES funcao(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabela: recuperar_senha
CREATE TABLE recuperar_senha (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    token VARCHAR(255) NOT NULL,
    data_solicitacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    data_expiracao DATETIME,
    usado INT DEFAULT 0,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabela: categoria_produto
CREATE TABLE categoria_produto (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE,
    descricao TEXT,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabela: produto
CREATE TABLE produto (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE,
    descricao TEXT,
    preco DECIMAL(10, 2),
    imagem_url TEXT,
    id_categoria INT NOT NULL,
    id_produtor INT NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(id_categoria) REFERENCES categoria_produto(id),
    FOREIGN KEY(id_produtor) REFERENCES usuario(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabela: estoque
CREATE TABLE estoque (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_produto INT NOT NULL,
    quantidade INT NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(id_produto) REFERENCES produto(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabela: pedido
CREATE TABLE pedido (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT NOT NULL,
    data_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_entrega DATE,
    local_entrega TEXT,
    status_pedido ENUM('pendente', 'aceito', 'recusado', 'em trânsito', 'entregue') DEFAULT 'pendente',
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(id_cliente) REFERENCES usuario(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabela: itens_pedido
CREATE TABLE itens_pedido (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_pedido INT NOT NULL,
    id_produto INT NOT NULL,
    quantidade INT NOT NULL,
    preco_unitario DECIMAL(10,2) NOT NULL,
    FOREIGN KEY(id_pedido) REFERENCES pedido(id),
    FOREIGN KEY(id_produto) REFERENCES produto(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabela: pagamento
CREATE TABLE pagamento (
    id_pagamento INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_pedido INT NOT NULL,
    metodo_pagamento ENUM('cartão', 'qrcode', 'paypal', 'visa'),
    valor_pago DECIMAL(10,2) NOT NULL,
    status_pagamento ENUM('pendente', 'confirmado', 'cancelado') DEFAULT 'pendente',
    data_pagamento TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_pedido) REFERENCES pedido(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabela: avaliacao
CREATE TABLE avaliacao (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_avaliador INT NOT NULL,
    id_avaliado INT NOT NULL,
    id_pedido INT NOT NULL,
    nota INT CHECK (nota >= 1 AND nota <= 5),
    comentario TEXT,
    data_avaliacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(id_avaliador) REFERENCES usuario(id),
    FOREIGN KEY(id_avaliado) REFERENCES usuario(id),
    FOREIGN KEY(id_pedido) REFERENCES pedido(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabela: notificacao
CREATE TABLE notificacao (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    mensagem TEXT NOT NULL,
    lida INT DEFAULT 1,
    data_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(id_usuario) REFERENCES usuario(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabela: entrega
CREATE TABLE entrega (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_pedido INT NOT NULL,
    id_motorista INT NOT NULL,
    status_entrega ENUM('pendente', 'em trânsito', 'entregue') DEFAULT 'pendente',
    data_inicio DATETIME,
    data_fim DATETIME,
    FOREIGN KEY(id_pedido) REFERENCES pedido(id),
    FOREIGN KEY(id_motorista) REFERENCES usuario(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabela: rota
CREATE TABLE rota (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_motorista INT NOT NULL,
    data_rota DATE NOT NULL,
    descricao TEXT,
    FOREIGN KEY(id_motorista) REFERENCES usuario(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabela: rota_pedidos
CREATE TABLE rota_pedidos (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_rota INT NOT NULL,
    id_pedido INT NOT NULL,
    UNIQUE(id_rota, id_pedido),
    FOREIGN KEY(id_rota) REFERENCES rota(id),
    FOREIGN KEY(id_pedido) REFERENCES pedido(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Inserções iniciais
INSERT INTO funcao (nome) 
VALUES
('cliente'), 
('motorista'), 
('produtor');

INSERT INTO usuario (nome, email, password, status, id_funcao) 
VALUES
('Celson', 'celson@gmail.com', '11111111', 'ativo', 1), 
('Márcio', 'marcion@gmail.com', '22222222', 'ativo', 2), 
('Pedro', 'pedro@gmail.com', '333', 'ativo', 3);

-- Consulta final
SELECT * FROM usuario;

SELECT
    u.id,
    u.nome AS nome_usuario,
    u.email,
    u.status,
    u.data_criacao,
    u.data_atualizacao,
    f.nome AS nome_funcao
FROM
    usuario AS u
INNER JOIN 
    funcao AS f ON u.id_funcao = f.id;
