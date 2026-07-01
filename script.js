/* =========================================================
   SUPABASE CONFIG
   Replace these two values with your project's URL and anon
   public key (Project Settings → API in the Supabase dashboard).
   The anon key is safe to expose in client code — row-level
   security policies (see database.sql) control what it can do.
   ========================================================= */
const SUPABASE_URL = 'YOUR_SUPABASE_PROJECT_URL'; // e.g. https://xxxxx.supabase.co
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';

async function supabaseInsert(table, row){
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Prefer': 'return=minimal'
    },
    body: JSON.stringify(row)
  });
  if(!res.ok){
    const text = await res.text().catch(()=> '');
    throw new Error(`Supabase insert failed (${res.status}): ${text}`);
  }
  return true;
}

/* ===================== DATA ===================== */
const ICONS = {
  travel: '<svg viewBox="0 0 24 24"><path d="M3 12h18M12 3a15 15 0 010 18M12 3a15 15 0 000 18"/></svg>',
  books: '<svg viewBox="0 0 24 24"><path d="M4 5a2 2 0 012-2h5v18H6a2 2 0 01-2-2V5zM20 5a2 2 0 00-2-2h-5v18h5a2 2 0 002-2V5z"/></svg>',
  music: '<svg viewBox="0 0 24 24"><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/><path d="M9 18V5l12-2v13"/></svg>',
  career: '<svg viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>',
  food: '<svg viewBox="0 0 24 24"><path d="M6 2v6a3 3 0 003 3v11M6 2v9M10 2v9M18 2c-2 2-2 6-2 8a2 2 0 002 2v10"/></svg>',
  culture: '<svg viewBox="0 0 24 24"><path d="M3 21h18M5 21V8l7-5 7 5v13M9 21V13h6v8"/></svg>',
  sports: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a13 13 0 014 9 13 13 0 01-4 9 13 13 0 01-4-9 13 13 0 014-9z"/></svg>',
  life: '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.5-7 8-7s8 3 8 7"/></svg>',
  business: '<svg viewBox="0 0 24 24"><path d="M3 17l5-5 4 4 8-8M14 8h6v6"/></svg>',
  languages: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M3 9h18M3 15h18M12 3a13 13 0 014 9 13 13 0 01-4 9 13 13 0 01-4-9 13 13 0 014-9z"/></svg>',
  creativity: '<svg viewBox="0 0 24 24"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/></svg>',
  film: '<svg viewBox="0 0 24 24"><rect x="2" y="6" width="20" height="13" rx="2"/><path d="M7 6v13M17 6v13M2 10h5M2 15h5M17 10h5M17 15h5"/></svg>',
};

