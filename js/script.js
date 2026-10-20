/* Edit portfolio content here. Biography and education are in index.html. */
const portfolio = {
  facts: ['I enjoy playing badminton.', 'I love exploring computer hardware.', 'I enjoy developing games in Roblox Studio.', 'I like creating interactive applications.', 'My favorite color is purple/violet.'],
  skills: [
    ['<>','HTML','Frontend Development','Semantic structure for accessible web experiences.'],
    ['#','CSS','Frontend Development','Responsive layouts, visual styling, and motion.'],
    ['JS','JavaScript','Frontend Development','Bringing interfaces to life with interaction.'],
    ['Py','Python','Programming','Exploring ideas through clear, practical code.'],
    ['{ }','Java','Programming','Building with object-oriented fundamentals.'],
    ['C#','C#','Programming','Creating functional desktop applications.'],
    ['▤','MySQL','Database','Organizing and querying structured data.'],
    ['◇','Roblox Studio','Game Development','Building interactive worlds to explore.'],
    ['◐','Lua','Game Development','Scripting the logic behind game experiences.'],
  ],
  interests: [
    ['⌨','Coding','Ideas → experiences','I enjoy building applications and transforming ideas into functional experiences.'],
    ['✥','Gaming','A world of possibilities','I love exploring games and understanding how interactive worlds are created.'],
    ['♧','Badminton','A different kind of game','One of my favorite ways to stay active, compete, and have fun.'],
    ['⌘','Technology','Curiosity, always on','I’m always curious about new technologies, computers, and how things work.'],
    ['◈','Design','Where form meets function','I enjoy creating interfaces that are both visually appealing and easy to use.']
  ],
  projects: [
    {name:'Ledgix',category:'Desktop Application',image:'assets/projects/ledgix/homepage.png',imageWidth:1426,imageHeight:943,description:'An offline Windows accounting application for journal entries, inventory calculations, financial reports, and local backups.',technologies:['Electron','React','Node.js','SQLite'],detail:'An offline desktop accounting application that brings journal entries, trial balances, and financial statements into one workflow.',features:['Journal entry management','Trial balance preparation','Financial statements','Automated calculations']},
    {name:'Sea Urchin Hunting',category:'Game Development',image:'assets/projects/sea-urchin-hunting/roblox-game-page.png',imageWidth:1072,imageHeight:743,description:'An underwater Roblox adventure where players explore mysterious environments and collect rare sea urchins.',technologies:['Roblox Studio','Luau'],detail:'An underwater exploration game where players discover different ocean environments, collect sea urchins of varying rarities, and unlock equipment.',features:['Underwater environment exploration','Collectible sea urchins of different rarities','Unlockable equipment']},
    {name:'BURP!',category:'Desktop Application',image:'assets/projects/burp/pos-dashboard.png',imageWidth:1373,imageHeight:1008,description:'A canteen point-of-sale system for managing products, customer orders, and transactions.',technologies:['C# Windows Forms','Microsoft Access'],detail:'A canteen point-of-sale application that supports the journey from product management and customer orders to checkout and transaction records.',features:['Product management','Customer orders','Checkout workflow','Transaction records']}
  ]
};
const $ = (selector, context = document) => context.querySelector(selector);
const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];
const motionQuery = matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
const safeText = value => String(value).replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));

