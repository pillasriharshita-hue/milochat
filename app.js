/**
 * Portfolio Guide — rule-based entity + intent router.
 *
 * Deliberately not generative: the knowledge domain (one résumé) is small
 * and the question space recruiters ask is predictable, so a deterministic
 * router gives zero-hallucination, zero-cost, instant answers. Every string
 * returned here traces back to portfolio-data.js, which traces back to the
 * résumé PDF. Nothing is invented.
 */

// ---------------------------------------------------------------------------
// DOM references
// ---------------------------------------------------------------------------
const launcher = document.getElementById("guide-launcher");
const panel = document.getElementById("guide-panel");
const closeButton = document.getElementById("guide-close");
const log = document.getElementById("guide-log");
const form = document.getElementById("guide-form");
const input = document.getElementById("guide-input");
const actionButtons = document.querySelectorAll(".action-chip");

let opened = false;

// ---------------------------------------------------------------------------
// Text helpers
// ---------------------------------------------------------------------------
function escapeHTML(value) {
  return value.replace(/[&<>"']/g, (character) => {
    const map = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    };
    return map[character];
  });
}

function normalize(text) {
  return text.toLowerCase().trim();
}

// ---------------------------------------------------------------------------
// Entity detection — which company or project is this question about?
// ---------------------------------------------------------------------------
function allEntities() {
  const experienceEntities = portfolioData.experience.map((entry) => ({
    type: "experience",
    ...entry
  }));
  const projectEntities = portfolioData.projects.map((entry) => ({
    type: "project",
    ...entry
  }));
  return experienceEntities.concat(projectEntities);
}

function detectEntity(normalized) {
  const entities = allEntities();
  for (const entity of entities) {
    for (const keyword of entity.keywords) {
      if (normalized.includes(keyword)) return entity;
    }
  }
  return null;
}

// ---------------------------------------------------------------------------
// Intent detection — checked in priority order so specific/sensitive intents
// never lose to a loosely-matching generic one.
// ---------------------------------------------------------------------------
const INTENT_RULES = [
  {
    // Every phrase here is deliberately specific, not a bare word — "available"
    // or "age" as substrings would also match "tools available", "average", etc.
    name: "refuse",
    words: [
      "is she available",
      "is harshita available",
      "her availability",
      "open to work",
      "open to opportunities",
      "when can she start",
      "salary",
      "compensation",
      "pay range",
      "pay expectation",
      "expected salary",
      "current salary",
      "how much does she charge",
      "visa sponsorship",
      "need a visa",
      "require sponsorship",
      "notice period",
      "would she relocate",
      "is she married",
      "how old is she",
      "her age",
      "personal life",
      "phone number",
      "confidential"
    ]
  },
  {
    name: "contact",
    words: ["contact", "email", "linkedin", "resume", "résumé", "reach her", "connect", "hire her"]
  },
  {
    name: "education",
    words: ["education", "degree", "masters", "master's", "ms in", "coursework", "hci program", "grad school", "study", "studied"]
  },
  {
    name: "accessibility",
    words: ["accessibility", "wcag", "a11y", "voiceover", "screen reader"]
  },
  {
    name: "ai-trust",
    words: [
      "trust",
      "trustworthy",
      "human-in-the-loop",
      "human in the loop",
      "override",
      "confidence",
      "provenance",
      "governance approach",
      "point of view",
      "design philosophy",
      "ai philosophy"
    ]
  },
  {
    name: "research",
    words: [
      "research",
      "usability testing",
      "a/b test",
      "ab test",
      "discovery interview",
      "maze",
      "user testing",
      "testing",
      "behavioral synthesis"
    ]
  },
  {
    name: "skills",
    words: ["skill", "skills", "tool", "tools", "technical", "tech stack", "technology", "stack"]
  },
  {
    name: "role",
    words: ["role", "contribution", "what did she do", "what did you do", "own", "ownership"]
  },
  {
    name: "projects",
    words: ["project", "projects", "case study", "case studies", "what has she built", "what did she build", "portfolio work"]
  },
  {
    name: "experience",
    words: ["experience", "career", "work history", "companies", "worked at", "jobs"]
  },
  {
    name: "about",
    words: ["who is", "who are you", "introduce", "about harshita", "background"]
  }
];

function detectIntent(normalized) {
  for (const rule of INTENT_RULES) {
    if (rule.words.some((word) => normalized.includes(word))) return rule.name;
  }
  return null;
}

// ---------------------------------------------------------------------------
// Response builders — each returns { html, source, related }
// ---------------------------------------------------------------------------
const SOURCE_VERIFIED = "Verified résumé information";

function link(url, text) {
  return `<a href="${url}" target="_blank" rel="noreferrer">${escapeHTML(text)}</a>`;
}

function bulletList(items) {
  return `<ul>${items.map((item) => `<li>${escapeHTML(item)}</li>`).join("")}</ul>`;
}