const topics = [
  {key:'travel',name:'Travel',count:'142 conversations',desc:"From weekend escapes to round-the-world journeys, talk to people who've recently returned from somewhere worth describing.",img:'https://picsum.photos/seed/kindly-topic-travel/600/400'},
  {key:'books',name:'Books',count:'98 conversations',desc:"Discuss a novel you can't put down with someone who reads as widely, and as obsessively, as you do.",img:'https://picsum.photos/seed/kindly-topic-books/600/400'},
  {key:'music',name:'Music',count:'87 conversations',desc:"Whatever you've had on repeat this month, there's a member equally enthusiastic about it.",img:'https://picsum.photos/seed/kindly-topic-music/600/400'},
  {key:'career',name:'Career',count:'76 conversations',desc:'Talk through a career decision, a second chapter, or simply what work means to you, with someone outside your usual circle.',img:'https://picsum.photos/seed/kindly-topic-career/600/400'},
  {key:'food',name:'Food & Cooking',count:'65 conversations',desc:"Swap recipes, regional traditions, and the dishes you've never quite mastered.",img:'https://picsum.photos/seed/kindly-topic-food/600/400'},
  {key:'culture',name:'Culture',count:'59 conversations',desc:'Conversations about heritage, traditions, and the things that shape how we see the world.',img:'https://picsum.photos/seed/kindly-topic-culture/600/400'},
  {key:'sports',name:'Sports',count:'54 conversations',desc:"Whatever you follow, there's a member who follows it just as closely — and probably disagrees with your last opinion.",img:'https://picsum.photos/seed/kindly-topic-sports/600/400'},
  {key:'life',name:'Life Experiences',count:'112 conversations',desc:'The bigger conversations — about change, resilience, and the things worth learning from someone further down the road.',img:'https://picsum.photos/seed/kindly-topic-life/600/400'},
  {key:'business',name:'Business',count:'43 conversations',desc:'Talk shop with founders, freelancers, and operators who understand the particular kind of tired that running something brings.',img:'https://picsum.photos/seed/kindly-topic-business/600/400'},
  {key:'languages',name:'Languages',count:'38 conversations',desc:"Practise a language you're learning, or simply talk to someone who grew up speaking it.",img:'https://picsum.photos/seed/kindly-topic-languages/600/400'},
  {key:'creativity',name:'Creativity',count:'47 conversations',desc:"Whatever you make — painting, pottery, writing — talk to someone who understands the particular satisfaction of making something.",img:'https://picsum.photos/seed/kindly-topic-creativity/600/400'},
  {key:'film',name:'Film & TV',count:'61 conversations',desc:"Dissect the ending nobody else has seen yet, or revisit a classic with someone who loves it as much as you do.",img:'https://picsum.photos/seed/kindly-topic-film/600/400'},
];

const testimonials = [
  {quote:"I expected a pleasant chat. I didn't expect to find someone who'd lived in the same city as me twenty years ago and had stories I'd never heard.",name:'Patricia O.',meta:'Retired nurse · Bath',img:'https://picsum.photos/seed/kindly-t-patricia/100/100',stars:5},
  {quote:"Working from home, I'd noticed a kind of quietness creeping in. Kindly arranged proper conversation back into my week, without any of the awkwardness I expected.",name:'James T.',meta:'Software engineer · London',img:'https://picsum.photos/seed/kindly-avatar-4/100/100',stars:5},
  {quote:"I spoke to a woman who'd spent thirty years as a diplomat. Three days later, I'm still thinking about what she said about patience.",name:'Adaeze N.',meta:'Marketing director · Manchester',img:'https://picsum.photos/seed/kindly-margaret/100/100',stars:5},
  {quote:"No small talk for the sake of it. The topic kept us both genuinely engaged from start to finish. I requested another the same evening.",name:'Khalid M.',meta:'University lecturer · Edinburgh',img:'https://picsum.photos/seed/kindly-avatar-2/100/100',stars:5},
  {quote:"I'm a fairly private person, and I was nervous. Ten minutes in, it felt like catching up with a friend I hadn't met yet.",name:'Susan W.',meta:'Freelance writer · Bristol',img:'https://picsum.photos/seed/kindly-t-susan/100/100',stars:5},
  {quote:"My daughter signed me up. I was sceptical. An hour later I'd been talking about jazz with a retired musician from Accra. Best hour of my week.",name:'Gerald H.',meta:'Retired teacher · Birmingham',img:'https://picsum.photos/seed/kindly-avatar-1/100/100',stars:5},
];

const faqs = [
  {q:'Who will I be speaking with?',a:"Every Kindly member goes through identity verification. We look for people who are curious, respectful, and genuinely interested in others. You'll see a short profile before any conversation is confirmed."},
  {q:'How long does a conversation last?',a:"Most run between thirty minutes and an hour, though plenty of members end up talking much longer. There's no hard stop — we simply arrange the introduction and the time."},
  {q:'Is Kindly only for older adults?',a:'Not at all. Kindly is for anyone who values unhurried conversation. Our members range from students to retirees, and the mix is part of what makes it worthwhile.'},
  {q:'How is Kindly different from social media?',a:'Social media is built for scrolling and broadcasting. Kindly is built for one conversation at a time. There are no feeds, no followers, and nothing to perform.'},
  {q:'Can I choose what I talk about?',a:'Yes. You tell us the topic and your availability, and we arrange a conversation with another member who has requested the same topic.'},
  {q:'Is Kindly free to join?',a:"Joining the waitlist and creating a profile is free. We're exploring a simple subscription for future releases, with generous terms for early members."},
  {q:"What if the conversation doesn't go well?",a:"It happens occasionally, and that's fine. Let us know and we'll arrange a different conversation. No questions asked."},
];

