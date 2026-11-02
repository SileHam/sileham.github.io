'use strict';

// Progressive enhancement: the profile, projects and disclosures work without JS.
const navigation = document.querySelector('.site-nav');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

function closeMenu() {
  navigation.classList.remove('menu-open');
  menuToggle.setAttribute('aria-expanded', 'false');
}

menuToggle.hidden = false;
menuToggle.addEventListener('click', () => {
  const open = navigation.classList.toggle('menu-open');
  menuToggle.setAttribute('aria-expanded', String(open));
});
navLinks.addEventListener('click', event => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation.classList.contains('menu-open')) {
    closeMenu();
    menuToggle.focus();
  }
});
const desktopQuery = window.matchMedia('(min-width: 801px)');
desktopQuery.addEventListener('change', closeMenu);

// Native dialog supplies Escape dismissal and focus restoration.
const projectDialog = document.getElementById('projectModal');
document.querySelectorAll('[data-project]').forEach(button => {
  button.hidden = false;
  button.addEventListener('click', () => {
    const card = button.closest('.project-card');
    document.getElementById('modalTitle').textContent = card.querySelector('h3').textContent;
    document.getElementById('modalDesc').textContent = button.dataset.description;
    const chips = [...card.querySelectorAll('.chip')].map(chip => chip.cloneNode(true));
    document.getElementById('modalChips').replaceChildren(...chips);
    projectDialog.showModal();
  });
});
document.querySelector('.modal-close').addEventListener('click', () => projectDialog.close());
projectDialog.addEventListener('keydown', event => {
  if (event.key !== 'Tab') return;
  const controls = [...projectDialog.querySelectorAll('button, a[href], input, [tabindex="0"]')];
  const first = controls[0];
  const last = controls[controls.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});
projectDialog.addEventListener('click', event => {
  const bounds = projectDialog.getBoundingClientRect();
  if (event.target === projectDialog &&
      (event.clientX < bounds.left || event.clientX > bounds.right ||
       event.clientY < bounds.top || event.clientY > bounds.bottom)) projectDialog.close();
});

// Preserve the original console, without HTML injection or literal newline escapes.
const consoleInput = document.getElementById('consoleInput');
const consoleOutput = document.getElementById('consoleOutput');
const greeting = 'Type help to explore commands.';
const commands = {
  help: 'Available commands:\nhelp · cv · research · projects · portfolio · contact · clear',
  cv: 'CV available on request. Email hamzazniber100@hotmail.com.',
  research: 'Current interests: machine learning, NLP, RAG, information retrieval and responsible AI.',
  projects: 'Projects:\n1. OCP industrial maintenance RAG assistant (prototype; private source)\n2. NIGHTTRACE\n3. Library Management System\n4. Cybersecurity Portfolio Website',
  portfolio: 'Learning roadmap (in progress):\nProfessional statement · resume · security audit · network analysis · Linux permissions · SQL filtering · vulnerability review · incident journal · text parsing',
  contact: 'Email: hamzazniber100@hotmail.com\nGitHub: https://github.com/SileHam\nLinkedIn: https://www.linkedin.com/in/hamza-zniber/'
};
consoleInput.addEventListener('keydown', event => {
  if (event.key !== 'Enter') return;
  event.preventDefault();
  const command = consoleInput.value.trim().toLowerCase();
  consoleInput.value = '';
  if (!command) return;
  if (command === 'clear') {
    consoleOutput.textContent = greeting;
    return;
  }
  const result = Object.hasOwn(commands, command) ? commands[command] : 'Command not found. Type help.';
  consoleOutput.textContent += `\n\n> ${command}\n${result}`;
  // Keep this optional console bounded during long sessions.
  if (consoleOutput.textContent.length > 12000) {
    consoleOutput.textContent = consoleOutput.textContent.slice(-10000);
  }
  consoleOutput.scrollTop = consoleOutput.scrollHeight;
  if (['research', 'projects', 'portfolio', 'contact'].includes(command)) {
    const target = document.getElementById(command);
    const disclosure = target.querySelector('details');
    if (disclosure) disclosure.open = true;
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
    target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }
});

// Update only the small navigation state; never hide content on scroll.
if ('IntersectionObserver' in window) {
  const sections = document.querySelectorAll('main > section[id]');
  const observer = new IntersectionObserver(entries => {
    const visible = entries.filter(entry => entry.isIntersecting);
    if (!visible.length) return;
    const id = visible[0].target.id;
    navLinks.querySelectorAll('a').forEach(link => {
      if (link.hash === `#${id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }, { rootMargin: '-15% 0px -55% 0px', threshold: 0 });
  sections.forEach(section => observer.observe(section));
}
