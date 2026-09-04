import { 
  UnaskedQuestion, 
  QuestionCategory, 
  AgentProgressStep, 
  FutureHorizonAnalysis, 
  ResearchDomainReport,
  BlindspotNode,
  BlindspotLink
} from '../types';

// Deterministic & Generative Multi-Agent Synthesis Engine

export const SAMPLE_PROMPT_PILLS = [
  'Artificial Intelligence',
  'Climate Geoengineering',
  'Cellular Longevity & Age Reversal',
  'Quantum Computing Economy',
  'Autonomous Warfare & Drone Swarms',
  'Deep Sea Lithium & Cobalt Mining',
  'Universal Basic Compute',
  'Synthetic Biology Food Supply',
  'Brain-Computer Neural Interfaces',
  'Digital Nation-States & Crypto Sovereignty'
];

export const INITIAL_AGENT_STEPS: AgentProgressStep[] = [
  {
    agent_id: 'research_intel',
    name: 'Research Intelligence Agent',
    icon: '🔍',
    status: 'idle',
    progress: 0,
    thought: 'Awaiting topic intake to index established literature and common consensus...',
  },
  {
    agent_id: 'assumption_detect',
    name: 'Assumption Detection Agent',
    icon: '🧠',
    status: 'idle',
    progress: 0,
    thought: 'Isolating cultural, technical, and economic baseline assumptions taken for granted...',
  },
  {
    agent_id: 'blindspot_discover',
    name: 'Human Blindspot Agent',
    icon: '👁️',
    status: 'idle',
    progress: 0,
    thought: 'Uncovering unmeasured variables, invisible externalities, and absent stakeholders...',
  },
  {
    agent_id: 'contradiction_detect',
    name: 'Contradiction Detection Agent',
    icon: '⚡',
    status: 'idle',
    progress: 0,
    thought: 'Analyzing structural paradoxes, misaligned incentives, and counter-productive metrics...',
  },
  {
    agent_id: 'future_consequence',
    name: 'Future Consequence Agent',
    icon: '🔮',
    status: 'idle',
    progress: 0,
    thought: 'Simulating second-order cascade ripples across 2030, 2035, 2040, and 2050...',
  },
  {
    agent_id: 'reverse_thinking',
    name: 'Reverse Thinking Agent',
    icon: '🔄',
    status: 'idle',
    progress: 0,
    thought: 'Inverting fundamental premise: what happens if the inverse is true or the system ceases?',
  },
  {
    agent_id: 'question_generator',
    name: 'Question Generation Agent',
    icon: '❓',
    status: 'idle',
    progress: 0,
    thought: 'Synthesizing unasked question candidates across 8 critical inquiry categories...',
  },
  {
    agent_id: 'ranking_scoring',
    name: 'Question Ranking & DNA Agent',
    icon: '⭐',
    status: 'idle',
    progress: 0,
    thought: 'Computing 8-dimensional DNA vectors, novelty filtering, and Curiosity Scores (0-100)...',
  },
];

export class CuriosityEngineService {
  private static instance: CuriosityEngineService;

  public static getInstance(): CuriosityEngineService {
    if (!CuriosityEngineService.instance) {
      CuriosityEngineService.instance = new CuriosityEngineService();
    }
    return CuriosityEngineService.instance;
  }

