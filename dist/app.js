'use strict';
const menuButton=document.getElementById('menu-toggle');
const navigation=document.getElementById('navigation');
const backdrop=document.getElementById('menu-backdrop');
const areasButton=document.getElementById('areas-toggle');
const areasPanel=document.getElementById('areas-panel');
function closeAreas(){areasButton.setAttribute('aria-expanded','false');areasPanel.hidden=true;}
let menuScrollPosition=0;let menuScrollLocked=false;
function lockPage(){if(menuScrollLocked)return;menuScrollPosition=window.scrollY;document.body.style.top='-'+menuScrollPosition+'px';document.querySelector('main').inert=true;document.querySelector('footer').inert=true;menuScrollLocked=true;}
function unlockPage(){if(!menuScrollLocked)return;document.body.style.top='';document.querySelector('main').inert=false;document.querySelector('footer').inert=false;menuScrollLocked=false;window.scrollTo(0,menuScrollPosition);}
function closeMenu(){menuButton.setAttribute('aria-expanded','false');navigation.classList.remove('is-open');document.body.classList.remove('menu-open');unlockPage();backdrop.hidden=true;document.getElementById('menu-label').textContent='Menu';document.getElementById('menu-icon').src='assets/menu-2.svg';}
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';closeAreas();menuButton.setAttribute('aria-expanded',String(open));navigation.classList.toggle('is-open',open);if(open)lockPage();document.body.classList.toggle('menu-open',open);backdrop.hidden=!open;document.getElementById('menu-label').textContent=open?'Fechar':'Menu';document.getElementById('menu-icon').src=open?'assets/x.svg':'assets/menu-2.svg';if(open){navigation.querySelector('a').focus();}else unlockPage();});
backdrop.addEventListener('click',()=>{closeMenu();menuButton.focus();});
areasButton.addEventListener('click',()=>{const open=areasButton.getAttribute('aria-expanded')!=='true';areasButton.setAttribute('aria-expanded',String(open));areasPanel.hidden=!open;});
document.addEventListener('click',event=>{if(!areasPanel.hidden&&!areasPanel.contains(event.target)&&!event.target.closest('.nav-group'))closeAreas();});
document.addEventListener('keydown',event=>{if(event.key==='Escape'){if(menuButton.getAttribute('aria-expanded')==='true'){closeMenu();menuButton.focus();}if(!areasPanel.hidden){closeAreas();areasButton.focus();}}if(event.key==='Tab'&&menuButton.getAttribute('aria-expanded')==='true'){const links=[...navigation.querySelectorAll('a[href]')];const first=links[0];const last=links[links.length-1];if(event.shiftKey&&document.activeElement===first){event.preventDefault();menuButton.focus();}else if(!event.shiftKey&&document.activeElement===menuButton){event.preventDefault();first.focus();}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();menuButton.focus();}else if(event.shiftKey&&document.activeElement===menuButton){event.preventDefault();last.focus();}}});
const navTargets=[...document.querySelectorAll('[data-nav]')];
function markSection(id){for(const link of navTargets){if(link.dataset.nav===id)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');}}
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting)markSection(entry.target.id);},{rootMargin:'-18% 0px -65% 0px',threshold:0});document.querySelectorAll('[data-section]').forEach(section=>observer.observe(section));}
function revealHash(){const id=location.hash.slice(1);const element=document.getElementById(id);if(element&&element.tagName==='DETAILS')element.open=true;}
window.addEventListener('hashchange',revealHash);revealHash();
document.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener('click',()=>{const wasMenuOpen=menuButton.getAttribute('aria-expanded')==='true';closeMenu();closeAreas();const target=document.getElementById(link.hash.slice(1));if(target&&target.tagName==='DETAILS')target.open=true;if(link.dataset.nav)markSection(link.dataset.nav);if(wasMenuOpen&&target){const focusTarget=target.tagName==='DETAILS'?target.querySelector('summary'):(target.querySelector('h1,h2')||target);if(!focusTarget.hasAttribute('tabindex'))focusTarget.setAttribute('tabindex','-1');focusTarget.focus({preventScroll:true});}}));
if(window.matchMedia){const breakpoint=window.matchMedia('(min-width:1100px)');const resetNavigation=()=>{closeMenu();closeAreas();};if(breakpoint.addEventListener)breakpoint.addEventListener('change',resetNavigation);else breakpoint.addListener(resetNavigation);}
navigation.querySelectorAll('a:not([href^="#"])').forEach(link=>link.addEventListener('click',closeMenu));
const interest=document.getElementById('interest');const selectedTopic=document.getElementById('selected-topic');let topic='';
document.querySelectorAll('[data-interest]').forEach(link=>link.addEventListener('click',()=>{interest.value=link.dataset.interest;topic=link.dataset.topic||'';selectedTopic.hidden=!topic;selectedTopic.textContent=topic?'Tema selecionado: '+topic:'';hidePreview();}));
const form=document.getElementById('contact-form');const preview=document.getElementById('message-preview');const status=document.getElementById('form-status');
function hidePreview(){preview.hidden=true;document.getElementById('whatsapp-link').removeAttribute('href');status.textContent='';}
form.addEventListener('input',event=>{hidePreview();if(event.target.id==='name'||event.target.id==='challenge'){event.target.removeAttribute('aria-invalid');document.getElementById(event.target.id+'-error').hidden=true;}});
interest.addEventListener('change',()=>{topic='';selectedTopic.hidden=true;selectedTopic.textContent='';hidePreview();});
form.addEventListener('change',hidePreview);
form.addEventListener('submit',event=>{event.preventDefault();let firstInvalid=null;for(const id of ['name','challenge']){const field=document.getElementById(id);const invalid=!field.value.trim();field.setAttribute('aria-invalid',String(invalid));document.getElementById(id+'-error').hidden=!invalid;if(invalid&&!firstInvalid)firstInvalid=field;}if(firstInvalid){hidePreview();status.textContent='Revise os campos indicados.';firstInvalid.focus();return;}
const name=document.getElementById('name').value.trim();const challenge=document.getElementById('challenge').value.trim();const topicText=topic?'\nTema: '+topic:'';const message=`Olá, Magno. Meu nome é ${name}.\n\nTenho interesse em: ${interest.value}.${topicText}\n\nMeu principal desafio: ${challenge}`;
document.getElementById('message-text').textContent=message;document.getElementById('whatsapp-link').href='https://wa.me/5594991101046?text='+encodeURIComponent(message);preview.hidden=false;status.textContent='Mensagem preparada. Confira o texto antes de abrir o WhatsApp.';preview.focus();});
const privacy=document.getElementById('privacy');document.getElementById('privacy-open').addEventListener('click',()=>privacy.showModal());document.getElementById('privacy-close').addEventListener('click',()=>privacy.close());
const dateFormatter=new Intl.DateTimeFormat('pt-BR',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'});document.querySelectorAll('[data-date]').forEach(element=>{element.textContent=dateFormatter.format(new Date(element.dataset.date+'T12:00:00Z'));});

// Keep the fixed contact link clear of form interaction and keyboard focus.
const floatingContact=document.querySelector('.floating-cta');
function updateContactClearance(){
 const active=document.activeElement;
 const editing=!!active&&form.contains(active)&&active!==document.body;
 document.body.classList.toggle('contact-editing',editing);
 document.body.classList.remove('focus-conflict');
 if(active&&active!==floatingContact&&active!==document.body&&typeof active.getBoundingClientRect==='function'){
  const focused=active.getBoundingClientRect();const fixed=floatingContact.getBoundingClientRect();
  if(focused.width>0&&focused.height>0&&focused.right>fixed.left&&focused.left<fixed.right&&focused.bottom>fixed.top&&focused.top<fixed.bottom)document.body.classList.add('focus-conflict');
 }
}
document.addEventListener('focusin',updateContactClearance);
document.addEventListener('focusout',()=>requestAnimationFrame(updateContactClearance));
window.addEventListener('resize',updateContactClearance,{passive:true});

// The inline 2-second deadline also dismisses the intro if this script fails.
const brandIntro=document.getElementById('brand-intro');
if(document.documentElement.classList.contains('intro-active')){
 document.querySelectorAll('body > :not(#brand-intro):not(script)').forEach(el=>{if(!el.inert){el.inert=true;el.setAttribute('data-intro-inert','');}});
 const skip=document.getElementById('intro-skip');skip.addEventListener('click',window.finishMagnoIntro);
 skip.focus({preventScroll:true});
 brandIntro.addEventListener('keydown',event=>{if(event.key==='Escape'){event.preventDefault();window.finishMagnoIntro();}else if(event.key==='Tab'){event.preventDefault();skip.focus();}});
 if(window.matchMedia){const motion=window.matchMedia('(prefers-reduced-motion: reduce)');if(motion.addEventListener)motion.addEventListener('change',event=>{if(event.matches)window.finishMagnoIntro();});}
}
window.addEventListener('pageshow',event=>{if(event.persisted&&window.finishMagnoIntro)window.finishMagnoIntro();});
