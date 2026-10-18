// ============================================================================
// ATENDE FRANCA — SVG ICON SYSTEM, VOICE/CHAT CONSOLE, SCROLLYTELLING & 3D TILT
// ============================================================================

const iconPaths = {
  brand: '<path d="M7 5h10a5 5 0 0 1 5 5v4a5 5 0 0 1-5 5h-4l-5 4v-4H7a5 5 0 0 1-5-5v-4a5 5 0 0 1 5-5Z"/><path d="M7 12h2l2-4 3 8 2-4h2"/>',
  arrow: '<path d="M5 19 19 5M5 5h14v14"/>',
  wave: '<path d="M3 10v4m4-7v10m5-14v18m5-14v10m4-7v4"/>',
  mic: '<rect x="9" y="2" width="6" height="13" rx="3"/><path d="M5 10v2a7 7 0 0 0 14 0v-2M12 19v3m-4 0h8"/>',
  messages: '<path d="M14 16H7l-5 4V6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v6"/><path d="M10 9h12v11l-4-3h-8V9Z"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M7 2v6m10-6v6M3 11h18m-13 4h2m4 0h2m-8 3h2"/>',
  browser: '<rect x="2" y="3" width="20" height="18" rx="3"/><path d="M2 8h20M6 5.5h.01M9 5.5h.01M12 5.5h.01M9 12l-3 3 3 3m6-6 3 3-3 3"/>',
  workflow: '<rect x="8" y="2" width="8" height="6" rx="1"/><rect x="1" y="17" width="8" height="6" rx="1"/><rect x="15" y="17" width="8" height="6" rx="1"/><path d="M12 8v5M5 17v-4h14v4"/>',
  people: '<circle cx="9" cy="7" r="4"/><path d="M2 22v-3a7 7 0 0 1 14 0v3M17 4a4 4 0 0 1 0 8m2 4a6 6 0 0 1 3 6"/>',
  handoff: '<circle cx="7" cy="7" r="4"/><path d="M1 22v-3a6 6 0 0 1 12 0v3m1-10h9m-4-4 4 4-4 4"/>',
  chart: '<path d="M3 3v18h19M7 16l4-5 4 2 6-8m-5 0h5v5"/>',
  shield: '<path d="m12 2 9 4v6c0 5-9 10-9 10S3 17 3 12V6l9-4Z"/><path d="m8 12 3 3 5-6"/>',
  spark: '<path d="m12 2 2.7 7.3L22 12l-7.3 2.7L12 22l-2.7-7.3L2 12l7.3-2.7L12 2Z"/>',
  info: '<circle cx="12" cy="12" r="10"/><path d="M12 10v7m0-10h.01"/>',
  files: '<path d="M7 2h9l5 5v13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm9 0v6h5M9 12h8m-8 4h6M2 6v14"/>',
  database: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 4 18 4 18 0V5M3 12c0 4 18 4 18 0"/>',
  send: '<path d="m22 2-7 20-4-9-9-4 20-7ZM11 13 22 2"/>',
  search: '<circle cx="10" cy="10" r="7"/><path d="m15 15 7 7"/>',
  layers: '<path d="m12 2 10 6-10 6L2 8l10-6ZM2 12l10 6 10-6M2 17l10 6 10-6"/>',
  code: '<path d="m7 5-6 7 6 7m10-14 6 7-6 7M14 2l-4 20"/>',
  pin: '<path d="M20 10c0 6-8 13-8 13S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  plus: '<path d="M12 4v16M4 12h16"/>',
  gov: '<path d="M3 21h18M4 10h16M6 10v8M10 10v8M14 10v8M18 10v8M12 3 2 8h20L12 3Z"/>',
  building: '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 6h2m2 0h2M9 10h2m2 0h2M9 14h2m2 0h2M9 22v-4h6v4"/>'
};

function iconMarkup(name) {
  return `<svg viewBox="0 0 24 25" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[name] || iconPaths.spark}</svg>`;
}

document.querySelectorAll('.segments article').forEach((article, index) => {
  if (!article.querySelector('[data-icon]')) {
    const icon = document.createElement('i');
    icon.dataset.icon = ['shield', 'browser', 'gov', 'workflow'][index % 4];
    article.prepend(icon);
  }
});

