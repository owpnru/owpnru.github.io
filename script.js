const products=[
{code:'XIAOMI / 01',title:'XIAOMI AX3000T',text:'Производительный Wi‑Fi 6 роутер для квартиры и дома. Подходит для потокового видео, игр, VPN и стабильной работы большого числа устройств.',price:'от 14 900 ₽',image:'assets/img/router-home.png',tags:['Wi‑Fi 6','AX3000','VPN READY','OpenWrt'],specs:[['Класс Wi‑Fi','AX3000'],['Диапазоны','2.4 / 5 ГГц'],['Порты','Gigabit Ethernet'],['Сценарий','Дом / квартира']]},
{code:'CUDY / 02',title:'CUDY WR3000S',text:'Универсальная модель с поддержкой Wi‑Fi 6 для домашней сети. Хороший баланс скорости, покрытия и работы с VPN-сценариями.',price:'от 15 900 ₽',image:'assets/img/router-pro.png',tags:['Wi‑Fi 6','AX3000','Gigabit','WireGuard'],specs:[['Класс Wi‑Fi','AX3000'],['Диапазоны','2.4 / 5 ГГц'],['Порты','Gigabit Ethernet'],['Сценарий','Дом / офис']]},
{code:'CUDY / 03',title:'CUDY WR3000E',text:'Вторая конфигурация популярной модели для разных вариантов настройки OWPN. Подходит для квартиры, офиса и защищённого доступа в интернет.',price:'от 16 900 ₽',image:'assets/img/router-travel.png',tags:['OpenWrt','VPN','WireGuard','Smart Routing'],specs:[['Класс Wi‑Fi','AX3000'],['Прошивка','OWPN / OpenWrt'],['VPN','WireGuard'],['Сценарий','Дом / работа']]},
{code:'CUDY / 04',title:'CUDY WR3000H',text:'Мощный двухдиапазонный роутер для высокой нагрузки, стриминга и множества подключённых устройств с готовыми сетевыми сценариями.',price:'от 17 900 ₽',image:'assets/img/router-mini.png',tags:['Wi‑Fi 6','2.5G','AX3000','Multi‑VPN'],specs:[['Класс Wi‑Fi','AX3000'],['Порт','2.5G'],['Диапазоны','2.4 / 5 ГГц'],['Сценарий','Высокая нагрузка']]},
{code:'CUDY / 05',title:'CUDY WBR3000UAX',text:'Гибкая модель для домашнего и мобильного использования с поддержкой современных стандартов связи и защищённой маршрутизации.',price:'от 19 900 ₽',image:'assets/img/router-office.png',tags:['Wi‑Fi 6','USB','VPN','Mobile Ready'],specs:[['Класс Wi‑Fi','AX3000'],['Подключение','Ethernet / USB'],['VPN','OWPN Ready'],['Сценарий','Дом / поездки']]},
{code:'NETIS / 06',title:'NETIS NX31',text:'Современный гигабитный роутер для стабильного покрытия дома или небольшого офиса. Оптимален для ежедневной нагрузки и VPN.',price:'от 13 900 ₽',image:'assets/img/router-mesh.png',tags:['Wi‑Fi 6','Gigabit','Mesh','VPN'],specs:[['Класс Wi‑Fi','AX3000'],['Диапазоны','2.4 / 5 ГГц'],['Порты','Gigabit Ethernet'],['Сценарий','Дом / малый офис']]}
];
let current=0;
const modal=document.querySelector('.product-modal');
const img=document.getElementById('modalImage'),title=document.getElementById('modalTitle'),text=document.getElementById('modalText'),code=document.getElementById('modalCode'),specs=document.getElementById('modalSpecs'),counter=document.getElementById('modalCurrent'),thumbs=document.getElementById('modalThumbs'),tags=document.getElementById('modalTags'),price=document.getElementById('modalPrice');
function render(){
 const p=products[current];
 img.style.opacity=0;img.style.transform='translateY(14px) scale(.97)';
 setTimeout(()=>{img.src=p.image;img.alt=p.title;img.style.opacity=1;img.style.transform='none'},130);
 const titleParts=p.title.trim().split(/\s+/);
 const brand=titleParts.shift()||'';
 const model=titleParts.join(' ');
 title.innerHTML=`<span class="modal-title-brand">${brand}</span><span class="modal-title-model">${model}</span>`;
 text.textContent=p.text;code.textContent=p.code;price.textContent=p.price;
 document.querySelector('.modal-info').dataset.model='';
 counter.textContent=String(current+1).padStart(2,'0');
 tags.innerHTML=p.tags.map(x=>`<span>${x}</span>`).join('');
 specs.innerHTML=p.specs.map(s=>`<div><b>${s[1]}</b><span>${s[0]}</span></div>`).join('');
 [...thumbs.children].forEach((el,i)=>el.classList.toggle('active',i===current));
}
products.forEach((p,i)=>{
 const b=document.createElement('button');b.className='modal-thumb';b.setAttribute('aria-label',p.title);
 b.innerHTML=`<img src="${p.image}" alt="">`;b.onclick=()=>{current=i;render()};thumbs.appendChild(b)
});
document.querySelectorAll('.open-product').forEach(b=>b.onclick=()=>{current=+b.dataset.index;modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';render()});
function closeModal(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow=''}
document.querySelector('.modal-close').onclick=closeModal;document.querySelector('.modal-backdrop').onclick=closeModal;
document.querySelector('.next').onclick=()=>{current=(current+1)%products.length;render()};
document.querySelector('.prev').onclick=()=>{current=(current-1+products.length)%products.length;render()};
document.addEventListener('keydown',e=>{if(!modal.classList.contains('open'))return;if(e.key==='Escape')closeModal();if(e.key==='ArrowRight'||e.key==='ArrowDown'){current=(current+1)%products.length;render()}if(e.key==='ArrowLeft'||e.key==='ArrowUp'){current=(current-1+products.length)%products.length;render()}});
let touchStart=0;document.querySelector('.modal-left').addEventListener('touchstart',e=>touchStart=e.changedTouches[0].clientX,{passive:true});document.querySelector('.modal-left').addEventListener('touchend',e=>{const d=e.changedTouches[0].clientX-touchStart;if(Math.abs(d)>55){current=(current+(d<0?1:-1)+products.length)%products.length;render()}},{passive:true});
const panel=document.querySelector('.mobile-panel');document.querySelector('.menu-button').onclick=()=>panel.classList.add('open');document.querySelector('.mobile-close').onclick=()=>panel.classList.remove('open');panel.querySelectorAll('a').forEach(a=>a.onclick=()=>panel.classList.remove('open'));
const theme=document.querySelector('.theme-toggle');if(localStorage.getItem('owpn-theme')==='dark')document.body.classList.add('dark');theme.onclick=()=>{document.body.classList.toggle('dark');localStorage.setItem('owpn-theme',document.body.classList.contains('dark')?'dark':'light')};


/* Manual: активный пункт боковой навигации */
if (document.body.classList.contains('manual-page')) {
  const manualSections = [...document.querySelectorAll('.manual-section[id], .manual-support[id]')];
  const tocLinks = [...document.querySelectorAll('.manual-toc a')];
  if (manualSections.length && tocLinks.length) {
    const manualObserver = new IntersectionObserver(entries => {
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      tocLinks.forEach(link => {
        link.classList.toggle('is-current', link.getAttribute('href') === `#${visible.target.id}`);
      });
    }, {rootMargin:'-20% 0px -65% 0px', threshold:[0,.15,.5]});
    manualSections.forEach(section => manualObserver.observe(section));
  }
}








/* ==========================================================
   MANUAL IMAGE LIGHTBOX
   ========================================================== */
(() => {
  const lightbox = document.getElementById('manual-lightbox');
  if (!lightbox) return;

  const image = lightbox.querySelector('img');
  const title = lightbox.querySelector('.manual-lightbox__title');
  const resetButton = lightbox.querySelector('[data-zoom-reset]');
  const viewport = lightbox.querySelector('.manual-lightbox__viewport');
  let zoom = 1;

  function setZoom(value) {
    zoom = Math.min(3, Math.max(0.5, value));
    image.style.transform = `scale(${zoom})`;
    if (resetButton) resetButton.textContent = `${Math.round(zoom * 100)}%`;
  }

  function openLightbox(src, alt, caption) {
    image.src = src;
    image.alt = alt || '';
    title.textContent = caption || alt || 'Изображение';
    setZoom(1);
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lightbox-open');
    image.src = '';
  }

  document.querySelectorAll('.manual-figure img').forEach(img => {
    img.setAttribute('tabindex', '0');
    img.setAttribute('role', 'button');
    img.setAttribute('aria-label', `Открыть изображение: ${img.alt || 'скриншот'}`);

    const open = () => {
      const figure = img.closest('figure');
      const caption = figure?.querySelector('figcaption')?.textContent?.trim();
      openLightbox(img.src, img.alt, caption);
    };

    img.addEventListener('click', open);
    img.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        open();
      }
    });
  });

  lightbox.querySelectorAll('[data-lightbox-close]').forEach(button => {
    button.addEventListener('click', closeLightbox);
  });

  lightbox.querySelector('[data-zoom-in]')?.addEventListener('click', () => setZoom(zoom + 0.25));
  lightbox.querySelector('[data-zoom-out]')?.addEventListener('click', () => setZoom(zoom - 0.25));
  resetButton?.addEventListener('click', () => setZoom(1));

  viewport?.addEventListener('wheel', event => {
    event.preventDefault();
    setZoom(zoom + (event.deltaY < 0 ? 0.15 : -0.15));
  }, { passive: false });

  let initialDistance = null;
  viewport?.addEventListener('touchstart', event => {
    if (event.touches.length === 2) {
      const [a, b] = event.touches;
      initialDistance = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
    }
  }, { passive: true });

  viewport?.addEventListener('touchmove', event => {
    if (event.touches.length === 2 && initialDistance) {
      const [a, b] = event.touches;
      const distance = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
      setZoom(zoom * (distance / initialDistance));
      initialDistance = distance;
    }
  }, { passive: true });

  viewport?.addEventListener('touchend', () => {
    initialDistance = null;
  }, { passive: true });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && lightbox.classList.contains('is-open')) {
      closeLightbox();
    }
  });
})();


