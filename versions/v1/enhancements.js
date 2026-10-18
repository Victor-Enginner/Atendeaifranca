// Original SVG icon family and identity drawn for Atende Franca.
// Motion language informed by the user's Glass Icons, Tilted Card and Border Glow references.
const iconPaths = {
  brand:'<path d="M7 5h10a5 5 0 0 1 5 5v4a5 5 0 0 1-5 5h-4l-5 4v-4H7a5 5 0 0 1-5-5v-4a5 5 0 0 1 5-5Z"/><path d="M7 12h2l2-4 3 8 2-4h2"/>',
  arrow:'<path d="M5 19 19 5M5 5h14v14"/>',
  wave:'<path d="M3 10v4m4-7v10m5-14v18m5-14v10m4-7v4"/>',
  mic:'<rect x="9" y="2" width="6" height="13" rx="3"/><path d="M5 10v2a7 7 0 0 0 14 0v-2M12 19v3m-4 0h8"/>',
  messages:'<path d="M14 16H7l-5 4V6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v6"/><path d="M10 9h12v11l-4-3h-8V9Z"/>',
  calendar:'<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M7 2v6m10-6v6M3 11h18m-13 4h2m4 0h2m-8 3h2"/>',
  browser:'<rect x="2" y="3" width="20" height="18" rx="3"/><path d="M2 8h20M6 5.5h.01M9 5.5h.01M12 5.5h.01M9 12l-3 3 3 3m6-6 3 3-3 3"/>',
  workflow:'<rect x="8" y="2" width="8" height="6" rx="1"/><rect x="1" y="17" width="8" height="6" rx="1"/><rect x="15" y="17" width="8" height="6" rx="1"/><path d="M12 8v5M5 17v-4h14v4"/>',
  people:'<circle cx="9" cy="7" r="4"/><path d="M2 22v-3a7 7 0 0 1 14 0v3M17 4a4 4 0 0 1 0 8m2 4a6 6 0 0 1 3 6"/>',
  handoff:'<circle cx="7" cy="7" r="4"/><path d="M1 22v-3a6 6 0 0 1 12 0v3m1-10h9m-4-4 4 4-4 4"/>',
  chart:'<path d="M3 3v18h19M7 16l4-5 4 2 6-8m-5 0h5v5"/>',
  shield:'<path d="m12 2 9 4v6c0 5-9 10-9 10S3 17 3 12V6l9-4Z"/><path d="m8 12 3 3 5-6"/>',
  spark:'<path d="m12 2 2.7 7.3L22 12l-7.3 2.7L12 22l-2.7-7.3L2 12l7.3-2.7L12 2Z"/>',
  info:'<circle cx="12" cy="12" r="10"/><path d="M12 10v7m0-10h.01"/>',
  files:'<path d="M7 2h9l5 5v13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm9 0v6h5M9 12h8m-8 4h6M2 6v14"/>',
  database:'<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 4 18 4 18 0V5M3 12c0 4 18 4 18 0"/>',
  send:'<path d="m22 2-7 20-4-9-9-4 20-7ZM11 13 22 2"/>',
  search:'<circle cx="10" cy="10" r="7"/><path d="m15 15 7 7"/>',
  layers:'<path d="m12 2 10 6-10 6L2 8l10-6ZM2 12l10 6 10-6M2 17l10 6 10-6"/>',
  code:'<path d="m7 5-6 7 6 7m10-14 6 7-6 7M14 2l-4 20"/>',
  pin:'<path d="M20 10c0 6-8 13-8 13S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  plus:'<path d="M12 4v16M4 12h16"/>'
};
function iconMarkup(name) {return `<svg viewBox="0 0 24 25" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[name] || iconPaths.spark}</svg>`;}
document.querySelectorAll('.segments article').forEach((article,index)=>{const icon=document.createElement('i');icon.dataset.icon=['shield','browser','workflow'][index];article.prepend(icon);});
document.querySelectorAll('[data-icon]').forEach(el => {el.innerHTML=iconMarkup(el.dataset.icon);el.setAttribute('aria-hidden','true');});
document.querySelector('.brand-icon').innerHTML=iconMarkup('brand');
document.querySelector('.note-symbol').innerHTML=iconMarkup('spark');
document.querySelector('.voice-icon').innerHTML=iconMarkup('wave');
document.querySelectorAll('.button > span[aria-hidden="true"]').forEach(el=>el.innerHTML=iconMarkup('arrow'));
const phoneResponses={agenda:'Para agendar, primeiro precisamos consultar os horários da sua empresa. Este é um exemplo: nenhum horário foi reservado.',info:'Posso orientar sobre serviços, horários e endereço usando informações aprovadas pela sua empresa. Aqui usamos um negócio fictício.',equipe:'Uma conversa também pode continuar com sua equipe. Nesta demonstração não há um operador conectado.'};
document.querySelectorAll('[data-phone]').forEach(button=>button.addEventListener('click',()=>{document.querySelector('#phone-response').textContent=phoneResponses[button.dataset.phone];document.querySelectorAll('[data-phone]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));}));
const inboxExamples={ana:{name:'Ana Costa',question:'Olá! Quero saber como consultar os horários.',answer:'Olá, Ana! Sou a Bina, assistente virtual. Numa agenda conectada, eu consultaria a disponibilidade antes de sugerir um horário.',context:'Intenção: informações sobre agendamento'},marcos:{name:'Marcos Lima',question:'Preciso de um site para minha loja.',answer:'Olá, Marcos! Podemos começar pelo seu negócio: o que você vende e qual ação gostaria que o visitante realizasse no site?',context:'Intenção: criação de site'},julia:{name:'Júlia Souza',question:'Posso falar com a equipe?',answer:'Claro, Júlia. Em uma operação conectada, sua conversa seria encaminhada com o contexto necessário. Aqui mostramos apenas o exemplo.',context:'Intenção: atendimento humano'}};
document.querySelectorAll('[data-inbox]').forEach(button=>button.addEventListener('click',()=>{const item=inboxExamples[button.dataset.inbox];document.querySelector('#inbox-name').textContent=item.name;document.querySelector('#inbox-context').textContent=item.context;const container=document.querySelector('#inbox-messages');container.replaceChildren();['question','answer'].forEach((key,i)=>{const bubble=document.createElement('div');bubble.className='bubble '+(i?'assistant':'customer');bubble.textContent=item[key];container.append(bubble);});document.querySelectorAll('[data-inbox]').forEach(b=>{b.classList.toggle('selected',b===button);b.setAttribute('aria-pressed',String(b===button));});}));
document.querySelectorAll('.glow-card').forEach(card=>{card.addEventListener('pointermove',e=>{if(reduced.matches||paused||!finePointer.matches)return;const r=card.getBoundingClientRect();card.style.setProperty('--glow-x',`${e.clientX-r.left}px`);card.style.setProperty('--glow-y',`${e.clientY-r.top}px`);});});
let extendedContext;
function configureExtendedMotion(){
  extendedContext?.revert();
  document.documentElement.classList.toggle('no-spatial-motion',paused||reduced.matches);
  if(paused||reduced.matches||!window.gsap||!window.ScrollTrigger)return;
  extendedContext=gsap.context(()=>{
    gsap.matchMedia().add('(min-width: 900px)',()=>{
      gsap.from('.phone-scene',{y:35,scrollTrigger:{trigger:'.voice-section',start:'top bottom',end:'center center',scrub:1},ease:'none'});
      const phoneTimeline=gsap.timeline({scrollTrigger:{trigger:'.phone-scene',start:'top 80%',end:'center 40%',scrub:1}});
      phoneTimeline.fromTo('.phone-approach',{x:-80,y:60,scale:1,opacity:1},{x:45,y:-15,scale:.22,opacity:0,duration:1},0);
      phoneTimeline.fromTo('.phone-avatar',{opacity:0,scale:.8},{opacity:1,scale:1,duration:.2},.8);
      gsap.from('.connection-lines path',{strokeDashoffset:500,strokeDasharray:500,duration:1.3,stagger:.1,scrollTrigger:{trigger:'.connection-map',start:'top 80%',once:true}});
    });
    document.querySelectorAll('.solution-card,.agent-card,.process-grid article').forEach(el=>gsap.from(el,{y:22,opacity:0,duration:.65,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 95%',once:true}}));
  });
}
window.addEventListener('load',configureExtendedMotion);
reduced.addEventListener('change',configureExtendedMotion);
motionButton.addEventListener('click',configureExtendedMotion);
