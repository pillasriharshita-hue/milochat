/**
 * Verified portfolio content — sourced only from Sri Harshita Pilla's résumé
 * (assets/Sri-Harshita-Pilla-Resume.pdf). No metric, employer, project claim,
 * or outcome here should ever be edited without updating the résumé first.
 */
const portfolioData = {
  person: {
    name: "Sri Harshita Pilla",
    title: "Product Designer",
    location: "Dallas, TX",
    summary:
      "Product Designer with an MS in Human-Computer Interaction and 3 years designing end-to-end for AI-powered, data-dense B2B products, from user research through high-fidelity prototyping.",
    email: "harshitapillasri@gmail.com",
    linkedin: "https://www.linkedin.com/in/pillasriharshita/",
    website: "https://sriharshitapilla.site"
  },

  links: {
    resume: "assets/Sri-Harshita-Pilla-Resume.pdf",
    linkedin: "https://www.linkedin.com/in/pillasriharshita/",
    email: "mailto:harshitapillasri@gmail.com",
    portfolio: "https://sriharshitapilla.site"
  },

  // Bullets are tagged with themes so the router can pull the specific
  // evidence a question is actually asking about, instead of dumping every
  // bullet for a company regardless of what was asked.
  experience: [
    {
      id: "community-dreams",
      company: "Community Dreams",
      location: "Denton, TX (Remote)",
      role: "Product Designer",
      dates: "11/2025 – Present",
      keywords: ["community dreams"],
      bullets: [
        {
          text: "Designed human-in-the-loop AI review flows for a B2B SaaS data automation platform, translating discovery research and user interviews into editable suggestions, confidence indicators, and manual overrides across 3-8s response windows.",
          themes: ["ai-trust", "role"]
        },
        {
          text: "Iterated growth experiments for multi-step onboarding flows using progressive disclosure and inline column previews, reducing source-to-destination field relationship errors before users committed to a run and improving new account activation rates.",
          themes: ["role", "research"]
        },
        {
          text: "Leveraged Claude Code and Cursor daily to prototype interaction states directly in code, accelerate research synthesis, and translate complex design rationale into clear technical specs for engineering partners, cutting design-to-dev revision cycles across sprint delivery.",
          themes: ["skills", "role"]
        }
      ]
    },
    {
      id: "depaul",
      company: "DePaul University",
      location: "Chicago, IL",
      role: "UX Designer",
      dates: "11/2023 – 08/2025",
      keywords: ["depaul", "de paul"],
      bullets: [
        {
          text: "Improved task completion from 62% to 85% across 24 participants on Maze by redesigning user flows, information architecture, and navigation for a 500+ user internal web platform through 3 iterative rounds of moderated usability testing, A/B testing, and stakeholder feedback.",
          themes: ["research", "role"]
        },
        {
          text: "Conducted user research sessions including discovery interviews and behavioral synthesis, translating qualitative and quantitative findings into simplified, validated workflows that lifted platform adoption across cross-functional teams.",
          themes: ["research"]
        },
        {
          text: "Delivered wireframes, high-fidelity Figma prototypes, and component-level UI documentation contributing to the product design system, supporting engineering implementation across a 20-month Agile engagement.",
          themes: ["role", "skills"]
        }
      ]
    },
    {
      id: "technoboot",
      company: "Technoboot",
      location: "India",
      role: "UI/UX Designer",
      dates: "10/2022 – 07/2023",
      keywords: ["technoboot"],
      bullets: [
        {
          text: "Led end-to-end design for an ed-tech platform across onboarding, course discovery, and progress tracking via user research, information architecture, and interactive prototyping in Figma, increasing learner retention by 60% and reducing navigation friction by 24%.",
          themes: ["role", "research"]
        },
        {
          text: "Improved 30-day user retention by 41% by designing a gamified micro-interaction streak system, validated via A/B testing across 300+ users tracked in Mixpanel, with behavioral cohort analysis confirming sustained engagement lift.",
          themes: ["research", "role"]
        },
        {
          text: "Audited 120+ WCAG 2.1 AA violations across 8 client projects with Wave, Stark, and VoiceOver, and built a 200+ component Storybook design system on Figma across 3 product teams with zero critical accessibility defects during final QA for 2 banking clients.",
          themes: ["accessibility", "skills"]
        }
      ]
    },
    {
      id: "schaffen",
      company: "Schaffen Softwares",
      location: "India",
      role: "Junior UI Designer",
      dates: "06/2021 – 09/2022",
      keywords: ["schaffen"],
      bullets: [
        {
          text: "Designed and optimized interfaces for enterprise B2B and web-based products, addressing cross-platform usability challenges and improving task efficiency.",
          themes: ["role"]
        },
        {
          text: "Developed brand-aligned design systems and UI kits, enabling scalability, faster handoffs, and consistent user experiences across projects, contributing to a 25% increase in user satisfaction.",
          themes: ["role", "skills"]
        },
        {
          text: "Collaborated with stakeholders and end users to translate business needs into research-backed design solutions, ensuring both functionality and brand coherence.",
          themes: ["role"]
        }
      ]
    },
    {
      id: "we-storytellers",
      company: "We Storytellers",
      location: "India",
      role: "UI Designer",
      dates: "09/2020 – 05/2021",
      keywords: ["we storytellers", "storytellers"],
      bullets: [
        {
          text: "Designed interactive microsites and digital campaign pages for enterprise B2B IT clients using responsive layout, visual hierarchy, and information architecture, increasing engagement by 30%.",
          themes: ["role"]
        },
        {
          text: "Improved client content comprehension scores by 25%, translating complex infrastructure concepts into accessible interface patterns and clear data visualization for web-based campaign pages.",
          themes: ["role", "research"]
        }
      ]
    }
  ],

  // A degree is an independent fact from employment, even though this one
  // happens to share an institution name with the "depaul" experience entry.
  education: {
    institution: "DePaul University",
    location: "Chicago, IL",
    degree: "Master of Science — Human-Computer Interaction",
    dates: "09/2023 – 08/2025",
    coursework: [
      "User-Centered Design",
      "User Research Methods",
      "Interaction Design",
      "Information Architecture",
      "Usability Testing & Evaluation",
      "Human Factors Engineering",
      "Accessibility & Inclusive Design",
      "Mobile Application Design"
    ]
  },

  projects: [
    {
      id: "governance",
      title: "AI Agent Governance & Operations Platform",
      stack: "Figma, React · TypeScript, Next.js, Tailwind CSS",
      keywords: [
        "governance",
        "agent governance",
        "ai governance",
        "authority framework",
        "permissions model"
      ],
      summary:
        "Designed the authority and provenance framework for an AI agent governance platform: a five-tier permissions model defining when an agent acts independently versus requires human-in-the-loop sign-off, paired with a provenance system distinguishing verified data from AI-generated interpretation to prevent misread outputs in approval workflows.",
      themes: ["ai-trust", "role"]
    },
    {
      id: "stich",
      title: "Stich — AI-Assisted Wardrobe Decision Platform",
      stack: "Figma, AI Interaction Design, Expo/React Native, TypeScript",
      keywords: ["stich", "wardrobe"],
      summary:
        "Designed the data-authority and explanation-provenance framework for an AI-assisted wardrobe app: a four-tier hierarchy (user instruction, wardrobe data, session state, AI inference) defining when AI-generated recommendations require code-level validation, paired with a provenance system tagging each recommendation factor as user-stated, contextual, or AI interpretation to prevent AI reasoning from being misread as fact.",
      themes: ["ai-trust", "role"]
    }
  ],

  skills: {
    "Product & Interaction Design": [
      "Product Design (Full-Stack, End-to-End)",
      "User Experience (UX) Design",
      "User Interface (UI) Design",
      "Interaction Design (IxD)",
      "Visual Design",
      "Information Architecture (IA)",
      "Consumer App Design (C-Side)",
      "Enterprise Design",
      "User Flows",
      "Wireframing",
      "High-Fidelity Prototyping (Interactive, State-Based)",
      "Design Systems (Component Libraries, Design Tokens, Pattern Documentation)",
      "Accessibility (WCAG 2.1/2.2 AA)"
    ],
    Research: [
      "User Research (Qualitative & Quantitative, User Interviews, Usability Testing)",
      "A/B Testing",
      "Behavioral Synthesis",
      "Data-Informed Design Iteration",
      "Cross-Functional Collaboration (Product, Engineering, Research, Data)",
      "Agile/Scrum",
      "Figma (Advanced Variables, Auto-Layout, Component Variants, Dev Mode)",
      "FigJam",
      "Miro",
      "Google Analytics",
      "Mixpanel",
      "Maze",
      "ProtoPie"
    ],
    "AI & Technical": [
      "AI-Assisted Prototyping (Claude Code, Cursor, Claude API)",
      "React/JSX (shipped to production)",
      "HTML",
      "CSS",
      "JavaScript",
      "Generative UI Design"
    ]
  }
};
