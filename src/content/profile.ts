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
 * products (fraud, AML/KYC/KYB, reconciliation incl. an agentic copilot, reinsurance
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
          'Reconciliation copilot: built an agentic copilot where the LLM proposes mappings and explains evidence, money maths stays deterministic in Python, and humans approve every resolution.',
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
        name: 'Agentic reconciliation copilot',
        tagline: 'MasteryHive product',
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
    about: '§2 Summary; §3 MasteryHive (reconciliation copilot) + VoterIQ (seven-state lifecycle, verified); §5 Skills; §5 Education',
    experience: '§3 Experience (all five roles) + Emmanuel via Grok Bot, Nov 18 (VoterIQ dates/Remote, MasteryHive ownership + reinsurance, Enzagroup 99.9%/60%, VoterIQ title + reinsurance wording aligned to CV); other §6 metrics and §7 location conflicts withheld',
    projects: '§4 Portfolio projects 1–8 (links that returned 200); reconciliation copilot unnamed, without link; AnotiAI dates per Emmanuel via Grok Bot, Nov 18',
    skills: '§5 Skills (Languages, LLM and agents, Applied ML, LLM training/eval, Backend, Infra/MLOps)',
    cv: 'Brief: /cv.pdf (PDF supplied separately)',
    contact: '§1 Contact info (email, LinkedIn) and §1 note (GitHub); phone and X omitted. WhatsApp link https://wa.me/2349030612170 per Emmanuel via Grok Bot, Nov 18 (number not printed)',
    offers: 'Offer names/engagements: concept Page "Sketch · Ink · Sign" (Emmanuel-chosen offer types, 18 Nov). Pricing and scope: "On request" for every offer, no prices: Emmanuel via Grok Bot, Nov 18 5:17 PM',
    whatsappHours: 'No set reply hours; no hours restriction shown anywhere: Emmanuel via Grok Bot, Nov 18 5:17 PM',
    quotes: 'No client quotes or testimonials exist; section not rendered (config SHOW_QUOTES=false): Emmanuel via Grok Bot, Nov 18 5:17 PM',
    press: 'Medium series by @emmxyz12, read 18 Nov 2026 via WebFetch: Part 1 (title has no part number; Part 2 calls it "the first part"), Mar 27 2023; Part 2, Mar 30 2023; Part 3, Mar 31 2023. Topics per the pages (Part 1 LeNet5 + AlexNet, Part 2 VGGNet + GoogLeNet/Inception V1, Part 3 ResNet/ResNet50). Code repo github.com/emms204/Pytorch-CV-Models is linked from the articles',
    archive: 'Earlier CV repos: profile.md §4.8. Chatflow: live emms204.github.io description, read 18 Nov 2026 (kept per concept Page "every working link")',
    works: 'THE WORKS slice (IMPL-20261118-02): hero, entry question, three dimensions and the accountable-AI supporting line from the external creative audit chosen by Emmanuel (via Grok Bot, Nov 18 8:56 PM). Offer names: the same audit (AI Strategy & Architecture, Custom AI Systems, Product Engineering, Engineering Collaboration); offer contents re-use only verified case-file facts above; engagement steps and pricing "On request" (no verified engagement process). Products: profile.md §4.2–4.4, §4.7. Outside work allowed by contract: Emmanuel via Grok Bot, Nov 18',
    proofBench: 'Proof Bench: SYNTHETIC data written for the illustration (bank line ACME SVCS / Invoice 1042 / $1,250.00 and ledger INV-1042 / ACME SERVICES / $1,250.00 from the brief; Globex example invented as synthetic test data, not a client). Pattern (model proposes, deterministic code checks, a person approves) per profile.md §3 product-level description; no product or company named in the demo',
    heroLines: 'Hero lines "AI systems. Software products. Stories worth telling." ("Business ideas" dropped; collaborate intent sub-line softened from "Ventures"): Emmanuel via Grok Bot, Nov 18 9:42 PM. Share image og.png regenerated for THE WORKS at the same time',
    formspree: 'Formspree endpoint https://formspree.io/f/xjywrjrz: Emmanuel via Grok Bot, Nov 18 9:00 PM',
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
      summary: 'Banking reconciliation microservices and an agentic copilot where the model proposes and a person approves.',
      sketch: 'Match bank statements to general-ledger transactions, and resolve what does not match in a way someone can stand behind.',
      ink: [
        'FastAPI microservices on GCP that match statements to general-ledger transactions through fuzzy, two-stage rule-based and LLM-assisted matching.',
        'Pub/Sub-fed parallel workers with a dead-letter replay path.',
        'The copilot: the LLM proposes schema mappings, explains evidence and orchestrates approved tools.',
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
        { value: '60%', label: 'less manual compliance review', source: 'CV' },
        { value: '99.9%', label: 'service availability on AWS', source: 'CV' },
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
    ctaLink: { label: 'Start a brief', href: '/contact/?intent=build#inquiry' },
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
    pitch: { label: 'Pitch me an idea', href: '/contact/?intent=collaborate#inquiry' },
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
    title: 'You’ll never walk alone.', // title phrase only, no lyrics (Emmanuel, 19 Nov 2026)
    body: 'Here’s the way back.',
  },
  footer: { note: 'Drafted with AI. Checked in code. Signed by a person. No trackers, no cookies.' },
};

