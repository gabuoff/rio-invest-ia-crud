## Estrutura de Diretórios do Projeto:

´´´
- src/
  - app/
    - core/ (Camada de Aplicação)
      - auth/ (Autenticação)
        - authentication.service.ts
        - login.component.ts
        - register.component.ts
        - reset-password.component.ts
      - investment/ (Cadastro de Investimentos)
        - investment.service.ts
        - investment-form.component.ts
        - investment-list.component.ts
      - portfolio/ (Monitoramento de Portfólio)
        - portfolio.service.ts
        - portfolio-dashboard.component.ts
      - risk-management/ (Gerenciamento de Risco)
        - risk-assessment.service.ts
        - risk-dashboard.component.ts
      - support/ (Suporte ao Cliente)
        - support.service.ts
        - support.component.ts
    - shared/ (Módulos Compartilhados)
      - components/
        - header/
        - footer/
        - ...
      - services/
        - api.service.ts
        - openai.service.ts
      - models/
        - user.ts
        - investment.ts
        - portfolio.ts
        - ...
    - features/ (Módulos de Funcionalidades)
      - financial-data/ (Análise de Dados Financeiros)
        - financial-data.service.ts
        - financial-analysis.component.ts
      - reports/ (Relatórios e Exportação de Dados)
        - reports.service.ts
        - generate-report.component.ts
      - planning-tools/ (Ferramentas de Planejamento Financeiro)
        - planning-tools.service.ts
        - financial-planning.component.ts
    - app-routing.module.ts
    - app.component.ts
    - app.module.ts
  - assets/
  - environments/
´´´
### Aqui estão algumas explicações sobre os diretórios e os componentes principais:

- Core: Esta pasta contém módulos e componentes que representam as principais funcionalidades da aplicação, como autenticação, cadastro de investimentos, monitoramento de portfólio, gerenciamento de risco, suporte ao cliente, etc.

- Shared: Aqui estão os módulos compartilhados que contêm componentes, serviços e modelos reutilizáveis em toda a aplicação. Isso inclui componentes de interface de usuário, serviços para comunicação com a API e modelos de dados.

- Features: Esta pasta contém módulos que representam funcionalidades específicas, como análise de dados financeiros, geração de relatórios e ferramentas de planejamento financeiro.

- app-routing.module.ts: Configuração das rotas da aplicação, permitindo a navegação entre diferentes páginas e componentes.

- app.component.ts: O componente raiz que representa o layout geral da aplicação.

- app.module.ts: O módulo principal da aplicação onde todos os outros módulos são importados.

- assets: Diretório para armazenar recursos estáticos, como imagens, estilos CSS e arquivos de configuração.

- environments: Contém arquivos de configuração específicos do ambiente (por exemplo, ambiente de desenvolvimento e produção).