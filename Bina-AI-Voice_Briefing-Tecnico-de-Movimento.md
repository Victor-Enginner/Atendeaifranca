# Bina AI Voice — briefing técnico de movimento

**Marca:** Atende Franca · **Versão:** 1.0 · **Data:** 18/10/2026

Documento de direção e especificação para implementação por Codex ou Claude Code. Os parâmetros abaixo são decisões iniciais de projeto: devem ser calibrados no layout real. Não representam um sistema já implementado ou validado.

## 1. Intenção da experiência

A Bina é uma presença de produto: apresenta, demonstra e convida. A complexidade está na coordenação das cenas, na resposta suave e na continuidade visual. O visitante precisa conseguir ler, navegar e escolher sem disputar atenção com o mascote.

Manter o corpo baixo e arredondado de cerâmica perolada, visor preto oval, olhos teal e a aleta translúcida lateral da referência aprovada. Preservar proporções, materiais e posição da aleta. Não inventar braços, pernas, boca ou acessórios. Movimentação elegante, curiosa e contida; evitar saltos de desenho infantil e deformação elástica do corpo.

**Regra central: três aparições narrativas no máximo na página proposta, uma única Bina visível por vez.** A demonstração só se expande por interação do visitante. Não criar mascote fixo perseguindo a pessoa por todo o site.

## 2. Mapa de presença e ausência

Os nomes de seção são contratos semânticos, não uma exigência para reorganizar o site inteiro.

| Seção | Presença | Função e comportamento |
|---|---|---|
| Hero inicial | Sim | Aparecer no espaço visual reservado, estabelecer contato e olhar brevemente para o CTA. |
| Benefícios | Não | Encerrar a primeira cena antes de o texto desta seção ocupar o foco. |
| Demonstração de voz no celular | Sim | Aproximar-se do celular, atravessar visualmente sua tela e tornar-se o avatar da conversa. |
| Integrações e funcionalidades | Não | Usar diagramas e componentes de produto; nenhuma Bina flutuante. |
| Equipe de agentes | Não | Os retratos de Bina, Luma e Samuel funcionam como conteúdo; não acrescentar outra camada de mascote. |
| Planos, segurança e FAQ | Não | Priorizar leitura e decisão. |
| CTA final | Sim, discreta | Pequena aparição ancorada no bloco; uma inclinação de convite, sem repetição automática. |
| Rodapé | Não | Encerrar a experiência visual. |

Se a página for curta, usar somente hero e demonstração. O CTA final com mascote é opcional. Uma seção nova nasce com `mascot: false`.

### Limites de exposição

- A Bina permanece dentro de uma área reservada de cada seção, sem cobrir títulos, links, formulários ou controles.
- Desktop: área visual inicial sugerida de 220–320 CSS px; CTA final de 96–140 px. Dimensionar pelo espaço disponível, não pela largura da tela inteira.
- Mobile: 112–176 px quando houver espaço. Nunca reduzir texto para encaixar o mascote.
- Não reapresentar a entrada teatral toda vez que o visitante sobe e desce poucos pixels.
- Registrar `introSeen`, `demoHintSeen` e `outroSeen` em memória durante a navegação. Remontagens técnicas não devem reiniciar a coreografia.
- Não usar armazenamento persistente por padrão. Uma nova visita pode receber a apresentação novamente.

## 3. Escolha de renderização e entregáveis

### Caminho A: PNG em camadas, implementável com os assets atuais

Usar os PNGs transparentes aprovados para deslocamento, escala, inclinação pequena e troca de pose com dissolvência. Um PNG único não permite girar livremente o personagem nem mover olhos que estão fundidos à imagem.

Para acompanhamento convincente do cursor, produzir uma versão com corpo, visor e olhos separados, com o mesmo enquadramento e ponto de registro. Sem essas camadas, usar somente uma inclinação leve do conjunto. Não desenhar olhos novos por cima dos olhos existentes.

Entregáveis adicionais se necessários: `body.png`, `eyes-neutral.png`, `eyes-blink.png`, poses de escuta e confirmação. Fundo realmente transparente, bordas limpas, mesmo pivô. É uma especificação de produção, não uma afirmação de que esses arquivos já existem.