document.querySelectorAll('[data-icon]').forEach((el) => {
  el.innerHTML = iconMarkup(el.dataset.icon);
  el.setAttribute('aria-hidden', 'true');
});

const brandIcon = document.querySelector('.brand-icon');
if (brandIcon) brandIcon.innerHTML = iconMarkup('brand');

document.querySelectorAll('.button > span[aria-hidden="true"]').forEach((el) => {
  el.innerHTML = iconMarkup('arrow');
});

// Subtle Web Audio API synthesizer for feedback on Voice demo triggers
function playVoiceChime(freq = 528) {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.25, ctx.currentTime + 0.18);
    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.24);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.25);
  } catch (_) {}
}

// ============================================================================
// 1. HERO MODE SWITCHER (Comercial / Institucional / Órgãos Públicos)
// ============================================================================
const heroModes = {
  comercial: {
    eyebrow: 'ALTA CONVERSÃO COMERCIAL · ATENDIMENTO & VENDAS COM IA',
    titleHtml: 'Sua empresa atende.<br><em>Mesmo quando você não pode.</em>',
    intro: 'Transforme o primeiro contato em oportunidade qualificada com voz, chat e presença digital.',
    desc: 'Bina recebe em segundos, Samuel organiza oportunidades no pipeline e Luma acompanha a agenda — conectados às informações aprovadas da sua empresa.',
    consolePrompt: 'comercial'
  },
  institucional: {
    eyebrow: 'PRESENÇA INSTITUCIONAL · GOVERNANÇA E IDENTIDADE DIGITAL',
    titleHtml: 'Sua instituição próxima.<br><em>Com clareza e governança.</em>',
    intro: 'Portais institucionais, recepção inteligente e base de conhecimento verificada para organizações.',
    desc: 'Unifique canais de atendimento, orientações oficiais e encaminhamento estruturado para setores internos com transparência e identidade própria.',
    consolePrompt: 'institucional'
  },
  governo: {
    eyebrow: 'SETOR PÚBLICO & ÓRGÃOS DO GOVERNO · ATENDIMENTO AO CIDADÃO',
    titleHtml: 'Atendimento ao cidadão.<br><em>Acessível, claro e auditável.</em>',
    intro: 'Triagem de demandas, ouvidoria e orientação sobre serviços públicos com base em documentos oficiais.',
    desc: 'Projetado com foco em acessibilidade (WCAG AA), transparência de IA, proteção de dados (LGPD) e encaminhamento organizado para secretarias e equipes.',
    consolePrompt: 'governo'
  }
};

document.querySelectorAll('[data-hero-mode]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const mode = heroModes[btn.dataset.heroMode];
    if (!mode) return;
    document.querySelectorAll('[data-hero-mode]').forEach((b) =>
      b.setAttribute('aria-pressed', String(b === btn))
    );
    const eyebrowEl = document.querySelector('#hero-eyebrow-text');
    const titleEl = document.querySelector('#hero-title');
    const introEl = document.querySelector('#hero-intro');
    const descEl = document.querySelector('#hero-description');
    if (eyebrowEl) eyebrowEl.textContent = mode.eyebrow;
    if (titleEl) titleEl.innerHTML = mode.titleHtml;
    if (introEl) introEl.textContent = mode.intro;
    if (descEl) descEl.textContent = mode.desc;
    const targetConsoleBtn = document.querySelector(`[data-console-topic="${mode.consolePrompt}"]`);
    targetConsoleBtn?.click();
  });
});

// ============================================================================
// 2. HERO LIQUID GLASS VOICE & CHAT CONSOLE
// ============================================================================
const consoleTopics = {
  comercial: {
    status: 'Bina Voice · Simulação Comercial',
    text: '“Olá! Sou a Bina. Posso apresentar nossos serviços, registrar seu interesse para o Samuel ou verificar horários com a Luma.”'
  },
  governo: {
    status: 'Bina Voice · Triagem Cidadão / Gov',
    text: '“Bem-vindo ao canal de orientação. Consulto apenas portarias e guias oficiais aprovados para informar documentos, prazos ou encaminhar à Ouvidoria.”'
  },
  institucional: {
    status: 'Bina Voice · Recepção Institucional',
    text: '“Olá! Posso orientar sobre setores, horários de atendimento, documentos institucionais ou transferir sua solicitação para a equipe responsável.”'
  },
  agenda: {
    status: 'Luma & Bina · Exemplo de Agenda',
    text: '“Numa agenda integrada ao projeto, consulto a disponibilidade real antes de confirmar e envio o resumo completo para o seu contato.”'
  }
};

