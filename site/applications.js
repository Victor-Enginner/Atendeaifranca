const assetPrefix = document.querySelector('link[href^="site/"]') ? 'site/assets/' : 'assets/';

// 1. 4-Chapter Interactive Journey (Seção 2 Master Doc)
const journeyChapters = {
  '01': {
    badge: 'ETAPA 01 · RECEPÇÃO IMEDIATA',
    title: 'O contato chega pelo canal preferido da pessoa.',
    desc: 'Seja por mensagem, voz, site institucional ou portal de atendimento ao cidadão, a Bina acolhe sem fila e identifica o assunto logo na primeira frase.',
    img: `${assetPrefix}chat-reference.webp`,
    alt: 'Chat da Bina em vidro fosco recebendo o primeiro contato',
    pills: ['Voz & Áudio', 'WhatsApp & Webchat', 'Portal Institucional / Gov']
  },
  '02': {
    badge: 'ETAPA 02 · BASE DE CONHECIMENTO (RAG)',
    title: 'Bina consulta documentos e regras aprovadas.',
    desc: 'Nada de respostas improvisadas: a assistente consulta a base oficial da empresa ou órgão público (horários, portarias, catálogos, requisitos e FAQs aprovados).',
    img: `${assetPrefix}knowledge.webp`,
    alt: 'Base de conhecimento conectada à Bina AI',
    pills: ['Conteúdo Verificado', 'Sem Improviso', 'Governança & LGPD']
  },
  '03': {
    badge: 'ETAPA 03 · AÇÃO AUTORIZADA NO FLUXO',
    title: 'Samuel qualifica oportunidades; Luma organiza a agenda.',
    desc: 'Conforme a intenção identificada, o atendimento avança: Samuel estrutura os dados comerciais no pipeline ou Luma verifica horários e orienta o suporte.',
    img: `${assetPrefix}agent-flow.webp`,
    alt: 'Fluxo de atendimento entre Bina, Samuel e Luma',
    pills: ['Samuel · Pipeline Comercial', 'Luma · Agenda & Suporte', 'Regras por Projeto']
  },
  '04': {
    badge: 'ETAPA 04 · CONFIRMAÇÃO OU CONTINUIDADE HUMANA',
    title: 'Encaminhamento transparente com contexto completo.',
    desc: 'Quando a solicitação exige decisão humana, especialista comercial ou servidor público, a equipe assume a conversa com o resumo já organizado.',
    img: `${assetPrefix}agenda-reference.webp`,
    alt: 'Confirmação de agenda e continuidade com Luma',
    pills: ['Resumo Estruturado', 'Handoff Humano', 'Histórico Unificado']
  }
};

document.querySelectorAll('[data-journey-step]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const step = journeyChapters[btn.dataset.journeyStep];
    if (!step) return;
    document.querySelectorAll('[data-journey-step]').forEach((b) =>
      b.setAttribute('aria-selected', String(b === btn))
    );
    const badgeEl = document.querySelector('#journey-stage-badge');
    const titleEl = document.querySelector('#journey-stage-title');
    const descEl = document.querySelector('#journey-stage-desc');
    const imgEl = document.querySelector('#journey-stage-img');
    const pillsEl = document.querySelector('#journey-stage-pills');

    if (badgeEl) badgeEl.textContent = step.badge;
    if (titleEl) titleEl.textContent = step.title;
    if (descEl) descEl.textContent = step.desc;
    if (imgEl) {
      imgEl.src = step.img;
      imgEl.alt = step.alt;
    }
    if (pillsEl) {
      pillsEl.replaceChildren();
      step.pills.forEach((pillText) => {
        const span = document.createElement('span');
        span.textContent = pillText;
        pillsEl.append(span);
      });
    }
  });
});

// 2. Interactive Application Suite Tabs (#central)
document.querySelectorAll('[data-suite-tab]').forEach((tabBtn) => {
  tabBtn.addEventListener('click', () => {
    const targetId = tabBtn.dataset.suiteTab;
    document.querySelectorAll('[data-suite-tab]').forEach((b) =>
      b.setAttribute('aria-selected', String(b === tabBtn))
    );
    document.querySelectorAll('[data-suite-panel]').forEach((panel) => {
      panel.hidden = panel.dataset.suitePanel !== targetId;
    });
  });
});

