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
// 4. INTERACTIVE CENTRAL OMNICHANNEL INBOX (21ST.DEV CHAT + STREAMING TOKENS)
// ============================================================================
const inboxExamples = {
  ana: {
    name: 'Ana Costa · Clínica Santa Helena',
    channel: 'WhatsApp Oficial · +55 (16) 99241-8830 · Online agora',
    temp: 'Quente · Agenda Luma',
    clientName: 'Ana Costa',
    clientAvatar: 'assets/client-ana.jpg',
    agentName: 'Luma AI',
    agentRole: 'Especialista em Agenda',
    agentAvatar: 'assets/agent-luma.webp',
    context: 'Intenção: agendamento dermatológico | Agente ativo: Bina → Luma (Agenda Conectada)',
    messages: [
      {
        type: 'message',
        role: 'peer',
        sender: 'Ana Costa',
        senderTag: 'Paciente · WhatsApp',
        avatar: 'assets/client-ana.jpg',
        time: '10:21',
        content: 'Bom dia! 😊 Gostaria de saber se a Dra. Helena tem horário disponível para avaliação dermatológica ainda nesta semana?'
      },
      {
        type: 'message',
        role: 'self',
        sender: 'Bina AI',
        senderTag: 'Recepção & Triagem',
        avatar: 'assets/agent-bina.webp',
        time: '10:21',
        content: 'Olá, Ana! Muito bom dia! Sou a Bina, assistente da Clínica Santa Helena. Já identifiquei seu cadastro e acionei a Luma para verificar os horários livres da Dra. Helena em tempo real.'
      },
      {
        type: 'event',
        content: '✨ Bina transferiu o contexto para Luma · Especialista em Agenda (10:22)'
      },
      {
        type: 'message',
        role: 'self',
        sender: 'Luma AI',
        senderTag: 'Agenda & Continuidade',
        avatar: 'assets/agent-luma.webp',
        time: '10:22',
        audio: { duration: '0:16' },
        content: 'Ana, consultei a agenda conectada da clínica! Temos dois horários livres nesta semana:\n• Quinta-feira às 14h30\n• Sexta-feira às 10h00\nQual desses horários fica melhor para você?'
      },
      {
        type: 'message',
        role: 'peer',
        sender: 'Ana Costa',
        senderTag: 'Paciente · WhatsApp',
        avatar: 'assets/client-ana.jpg',
        time: '10:23',
        content: 'Quinta-feira às 14h30 fica perfeito pra mim!'
      },
      {
        type: 'message',
        role: 'self',
        sender: 'Luma AI',
        senderTag: 'Agenda & Continuidade',
        avatar: 'assets/agent-luma.webp',
        time: '10:23',
        content: 'Perfeito, Ana! ✅ Seu horário de Quinta-feira às 14h30 está pré-reservado. Vou te enviar o lembrete automático 24h antes por aqui.'
      }
    ],
    replies: [
      'Posso enviar foto da carteirinha do convênio?',
      'Qual o endereço e estacionamento da clínica?',
      'Preciso levar algum exame anterior?'
    ],
    simulatedAnswers: {
      'Posso enviar foto da carteirinha do convênio?':
        'Claro, Ana! Pode enviar a foto ou PDF da carteirinha por aqui mesmo. Eu já valido a cobertura e deixo sua ficha pronta na recepção antes de quinta-feira às 14h30.',
      'Qual o endereço e estacionamento da clínica?':
        'Estamos na Av. Presidente Vargas, 1420 — Centro, Franca/SP. Contamos com estacionamento próprio conveniado no subsolo com acesso direto ao elevador da clínica.',
      'Preciso levar algum exame anterior?':
        'Se você tiver exames laboratoriais dos últimos 6 meses ou a lista de dermocosméticos que usa atualmente, pode trazer ou enviar foto aqui no WhatsApp para anexarmos ao prontuário!'
    }
  },
  marcos: {
    name: 'Marcos Lima · Rede Varejo & E-commerce',
    channel: 'WhatsApp Business · +55 (16) 99108-4412 · Lead Qualificado',
    temp: 'Oportunidade · Samuel SDR',
    clientName: 'Marcos Lima',
    clientAvatar: 'assets/client-marcos.webp',
    agentName: 'Samuel AI',
    agentRole: 'Qualificação Comercial',
    agentAvatar: 'assets/agent-samuel.webp',
    context: 'Intenção: Landing Page + IA Omnichannel | Score Comercial: 94/100 (Quente)',
    messages: [
      {
        type: 'message',
        role: 'peer',
        sender: 'Marcos Lima',
        senderTag: 'Diretor Comercial',
        avatar: 'assets/client-marcos.webp',
        time: '10:19',
        content: 'Olá! Vi o site da Atende Franca e quero estruturar uma landing page de alta conversão integrada ao atendimento com IA no WhatsApp para minha rede de lojas.'
      },
      {
        type: 'message',
        role: 'self',
        sender: 'Bina AI',
        senderTag: 'Recepção Executiva',
        avatar: 'assets/agent-bina.webp',
        time: '10:19',
        content: 'Olá, Marcos! Seja muito bem-vindo à Atende Franca. Excelente iniciativa! Conectei o Samuel, nosso especialista em qualificação comercial, para desenhar o escopo ideal.'
      },
      {
        type: 'event',
        content: '📊 Samuel qualificou o lead no Pipeline Comercial · Estágio 2 (Quente)'
      },
      {
        type: 'message',
        role: 'self',
        sender: 'Samuel AI',
        senderTag: 'Qualificação & Pipeline',
        avatar: 'assets/agent-samuel.webp',
        time: '10:20',
        content: 'Prazer, Marcos! Aqui é o Samuel. Já estruturei seu card no CRM: unimos a Landing Page de alta conversão com recepção imediata no WhatsApp e distribuição por filial. Quantos atendimentos diários vocês recebem hoje?'
      },
      {
        type: 'message',
        role: 'peer',
        sender: 'Marcos Lima',
        senderTag: 'Diretor Comercial',
        avatar: 'assets/client-marcos.webp',
        time: '10:24',
        content: 'Recebemos cerca de 120 mensagens por dia, mas perdemos muitas vendas à noite e nos finais de semana.'
      },
      {
        type: 'message',
        role: 'self',
        sender: 'Samuel AI',
        senderTag: 'Qualificação & Pipeline',
        avatar: 'assets/agent-samuel.webp',
        time: '10:24',
        content: 'Registrado no resumo executivo! Com a Bina + Luma ativas 24/7, nenhum lead fica sem resposta fora do horário comercial. Podemos agendar seu diagnóstico técnico hoje às 16h?'
      }
    ],
    replies: [
      'Como funciona o escopo de Landing Page + IA?',
      'Integra com nosso catálogo e CRM atual?',
      'Confirmar diagnóstico hoje às 16h'
    ],
    simulatedAnswers: {
      'Como funciona o escopo de Landing Page + IA?':
        'Desenvolvemos a Landing Page autoral focada em conversão e já conectamos a Bina (voz e texto) + Samuel (qualificação no pipeline) direto ao seu WhatsApp Oficial.',
      'Integra com nosso catálogo e CRM atual?':
        'Sim, Marcos! Conectamos via API/Webhook ao seu CRM, ERP e catálogo de produtos para consultar estoque, qualificar a intenção de compra e transferir o pedido pronto para o vendedor.',
      'Confirmar diagnóstico hoje às 16h':
        'Excelente! Acionei a Luma e reservamos sua demonstração executiva hoje às 16h00. O resumo técnico das suas 120 demandas/dia já foi entregue ao especialista!'
    }
  },
  ouvidoria: {
    name: 'Carlos Eduardo · Cidadão / Ouvidoria',
    channel: 'Canal Oficial do Cidadão · Protocolo #2026-8841 · Verificado',
    temp: 'Setor Público · Gov RAG',
    clientName: 'Carlos Eduardo',
    clientAvatar: 'assets/client-carlos.webp',
    agentName: 'Bina AI',
    agentRole: 'Orientação Pública RAG',
    agentAvatar: 'assets/agent-bina.webp',
    context: 'Fonte: Guia Oficial de Serviços & Portaria nº 142/2026 | Conformidade LGPD & WCAG AA',
    messages: [
      {
        type: 'message',
        role: 'peer',
        sender: 'Carlos Eduardo',
        senderTag: 'Cidadão · Canal Oficial',
        avatar: 'assets/client-carlos.webp',
        time: '10:16',
        content: 'Bom dia. Preciso solicitar uma certidão de regularidade fiscal do meu imóvel e abrir um protocolo na Secretaria. Quais documentos preciso apresentar?'
      },
      {
        type: 'event',
        content: '🛡️ Consulta RAG Homologada · Guia Oficial de Serviços Municipais (Sem Improviso)'
      },
      {
        type: 'message',
        role: 'self',
        sender: 'Bina AI',
        senderTag: 'Atendimento ao Cidadão · Gov',
        avatar: 'assets/agent-bina.webp',
        time: '10:17',
        content: 'Bom dia, Carlos! De acordo com o Guia Oficial da Secretaria da Fazenda, para emissão da Certidão e protocolo digital são necessários:\n1. Documento oficial com foto (RG ou CNH)\n2. Número da Inscrição Municipal (carnê do IPTU)\n3. Comprovante de endereço atualizado.\nDeseja iniciar a triagem do protocolo por aqui?'
      },
      {
        type: 'message',
        role: 'peer',
        sender: 'Carlos Eduardo',
        senderTag: 'Cidadão · Canal Oficial',
        avatar: 'assets/client-carlos.webp',
        time: '10:20',
        content: 'Qual é o prazo de emissão depois que eu enviar os documentos?'
      },
      {
        type: 'message',
        role: 'self',
        sender: 'Bina AI',
        senderTag: 'Atendimento ao Cidadão · Gov',
        avatar: 'assets/agent-bina.webp',
        time: '10:20',
        content: 'Conforme a norma vigente da instituição, a certidão sem pendências é emitida digitalmente em até 24 horas úteis após a conferência do protocolo, com trilha auditável e proteção LGPD.'
      }
    ],
    replies: [
      'Gerar número de pré-protocolo agora',
      'Quais os horários de atendimento presencial?',
      'Encaminhar para servidor da Ouvidoria'
    ],
    simulatedAnswers: {
      'Gerar número de pré-protocolo agora':
        'Pré-protocolo #GOV-2026-8841 gerado com transparência! Sua solicitação foi classificada para a Secretaria da Fazenda com todos os requisitos documentais anexados.',
      'Quais os horários de atendimento presencial?':
        'O atendimento presencial no Paço e nas regionais funciona de segunda a sexta-feira, das 8h00 às 17h00, mediante agendamento prévio ou protocolo digital.',
      'Encaminhar para servidor da Ouvidoria':
        'Transferência iniciada! O servidor responsável pela Ouvidoria recebeu o histórico completo e o número do protocolo para dar continuidade sem que você precise repetir seus dados.'
    }
  },
  julia: {
    name: 'Júlia Souza · Diretoria & Contratos',
    channel: 'WhatsApp Corporativo · +55 (16) 99712-3090 · Atendimento Executivo',
    temp: 'Handoff · Com Equipe',
    clientName: 'Júlia Souza',
    clientAvatar: 'assets/client-julia.jpg',
    agentName: 'Equipe Atende Franca',
    agentRole: 'Consultor Humano + IA',
    agentAvatar: 'assets/portrait.webp',
    context: 'Intenção: Contrato Corporativo (4 Unidades) | Handoff Humano com Resumo Completo',
    messages: [
      {
        type: 'message',
        role: 'peer',
        sender: 'Júlia Souza',
        senderTag: 'Diretora Operacional',
        avatar: 'assets/client-julia.jpg',
        time: '10:14',
        content: 'Olá! Estamos com a minuta de implantação para nossas 4 unidades e gostaria de alinhar uma cláusula específica de SLA e treinamento com o especialista responsável.'
      },
      {
        type: 'message',
        role: 'self',
        sender: 'Bina AI',
        senderTag: 'Recepção & Governança',
        avatar: 'assets/agent-bina.webp',
        time: '10:14',
        content: 'Olá, Júlia! Como sua solicitação envolve revisão contratual sob medida para as 4 unidades, já organizei o resumo executivo e transferi a conversa para nossa equipe humana.'
      },
      {
        type: 'event',
        content: '🤝 Handoff Humano Concluído · Contexto + Histórico entregues ao Consultor Executivo (10:15)'
      },
      {
        type: 'message',
        role: 'self',
        isHuman: true,
        sender: 'Consultor Executivo',
        senderTag: 'Equipe Humana · Atende Franca',
        avatar: 'assets/portrait.webp',
        time: '10:18',
        content: 'Bom dia, Júlia! Recebi o resumo completo preparado pela Bina e pelo Samuel sobre as 4 unidades. Já incluímos o SLA prioritário e o cronograma de treinamento presencial em Franca. Podemos validar a minuta?'
      }
    ],
    replies: [
      'Visualizar resumo entregue à equipe humana',
      'Como funciona o treinamento da nossa equipe?',
      'Aprovar minuta e agendar kick-off'
    ],
    simulatedAnswers: {
      'Visualizar resumo entregue à equipe humana':
        '📋 [Resumo Handoff Bina → Equipe]: Cliente Júlia Souza (4 unidades) | Escopo: Suíte Omnichannel + Voz + Portal | Ponto focal: Cláusula de SLA prioritário e onboarding assistido.',
      'Como funciona o treinamento da nossa equipe?':
        'Realizamos o onboarding prático com seus operadores para mostrar como assumir conversas com 1 clique, consultar o pipeline do Samuel e atualizar a base de conhecimento.',
      'Aprovar minuta e agendar kick-off':
        'Maravilha, Júlia! Minuta validada com sucesso. A Luma já enviou os convites da reunião de kick-off técnico para sua diretoria!'
    }
  }
};

