const services = [
  {title:'Projetos Arquitetônicos 3D',text:'Elaboração completa de projetos residenciais e comerciais com foco em arquitetura contemporânea, fachadas modernas e modelagem 3D hiper-realista para visualizar volumetria, revestimentos e ambientes antes da obra.'},
  {title:'Projetos Estruturais',text:'Dimensionamento de fundações, pilares, vigas, lajes, escadas e cobertura com TQS e Cypecad, buscando segurança, precisão e otimização de aço e concreto.'},
  {title:'Design de Interiores 3D',text:'Criação de ambientes personalizados com layout, materiais, cores, texturas, iluminação e mobiliário apresentados em renders 3D de alta fidelidade.'},
  {title:'Paisagismo e Área Externa',text:'Projetos de jardins, piscinas, áreas de lazer e convivência integrando vegetação, arquitetura, conforto e experiência visual.'},
  {title:'Regularização e Ampliação',text:'Adequação de imóveis às normas municipais e planejamento técnico para ampliações seguras, viáveis e legalizadas.'},
  {title:'Laudos e Perícias de Engenharia',text:'Vistorias e laudos técnicos para patologias construtivas, infiltrações, trincas e falhas estruturais com respaldo técnico e documental.'},
  {title:'Projetos para Usucapião',text:'Levantamento planialtimétrico, plantas e memoriais descritivos com precisão para instrução de processos de regularização fundiária.'},
  {title:'Consultoria Técnica Especializada',text:'Avaliação de terrenos, imóveis, projetos, materiais e viabilidade para apoiar decisões com maior segurança antes de investir.'},
  {title:'Orçamentos de Obra',text:'Levantamento quantitativo e qualitativo de materiais e mão de obra para maior controle de custos e previsibilidade financeira.'},
  {title:'Projetos e Planilhas para Financiamento',text:'Documentação técnica, planilhas PCI e cronogramas para Minha Casa Minha Vida e Caixa, facilitando o processo de aprovação do financiamento.'}
];

const grid=document.querySelector('#servicesGrid');
services.forEach((s,i)=>{const card=document.createElement('article');card.className='service-card reveal';card.innerHTML=`<span class="service-number">${String(i+1).padStart(2,'0')}</span><div><h3>${s.title}</h3><p>${s.text.slice(0,135)}...</p></div><span class="service-arrow">↗</span>`;card.addEventListener('click',()=>openService(i));grid.appendChild(card)});

const modal=document.querySelector('#serviceModal');
function openService(i){document.querySelector('#modalIndex').textContent=String(i+1).padStart(2,'0');document.querySelector('#modalTitle').textContent=services[i].title;document.querySelector('#modalText').textContent=services[i].text;modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden'}
function closeModal(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow=''}
document.querySelectorAll('[data-close]').forEach(el=>el.addEventListener('click',closeModal));document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});

const filters=document.querySelectorAll('.filter');const cards=document.querySelectorAll('.portfolio-card');filters.forEach(btn=>btn.addEventListener('click',()=>{filters.forEach(b=>b.classList.remove('active'));btn.classList.add('active');const f=btn.dataset.filter;cards.forEach(c=>c.style.display=(f==='all'||c.dataset.category===f)?'':'none')}));

// ==========================================================
// ZOOM DO PORTFÓLIO
// Com o mouse parado sobre uma imagem, ela cresce até o limite da tela e
// troca para a versão em alta (assets/portfolio/full/). Quando o mouse sai
// da imagem ampliada, ela volta ao card. Em telas de toque, um toque abre
// e outro fecha.
// ==========================================================
const ZOOM_DELAY=250; // evita abrir só de atravessar a grade com o mouse
const zoomView=document.createElement('div');zoomView.className='zoom-view';zoomView.setAttribute('aria-hidden','true');
const zoomBox=document.createElement('div');zoomBox.className='zoom-box';
const zoomLow=new Image();zoomLow.alt='';
const zoomHd=new Image();zoomHd.alt='';zoomHd.className='zoom-hd';
zoomHd.addEventListener('load',()=>zoomHd.classList.add('ready'));
zoomBox.append(zoomLow,zoomHd);zoomView.append(zoomBox);document.body.append(zoomView);

let zoomSource=null,zoomRect=null,zoomPending=null,zoomTimer=0,zoomCloseTimer=0,zoomClosing=null;

