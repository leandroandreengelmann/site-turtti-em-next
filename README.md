# Turatti - Site de Materiais de Construção

Este é um projeto de uma loja virtual para a empresa Turatti Materiais de Construção, desenvolvido com Next.js 14 (App Router) e Tailwind CSS.

## Tecnologias Utilizadas

- **Next.js 14**: Framework React com App Router
- **Tailwind CSS**: Framework de CSS utilitário
- **Supabase**: Backend as a Service para banco de dados
- **TypeScript**: Tipagem estática para JavaScript

## Características

- Design responsivo para mobile, tablet e desktop
- Conexão com banco de dados Supabase
- Componentes reutilizáveis
- Mega menu no cabeçalho
- Carrossel de imagens
- Slide de produtos
- Seção de cores Suvinil
- Rodapé informativo

## Estrutura do Projeto

```
turatti-site/
├── app/
│   ├── layout.tsx           # Layout global com configurações de fonte
│   ├── page.tsx             # Página inicial
│   └── globals.css          # Estilos globais
├── components/
│   ├── carousel/            # Componente de carrossel
│   ├── footer/              # Componente de rodapé
│   ├── header/              # Componente de cabeçalho com mega menu
│   ├── products/            # Componente de slide de produtos
│   └── suvinil/             # Componente de cores Suvinil
├── lib/
│   ├── supabase.ts          # Configuração do cliente Supabase
│   └── types.ts             # Definição dos tipos para os dados
├── public/                  # Arquivos públicos (imagens, etc.)
├── tailwind.config.js       # Configuração do Tailwind CSS
└── package.json             # Dependências do projeto
```

## Paleta de Cores

- **#2196F3** (Primary Color): Botões, links e elementos interativos
- **#1976D2** (Dark Primary Color): Fundo do cabeçalho
- **#BBDEFB** (Light Primary Color): Fundo de seções alternadas
- **#4CAF50** (Accent Color): Destaques e botões de chamada para ação
- **#212121** (Primary Text): Texto principal
- **#757575** (Secondary Text): Texto secundário
- **#FFFFFF** (Text/Icons): Texto e ícones sobre fundos escuros
- **#BDBDBD** (Divider Color): Divisores entre seções

## Como Executar o Projeto

1. Clone o repositório
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Execute o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
4. Abra [http://localhost:3000](http://localhost:3000) no seu navegador

## Conexão com o Supabase

O projeto está configurado para se conectar ao Supabase usando as seguintes credenciais:

- **URL**: https://pxfkbhbioyycgppmsjco.supabase.co
- **Anon Key**: (chave configurada no arquivo lib/supabase.ts)

## Tabelas no Banco de Dados

- **produtos**: Armazena informações sobre os produtos (id, nome, preco, imagem_url)
- **cores_suvinil**: Armazena informações sobre as cores Suvinil (id, nome, codigo_cor, descricao)

## Colaboradores

- Desenvolvido por [Seu Nome]

## Licença

Este projeto está licenciado sob a licença MIT.