let currentInboxKey = 'ana';
let humanTakeoverActive = false;
let activeStreamTimer = null;
let isChatStreaming = false;
let userScrollInterrupted = false;

function formatCurrentTime() {
  const now = new Date();
  return now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

function setStreamingUIState(streaming) {
  isChatStreaming = streaming;
  const submitBtn = document.querySelector('#inbox-chat-submit');
  const arrowIcon = submitBtn?.querySelector('.icon-send-arrow');
  const stopIcon = submitBtn?.querySelector('.icon-stop-square');
  if (submitBtn) {
    submitBtn.classList.toggle('is-streaming', streaming);
    submitBtn.setAttribute('aria-label', streaming ? 'Parar resposta em tempo real' : 'Enviar mensagem');
  }
  if (arrowIcon) arrowIcon.hidden = streaming;
  if (stopIcon) stopIcon.hidden = !streaming;
}

function abortActiveStream() {
  if (activeStreamTimer) {
    clearTimeout(activeStreamTimer);
    activeStreamTimer = null;
  }
  setStreamingUIState(false);
}

function scrollChatViewportToBottom(behavior = 'smooth') {
  const viewport = document.querySelector('#inbox-viewport');
  if (!viewport || userScrollInterrupted) return;
  viewport.scrollTo({ top: viewport.scrollHeight, behavior });
}

function createChatMessageElement(msg) {
  if (msg.type === 'event') {
    const evDiv = document.createElement('div');
    evDiv.className = 'af-chat-event';
    evDiv.innerHTML = `<span class="dot"></span> <span>${msg.content}</span>`;
    return { row: evDiv, textEl: null };
  }

  const row = document.createElement('div');
  row.className = 'af-chat-row' + (msg.isHuman ? ' is-human-reply' : '');
  row.setAttribute('data-variant', msg.role || 'peer');

  const avatarWrap = document.createElement('div');
  avatarWrap.className = 'af-chat-avatar';
  const avatarImg = document.createElement('img');
  avatarImg.src = msg.avatar || 'assets/agent-bina.webp';
  avatarImg.alt = msg.sender || 'Participante';
  avatarImg.loading = 'lazy';
  avatarWrap.appendChild(avatarImg);

  const bubble = document.createElement('div');
  bubble.className = 'af-chat-bubble';

  const senderHeader = document.createElement('div');
  senderHeader.className = 'af-bubble-sender';
  const senderStrong = document.createElement('strong');
  senderStrong.textContent = msg.sender || (msg.role === 'peer' ? 'Cliente' : 'Bina AI');
  const senderBadge = document.createElement('span');
  senderBadge.textContent = msg.senderTag || '';
  senderHeader.append(senderStrong, senderBadge);

  const textEl = document.createElement('div');
  textEl.className = 'af-bubble-text';
  textEl.textContent = msg.content || '';

  bubble.append(senderHeader, textEl);

  if (msg.audio) {
    const audioBox = document.createElement('div');
    audioBox.className = 'af-chat-audio';
    audioBox.innerHTML = `
      <button type="button" class="af-chat-audio-btn" aria-label="Ouvir nota de voz da IA">▶</button>
      <div class="af-chat-audio-bars" aria-hidden="true">
        <i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i>
      </div>
      <span class="af-chat-audio-time">${msg.audio.duration || '0:15'}</span>
    `;
    const playBtn = audioBox.querySelector('.af-chat-audio-btn');
    playBtn?.addEventListener('click', () => {
      playVoiceChime(580);
      const playing = audioBox.classList.toggle('is-playing');
      playBtn.textContent = playing ? '❚❚' : '▶';
      if (playing) {
        setTimeout(() => {
          audioBox.classList.remove('is-playing');
          playBtn.textContent = '▶';
        }, 3200);
      }
    });
    bubble.appendChild(audioBox);
  }

  const timeEl = document.createElement('time');
  timeEl.className = 'af-chat-time';
  if (msg.role === 'self') {
    timeEl.innerHTML = `${msg.time || formatCurrentTime()} <span class="wa-checks" aria-label="Entregue e lido">✓✓</span>`;
    row.append(timeEl, bubble, avatarWrap);
  } else {
    timeEl.textContent = msg.time || formatCurrentTime();
    row.append(avatarWrap, bubble, timeEl);
  }

  return { row, textEl };
}

// 21st.dev useStreamToken implementation in vanilla JS
function streamAssistantReply(textEl, fullText, minDelay = 24, maxDelay = 58) {
  abortActiveStream();
  const tokens = fullText.split(/(\s+)/).filter(Boolean);
  let tokenIndex = 0;
  setStreamingUIState(true);
  userScrollInterrupted = false;

  const step = () => {
    if (tokenIndex >= tokens.length) {
      setStreamingUIState(false);
      activeStreamTimer = null;
      return;
    }
    tokenIndex++;
    textEl.textContent = tokens.slice(0, tokenIndex).join('');
    scrollChatViewportToBottom('smooth');
    const delay = minDelay + Math.random() * (maxDelay - minDelay);
    activeStreamTimer = setTimeout(step, delay);
  };

  step();
}

function submitCustomerMessage(messageText) {
  const trimmed = (messageText || '').trim();
  if (!trimmed) return;

  abortActiveStream();
  const item = inboxExamples[currentInboxKey] || inboxExamples.ana;
  const container = document.querySelector('#inbox-messages');
  if (!container) return;

  playVoiceChime(520);
  userScrollInterrupted = false;

  // 1. Append Customer (peer) message row with customer photo
  const userMsg = {
    type: 'message',
    role: 'peer',
    sender: item.clientName,
    senderTag: 'Cliente · WhatsApp',
    avatar: item.clientAvatar,
    time: formatCurrentTime(),
    content: trimmed
  };
  const { row: userRow } = createChatMessageElement(userMsg);
  container.appendChild(userRow);
  scrollChatViewportToBottom('smooth');

  // 2. Determine AI or Human response text
  let replyText = item.simulatedAnswers?.[trimmed];
  if (!replyText) {
    replyText = humanTakeoverActive
      ? `Perfeito, ${item.clientName.split(' ')[0]}! Aqui é da equipe executiva da Atende Franca. Recebi sua mensagem ("${trimmed}") junto ao histórico organizado pela IA e já estou dando andamento imediato.`
      : `Recebido, ${item.clientName.split(' ')[0]}! Consultei as regras aprovadas do projeto para responder sobre "${trimmed}" com precisão e já atualizei o status da sua solicitação no painel.`;
  } else if (humanTakeoverActive) {
    replyText = `[Atendimento Humano Assumido]: ${replyText}`;
  }

  // 3. Append Assistant / Human (self) message row and stream tokens with typewriter effect
  const assistantMsg = {
    type: 'message',
    role: 'self',
    isHuman: humanTakeoverActive,
    sender: humanTakeoverActive ? 'Equipe Humana · Atende Franca' : item.agentName,
    senderTag: humanTakeoverActive ? 'Operador no Controle' : item.agentRole,
    avatar: humanTakeoverActive ? 'assets/portrait.webp' : item.agentAvatar,
    time: formatCurrentTime(),
    content: ''
  };
  const { row: assistantRow, textEl } = createChatMessageElement(assistantMsg);
  container.appendChild(assistantRow);
  scrollChatViewportToBottom('smooth');

  if (textEl) {
    streamAssistantReply(textEl, replyText);
  }
}

function renderInboxConversation(key) {
  abortActiveStream();
  currentInboxKey = key;
  const item = inboxExamples[key] || inboxExamples.ana;
  const nameEl = document.querySelector('#inbox-name');
  const channelEl = document.querySelector('#inbox-channel');
  const headerAvatarEl = document.querySelector('#inbox-header-avatar');
  const tempEl = document.querySelector('#inbox-temp');
  const contextEl = document.querySelector('#inbox-context');
  const container = document.querySelector('#inbox-messages');
  const quickRepliesEl = document.querySelector('#inbox-quick-replies');

  if (nameEl) nameEl.textContent = item.name;
  if (channelEl) channelEl.textContent = item.channel;
  if (headerAvatarEl) {
    headerAvatarEl.src = item.clientAvatar;
    headerAvatarEl.alt = item.clientName;
  }
  if (tempEl) tempEl.textContent = item.temp;
  if (contextEl) contextEl.textContent = item.context;

  if (container) {
    container.replaceChildren();
    (item.messages || []).forEach((msg) => {
      const { row } = createChatMessageElement(msg);
      container.appendChild(row);
    });
    userScrollInterrupted = false;
    requestAnimationFrame(() => scrollChatViewportToBottom('instant'));
  }

  if (quickRepliesEl) {
    quickRepliesEl.replaceChildren();
    (item.replies || []).forEach((replyText) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = replyText;
      btn.addEventListener('click', () => {
        submitCustomerMessage(replyText);
      });
      quickRepliesEl.append(btn);
    });
  }
}

