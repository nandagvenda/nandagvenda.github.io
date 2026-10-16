/* ==========================================================
   CONTEÚDO EDITÁVEL
   Troque os dados abaixo pelos seus. O HTML cuida do resto.
   ========================================================== */

const projects = [
  {
    title: "Nome do Projeto Um",
    description: "Uma frase curta explicando o problema que ele resolve e o seu papel.",
    tags: ["HTML", "CSS", "JavaScript"],
    year: "2026",
    url: "https://github.com/nandagvenda",
  },
  {
    title: "Nome do Projeto Dois",
    description: "Descreva o resultado: o que foi entregue, aprendido ou melhorado.",
    tags: ["React", "API"],
    year: "2026",
    url: "https://github.com/nandagvenda",
  },
  {
    title: "Nome do Projeto Três",
    description: "Pode ser um exercício de aula, um projeto pessoal ou um trabalho real.",
    tags: ["Python", "Dados"],
    year: "2025",
    url: "https://github.com/nandagvenda",
  },
];

const skills = [
  { label: "Front-end", items: ["HTML", "CSS", "JavaScript", "Acessibilidade"] },
  { label: "Ferramentas", items: ["Git", "GitHub", "VS Code", "Figma"] },
  { label: "Aprendendo", items: ["React", "TypeScript", "Node.js"] },
];

const timezone = "America/Sao_Paulo";

/* ==========================================================
   Renderização
   ========================================================== */

const pad = (n) => String(n).padStart(2, "0");

function renderProjects() {
  const list = document.getElementById("projectList");
  if (!list) return;

  list.innerHTML = projects
    .map(
      (p, i) => `
    <li class="project reveal">
      <a class="project__link" href="${p.url}" target="_blank" rel="noopener">
        <span class="project__idx">${pad(i + 1)}</span>
        <h3 class="project__title">${p.title}<span class="project__arrow" aria-hidden="true">↗</span></h3>
        <span class="project__year">${p.year}</span>
        <p class="project__desc">${p.description}</p>
        <ul class="project__tags">${p.tags.map((t) => `<li class="tag">${t}</li>`).join("")}</ul>
      </a>
    </li>`
    )
    .join("");
}

function renderSkills() {
  const box = document.getElementById("skillList");
  if (!box) return;

  box.innerHTML = skills
    .map(
      (g) => `
    <div class="skills__group">
      <span class="skills__label">${g.label}</span>
      <ul class="skills__items">${g.items.map((s) => `<li>${s}</li>`).join("")}</ul>
    </div>`
    )
    .join("");
}

/* ==========================================================
   Tema claro/escuro
   ========================================================== */

function setupTheme() {
  const root = document.documentElement;
  const btn = document.getElementById("themeToggle");
  const meta = document.querySelector('meta[name="theme-color"]');

  const apply = (theme) => {
    root.setAttribute("data-theme", theme);
    if (meta) meta.setAttribute("content", theme === "dark" ? "#0c0c0c" : "#f3f1ec");
    try { localStorage.setItem("theme", theme); } catch (e) {}
  };

  apply(root.getAttribute("data-theme") || "light");

  btn?.addEventListener("click", () => {
    apply(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
  });
}

/* ==========================================================
   Relógio local e ano
   ========================================================== */

function setupClock() {
  const clock = document.getElementById("clock");
  const fmt = new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit", minute: "2-digit", timeZone: timezone,
  });
  const tick = () => { if (clock) clock.textContent = fmt.format(new Date()) + " (BRT)"; };
  tick();
  setInterval(tick, 30000);

  const y = new Date().getFullYear();
  ["year", "year2"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.textContent = y;
  });
}

/* ==========================================================
   Animação de entrada e link ativo no menu
   ========================================================== */

function setupReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-in"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  items.forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i % 4, 3) * 70}ms`;
    io.observe(el);
  });
}

function setupActiveNav() {
  const links = [...document.querySelectorAll(".nav a")];
  const map = new Map(links.map((a) => [a.getAttribute("href").slice(1), a]));
  const sections = [...map.keys()].map((id) => document.getElementById(id)).filter(Boolean);
  if (!("IntersectionObserver" in window)) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          links.forEach((l) => l.classList.remove("is-active"));
          map.get(e.target.id)?.classList.add("is-active");
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => io.observe(s));
}

/* ---------- Início ---------- */
renderProjects();
renderSkills();
setupTheme();
setupClock();
setupReveal();
setupActiveNav();