# Desafio Frontend Vue

- Framework: Vue 3 + TypeScript
- Biblioteca de Componentes: PrimeVue (Versão 4)
- Gerenciamento de Estado: Pinia
- Ferramentas de Teste: Vitest

Requisitos:

- [x] O sistema deve fornecer um formulário de pesquisa.
- [x] A pesquisa pode ser acionada clicando no botão "Pesquisar".
- [x] A pesquisa também pode ser acionada pressionando a tecla Enter.
- [x] Um estado de carregamento deve ser exibido enquanto os resultados da pesquisa
      estiverem sendo carregados.
- [x] Os resultados da pesquisa devem exibir o título e a descrição de cada item.
- [x] Clicar em um resultado de pesquisa deve abrir a URL correspondente em uma nova
      guia.
- [x] Os resultados da pesquisa devem ser categorizados de acordo com o tipo de
      conteúdo.
- [x] O usuário deve ser informado se nenhum resultado de pesquisa corresponder à sua
      consulta.

## Inicialização do projeto

Versão do node utilizada: v20.11.0

1. Certifique que o arquivo `.env` possui essas variáveis:
```
VITE_BASE_URL=http://127.0.0.1:3000
VITE_API_URL=http://127.0.0.1:3333
```


2. Instale as dependências

```sh
npm install
```

> O projeto estará disponível em: http://127.0.0.1:3000/

3. Inicie o projeto

```sh
npm run dev
```

4. Inicie o servidor (json-server)

```sh
npm run json-server
```

> A API estará disponível em: http://127.0.0.1:3333/

<hr>

### Como rodar os testes unitários

```sh
npm run test:unit
```
