# Atende Franca — primeira versão

Versão local revisável com identidade marfim e verde #1DDD63. Abra `index.html` ou acesse pelo servidor HTTP da pasta do projeto em `/site/`.

## Entregue

- Hero autoral e mascote original, com profundidade em camadas.
- Símbolo SVG próprio combinando conversa e sinal de voz, disponível em `assets/atende-franca-symbol.svg`.
- Família original de 21 ícones SVG, aplicada em serviços, navegação visual, central, agenda e integrações.
- Cards com ícones em vidro e luz reativa ao ponteiro.
- Cena Bina Voice com telefone HTML, passagem decorativa do mascote no desktop e exemplos selecionáveis.
- Equipe com as imagens originais de Bina, Samuel e Luma.
- Central demonstrativa com três contatos fictícios selecionáveis.
- Seção de criação de sites, mapa de conexões, conhecimento, implantação, posicionamento local e FAQ.
- Formulário que gera um briefing local para download; não envia dados.
- Pausa dos efeitos, regras de movimento reduzido e fallback de conteúdo sem GSAP.

## Referências e procedência

Foram inventariadas as pastas CARDS, SCROLL ANIMATIONS, BUTTONS, Components Animations e ELEMENTOS VISUAIS SITES em `O:/DEV/A JORNADA/PROJETOS/Repass-Ai`. Seus arquivos são referências de componentes e sugestões de integração; não são instruções para substituir o escopo deste projeto.

Glass Icons, Tilted Card, Scroll Stack e Border Glow foram examinados para a linguagem de movimento. Esta versão usa implementações DOM próprias para profundidade, ícones em vidro e destaque de borda, com GSAP/ScrollTrigger como único coordenador de scroll. Nenhum pacote React Bits ou Lenis foi instalado.

21st.dev: Magnetic Button, demo 26725, recuperado e adaptado na prévia; Navigation Menu, demo 808, consultado para futura implementação React; Bento Grid, demo 622, pesquisado como referência de organização. Não houve geração de página ou hero pelo 21st.

Assets derivados e suas origens estão em `assets/manifest.json`. As 17 variantes WebP totalizam aproximadamente 1,1 MB; apenas as utilizadas são solicitadas pelo navegador. Imagens originais não foram alteradas.

## Limites

Esta é a primeira implementação frontend para revisão, sem publicação, backend, voz, WhatsApp, agenda ou CRM conectados. Os exemplos estão identificados. Não há modelo GLB na pasta; o mascote usa PNG/WebP com alpha e inclinação limitada. A integração futura do modelo precisa preservar sua identidade. O servidor de prévia é apenas local.

GSAP 3.15.0, ScrollTrigger e licença foram copiados da instalação existente no projeto de referência para `vendor/`. Esta versão não depende de CDN ou fonte externa para carregar.

Texto, símbolo e hierarquia dos serviços são propostas revisáveis. Santa Casa e outras instituições não aparecem como clientes ou parceiros.

## Validação

Sintaxe dos dois scripts verificada com `node --check`. Referências de arquivos, IDs duplicados e destinos internos de links verificados. No Brave: respostas dos botões do telefone e troca para Marcos Lima confirmadas; pausa dos efeitos confirmada; console sem erros na inspeção. Largura total conferida em 360, 390, 768, 1024 e 1440 px, sem transbordamento horizontal. Equipe e seção de voz revisadas visualmente no celular. Download de briefing foi acionado com dados fictícios, mas a captura do arquivo pelo conector expirou; o download não é considerado validado. Movimento reduzido tem regras implementadas, ainda sem teste da preferência do sistema.
