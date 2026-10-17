/* Shared project gallery. Existing Ledgix DOM IDs and controls serve both showcases. */
const ledgixDefaultScreenshots = [
  {file:'general-journal.png',title:'General Journal',category:'Journal Entries',description:'Record and manage accounting transactions through an organized general journal with debit and credit validation.'},
  {file:'merchandise-credit.png',title:'Merchandise & Credit',category:'Journal Entries',description:'Manage merchandise-related transactions using dedicated forms for sales, inventory costs, discounts, and credit.'},
  {file:'unadjusted-trial-balance.png',title:'Unadjusted Trial Balance',category:'Accounting Reports',description:'Review account balances and verify whether total debits and credits are equal before adjustments.'},
  {file:'saved-journals.png',title:'Saved Journals',category:'Data Management',description:'Access saved journals and manage local accounting records using backup, restore, and import options.'},
  {file:'adjusting-entries.png',title:'Adjusting Journal Entries',category:'Journal Entries',description:'Record period-end adjusting entries to update account balances before preparing financial statements.'},
  {file:'financial-statements.png',title:'Financial Statements',category:'Accounting Reports',description:'Generate organized financial statements based on recorded accounting information.'},
  {file:'workspace-setup.png',title:'Journal Workspace Setup',category:'Overview',description:'Create an accounting workspace by entering company information, reporting dates, and an inventory method.'},
  {file:'homepage.png',title:'Ledgix Homepage',category:'Overview',description:'A clean homepage providing access to new journal workspaces and previously saved accounting records.'}
];
const ledgixDefaultFilters = {'All Screenshots':[0,1,2,3,4,5,6,7],'Overview':[7,6],'Journal Entries':[0,1,4],'Accounting Reports':[2,5],'Data Management':[3]};
const projectShowcases = {
  'Sea Urchin Hunting': {
    name:'Sea Urchin Hunting',key:'sea-urchin-hunting',type:'Roblox Underwater Exploration Game',tagline:'Dive deeper. Discover rarer.',
    description:'Sea Urchin Hunting is a Roblox underwater exploration and collection game where players discover sea urchins of different rarities, explore mysterious ocean environments, upgrade their equipment, and manage oxygen while diving.',
    directory:'assets/projects/sea-urchin-hunting/',
    screenshots:[
      {file:'roblox-game-page.png',title:'Discover Sea Urchin Hunting',category:'Roblox Experience',description:"The official Roblox experience page introduces players to the game's underwater adventure, collection mechanics, and rarity system."},
      {file:'loading-screen.png',title:'Dive Into the Unknown',category:'Loading Experience',description:'An underwater-themed loading screen welcomes players with animated ocean-inspired visuals and a sea urchin centerpiece.'},
      {file:'gameplay.png',title:'Explore the Ocean',category:'In-Game Exploration',description:"An in-game view showing the player's character, inventory tools, equipment hotbar, interface controls, and underwater adventure environment."}
    ],
    filters:{'All Screenshots':[0,1,2]},technologies:['Roblox Studio','Luau'],
    features:['Underwater Exploration','Sea Urchin Collection','Seven Rarity Tiers','Oxygen Management','Equipment and Nets','Cave Exploration'],
    featureChips:true,rarities:['Common','Uncommon','Rare','Epic','Legendary','Mythical','Secret'],
    // Add only the verified official Roblox experience URL here.
    playUrl:'https://www.roblox.com/games/113408492560861/Sea-Urchin-Hunting'
  },
  Ledgix: {
    name:'Ledgix', key:'ledgix', type:'Accounting Management System', tagline:'Every Entry Counts. Every Balance Matters.',
    description:'Ledgix is an accounting management application designed to simplify journal recording, account balance verification, and financial reporting through an organized, user-friendly interface.',
    directory:'assets/projects/ledgix/',screenshots:ledgixDefaultScreenshots,filters:ledgixDefaultFilters,
    sourceUrl:'https://github.com/Mongz999/ledgix',
    technologies:['HTML','CSS','JavaScript'],
    features:['Journal entry management','Compound accounting entries','Merchandise and credit transactions','Trial balance verification','Adjusting journal entries','Financial statement generation','Saved journal workspaces','Local data backup and restore']
  },
  'BURP!': {
    name:'BURP!', key:'burp',type:'Canteen Point-of-Sale System',tagline:'Good Food, Good Mood!',
    description:'BURP! is a desktop-based canteen point-of-sale system designed to simplify food ordering, cart management, checkout calculations, and transaction recording through an organized interface.',
    directory:'assets/projects/burp/',
    sourceUrl:'https://github.com/Mongz999/BURPSystem',
    screenshots:[
      {file:'pos-dashboard.png',title:'POS Dashboard',category:'Point of Sale',description:'Manage canteen products, search menu items, filter categories, add orders to the cart, calculate totals, and process customer transactions.'},
      {file:'login-screen.png',title:'Login Screen',category:'User Access',description:'Access the canteen management system through a dedicated username and password login interface.'}
    ],
    filters:{'All Screenshots':[0,1]},technologies:['C# Windows Forms','Microsoft Access'],
    features:['User login','Product search','Food category filtering','Product selection and quantity','Shopping cart management','VAT and total calculations','Cash payment and change calculation','Receipt printing','Transaction history access','Profile controls']
  }
};
let activeShowcase = projectShowcases.Ledgix;
let ledgixScreenshots = activeShowcase.screenshots, ledgixFilters = activeShowcase.filters;
let ledgixFilter = 'All Screenshots', ledgixIndex = 0, ledgixReady = false, ledgixAnimation;
const ledgixAsset = screen => activeShowcase.directory + screen.file;
function setLedgixZoom(zoomed, restoreFocus = false) {
  const media = $('#ledgix-media');
  media.classList.toggle('is-zoomed',zoomed);
  $('#ledgix-dialog').classList.toggle('is-zoomed',zoomed);
  $('#ledgix-zoom').setAttribute('aria-pressed',String(zoomed));
  $('#ledgix-zoom').textContent = zoomed ? 'Fit screenshot ↙' : 'Zoom screenshot ↗';
  media.tabIndex = zoomed ? 0 : -1;
  media.setAttribute('aria-label',zoomed ? 'Full-resolution screenshot; scroll horizontally and vertically to inspect' : 'Application screenshot');
  media.scrollTop = media.scrollLeft = 0;
  if(zoomed) media.focus({preventScroll:true});
  else if(restoreFocus) $('#ledgix-zoom').focus({preventScroll:true});
}
function renderLedgixThumbnails() {
  $('#ledgix-thumbnails').innerHTML = ledgixFilters[ledgixFilter].map(index => {
    const screen = ledgixScreenshots[index];
    return `<button type="button" class="ledgix-thumb" data-ledgix-screen="${index}" aria-label="Show screenshot ${index + 1}: ${safeText(screen.title)}" aria-current="${index === ledgixIndex ? 'true' : 'false'}"><img src="${activeShowcase.directory}thumbnails/${screen.file}" alt="" width="120" height="72" loading="lazy" decoding="async"><span>${String(index + 1).padStart(2,'0')} · ${safeText(screen.title)}</span></button>`;
  }).join('');
  $$('[data-ledgix-screen]').forEach(button => button.addEventListener('click',() => showLedgixScreenshot(Number(button.dataset.ledgixScreen))));
}
function showLedgixScreenshot(index) {
  if(!ledgixFilters[ledgixFilter].includes(index)) return;
  ledgixIndex = index;
  const screen = ledgixScreenshots[index];
  const image = $('#ledgix-image'), media = $('#ledgix-media'), status = $('#ledgix-image-status');
  setLedgixZoom(false);
  ledgixAnimation?.cancel();
  image.hidden = true; status.hidden = false; status.textContent = 'Loading screenshot…';
  media.setAttribute('aria-busy','true'); $('#ledgix-zoom').disabled = true;
  image.onload = () => {
    image.hidden = false; status.hidden = true; media.setAttribute('aria-busy','false'); $('#ledgix-zoom').disabled = false;
    if(!motionQuery.matches && $('#ledgix-dialog').open) ledgixAnimation = image.animate([{opacity:0},{opacity:1}],{duration:280,easing:'ease-out'});
  };
  image.onerror = () => { image.hidden = true; status.hidden = false; status.textContent = 'This screenshot could not load. Choose another image, or check ' + ledgixAsset(screen); media.setAttribute('aria-busy','false'); $('#ledgix-zoom').disabled = true; };
  image.alt = screen.title + ' — actual ' + activeShowcase.name + (activeShowcase.key === 'sea-urchin-hunting' ? ' Roblox experience screenshot' : ' application interface with demonstration data');
  image.loading = 'eager'; image.fetchPriority = 'high';
  image.src = ledgixAsset(screen);
  $('#ledgix-counter').textContent = String(index + 1).padStart(2,'0') + ' / ' + String(ledgixScreenshots.length).padStart(2,'0');
  $('#ledgix-feature-title').textContent = screen.title;
  $('#ledgix-feature-description').textContent = screen.description;
  const position = ledgixFilters[ledgixFilter].indexOf(index) + 1;
  $('#ledgix-category-label').textContent = screen.category + ' · ' + position + ' of ' + ledgixFilters[ledgixFilter].length + ' in this selection';
  $('#ledgix-gallery-status').textContent = 'Screenshot ' + (index + 1) + ' of ' + ledgixScreenshots.length + ': ' + screen.title;
  $$('[data-ledgix-screen]').forEach(button => button.setAttribute('aria-current',String(Number(button.dataset.ledgixScreen) === index)));
  const single = ledgixFilters[ledgixFilter].length === 1;
  $('#ledgix-prev').disabled = single; $('#ledgix-next').disabled = single;
  if(!motionQuery.matches) $('.ledgix-caption').animate([{opacity:.3,transform:'translateY(4px)'},{opacity:1,transform:'translateY(0)'}],{duration:250,easing:'ease-out'});
}
function stepLedgixScreenshot(direction) {
  const selection = ledgixFilters[ledgixFilter];
  const position = selection.indexOf(ledgixIndex);
  showLedgixScreenshot(selection[(position + direction + selection.length) % selection.length]);
}
function filterLedgixScreenshots(filter) {
  if(!Object.hasOwn(ledgixFilters,filter)) return;
  ledgixFilter = filter;
  ledgixIndex = ledgixFilters[filter][0];
  $$('[data-ledgix-filter]').forEach(button => button.setAttribute('aria-pressed',String(button.dataset.ledgixFilter === filter)));
  renderLedgixThumbnails(); showLedgixScreenshot(ledgixIndex);
}
function openLedgixShowcase(opener, projectName = 'Ledgix') {
  if(!Object.hasOwn(projectShowcases,projectName)) return;
  activeShowcase = projectShowcases[projectName];
  ledgixScreenshots = activeShowcase.screenshots;
  ledgixFilters = activeShowcase.filters;
  $('#ledgix-dialog').dataset.project = activeShowcase.key;
  $('#ledgix-title').innerHTML = safeText(activeShowcase.name) + (activeShowcase.key === 'ledgix' ? '<span>.</span>' : '');
  $('.ledgix-heading .eyebrow').textContent = 'PROJECT SHOWCASE / ' + activeShowcase.type.toUpperCase();
  $('.ledgix-tagline').textContent = activeShowcase.tagline;
  $('#ledgix-summary').textContent = activeShowcase.description;
  $('#ledgix-dialog .dialog-close').setAttribute('aria-label','Close ' + activeShowcase.name + ' showcase');
  $('.ledgix-gallery').setAttribute('aria-label',activeShowcase.name + ' screenshot gallery');
  $('#ledgix-prev').setAttribute('aria-label','Previous ' + activeShowcase.name + ' screenshot');
  $('#ledgix-next').setAttribute('aria-label','Next ' + activeShowcase.name + ' screenshot');
  $('#ledgix-thumbnails').setAttribute('aria-label','Choose a ' + activeShowcase.name + ' screenshot');
  const rarityRow = activeShowcase.rarities ? '<div class="showcase-rarities" role="group" aria-label="Sea urchin rarity tiers">' + activeShowcase.rarities.map(rarity => '<span>' + safeText(rarity) + '</span>').join('') + '</div>' : '';
  const playUrl = activeShowcase.playUrl;
  const playLink = typeof playUrl === 'string' && /^https:\/\/www\.roblox\.com\/games\/\d+(?:\/[^\s]*)?$/.test(playUrl) ? '<a class="button primary showcase-play" href="' + safeText(playUrl) + '" target="_blank" rel="noopener noreferrer">Play on Roblox ↗</a>' : '';
  const sourceLink = activeShowcase.sourceUrl ? '<a class="button secondary showcase-source" href="' + safeText(activeShowcase.sourceUrl) + '" target="_blank" rel="noopener noreferrer">' + $('.connect-link svg').outerHTML + 'View Source Code</a>' : '';
  $('.ledgix-info').innerHTML = '<div><h3>Key features</h3><ul' + (activeShowcase.featureChips ? ' class="showcase-feature-chips"' : '') + '>' + activeShowcase.features.map(feature => '<li>' + safeText(feature) + '</li>').join('') + '</ul>' + rarityRow + '</div><div><h3>Built with</h3>' + badges(activeShowcase.technologies) + '<p>' + (activeShowcase.key === 'sea-urchin-hunting' ? 'Explore the Roblox experience through real screenshots.' : 'Explore the real interface through screenshots. ' + safeText(activeShowcase.name) + ' is a separate application.') + '</p>' + playLink + '</div>';
  $('.ledgix-info > div:last-child').insertAdjacentHTML('beforeend',sourceLink);
  $('.ledgix-demo-label').textContent = activeShowcase.key === 'sea-urchin-hunting' ? 'Roblox experience · Static screenshots' : 'Demonstration data · Static application screenshots';
    $('#ledgix-categories').innerHTML = Object.keys(ledgixFilters).map(filter => `<button type="button" data-ledgix-filter="${filter}" aria-pressed="false">${filter}</button>`).join('');
    $$('[data-ledgix-filter]').forEach(button => button.addEventListener('click',() => filterLedgixScreenshots(button.dataset.ledgixFilter)));

  if(!ledgixReady) {
    $('#ledgix-prev').addEventListener('click',() => stepLedgixScreenshot(-1));
    $('#ledgix-next').addEventListener('click',() => stepLedgixScreenshot(1));
    $('#ledgix-zoom').addEventListener('click',() => setLedgixZoom(!$('#ledgix-media').classList.contains('is-zoomed'),true));
    $('#ledgix-dialog').addEventListener('keydown',event => {
      // In zoom mode arrows scroll the full-resolution image instead of switching slides.
      if($('#ledgix-media').classList.contains('is-zoomed')) return;
      if(event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      if(event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); stepLedgixScreenshot(event.key === 'ArrowRight' ? 1 : -1); }
    });
    $('#ledgix-dialog').addEventListener('cancel',event => { if($('#ledgix-media').classList.contains('is-zoomed')) { event.preventDefault(); setLedgixZoom(false,true); } });
    $('#ledgix-dialog').addEventListener('close',() => { ledgixAnimation?.cancel(); setLedgixZoom(false); });
    motionQuery.addEventListener('change',() => { if(motionQuery.matches) ledgixAnimation?.cancel(); });
    ledgixReady = true;
  }
  openDialog($('#ledgix-dialog'),opener);
  filterLedgixScreenshots('All Screenshots');
}