/* ===================== RENDER: TOPICS ===================== */
const topicsGrid = document.getElementById('topics-grid');
topics.forEach((t,i)=>{
  const card = document.createElement('button');
  card.type = 'button';
  card.className = 'topic-card reveal';
  card.style.transitionDelay = (i*0.04)+'s';
  card.innerHTML = `<div class="topic-icon">${ICONS[t.key]}</div><div class="topic-name">${t.name}</div><div class="topic-count">${t.count}</div>`;
  card.addEventListener('click', ()=>openTopicModal(t));
  topicsGrid.appendChild(card);
});

/* ===================== RENDER: TESTIMONIALS ===================== */
const tTrack = document.getElementById('t-track');
[...testimonials,...testimonials].forEach(t=>{
  const card = document.createElement('div');
  card.className='t-card';
  card.innerHTML = `<div class="t-stars">${'★'.repeat(t.stars)}</div><p class="t-quote">"${t.quote}"</p>
    <div class="t-author"><img class="t-avatar" src="${t.img}" alt="" loading="lazy"><div><div class="t-name">${t.name}</div><div class="t-meta">${t.meta}</div></div></div>`;
  tTrack.appendChild(card);
});

/* ===================== RENDER: FAQ ===================== */
const faqList = document.getElementById('faq-list');
faqs.forEach(f=>{
  const item = document.createElement('div');
  item.className='faq-item';
  item.innerHTML = `<div class="faq-question" role="button" tabindex="0" aria-expanded="false">${f.q}<div class="faq-icon">+</div></div><div class="faq-answer"><p>${f.a}</p></div>`;
  faqList.appendChild(item);
  const q = item.querySelector('.faq-question');
  const ans = item.querySelector('.faq-answer');
  function toggle(){
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(el=>{el.classList.remove('open');el.querySelector('.faq-answer').style.maxHeight=null;el.querySelector('.faq-question').setAttribute('aria-expanded','false');});
    if(!wasOpen){ item.classList.add('open'); ans.style.maxHeight = ans.scrollHeight+'px'; q.setAttribute('aria-expanded','true'); }
  }
  q.addEventListener('click', toggle);
  q.addEventListener('keydown', e=>{ if(e.key==='Enter'||e.key===' '){e.preventDefault();toggle();} });
});

/* ===================== RENDER: INSTAGRAM ===================== */
const instaImgs = [
  'https://picsum.photos/seed/kindly-hero-window/300/300',
  'https://picsum.photos/seed/kindly-tea-laugh/300/300',
  'https://picsum.photos/seed/kindly-step3-talking/300/300',
  'https://picsum.photos/seed/kindly-gallery-cafe/300/300',
  'https://picsum.photos/seed/kindly-gallery-livingroom/300/300',
  'https://picsum.photos/seed/kindly-gallery-garden/300/300',
];
const instaGrid = document.getElementById('insta-grid');
instaImgs.forEach(src=>{
  const t = document.createElement('div');
  t.className='insta-tile';
  t.innerHTML = `<img src="${src}" alt="" loading="lazy"><div class="insta-overlay"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/></svg></div>`;
  instaGrid.appendChild(t);
});

