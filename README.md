# Supabase Basics - Students Data Creator

Aplicação web simples (HTML, CSS e JavaScript puro) para cadastro e gerenciamento de alunos, utilizando o [Supabase](https://supabase.com/) como backend (banco de dados via API REST/JS Client). Projeto criado com fins de estudo, para praticar integração com o Supabase.

## ✨ Funcionalidades

- **Página principal (`index.html`)**
  - Cadastro de alunos através de um formulário (nome, e-mail, turma e data de nascimento).
  - Listagem de todos os alunos cadastrados em uma tabela.
  - Botão para atualizar a listagem manualmente.

- **Painel administrativo (`admin/admin.html`)**
  - Listagem de todos os alunos cadastrados.
  - Edição de qualquer campo diretamente na tabela (clique na célula para editar).
  - Exclusão de alunos.

## 🗂️ Estrutura do projeto

```
Supabase/
├── index.html          # Página de cadastro de alunos
├── index/
│   ├── script.js        # Lógica da página de cadastro
│   └── style.css         # Estilos da página de cadastro
├── admin/
│   ├── admin.html       # Painel administrativo
│   ├── script.js         # Lógica do painel administrativo
│   └── style.css         # Estilos do painel administrativo
├── utils/
│   ├── config.js          # Configuração da conexão com o Supabase
│   ├── reqs.js             # Funções de requisição (GET, POST, DELETE, UPDATE) à tabela "students"
│   ├── table.js             # Funções auxiliares para montar a tabela HTML
│   └── warn.js               # Função para exibir avisos/erros na tela
└── README.md
```

## 🚀 Tecnologias utilizadas

- HTML5 e CSS3
- JavaScript (ES Modules, sem build tools)
- [Supabase JS Client](https://supabase.com/docs/reference/javascript/introduction) (via CDN)
- [Lucide Icons](https://lucide.dev/) (via CDN)

## 🗃️ Banco de dados

O projeto espera uma tabela chamada `students` no Supabase com (pelo menos) as seguintes colunas:

| Coluna       | Tipo      | Observação                    |
|--------------|-----------|--------------------------------|
| `id`         | int8      | Chave primária                 |
| `name`       | text      | Nome do aluno                  |
| `email`      | text      | E-mail do aluno                |
| `class`      | text      | Turma do aluno (opcional)      |
| `birth_date` | date      | Data de nascimento             |
| `created_at` | timestamp | Preenchido automaticamente     |

## ⚙️ Como rodar o projeto

1. Clone o repositório:
   ```bash
   git clone <url-do-repositorio>
   ```

2. Crie um projeto no [Supabase](https://supabase.com/) e uma tabela `students` seguindo a estrutura acima.

3. Configure suas credenciais do Supabase (URL e chave anônima/pública) no arquivo `utils/config.js`:
   ```javascript
   const SUPABASE_URL = "sua-url-aqui";
   const SUPABASE_ANON_KEY = "sua-chave-aqui";
   ```
   > ⚠️ **Importante:** o ideal é manter essas informações em variáveis de ambiente (`.env`), mas neste projeto elas estão hardcoded para fins didáticos.

4. Como não há dependências ou build, basta abrir o arquivo `index.html` em um navegador ou servir a pasta com um servidor local (ex: extensão *Live Server* do VS Code), já que os scripts usam ES Modules e precisam ser servidos via HTTP.

## 📄 Páginas

| Página                 | Caminho              | Descrição                          |
|------------------------|-----------------------|-------------------------------------|
| Cadastro de alunos     | `index.html`          | Formulário de cadastro + listagem   |
| Painel administrativo  | `admin/admin.html`    | Edição e exclusão de alunos         |

## 👤 Autor

Feito por [Lucas Siqueira](https://www.linkedin.com/in/lucasdesouzasiqueira/)