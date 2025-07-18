# Medical System

Este é o projeto final do módulo intermediário do curso de Desenvolvimento Fullstack do Capacita Brasil. 

Sistema simples para gerenciamento médico e paciente, desenvolvido em React com responsividade, navegação controlada e armazenamento local.

## Controle de Rotas

O sistema utiliza o componente **HeaderController** para controlar a exibição do cabeçalho (Navbar ou Header do paciente) de acordo com a rota atual e o perfil do usuário. Isso garante uma experiência responsiva e condizente com o papel do usuário no sistema.

## Login

Login básico com seleção de perfil via `Select`. As credenciais são fixas para fins de teste:

- **Médico**
  - Usuário: `medico`
  - Senha: `1234`
- **Paciente**
  - Usuário: `paciente`
  - Senha: `1234`

Após o login, cada usuário acessa conteúdos e funcionalidades específicas conforme seu perfil.

## Perfis e Funcionalidades

- **Paciente**
  - Visualiza o cadastro de paciente
  - Visualiza seu painel personalizado
- **Médico**
  - Pode realizar triagem dos pacientes (ver detalhes, definir prioridades)
  - Visualiza painel de atendimento com fila de espera
  - Pode iniciar e finalizar atendimentos
  - Acesso a tela detalhada de atendimento ao paciente com possibilidade de finalizar

## Armazenamento

- A fila de pacientes e o atendimento em andamento são armazenados no **LocalStorage** do navegador, garantindo persistência mesmo após recarregar a página.

## Responsividade

- Navbar responsiva com menu hambúrguer para dispositivos móveis
- Layout adaptável para telas pequenas e grandes, garantindo boa usabilidade em qualquer dispositivo

## Equipe

- Vitória Prudêncio  
- Ranielly