/* ===================== TOPIC MODAL ===================== */
const modalOverlay = document.getElementById('topic-modal-overlay');
const modalImg = document.getElementById('topic-modal-img');
const modalTitle = document.getElementById('topic-modal-title');
const modalDesc = document.getElementById('topic-modal-desc');
function openTopicModal(t){
  modalImg.src = t.img; modalImg.alt = t.name;
  modalTitle.textContent = t.name;
  modalDesc.textContent = t.desc;
  modalOverlay.classList.add('open');
  document.body.style.overflow='hidden';
}
function closeTopicModal(){ modalOverlay.classList.remove('open'); document.body.style.overflow=''; }
document.getElementById('topic-modal-close').addEventListener('click', closeTopicModal);
modalOverlay.addEventListener('click', e=>{ if(e.target===modalOverlay) closeTopicModal(); });
document.addEventListener('keydown', e=>{ if(e.key==='Escape') closeTopicModal(); });
document.getElementById('topic-modal-cta').addEventListener('click', closeTopicModal);

/* ===================== SCROLL PROGRESS + NAV STATE ===================== */
const progress = document.getElementById('progress');
const navbar = document.getElementById('navbar');
const sectionIds = ['home','how-it-works','topics','community','articles','faq','contact','waitlist'];
const navButtons = document.querySelectorAll('[data-target]');

function getOffset(){ return navbar.classList.contains('scrolled') ? 62 : 76; }

function onScroll(){
  const doc = document.documentElement;
  const pct = (window.scrollY / (doc.scrollHeight - window.innerHeight)) * 100;
  progress.style.width = pct + '%';
  navbar.classList.toggle('scrolled', window.scrollY > 40);

  let current = sectionIds[0];
  for(const id of sectionIds){
    const el = document.getElementById(id);
    if(el && el.getBoundingClientRect().top - getOffset() <= 80) current = id;
  }
  document.querySelectorAll('.nav-link').forEach(btn=>{
    btn.classList.toggle('active', btn.dataset.target===current);
  });
}
window.addEventListener('scroll', onScroll, {passive:true});
onScroll();

function scrollToTarget(id){
  const el = document.getElementById(id);
  if(!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - getOffset();
  window.scrollTo({top, behavior:'smooth'});
}
navButtons.forEach(btn=>{
  btn.addEventListener('click', e=>{
    e.preventDefault();
    scrollToTarget(btn.dataset.target);
    closeMobileMenu();
  });
});
document.querySelectorAll('[data-nav]').forEach(el=>{
  el.addEventListener('click', e=>{ e.preventDefault(); scrollToTarget('home'); });
});

/* ===================== MOBILE MENU ===================== */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
function closeMobileMenu(){
  hamburger.classList.remove('active');
  mobileMenu.classList.remove('open');
  hamburger.setAttribute('aria-expanded','false');
  mobileMenu.setAttribute('aria-hidden','true');
  document.body.style.overflow='';
}
hamburger.addEventListener('click', ()=>{
  const open = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('active', open);
  hamburger.setAttribute('aria-expanded', open);
  mobileMenu.setAttribute('aria-hidden', !open);
  document.body.style.overflow = open ? 'hidden':'';
});

/* ===================== SCROLL REVEAL ===================== */
const revealObserver = new IntersectionObserver(entries=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible'); });
}, {threshold:0.1, rootMargin:'0px 0px -30px 0px'});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

/* ===================== ANIMATED COUNTERS ===================== */
function animateCounter(el,target,suffix){
  const duration=1700, start=performance.now();
  function step(now){
    const p = Math.min((now-start)/duration,1);
    const eased = 1-Math.pow(1-p,3);
    el.textContent = Math.round(eased*target).toLocaleString()+(suffix||'');
    if(p<1) requestAnimationFrame(step);
    else el.textContent = target.toLocaleString()+(suffix||'');
  }
  requestAnimationFrame(step);
}
const statObserver = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      const el = e.target, t = parseInt(el.dataset.target);
      animateCounter(el, t, t===96?'%':t>999?'+':'');
      statObserver.unobserve(el);
    }
  });
},{threshold:0.5});
document.querySelectorAll('.stat-num[data-target]').forEach(el=>statObserver.observe(el));

/* ===================== HERO SCROLL ===================== */
const heroScrollBtn = document.getElementById('hero-scroll');
if(heroScrollBtn){
  heroScrollBtn.addEventListener('click', ()=>scrollToTarget('how-it-works'));
  heroScrollBtn.addEventListener('keydown', e=>{ if(e.key==='Enter') scrollToTarget('how-it-works'); });
}