function placeZoomBox(r){Object.assign(zoomBox.style,{left:r.left+'px',top:r.top+'px',width:r.width+'px',height:r.height+'px'})}
function inRect(e,r){return e.clientX>=r.left&&e.clientX<=r.left+r.width&&e.clientY>=r.top&&e.clientY<=r.top+r.height}
function fitZoomRect(img){
  const w=img.naturalWidth||img.width,h=img.naturalHeight||img.height;
  const s=Math.min(innerWidth*.92/w,innerHeight*.88/h);
  const width=w*s,height=h*s;
  return {left:(innerWidth-width)/2,top:(innerHeight-height)/2,width,height};
}

function openZoom(img){
  if(zoomSource===img)return;
  if(zoomSource)closeZoom();
  clearTimeout(zoomTimer);clearTimeout(zoomCloseTimer);
  if(zoomClosing){zoomClosing.style.visibility='';zoomClosing=null}
  zoomSource=img;zoomPending=img;
  const pos=getComputedStyle(img).objectPosition;
  zoomLow.style.objectPosition=zoomHd.style.objectPosition=pos;
  zoomLow.src=img.currentSrc||img.src;
  zoomHd.classList.remove('ready');
  zoomHd.src=img.src.replace('/portfolio/','/portfolio/full/');
  // Parte exatamente do quadro do card, sem animação, e depois cresce.
  zoomBox.style.transition='none';
  placeZoomBox(img.parentElement.getBoundingClientRect());
  zoomView.classList.add('active');
  zoomBox.offsetWidth;
  zoomBox.style.transition='';
  zoomRect=fitZoomRect(img);
  zoomView.classList.add('open');
  placeZoomBox(zoomRect);
  img.style.visibility='hidden';
}

function closeZoom(){
  if(!zoomSource)return;
  const img=zoomSource;zoomSource=null;zoomClosing=img;
  zoomView.classList.remove('open');
  placeZoomBox(img.parentElement.getBoundingClientRect());
  zoomCloseTimer=setTimeout(()=>{img.style.visibility='';zoomClosing=null;zoomView.classList.remove('active')},400);
}

// Abrir pelo hover só no layout de desktop: na grade de uma coluna o mouse
// está sempre sobre alguma foto e o zoom reabriria sem parar.
const hoverZoom=matchMedia('(hover:hover) and (pointer:fine) and (min-width:961px)');

// Mouse: o que está sob o cursor decide abrir (após a pausa) ou fechar.
// Enquanto ampliada, a imagem só fecha quando o cursor sai dela e também
// do card de origem.
document.addEventListener('pointermove',e=>{
  if(e.pointerType!=='mouse')return;
  if(zoomSource){
    if(!inRect(e,zoomRect)&&!inRect(e,zoomSource.parentElement.getBoundingClientRect()))closeZoom();
    return;
  }
  if(!hoverZoom.matches)return;
  const media=e.target.closest&&e.target.closest('.portfolio-media');
  const img=media?media.querySelector('img'):null;
  if(img===zoomPending)return;
  clearTimeout(zoomTimer);zoomPending=img;
  if(img)zoomTimer=setTimeout(()=>openZoom(img),ZOOM_DELAY);
});
// Toque/clique fora da imagem ampliada fecha o zoom sem engolir o toque.
// Se esse toque cair na própria foto de origem, ela não reabre.
let zoomJustClosed=null;
document.addEventListener('pointerdown',e=>{
  zoomJustClosed=null;
  if(zoomSource&&!zoomBox.contains(e.target)){zoomJustClosed=zoomSource;closeZoom()}
});
document.querySelectorAll('.portfolio-media img').forEach(img=>img.addEventListener('click',()=>{if(img!==zoomJustClosed)openZoom(img)}));
zoomBox.addEventListener('click',closeZoom);
document.documentElement.addEventListener('mouseleave',()=>{clearTimeout(zoomTimer);zoomPending=null;closeZoom()});
window.addEventListener('scroll',()=>{clearTimeout(zoomTimer);zoomPending=null;closeZoom()},{passive:true});
window.addEventListener('resize',closeZoom);
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeZoom()});

const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

const header=document.querySelector('.site-header');window.addEventListener('scroll',()=>header.classList.toggle('scrolled',window.scrollY>20));
const toggle=document.querySelector('.menu-toggle');const nav=document.querySelector('.nav');toggle.addEventListener('click',()=>{nav.classList.toggle('open');toggle.setAttribute('aria-expanded',nav.classList.contains('open'))});document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

// Menu mobile: qualquer toque/clique fora do menu (e do botão que o abre)
// ou a tecla Esc recolhe o menu.
function closeMenu(){if(!nav.classList.contains('open'))return;nav.classList.remove('open');toggle.setAttribute('aria-expanded','false')}
document.addEventListener('pointerdown',e=>{if(!nav.contains(e.target)&&!toggle.contains(e.target))closeMenu()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});