### Caminho B: GLB para a experiência tridimensional completa

Modelar a Bina a partir das referências aprovadas; as imagens não se convertem automaticamente em uma malha fiel. Entregar `bina.glb` com nós identificáveis: `BinaRoot`, `Body`, `Visor`, `EyeLeft`, `EyeRight`, `Fin`. Definir e documentar unidades, frente do modelo, orientação e origem antes da integração.

Clipes sugeridos: `Intro`, `Idle`, `Listen`, `Confirm`, `EnterPhone`, `Outro`. Os olhos podem usar geometria, materiais ou morph targets. Separar os canais para impedir que um clipe sobrescreva o olhar procedural.

Carregamento pelo GLTFLoader e reprodução de clipes pelo AnimationMixer são suportados pelo Three.js. A escolha de React Three Fiber é opcional; manter um adaptador comum para não acoplar a lógica narrativa ao renderizador.

**Decisão de implementação:** iniciar com fallback PNG e contrato de cenas. Ativar o GLB quando houver modelo aprovado. Não entregar um plano com PNG dentro de GLB como se fosse um personagem tridimensional.

## 4. Arquitetura de responsabilidade

```text
src/features/bina/
  BinaExperience.tsx       composição e ciclo de vida
  scene-config.ts         presença, âncoras e intervalos por seção
  scene-resolver.ts       resolve uma cena a partir da posição atual
  motion-controller.ts    estado visual e prioridades
  voice-controller.ts     sessão de voz e eventos reais
  renderers/PngBina.tsx   fallback e poses
  renderers/GlbBina.tsx   modelo, materiais e animações
  hooks/useAnchors.ts     medidas e invalidação de layout
  types.ts                contratos compartilhados
```

Manter uma instância visual coordenada, não um canvas por seção. O renderer pode ficar em um portal próximo ao `body`, fora de ancestrais transformados. A camada decorativa usa `pointer-events: none`; controles de voz são HTML separados, com foco e teclado.

O layout declara âncoras como `data-bina-anchor="hero"`, `phone-entry`, `phone-avatar` e `final-cta`. A posição da Bina deriva dos retângulos dessas âncoras. Evitar coordenadas absolutas da página como `top: 2800px`.

GSAP/ScrollTrigger pode coordenar as timelines; `gsap.matchMedia()` organiza regras de viewport e movimento reduzido. Não adicionar outro motor de scroll apenas para esta experiência. Integrar o mecanismo de scroll existente, se houver.

## 5. Dois estados independentes

Não condensar tudo em um único booleano `isAnimating`.

```ts
type Scene = 'hidden' | 'hero' | 'phone' | 'final';
type Voice = 'off' | 'connecting' | 'listening'
  | 'thinking' | 'speaking' | 'error';
type RenderMode = 'png' | 'glb' | 'static';

interface BinaContext {
  scene: Scene;
  voice: Voice;
  sceneProgress: number; // 0..1, derivado da cena atual
  visible: boolean;
  reducedMotion: boolean;
  pageVisible: boolean;
  activeSceneId: number; // invalida callbacks antigos
}
```

O estado de voz pertence ao produto; o estado de cena pertence à apresentação. Se o visitante sair da seção enquanto conversa, a voz não pode ser encerrada por um fade decorativo. Exibir um controle HTML compacto de sessão ativa, sem trazer o mascote para seções proibidas. Encerrar a sessão pelo botão explícito, pelo encerramento do provedor ou por política de inatividade documentada.

### Prioridades de movimento

1. Preferência de movimento reduzido, falha e suspensão da página.
2. Trajetória narrativa da cena e limites de área.
3. Estado real de conversa e feedback de controles.
4. Olhar para cursor ou CTA.
5. Respiração, inclinação e micro movimentos de repouso.

Cada propriedade tem um único escritor. `sceneRoot` controla deslocamento/escala; `bodyPivot` controla inclinação; `eyesPivot` controla olhar; materiais controlam luminosidade. Não permitir que GSAP, CSS e o loop 3D escrevam simultaneamente no mesmo transform.

## 6. Coreografia por cena

### Cena 1 — apresentação