/* =====================================================================
 * THE WORKS (IMPL-20261118-02 vertical slice). Same fact rules; see
 * sources.works / sources.proofBench / sources.formspree above.
 * ===================================================================== */

export type IntentKey = 'build' | 'products' | 'hire' | 'collaborate';

/** Old ?path= values from the Sketch·Ink·Sign cover, mapped onto the new intents. */
export const PATH_TO_INTENT: Record<string, IntentKey> = {
  client: 'build', customer: 'products', employer: 'hire', collaborator: 'collaborate', partner: 'collaborate',
  build: 'build', products: 'products', hire: 'hire', collaborate: 'collaborate',
};

export const worksNav: Link[] = [
  { label: 'The Works', href: '/' },
  { label: 'Solutions', href: '/solutions/' },
  { label: 'Work', href: '/work/' },
  { label: 'Products', href: '/products/' },
  { label: 'Journal', href: '/journal/' },
  { label: 'Letters', href: '/letters/' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/contact/' },
  { label: 'CV', href: '/cv.pdf' },
];

const ask = (intent: IntentKey) => `/contact/?intent=${intent}#inquiry`;

export const works = {
  meta: {
    title: 'Emmanuel Osanebi — The Works: AI systems and software products',
    description: 'Emmanuel Osanebi, AI Engineer. I make difficult things useful: AI systems, software products, and production agents and automation. AI drafts, Python checks, a person signs.',
    ogAlt: 'Emmanuel Osanebi — THE WORKS. I make difficult things useful.',
  },
  hero: {
    name: 'Emmanuel Osanebi',
    title: 'The Works',
    statement: 'I make difficult things useful.',
    // Hero wording pending Emmanuel's approval (works-v4 preview, Nov 19 2026): third line was 'Stories worth telling.'
    lines: ['AI systems.', 'Software products.', 'Production agents and automation.'],
    support: 'AI drafts, Python checks, a person signs.',
    supportNote: 'The rule behind the systems: the model proposes, deterministic code checks the numbers, and a person approves anything that matters.',
    role: 'AI Engineer · MasteryHive AI · Python / FastAPI · LLM agents and automation',
    jump: { label: 'Step through the Proof Bench', href: '#proof-bench' },
    offer: 'AI engineer building production LLM agents, automation and compliance AI (Python, FastAPI).',
    cta: { label: 'See what I can build for you', href: '/solutions/' },
    cta2: { label: 'Start an inquiry', href: '/contact/#inquiry' },
  },
  // Living System (works-v4): a conceptual illustration that reuses the Proof Bench's
  // synthetic Example A / Example B. Values are computed from works.bench at build time.
  living: {
    kicker: 'Conceptual illustration',
    title: 'One decision, four steps.',
    note: 'Synthetic data from the Proof Bench. Not a live system.',
    steps: [
      { key: 'input', name: 'Input', line: 'A bank line and a ledger entry arrive.' },
      { key: 'interpret', name: 'Interpret', line: 'The model reads both and proposes a match, with reasons. It does not decide.' },
      { key: 'verify', name: 'Verify', line: 'Python checks amount, reference and date. Same input, same answer.' },
      { key: 'decide', name: 'Decide', line: 'Only a verified match reaches a person, who signs it off.' },
    ],
    pass: { label: 'Pass', verdict: 'All three checks pass. A person approves (simulated).' },
    reject: { label: 'Rejected', verdict: 'Rejected at Verify. It never reaches the approver.' },
    choose: 'Show a result',
    more: { label: 'Step through it on the Proof Bench', href: '#proof-bench' },
    step: 'Step through it on the Proof Bench',
    stepNote: 'The same two examples, one step at a time, with the checks shown.',
  },
  // Visual engineering journey (works-v4). Every era, date and employer is taken from the CV
  // (public/cv.pdf) and the experience items above; no metrics beyond those already shown on the site.
  journey: {
    kicker: 'The engineering journey',
    title: 'From perception to accountability',
    intro: 'Five roles since 2021, read by the kind of problem each one solved. Pick a theme to follow it across the years.',
    note: 'A thematic reading of the CV, not a claim that each era replaced the last. Omdena and Cali overlapped in 2022.',
    imageNote: 'Photos are reference images of the kind of material each era worked with, all taken from Wikimedia Commons. Three are Commons copies of originals held by the Library of Congress, the University of North Texas Libraries and the Chapel Hill Historical Society. They are not from my projects.',
    allWork: { label: 'All case files', href: '/work/' },
    all: 'All themes',
    themes: [
      { key: 'training', label: 'Model training' },
      { key: 'agents', label: 'Agents' },
      { key: 'documents', label: 'Documents' },
      { key: 'pipelines', label: 'Data pipelines' },
      { key: 'reliability', label: 'Reliability' },
      { key: 'compliance', label: 'Verification and compliance' },
    ],
    eras: [
      {
        key: 'perception', name: 'Perception', years: '2021–22', period: 'Jul 2021 – Dec 2022', org: 'Omdena', role: 'Machine Learning Engineer',
        question: 'Can a model see what an inspector sees?',
        facts: ['Weld-defect detection and classification model, plus APIs for training and retraining.', 'Dataset collection and annotation for multi-label, attention-based classification of GESI content.'],
        themes: ['training', 'pipelines'], links: [{ label: 'Earlier computer-vision work', href: '/archive/' }],
        image: 'perception', alt: 'Macro photo of an aluminium TIG weld bead, labelled weld bead, etched zone and prior metal finish.',
      },
      {
        key: 'language', name: 'Language', years: '2022–23', period: 'Jul 2022 – Dec 2023', org: 'Cali', role: 'AI Engineer',
        question: 'Can a model answer from the documents, not from memory?',
        facts: ['LLM backends and multi-agent workflows for large-scale text analysis.', 'RAG pipeline with LlamaIndex and OpenAI for document analysis.', 'Python and Node.js backend services for AI inference.'],
        themes: ['agents', 'documents'], links: [],
        image: 'language', alt: 'A printed page of text from an early edition of Euclid\'s Elements, with geometric diagrams in the margin.',
      },
      {
        key: 'application', name: 'Application', years: '2024–25', period: 'Jan 2024 – Dec 2025', org: 'Enzagroup Global', role: 'AI Software Engineer',
        question: 'Can AI sit inside a real onboarding workflow?',
        facts: ['Merchant-onboarding AI: structured document extraction that reduced manual compliance review by 60%.', 'Agentic document and decision workflows with CrewAI and LangGraph.', 'Identity verification, CRM and microservice integrations; AWS deployment with monitoring and retraining triggers.'],
        themes: ['documents', 'agents', 'compliance', 'reliability', 'training'], links: [],
        image: 'application', alt: 'A blank government application form with boxes for personal details.',
      },
      {
        key: 'orchestration', name: 'Orchestration', years: '2026', period: 'Mar 2026 – Jul 2026', org: 'VoterIQ', role: 'AI Engineer',
        question: 'What happens to a run when a source fails?',
        facts: ['End-to-end pipeline: article, enrichment, social probe, ranking, database write-back.', 'Tiered fallback and cooldown logic for run reliability.', 'Durable queueing, idempotency and a seven-state job lifecycle.'],
        themes: ['pipelines', 'reliability', 'agents'], links: [],
        image: 'orchestration', alt: 'Stacks of old printed newspapers piled in a storeroom.',
      },
      {
        key: 'accountability', name: 'Accountability', years: '2026–now', period: 'Aug 2026 – Present', org: 'MasteryHive AI', role: 'AI Engineer',
        question: 'Who signs off when money is involved?',
        facts: ['AI backends for fraud detection and AML / KYC / KYB checks.', 'Banking reconciliation: fuzzy, rule-based and LLM-assisted matching; money maths stays in deterministic Python and a person approves every resolution.', 'Ingestion, cleaning and validation pipelines for reinsurance data.'],
        themes: ['compliance', 'reliability', 'pipelines', 'agents'], links: [],
        image: 'accountability', alt: 'A handwritten page from an old general-store account ledger, with columns of amounts.',
      },
    ],
    credits: [
      { image: 'perception', title: 'TIG Weld low magnification', author: 'Dr. Crash, via Wikimedia Commons', license: 'Public domain', href: 'https://commons.wikimedia.org/wiki/File:TIG_Weld_low_magnification.jpg' },
      { image: 'language', title: 'Geometric diagrams in margins of text of first printed edition of Euclid\'s Elements', author: 'Library of Congress, via Wikimedia Commons', license: 'Public domain', href: 'https://commons.wikimedia.org/wiki/File:Geometric_diagrams_in_margins_of_text_of_first_printed_edition_of_Euclid%27s_%22Elements,%22_which_they_illus.-_2_diagrams_of_text_(page_headed_%22II%22)_LCCN2005683646.jpg' },
      { image: 'application', title: 'Passport application form blank Russia', author: 'Rakoon, via Wikimedia Commons', license: 'CC0', href: 'https://commons.wikimedia.org/wiki/File:Passport_application_form_blank_Russia.jpg' },
      { image: 'orchestration', title: '(Stack of Newspapers)', author: 'William Hicks, University of North Texas Libraries, via Wikimedia Commons', license: 'CC BY 4.0', licenseHref: 'https://creativecommons.org/licenses/by/4.0/', href: 'https://commons.wikimedia.org/wiki/File:(Stack_of_Newspapers)_-_DPLA_-_0b25c96090a717cc43076ab977d3be51.jpg' },
      { image: 'accountability', title: 'Patterson\'s General Store Ledger (page 406)', author: 'Patterson\'s General Store; Chapel Hill Historical Society, via Wikimedia Commons', license: 'Public domain', href: 'https://commons.wikimedia.org/wiki/File:Patterson%27s_General_Store_Ledger_-_DPLA_-_0079e562a497df98da2b2bf6a5740d22_(page_406).jpg' },
    ] as { image: string; title: string; author: string; license: string; licenseHref?: string; href: string }[],
  },
  intents: {
    question: 'What brings you here?',
    hint: 'Pick one. The work and the next step below change with it.',
    items: [
      {
        key: 'build', label: 'Solve a problem', sub: 'I need something built',
        headline: 'Bring the difficult process. I design the system and build it, with a person signing off where it matters.',
        evidenceTitle: 'Work for builders',
        evidence: [
          { label: 'Bank reconciliation, signed by a person', note: 'MasteryHive AI: the model proposes, Python computes, a person approves', href: '/work/reconciliation/' },
          { label: 'Merchant-onboarding AI', note: 'Enzagroup Global: 60% less manual compliance review', href: '/work/merchant-onboarding/' },
          { label: 'A pipeline that survives bad runs', note: 'VoterIQ: tiered fallbacks and a seven-state job lifecycle', href: '/work/voteriq-pipeline/' },
          { label: 'Fraud, AML/KYC/KYB and reinsurance data', note: 'MasteryHive AI: compliance backends and data pipelines', href: '/work/fraud-compliance-reinsurance/' },
          { label: 'Voice-of-customer automation with a Slack signature', note: 'Structured outputs, guardrails, a person signs in Slack', href: '/work/grunsco-automate/' },
        ],
        next: { label: 'Describe the problem', href: ask('build') },
        second: { label: 'See the four ways to work together', href: '/solutions/' },
      },
      {
        key: 'products', label: 'Explore products', sub: 'Software you can use or study',
        headline: 'Products I built: a PII-masking SDK, a privacy-first code editor, and two open-source generators.',
        evidenceTitle: 'Products on the bench',
        evidence: [
          { label: 'AnotiAI PII Masker', note: 'Live on PyPI as anotiai-pii-masker', href: '/products/#anotiai-pii-masker' },
          { label: 'WhoseDEV', note: 'Live at whosedev.com', href: '/products/#whosedev' },
          { label: 'DevGenie', note: 'Public repo: one prompt, frontend and backend in parallel', href: '/products/#devgenie' },
          { label: 'ScriptGen', note: 'Public repo: loglines to scenes that keep their bibles', href: '/products/#scriptgen' },
        ],
        next: { label: 'Browse the products', href: '/products/' },
        second: { label: 'Ask about using one', href: ask('products') },
      },
      {
        key: 'hire', label: 'Hire / evaluate engineering', sub: 'Roles, contracts, due diligence',
        headline: 'An AI engineer who ships production agents, compliance AI, and the plumbing that keeps them honest.',
        evidenceTitle: 'For evaluators',
        evidence: [
          { label: 'The CV (PDF)', note: 'Roles, projects and education', href: '/cv.pdf' },
          { label: 'The engineering journey', note: 'Five roles since 2021, current: MasteryHive AI', href: '/#journey' },
          { label: 'All case files', note: 'Stack, verified figures and how each project ran', href: '/work/' },
          { label: 'GitHub', note: 'Public repositories', href: 'https://github.com/emms204' },
        ],
        next: { label: 'Download the CV', href: '/cv.pdf' },
        second: { label: 'Talk about a role or contract', href: ask('hire') },
      },
      {
        key: 'collaborate', label: 'Explore an idea / collaborate', sub: 'Writing, stories, new projects',
        headline: 'I write, build and tell stories. If you have an idea worth making, bring it.',
        evidenceTitle: 'Where the creative work lives',
        evidence: [
          { label: 'Letters', note: 'Essays written as letters to a friend', href: '/letters/' },
          { label: 'Story Engine', note: 'The ScriptGen approach, tried on a fictional scene', href: '#story-engine' },
          { label: 'Journal: From LeNet5 to ResNet50', note: 'Three-part series on Medium', href: '/journal/' },
        ],
        next: { label: 'Pitch an idea', href: ask('collaborate') },
        second: { label: 'Read the Journal', href: '/journal/' },
      },
    ] as { key: IntentKey; label: string; sub: string; headline: string; evidenceTitle: string; evidence: { label: string; note: string; href: string }[]; next: Link; second: Link }[],
  },
  bench: {
    kicker: 'Proof Bench',
    title: 'Watch a check catch a mistake.',
    lede: 'A four-step reconciliation, the way I build them: the model proposes, deterministic code verifies, a person approves.',
    disclaimer: 'Synthetic data. Not a live system, and not client data.',
    steps: ['Input', 'Propose', 'Verify', 'Approve'],
    stepLines: [
      'Two records arrive: one line from a bank statement, one entry in the ledger.',
      'The model reads both and proposes a match, with its reasons. It does not decide.',
      'Deterministic code checks amount, reference and date. Same input, same answer, every time.',
      'A person signs off. Nothing posts until they do, and a failed check never reaches them as a match.',
    ],
    rules: { amount: 'Amount: equal to the cent', reference: 'Reference: same invoice number after normalising', date: 'Date: within 3 days' },
    cases: [
      {
        key: 'a', label: 'Example A', tag: 'clean match',
        bank: { source: 'Bank statement line', payee: 'ACME SVCS', ref: 'Invoice 1042', amount: 125000, date: '2026-11-14' },
        ledger: { source: 'Ledger entry', payee: 'ACME SERVICES', ref: 'INV-1042', amount: 125000, date: '2026-11-13' },
        reasons: ['"ACME SVCS" reads as an abbreviation of "ACME SERVICES".', 'Both mention invoice 1042.', 'Amounts look the same.'],
        approve: { action: 'Approve as a person', done: 'Simulated approval. In production this is written to an audit trail.', pending: 'Waiting for a person to approve.' },
      },
      {
        key: 'b', label: 'Example B', tag: 'amount mismatch',
        bank: { source: 'Bank statement line', payee: 'GLOBEX LTD', ref: 'Inv 2207', amount: 480000, date: '2026-11-12' },
        ledger: { source: 'Ledger entry', payee: 'GLOBEX LIMITED', ref: 'INV-2207', amount: 408000, date: '2026-11-12' },
        reasons: ['"GLOBEX LTD" and "GLOBEX LIMITED" look like the same company.', 'Both mention invoice 2207.', 'The amounts look close.'],
        approve: { action: '', done: '', pending: 'Blocked: verification failed, so there is nothing to sign. The pair goes to the exception queue with the reason attached.' },
      },
    ],
    back: 'Back', next: 'Next', restart: (other: string) => `Run ${other}`,
    audit: { title: 'Simulated audit-log entry', note: 'Demo only: shown on this page, never saved or sent.', when: 'Time', example: 'Pair', checks: 'Checks', decision: 'Decision', decided: 'approved', approver: 'Approver', who: 'you (demo)' },
  },
  pieces: {
    title: 'Two more pieces to try',
    items: [
      { key: 'product', label: 'Product', href: '#privacy-lens' },
      { key: 'creative', label: 'Creative', href: '#story-engine' },
    ],
    names: ['Privacy Lens', 'Story Engine'],
  },
  lens: {
    kicker: 'Product · AnotiAI',
    title: 'Privacy Lens',
    lede: 'Pick or edit a message. Personal details are found and swapped for tokens, and a PII map keeps the originals so they can be restored.',
    flag: 'Illustration, not the AnotiAI SDK.',
    flagNote: 'Simple front-end rules on synthetic text. Nothing leaves your browser.',
    samplesLabel: 'Synthetic samples',
    textLabel: 'Text to mask (synthetic, editable)',
    before: 'Before', after: 'After', mapTitle: 'PII map', none: 'No entities found by these rules.',
    samples: [
      { key: 'ticket', label: 'Support ticket', text: 'SYNTHETIC. Ms. Ada Testcase (ada.testcase@example.com, +1 555 0100) reports that account ACCT-0000-1111 was charged twice on 03 Feb 2031.' },
      { key: 'kyc', label: 'Onboarding note', text: 'SYNTHETIC. Mr. Bo Placeholder, born 1990-01-01, asked to change the payout account to GB00 TEST 0000 0000 0000 00. Call +44 7700 900123.' },
      { key: 'reply', label: 'Email draft', text: 'SYNTHETIC. Hi Dr. Cy Fictional, your refund for 15 Mar 2031 is approved. Questions: refunds@example.org.' },
    ],
    pypi: { label: 'The real SDK on PyPI: anotiai-pii-masker', href: 'https://pypi.org/project/anotiai-pii-masker/' },
    more: { label: 'Product page', href: '/products/#anotiai-pii-masker' },
  },
  story: {
    kicker: 'Creative · ScriptGen',
    title: 'Story Engine',
    lede: 'One character, one rule in her bible, one scene, two ways it could go. The check reads each draft against the bible.',
    flag: 'Illustration of the ScriptGen approach.',
    flagNote: 'An original, fictional character written for this page. Not generated live.',
    bibleTitle: 'Character bible',
    character: 'Wren Calloway, keeper of the Saltmarsh light (fictional).',
    rules: [
      { id: 'C1', text: 'Wren cannot swim. She never goes into deep water.' },
      { id: 'P1', text: 'The lamp must be lit by nightfall.' },
    ],
    sceneTitle: 'Scene',
    scene: 'Dusk. A child\'s skiff drifts past the rocks, out of reach.',
    choose: 'Pick a branch',
    branches: [
      { key: 'keep', label: 'Branch A', text: 'Wren ties the rescue line to the railing, throws it from the jetty and hauls the skiff in. She climbs the stairs and lights the lamp as the sun goes.',
        results: [{ id: 'C1', ok: true, why: 'She stays on the jetty; no deep water.' }, { id: 'P1', ok: true, why: 'Lamp lit at nightfall.' }],
        verdict: 'Consistent with the bible.' },
      { key: 'break', label: 'Branch B', text: 'Wren kicks off her boots, dives off the rocks and swims out to the skiff, towing it back as the lamp comes on behind her.',
        results: [{ id: 'C1', ok: false, why: 'She dives in and swims: the bible says she cannot.' }, { id: 'P1', ok: true, why: 'Lamp lit at nightfall.' }],
        verdict: 'Flagged: breaks rule C1. This draft goes back for a rewrite.' },
    ],
    repo: { label: 'ScriptGen on GitHub', href: 'https://github.com/emms204/ScriptGen' },
    more: { label: 'Case file', href: '/work/scriptgen/' },
  },
  dimensions: {
    title: 'Three minds, one bench',
    items: [
      { key: 'commercial', name: 'Commercial', line: 'Useful to someone who pays for it.', body: 'Offers built from shipped work, and products people can install today.', links: [{ label: 'Solutions', href: '/solutions/' }, { label: 'Products', href: '/products/' }] },
      { key: 'engineering', name: 'Engineering', line: 'Correct when nobody is watching.', body: 'Durable queues, idempotency, deterministic maths and audit trails behind every model call.', links: [{ label: 'Work', href: '/work/' }, { label: 'Proof Bench', href: '#proof-bench' }] },
      { key: 'creative', name: 'Creative', line: 'Worth reading, worth telling.', body: 'Technical writing, and tools for stories that keep their characters straight.', links: [{ label: 'Journal', href: '/journal/' }, { label: 'ScriptGen', href: '/work/scriptgen/' }] },
    ],
  },
  howItRan: {
    title: 'How a project ran',
    note: 'Sketch, Ink, Sign is how each case file explains a project: the problem, the system, and what a person approved or shipped.',
  },
  selected: { title: 'Selected work', all: 'All case files', archive: 'Earlier work in the archive' },
  record: { title: 'About', cv: 'Download the CV (PDF)' },
  contact: { title: 'Start something', body: 'Tell me what you are trying to make useful. Email, WhatsApp or the short scoping form all reach me directly.', form: 'Open the scoping form', whatsapp: 'WhatsApp' },
  solutions: {
    title: 'Solutions',
    intro: 'Four ways to work together, each built from work I have already shipped. Scope, engagement and price are set per project: all on request.',
    getsLabel: 'What you get', behindLabel: 'The work behind it', exampleLabel: 'Example deliverable', prereqLabel: 'Typically needed from you', priceLabel: 'Pricing', price: 'On request',
    offers: [
      {
        key: 'strategy', n: '01', name: 'AI Strategy & Architecture', for: 'For teams deciding where AI belongs and where it must not decide alone.',
        gets: [
          'A system design that splits the work: the model maps, explains and orchestrates tools; deterministic code does the maths; a person approves.',
          'Execution design that survives failure: durable queues, idempotency and explicit job lifecycles.',
        ],
        example: 'Typically an architecture diagram that marks what the model proposes, what code computes and what a person approves, with feasibility notes on failure handling and a phased build plan.',
        prereqs: 'Typically a walk-through of the current process and its hand-offs, a few sample inputs, and the name of whoever signs off on the result.',
        basis: ['reconciliation: model proposes, deterministic Python computes, a person approves', 'voteriq-pipeline: durable queue, idempotency, seven-state job lifecycle'],
        behind: [{ label: 'Bank reconciliation, signed by a person', href: '/work/reconciliation/' }, { label: 'A pipeline that survives bad runs', href: '/work/voteriq-pipeline/' }],
        cta: { label: 'Ask about an architecture review', href: ask('build') },
      },
      {
        key: 'systems', n: '02', name: 'Custom AI Systems', for: 'For a process that is slow, manual or risky today.',
        gets: [
          'LLM agents and automation in Python and FastAPI, with structured outputs and guardrails.',
          'Human approval built in: drafts wait for sign-off, sensitive cases escalate.',
          'Production deployment with monitoring and retraining triggers.',
        ],
        example: 'Typically a working Python / FastAPI service that turns documents or messages into structured outputs, waits for a person to approve (for example in Slack) and runs with monitoring.',
        prereqs: 'Typically sample documents or records, access to the systems it connects to (such as identity verification or a CRM), and a named approver.',
        basis: ['merchant-onboarding: structured document extraction; identity verification, CRM and microservice integrations; AWS with monitoring and retraining triggers', 'grunsco-automate: Pydantic structured outputs, regex guardrails, Slack approval, escalation'],
        behind: [{ label: 'Merchant-onboarding AI (60% less manual review)', href: '/work/merchant-onboarding/' }, { label: 'Voice-of-customer automation with a Slack signature', href: '/work/grunsco-automate/' }, { label: 'Fraud, AML/KYC/KYB and reinsurance data', href: '/work/fraud-compliance-reinsurance/' }],
        cta: { label: 'Describe the process', href: ask('build') },
      },
      {
        key: 'product', n: '03', name: 'Product Engineering', for: 'For an AI product that has to ship, not just demo.',
        gets: [
          'An SDK, an API and a web app around the model, the way the PII Masker shipped to PyPI.',
          'Full-stack builds on FastAPI and Next.js, through to real-time apps on AWS Amplify.',
        ],
        example: 'Typically an installable SDK and an API around the model, plus a web app, the way the PII Masker shipped to PyPI with a cloud mode and local fallback.',
        prereqs: 'Typically a defined user and use case, the model or data it builds on, and where it has to run (cloud, local or both).',
        basis: ['products / anotiai-pii-masker: Python SDK on PyPI, cloud mode and local fallback, API and web platform', 'scriptgen: FastAPI + Next.js web app', 'enza-chat: Next.js 15 on AWS Amplify'],
        behind: [{ label: 'Products: AnotiAI PII Masker, WhoseDEV, DevGenie, ScriptGen', href: '/products/' }, { label: 'Enza Chat: from a RASA bot to real-time chat', href: '/work/enza-chat/' }],
        cta: { label: 'Talk about your product', href: ask('build') },
      },
      {
        key: 'collab', n: '04', name: 'Engineering Collaboration', for: 'For a team that needs another AI engineer: contract or role.',
        gets: [
          'An engineer with five roles since 2021 across fraud, compliance, reconciliation, pipelines and computer vision.',
          'Async collaboration and code review, in startup environments.',
        ],
        example: 'Typically reviewed pull requests in your repository: features, pipelines or services shipped through your team\'s own review process.',
        prereqs: 'Typically repository access, your review conventions and one point of contact.',
        basis: ['CV / profile: async collaboration and code review in startup environments; five roles since 2021'],
        behind: [{ label: 'The CV (PDF)', href: '/cv.pdf' }, { label: 'All case files', href: '/work/' }],
        cta: { label: 'Talk about a role or contract', href: ask('hire') },
      },
    ],
    moved: { from: 'Commission', note: 'The Commission page is now Solutions.' },
  },
  products: {
    title: 'Products',
    intro: 'Software I built that you can install, try or read the source of. Each one is drawn as the path its data takes.',
    cta: 'Want to integrate, license or extend one?', ctaLink: { label: 'Ask about a product', href: ask('products') },
    items: [
      { id: 'anotiai-pii-masker', name: 'AnotiAI PII Masker', status: 'Live on PyPI', period: 'AnotiAI · Nov 2025 – Mar 2026',
        body: 'A hybrid transformer, QA and rules-based PII detector with reversible masking, shipped as a Python SDK with cloud mode and local fallback, plus an API and web platform.',
        flow: [['Text in', ''], ['Detect', 'transformer + QA + rules'], ['Mask', 'keeps a PII map'], ['Unmask', 'when allowed']],
        links: [{ label: 'PyPI: anotiai-pii-masker', href: 'https://pypi.org/project/anotiai-pii-masker/' }, { label: 'Platform', href: 'https://platform.anotiai.com/' }] },
      { id: 'whosedev', name: 'WhoseDEV', status: 'Live', period: 'AnotiAI',
        body: 'A privacy-first, local-first AI code editor and coding agent with sensitive-code masking, multi-model routing and bring-your-own API keys.',
        flow: [['Your code', 'stays local'], ['Mask', 'sensitive code'], ['Route', 'multi-model'], ['Your keys', 'BYO']],
        links: [{ label: 'whosedev.com', href: 'https://whosedev.com/' }] },
      { id: 'devgenie', name: 'DevGenie', status: 'Public repo', period: 'Aug 2025 – Nov 2025',
        body: 'Agents that generate React/Next.js frontends and FastAPI backends in parallel from a single prompt, using typed structured outputs.',
        flow: [['One prompt', ''], ['Frontend agent', 'React / Next.js'], ['Backend agent', 'FastAPI, in parallel'], ['Typed outputs', 'structured']],
        links: [{ label: 'Repo: emms204/DevGenie', href: 'https://github.com/emms204/DevGenie' }], caseFile: '/work/devgenie/' },
      { id: 'scriptgen', name: 'ScriptGen', status: 'Public repo', period: '',
        body: 'A modular LLM pipeline that turns loglines into scenes while maintaining character, plot and setting "bibles", with a FastAPI + Next.js web app.',
        flow: [['Logline', ''], ['Bibles', 'character, plot, setting'], ['Scenes', 'checked against the bibles'], ['Web app', 'FastAPI + Next.js']],
        links: [{ label: 'Repo: emms204/ScriptGen', href: 'https://github.com/emms204/ScriptGen' }, { label: 'Repo: ScreenplayWebApp', href: 'https://github.com/emms204/ScreenplayWebApp' }], caseFile: '/work/scriptgen/' },
    ],
    moved: { from: 'Shelf', note: 'The Shelf is now Products.' },
  },
  journal: {
    title: 'Journal',
    intro: 'Writing. External links open on Medium.',
    moved: { from: 'Press', note: 'Press is now the Journal.' },
  },
  inquiry: {
    title: 'Start something',
    intro: 'Pick what brings you here and the form asks only what matters for that. It goes straight to my inbox. Prefer email or WhatsApp? Both links stay below.',
    steps: ['What brings you here?', 'Tell me more', 'How to reach you'],
    intentOptions: [
      { value: 'build', label: 'Solve a problem: I need something built' },
      { value: 'products', label: 'Explore products' },
      { value: 'hire', label: 'Hire / evaluate engineering' },
      { value: 'collaborate', label: 'Explore an idea / collaborate' },
    ],
    pickFirst: 'Choose an option above and the questions for it appear here.',
    noJsNote: 'Answer the group that fits; leave the others empty.',
    groups: {
      build: { legend: 'Solve a problem', fields: [
        { name: 'process', label: 'Which process or task?', kind: 'textarea', req: true, hint: 'What happens today, step by step, and who signs off on the result.' },
        { name: 'bottleneck', label: 'Where does it hurt?', kind: 'textarea', req: true, hint: 'Slow, manual, error-prone or risky: what goes wrong.' },
        { name: 'timeline', label: 'When do you need it?', kind: 'select', options: ['No fixed date', 'Within a month', 'In 1–3 months', 'Later this year or beyond'] },
        { name: 'budget', label: 'Budget range (optional)', kind: 'text', hint: 'Every engagement is priced on request. A rough range, in any currency, helps me scope.' },
      ] },
      products: { legend: 'Explore products', fields: [
        { name: 'product', label: 'Which product?', kind: 'select', options: ['AnotiAI PII Masker', 'WhoseDEV', 'DevGenie', 'ScriptGen', 'Not sure yet'] },
        { name: 'use_case', label: 'What would you use it for?', kind: 'textarea', req: true, hint: 'Integrate, license, extend or just try: and on what kind of data.' },
      ] },
      hire: { legend: 'Hire / evaluate engineering', fields: [
        { name: 'role', label: 'Role', kind: 'text', req: true, hint: 'For example: AI engineer, backend engineer (Python).' },
        { name: 'engagement_type', label: 'Type', kind: 'select', options: ['Contract', 'Full-time', 'Open to either'] },
        { name: 'company', label: 'Company', kind: 'text', autocomplete: 'organization' },
      ] },
      collaborate: { legend: 'Explore an idea / collaborate', fields: [
        { name: 'idea', label: 'The idea', kind: 'textarea', req: true, hint: 'A few lines are enough.' },
        { name: 'looking_for', label: 'What are you looking for?', kind: 'text', hint: 'A co-builder, feedback, a prototype, a writer…' },
      ] },
    } as Record<string, { legend: string; fields: { name: string; label: string; kind: 'text' | 'textarea' | 'select'; req?: boolean; hint?: string; options?: string[]; autocomplete?: string }[] }>,
    nameLabel: 'Your name', emailLabel: 'Your email', emailHint: 'I reply to this address.',
    submit: 'Send the inquiry', sending: 'Sending…',
    mailFallback: 'Or email', whatsapp: 'WhatsApp me instead',
    success: { title: 'Sent. Thank you.', body: 'Your inquiry is in my inbox. I will reply by email.' },
    failure: { title: 'The form could not send.', body: 'Nothing is lost: email the same inquiry instead, or message me on WhatsApp.', mail: 'Email this inquiry' },
    errorsTitle: 'Please check the following:',
    subjectPrefix: 'Portfolio inquiry: ',
    moved: { from: 'Sign', note: 'The Sign page is now Contact.' },
  },
};
