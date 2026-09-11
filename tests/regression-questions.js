/**
 * Permanent regression suite for the entity + intent router in app.js.
 *
 * `entity` is the expected id from detectEntity(...)?.id, or null.
 * `intent` is the expected value from detectIntent(...), or null.
 *
 * Run with: node tests/run-router-tests.js
 * Every router change (new keyword, new entity, new intent) should be
 * checked against this whole list before it's considered done — not just
 * whatever question happened to fail last.
 */
module.exports = [
  // education is an independent fact from the DePaul job, so it should
  // resolve without needing "DePaul" in the question at all
  { question: "What did she study?", entity: null, intent: "education" },
  { question: "What degree does she have?", entity: null, intent: "education" },
  { question: "Where did she get her master's?", entity: null, intent: "education" },

  // DePaul: job vs. research vs. plain overview
  { question: "What research did Harshita do at DePaul?", entity: "depaul", intent: "research" },
  { question: "What did she do at DePaul?", entity: "depaul", intent: "role" },
  { question: "Tell me about DePaul", entity: "depaul", intent: null },

  // Stich project
  { question: "What tools did she use on Stich?", entity: "stich", intent: "skills" },
  { question: "Explain Stich", entity: "stich", intent: null },
  { question: "What was her contribution to Stich?", entity: "stich", intent: "role" },
  { question: "What tools were used for the wardrobe app?", entity: "stich", intent: "skills" },

  // AI Governance project
  { question: "What was her role in the AI Governance project?", entity: "governance", intent: "role" },
  {
    question: "What technical work did Harshita do on the AI governance project?",
    entity: "governance",
    intent: "skills"
  },

  // AI / trust design philosophy (no single entity)
  { question: "How does she design trustworthy AI?", entity: null, intent: "ai-trust" },
  { question: "What is her approach to human-in-the-loop design?", entity: null, intent: "ai-trust" },

  // refusal: real availability/compensation/private questions
  { question: "Is she available?", entity: null, intent: "refuse" },
  { question: "Is Harshita available for new roles?", entity: null, intent: "refuse" },
  { question: "What's her salary?", entity: null, intent: "refuse" },
  { question: "What is her expected salary?", entity: null, intent: "refuse" },
  { question: "What is her pay range?", entity: null, intent: "refuse" },
  { question: "Is she open to opportunities?", entity: null, intent: "refuse" },
  { question: "When can she start?", entity: null, intent: "refuse" },
  { question: "Does she need visa sponsorship?", entity: null, intent: "refuse" },
  { question: "What's her notice period?", entity: null, intent: "refuse" },
  { question: "Would she relocate?", entity: null, intent: "refuse" },
  { question: "Is she married?", entity: null, intent: "refuse" },
  { question: "How old is she?", entity: null, intent: "refuse" },
  { question: "What's her phone number?", entity: null, intent: "refuse" },
  { question: "Can you share confidential client details?", entity: null, intent: "refuse" },

  // regression guards: these LOOK like availability questions but aren't
  // about Harshita's availability, so they must NOT refuse
  { question: "What tools are available in her skill set?", entity: null, intent: "skills" },
  { question: "What projects are available to view?", entity: null, intent: "projects" },

  // accessibility
  { question: "What accessibility work has she done?", entity: null, intent: "accessibility" },
  { question: "Tell me about her WCAG audits", entity: null, intent: "accessibility" },

  // other companies
  { question: "What impact did she have at Technoboot?", entity: "technoboot", intent: null },
  { question: "How did she improve retention at Technoboot?", entity: "technoboot", intent: null },
  { question: "Tell me about Community Dreams", entity: "community-dreams", intent: null },
  { question: "What did she do at We Storytellers?", entity: "we-storytellers", intent: "role" },
  { question: "What did she do at Schaffen?", entity: "schaffen", intent: "role" },

  // general categories
  { question: "What skills does she bring?", entity: null, intent: "skills" },
  { question: "What is her tech stack?", entity: null, intent: "skills" },
  { question: "How can I contact her?", entity: null, intent: "contact" },
  { question: "Can I see her résumé?", entity: null, intent: "contact" },
  { question: "What is Harshita's LinkedIn?", entity: null, intent: "contact" },
  { question: "Who is Harshita?", entity: null, intent: "about" },
  { question: "Tell me about her background", entity: null, intent: "about" },
  { question: "What has she built?", entity: null, intent: "projects" },
  { question: "Show me her case studies", entity: null, intent: "projects" },
  { question: "What is her work history?", entity: null, intent: "experience" },
  { question: "What companies has she worked at?", entity: null, intent: "experience" },

  // unsupported / out of scope
  { question: "What's her favorite color?", entity: null, intent: null }
];