Entrada uma vez: opacidade de 0 para 1, subida de 16–24 px e escala de 0,97 para 1 em aproximadamente 700–900 ms. Respeitar o espaço reservado desde o primeiro frame para evitar deslocamento do layout.

Após a entrada: um olhar breve para o CTA, depois repouso. Hover na área visual permite olhar para o cursor; sair da área retorna ao centro em 250–450 ms. Não alterar o cursor global.

O acompanhamento do scroll termina na própria cena. Na faixa final da seção, reduzir a opacidade e recolher a Bina em direção ao ponto de saída local. Ela não atravessa benefícios até alcançar o celular.

Repouso: deslocamento vertical até 3 px e inclinação até 1°. Interromper após cerca de 6 segundos sem interação. Uma piscada ocasional durante o período ativo é suficiente. Evitar um loop visível infinito.

### Cena 2 — demonstração no celular

A entrada ocorre localmente nesta seção, sem continuidade física fictícia por seções onde a Bina está ausente.

| Progresso local | Movimento |
|---|---|
| 0–0,18 | Bina surge ao lado do telefone, sem bloquear a tela. |
| 0,18–0,42 | Orienta o visor para o aparelho; suspende o olhar do cursor. |
| 0,42–0,72 | Percorre curva curta até a âncora de entrada, com escala suave. |
| 0,72–0,88 | Oclusão na abertura da tela e transição para avatar. |
| 0,88–1 | Avatar estabilizado; interface pronta para demonstração. |

Esses intervalos são normalizados no trecho útil da seção, a calibrar no protótipo. Não são percentuais de toda a página.

**Composição da oclusão:** conteúdo HTML da conversa ao fundo; avatar interno recortado pelo raio da tela; Bina externa durante a aproximação; moldura do telefone à frente. Usar um único progresso compartilhado para a passagem entre externo e interno. No intervalo da passagem, fazer um crossfade curto com transformações coincidentes; não exibir duas Binas independentes.

As medidas de `phone-entry` e `phone-avatar` são relativas à viewport. Se houver perspectiva CSS, um retângulo simples não representa seus cantos: preferir telefone frontal nesta cena ou implementar projeção dos quatro cantos. Não compensar com números arbitrários.

Ao inverter o scroll, o caminho decorativo é reversível. Com voz ativa, manter o avatar na interface de voz e suspender a coreografia de entrada; retornar ao controle por scroll somente quando a conversa terminar. O retorno usa a posição atual da página.

O telefone é um mockup visual. A conversa legível e interativa é HTML, não texto gravado na imagem. Identificar uma simulação como demonstração; só apresentar mensagens como reais quando vierem da integração real.

### Cena 3 — convite final

Bina pequena, ancorada ao lado do convite. Entrada discreta de 400–600 ms, uma inclinação de até 4° e repouso. Só reagir novamente a uma ação explícita. Não saltar, emitir sons nem se aproximar do ponteiro.

## 7. Matemática de movimento

Usar tempo em segundos. Não incrementar posição por frame sem considerar `deltaTime`.

```ts
const clamp = (v: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, v));

// Progresso local; limites calculados no mesmo sistema de coordenadas.
const p = clamp((scrollY - startY) / Math.max(1, endY - startY), 0, 1);

// Suavização independente da taxa de atualização.
const alpha = 1 - Math.exp(-12 * Math.min(dt, 0.05));
currentX += (targetX - currentX) * alpha;
currentY += (targetY - currentY) * alpha;

// Cursor normalizado em relação à área interativa, não ao documento inteiro.
const nx = clamp(((pointerX - rect.left) / rect.width) * 2 - 1, -1, 1);
const ny = clamp(((pointerY - rect.top) / rect.height) * 2 - 1, -1, 1);
const yaw = nx * 8;   // graus, somente GLB
const pitch = -ny * 5;
```

Os limites acima são pontos de partida. PNG sem olhos separados: limitar a inclinação do conjunto a aproximadamente 2° e usar translação até 3 px. Não simular uma rotação 3D de 8° deformando a fotografia.

Para a aproximação ao telefone, usar curva de Bézier cúbica: `B(t) = (1−t)^3 P0 + 3(1−t)^2t P1 + 3(1−t)t² P2 + t³ P3`. Os pontos de controle são derivados da distância entre âncoras e limitados à área segura da seção.