function buildAbout() {
  const p = portfolioData.person;
  return {
    html: `<h3>${escapeHTML(p.name)}</h3><p class="meta">${escapeHTML(p.title)} · ${escapeHTML(p.location)}</p><p>${escapeHTML(p.summary)}</p>`,
    source: SOURCE_VERIFIED,
    related: ["AI & Trust", "Case Studies", "Experience"]
  };
}

function buildExperienceOverview() {
  const rows = portfolioData.experience
    .map((entry) => `<li><strong>${escapeHTML(entry.company)}</strong> — ${escapeHTML(entry.role)} <span class="meta">(${escapeHTML(entry.dates)})</span></li>`)
    .join("");
  return {
    html: `<h3>Experience</h3><ul class="entity-list">${rows}</ul><p class="hint">Ask about a specific company for the details, e.g. "What did she do at Technoboot?"</p>`,
    source: SOURCE_VERIFIED,
    related: []
  };
}

function buildEntityOverview(entity) {
  if (entity.type === "project") return buildProjectCard(entity);
  const bullets = entity.bullets.map((bullet) => bullet.text);
  return {
    html: `<h3>${escapeHTML(entity.company)}</h3><p class="meta">${escapeHTML(entity.role)} · ${escapeHTML(entity.location)} · ${escapeHTML(entity.dates)}</p>${bulletList(bullets)}`,
    source: SOURCE_VERIFIED,
    related: []
  };
}

function buildEntityIntent(entity, intentName) {
  if (entity.type === "project") return buildProjectCard(entity);

  const themed = entity.bullets.filter((bullet) => bullet.themes.includes(intentName));
  const bullets = (themed.length ? themed : entity.bullets).map((bullet) => bullet.text);

  return {
    html: `<h3>${escapeHTML(entity.company)}</h3><p class="meta">${escapeHTML(entity.role)} · ${escapeHTML(entity.dates)}</p>${bulletList(bullets)}`,
    source: SOURCE_VERIFIED,
    related: []
  };
}

function buildResearchGeneral() {
  const items = [];
  portfolioData.experience.forEach((entry) => {
    entry.bullets
      .filter((bullet) => bullet.themes.includes("research"))
      .forEach((bullet) => items.push(`<strong>${escapeHTML(entry.company)}:</strong> ${escapeHTML(bullet.text)}`));
  });
  return {
    html: `<h3>Research approach</h3><ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>`,
    source: SOURCE_VERIFIED,
    related: ["Experience"]
  };
}

function buildSkillsResponse() {
  const groups = Object.entries(portfolioData.skills)
    .map(([group, items]) => `<p class="skill-group"><strong>${escapeHTML(group)}</strong></p>${bulletList(items)}`)
    .join("");
  return { html: `<h3>Skills & tools</h3>${groups}`, source: SOURCE_VERIFIED, related: [] };
}

function buildEducationResponse() {
  const education = portfolioData.education;
  return {
    html: `<h3>Education</h3><p><strong>${escapeHTML(education.institution)}</strong>, ${escapeHTML(education.location)}<br>${escapeHTML(education.degree)} <span class="meta">(${escapeHTML(education.dates)})</span></p><p class="meta">Relevant coursework</p>${bulletList(education.coursework)}`,
    source: SOURCE_VERIFIED,
    related: []
  };
}

function buildAccessibilityResponse() {
  const technoboot = portfolioData.experience.find((entry) => entry.id === "technoboot");
  const bullet = technoboot.bullets.find((b) => b.themes.includes("accessibility"));
  return {
    html: `<h3>Accessibility work</h3><p class="meta">Technoboot · ${escapeHTML(technoboot.dates)}</p><p>${escapeHTML(bullet.text)}</p>`,
    source: SOURCE_VERIFIED,
    related: ["Skills & Tools"]
  };
}

function buildAiTrustResponse() {
  const communityDreams = portfolioData.experience.find((entry) => entry.id === "community-dreams");
  const trustBullet = communityDreams.bullets.find((b) => b.themes.includes("ai-trust"));
  const projectCards = portfolioData.projects.map((project) => `<li><strong>${escapeHTML(project.title)}:</strong> ${escapeHTML(project.summary)}</li>`);
  return {
    html: `<h3>Designing trustworthy AI</h3><p>${escapeHTML(trustBullet.text)}</p><p class="meta">Reflected in her case work</p><ul>${projectCards.join("")}</ul>`,
    source: SOURCE_VERIFIED,
    related: ["Case Studies"]
  };
}

function buildProjectCard(project) {
  return {
    html: `<h3>${escapeHTML(project.title)}</h3><p class="meta">${escapeHTML(project.stack)}</p><p>${escapeHTML(project.summary)}</p>`,
    source: SOURCE_VERIFIED,
    related: []
  };
}

function buildProjectsResponse() {
  const cards = portfolioData.projects.map((project) => buildProjectCard(project).html).join("<hr>");
  return { html: `<h3>Case studies</h3>${cards}`, source: SOURCE_VERIFIED, related: [] };
}

function buildContactResponse() {
  const l = portfolioData.links;
  return {
    html: `<h3>Contact</h3><p>${link(l.resume, "View résumé →")}<br>${link(l.linkedin, "Connect on LinkedIn →")}<br>${link(l.email, "Email Harshita →")}<br>${link(l.portfolio, "Visit sriharshitapilla.site →")}</p>`,
    source: SOURCE_VERIFIED,
    related: []
  };
}

