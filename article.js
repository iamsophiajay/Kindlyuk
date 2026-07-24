/* ===================== FORMSPREE + FOOTER NEWSLETTER ===================== */
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mojgdqdq';
async function formspreeSubmit(formName, row){
  const res = await fetch(FORMSPREE_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({ form_name: formName, ...row })
  });
  if(!res.ok){ const data = await res.json().catch(()=> ({})); throw new Error(`Formspree submit failed (${res.status}): ${JSON.stringify(data)}`); }
  return true;
}
const footerNewsletterBtn = document.getElementById('footer-newsletter-btn');
if(footerNewsletterBtn){
  footerNewsletterBtn.addEventListener('click', async ()=>{
    const input = document.getElementById('footer-newsletter-input');
    const email = input.value.trim();
    if(!email) return;
    try{
      await formspreeSubmit('newsletter_subscriber', { email });
      input.value=''; input.placeholder='Subscribed ✓';
      setTimeout(()=>input.placeholder='your@email.com', 2500);
    }catch(err){
      console.error(err);
      input.placeholder='Something went wrong — try again';
      setTimeout(()=>input.placeholder='your@email.com', 2500);
    }
  });
}

/* ===================== NAV SCROLL STATE ===================== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', ()=>{
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, {passive:true});
navbar.classList.toggle('scrolled', window.scrollY > 40);

/* ===================== MOBILE MENU ===================== */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
function closeMobileMenu(){
  hamburger.classList.remove('active');
  mobileMenu.classList.remove('open');
  hamburger.setAttribute('aria-expanded','false');
  mobileMenu.setAttribute('aria-hidden','true');
}
hamburger.addEventListener('click', ()=>{
  const open = !mobileMenu.classList.contains('open');
  mobileMenu.classList.toggle('open', open);
  hamburger.classList.toggle('active', open);
  hamburger.setAttribute('aria-expanded', open);
  mobileMenu.setAttribute('aria-hidden', !open);
});
mobileMenu.querySelectorAll('a,button').forEach(el=>el.addEventListener('click', closeMobileMenu));

/* ===================== REVEAL ON SCROLL ===================== */
const revealObserver = new IntersectionObserver(entries=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); revealObserver.unobserve(e.target); } });
},{threshold:0.15});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

/* ===================== SCROLL PROGRESS BAR ===================== */
const progress = document.getElementById('progress');
if(progress){
  window.addEventListener('scroll', ()=>{
    const h = document.documentElement;
    const pct = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    progress.style.width = pct + '%';
  }, {passive:true});
}