// 3. Visual Cases Gallery (#aplicacoes)
const visualCases = {
  atendimento: {
    label: 'ATENDIMENTO COM CONTEXTO',
    title: 'Seu cliente ou cidadão tem uma dúvida. A conversa começa.',
    description:
      'Mensagens, informações e próximos passos apresentados com a identidade do seu negócio ou instituição.',
    images: [
      ['mobile-commerce', 'Conceito de atendimento no smartphone em ambiente acolhedor'],
      ['chat-reference', 'Referência visual de conversa com a Bina em vidro fosco'],
      ['inbox', 'Conceito de caixa de entrada com inteligência artificial']
    ]
  },
  agenda: {
    label: 'AGENDA E ACOMPANHAMENTO COM LUMA',
    title: 'Do primeiro contato ao próximo horário confirmado.',
    description:
      'As cenas da Luma traduzem a direção para suporte, consulta de disponibilidade e confirmação organizada.',
    images: [
      ['agenda-reference', 'Luma e o conceito de confirmação de agenda'],
      ['luma-support', 'Luma no cenário de suporte e acompanhamento'],
      ['agent-flow', 'Fluxo ilustrativo entre Bina, Samuel e Luma']
    ]
  },
  vendas: {
    label: 'ALTA CONVERSÃO COMERCIAL COM SAMUEL',
    title: 'Cada oportunidade qualificada com contexto claro.',
    description:
      'Organizar o interesse, apresentar catálogos ou propostas e apoiar o fechamento comercial da sua equipe.',
    images: [
      ['samuel-reference', 'Samuel no pipeline de qualificação comercial'],
      ['commerce', 'Conceito de assistente para e-commerce e vendas no celular'],
      ['hero-premium-reference', 'Hero premium da Bina em recepção executiva']
    ]
  },
  voz: {
    label: 'VOZ E PRESENÇA DIGITAL 3D',
    title: 'Uma experiência natural para falar e ser compreendido.',
    description:
      'Conversas por voz conectadas à base de conhecimento do negócio, da assistente humana ao mascote em cerâmica.',
    images: [
      ['robot-phone', 'Mascote Bina ao lado do smartphone de voz'],
      ['robot-reference', 'Identidade do mascote Bina em cerâmica'],
      ['portrait', 'Retrato profissional da assistente Bina AI']
    ]
  },
  governo: {
    label: 'INSTITUCIONAL & ÓRGÃOS PÚBLICOS',
    title: 'Orientação pública acessível, transparente e auditável.',
    description:
      'Triagem de protocolos, dúvidas frequentes sobre serviços municipais/estaduais e encaminhamento para secretarias e ouvidorias.',
    images: [
      ['knowledge', 'Base de conhecimento documental verificada com Bina'],
      ['integration-reference', 'Hub de conexões e encaminhamento entre setores'],
      ['team-reference', 'Equipe integrada de agentes Bina, Samuel e Luma']
    ]
  }
};

let selectedVisualCase = 'atendimento';
let visualImageIndex = 0;

function renderVisualCase() {
  const item = visualCases[selectedVisualCase];
  if (!item) return;
  const image = item.images[visualImageIndex];
  const target = document.querySelector('#case-image');
  if (target) {
    target.src = `${assetPrefix}${image[0]}.webp`;
    target.alt = image[1];
  }
  const labelEl = document.querySelector('#case-label');
  const titleEl = document.querySelector('#case-title');
  const descEl = document.querySelector('#case-description');
  const counterEl = document.querySelector('#case-counter');
  if (labelEl) labelEl.textContent = item.label;
  if (titleEl) titleEl.textContent = item.title;
  if (descEl) descEl.textContent = item.description;
  if (counterEl) counterEl.textContent = `${visualImageIndex + 1} / ${item.images.length}`;
  document.querySelectorAll('[data-case]').forEach((button) =>
    button.setAttribute('aria-pressed', String(button.dataset.case === selectedVisualCase))
  );
}

document.querySelectorAll('[data-case]').forEach((button) =>
  button.addEventListener('click', () => {
    selectedVisualCase = button.dataset.case;
    visualImageIndex = 0;
    renderVisualCase();
  })
);

document.querySelectorAll('[data-direction]').forEach((button) =>
  button.addEventListener('click', () => {
    const list = visualCases[selectedVisualCase]?.images || [];
    if (!list.length) return;
    visualImageIndex =
      (visualImageIndex + (button.dataset.direction === 'next' ? 1 : -1) + list.length) %
      list.length;
    renderVisualCase();
  })
);

// 4. Source Image Dialog Lightbox
const sourceDialog = document.querySelector('#source-dialog');
document.querySelectorAll('[data-agent-image]').forEach((button) =>
  button.addEventListener('click', () => {
    const titleEl = document.querySelector('#source-title');
    const imgEl = document.querySelector('#source-image');
    if (titleEl) titleEl.textContent = button.dataset.agentTitle || 'Imagem do projeto';
    if (imgEl) {
      imgEl.src = `${assetPrefix}${button.dataset.agentImage}.webp`;
      imgEl.alt = button.dataset.agentTitle || '';
    }
    sourceDialog?.showModal();
  })
);
