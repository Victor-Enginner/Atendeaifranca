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

// 3. 21st.dev 3D Scroll-Driven Animated Gallery (#aplicacoes)
const visualCases = {
  todos: {
    label: 'COLEÇÃO COMPLETA · 12 CENÁRIOS',
    title: 'Role para explorar a galeria 3D ou clique em qualquer cena para ampliar em tela cheia.',
    description:
      'Todos os cenários da Atende Franca integrados: WhatsApp, Bina Voice, Samuel (Pipeline), Luma (Agenda) e Portais Públicos.'
  },
  atendimento: {
    label: 'ATENDIMENTO COM CONTEXTO',
    title: 'Seu cliente ou cidadão tem uma dúvida. A conversa começa.',
    description:
      'Mensagens, informações e próximos passos apresentados com a identidade do seu negócio ou instituição.'
  },
  agenda: {
    label: 'AGENDA E ACOMPANHAMENTO COM LUMA',
    title: 'Do primeiro contato ao próximo horário confirmado.',
    description:
      'As cenas da Luma traduzem a direção para suporte, consulta de disponibilidade e confirmação organizada.'
  },
  vendas: {
    label: 'ALTA CONVERSÃO COMERCIAL COM SAMUEL',
    title: 'Cada oportunidade qualificada com contexto claro.',
    description:
      'Organizar o interesse, apresentar catálogos ou propostas e apoiar o fechamento comercial da sua equipe.'
  },
  voz: {
    label: 'VOZ E PRESENÇA DIGITAL 3D',
    title: 'Uma experiência natural para falar e ser compreendido.',
    description:
      'Conversas por voz conectadas à base de conhecimento do negócio, da assistente humana ao mascote em cerâmica.'
  },
  governo: {
    label: 'INSTITUCIONAL & ÓRGÃOS PÚBLICOS',
    title: 'Orientação pública acessível, transparente e auditável.',
    description:
      'Triagem de protocolos, dúvidas frequentes sobre serviços municipais/estaduais e encaminhamento para secretarias e ouvidorias.'
  }
};

let selectedVisualCase = 'todos';

function renderVisualCase() {
  const item = visualCases[selectedVisualCase] || visualCases.todos;
  const labelEl = document.querySelector('#case-label');
  const titleEl = document.querySelector('#case-title');
  const descEl = document.querySelector('#case-description');

  if (labelEl) labelEl.textContent = item.label;
  if (titleEl) titleEl.textContent = item.title;
  if (descEl) descEl.textContent = item.description;

  document.querySelectorAll('[data-case]').forEach((button) =>
    button.setAttribute('aria-pressed', String(button.dataset.case === selectedVisualCase))
  );

  document.querySelectorAll('.af-gallery-item[data-gallery-cat]').forEach((card) => {
    if (selectedVisualCase === 'todos') {
      card.classList.remove('is-dimmed', 'is-highlighted');
    } else {
      const match = card.dataset.galleryCat === selectedVisualCase;
      card.classList.toggle('is-highlighted', match);
      card.classList.toggle('is-dimmed', !match);
    }
  });
}

document.querySelectorAll('[data-case]').forEach((button) =>
  button.addEventListener('click', () => {
    selectedVisualCase = button.dataset.case || 'todos';
    renderVisualCase();
  })
);

// 21st.dev ContainerStagger + ContainerAnimated blur-to-crisp entrance
const galleryStaggerEl = document.querySelector('#af-gallery-stagger');
if (galleryStaggerEl) {
  if ('IntersectionObserver' in window) {
    const staggerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            galleryStaggerEl.classList.add('is-visible');
            staggerObserver.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );
    staggerObserver.observe(galleryStaggerEl);
  } else {
    galleryStaggerEl.classList.add('is-visible');
  }
}

// 21st.dev ContainerScroll + GalleryContainer + GalleryCol 3D Scroll Engine
const galleryScrollEl = document.querySelector('#af-gallery-scroll');
const gallery3dEl = document.querySelector('#af-gallery-3d');
const galleryCol1 = document.querySelector('#af-gallery-col-1');
const galleryCol2 = document.querySelector('#af-gallery-col-2');
const galleryCol3 = document.querySelector('#af-gallery-col-3');

function clamp01(v) {
  return Math.max(0, Math.min(1, v));
}

function mapRange(value, inMin, inMax, outMin, outMax) {
  const t = clamp01((value - inMin) / (inMax - inMin));
  return outMin + t * (outMax - outMin);
}

