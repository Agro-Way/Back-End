create database agroway default character set utf8 default collate utf8_general_ci;
use agroway;

-- Tabela: funcao
create table funcao (
id int not null auto_increment primary key,
nome varchar(100) not null unique
)Engine=InnoDB default charset=utf8;

-- Tabela: usuario
create table usuario (
id int not null auto_increment primary key,
nome varchar(100) not null,
email varchar(100) not null,
password varchar(255) not null,
status enum('ativo', 'inativo', 'pendente', 'banido') not null default 'ativo',
id_funcao int not null default 1,
data_criacao timestamp default current_timestamp,
data_atualizacao timestamp default current_timestamp,
foreign key(id_funcao) references funcao(id)
) Engine=InnoDB default charset=utf8;

-- Tabela: recuperar_senha
CREATE TABLE recuperar_senha (
id int not null auto_increment primary key,
id_usuario int not null,
token VARCHAR(255) not null,
data_solicitacao datetime default current_timestamp,
data_expiracao datetime,
usado int default 0,
foreign key (id_usuario) references usuario(id)
)Engine=InnoDB default charset=utf8;

-- Tabela: categoria_produto
create table categoria_produto (
id int not null auto_increment primary key,
nome varchar(100) not null unique,
descricao text,
data_criacao timestamp default current_timestamp,
data_atualizacao timestamp default current_timestamp
)Engine=InnoDB default charset=utf8;

-- Tabela: produto
create table produto (
id int not null auto_increment primary key,
nome varchar(100) not null unique,
descricao text,
preco decimal(10, 2),
imagem_url text,
id_categoria int not null,
id_produtor int not null, -- fazendo referência ao usuário com a função de produtor(tabela usuário)
data_criacao timestamp default current_timestamp,
data_atualizacao timestamp default current_timestamp,
foreign key(id_categoria) references categoria_produto(id),
foreign key(id_produtor) references usuario(id)
)Engine=InnoDB default charset=utf8;

-- Tabela: estoque
create table estoque (
id int not null auto_increment primary key,
id_produto int not null,
quantidade int not null,
data_criacao timestamp default current_timestamp,
data_atualizacao timestamp default current_timestamp,
foreign key(id_produto) references produto(id)
)Engine=InnoDB default charset=utf8;

-- Tabela: pedido
create table pedido (
id int not null auto_increment primary key,
id_cliente int not null, -- fazendo referência ao usuário com a função cliente
data_pedido timestamp default current_timestamp,
data_entrega date,
local_entrega text,
status_pedido enum('pendente', 'aceito', 'recusado', 'em trânsito', 'entregue') default'pendente',
data_atualizacao timestamp default current_timestamp,
foreign key(id_cliente) references usuario(id)
)Engine=InnoDB default charset=utf8;

-- Tabela: Itens_pedido (produtos + quantidade + preço no momento)
create table itens_pedido (
id int not null auto_increment primary key,
id_pedido int not null,
id_produto int not null,
quantidade int not null,
preco_unitario decimal(10,2) not null,
foreign key(id_pedido) references pedido(id),
foreign key(id_produto) references produto(id)
)Engine=InnoDB default charset=utf8;

-- Tabela: pagamento feito por clientes
create table pagamento (
id_pagamento int not null auto_increment primary key,
id_pedido int not null,
metodo_pagamento enum('cartão', 'qrcode', 'paypal', 'visa'),
valor_pago decimal(10,2) not null,
status_pagamento enum('pendente', 'confirmado', 'cancelado') default 'Pendente',
data_pagamento timestamp default current_timestamp,
foreign key (id_pedido) references pedido(id)
)Engine=InnoDB default charset=utf8;

-- Tabela: Avaliação
create table avaliacao (
id int not null auto_increment primary key,
id_avaliador int not null, -- cliente que avaliou
id_avaliado int not null,  -- motorista ou produtor avaliado
id_pedido int not null,
nota int check (nota >= 1 and nota <= 5),
comentario text,
data_avaliacao timestamp default current_timestamp,
foreign key(id_avaliador) references usuario(id),
foreign key(id_avaliado) references usuario(id),
foreign key(id_pedido) references pedido(id)
)Engine=InnoDB default charset=utf8;

-- Tabela: notificação
create table notificacao (
id int not null auto_increment primary key,
id_usuario int not null,
mensagem text not null,
lida int default 1,
data_envio timestamp default current_timestamp,
foreign key(id_usuario) references usuario(id)
)Engine=InnoDB default charset=utf8;

-- Tabela: entrega
create table entrega (
id int not null auto_increment primary key,
id_pedido int not null,
id_motorista int not null, -- fazendo referência ao usuário com a função motorista
status_entrega enum('pendente', 'em trânsito', 'entregue') default 'Pendente',
data_inicio datetime,
data_fim datetime,
foreign key(id_pedido) references pedido(id),
foreign key(id_motorista) references usuario(id)
)Engine=InnoDB default charset=utf8;

-- Tabela: rota diária para motorista
create table rota (
id int not null auto_increment primary key,
id_motorista int not null, -- fazendo referência ao usuário com a função motorista
data_rota date not null,
descricao text,
foreign key(id_motorista) references usuario(id)
)Engine=InnoDB default charset=utf8;

-- Tabela: rota_pedido (associando pedidos às rotas)
create table rota_pedidos (
id int not null auto_increment primary key,
id_rota int not null,
id_pedido  int not null,
unique(id_rota, id_pedido),
foreign key(id_rota) references rota(id),
foreign key(id_pedido) references pedido(id)
)Engine=InnoDB default charset=utf8;

insert into usuario (nome, email, password, status, id_funcao) 
values
("Celson", "celson@gmail.com", "11111111", "ativo", 1), 
("Márcio", "marcion@gmail.com", "22222222", "ativo", 2), 
("Pedro", "pedro@gmail.com", "333", "ativo", 3);

insert into funcao (nome) 
values
("cliente"), 
("motorista"), 
("produtor");

select * from usuario;

select
    u.id,
    u.nome as nome_usuario,
    u.email,
    u.status,
    u.data_criacao,
    u.data_atualizacao,
    f.nome as nome_funcao
from
    usuario as u
inner join 
    funcao as f ON u.id_funcao = f.id;