// Marca em vermelho o link da seção atual: no clique e conforme a rolagem.
const sectionLinks=[...document.querySelectorAll('.nav a[href^="#"]:not(.nav-cta)')];
const linkByHash=new Map(sectionLinks.map(a=>[a.getAttribute('href'),a]));
function setActiveLink(link){sectionLinks.forEach(a=>a.classList.toggle('active',a===link))}
sectionLinks.forEach(a=>a.addEventListener('click',()=>setActiveLink(a)));

// O vermelho do menu só vale no trecho coberto pelos links: da primeira
// seção depois do hero até o fim do portfólio. Antes (hero) e depois
// (processo, contato, rodapé) o menu volta ao neutro.
const heroSection=document.querySelector('.hero');
const lastSpySection=document.querySelector('#portfolio');
function updateNavPlain(){
  const middle=window.innerHeight/2;
  const beforeRange=heroSection?heroSection.getBoundingClientRect().bottom>middle:false;
  const afterRange=lastSpySection?lastSpySection.getBoundingClientRect().bottom<middle:false;
  const plain=beforeRange||afterRange;
  document.body.classList.toggle('nav-plain',plain);
  if(plain)setActiveLink(null);
}
window.addEventListener('scroll',updateNavPlain,{passive:true});
window.addEventListener('resize',updateNavPlain);
updateNavPlain();

const spySections=sectionLinks.map(a=>document.querySelector(a.getAttribute('href'))).filter(Boolean);
if(spySections.length){
  const spy=new IntersectionObserver(entries=>{
    const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
    if(visible)setActiveLink(linkByHash.get('#'+visible.target.id));
  },{rootMargin:'-45% 0px -45% 0px',threshold:0});
  spySections.forEach(s=>spy.observe(s));
}

document.querySelector('#year').textContent=new Date().getFullYear();

// ==========================================================
// ENVIO DO FORMULÁRIO PARA O WHATSAPP
// Número no formato internacional, só dígitos.
// ==========================================================
const WHATSAPP_ENGENHEIRO='5517981876884';
const LIMITE_MENSAGEM=600;

function montarMensagem(data){
  const nome=(data.get('nome')||'').trim();
  const telefone=(data.get('telefone')||'').trim();
  const email=(data.get('email')||'').trim();
  const servico=(data.get('servico')||'').trim();
  let detalhes=(data.get('mensagem')||'').trim();
  // Evita estourar o limite de tamanho da URL em navegadores antigos.
  if(detalhes.length>LIMITE_MENSAGEM)detalhes=detalhes.slice(0,LIMITE_MENSAGEM)+'...';
  const linhas=[
    `Olá! Meu nome é ${nome} e vim pelo site.`,
    '',
    `*Serviço de interesse:* ${servico}`,
    `*Telefone:* ${telefone}`
  ];
  if(email)linhas.push(`*E-mail:* ${email}`);
  if(detalhes)linhas.push('',`*Sobre o projeto:*`,detalhes);
  return linhas.join('\n');
}

const contactForm=document.querySelector('#contactForm');
const formHint=document.querySelector('.form-hint');

contactForm.addEventListener('submit',e=>{
  e.preventDefault();
  const texto=montarMensagem(new FormData(contactForm));
  const url=`https://wa.me/${WHATSAPP_ENGENHEIRO}?text=${encodeURIComponent(texto)}`;
  // A janela é aberta ainda dentro do gesto de clique: qualquer espera
  // antes desta linha faz o bloqueador de pop-up cancelar a abertura.
  const janela=window.open(url,'_blank','noopener');
  // Em desktop sem WhatsApp Web conectado nada acontece na tela, então
  // deixamos um link visível como saída.
  if(formHint){
    formHint.innerHTML='';
    const aviso=document.createElement('span');
    aviso.textContent=janela?'Abrimos o WhatsApp com sua mensagem pronta. Não apareceu? ':'Não conseguimos abrir o WhatsApp automaticamente. ';
    const link=document.createElement('a');
    link.href=url; link.target='_blank'; link.rel='noopener noreferrer';
    link.textContent='Clique aqui para enviar.';
    formHint.append(aviso,link);
  }
});


// A logo funciona como atalho para o início da página.
const brandLinks = document.querySelectorAll('.brand');
brandLinks.forEach(brandLink => {
    brandLink.addEventListener('click', e => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        setActiveLink(null);
    });
});