const heroConsole = document.querySelector('#hero-console');
const consoleMicBtn = document.querySelector('#console-mic-trigger');
const consoleDrawerToggle = document.querySelector('#console-drawer-toggle');
const consoleDrawer = document.querySelector('#hero-console-drawer');
const consoleStatusText = document.querySelector('#console-status-text');
const consoleTranscript = document.querySelector('#console-transcript');
let consoleTimer = null;

function setConsoleDrawerOpen(isOpen) {
  if (!consoleDrawer || !consoleDrawerToggle) return;
  consoleDrawer.hidden = !isOpen;
  consoleDrawerToggle.setAttribute('aria-expanded', String(isOpen));
}

function triggerConsoleSimulation(topicKey, openDrawer = false) {
  const item = consoleTopics[topicKey] || consoleTopics.comercial;
  clearTimeout(consoleTimer);
  playVoiceChime(560);
  if (openDrawer) setConsoleDrawerOpen(true);
  if (heroConsole) heroConsole.classList.add('is-speaking');
  if (consoleMicBtn) consoleMicBtn.setAttribute('aria-pressed', 'true');
  if (consoleStatusText) consoleStatusText.textContent = item.status;
  if (consoleTranscript) consoleTranscript.textContent = item.text;

  consoleTimer = setTimeout(() => {
    if (heroConsole) heroConsole.classList.remove('is-speaking');
    if (consoleMicBtn) consoleMicBtn.setAttribute('aria-pressed', 'false');
  }, 3200);
}

document.querySelectorAll('[data-console-topic]').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('[data-console-topic]').forEach((b) =>
      b.setAttribute('aria-pressed', String(b === btn))
    );
    triggerConsoleSimulation(btn.dataset.consoleTopic, true);
  });
});

if (consoleMicBtn) {
  consoleMicBtn.addEventListener('click', () => {
    const activeTopic =
      document.querySelector('[data-console-topic][aria-pressed="true"]')?.dataset.consoleTopic ||
      'comercial';
    triggerConsoleSimulation(activeTopic, true);
  });
}

if (consoleDrawerToggle) {
  consoleDrawerToggle.addEventListener('click', () => {
    const isExpanded = consoleDrawerToggle.getAttribute('aria-expanded') === 'true';
    setConsoleDrawerOpen(!isExpanded);
  });
}

document.addEventListener('click', (ev) => {
  if (heroConsole && !heroConsole.contains(ev.target)) {
    setConsoleDrawerOpen(false);
  }
});

// ============================================================================
// 3. BINA VOICE SMARTPHONE SIMULATOR (#bina-voice)
// ============================================================================
const phoneResponses = {
  agenda:
    'Para agendar, consultamos a disponibilidade configurada no projeto com a Luma. Este é um exemplo interativo: nenhum horário real foi reservado.',
  info:
    'Oriento sobre serviços, documentos e horários usando exclusivamente a base de conhecimento aprovada pela empresa ou instituição.',
  gov:
    'Em órgãos públicos e autarquias, realizo a triagem cidadã por assunto, informo requisitos oficiais e encaminho o protocolo ao setor competente.',
  equipe:
    'Quando a conversa pede decisão humana ou atendimento especializado, transfiro para sua equipe com todo o histórico já organizado.'
};

document.querySelectorAll('[data-phone]').forEach((button) =>
  button.addEventListener('click', () => {
    playVoiceChime(620);
    const resp = phoneResponses[button.dataset.phone] || phoneResponses.agenda;
    const out = document.querySelector('#phone-response');
    if (out) out.textContent = resp;
    document.querySelectorAll('[data-phone]').forEach((b) =>
      b.setAttribute('aria-pressed', String(b === button))
    );
  })
);