function buildRefusalResponse() {
  return {
    html: `<p>I don't have verified public portfolio information about that. Her résumé and contact details are the best next step.</p>`,
    source: "Boundary response",
    related: ["Contact"]
  };
}

function buildFallbackResponse() {
  return {
    html: `<p>I only answer using Harshita's verified portfolio content. Try asking about her projects, AI &amp; trust design approach, research, skills, experience, or contact details.</p>${link(portfolioData.links.portfolio, "Explore the full portfolio →")}`,
    source: "Boundary response",
    related: []
  };
}

// ---------------------------------------------------------------------------
// Main routing
// ---------------------------------------------------------------------------
function answerQuestion(question) {
  const normalized = normalize(question);
  const intentName = detectIntent(normalized);

  if (intentName === "refuse") return buildRefusalResponse();
  // Education is an independent fact from employment (she both studied and
  // later held a separate job title at DePaul), so it's resolved before any
  // company/project entity match rather than nested under one.
  if (intentName === "education") return buildEducationResponse();

  const entity = detectEntity(normalized);

  if (entity && intentName) return buildEntityIntent(entity, intentName);
  if (entity) return buildEntityOverview(entity);

  switch (intentName) {
    case "contact":
      return buildContactResponse();
    case "accessibility":
      return buildAccessibilityResponse();
    case "ai-trust":
      return buildAiTrustResponse();
    case "research":
      return buildResearchGeneral();
    case "skills":
      return buildSkillsResponse();
    case "projects":
      return buildProjectsResponse();
    case "experience":
      return buildExperienceOverview();
    case "about":
      return buildAbout();
    default:
      return buildFallbackResponse();
  }
}

const ACTION_INTENTS = {
  "ai-trust": buildAiTrustResponse,
  projects: buildProjectsResponse,
  research: buildResearchGeneral,
  experience: buildExperienceOverview,
  skills: buildSkillsResponse,
  contact: buildContactResponse
};

// ---------------------------------------------------------------------------
// Rendering
// ---------------------------------------------------------------------------
function addUserMessage(text) {
  const row = document.createElement("div");
  row.className = "guide-row guide-row--user";
  const bubble = document.createElement("p");
  bubble.className = "user-line";
  bubble.textContent = text;
  row.appendChild(bubble);
  log.appendChild(row);
  log.scrollTop = log.scrollHeight;
}

function addCard(response) {
  const row = document.createElement("div");
  row.className = "guide-row";

  const card = document.createElement("div");
  card.className = "info-card";
  card.innerHTML = response.html;

  const footer = document.createElement("div");
  footer.className = "info-card__footer";

  const sourceTag = document.createElement("span");
  sourceTag.className = "source-tag";
  sourceTag.textContent = response.source;
  footer.appendChild(sourceTag);

  if (response.related && response.related.length) {
    response.related.forEach((label) => {
      const relatedButton = document.createElement("button");
      relatedButton.type = "button";
      relatedButton.className = "related-chip";
      relatedButton.textContent = label;
      relatedButton.addEventListener("click", () => runAction(label));
      footer.appendChild(relatedButton);
    });
  }

  card.appendChild(footer);
  row.appendChild(card);
  log.appendChild(row);
  log.scrollTop = log.scrollHeight;
}

function addWelcome() {
  const row = document.createElement("div");
  row.className = "guide-row";
  row.innerHTML = `<div class="info-card"><h3>Looking for something specific?</h3><p>I can walk you through Harshita's AI design approach, case studies, research, skills, and experience — grounded only in her verified résumé.</p></div>`;
  log.appendChild(row);
}

// ---------------------------------------------------------------------------
// Actions + events
// ---------------------------------------------------------------------------
const ACTION_LABELS = {
  "AI & Trust": "ai-trust",
  "Case Studies": "projects",
  Research: "research",
  Experience: "experience",
  "Skills & Tools": "skills",
  Contact: "contact"
};

function runAction(label) {
  const intentKey = ACTION_LABELS[label];
  if (!intentKey) return;
  addUserMessage(label);
  window.setTimeout(() => addCard(ACTION_INTENTS[intentKey]()), 200);
}

function openPanel() {
  panel.hidden = false;
  launcher.setAttribute("aria-expanded", "true");
  if (!opened) {
    addWelcome();
    opened = true;
  }
  input.focus();
}

function closePanel() {
  panel.hidden = true;
  launcher.setAttribute("aria-expanded", "false");
  launcher.focus();
}

launcher.addEventListener("click", openPanel);
closeButton.addEventListener("click", closePanel);

actionButtons.forEach((button) => {
  button.addEventListener("click", () => runAction(button.textContent.trim()));
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const question = input.value.trim();
  if (!question) return;
  addUserMessage(question);
  input.value = "";
  window.setTimeout(() => addCard(answerQuestion(question)), 200);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !panel.hidden) closePanel();
});
