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

const filters=document.querySelectorAll('.filter');const cards=document.querySelectorAll('.portfolio-card');filters.forEach(btn=>btn.addEventListener('click',()=>{filters.forEach(b=>b.classList.remove('active'));btn.classList.add('active');const f=btn.dataset.filter;cards.forEach(c=>c.style.display=(f==='all'||c.dataset.category===f)?'block':'none')}));

const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

const header=document.querySelector('.site-header');window.addEventListener('scroll',()=>header.classList.toggle('scrolled',window.scrollY>20));
const toggle=document.querySelector('.menu-toggle');const nav=document.querySelector('.nav');toggle.addEventListener('click',()=>{nav.classList.toggle('open');toggle.setAttribute('aria-expanded',nav.classList.contains('open'))});document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

document.querySelector('#year').textContent=new Date().getFullYear();

document.querySelector('#contactForm').addEventListener('submit',e=>{e.preventDefault();const data=new FormData(e.currentTarget);const text=`Olá! Meu nome é ${data.get('nome')}. Tenho interesse em ${data.get('servico')}. ${data.get('mensagem')||''}`.trim();alert('Formulário demonstrativo. Para produção, conecte este envio ao WhatsApp, e-mail ou backend.\n\nMensagem gerada:\n'+text)});
