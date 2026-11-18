/**
 * SINGLE SOURCE OF CONTENT for the portfolio.
 *
 * Every visible string on the site comes from this file; components never
 * hard-code copy. Facts come only from /workspace/portfolio/profile.md
 * (md5 2bc47197c03cf8af2c979bc2a1f215f1, 18 Nov 2026). `sources` records the
 * profile.md section behind each part.
 *
 * Corrections confirmed by Emmanuel via Grok Bot, Nov 18 2026, override
 * profile.md: VoterIQ Mar–Jul 2026, Remote (India-based company); MasteryHive
 * products (fraud, AML/KYC/KYB, reconciliation incl. ReconPilot, reinsurance
 * data) built by him; Enzagroup 99.9% availability and 60% less manual
 * compliance review verified; AnotiAI Nov 2025 – Mar 2026; no certifications.
 *
 * Still withheld: all other profile.md §6 "Unverified metrics" and §7 CV conflicts.
 * MasteryHive is product-level only: no clients, internal data or repo links.
 */

export type Link = { label: string; href: string };

export type ExperienceItem = {
  role: string;
  org: string;
  period: string;
  summary: string;
  highlights: string[];
  stack: string[];
};

export type Project = {
  name: string;
  tagline: string;
  description: string;
  outcome: string;
  stack: string[];
  links: Link[]; // public links only (all returned HTTP 200 on 18 Nov 2026)
};

export type SkillGroup = { group: string; items: string[] };

export type Profile = {
  meta: { title: string; description: string; siteUrl: string; locale: string };
  person: { name: string; initials: string; role: string };
  hero: {
    eyebrow: string;
    headline: string;
    focus: string[];
    summary: string;
    primaryCta: Link;
    secondaryCta: Link;
  };
  about: { heading: string; paragraphs: string[]; facts: { label: string; value: string }[] };
  experience: { heading: string; items: ExperienceItem[] };
  projects: {
    heading: string;
    intro: string;
    items: Project[];
    earlier: { heading: string; items: { name: string; description: string; href: string }[] };
  };
  skills: { heading: string; groups: SkillGroup[] };
  cv: { heading: string; blurb: string; href: string; label: string };
  contact: { heading: string; blurb: string; email: string; links: Link[] };
  footer: { note: string };
  sources: Record<string, string>;
};