/* ==========================================================
   FAQ ACCORDION
   ========================================================== */
(() => {
  const questions = [...document.querySelectorAll('.faq__question')];
  if (!questions.length) return;

  questions.forEach(button => {
    button.addEventListener('click', () => {
      const item = button.closest('.faq__item');
      const answer = item?.querySelector('.faq__answer');
      if (!answer) return;

      const isOpen = button.getAttribute('aria-expanded') === 'true';

      questions.forEach(otherButton => {
        const otherItem = otherButton.closest('.faq__item');
        const otherAnswer = otherItem?.querySelector('.faq__answer');
        otherButton.setAttribute('aria-expanded', 'false');
        if (otherAnswer) otherAnswer.hidden = true;
      });

      if (!isOpen) {
        button.setAttribute('aria-expanded', 'true');
        answer.hidden = false;
      }
    });
  });
})();

/* V12 GLOBAL UI CONTROLLER */
(()=>{const body=document.body,menuButton=document.querySelector('.menu-button'),mobilePanel=document.querySelector('.mobile-panel');let lastFocused=null;function closeMenu(){if(!menuButton||!mobilePanel)return;mobilePanel.classList.remove('is-open');mobilePanel.setAttribute('aria-hidden','true');menuButton.setAttribute('aria-expanded','false');body.classList.remove('menu-open');lastFocused?.focus?.()}function openMenu(){if(!menuButton||!mobilePanel)return;lastFocused=document.activeElement;mobilePanel.classList.add('is-open');mobilePanel.setAttribute('aria-hidden','false');menuButton.setAttribute('aria-expanded','true');body.classList.add('menu-open');mobilePanel.querySelector('a,button')?.focus()}if(menuButton&&mobilePanel){menuButton.setAttribute('aria-expanded','false');mobilePanel.setAttribute('aria-hidden','true');menuButton.addEventListener('click',e=>{e.preventDefault();mobilePanel.classList.contains('is-open')?closeMenu():openMenu()});mobilePanel.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu()});document.addEventListener('click',e=>{if(mobilePanel.classList.contains('is-open')&&!mobilePanel.contains(e.target)&&!menuButton.contains(e.target))closeMenu()});document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});window.addEventListener('resize',()=>{if(innerWidth>1180)closeMenu()})}
const navLinks=[...document.querySelectorAll('.desktop-nav a[href*="#"],.mobile-panel a[href*="#"]')],sections=[...new Set(navLinks.map(l=>{const h=l.getAttribute('href')?.split('#')[1];return h?document.getElementById(h):null}).filter(Boolean))];if('IntersectionObserver'in window&&sections.length){const o=new IntersectionObserver(es=>{const v=es.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];if(!v)return;navLinks.forEach(l=>{const h=l.getAttribute('href')?.split('#')[1];l.classList.toggle('is-current',h===v.target.id)})},{rootMargin:'-25% 0px -60% 0px',threshold:[0,.1,.3]});sections.forEach(s=>o.observe(s))}
const top=document.querySelector('.back-to-top');if(top){const u=()=>top.classList.toggle('is-visible',scrollY>innerHeight);addEventListener('scroll',u,{passive:true});u();top.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}))}document.querySelectorAll('img').forEach((img,i)=>{if(i>1&&!img.hasAttribute('loading'))img.loading='lazy';if(!img.hasAttribute('decoding'))img.decoding='async'})})();