function updateAnimatedGalleryScroll() {
  if (!galleryScrollEl || !gallery3dEl) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    galleryScrollEl.style.removeProperty('height');
    gallery3dEl.style.transform = 'none';
    if (galleryCol1) galleryCol1.style.transform = 'none';
    if (galleryCol2) galleryCol2.style.transform = 'none';
    if (galleryCol3) galleryCol3.style.transform = 'none';
    return;
  }

  if (window.matchMedia('(max-width: 760px)').matches) {
    const sticky = gallery3dEl.parentElement;
    const viewportHeight = window.innerHeight;
    const travel = Math.max(0, gallery3dEl.offsetHeight - sticky.clientHeight + 48);
    const sectionHeight = sticky.offsetHeight + travel + viewportHeight * 0.35;
    galleryScrollEl.style.height = `${Math.ceil(sectionHeight)}px`;
    const rect = galleryScrollEl.getBoundingClientRect();
    const progress = clamp01((92 - rect.top) / Math.max(1, sectionHeight - sticky.offsetHeight));
    const tilt = mapRange(progress, 0, 0.45, 16, 0);
    const scale = mapRange(progress, 0, 0.45, 0.98, 1);
    gallery3dEl.style.transform = `translate3d(0, ${(-travel * progress).toFixed(1)}px, 0) perspective(1000px) rotateX(${tilt.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
    gallery3dEl.style.setProperty('--gallery-drift', `${(Math.sin(progress * Math.PI) * 16).toFixed(1)}px`);
    return;
  }

  galleryScrollEl.style.removeProperty('height');

  const rect = galleryScrollEl.getBoundingClientRect();
  const winH = window.innerHeight || document.documentElement.clientHeight;
  const totalScrollable = Math.max(1, rect.height - winH * 0.35);
  // scrollYProgress from 0 (entering viewport) to 1 (finishing section)
  const scrollYProgress = clamp01((winH * 0.72 - rect.top) / totalScrollable);

  // Mirrors 21st.dev animated-gallery.tsx:
  // rotateX = useTransform(scrollYProgress, [0, 0.5], [52, 0])
  // scale = useTransform(scrollYProgress, [0.5, 0.9], [1.12, 1])
  const rotateX = mapRange(scrollYProgress, 0, 0.5, 52, 0);
  const scale = scrollYProgress < 0.5
    ? mapRange(scrollYProgress, 0, 0.5, 1.04, 1.12)
    : mapRange(scrollYProgress, 0.5, 0.9, 1.12, 1.0);

  gallery3dEl.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) scale(${scale.toFixed(3)})`;

  // Col 1 & Col 3: yRange ["-10%", "2%"], Col 2: yRange ["15%", "-5%"]
  const col13Y = mapRange(scrollYProgress, 0.2, 1, -10, 2);
  const col2Y = mapRange(scrollYProgress, 0.2, 1, 15, -6);

  if (galleryCol1) galleryCol1.style.transform = `translate3d(0, ${col13Y.toFixed(2)}%, 0)`;
  if (galleryCol2) galleryCol2.style.transform = `translate3d(0, ${col2Y.toFixed(2)}%, 0)`;
  if (galleryCol3) galleryCol3.style.transform = `translate3d(0, ${col13Y.toFixed(2)}%, 0)`;
}

let galleryRafId = 0;
function onGalleryScrollTick() {
  if (galleryRafId) return;
  galleryRafId = requestAnimationFrame(() => {
    galleryRafId = 0;
    updateAnimatedGalleryScroll();
    updateSitesScrollAnimation();
  });
}

// 4. 21st.dev IntegrationHero + Scroll Animation (#sites)
const sitesSectionEl = document.querySelector('#sites');
const sitesCarouselEl = document.querySelector('#af-integration-carousel');
const sitesBrowserWindowEl = document.querySelector('#af-sites-browser-window');
const siteUrlEl = document.querySelector('#af-site-url');
const siteBadgeEl = document.querySelector('#af-site-badge');
const siteImgEl = document.querySelector('#af-site-img');
const siteCaptionEl = document.querySelector('#af-site-caption');