export const profile: Profile = {
  meta: {
    title: 'Emmanuel Osanebi — AI Engineer: LLM agents, automation, Python/FastAPI',
    description:
      'AI Engineer building production LLM agents and automation in Python and FastAPI: fraud, AML/KYC/KYB, agentic reconciliation and reinsurance data products, agentic pipelines and a PII-masking SDK.',
    siteUrl: 'https://emms204.github.io',
    locale: 'en',
  },
  person: { name: 'Emmanuel Osanebi', initials: 'EO', role: 'AI Engineer' },
  hero: {
    eyebrow: 'AI Engineer',
    headline: 'I build production LLM agents and automation in Python and FastAPI.',
    focus: ['LLM agents', 'Automation', 'Python / FastAPI'],
    summary:
      'At MasteryHive AI I build fraud, AML/KYC/KYB, agentic financial-reconciliation and reinsurance data products. Before that I built agentic pipelines for VoterIQ and Enzagroup, and published a hybrid transformer-plus-rules PII-masking SDK on PyPI.',
    primaryCta: { label: 'See projects', href: '#projects' },
    secondaryCta: { label: 'Download CV', href: '/cv.pdf' },
  },
  about: {
    heading: 'About',
    paragraphs: [
      'I design LLM systems where the model does what it is good at (mapping, explaining, orchestrating tools) and deterministic code and human approval handle the rest. My recent work spans agentic reconciliation, fraud and compliance backends, and multi-agent pipelines with durable queues, idempotency and explicit job lifecycles.',
      'My background is in applied machine learning and computer vision, which I now bring to retrieval-augmented generation, structured outputs, tool-use agents and the FastAPI services that run them.',
    ],
    facts: [
      { label: 'Focus', value: 'LLM agents · Automation · Python / FastAPI' },
      { label: 'Currently', value: 'AI Engineer, MasteryHive AI' },
      { label: 'Education', value: 'BSc Computer Science, University of Ibadan (2025)' },
    ],
  },
  experience: {
    heading: 'Experience',
    items: [
      {
        role: 'AI Engineer',
        org: 'MasteryHive AI',
        period: 'Aug 2026 – Present',
        summary: 'I build AI backend products for fraud prevention, compliance, financial reconciliation and reinsurance data.',
        highlights: [
          'Fraud detection: built AI backend services for transaction fraud detection, including a streaming variant for real-time monitoring.',
          'AML / KYC / KYB: built the AI backend for identity, customer and business verification and compliance checks.',
          'Banking reconciliation: built FastAPI microservices on GCP that match bank statements to ledger transactions through fuzzy, rule-based and LLM-assisted stages, with Pub/Sub-fed parallel workers and dead-letter replay.',
          'ReconPilot: built an agentic reconciliation copilot where the LLM proposes mappings and explains evidence, money maths stays deterministic in Python, and humans approve every resolution.',
          'Reinsurance data: built ingestion, cleaning and validation pipelines for reinsurance bordereaux and treaty data.',
        ],
        stack: ['Python', 'FastAPI', 'GCP', 'Pub/Sub', 'Gemini', 'React / TypeScript'],
      },
      {
        role: 'AI Engineer',
        org: 'VoterIQ (India-based)',
        period: 'Mar 2026 – Jul 2026 · Remote',
        summary: 'End-to-end political-intelligence pipeline: article → enrichment → social probe → ranking → database write-back.',
        highlights: [
          'Tiered fallback and cooldown logic for run reliability.',
          'Execution control with durable queueing, idempotency and a seven-state job lifecycle (queued, claimed, running, completed, failed, deferred, dead-lettered).',
          'Weekly trend extraction and reranking for analysts.',
        ],
        stack: ['Python', 'Supabase', 'LLM pipelines'],
      },
      {
        role: 'AI Software Engineer',
        org: 'Enzagroup Global',
        period: 'Jan 2024 – Dec 2025',
        summary: 'Merchant-onboarding AI and agentic document and decision workflows.',
        highlights: [
          'Merchant-onboarding AI: structured document extraction that reduced manual compliance review by 60%.',
          'Agentic document and decision workflows built with CrewAI and LangGraph.',
          'Integrations with identity verification, CRM and internal microservices.',
          'Deployed AI services on AWS (EKS, EC2, RDS) at 99.9% availability, with monitoring and retraining triggers.',
          'Behavioural features and anomaly checks for risk scoring.',
        ],
        stack: ['Python', 'FastAPI', 'CrewAI', 'LangGraph', 'AWS'],
      },
      {
        role: 'AI Engineer',
        org: 'Cali',
        period: 'Jul 2022 – Dec 2023',
        summary: 'LLM backends and multi-agent workflows for large-scale text analysis.',
        highlights: [
          'RAG pipeline with LlamaIndex and OpenAI for document analysis.',
          'Multi-agent planning and memory.',
          'Python and Node.js backend services for AI inference.',
        ],
        stack: ['Python', 'Node.js', 'LlamaIndex', 'OpenAI'],
      },
      {
        role: 'Machine Learning Engineer',
        org: 'Omdena',
        period: 'Jul 2021 – Dec 2022',
        summary: 'Computer vision and NLP projects.',
        highlights: [
          'Weld-defect detection and classification model, plus APIs for training and retraining.',
          'Dataset collection and annotation for multi-label, attention-based classification of GESI content.',
        ],
        stack: ['Python', 'PyTorch', 'Computer vision', 'NLP'],
      },
    ],
  },
  projects: {
    heading: 'Featured projects',
    intro: 'LLM agents, automation and AI products. Links go to public repos, packages or live sites.',
    items: [
      {
        name: 'ReconPilot',
        tagline: 'Agentic reconciliation copilot · MasteryHive product',
        description:
          'An LLM copilot that proposes schema mappings, explains evidence and orchestrates approved tools, while deterministic Python does all the money maths and humans approve every mapping and resolution.',
        outcome: 'Audit trail, Server-Sent Events tool timeline, versioned reruns, and CSV/JSON/HTML reports.',
        stack: ['FastAPI', 'React', 'Vite', 'TypeScript', 'Gemini', 'SSE'],
        links: [],
      },
      {
        name: 'AnotiAI PII Masker',
        tagline: 'Enterprise PII detection and masking · AnotiAI, Nov 2025 – Mar 2026',
        description:
          'A hybrid transformer + QA + rules PII detector with reversible masking (mask/unmask with a PII map), shipped as a Python SDK and API with cloud and local modes.',
        outcome: 'Published on PyPI as anotiai-pii-masker; the platform is live.',
        stack: ['Python', 'Hugging Face Transformers', 'FastAPI', 'RunPod', 'GCP'],
        links: [
          { label: 'PyPI', href: 'https://pypi.org/project/anotiai-pii-masker/' },
          { label: 'Platform', href: 'https://platform.anotiai.com/' },
        ],
      },
      {
        name: 'WhoseDEV',
        tagline: 'Privacy-first AI code editor · AnotiAI',
        description: 'A local-first AI coding agent with sensitive-code masking, multi-model routing and bring-your-own keys.',
        outcome: 'Live at whosedev.com.',
        stack: ['AI agents', 'Multi-model routing'],
        links: [{ label: 'Website', href: 'https://whosedev.com/' }],
      },
      {
        name: 'Grunsco-Automate',
        tagline: 'Voice-of-customer automation',
        description:
          'Classifies reviews with OpenAI and Pydantic structured outputs plus regex guardrails, drafts responses for Slack approval, escalates sensitive cases and mines batch insights.',
        outcome: 'Human-in-the-loop: nothing is sent without Slack approval, and sensitive cases are escalated.',
        stack: ['n8n', 'FastAPI', 'PostgreSQL', 'OpenAI', 'Pydantic', 'Slack'],
        links: [{ label: 'Repo', href: 'https://github.com/emms204/Grunsco-Automate' }],
      },
      {
        name: 'DevGenie',
        tagline: 'Multi-agent full-stack app generator',
        description:
          'Agents that generate React/Next.js frontends and FastAPI backends in parallel from a single prompt, using typed structured outputs.',
        outcome: 'Frontend and backend generated in parallel from one prompt.',
        stack: ['Python', 'FastAPI', 'TypeScript', 'Next.js'],
        links: [{ label: 'Repo', href: 'https://github.com/emms204/DevGenie' }],
      },
      {
        name: 'ScriptGen',
        tagline: 'LLM script-generation framework',
        description:
          'A modular LLM pipeline that turns loglines into scenes while maintaining character, plot and setting "bibles", with a FastAPI + Next.js web app.',
        outcome: 'Character, plot and setting bibles carried across every generated scene.',
        stack: ['Python', 'LLMs', 'FastAPI', 'Next.js'],
        links: [
          { label: 'Repo', href: 'https://github.com/emms204/ScriptGen' },
          { label: 'Web app repo', href: 'https://github.com/emms204/ScreenplayWebApp' },
        ],
      },
      {
        name: 'Enza Chat',
        tagline: 'Merchant-support chatbot and real-time chat',
        description:
          'A RASA merchant-support chatbot (2024), followed by a real-time chat app on AWS Amplify (2025).',
        outcome: 'From a RASA bot to a real-time chat app on Cognito, AppSync GraphQL and DynamoDB.',
        stack: ['RASA', 'Next.js 15', 'AWS Amplify', 'Cognito', 'AppSync', 'DynamoDB'],
        links: [
          { label: 'Chat app repo', href: 'https://github.com/emms204/enza-chat' },
          { label: 'Chatbot repo', href: 'https://github.com/emms204/Enzagroup-Chatbot' },
        ],
      },
    ],
    earlier: {
      heading: 'Earlier computer-vision work',
      items: [
        { name: 'GolfBallTracking', description: 'Real-time C++ ONNX Runtime/OpenCV YOLO detector with a camera-calibration tool.', href: 'https://github.com/emms204/GolfBallTracking' },
        { name: 'Mask R-CNN in PyTorch', description: 'Mask R-CNN implemented from scratch in PyTorch.', href: 'https://github.com/emms204/MASK-RCNN-Pytorch' },
        { name: 'Character2Body', description: 'Image to SMPL-X 3D body, with a FastAPI/React app.', href: 'https://github.com/emms204/Character2Body' },
        { name: 'Facial-Recognition-System', description: 'YOLOv8 + InceptionResnetV1 face recognition.', href: 'https://github.com/emms204/Facial-Recognition-System' },
      ],
    },
  },
  skills: {
    heading: 'Skills',
    groups: [
      { group: 'LLMs & agents', items: ['RAG', 'Multi-agent systems', 'Tool-use agents', 'Function calling', 'Structured / schema-constrained outputs', 'Prompt engineering', 'LangGraph', 'LangChain', 'CrewAI', 'LlamaIndex', 'SmolAgents', 'OpenAI', 'Gemini', 'Anthropic'] },
      { group: 'Backend & automation', items: ['FastAPI', 'Express.js', 'REST / WebSocket APIs', 'Webhooks', 'Auth & rate limiting', 'PostgreSQL', 'Supabase', 'n8n'] },
      { group: 'Languages', items: ['Python', 'SQL', 'TypeScript', 'JavaScript', 'Node.js', 'Bash', 'C++'] },
      { group: 'Applied ML & evaluation', items: ['PyTorch', 'TensorFlow', 'Hugging Face Transformers', 'scikit-learn', 'XGBoost', 'LightGBM', 'Anomaly detection', 'Ranking', 'SFT & instruction data', 'DPO / RLHF principles', 'Calibration', 'Drift monitoring'] },
      { group: 'Infra & MLOps', items: ['Docker', 'Kubernetes', 'AWS (EKS, EC2, RDS)', 'AWS Amplify', 'GCP', 'RunPod', 'Airflow', 'Kubeflow', 'CI/CD', 'Model serving', 'Observability'] },
    ],
  },
  cv: {
    heading: 'CV',
    blurb: 'The full CV, with roles, projects and education, as a PDF.',
    href: '/cv.pdf',
    label: 'Download CV (PDF)',
  },
  contact: {
    heading: 'Contact',
    blurb: 'Open to AI engineer roles building LLM agents, automation and Python/FastAPI backends.',
    email: 'emmanuelosanebi1@gmail.com',
    links: [
      { label: 'GitHub', href: 'https://github.com/emms204' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/emmanuel-osanebi-1a7042222' },
    ],
  },
  footer: { note: 'Built with Astro. No trackers.' },
  sources: {
    meta: '§2 Summary (draft) + brief framing (AI Engineer: LLM agents, automation, Python/FastAPI)',
    hero: '§2 Summary (draft); headline per §7.1 resolved to "AI Engineer" by the brief',
    about: '§2 Summary; §3 MasteryHive/ReconPilot + VoterIQ (seven-state lifecycle, verified); §5 Skills; §5 Education',
    experience: '§3 Experience (all five roles) + Emmanuel via Grok Bot, Nov 18 (VoterIQ dates/Remote, MasteryHive ownership + reinsurance, Enzagroup 99.9%/60%, VoterIQ title + reinsurance wording aligned to CV); other §6 metrics and §7 location conflicts withheld',
    projects: '§4 Portfolio projects 1–8 (links that returned 200); ReconPilot without link; AnotiAI dates per Emmanuel via Grok Bot, Nov 18',
    skills: '§5 Skills (Languages, LLM and agents, Applied ML, LLM training/eval, Backend, Infra/MLOps)',
    cv: 'Brief: /cv.pdf (PDF supplied separately)',
    contact: '§1 Contact info (email, LinkedIn) and §1 note (GitHub); phone and X omitted. WhatsApp link https://wa.me/2349030612170 per Emmanuel via Grok Bot, Nov 18 (number not printed)',
    offers: 'Offer names/engagements: concept Page "Sketch · Ink · Sign" (Emmanuel-chosen offer types, 18 Nov). Pricing and scope: "On request" for every offer, no prices: Emmanuel via Grok Bot, Nov 18 5:17 PM',
    whatsappHours: 'No set reply hours; no hours restriction shown anywhere: Emmanuel via Grok Bot, Nov 18 5:17 PM',
    quotes: 'No client quotes or testimonials exist; section not rendered (config SHOW_QUOTES=false): Emmanuel via Grok Bot, Nov 18 5:17 PM',
    press: 'Medium series by @emmxyz12, read 18 Nov 2026 via WebFetch: Part 1 (title has no part number; Part 2 calls it "the first part"), Mar 27 2023; Part 2, Mar 30 2023; Part 3, Mar 31 2023. Topics per the pages (Part 1 LeNet5 + AlexNet, Part 2 VGGNet + GoogLeNet/Inception V1, Part 3 ResNet/ResNet50). Code repo github.com/emms204/Pytorch-CV-Models is linked from the articles',
    archive: 'Earlier CV repos: profile.md §4.8. Chatflow: live emms204.github.io description, read 18 Nov 2026 (kept per concept Page "every working link")',
    caseFiles: 'Case files: CV (cv-source HTML) + profile.md §3/§4, product-level for MasteryHive. Withheld metrics (VoterIQ 40%, Enzagroup 95%/20+ types, etc.) stay withheld',
  },
};

export default profile;

/* =====================================================================
 * PHASE 3 — "Sketch · Ink · Sign" copy (concept A + B's pathway chooser
 * + C's retake strip). Same rules: facts only from profile.md / CV /
 * Emmanuel's confirmed answers; `sources` above records where each came from.
 * A `null` field means "awaiting Emmanuel": it renders as a marked
 * placeholder while SHOW_PLACEHOLDERS is true, and disappears when false.
 * ===================================================================== */

export type Figure = { value: string; label: string; source: string };
export type Retake = { first: string | null; changed: string | null; held: string | null };
export type CaseFile = {
  slug: string;
  title: string;
  context: string;
  period: string;
  summary: string;
  sketch: string;
  ink: string[];
  sign: string[];
  figures: Figure[];
  sealed: boolean;
  sealLabel?: string;
  diagram?: boolean;
  retake?: Retake;
  stack: string[];
  links: Link[];
};
export type PathKey = 'client' | 'customer' | 'employer' | 'collaborator' | 'partner';
export type Pathway = {
  key: PathKey; label: string; headline: string; first: string;
  cta: Link; second: Link; start: Link[];
};

const WA = 'https://wa.me/2349030612170';
const MAIL = 'mailto:emmanuelosanebi1@gmail.com';

export const nav: Link[] = [
  { label: 'Work', href: '/work/' },
  { label: 'Shelf', href: '/shelf/' },
  { label: 'Commission', href: '/commission/' },
  { label: 'Press', href: '/press/' },
  { label: 'Margins', href: '/margins/' },
  { label: 'Sign', href: '/sign/' },
];

export const atelier = {
  meta: {
    title: 'Emmanuel Osanebi — AI systems you can sign off on',
    description:
      'Emmanuel Osanebi, AI Engineer. AI drafts, Python checks the numbers, a person signs: production LLM agents, automation and compliance AI in Python and FastAPI.',
  },
  cover: {
    eyebrow: 'Emmanuel Osanebi · AI Engineer',
    headline: 'I turn messy, high-stakes work into AI systems you can sign off on.',
    motto: ['AI drafts.', 'Python checks the numbers.', 'A person signs.'],
    summary: profile.hero.summary,
    chooserLegend: 'Who are you here as?',
    chooserHint: 'Pick one and the cover re-routes. Share it with ?path=…',
  },
  pathways: [
    {
      key: 'client', label: 'Client',
      headline: "Bring me the messy, high-stakes process. I'll draw the system and ship it.",
      first: 'Case files for fraud, KYC/KYB, reconciliation and automation, each ending with an invitation to scope yours.',
      cta: { label: 'Start a brief', href: '/sign/?path=client#brief' },
      second: { label: 'WhatsApp me', href: WA + '?text=' + encodeURIComponent('Hi Emmanuel, I have a process I would like to talk about.') },
      start: [
        { label: 'Work: case files', href: '/work/' }, { label: 'Commission: offers', href: '/commission/' },
        { label: 'Shelf: products', href: '/shelf/' }, { label: 'Press: writing', href: '/press/' }, { label: 'Margins', href: '/margins/' },
      ],
    },
    {
      key: 'customer', label: 'Customer / creator',
      headline: 'Tools I build, for people who care about privacy and craft.',
      first: 'The Shelf: AnotiAI PII Masker on PyPI and WhoseDEV, then writing.',
      cta: { label: 'Try the tools', href: '/shelf/' },
      second: { label: 'Read the essays', href: '/press/' },
      start: [
        { label: 'Shelf: products', href: '/shelf/' }, { label: 'Press: writing', href: '/press/' },
        { label: 'Margins', href: '/margins/' }, { label: 'Work: case files', href: '/work/' }, { label: 'Commission: offers', href: '/commission/' },
      ],
    },
    {
      key: 'employer', label: 'Employer',
      headline: 'AI engineer who ships production agents, compliance AI and the plumbing that keeps them honest.',
      first: 'Case files with stack and verified figures, the CV, GitHub.',
      cta: { label: 'Read the CV', href: '/cv.pdf' },
      second: { label: 'Talk about a role', href: MAIL + '?subject=' + encodeURIComponent('Role: ') },
      start: [
        { label: 'Work: case files', href: '/work/' }, { label: 'Press: writing', href: '/press/' },
        { label: 'CV (PDF)', href: '/cv.pdf' }, { label: 'The record', href: '/#experience' }, { label: 'GitHub', href: 'https://github.com/emms204' },
      ],
    },
    {
      key: 'collaborator', label: 'Collaborator',
      headline: 'I write, draw and build. If you have an idea worth making, pitch it.',
      first: 'Writing, the margins, and the pencil layer switched on.',
      cta: { label: 'Pitch me an idea', href: '/sign/?path=collaborator#brief' },
      second: { label: "Read what I'm thinking", href: '/margins/' },
      start: [
        { label: 'Press: writing', href: '/press/' }, { label: 'Margins', href: '/margins/' },
        { label: 'Shelf: products', href: '/shelf/' }, { label: 'Work: case files', href: '/work/' }, { label: 'Commission: offers', href: '/commission/' },
      ],
    },
    {
      key: 'partner', label: 'Partner / investor',
      headline: 'Products and ventures in progress, from an engineer who builds them end to end.',
      first: 'Products first, then the build record.',
      cta: { label: 'Talk ventures', href: MAIL + '?subject=' + encodeURIComponent('Ventures: ') },
      second: { label: 'See the margins', href: '/margins/' },
      start: [
        { label: 'Shelf: products', href: '/shelf/' }, { label: 'Work: case files', href: '/work/' },
        { label: 'Margins', href: '/margins/' }, { label: 'Press: writing', href: '/press/' }, { label: 'Commission: offers', href: '/commission/' },
      ],
    },
  ] as Pathway[],
  acts: [
    { n: 'I', name: 'Sketch', line: 'The problem, in pencil.', body: 'The process as it is lived: inputs, hand-offs, where it breaks, and who has to answer for the result.' },
    { n: 'II', name: 'Ink', line: 'The system, drawn precisely.', body: 'The model proposes. Deterministic Python does the maths. Queues, idempotency and audit trails keep every run explainable.' },
    { n: 'III', name: 'Sign', line: 'A person approves.', body: 'Nothing that moves money or decides on compliance is final until a person signs it off.' },
  ],
  diagram: {
    caption: 'Reconciliation flow, product level, no client data.',
    flowTitle: 'SKETCH → INK → SIGN',
    boxes: [
      ['Bank', 'statement', ''], ['General', 'ledger', ''], ['Model proposes', 'the mapping', 'Gemini'],
      ['Python does', 'the maths', 'fuzzy + rules'], ['A person', 'approves', 'every resolution'], ['Audited', 'report', 'CSV · JSON · HTML'],
    ],
    rerun: 'versioned rerun',
    pencilToggle: 'Pencil layer',
    pencilNotes: [
      'Margin note: the model may sketch. It never signs.',
      'All money maths stays deterministic, in Python.',
      'A failed match goes to the dead-letter path and gets replayed.',
    ],
    label: 'Diagram: bank statement and general ledger feed a model that proposes the mapping; Python does the maths with fuzzy and rule-based matching; a person approves every resolution; the result is an audited CSV, JSON or HTML report. A versioned rerun loops back from approval to the maths step.',
  },
  caseFiles: [
    {
      slug: 'reconciliation', title: 'Bank reconciliation, signed by a person',
      context: 'MasteryHive AI · product level', period: 'Aug 2026 – present',
      summary: 'Banking reconciliation microservices and ReconPilot, an agentic copilot where the model proposes and a person approves.',
      sketch: 'Match bank statements to general-ledger transactions, and resolve what does not match in a way someone can stand behind.',
      ink: [
        'FastAPI microservices on GCP that match statements to general-ledger transactions through fuzzy, two-stage rule-based and LLM-assisted matching.',
        'Pub/Sub-fed parallel workers with a dead-letter replay path.',
        'ReconPilot: the LLM proposes schema mappings, explains evidence and orchestrates approved tools.',
        'All financial calculations stay deterministic in Python.',
      ],
      sign: [
        'Human approval of every mapping and resolution.',
        'Audit trail, a live Server-Sent Events tool timeline and versioned reruns.',
        'CSV, JSON and HTML reports.',
      ],
      figures: [], sealed: true, sealLabel: 'Approved by a person', diagram: true,
      retake: { first: null, changed: null, held: 'Money maths stays in deterministic Python, and a person approves every mapping and resolution.' },
      stack: ['Python', 'FastAPI', 'GCP', 'Pub/Sub', 'Gemini', 'React / TypeScript', 'SSE'],
      links: [],
    },
    {
      slug: 'merchant-onboarding', title: 'Merchant-onboarding AI for compliance review',
      context: 'Enzagroup Global · AI Software Engineer', period: 'Jan 2024 – Dec 2025',
      summary: 'Structured document extraction and agentic decision workflows that cut manual compliance review by 60%.',
      sketch: 'Merchant onboarding depended on manual compliance review of the documents merchants submitted.',
      ink: [
        'Merchant-onboarding AI that extracts structured data from submitted documents.',
        'Agentic document and decision workflows with CrewAI and LangGraph.',
        'Integrations with identity verification, CRM and internal microservices using FastAPI, async services and caching.',
        'Behavioural features and anomaly checks for risk scoring.',
        'AI workloads deployed on AWS (EKS, EC2, RDS) with monitoring and retraining triggers.',
      ],
      sign: ['Manual compliance review reduced by 60%.', 'Services ran at 99.9% availability.'],
      figures: [
        { value: '60%', label: 'less manual compliance review', source: 'CV; confirmed by Emmanuel, 18 Nov 2026' },
        { value: '99.9%', label: 'service availability on AWS', source: 'CV; confirmed by Emmanuel, 18 Nov 2026' },
      ],
      sealed: true, sealLabel: 'In production',
      retake: { first: null, changed: null, held: 'Production AI services on AWS EKS with monitoring and retraining triggers.' },
      stack: ['Python', 'FastAPI', 'CrewAI', 'LangGraph', 'AWS EKS / EC2 / RDS'],
      links: [],
    },
    {
      slug: 'voteriq-pipeline', title: 'A political-intelligence pipeline that survives bad runs',
      context: 'VoterIQ · AI Engineer · Remote', period: 'Mar 2026 – Jul 2026',
      summary: 'End-to-end pipeline with durable execution, idempotency and a seven-state job lifecycle.',
      sketch: 'Turn a stream of articles and social signals into ranked topics for analysts, without losing or duplicating work when a source fails.',
      ink: [
        'End-to-end pipeline: article ingestion, enrichment, social probing, ranking, database write-back.',
        'Durable execution with a Supabase-backed queue, idempotency and a seven-state job lifecycle: queued, claimed, running, completed, failed, deferred, dead-lettered.',
        'Tiered fallback and cooldown logic for run reliability.',
        'Weekly trend extraction and reranking for analysts.',
      ],
      sign: ['Every job ends in a known state, including deferred and dead-lettered.'],
      figures: [{ value: '7 states', label: 'in the job lifecycle', source: 'Verified in code (profile.md §3)' }],
      sealed: false,
      retake: { first: null, changed: null, held: 'Durable queueing, idempotency and an explicit seven-state job lifecycle.' },
      stack: ['Python', 'Supabase', 'LLM pipelines'],
      links: [],
    },
    {
      slug: 'fraud-compliance-reinsurance', title: 'Fraud, AML/KYC/KYB and reinsurance data',
      context: 'MasteryHive AI · product level', period: 'Aug 2026 – present',
      summary: 'Backends for transaction fraud detection, identity and business verification, and reinsurance data pipelines.',
      sketch: 'Catch fraudulent transactions as they happen, verify customers and businesses, and make reinsurance data usable.',
      ink: [
        'Transaction fraud detection backend, end to end, including a streaming service for real-time transaction monitoring.',
        'AML, KYC and KYB backend for identity, customer and business verification and compliance checks.',
        'Ingestion, cleaning and validation pipelines for reinsurance bordereaux and treaty data.',
      ],
      sign: ['Described at product level only: no client names, data or figures are published.'],
      figures: [], sealed: false,
      stack: ['Python', 'FastAPI', 'GCP', 'Streaming'],
      links: [],
    },
    {
      slug: 'grunsco-automate', title: 'Voice-of-customer automation with a Slack signature',
      context: 'Grunsco-Automate · open source', period: '',
      summary: 'Classifies reviews, drafts replies and waits for Slack approval before anything is sent.',
      sketch: 'Customer reviews pile up faster than a team can read, classify and answer them.',
      ink: [
        'n8n and FastAPI system that classifies reviews with OpenAI and Pydantic structured outputs plus regex guardrails.',
        'Drafts replies for Slack approval and escalates sensitive cases.',
        'Mines batch insights across reviews.',
      ],
      sign: ['Nothing is sent without Slack approval; sensitive cases are escalated.'],
      figures: [], sealed: true, sealLabel: 'Approved in Slack',
      stack: ['n8n', 'FastAPI', 'PostgreSQL', 'OpenAI', 'Pydantic', 'Slack'],
      links: [{ label: 'Repo', href: 'https://github.com/emms204/Grunsco-Automate' }],
    },
    {
      slug: 'devgenie', title: 'DevGenie: a multi-agent full-stack app generator',
      context: 'Personal project', period: 'Aug 2025 – Nov 2025',
      summary: 'Agents that generate React/Next.js frontends and FastAPI backends in parallel from a single prompt.',
      sketch: 'Go from one prompt to a working frontend and backend.',
      ink: ['Agents generate React/Next.js frontends and FastAPI backends in parallel from a single prompt, using typed structured outputs.'],
      sign: ['Public repository.'],
      figures: [], sealed: false,
      stack: ['Python', 'FastAPI', 'TypeScript', 'Next.js'],
      links: [{ label: 'Repo', href: 'https://github.com/emms204/DevGenie' }],
    },
    {
      slug: 'scriptgen', title: 'ScriptGen: stories that keep their bibles',
      context: 'Personal project', period: '',
      summary: 'A modular LLM pipeline that turns loglines into scenes while keeping character, plot and setting consistent.',
      sketch: 'LLM-written scenes drift: characters, plot and settings change between drafts.',
      ink: [
        'Modular LLM pipeline that turns loglines into scenes while maintaining character, plot and setting "bibles".',
        'ScreenplayWebApp: a FastAPI + Next.js web app around it.',
      ],
      sign: ['Character, plot and setting bibles carried across every generated scene.'],
      figures: [], sealed: false,
      stack: ['Python', 'LLMs', 'FastAPI', 'Next.js'],
      links: [
        { label: 'ScriptGen repo', href: 'https://github.com/emms204/ScriptGen' },
        { label: 'ScreenplayWebApp repo', href: 'https://github.com/emms204/ScreenplayWebApp' },
      ],
    },
    {
      slug: 'enza-chat', title: 'Enza Chat: from a RASA bot to real-time chat',
      context: 'Enzagroup Global', period: '2024 – 2025',
      summary: 'A RASA merchant-support chatbot (2024), followed by a real-time chat app on AWS Amplify (2025).',
      sketch: 'Merchants needed support answers, then a real-time chat channel.',
      ink: [
        'RASA merchant-support chatbot (2024).',
        'Real-time chat app on Next.js 15 and AWS Amplify with Cognito, AppSync GraphQL and DynamoDB (2025).',
      ],
      sign: ['Both repositories are public.'],
      figures: [], sealed: false,
      stack: ['RASA', 'Next.js 15', 'AWS Amplify', 'Cognito', 'AppSync', 'DynamoDB'],
      links: [
        { label: 'Chat app repo', href: 'https://github.com/emms204/enza-chat' },
        { label: 'Chatbot repo', href: 'https://github.com/emms204/Enzagroup-Chatbot' },
      ],
    },
  ] as CaseFile[],
  work: {
    title: 'Work',
    intro: 'Case files. Each one moves from sketch (the problem) to ink (the system) to sign (what was approved or shipped). MasteryHive work is shown at product level only.',
    cta: 'Have a process like this?',
    ctaLink: { label: 'Start a brief', href: '/sign/?path=client#brief' },
  },
  shelf: {
    title: 'Shelf',
    intro: 'Software I built that you can use today.',
    items: [
      {
        name: 'AnotiAI PII Masker', status: 'Live on PyPI', period: 'Nov 2025 – Mar 2026',
        description: 'A hybrid transformer, QA and rules-based PII detector with reversible masking (mask and unmask via a PII map), shipped as the anotiai-pii-masker Python SDK with cloud mode and local fallback, plus an API and web platform.',
        links: [{ label: 'PyPI', href: 'https://pypi.org/project/anotiai-pii-masker/' }, { label: 'Platform', href: 'https://platform.anotiai.com/' }],
        sealed: true, pending: 'Ownership/licensing terms and pricing, if any',
      },
      {
        name: 'WhoseDEV', status: 'Live', period: '',
        description: 'A privacy-first, local-first AI code editor and coding agent with sensitive-code masking, multi-model routing and bring-your-own API keys.',
        links: [{ label: 'whosedev.com', href: 'https://whosedev.com/' }],
        sealed: true, pending: 'Ownership/licensing terms and pricing, if any',
      },
    ],
    cta: 'Want to license or integrate one?',
  },
  commission: {
    title: 'Commission',
    intro: 'Five ways to work together. Scope and price are set per project: every offer is priced on request.',
    priceLabel: 'Pricing',
    price: 'On request',
    offerCta: 'Ask for a quote or scope',
    offers: [
      { key: 'sketch', name: 'Sketch session', kind: 'AI consulting and strategy', engagement: 'A short diagnostic that ends in a system sketch and a plan.', proof: 'The sketch stage of every case file' },
      { key: 'ink', name: 'Ink build', kind: 'Custom agents and automation', engagement: 'A fixed-scope build with sign-off gates.', proof: 'Reconciliation, onboarding AI, VoterIQ, Grunsco-Automate' },
      { key: 'embedded', name: 'Embedded engineer', kind: 'Contract or full-time', engagement: 'Retainer, contract or role.', proof: 'The CV, case files and GitHub' },
      { key: 'shelf', name: 'The Shelf', kind: 'Software I built', engagement: 'Try, integrate or license.', proof: 'AnotiAI PII Masker, WhoseDEV' },
      { key: 'press', name: 'Press', kind: 'Writing and courses', engagement: 'Essays and technical writing.', proof: 'The PyTorch computer-vision series' },
    ],
    processTitle: 'How a project runs',
    process: [
      { name: 'Sketch', detail: 'We map the process together and agree what "done" means and who signs it off.' },
      { name: 'Ink', detail: 'I build against that sketch in small, reviewable steps; the model drafts, code computes.' },
      { name: 'Sign', detail: 'You approve the result at each gate. Nothing ships without your signature.' },
    ],
    builderTitle: 'Commission builder',
    builderIntro: 'Turn a vague need into a clear brief. Send it by form, email or WhatsApp.',
  },
  press: {
    title: 'Press',
    intro: 'Essays and technical writing. External links open on Medium.',
    series: {
      title: 'From LeNet5 to ResNet50: An Exploration of the Evolution of Computer Vision Models Using PyTorch',
      where: 'Medium · @emmxyz12',
      note: 'A three-part series. Code for the models is on GitHub.',
      parts: [
        { part: 'Part 1', date: 'Mar 27, 2023', iso: '2023-03-27', topic: 'LeNet5 and AlexNet', href: 'https://medium.com/@emmxyz12/from-lenet5-to-resnet50-an-exploration-of-the-evolution-of-computer-vision-models-using-pytorch-d2dc1b9034f8' },
        { part: 'Part 2', date: 'Mar 30, 2023', iso: '2023-03-30', topic: 'VGGNet and GoogLeNet (Inception V1)', href: 'https://medium.com/@emmxyz12/from-lenet5-to-resnet50-an-exploration-of-the-evolution-of-computer-vision-models-using-pytorch-4aa26a16f832' },
        { part: 'Part 3', date: 'Mar 31, 2023', iso: '2023-03-31', topic: 'ResNet and ResNet50', href: 'https://medium.com/@emmxyz12/from-lenet5-to-resnet50-an-exploration-of-the-evolution-of-computer-vision-models-using-pytorch-a353b13e35e1' },
      ],
      code: { label: 'Code: emms204/Pytorch-CV-Models', href: 'https://github.com/emms204/Pytorch-CV-Models' },
    },
    profile: { label: 'All writing on Medium (@emmxyz12)', href: 'https://medium.com/@emmxyz12' },
    reply: 'Reply to an essay by email',
  },
  margins: {
    title: 'Margins',
    intro: 'Drafts, retakes, notes and ideas: the pencil layer of the site.',
    season: { title: 'This season', pending: 'What Emmanuel is reading, watching and playing now' },
    ideas: { title: 'Ideas drawer', pending: 'Three to five venture ideas Emmanuel is happy to share publicly' },
    retakes: { title: 'Retakes', intro: 'Every case file keeps a retake strip: first attempt, what changed, what held.' },
    pitch: { label: 'Pitch me an idea', href: '/sign/?path=collaborator#brief' },
  },
  sign: {
    title: 'Sign',
    intro: 'Send a brief, an idea or a role. Email, WhatsApp or the form below all reach me directly.',
    formTitle: 'Send a brief',
    sent: 'Sent. Thank you, I will reply by email.',
    failed: 'The form could not send. Your email app will open with the brief instead; or email me directly.',
    fields: {
      name: 'Your name', email: 'Your email', topic: 'What is this about?',
      message: 'The brief', messageHint: 'What is the process, where does it hurt today, and who has to sign off on the result?',
      submit: 'Send the brief', whatsapp: 'Send on WhatsApp instead', mail: 'Or email',
    },
    topics: [
      { value: 'client', label: 'A project (sketch session or build)' },
      { value: 'employer', label: 'A role' },
      { value: 'customer', label: 'A product on the Shelf' },
      { value: 'collaborator', label: 'An idea or collaboration' },
      { value: 'partner', label: 'A venture or partnership' },
    ],
  },
  archive: {
    title: 'Archive',
    intro: 'Earlier computer-vision and full-stack work carried over from the previous site.',
    items: [
      ...profile.projects.earlier.items,
      { name: 'Chatflow', description: 'Full-stack real-time chat app: FastAPI backend, Next.js frontend, WebSocket messaging, PostgreSQL, Redis pub/sub and JWT auth.', href: 'https://github.com/emms204/Chatflow' },
      { name: 'Pytorch-CV-Models', description: 'PyTorch implementations of the models in the LeNet5-to-ResNet50 series.', href: 'https://github.com/emms204/Pytorch-CV-Models' },
    ],
  },
  notFound: {
    title: 'Take two',
    body: 'This page did not make it past the sketch. Try again from the cover.',
  },
  footer: { note: 'Drafted with AI. Checked in code. Signed by a person. No trackers, no cookies.' },
};