Não somar indefinidamente o movimento do mouse à posição. Todos os offsets devem ser limitados e retornar a zero. Evitar overshoot perto da tela do celular.

## 8. Resolução de cena e casos difíceis

O controlador deve conseguir reconstruir a pose pela posição atual, inclusive ao abrir um link no meio da página. Não depender de todos os callbacks `onEnter` terem ocorrido.

```ts
function resolvePresentation(input: Inputs): Presentation {
  if (!input.pageVisible) return suspendedPresentation();
  const scene = resolveSceneFromCurrentGeometry(input);
  if (!scene) return hiddenPresentation();
  if (input.reducedMotion) return staticPresentation(scene);
  if (input.voiceActive && scene.id === 'phone')
    return phoneConversationPresentation(input.voiceState);
  return sampleSceneAtProgress(scene, input.scrollY);
}
```

`Inputs` e as funções acima são pseudocódigo de contrato, não código pronto para colar.

- Em salto de âncora ou scroll muito rápido: resolver diretamente a cena de destino; não executar a fila de cenas atravessadas.
- Em resize, troca de orientação, carregamento de fontes/imagens ou abertura de acordeão: invalidar medidas e recalcular em lote. Observar os containers relevantes com ResizeObserver; evitar medir todos os elementos a cada frame.
- Após recalcular, reconstruir o estado atual sem reapresentar entradas já vistas.
- Usar `activeSceneId` ou AbortController para descartar callbacks de uma cena abandonada. Cancelar tweens de entrada antigos.
- Aplicar histerese de cerca de 24–48 px nas bordas de ativação para evitar piscar entre estados. Trechos de ausência continuam obrigatórios.
- Ao voltar de aba oculta, zerar o relógio de delta antes de retomar.
- No unmount: remover listeners, observers, timelines, RAF, áudio e recursos GPU de propriedade do componente. Não destruir recursos compartilhados por outra instância.

## 9. Lógica real de voz

Nenhuma permissão de microfone ou reprodução de voz na chegada à página. A ação começa em um botão HTML claro: **Experimentar a voz da Bina**.

| Evento real | Estado | Resposta visual |
|---|---|---|
| Clique em iniciar | connecting | Indicador discreto de conexão. |
| Microfone autorizado e canal pronto | listening | Olhos atentos e indicador de escuta. |
| Fala recebida e processamento | thinking | Pulso suave, sem fingir progresso numérico. |
| Áudio de resposta efetivamente reproduzido | speaking | Luz/onda reage ao áudio de saída. |
| Resposta termina | listening ou off | Seguir o estado informado pela integração. |
| Permissão negada, timeout ou desconexão | error | Mensagem legível, opção de tentar novamente ou usar texto. |
| Usuário encerra | off | Parar tracks, conexões e animação de voz. |

Para a onda de voz, obter nível RMS do sinal de áudio autorizado, suavizar e limitar a amplitude. Não usar barras aleatórias como se fossem análise real. No mascote sem boca, a expressão ocorre pelos olhos e luz do visor.

Separar Web Voice da integração com WhatsApp. Uma conversa no mockup não envia mensagens ao WhatsApp por si só. Credenciais e tokens privilegiados ficam no backend; limitar duração, concorrência e consumo por sessão conforme o serviço contratado. Definir política de inatividade e explicar antes do encerramento automático.

## 10. Responsividade e acessibilidade

- Desktop com ponteiro preciso: olhar restrito à área da cena; sem captura global de mouse.
- Dispositivo touch: remover perseguição de cursor; usar apresentação local curta e controles normais. Não ativar sensores de orientação por padrão.
- Movimento reduzido: poses estáticas por seção; troca direta ou fade discreto. Remover deslocamento contínuo, parallax, pinning narrativo e piscadas recorrentes.
- Disponibilizar controle de pausar efeitos caso o projeto mantenha movimento automático prolongado.
- Elemento puramente decorativo: `aria-hidden="true"`. Status de conexão e erros: texto HTML acessível; nunca depender só da cor do visor.
- A ordem de foco segue o conteúdo da página. Nenhuma transição move o foco automaticamente.
- O conteúdo e o CTA continuam utilizáveis com JavaScript indisponível ou falha do GLB.