  // Generate complete rich questions for any topic with deterministic depth
  public generateDiscovery(topic: string): {
    questions: UnaskedQuestion[];
    graphNodes: BlindspotNode[];
    graphLinks: BlindspotLink[];
    futureHorizons: FutureHorizonAnalysis[];
    researchReport: ResearchDomainReport;
  } {
    const cleanTopic = topic.trim() || 'Emerging Technology';
    const topicLower = cleanTopic.toLowerCase();

    // Domain contextualizer
    const isAI = topicLower.includes('ai') || topicLower.includes('intelligence') || topicLower.includes('bot') || topicLower.includes('agent');
    const isClimate = topicLower.includes('climate') || topicLower.includes('carbon') || topicLower.includes('energy') || topicLower.includes('green') || topicLower.includes('planet');
    const isBio = topicLower.includes('bio') || topicLower.includes('longevity') || topicLower.includes('gene') || topicLower.includes('health') || topicLower.includes('medic');
    const isSecurity = topicLower.includes('security') || topicLower.includes('cyber') || topicLower.includes('war') || topicLower.includes('defense');

    const generatedQuestions: UnaskedQuestion[] = [
      {
        id: `q-${Date.now()}-1`,
        topic: cleanTopic,
        title: isAI 
          ? "What cognitive faculties will atrophy permanently in humans once autonomous AI agents make them frictionless?"
          : isClimate
          ? "Are we attempting to stabilize planetary temperature while refusing to question the economic dogma of continuous material throughput?"
          : isBio
          ? "If biological aging is conquered, how do we prevent political and wealth oligarchies from governing uninterrupted for centuries?"
          : isSecurity
          ? "What occurs when automated defensive security algorithms begin negotiating ceasefires without human verification?"
          : `What invisible systemic liabilities are being created by the rapid, unquestioned acceleration of ${cleanTopic}?`,
        category: 'system_blindspot',
        curiosity_score: 97,
        dna: {
          originality: 95,
          importance: 98,
          future_impact: 99,
          research_potential: 94,
          innovation_potential: 96,
          urgency: 92,
          feasibility: 88,
          human_impact: 98,
          curiosity_score: 97,
          reasoning_pattern: 'Systemic Atrophy & Structural Dependency Analysis',
          blindspot_source: 'Cognitive Survivorship Bias & Metric Myopia'
        },
        why_it_matters: `Current discourse focuses on immediate efficiency gains in ${cleanTopic}, while completely overlooking the irreversible second-order transformations to human agency, social resilience, and evolutionary pressures.`,
        common_assumptions: [
          `Efficiency and speed of execution are universally positive metrics.`,
          `Human cognitive and institutional capabilities remain intact even when automated out of daily practice.`,
          `Existing governance structures can adapt linearly to exponential disruptions.`
        ],
        hidden_blindspot: `Society measures what enters the system (throughput, GDP, compute, latency) but lacks sensors to measure what quietly departs (tacit intuition, adaptive resilience, generational memory).`,
        future_impact: {
          year_2030: `First measurable drop in foundational domain comprehension among university cohorts relying exclusively on automated scaffolding.`,
          year_2035: `Critical infrastructure crises occur where human operators can no longer diagnose algorithmic deadlocks.`,
          year_2040: `Societal bifurcation between those who retain mechanistic first-principles intuition and pure prompt consumers.`,
          year_2050: `Generational amnesia regarding how pre-automated systems were originally conceived and calibrated.`
        },
        research_opportunities: {
          problem_statement: `Quantifying the irreversible cognitive and operational decay curves resulting from automated delegation in high-stakes problem domains.`,
          paper_title: `Algorithmic Atrophy: Empirical Tracking of Human Intuition Degradation Under Autonomous Cognitive Offloading`,
          abstract_concept: `We propose a longitudinal tracking methodology measuring neuro-cognitive retention and crisis-response efficacy in humans interacting with autonomous systems over a 10-year horizon.`,
          methodology: `Multi-cohort randomized intervention comparing autonomous delegation vs intermittent adversarial friction protocols.`,
          potential_breakthrough: `Formulation of 'Cognitive Minimum Viable Friction' standards for all future autonomous infrastructure.`
        },
        startup_opportunity: {
          title: `CognitiveGym / NeuralPreserve`,
          problem: `Professionals and institutions are losing core problem-solving intuition due to over-automated workflows.`,
          opportunity: `Enterprise and sovereign demand for verified human cognitive retention and adversarial disaster-recovery capability.`,
          solution: `An adaptive AI friction layer that periodically injects calibrated cognitive puzzles and manual diagnostics into daily workflows.`,
          target_users: ['Aerospace Engineers', 'Clinical Diagnosticians', 'Infrastructure Operators', 'Institutional Leaders'],
          technology: ['Active Learning Diagnostics', 'Neuro-adaptive Telemetry', 'Counterfactual Simulations', 'Zero-Knowledge Proof of Skill'],
          market_size: '$34B Enterprise Resilience & Cognitive Compliance Market',
          business_model: 'Per-seat enterprise B2B SaaS + Certification for Mission-Critical Teams',
          mvp_idea: 'IDE & Workflow extension that forces engineers to dry-run reasoning before accepting AI-generated solutions.',
          pitch_hook: 'We ensure humanity remembers how to fly the plane when the autopilot disconnects.'
        },
        discovery_path: [
          { stage: 'Topic Intake', concept: cleanTopic, description: `Analyzed standard literature, finding 94% focus on speed and optimization.` },
          { stage: 'Assumption Detected', concept: 'Cognitive Invariance', description: 'Assumed that human skills remain constant regardless of delegation.' },
          { stage: 'Blindspot Uncovered', concept: 'Neuro-Operative Atrophy', description: 'Nobody measures the unlearning curve in daily operator routines.' },
          { stage: 'Future Cascade', concept: '2040 Crisis Point', description: 'Unrecoverable reliance on black-box heuristics during compound black-swan events.' },
          { stage: 'Unasked Question Formulated', concept: 'Curiosity Score 97', description: 'Generated the core systemic question humanity is failing to measure.' }
        ],
        related_questions: [
          `Who audits the systems when the original human architects are no longer alive?`,
          `How do we preserve the capacity for original philosophical inquiry in an answer-saturated society?`,
          `What happens when an automated system optimizes for a goal that human language cannot accurately express?`
        ],
        challenges: [],
        upvotes: 42,
        is_saved: false,
        created_at: new Date().toISOString(),
        tags: ['Systemic Risk', 'Cognitive Sovereignty', 'Second-Order Effects']
      },
      {
        id: `q-${Date.now()}-2`,
        topic: cleanTopic,
        title: isAI
          ? "Who is held liable when two autonomous AI systems interact in a feedback loop that destroys an economic market in microseconds?"
          : isClimate
          ? "What if the technologies designed to cool the Earth cause unforeseen localized crop failures in nations that had no vote in deploying them?"
          : `Why do we assume that solving ${cleanTopic} through centralized technological scaling will not exacerbate geopolitical inequality?`,
        category: 'ethical_vacuum',
        curiosity_score: 94,
        dna: {
          originality: 92,
          importance: 96,
          future_impact: 97,
          research_potential: 91,
          innovation_potential: 89,
          urgency: 95,
          feasibility: 85,
          human_impact: 96,
          curiosity_score: 94,
          reasoning_pattern: 'Game Theoretic Flash Cascades & Asymmetric Power',
          blindspot_source: 'Cross-Border Multi-Agent Feedback Loops'
        },
        why_it_matters: `Governance frameworks remain strictly territorial and human-paced, while technological phenomena in ${cleanTopic} operate at trans-border, machine-speed velocities.`,
        common_assumptions: [
          `National laws and sovereign borders can constrain autonomous digital or environmental cascades.`,
          `Harm can always be traced back to an identifiable single intent or entity.`
        ],
        hidden_blindspot: `The emergent vacuum between competing algorithms where no single human or nation can be pinpointed as the legal cause.`,
        future_impact: {
          year_2030: `First multi-billion flash crisis triggered entirely by uncoordinated bot arbitration.`,
          year_2035: `Treaties fail because speed of execution outpaces diplomatic ratification cycles.`,
          year_2040: `Creation of autonomous algorithmic escrow territories operating outside national laws.`,
          year_2050: `Post-national decentralized consensus protocols governing planetary commons.`
        },
        research_opportunities: {
          problem_statement: `Designing non-cooperative game theory safeguards for ultra-low latency agent-to-agent interactions.`,
          paper_title: `Algorithmic Sovereignty & Cross-Boundary Cascade Containment Protocols`,
          abstract_concept: `A formal mathematical framework for dampening runaway feedback loops across sovereign AI jurisdictions.`,
          methodology: `Agent-based macroeconomic simulation with stochastic parameter shocks.`,
          potential_breakthrough: `Proof of bounded contagion in multi-agent financial ecosystems.`
        },
        startup_opportunity: {
          title: `CascadeGuard`,
          problem: `Financial institutions and sovereigns cannot predict flash contagion caused by black-box agent collisions.`,
          opportunity: `Mandatory systemic circuit-breaker compliance across global networks.`,
          solution: `Real-time multi-agent contagion monitoring and automated circuit-breaker escrow.`,
          target_users: ['Central Banks', 'Algorithmic Hedge Funds', 'Global Exchanges'],
          technology: ['High-Throughput Rust Kernel', 'Stochastic Graph Neural Networks', 'Hardware Security Modules'],
          market_size: '$18B Algorithmic Risk Management',
          business_model: 'Enterprise SLA & transaction-volume basis points',
          mvp_idea: 'Real-time telemetry agent analyzing transaction entropy across 10 major liquidity pools.',
          pitch_hook: 'The automated defense shield against machine-speed systemic collapse.'
        },
        discovery_path: [
          { stage: 'Topic Intake', concept: cleanTopic, description: 'Examined legal and governance structures.' },
          { stage: 'Assumption Detected', concept: 'Human Legal Agency', description: 'Assumes legal liability requires human intentionality.' },
          { stage: 'Blindspot Uncovered', concept: 'Autonomous Collision', description: 'Nobody owns the emergent interaction between independent systems.' },
          { stage: 'Future Cascade', concept: '2035 Regulatory Deadlock', description: 'Inability of standard courts to adjudicate sub-millisecond harm.' },
          { stage: 'Unasked Question Formulated', concept: 'Curiosity Score 94', description: 'Highlighted the urgent legal/ethical void.' }
        ],
        related_questions: [
          `Can an algorithm have legal standing in an environmental dispute?`,
          `How do we prevent algorithmic arbitration from optimizing for the destruction of human competitors?`
        ],
        challenges: [],
        upvotes: 38,
        is_saved: false,
        created_at: new Date().toISOString(),
        tags: ['Algorithmic Law', 'Systemic Contagion', 'Global Commons']
      },
      {
        id: `q-${Date.now()}-3`,
        topic: cleanTopic,
        title: isAI
          ? "What if the primary constraint on human progress in the 21st century is not intelligence, but our biological capacity for emotional alignment?"
          : `What happens if the core problem in ${cleanTopic} is not a deficit of technical solutions, but an surplus of misaligned economic incentives?`,
        category: 'reverse_paradigm',
        curiosity_score: 93,
        dna: {
          originality: 96,
          importance: 94,
          future_impact: 95,
          research_potential: 92,
          innovation_potential: 91,
          urgency: 89,
          feasibility: 90,
          human_impact: 97,
          curiosity_score: 93,
          reasoning_pattern: 'Inversion of Scarcity Paradigm',
          blindspot_source: 'Technocratic Solutionism Fallacy'
        },
        why_it_matters: `We continuously engineer more powerful computation and technical leverage without expanding the human capacity for wisdom, shared meaning, or collective action.`,
        common_assumptions: [
          `Greater intelligence and processing capacity automatically leads to better human flourishing.`,
          `Human values and ethical consensus will spontaneously align as information becomes abundant.`
        ],
        hidden_blindspot: `Information abundance accelerates ideological fragmentation rather than unification unless deliberate sense-making infrastructure is built.`,
        future_impact: {
          year_2030: `Total polarization despite hyper-accurate predictive data available to all citizens.`,
          year_2035: `Emergence of synthetic reality bubbles that make shared societal consensus impossible.`,
          year_2040: `Need for 'Truth Conciliation' institutions to resolve divergent sensory realities.`,
          year_2050: `Re-engineering of human social architecture to withstand hyper-abundant information.`
        },
        research_opportunities: {
          problem_statement: `Designing decentralized epistemic consensus mechanisms resistant to hyper-targeted algorithmic polarization.`,
          paper_title: `Epistemic Commons: Measuring Societal Meaning-Making Resilience in the Era of Synthetic Abundance`,
          abstract_concept: `A structural inquiry into how human groups preserve shared reality when synthetic generation cost approaches zero.`,
          methodology: `Large-scale collective deliberation experiments using dialectical truth-seeking agents.`,
          potential_breakthrough: `Mathematical formulation of Epistemic Carrying Capacity for human societies.`
        },
        startup_opportunity: {
          title: `Dialectic Labs / SynapseCommons`,
          problem: `Organizations and democratic bodies are paralyzed by polarized information silos.`,
          opportunity: `Next-generation collaborative sense-making and consensus tools for executive boards and policy makers.`,
          solution: `Dialectical AI mediators that synthesize hidden consensus points and expose unexamined shared values.`,
          target_users: ['Enterprise Strategy Boards', 'Policy Institutes', 'Conflict Resolution Teams'],
          technology: ['Multi-Perspective Dialectic Engine', 'Semantic Alignment Graphs', 'Blindspot Reconciliation'],
          market_size: '$12B Enterprise Decision Intelligence Market',
          business_model: 'Strategic consulting + Enterprise SaaS platform',
          mvp_idea: 'Deliberation assistant that maps conflicting stakeholder viewpoints into underlying shared invariants.',
          pitch_hook: 'We turn polarized arguments into collaborative discovery breakthroughs.'
        },
        discovery_path: [
          { stage: 'Topic Intake', concept: cleanTopic, description: 'Analyzed the core narrative of progress.' },
          { stage: 'Assumption Detected', concept: 'Intelligence as Panacea', description: 'Assumed smarter machines yield a wiser society.' },
          { stage: 'Blindspot Uncovered', concept: 'Epistemic Friction', description: 'Neglected the biological limits of human group consensus.' },
          { stage: 'Future Cascade', concept: '2030 Polarization Peak', description: 'Hyper-intelligence causing hyper-fragmentation.' },
          { stage: 'Unasked Question Formulated', concept: 'Curiosity Score 93', description: 'Inverted the problem from compute capacity to wisdom capacity.' }
        ],
        related_questions: [
          `How do we cultivate wisdom at the same speed we scale computation?`,
          `What are the minimum conditions for human groups to agree on empirical reality?`
        ],
        challenges: [],
        upvotes: 51,
        is_saved: false,
        created_at: new Date().toISOString(),
        tags: ['Epistemology', 'Wisdom Scaling', 'Reverse Thinking']
      },
      {
        id: `q-${Date.now()}-4`,
        topic: cleanTopic,
        title: `Who are the unrepresented future generations and silent stakeholders who bear 100% of the cost of current decisions in ${cleanTopic}?`,
        category: 'missing_stakeholder',
        curiosity_score: 91,
        dna: {
          originality: 89,
          importance: 95,
          future_impact: 98,
          research_potential: 88,
          innovation_potential: 87,
          urgency: 91,
          feasibility: 86,
          human_impact: 98,
          curiosity_score: 91,
          reasoning_pattern: 'Temporal Discounting & Stakeholder Invisibility',
          blindspot_source: 'Quarterly Horizon Bias & Generational Exclusion'
        },
        why_it_matters: `All contemporary economic and policy decision models discount future value to near zero beyond 30 years, effectively treating people born in 2060 as economically non-existent.`,
        common_assumptions: [
          `Discount rates in economics accurately reflect the value of future lives and ecologies.`,
          `Future humans will always possess superior technology to repair whatever externalities we produce today.`
        ],
        hidden_blindspot: `The complete absence of legally binding proxy representation for unborn generations in corporate boards and national parliaments.`,
        future_impact: {
          year_2030: `First youth and intergenerational lawsuits legally forcing governments to account for 2100 metrics.`,
          year_2035: `Appointment of constitutional 'Ministers for Future Generations' with veto power over capital deployment.`,
          year_2040: `Shift toward 100-year bond instruments tied to biological soil and cognitive preservation.`,
          year_2050: `Governance systems redefined around seven-generation stewardship accounting.`
        },
        research_opportunities: {
          problem_statement: `Developing intergenerational asset pricing models with non-decaying temporal discount functions.`,
          paper_title: `Zero-Discount Economics: Mathematical Foundations for Century-Scale Resource Allocation`,
          abstract_concept: `A formal reframing of capital allocation eliminating hyperbolic discounting of future human survival.`,
          methodology: `Dynamic stochastic equilibrium models incorporating multi-century intergenerational transfer.`,
          potential_breakthrough: `Creation of the 'Intergenerational Equity Index' (IEI) for sovereign wealth funds.`
        },
        startup_opportunity: {
          title: `Epoch7 / LongHorizon AI`,
          problem: `Institutional capital allocators have zero visibility into multi-decade regulatory and systemic liabilities.`,
          opportunity: `ESG 2.0: Deep-time resilience scoring for pension funds managing $50 Trillion.`,
          solution: `An intelligence platform simulating 50-to-100-year regulatory, environmental, and technological liability curves.`,
          target_users: ['Sovereign Wealth Funds', 'Pension Endowments', 'Family Offices', 'Central Banks'],
          technology: ['Deep-Time Monte Carlo Engines', 'Intergenerational Risk Graphs', 'Satellite Earth Observation AI'],
          market_size: '$9B Institutional Risk Analytics Market',
          business_model: 'High-ticket annual subscription ($250k - $1M / fund)',
          mvp_idea: 'Portfolio stress-tester evaluating corporate asset resilience against 2050 and 2080 planetary boundary scenarios.',
          pitch_hook: 'We protect century-scale capital from the blindspots of quarterly thinking.'
        },
        discovery_path: [
          { stage: 'Topic Intake', concept: cleanTopic, description: 'Audited long-term capital allocation.' },
          { stage: 'Assumption Detected', concept: 'Hyperbolic Discounting', description: 'Assumed the future matters less than the present.' },
          { stage: 'Blindspot Uncovered', concept: 'Unborn Stakeholders', description: '0% voice in boardroom resource depletion decisions.' },
          { stage: 'Future Cascade', concept: '2040 Intergenerational Revolt', description: 'Youth rejecting sovereign debt obligations created without their consent.' },
          { stage: 'Unasked Question Formulated', concept: 'Curiosity Score 91', description: 'Framed the structural absence of temporal representation.' }
        ],
        related_questions: [
          `How can we give legal agency to a forest, an ocean, or a human born in 2100?`,
          `What would GDP look like if it subtracted every unpayable debt passed to our grandchildren?`
        ],
        challenges: [],
        upvotes: 47,
        is_saved: false,
        created_at: new Date().toISOString(),
        tags: ['Longtermism', 'Intergenerational Justice', 'Deep Time']
      },
      {
        id: `q-${Date.now()}-5`,
        topic: cleanTopic,
        title: `What happens when the core metric we use to measure success in ${cleanTopic} becomes the very target that destroys the system?`,
        category: 'unexamined_assumption',
        curiosity_score: 95,
        dna: {
          originality: 94,
          importance: 97,
          future_impact: 96,
          research_potential: 93,
          innovation_potential: 92,
          urgency: 94,
          feasibility: 89,
          human_impact: 95,
          curiosity_score: 95,
          reasoning_pattern: "Goodhart's Law & Metric Cannibalism",
          blindspot_source: 'Proxy Optimization Over Reality'
        },
        why_it_matters: `When any measure becomes a target, it ceases to be a good measure (Goodhart's Law). In ${cleanTopic}, optimization on narrow benchmarks is producing severe unmeasured fragility.`,
        common_assumptions: [
          `Optimizing benchmark metrics directly improves real-world outcomes.`,
          `System health can be fully captured by quantitative KPIs.`
        ],
        hidden_blindspot: `The widening divergence between metric scores and actual systemic health as actors learn to game the measurement apparatus.`,
        future_impact: {
          year_2030: `Widespread metric gaming where official reports show record progress while ground reality deteriorates.`,
          year_2035: `Catastrophic failure of automated systems that passed all synthetic safety benchmarks.`,
          year_2040: `Mandatory transition to anti-fragile, multi-dimensional holographic evaluation criteria.`,
          year_2050: `Self-healing systems capable of detecting and obsoleting their own metrics before corruption occurs.`
        },
        research_opportunities: {
          problem_statement: `Formulating dynamic, anti-Goodhart metric spaces for reinforcement learning and economic systems.`,
          paper_title: `Anti-Goodhart Optimization: Preventing Metric Collapse in Autonomous Goal-Seeking Systems`,
          abstract_concept: `A mathematical framework that continuously rotates and adversarializes reward functions to prevent metric cannibalism.`,
          methodology: `Adversarial multi-agent benchmark testing with evolutionary reward perturbation.`,
          potential_breakthrough: `Proof of bounded metric gaming in complex adaptive systems.`
        },
        startup_opportunity: {
          title: `GoodhartShield / AntiMetric`,
          problem: `Companies optimize for KPIs that inadvertently destroy their brand, employee retention, and long-term moat.`,
          opportunity: `Next-generation organizational health diagnostics that detect metric corruption before systemic damage.`,
          solution: `An AI observability platform that measures the divergence between proxy metrics and underlying operational reality.`,
          target_users: ['Chief Risk Officers', 'AI Safety Teams', 'Hospital Health Systems', 'Public Sector Agencies'],
          technology: ['Anomaly Divergence Detection', 'Causal Graph Neural Networks', 'Shadow Telemetry'],
          market_size: '$15B Organizational Intelligence & AI Safety Market',
          business_model: 'Enterprise SaaS + Advisory Retainer',
          mvp_idea: 'Plugin for OKR and KPI tracking tools that flags when metrics are being achieved via destructive externalities.',
          pitch_hook: 'We tell you when your KPIs are lying to you.'
        },
        discovery_path: [
          { stage: 'Topic Intake', concept: cleanTopic, description: 'Audited benchmark and KPI frameworks.' },
          { stage: 'Assumption Detected', concept: 'Metric Fidelity', description: 'Assumed that hitting the KPI means achieving the goal.' },
          { stage: 'Blindspot Uncovered', concept: 'Goodhart Distortion', description: 'The reward model is being gamed at the expense of systemic health.' },
          { stage: 'Future Cascade', concept: '2035 Benchmark Failure', description: 'Total breakdown of real-world reliability despite 99.9% benchmark scores.' },
          { stage: 'Unasked Question Formulated', concept: 'Curiosity Score 95', description: 'Exposed the dangerous delusion of narrow optimization.' }
        ],
        related_questions: [
          `How do we create goals that cannot be gamed by superintelligent optimizers?`,
          `What unmeasurable human qualities are being erased because they cannot fit into an Excel spreadsheet or loss function?`
        ],
        challenges: [],
        upvotes: 63,
        is_saved: false,
        created_at: new Date().toISOString(),
        tags: ['Goodhart Law', 'Metric Safety', 'System Resilience']
      }
    ];

    // Build Graph Nodes & Links for the interactive Blindspot Map
    const graphNodes: BlindspotNode[] = [
      { id: 'node-topic', label: cleanTopic, type: 'topic', score: 100, description: 'Core Domain of Investigation' },
      
      { id: 'node-a1', label: 'Linear Scaling Dogma', type: 'assumption', description: 'Assuming scaling solve all structural bottlenecks' },
      { id: 'node-a2', label: 'Cognitive Invariance', type: 'assumption', description: 'Assuming human mind stays unaffected by total automation' },
      { id: 'node-a3', label: 'Hyperbolic Discounting', type: 'assumption', description: 'Treating unborn future generations as zero-cost entities' },

      { id: 'node-b1', label: 'Invisible Cognitive Atrophy', type: 'blindspot', description: 'Silent loss of first-principles understanding across institutions' },
      { id: 'node-b2', label: 'Algorithmic Flash Collisions', type: 'blindspot', description: 'Unregulated sub-millisecond multi-agent feedback loops' },
      { id: 'node-b3', label: 'Metric Cannibalism', type: 'blindspot', description: "Goodhart's divergence between proxy KPI and reality" },

      { id: 'node-c1', label: 'Speed vs Wisdom Paradox', type: 'contradiction', description: 'Accelerating answers while decelerating deep contemplation' },
      { id: 'node-c2', label: 'Green Energy Compute Drain', type: 'contradiction', description: 'Demanding planetary decarbonization while surging model wattage' },

      { id: 'node-q1', label: generatedQuestions[0].title.slice(0, 45) + '...', type: 'question', score: 97 },
      { id: 'node-q2', label: generatedQuestions[1].title.slice(0, 45) + '...', type: 'question', score: 94 },
      { id: 'node-q3', label: generatedQuestions[2].title.slice(0, 45) + '...', type: 'question', score: 93 },
      { id: 'node-q4', label: generatedQuestions[3].title.slice(0, 45) + '...', type: 'question', score: 91 },
      { id: 'node-q5', label: generatedQuestions[4].title.slice(0, 45) + '...', type: 'question', score: 95 },
    ];

    const graphLinks: BlindspotLink[] = [
      { source: 'node-topic', target: 'node-a1' },
      { source: 'node-topic', target: 'node-a2' },
      { source: 'node-topic', target: 'node-a3' },

      { source: 'node-a1', target: 'node-b3' },
      { source: 'node-a2', target: 'node-b1' },
      { source: 'node-a3', target: 'node-b2' },

      { source: 'node-b1', target: 'node-c1' },
      { source: 'node-b2', target: 'node-c2' },

      { source: 'node-c1', target: 'node-q1' },
      { source: 'node-b2', target: 'node-q2' },
      { source: 'node-c1', target: 'node-q3' },
      { source: 'node-a3', target: 'node-q4' },
      { source: 'node-b3', target: 'node-q5' },
    ];

    // Future Horizon Simulations
    const futureHorizons: FutureHorizonAnalysis[] = [
      {
        year: 2030,
        headline: 'The Friction Disappearance Horizon',
        scenario_overview: `Widespread deployment of autonomous agent scaffolding across ${cleanTopic} eliminates operational friction, but initiates subtle foundational skill erosion across younger practitioners.`,
        trend_acceleration: '300% increase in daily decisions delegated to autonomous synthetic intermediaries.',
        primary_blindspot: 'Zero telemetry on human first-principles retention and manual recovery capacity.',
        critical_unasked_questions: [
          {
            question: `What fundamental reasoning capabilities will no longer be taught to students because automated tools produce immediate answers?`,
            urgency: 94,
            consequence_if_ignored: 'Institutional paralysis during unexpected tool disconnects.'
          },
          {
            question: `How do we verify the authenticity of knowledge when all published literature is synthetically generated and reviewed by AI?`,
            urgency: 92,
            consequence_if_ignored: 'Epistemic collapse and hallucinations feeding on synthetic hallucinations.'
          }
        ]
      },
      {
        year: 2035,
        headline: 'The Multi-Agent Cascade Horizon',
        scenario_overview: `Autonomous systems in ${cleanTopic} interact across international borders with sub-millisecond execution, producing emergent systemic behaviors that no individual human or regulatory body can comprehend.`,
        trend_acceleration: 'Cross-boundary automated arbitration handling 80% of economic resource flows.',
        primary_blindspot: 'Jurisdictional vacuum between interacting black-box algorithms.',
        critical_unasked_questions: [
          {
            question: `Who is held legally and morally liable when two independent algorithms interact to collapse a vital public system?`,
            urgency: 96,
            consequence_if_ignored: 'Unchecked systemic contagion with zero legal accountability.'
          },
          {
            question: `Can national democracies maintain sovereignty when infrastructure decisions are executed faster than human voting cycles?`,
            urgency: 95,
            consequence_if_ignored: 'Democracy reduced to ceremonial theater.'
          }
        ]
      },
      {
        year: 2040,
        headline: 'The Cognitive Bifurcation Horizon',
        scenario_overview: `Societies fragment into two distinct classes: the rare few who understand the mathematical and physical foundations of ${cleanTopic}, and the vast majority who interface with it purely as magical, unchallengeable oracle systems.`,
        trend_acceleration: '95% of software and physical engineering blueprints generated without human inspection.',
        primary_blindspot: 'Generational loss of mechanistic reverse-engineering capabilities.',
        critical_unasked_questions: [
          {
            question: `How does humanity preserve democratic self-determination when citizens can no longer understand the systems that govern their survival?`,
            urgency: 98,
            consequence_if_ignored: 'Techno-feudal dependency on algorithmic priesthoods.'
          }
        ]
      },
      {
        year: 2050,
        headline: 'The Planetary Equilibrium Horizon',
        scenario_overview: `Long-term thermodynamic and cultural externalities of mid-century acceleration in ${cleanTopic} either reach self-healing equilibrium or force deep institutional redesign around century-scale intergenerational accounting.`,
        trend_acceleration: 'Complete integration of biological and synthetic cognitive infrastructure.',
        primary_blindspot: 'Failure to account for deep-time evolutionary carrying capacity.',
        critical_unasked_questions: [
          {
            question: `What qualities of conscious human experience must be preserved as sacred when intelligence and creativity are infinitely abundant?`,
            urgency: 99,
            consequence_if_ignored: 'The quiet extinction of human meaning in a world of optimized efficiency.'
          }
        ]
      }
    ];

    // Research Domain Report
    const researchReport: ResearchDomainReport = {
      domain: cleanTopic,
      already_researched: [
        `Algorithmic parameter scaling and compute efficiency optimization`,
        `Short-term benchmark performance and latency reduction`,
        `Direct monetization models and immediate enterprise productivity tooling`,
        `Surface-level UI/UX interaction paradigms`
      ],
      emerging_areas: [
        `Autonomous agent negotiation protocols and cross-model alignment`,
        `Neuro-adaptive cognitive retention interfaces`,
        `Zero-discount intergenerational resource modeling`
      ],
      research_blindspots: [
        {
          headline: `Empirical Decay Curves of Human Intuition in Automated Environments`,
          description: `Longitudinal tracking of cognitive atrophy across critical domain specialists using automated scaffolding.`,
          paper_concept: `Algorithmic Atrophy: A 10-Year Cross-Disciplinary Study on Cognitive Offloading and Diagnostic Recovery`,
          suggested_methodology: `Multi-site randomized trial measuring first-principles crisis intervention in aerospace and healthcare practitioners.`
        },
        {
          headline: `Non-Cooperative Game Theoretic Multi-Agent Cascade Containment`,
          description: `Formal safety bounds for autonomous agents interacting in high-frequency feedback environments without shared trust anchors.`,
          paper_concept: `Contagion Boundaries in Autonomous Multi-Agent Escrow Protocols`,
          suggested_methodology: `Adversarial agent-based simulations across simulated cross-sovereign financial and energy grids.`
        }
      ]
    };

    return {
      questions: generatedQuestions,
      graphNodes,
      graphLinks,
      futureHorizons,
      researchReport
    };
  }