// ============================================================================
// 4. INTERACTIVE CENTRAL OMNICHANNEL INBOX + HUMAN TAKEOVER
// ============================================================================
const inboxExamples = {
  ana: {
    name: 'Ana Costa · Clínica & Saúde',
    temp: 'Quente · Agenda',
    question: 'Olá! Quero saber como consultar os horários de atendimento desta semana.',
    answer:
      'Olá, Ana! Sou a Bina. Numa agenda conectada ao projeto, a Luma verifica os horários livres e confirma sua preferência em segundos.',
    context: 'Intenção: agendamento | Agente ativo: Bina → Luma',
    replies: [
      'Ver exemplo de confirmação da Luma',
      'Quais dados são solicitados antes de agendar?'
    ]
  },
  marcos: {
    name: 'Marcos Lima · Comercial & B2B',
    temp: 'Oportunidade · Samuel',
    question: 'Preciso de uma landing page de alta conversão e atendimento com IA para minha empresa.',
    answer:
      'Olá, Marcos! O Samuel já organizou seu perfil comercial: podemos unir o desenvolvimento do site com a Bina integrada ao WhatsApp e voz.',
    context: 'Intenção: projeto comercial | Agente ativo: Samuel (Qualificação)',
    replies: [
      'Como funciona o escopo de site + IA?',
      'Encaminhar resumo para especialista'
    ]
  },
  ouvidoria: {
    name: 'Atendimento ao Cidadão · Órgão Público',
    temp: 'Protocolo Público · Gov',
    question: 'Quais documentos preciso apresentar para solicitar certidão ou protocolo na secretaria?',
    answer:
      'Olá! De acordo com o guia oficial aprovado pela instituição, informe o tipo de solicitação para consultar a lista de documentos ou abrir encaminhamento à Ouvidoria.',
    context: 'Fonte: Base documental aprovada (RAG) | Conformidade LGPD & Transparência',
    replies: [
      'Ver requisitos no guia oficial',
      'Encaminhar ao atendimento presencial/humano'
    ]
  },
  julia: {
    name: 'Júlia Souza · Continuidade Humana',
    temp: 'Encaminhado · Equipe',
    question: 'Tenho uma demanda específica de contrato e gostaria de falar com a equipe.',
    answer:
      'Claro, Júlia! Já registrei o resumo da sua solicitação para que nossa equipe assuma a conversa sem que você precise repetir informações.',
    context: 'Intenção: atendimento humano | Handoff com contexto completo',
    replies: [
      'Simular resposta do operador humano',
      'Visualizar resumo entregue à equipe'
    ]
  }
};

let currentInboxKey = 'ana';
let humanTakeoverActive = false;

function renderInboxConversation(key) {
  currentInboxKey = key;
  const item = inboxExamples[key] || inboxExamples.ana;
  const nameEl = document.querySelector('#inbox-name');
  const tempEl = document.querySelector('#inbox-temp');
  const contextEl = document.querySelector('#inbox-context');
  const container = document.querySelector('#inbox-messages');
  const quickRepliesEl = document.querySelector('#inbox-quick-replies');

  if (nameEl) nameEl.textContent = item.name;
  if (tempEl) tempEl.textContent = item.temp;
  if (contextEl) contextEl.textContent = item.context;

  if (container) {
    container.replaceChildren();
    [item.question, item.answer].forEach((text, i) => {
      const bubble = document.createElement('div');
      bubble.className = 'bubble ' + (i ? 'assistant' : 'customer');
      bubble.textContent = text;
      container.append(bubble);
    });
  }

  if (quickRepliesEl) {
    quickRepliesEl.replaceChildren();
    (item.replies || []).forEach((replyText) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = replyText;
      btn.addEventListener('click', () => {
        if (!container) return;
        const userBubble = document.createElement('div');
        userBubble.className = 'bubble customer';
        userBubble.textContent = replyText;
        const respBubble = document.createElement('div');
        respBubble.className = 'bubble assistant';
        respBubble.textContent = humanTakeoverActive
          ? '[Equipe Humana — Simulação]: Recebemos o contexto completo da Bina e damos sequência imediata ao atendimento.'
          : '[Demonstração Bina AI]: Em produção, esta etapa consulta a regra aprovada do projeto e registra a ação no painel.';
        container.append(userBubble, respBubble);
        container.scrollTop = container.scrollHeight;
      });
      quickRepliesEl.append(btn);
    });
  }
}

