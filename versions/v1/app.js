/* Button interaction adapted from Magnetic Button by Mohammad Shehadeh / Hirael.
 * MIT source retrieved through 21st.dev: https://21st.dev/@mohammadshehadeh/components/magnetic-button
 * This DOM implementation limits travel and disables attraction for touch/reduced motion.
 */
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
let paused = false;
let motionContext;
const motionButton = document.querySelector('#motion-toggle');
const stage = document.querySelector('.stage');
const pivot = document.querySelector('.mascot-pivot');
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
function resetPointer() {
  pivot.style.transform = '';
  document.querySelectorAll('.magnetic').forEach(el => el.style.transform = '');
}
document.querySelectorAll('.magnetic').forEach(el => {
  el.addEventListener('pointermove', event => {
    if (paused || reduced.matches || !finePointer.matches) return;
    const rect = el.getBoundingClientRect();
    const x = clamp((event.clientX - rect.left - rect.width / 2) * .12, -5, 5);
    const y = clamp((event.clientY - rect.top - rect.height / 2) * .12, -4, 4);
    el.style.transform = `translate(${x}px,${y}px)`;
  });
  el.addEventListener('pointerleave', () => el.style.transform = '');
  el.addEventListener('blur', () => el.style.transform = '');
});
stage.addEventListener('pointermove', event => {
  if (paused || reduced.matches || !finePointer.matches) return;
  const rect = stage.getBoundingClientRect();
  const nx = clamp((event.clientX - rect.left) / rect.width * 2 - 1, -1, 1);
  const ny = clamp((event.clientY - rect.top) / rect.height * 2 - 1, -1, 1);
  pivot.style.transform = `translate(${nx * 3}px,${ny * 3}px) rotate(${nx * 1.5}deg)`;
});
pivot.style.transition = 'transform 350ms ease-out';
stage.addEventListener('pointerleave', resetPointer);
let introSeen = false;
function configureMotion() {
  motionContext?.revert();
  resetPointer();
  if (paused || reduced.matches || !window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);
  motionContext = gsap.context(() => {
    if (!introSeen) {
      introSeen = true;
      gsap.from('.hero-copy > *', {y:18, opacity:0, stagger:.07, duration:.7, ease:'power2.out'});
      gsap.from('.mascot-root', {y:22, opacity:0, scale:.97, duration:.9, ease:'power2.out'});
    }
    gsap.matchMedia().add('(min-width: 761px)', () => {
      gsap.to('.arch', {y:25, ease:'none', scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:1}});
      gsap.to('.mascot-root', {y:-20, opacity:0, ease:'none', scrollTrigger:{trigger:'.hero',start:'bottom 35%',end:'bottom top',scrub:true}});
      gsap.from('.site-preview', {rotateY:0, rotateX:0, y:25, ease:'none',scrollTrigger:{trigger:'.sites',start:'top bottom',end:'center center',scrub:1}});
    });
  });
}
motionButton.addEventListener('click', () => {
  paused = !paused;
  document.documentElement.classList.toggle('motion-paused', paused);
  motionButton.setAttribute('aria-pressed', String(paused));
  motionButton.textContent = paused ? 'Retomar movimento' : 'Pausar movimento';
  configureMotion();
});
reduced.addEventListener('change', configureMotion);
window.addEventListener('load', configureMotion);
document.addEventListener('visibilitychange', () => {
  if (document.hidden) resetPointer();
  else window.ScrollTrigger?.refresh();
});
const menu = document.querySelector('.solutions');
menu.addEventListener('click', event => { if (event.target.closest('a')) menu.open = false; });
document.addEventListener('click', event => { if (!menu.contains(event.target)) menu.open = false; });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && menu.open) {menu.open = false;menu.querySelector('summary').focus();} });
document.querySelector('#open-demo')?.addEventListener('click', () => document.querySelector('#demo-dialog').showModal());
document.querySelector('#open-contact').addEventListener('click', () => document.querySelector('#contact-dialog').showModal());
document.querySelectorAll('[data-close]').forEach(button => button.addEventListener('click', () => button.closest('dialog').close()));
const examples = {
  agenda:'Numa integração com agenda, eu consultaria os horários disponíveis antes de oferecer uma reserva. Aqui é apenas um exemplo: nenhum horário foi consultado ou reservado.',
  humano:'Quando você precisar, o atendimento poderá encaminhar sua conversa à equipe, conforme a integração do projeto. Neste exemplo, nenhuma transferência foi realizada.'
};
document.querySelectorAll('[data-example]').forEach(button => button.addEventListener('click', () => {
  document.querySelector('#demo-message').textContent = examples[button.dataset.example];
}));
document.querySelector('#brief-form').addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const content = `BRIEFING — ATENDE FRANCA\n\nNegócio: ${data.get('company')}\nInteresse: ${data.get('service')}\n\nRotina e objetivos:\n${data.get('need')}\n\nDocumento preparado localmente. Não enviado.\n`;
  const url = URL.createObjectURL(new Blob([content], {type:'text/plain;charset=utf-8'}));
  const link = document.createElement('a');link.href = url;link.download = 'meu-briefing-atende-franca.txt';link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});