// Theme remains usable when localStorage is unavailable (for example, private file browsing).
function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const light = theme === 'light';
  $('#theme-toggle').textContent = light ? '☾' : '☼';
  $('#theme-toggle').setAttribute('aria-label', `Switch to ${light ? 'dark' : 'light'} theme`);
  $('meta[name="theme-color"]').content = light ? '#f6f2ff' : '#090514';
}
try { setTheme(localStorage.getItem('violet-theme') === 'light' ? 'light' : 'dark'); } catch { setTheme('dark'); }
$('#theme-toggle').addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  setTheme(theme); try { localStorage.setItem('violet-theme', theme); } catch { /* Preference is session-only. */ }
});
$('#year').textContent = new Date().getFullYear();
function closeMenu() { $('#nav-links').classList.remove('open'); $('#menu-toggle').setAttribute('aria-expanded','false'); $('#menu-toggle').setAttribute('aria-label','Open navigation'); }
$('#menu-toggle').addEventListener('click', () => {
  const open = $('#nav-links').classList.toggle('open');
  $('#menu-toggle').setAttribute('aria-expanded', String(open));
  $('#menu-toggle').setAttribute('aria-label', `${open ? 'Close' : 'Open'} navigation`);
});
$$('#nav-links a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if(event.key === 'Escape' && $('#nav-links').classList.contains('open')) { closeMenu(); $('#menu-toggle').focus(); } });
document.addEventListener('click', event => { if (!event.target.closest('nav')) closeMenu(); });

// Data-driven content uses only locally supplied information.
$('#skills-grid').innerHTML = portfolio.skills.map(([icon,name,category,description],index) => `<article class="skill-card reveal" ><div class="skill-head"><span class="skill-icon" aria-hidden="true">${safeText(icon)}</span><div><h3>${name}</h3><small>${category}</small></div></div><p>${description}</p></article>`).join('');
$('#interests-grid').innerHTML = portfolio.interests.map(([icon,name,teaser,detail],index) => `<button class="interest-card reveal" aria-expanded="false" aria-controls="interest-${index}"><span class="interest-icon" aria-hidden="true">${icon}</span><span class="expand-mark" aria-hidden="true">+</span><span class="interest-title">${name}</span><span class="interest-teaser">${teaser}</span><span class="interest-detail" id="interest-${index}" hidden>${detail}</span></button>`).join('');
$$('.interest-card').forEach(button => button.addEventListener('click', () => {
  const expanded = button.getAttribute('aria-expanded') !== 'true';
  button.setAttribute('aria-expanded', String(expanded));
  $('.interest-detail',button).hidden = !expanded;
  $('.expand-mark',button).textContent = expanded ? '−' : '+';
}));
function badges(items) { return `<div class="badges">${items.map(item => `<span>${item}</span>`).join('')}</div>`; }
$('#projects-grid').innerHTML = portfolio.projects.map((project,index) => `<article class="project-card reveal"><div class="project-image"><img src="${project.image}" width="${project.imageWidth}" height="${project.imageHeight}" loading="lazy" alt="${project.name === 'Ledgix' ? 'Ledgix accounting application homepage screenshot' : project.name === 'BURP!' ? 'BURP! canteen point-of-sale dashboard screenshot' : 'Sea Urchin Hunting Roblox experience page screenshot'}"></div><div class="project-body"><span class="project-category">${project.category.toUpperCase()}</span><h3>${project.name}</h3><p>${project.description}</p>${badges(project.technologies)}<button class="text-button project-button" data-project="${index}" aria-label="View details for ${project.name}">${['Ledgix','BURP!','Sea Urchin Hunting'].includes(project.name) ? 'View Project' : 'View Details'} <span>↗</span></button></div></article>`).join('');
let factIndex = -1;
$('#fact-button').addEventListener('click', () => {
  factIndex = (factIndex + 1) % portfolio.facts.length;
  $('#fun-fact').textContent = portfolio.facts[factIndex];
  if (!motionQuery.matches) $('#fun-fact').animate([{opacity:0,transform:'translateY(4px)'},{opacity:1,transform:'translateY(0)'}],{duration:250});
});

// Native dialogs provide focus trapping and Escape support. Restore the opener explicitly.
const dialogOpeners = new WeakMap();
function openDialog(dialog, opener) { dialogOpeners.set(dialog,opener); dialog.showModal(); document.body.classList.add('modal-open'); $('.dialog-close',dialog).focus({preventScroll:true}); }
$$('dialog').forEach(dialog => {
  $('.dialog-close', dialog).addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if(event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if(event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => { document.body.classList.toggle('modal-open',Boolean($('dialog[open]'))); dialogOpeners.get(dialog)?.focus({preventScroll:true}); });
});
$$('[data-project]').forEach(button => button.addEventListener('click', () => {
  const project = portfolio.projects[Number(button.dataset.project)];
  if(['Ledgix','BURP!','Sea Urchin Hunting'].includes(project.name)) { openLedgixShowcase(button,project.name); return; }
  $('#project-detail').innerHTML = `<img src="${project.image}" alt="${project.name} labeled concept placeholder" width="600" height="390"><div class="detail-copy"><p class="eyebrow">${project.category}</p><h2 id="project-title">${project.name}</h2><p>${project.detail}</p>${badges(project.technologies)}<h3>Key features</h3><ul>${project.features.map(feature => `<li>${feature}</li>`).join('')}</ul><p class="interaction-hint">Concept illustration · Actual project screenshot coming soon.</p></div>`;
  openDialog($('#project-dialog'), button);
}));

let toastTimer;
function notify(message) { clearTimeout(toastTimer); $('#toast').textContent = message; $('#toast').classList.add('visible'); toastTimer = setTimeout(() => $('#toast').classList.remove('visible'),5000); }
function burst(x,y) {
  if(motionQuery.matches || document.hidden) return;
  const count = finePointer.matches ? 20 : 10;
  for(let i = 0; i < count; i++) {
    const particle = document.createElement('i');
    const angle = Math.PI * 2 * i / count;
    particle.className = 'particle';
    particle.style.cssText = `left:${x}px;top:${y}px;--dx:${Math.cos(angle) * (55 + Math.random() * 65)}px;--dy:${Math.sin(angle) * (55 + Math.random() * 65)}px;background:${['#c084fc','#8b5cf6','#eee0ff'][i % 3]}`;
    document.body.append(particle); particle.addEventListener('animationend', () => particle.remove(), {once:true}); setTimeout(() => particle.remove(),1200);
  }
}

// Cosmic Journey uses one persistent panel and the existing scroll observer.
const journeyChapters = [
  {
    "title": "Where Curiosity Began",
    "stage": "THE SPARK",
    "description": "My curiosity about technology inspired me to explore how computers, applications, and digital experiences work.",
    "visual": "<div class=\"chapter-galaxy\"><svg class=\"galaxy-orbits\" viewBox=\"0 0 220 220\" aria-hidden=\"true\"><g transform=\"rotate(-25 110 100)\"><ellipse class=\"galaxy-ring\" cx=\"110\" cy=\"100\" rx=\"88\" ry=\"36\"/><circle class=\"galaxy-particle\" r=\"2.5\"><animateMotion dur=\"12s\" repeatCount=\"indefinite\" path=\"M198 100 A88 36 0 1 0 22 100 A88 36 0 1 0 198 100\"/></circle></g><ellipse class=\"galaxy-ring galaxy-ring-inner\" cx=\"110\" cy=\"100\" rx=\"78\" ry=\"49\" transform=\"rotate(35 110 100)\"/></svg><span>✦</span><small>A SPARK OF CURIOSITY</small></div>"
  },
  {
    "title": "Learning to Build",
    "stage": "THE LEARNING PHASE",
    "description": "As an Information Technology student, I've been learning programming, databases, networking, and interface design.",
    "visual": "<div class=\"chapter-editor\"><div class=\"editor-dots\">● ● ● <span>ideas.js</span></div><code><span class=\"code-purple\">const</span> curiosity = <span class=\"code-gold\">true</span>;<br><br><span class=\"code-purple\">while</span> (curiosity) {<br>&nbsp; learn();<br>&nbsp; build();<br>&nbsp; explore();<br>}</code><span class=\"editor-cursor\">▌</span></div>"
  },
  {
    "title": "Creating Something Real",
    "stage": "IDEAS INTO PROJECTS",
    "description": "I started applying what I learned through projects like BURP!, Ledgix, and Sea Urchin Hunting, exploring different ways to build useful and interactive experiences.",
    "visual": "<div class=\"chapter-projects\"><span><b>BURP!</b><small>CANTEEN POS</small></span><span><b>Ledgix.</b><small>ACCOUNTING SYSTEM</small></span><span><b>✹</b><small>SEA URCHIN HUNTING</small></span></div>"
  },
  {
    "title": "What's Next?",
    "stage": "THE JOURNEY CONTINUES",
    "description": "I'm continuing to improve my development and design skills while exploring new technologies and opportunities to create.",
    "visual": "<div class=\"chapter-portal\"><i></i><i></i><span>↗</span><small>THE NEXT POSSIBILITY</small></div>"
  }
];
const journeyTabs = $$('.journey-milestone');
let activeChapter = 0, journeyTransition = null, journeyVersion = 0;
async function selectJourneyChapter(index, instant = false) {
  if(index < 0 || index >= journeyChapters.length) return;
  const version = ++journeyVersion;
  activeChapter = index;
  updateJourneyPathProgress();
  const chapter = journeyChapters[index];
  journeyTabs.forEach((tab,i) => { tab.setAttribute('aria-selected',String(i === index)); tab.tabIndex = i === index ? 0 : -1; });
  $('#journey-panel').setAttribute('aria-labelledby','chapter-tab-' + index);
  $('#journey-counter').textContent = String(index + 1).padStart(2,'0') + ' / 04';
  $('#journey-progress').setAttribute('aria-valuenow',index + 1);
  $('#journey-progress span').style.width = (index + 1) * 25 + '%';
  $('#journey-prev').disabled = index === 0;
  $('#journey-next').disabled = index === journeyChapters.length - 1;
  journeyTransition?.cancel();
  const content = $('#journey-content');
  const animate = !instant && !motionQuery.matches && !document.hidden && typeof content.animate === 'function';
  if(animate) {
    journeyTransition = content.animate([{opacity:1,transform:'translateY(0)'},{opacity:0,transform:'translateY(-6px)'}],{duration:180,easing:'ease-in',fill:'forwards'});
    try { await journeyTransition.finished; } catch { /* A newer selection cancels this transition. */ }
    if(version !== journeyVersion) return;
  }
  journeyTransition?.cancel();
  content.innerHTML = '<div class="journey-copy"><p class="eyebrow">CHAPTER ' + String(index + 1).padStart(2,'0') + ' / ' + chapter.stage + '</p><h3>' + safeText(chapter.title) + '</h3><p>' + safeText(chapter.description) + '</p></div><div class="chapter-visual" aria-hidden="true">' + chapter.visual + '</div>';
  $('#journey-status').textContent = 'Chapter ' + (index + 1) + ' of 4: ' + chapter.title;
  if(animate) journeyTransition = content.animate([{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}],{duration:320,easing:'ease-out'});
}
// Measure the actual node centers so the existing curved SVG stays attached at every width.
let journeyPathParts = [], journeyPathLengths = [];
function syncJourneyPath() {
  const timeline = $('.journey-timeline');
  const svg = $('.journey-path');
  const width = timeline.clientWidth;
  if(!width) return;
  const points = journeyTabs.map(tab => {
    const node = $('.journey-node',tab);
    return {x:tab.offsetLeft + node.offsetLeft + node.offsetWidth / 2, y:tab.offsetTop + node.offsetTop + node.offsetHeight / 2};
  });
  svg.setAttribute('viewBox','0 0 ' + width + ' 130');
  journeyPathParts = points.slice(1).map((point,index) => {
    const previous = points[index], mid = (previous.x + point.x) / 2;
    return 'C' + mid + ' ' + previous.y + ' ' + mid + ' ' + point.y + ' ' + point.x + ' ' + point.y;
  });
  const move = 'M' + points[0].x + ' ' + points[0].y;
  const path = move + ' ' + journeyPathParts.join(' ');
  $('.route-base').setAttribute('d',path);
  $('.route-light').setAttribute('d',path);
  const measure = $('.route-base').cloneNode(false);
  journeyPathLengths = journeyPathParts.map((segment,index) => {
    measure.setAttribute('d','M' + points[index].x + ' ' + points[index].y + ' ' + segment);
    return measure.getTotalLength();
  });
  journeyPathParts = journeyPathParts.map((part,index) => (index === 0 ? move + ' ' : '') + part);
  updateJourneyPathProgress();
}
function updateJourneyPathProgress() {
  if(!journeyPathLengths.length) return;
  const fullLength = journeyPathLengths.reduce((sum,length) => sum + length,0);
  const illuminated = journeyPathLengths.slice(0,activeChapter).reduce((sum,length) => sum + length,0);
  $('.route-light').style.setProperty('--route-offset',String(1 - illuminated / fullLength));
  const traveler = $('.route-traveler');
  traveler.style.visibility = activeChapter === 0 ? 'hidden' : 'visible';
  const motion = $('animateMotion',traveler);
  if(activeChapter > 0) motion.setAttribute('path',journeyPathParts.slice(0,activeChapter).join(' '));
}
if('ResizeObserver' in window) new ResizeObserver(syncJourneyPath).observe($('.journey-timeline'));
else addEventListener('resize',syncJourneyPath);
syncJourneyPath();
if(document.fonts) document.fonts.ready.then(syncJourneyPath);

journeyTabs.forEach((tab,index) => {
  tab.addEventListener('click',() => selectJourneyChapter(index));
  tab.addEventListener('keydown',event => {
    let next;
    if(event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % 4;
    if(event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index + 3) % 4;
    if(event.key === 'Home') next = 0;
    if(event.key === 'End') next = 3;
    if(next === undefined) return;
    event.preventDefault();
    journeyTabs.forEach((item,i) => { item.tabIndex = i === next ? 0 : -1; });
    journeyTabs[next].focus();
  });
});
$('#journey-prev').addEventListener('click',() => selectJourneyChapter(activeChapter - 1));
$('#journey-next').addEventListener('click',() => selectJourneyChapter(activeChapter + 1));
motionQuery.addEventListener('change',() => { if(motionQuery.matches) selectJourneyChapter(activeChapter,true); });
document.addEventListener('visibilitychange',() => { if(document.hidden) selectJourneyChapter(activeChapter,true); });

// One reusable observer reveals content once; HTML stays visible without JavaScript.
let recoverScrollReveals = () => {};
function initializeScrollReveals() {
  if(!('IntersectionObserver' in window) || motionQuery.matches) return;
  const groups = [
    '.section-heading > *',
    '.about-copy > h3, .about-copy > p, .personal-details > div, .fun-fact',
    '.about-visual img, .about-visual > div > *',
    '.skills-grid > *, .interests-grid > *, .projects-grid > *',
    '.journey-hint, .journey-route, .journey-panel',
    '.connect-link',
    'footer > .wrap > *'
  ];
  const targets = [...new Set(groups.flatMap(selector => $$(selector)))];
  let observer;
  const pending = new Set();
  const reveal = element => {
    element.classList.add('is-revealed');
    pending.delete(element);
    observer.unobserve(element);
  };
  try {
    observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        // A visible slice is enough, including for panels taller than the viewport.
        if(entry.isIntersecting && entry.intersectionRect.height > 0) reveal(entry.target);
      });
    }, {threshold:0,rootMargin:'0px 0px -32px 0px'});
    targets.forEach(element => {
      element.classList.add('scroll-reveal');
      const siblings = [...element.parentElement.children];
      const index = siblings.indexOf(element);
      element.style.setProperty('--reveal-delay', Math.min(index,4) * 100 + 'ms');
    });
    // Only content actually on the initial screen bypasses its entrance animation.
    const viewportHeight = document.documentElement.clientHeight || innerHeight;
    const headerBottom = $('#header').getBoundingClientRect().bottom;
    targets.forEach(element => {
      const rect = element.getBoundingClientRect();
      const visibleHeight = Math.min(rect.bottom,viewportHeight) - Math.max(rect.top,headerBottom);
      if(rect.height > 0 && visibleHeight >= Math.min(rect.height * .15,viewportHeight * .15)) {
        element.classList.add('is-revealed');
      } else {
        pending.add(element);
      }
    });
    // Establish the hidden baseline before the observer can activate any entrance.
    // A committed style is needed even when initialization and the first IO delivery
    // happen within the same rendering cycle (for example, a cached local page).
    document.body.classList.add('scroll-motion');
    if(pending.size) getComputedStyle(pending.values().next().value).opacity;
    pending.forEach(element => observer.observe(element));
    // Reuse the existing throttled scroll/resize handler as a fail-open recovery.
    // This also catches restored scroll positions and elements skipped by a fast jump.
    recoverScrollReveals = () => {
      const bottom = (document.documentElement.clientHeight || innerHeight) - 32;
      pending.forEach(element => {
        const rect = element.getBoundingClientRect();
        if(rect.height > 0 && rect.top < bottom) reveal(element);
      });
    };
  } catch {
    observer?.disconnect();
    document.body.classList.remove('scroll-motion');
    recoverScrollReveals = () => {};
    return;
  }
  document.addEventListener('focusin',event => {
    const element = event.target.closest('.scroll-reveal');
    if(element) reveal(element);
  });
  motionQuery.addEventListener('change',() => {
    if(!motionQuery.matches) return;
    document.body.classList.remove('scroll-motion');
    targets.forEach(element => element.classList.add('is-revealed'));
    observer.disconnect();
    pending.clear();
    recoverScrollReveals = () => {};
  });
}
initializeScrollReveals();
const sections = $$('main > section');
let scrollScheduled = false;
function updateScroll() {
  recoverScrollReveals();
  const max = document.documentElement.scrollHeight - innerHeight;
  $('#scroll-progress').style.width = `${max > 0 ? scrollY / max * 100 : 0}%`;
  $('#header').classList.toggle('scrolled',scrollY > 20);
  // Keep the floating control clear of project previews and actions on mobile.
  const projectsRect = $('#projects').getBoundingClientRect();
  const mobileProjectsVisible = innerWidth <= 768 && projectsRect.top < innerHeight && projectsRect.bottom > 0;
  $('#back-top').classList.toggle('visible',scrollY > 500 && !mobileProjectsVisible);
  const current = [...sections].reverse().find(section => section.getBoundingClientRect().top <= innerHeight * .4) || sections[0];
  $$('#nav-links a').forEach(link => { const active = link.hash === `#${current.id}`; link.classList.toggle('active',active); if(active) link.setAttribute('aria-current','location'); else link.removeAttribute('aria-current'); });
  scrollScheduled = false;
}
addEventListener('scroll', () => { if(!scrollScheduled) { scrollScheduled = true; requestAnimationFrame(updateScroll); } },{passive:true});
addEventListener('resize',updateScroll);
addEventListener('pageshow',() => requestAnimationFrame(updateScroll));
updateScroll();
const roles = ['IT Student','Developer','Creative Thinker','Game Creator']; let roleIndex = 0;
setInterval(() => { if(document.hidden || motionQuery.matches) return; roleIndex = (roleIndex + 1) % roles.length; $('#role').textContent = roles[roleIndex]; $('#role').animate([{opacity:0,transform:'translateY(5px)'},{opacity:1,transform:'translateY(0)'}],{duration:350}); },2800);
for(let i = 0; i < (finePointer.matches ? 24 : 12); i++) { const star = document.createElement('i'); star.style.cssText = `left:${(i * 37 + 11) % 100}%;top:${(i * 23 + 7) % 100}%;animation-delay:-${i % 6}s`; $('.stars').append(star); }
let pointerScheduled = false;
document.addEventListener('pointermove',event => {
  if(motionQuery.matches || !finePointer.matches || pointerScheduled) return;
  pointerScheduled = true;
  requestAnimationFrame(() => { $('.cursor-glow').style.transform = `translate(${event.clientX - 175}px,${event.clientY - 175}px)`; pointerScheduled = false; });
},{passive:true});
motionQuery.addEventListener('change', () => { if(motionQuery.matches) { document.body.classList.remove('js-motion'); $$('.particle').forEach(particle => particle.remove()); } });