const siteShowcasePresets = {
  comercial: {
    url: 'suaorganizacao.com.br/catalogo-ia',
    badge: 'LANDING PAGE + IA',
    image: 'commerce',
    alt: 'Conceito visual de presença digital e e-commerce com IA',
    caption: 'Design autoral + alta conversão + atendimento integrado com Bina, Samuel e Luma'
  },
  institucional: {
    url: 'institucional.suaempresa.com.br',
    badge: 'PORTAL INSTITUCIONAL',
    image: 'people-reference',
    alt: 'Portal corporativo e institucional integrado à governança de atendimento',
    caption: 'Presença institucional sólida, arquitetura WCAG AA e recepção inteligente em múltiplos canais'
  },
  gov: {
    url: 'servicos.municipio.gov.br/cidadao',
    badge: 'PORTAL PÚBLICO & CIDADÃO',
    image: 'knowledge',
    alt: 'Portal público estruturado para orientação ao cidadão e serviços digitais',
    caption: 'Transparência, busca orientada na base oficial (RAG) e acessibilidade para o cidadão'
  },
  sistemas: {
    url: 'app.suaoperacao.com.br/workspace',
    badge: 'SISTEMA WEB SOB MEDIDA',
    image: 'integration-reference',
    alt: 'Sistema web sob medida conectado via APIs e webhooks',
    caption: 'Painéis operacionais, integrações via API/Webhooks e fluxos customizados ponta a ponta'
  }
};

document.querySelectorAll('[data-site-tab]').forEach((tabBtn) => {
  tabBtn.addEventListener('click', () => {
    const key = tabBtn.dataset.siteTab;
    const preset = siteShowcasePresets[key];
    if (!preset) return;

    document.querySelectorAll('[data-site-tab]').forEach((btn) => {
      btn.setAttribute('aria-selected', String(btn === tabBtn));
    });

    if (siteUrlEl) siteUrlEl.textContent = preset.url;
    if (siteBadgeEl) siteBadgeEl.textContent = preset.badge;
    if (siteCaptionEl) siteCaptionEl.textContent = preset.caption;

    document.querySelectorAll('[data-site-template]').forEach((tplEl) => {
      const isMatch = tplEl.dataset.siteTemplate === key;
      tplEl.hidden = !isMatch;
      tplEl.classList.toggle('is-active', isMatch);
    });
  });
});

// Micro-interactivity inside the mini-system templates (no scroll)
document.querySelectorAll('.af-tpl-saas-menu span, .af-tpl-nav-links span').forEach((item) => {
  item.style.cursor = 'pointer';
  item.addEventListener('click', () => {
    const parent = item.parentElement;
    if (!parent) return;
    parent.querySelectorAll('span').forEach((sib) => {
      sib.classList.remove('is-active', 'is-current');
    });
    item.classList.add(parent.classList.contains('is-dark') ? 'is-current' : 'is-active');
  });
});

function updateSitesScrollAnimation() {
  if (!sitesSectionEl) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    if (sitesCarouselEl) {
      sitesCarouselEl.style.setProperty('--scroll-shift-left', '0px');
      sitesCarouselEl.style.setProperty('--scroll-shift-right', '0px');
    }
    if (sitesBrowserWindowEl) {
      sitesBrowserWindowEl.style.transform = 'none';
    }
    return;
  }

  const rect = sitesSectionEl.getBoundingClientRect();
  const winH = window.innerHeight || document.documentElement.clientHeight;
  const totalSpan = Math.max(1, rect.height + winH * 0.5);
  const progress = clamp01((winH * 0.88 - rect.top) / totalSpan);

  // Horizontal scroll velocity shift on the 2 counter-scrolling integration rows
  if (sitesCarouselEl) {
    const shiftLeft = mapRange(progress, 0, 1, 42, -58);
    const shiftRight = mapRange(progress, 0, 1, -42, 58);
    sitesCarouselEl.style.setProperty('--scroll-shift-left', `${shiftLeft.toFixed(1)}px`);
    sitesCarouselEl.style.setProperty('--scroll-shift-right', `${shiftRight.toFixed(1)}px`);
  }

  // 3D un-tilt & scale reveal on the 16:9 browser showcase
  if (sitesBrowserWindowEl) {
    const bRect = sitesBrowserWindowEl.getBoundingClientRect();
    const bProgress = clamp01((winH * 0.94 - bRect.top) / (winH * 0.68));
    const rotateX = mapRange(bProgress, 0, 1, 22, 0);
    const scale = mapRange(bProgress, 0, 1, 0.92, 1.0);
    const translateY = mapRange(bProgress, 0, 1, 28, 0);
    sitesBrowserWindowEl.style.transform =
      `perspective(1200px) rotateX(${rotateX.toFixed(2)}deg) scale(${scale.toFixed(3)}) translateY(${translateY.toFixed(1)}px)`;
  }
}

window.addEventListener('scroll', onGalleryScrollTick, { passive: true });
window.addEventListener('resize', onGalleryScrollTick, { passive: true });
renderVisualCase();
updateAnimatedGalleryScroll();
updateSitesScrollAnimation();

// 5. Source Image Dialog Lightbox
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