// Track user scroll interruption on ChatViewport (21st.dev useUserInterruption pattern)
const inboxViewport = document.querySelector('#inbox-viewport');
if (inboxViewport) {
  const onUserScrollInterrupt = () => {
    if (isChatStreaming) {
      const { scrollTop, scrollHeight, clientHeight } = inboxViewport;
      if (scrollHeight - scrollTop - clientHeight > 36) {
        userScrollInterrupted = true;
      }
    }
  };
  inboxViewport.addEventListener('wheel', onUserScrollInterrupt, { passive: true });
  inboxViewport.addEventListener('touchstart', onUserScrollInterrupt, { passive: true });
}

// Wire 21st.dev ChatInputArea form & multiline Enter-to-send
const inboxChatForm = document.querySelector('#inbox-chat-form');
const inboxChatInput = document.querySelector('#inbox-chat-input');
const inboxChatSubmit = document.querySelector('#inbox-chat-submit');

if (inboxChatInput) {
  inboxChatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.defaultPrevented) {
      e.preventDefault();
      inboxChatForm?.requestSubmit();
    }
  });
}

if (inboxChatSubmit) {
  inboxChatSubmit.addEventListener('click', (e) => {
    if (isChatStreaming) {
      e.preventDefault();
      abortActiveStream();
    }
  });
}

if (inboxChatForm) {
  inboxChatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (isChatStreaming) {
      abortActiveStream();
      return;
    }
    const val = inboxChatInput?.value || '';
    if (!val.trim()) return;
    if (inboxChatInput) inboxChatInput.value = '';
    submitCustomerMessage(val);
  });
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
        ? 'Operador Humano Ativo'
        : 'IA Ativa · Streaming';
    }
    const container = document.querySelector('#inbox-messages');
    if (container) {
      const { row } = createChatMessageElement({
        type: 'event',
        content: humanTakeoverActive
          ? '👤 Operador humano assumiu a conversa com histórico completo · IA em modo copiloto'
          : '✨ Assistente IA (Bina + Samuel + Luma) reativada na conversa'
      });
      container.appendChild(row);
      userScrollInterrupted = false;
      scrollChatViewportToBottom('smooth');
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