// The header owns both rows. Keep anchor offsets correct when the mobile menu changes its height.
function syncHeaderHeight() {
  document.documentElement.style.setProperty('--header-height', Math.ceil($('#header').getBoundingClientRect().height) + 'px');
}
if('ResizeObserver' in window) new ResizeObserver(syncHeaderHeight).observe($('#header'));
addEventListener('resize',syncHeaderHeight); syncHeaderHeight();

// One bounded requestAnimationFrame per pointer surface; no mouse effects on touch devices.
function addDepth(surface, update, reset) {
  let frame = 0;
  surface.addEventListener('pointermove',event => {
    if(document.hidden || motionQuery.matches || !finePointer.matches || frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      if(document.hidden || motionQuery.matches || !finePointer.matches) return;
      const bounds = surface.getBoundingClientRect();
      update((event.clientX - bounds.left) / bounds.width - .5, (event.clientY - bounds.top) / bounds.height - .5);
    });
  },{passive:true});
  const clear = () => { cancelAnimationFrame(frame); frame = 0; reset(); };
  surface.addEventListener('pointerleave',clear);
  motionQuery.addEventListener('change',clear);
  document.addEventListener('visibilitychange',clear);
}
addDepth($('#home'),(x,y) => {
  $('.hero-atmosphere').style.transform = 'translate(' + x * 12 + 'px,' + y * 10 + 'px)';
},() => { $('.hero-atmosphere').style.transform = ''; });
function syncVisibility() {
  document.body.classList.toggle('page-hidden',document.hidden);
  if(document.hidden) { $$('.particle').forEach(particle => particle.remove()); }
  else requestAnimationFrame(recoverScrollReveals);
}
document.addEventListener('visibilitychange',syncVisibility); syncVisibility();
