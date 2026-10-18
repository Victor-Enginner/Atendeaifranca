# Atende Franca — estudo visual 01

Primeira composição revisável, feita com os assets do projeto. Abra `index.html` no navegador ou sirva esta pasta por HTTP.

## Escopo

Hero próprio, mascote aprovado, menu de soluções, demonstração textual guiada, cenários por segmento, seção de criação de sites e preparação local de briefing. Os textos são propostas editoriais. Atende Franca é o nome provisório usado a partir da documentação mestra.

Não há backend, sessão de voz, envio de contato, agenda real nem publicação. O briefing baixa um arquivo local e não transmite dados.

## Movimento

GSAP 3.13.0 e ScrollTrigger por CDN coordenam entrada e profundidade no scroll. O site continua legível e interativo se a CDN falhar. O controle de pausa e `prefers-reduced-motion` desativam os efeitos. O PNG recebe inclinação limitada; não representa uma malha 3D. A rotação livre e a entrada no telefone dependem de produção posterior do GLB ou camadas adequadas.

Há apenas uma aparição do mascote nesta composição. Não há perseguição global, som automático ou captura de microfone. Anime.js não foi adicionado para duplicar a coordenação de transforms.

## 21st.dev

Pesquisa e recuperação feitas pela conexão disponível, sem geração de páginas ou heros:

- Magnetic Button, Mohammad Shehadeh / Hirael, demo 26725: https://21st.dev/@mohammadshehadeh/components/magnetic-button — interação adaptada para DOM, com deslocamento limitado. Fonte original MIT.
- Navigation Menu, shadcn, demo 808: https://21st.dev/@shadcn/components/navigation-menu — código consultado para a futura base React/Radix. O menu deste protótipo usa `details` nativo, sem afirmar que o componente React foi instalado.

## Direção e referências

Materiais do usuário: documentação mestra, briefing de movimento, simulador de negócios, referências do mascote e screenshots de Yup e Manychat. Sites consultados: Toolzz, Toolzz Voice, Toolzz Chat, Yup, Manychat e atendeeai.com. A consulta textual não comprova animações dessas páginas.

Preservar cerâmica perolada, visor negro, olhos teal e aleta lateral. Franca entra pelo posicionamento e pelos cenários de negócio. Santa Casa e outras redes são públicos pretendidos; nenhuma relação comercial é sugerida. A propriedade e o papel de atendeeai.com aguardam esclarecimento do usuário.

## Próximos marcos

1. Revisar a primeira dobra e a hierarquia de marca.
2. Consolidar stack de produção e instalar os primitives selecionados.
3. Desenvolver a cena de passagem ao telefone com âncoras e oclusão.
4. Integrar GLB fiel quando disponível e voz em uma etapa própria.

## Verificação desta versão

Prévia aberta no Brave por servidor local. Hero conferido visualmente no desktop e em 390 px. Largura do documento verificada em 360, 390, 768, 1024 e 1440 px, sem overflow horizontal nessas medições. Menu de soluções aberto no mobile; demonstração aberta, exemplo de agendamento selecionado e modal fechado; formulário de briefing aberto; controle de pausa alternado e estado `aria-pressed` confirmado. Download do briefing e modo de movimento reduzido do sistema ainda não foram testados. Voz e GLB estão fora desta versão.