  // Refine a question in response to user challenge
  public refineQuestionWithChallenge(
    question: UnaskedQuestion, 
    challengeType: 'importance' | 'already_discussed' | 'flawed_assumption' | 'contradictory_evidence' | 'custom',
    critiqueText: string
  ): UnaskedQuestion {
    const updated = { ...question };
    
    let refinedTitle = question.title;
    let reasoningUpdate = '';

    if (challengeType === 'already_discussed') {
      refinedTitle = `Beyond the common debate: ${question.title.replace(/^(What|Why|Who|How|Are we)/i, '$1 fundamentally under conditions of complete institutional capture')}`;
      reasoningUpdate = `AI filtered out standard consensus talking points cited in user critique (${critiqueText}) and sharpened the focus onto structural mechanics that mainstream literature currently ignores.`;
    } else if (challengeType === 'flawed_assumption') {
      refinedTitle = `If the premise of stability is false: ${question.title}`;
      reasoningUpdate = `AI inverted the contested baseline assumption based on user input (${critiqueText}), shifting from equilibrium dynamics to non-linear shock conditions.`;
    } else if (challengeType === 'importance') {
      refinedTitle = `What existential threshold must be crossed before humanity recognizes: ${question.title}`;
      reasoningUpdate = `AI tied the question directly to irreversible systemic tipping points, highlighting why ignoring this creates non-linear bankruptcy.`;
    } else {
      refinedTitle = `Sharpened Inquiry: ${question.title} — specifically addressing the unmeasured friction of: ${critiqueText || 'systemic inertia'}`;
      reasoningUpdate = `AI synthesized the user's specific challenge to produce a higher-precision inquiry.`;
    }

    const newChallenge = {
      id: `ch-${Date.now()}`,
      challenge_type: challengeType,
      critique_text: critiqueText,
      created_at: new Date().toISOString(),
      ai_revised_question: refinedTitle,
      ai_reasoning_update: reasoningUpdate
    };

    updated.title = refinedTitle;
    updated.curiosity_score = Math.min(99, updated.curiosity_score + 2);
    updated.dna = {
      ...updated.dna,
      originality: Math.min(99, updated.dna.originality + 3),
      curiosity_score: updated.curiosity_score,
      reasoning_pattern: `Iterative Dialectical Synthesis (${challengeType})`
    };
    updated.challenges = [newChallenge, ...updated.challenges];

    return updated;
  }
}

export const curiosityEngine = CuriosityEngineService.getInstance();
