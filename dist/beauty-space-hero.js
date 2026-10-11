const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function revealWords(element, startDelay, step) {
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
  const textNodes = [];
  let currentNode;

  while ((currentNode = walker.nextNode())) {
    if (currentNode.nodeValue.trim()) textNodes.push(currentNode);
  }

  let wordIndex = 0;

  textNodes.forEach((textNode) => {
    const fragment = document.createDocumentFragment();
    const parts = textNode.nodeValue.split(/(\s+)/);

    parts.forEach((part) => {
      if (!part) return;

      if (/^\s+$/.test(part)) {
        fragment.append(document.createTextNode(part));
        return;
      }

      const word = document.createElement('span');
      word.className = 'word-reveal';
      word.style.setProperty('--word-delay', `${startDelay + wordIndex * step}ms`);
      word.textContent = part;
      fragment.append(word);
      wordIndex += 1;
    });

    textNode.replaceWith(fragment);
  });
}

function revealObject(element, delay) {
  element.classList.add('object-reveal');
  element.style.setProperty('--object-delay', `${delay}ms`);
}

if (!prefersReducedMotion) {
  [
    ['.offer', 260, 28],
    ['#hero-title', 500, 62],
    ['.author-copy', 1080, 16],
  ].forEach(([selector, delay, step]) => {
    const element = document.querySelector(selector);
    if (element) revealWords(element, delay, step);
  });

  const objectSequence = [
    ['.location', 100],
    ['.brand', 180],
    ['.nav a:nth-child(1)', 260],
    ['.nav a:nth-child(2)', 330],
    ['.nav a:nth-child(3)', 400],
    ['.cta', 1280],
    ['.author', 960],
  ];

  objectSequence.forEach(([selector, delay]) => {
    const element = document.querySelector(selector);
    if (element) revealObject(element, delay);
  });
}

const dialog = document.querySelector('#dialog');
const title = document.querySelector('#modal-title');
const description = document.querySelector('#modal-description');
const closeButton = dialog.querySelector('.close');

document.querySelectorAll('[data-modal]').forEach((element) => {
  element.addEventListener('click', (event) => {
    event.preventDefault();
    const action = element.dataset.modal;
    title.textContent = action;
    description.textContent = action === 'Записаться'
      ? 'Для полноценной записи можно подключить онлайн-форму или сервис бронирования.'
      : `Раздел «${action}» можно подключить к соответствующему блоку сайта.`;
    dialog.classList.add('open');
    dialog.setAttribute('aria-hidden', 'false');
    closeButton.focus();
  });
});

function closeDialog() {
  dialog.classList.remove('open');
  dialog.setAttribute('aria-hidden', 'true');
}

closeButton.addEventListener('click', closeDialog);
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) closeDialog();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeDialog();
});