## 11. Desempenho e degradação

Metas iniciais a medir no dispositivo real: GLB comprimido até aproximadamente 2 MB, texturas até 1024 px por material quando suficientes, DPR limitado a 1,5 no mobile e 2 no desktop. Esses valores são orçamento de projeto, não garantia de fluidez.

Carregar o modelo sob demanda e usar poster PNG enquanto carrega. Reservar dimensões no layout. Renderizar somente quando houver cena visível, transição ativa ou interação; interromper o loop em repouso. Um único ticker de atualização por renderizador.

Começar sem pós-processamento pesado e sem sombras dinâmicas múltiplas. Usar iluminação simples e sombra de contato econômica. Se houver perda de contexto WebGL ou desempenho insuficiente sustentado, trocar para PNG preservando a cena atual. Evitar alternância constante entre níveis de qualidade.

Não guardar posições de cada frame em estado React; usar refs/objetos mutáveis e publicar apenas mudanças semânticas. Não atualizar `top`/`left` em loops DOM se `transform` resolver o deslocamento. Verificar se ancestrais transformados interferem no posicionamento fixo.

## 12. Critérios de aceite

| Verificação | Resultado exigido |
|---|---|
| Scroll lento e reverso | Pose contínua, sem saltos nem duplicação. |
| Scroll rápido até FAQ | Bina ausente imediatamente no destino; nenhuma animação atrasada. |
| Abertura por link direto na demonstração | Cena correta reconstruída, sem depender do hero inicial. |
| Resize e orientação | Âncoras recalculadas; mascote dentro da área segura. |
| Planos, FAQ e formulários | Nenhuma sobreposição ou captura de cliques. |
| Entrada e saída do telefone | Avatar e mascote coincidem na passagem; moldura oclui corretamente. |
| Voz ativa ao rolar para fora | Controle de sessão segue acessível; não surge mascote em seção proibida. |
| Permissão negada ou API indisponível | Erro real e alternativa em texto; nenhuma fala falsa. |
| Movimento reduzido | Página completa sem coreografia espacial. |
| Aba oculta e retorno | Sem salto de tempo, áudio sem duplicação e estado preservado. |
| Navegar e voltar à página | Sem listeners duplicados, RAF órfão ou vazamento progressivo. |
| Modelo ausente ou WebGL perdido | Fallback PNG e conteúdo principal funcionam. |

Automatizar testes do resolver puro de cenas, limites, prioridade e saltos de scroll. Usar testes de navegador para oclusão, resize, teclado e reduced motion. Revisar visualmente em desktop e celular reais; screenshots isoladas não comprovam fluidez nem sincronização de voz.

## 13. Ordem de implementação para o agente

1. Inspecionar stack, layout, scroll existente e assets reais. Documentar quais camadas/modelos estão disponíveis. Não substituir a identidade aprovada.
2. Declarar âncoras e áreas seguras nas três seções; manter o restante sem mascote.
3. Construir resolver determinístico, regras de ausência e renderer estático PNG.
4. Validar dimensões, responsividade, saltos de scroll e reduced motion.
5. Implementar apresentação e saída do hero; depois a passagem ao telefone; por último o CTA final.
6. Integrar GLB somente com modelo fiel aprovado. Acrescentar olhar e micro movimentos após a coreografia principal estar estável.
7. Integrar voz real e seus estados, sem confundir demonstração visual com serviço conectado.
8. Medir desempenho, corrigir falhas e executar critérios de aceite. Entregar limitações e pendências explícitas.

**Instrução de execução:** não criar animações extras fora deste contrato. Quando faltar asset, preservar o fallback e registrar a dependência. Cada efeito precisa servir à cena e respeitar os intervalos de ausência.

## 14. Fontes técnicas

Referências oficiais consultadas em 18/10/2026. A direção artística e os limites de presença deste documento são propostas específicas para a Atende Franca.

- GSAP ScrollTrigger: https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- GSAP matchMedia e reversão de contextos: https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/
- Three.js Animation System: https://threejs.org/manual/pages/animation-system.html
- Three.js GLTFLoader: https://threejs.org/docs/pages/GLTFLoader