document.querySelectorAll('[data-inbox]').forEach((button) =>
  button.addEventListener('click', () => {
    renderInboxConversation(button.dataset.inbox);
    document.querySelectorAll('[data-inbox]').forEach((b) => {
      b.classList.toggle('selected', b === button);
      b.setAttribute('aria-pressed', String(b === button));
    });
  })
);

const takeoverBtn = document.querySelector('#takeover-toggle');
if (takeoverBtn) {
  takeoverBtn.addEventListener('click', () => {
    humanTakeoverActive = !humanTakeoverActive;
    takeoverBtn.setAttribute('aria-pressed', String(humanTakeoverActive));
    takeoverBtn.textContent = humanTakeoverActive
      ? '✓ Conversa assumida pela equipe (Simulação)'
      : 'Assumir conversa como humano';
    const composeLabel = document.querySelector('#inbox-compose-label');
    if (composeLabel) {
      composeLabel.textContent = humanTakeoverActive
        ? 'Modo Operador Humano ativo · IA pausada nesta conversa'
        : 'Modo Assistente IA ativo · Clique nas sugestões acima para simular';
    }
  });
}

renderInboxConversation('ana');

// ============================================================================
// 5. GLOW & 3D TILT CARDS (Repass-Ai Tilted Card & Specular Glow)
// ============================================================================
document.querySelectorAll('.glow-card, .liquid-glass-card').forEach((card) => {
  card.addEventListener('pointermove', (e) => {
    if (reduced.matches || paused || !finePointer.matches) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty('--glow-x', `${e.clientX - r.left}px`);
    card.style.setProperty('--glow-y', `${e.clientY - r.top}px`);
  });
});

document.querySelectorAll('.agent-card, .liquid-glass-card').forEach((card) => {
  card.addEventListener('pointermove', (e) => {
    if (reduced.matches || paused || !finePointer.matches) return;
    const r = card.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width - 0.5;
    const ny = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(900px) rotateY(${nx * 4.5}deg) rotateX(${-ny * 4.5}deg) translateY(-4px)`;
  });
  card.addEventListener('pointerleave', () => {
    card.style.transform = '';
  });
});

// ============================================================================
// 6. GSAP SCROLLTRIGGER CHOREOGRAPHY (Bina Voice Occlusion & Section Reveals)
// ============================================================================
let extendedContext;
function configureExtendedMotion() {
  extendedContext?.revert();
  document.documentElement.classList.toggle('no-spatial-motion', paused || reduced.matches);
  if (paused || reduced.matches || !window.gsap || !window.ScrollTrigger) return;
  extendedContext = gsap.context(() => {
    gsap.matchMedia().add('(min-width: 900px)', () => {
      gsap.from('.phone-scene', {
        y: 35,
        scrollTrigger: { trigger: '.voice-section', start: 'top bottom', end: 'center center', scrub: 1 },
        ease: 'none'
      });
      const phoneTimeline = gsap.timeline({
        scrollTrigger: { trigger: '.phone-scene', start: 'top 80%', end: 'center 40%', scrub: 1 }
      });
      phoneTimeline.fromTo(
        '.phone-approach',
        { x: -80, y: 60, scale: 1, opacity: 1 },
        { x: 45, y: -15, scale: 0.22, opacity: 0, duration: 1 },
        0
      );
      phoneTimeline.fromTo(
        '.phone-avatar',
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.2 },
        0.8
      );
    });
    document
      .querySelectorAll('.solution-card, .agent-card, .process-grid article, .liquid-glass-card')
      .forEach((el) =>
        gsap.from(el, {
          y: 22,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 95%', once: true }
        })
      );
  });
}

window.addEventListener('load', configureExtendedMotion);
reduced.addEventListener('change', configureExtendedMotion);
motionButton?.addEventListener('click', configureExtendedMotion);