/* ===================== WAITLIST FORM ===================== */
const wlForm = document.getElementById('waitlist-form');
const wlEmail = document.getElementById('wl-email');
const wlEmailCheck = document.getElementById('wl-email-check');
const wlError = document.getElementById('wl-error');
const segs = document.querySelectorAll('[data-step-indicator]');

function updateProgress(){
  const filled = ['first_name','last_name','email','country','age'].filter(n=>{
    const f = wlForm.elements[n];
    return f && f.value.trim().length>0;
  }).length;
  segs.forEach((seg,i)=>{
    seg.classList.toggle('active', filled >= (i+1)*Math.ceil(5/3) - (i===2?1:0));
  });
}
wlForm.addEventListener('input', updateProgress);

wlEmail.addEventListener('input', ()=>{
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(wlEmail.value);
  if(wlEmail.value.length===0){ wlEmailCheck.textContent=''; wlEmailCheck.classList.remove('valid'); }
  else if(valid){ wlEmailCheck.textContent='Looks good'; wlEmailCheck.classList.add('valid'); }
  else{ wlEmailCheck.textContent='Enter a valid email'; wlEmailCheck.classList.remove('valid'); }
});

wlForm.addEventListener('submit', async function(e){
  e.preventDefault();
  if(!this.checkValidity()){ this.reportValidity(); return; }
  const btn = document.getElementById('wl-submit-btn');
  const fd = new FormData(this);
  btn.textContent='Submitting…'; btn.disabled=true;
  wlError.style.display='none';
  try{
    await supabaseInsert('waitlist_signups', {
      first_name: fd.get('first_name'),
      last_name: fd.get('last_name'),
      email: fd.get('email'),
      country: fd.get('country'),
      age_range: fd.get('age'),
      interests: fd.get('interests') || null,
      newsletter_opt_in: fd.get('newsletter') === 'on'
    });
    wlForm.style.display='none';
    document.getElementById('form-success').style.display='block';
  }catch(err){
    console.error(err);
    wlError.textContent = "Something went wrong saving your details — please try again in a moment.";
    wlError.style.display='block';
    btn.textContent='Reserve my spot →'; btn.disabled=false;
  }
});

/* ===================== CONTACT FORM ===================== */
const contactForm = document.getElementById('contact-form');
const contactError = document.getElementById('contact-error');
contactForm.addEventListener('submit', async function(e){
  e.preventDefault();
  if(!this.checkValidity()){ this.reportValidity(); return; }
  const btn = this.querySelector('.btn-contact');
  const fd = new FormData(this);
  const original = btn.textContent;
  btn.textContent='Sending…'; btn.disabled=true;
  contactError.style.display='none';
  try{
    await supabaseInsert('contact_messages', {
      name: fd.get('name'),
      email: fd.get('email'),
      country: fd.get('country') || null,
      reason: fd.get('reason') || null,
      message: fd.get('message')
    });
    btn.textContent='Message sent ✓'; btn.style.background='#3b8a14';
    setTimeout(()=>{ btn.textContent=original; btn.style.background=''; btn.disabled=false; contactForm.reset(); }, 3000);
  }catch(err){
    console.error(err);
    contactError.textContent = "Something went wrong sending your message — please try again.";
    contactError.style.display='block';
    btn.textContent=original; btn.disabled=false;
  }
});

/* ===================== FOOTER NEWSLETTER ===================== */
document.getElementById('footer-newsletter-btn').addEventListener('click', async ()=>{
  const input = document.getElementById('footer-newsletter-input');
  const email = input.value.trim();
  if(!email) return;
  try{
    await supabaseInsert('newsletter_subscribers', { email });
    input.value=''; input.placeholder='Subscribed ✓';
    setTimeout(()=>input.placeholder='your@email.com', 2500);
  }catch(err){
    console.error(err);
    input.placeholder='Something went wrong — try again';
    setTimeout(()=>input.placeholder='your@email.com', 2500);
  }
});
