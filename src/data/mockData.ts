import { 
  Exam, 
  Subject, 
  Question, 
  MockTest, 
  PreviousYearPaper, 
  StudyMaterial, 
  CurrentAffairArticle 
} from '../types';

export const EXAMS: Exam[] = [
  {
    id: 'cuet',
    name: 'CUET',
    fullName: 'Common University Entrance Test (UG)',
    tagline: 'Your Gateway to Premier Central & State Universities',
    description: 'Conducted by NTA for admission into undergraduate programs in Central, State, Deemed, and Private Universities across India.',
    badge: 'NTA UG 2025',
    color: 'from-blue-600 to-indigo-700',
    subjectsCount: 6,
    mockTestsCount: 38,
    questionsCount: 4200,
    eligibility: 'Class 12th appearing or passed from any recognized board',
    examFrequency: 'Once a year (May-June)',
    negativeMarking: '-1 for each incorrect answer (+5 for correct)',
    subjects: ['cuet-english', 'cuet-general-test', 'cuet-maths', 'cuet-gk', 'cuet-current-affairs', 'cuet-domain'],
    notifications: [
      { id: 'n1', title: 'CUET UG 2025 Admit Card & Exam City Intimation Slip Released', date: 'May 10, 2025', isNew: true },
      { id: 'n2', title: 'Official NTA Information Bulletin & Subject Mapping Guidelines', date: 'April 28, 2025' }
    ]
  },
  {
    id: 'cds',
    name: 'CDS',
    fullName: 'Combined Defence Services Examination',
    tagline: 'Join IMA, INA, AFA & OTA as an Officer',
    description: 'Conducted biannually by UPSC for recruitment of commissioned officers into the Indian Military Academy, Naval Academy, Air Force Academy, and Officers Training Academy.',
    badge: 'UPSC CDS (I & II)',
    color: 'from-amber-600 to-orange-700',
    subjectsCount: 3,
    mockTestsCount: 42,
    questionsCount: 5600,
    eligibility: 'Graduation in Arts/Science/Commerce/Engineering (Age 19-24)',
    examFrequency: 'Twice a year (CDS I & CDS II)',
    negativeMarking: '-0.33 per wrong answer (+1 for correct)',
    subjects: ['cds-english', 'cds-gk', 'cds-maths'],
    notifications: [
      { id: 'n3', title: 'CDS (I) 2025 Written Exam Cutoff Marks & Merit List Update', date: 'May 04, 2025', isNew: true },
      { id: 'n4', title: 'SSB Interview Call Letters for CDS Recommended Candidates', date: 'April 15, 2025' }
    ]
  },
  {
    id: 'nda',
    name: 'NDA',
    fullName: 'National Defence Academy & NA Exam',
    tagline: 'Train to Lead India’s Tri-Services Forces',
    description: 'Premier joint services academy where cadets of Army, Navy, and Air Force train together before going on to respective service academies.',
    badge: 'UPSC NDA/NA',
    color: 'from-emerald-600 to-teal-700',
    subjectsCount: 2,
    mockTestsCount: 48,
    questionsCount: 6800,
    eligibility: '10+2 passed/appearing (Age 16.5 - 19.5 years)',
    examFrequency: 'Twice a year (April & September)',
    negativeMarking: 'Maths: -0.83 (+2.5), GAT: -1.33 (+4.0)',
    subjects: ['nda-maths', 'nda-gat'],
    notifications: [
      { id: 'n5', title: 'NDA & NA (I) 2025 Result Declared by UPSC - Direct PDF List', date: 'May 12, 2025', isNew: true },
      { id: 'n6', title: 'UPSC NDA (II) 2025 Notification, Eligibility & Syllabus PDF', date: 'May 01, 2025' }
    ]
  },
  {
    id: 'afcat',
    name: 'AFCAT',
    fullName: 'Air Force Common Admission Test',
    tagline: 'Touch the Sky with Glory - Indian Air Force',
    description: 'Conducted by Indian Air Force for recruiting Class-I Gazetted Officers in Flying and Ground Duty (Technical and Non-Technical) branches.',
    badge: 'IAF Official',
    color: 'from-sky-600 to-cyan-700',
    subjectsCount: 4,
    mockTestsCount: 35,
    questionsCount: 3800,
    eligibility: 'Graduation with min 60% aggregate and Maths/Physics at 10+2 level',
    examFrequency: 'Twice a year (February & August)',
    negativeMarking: '-1 mark for every incorrect answer (+3 for correct)',
    subjects: ['afcat-english', 'afcat-ga', 'afcat-numerical', 'afcat-reasoning'],
    notifications: [
      { id: 'n7', title: 'AFCAT 02/2025 Online Application Window Opens June 1', date: 'May 08, 2025', isNew: true },
      { id: 'n8', title: 'AFSBi Testing Slots Allotment Live on Official Portal', date: 'April 20, 2025' }
    ]
  },
  {
    id: 'general-studies',
    name: 'General Studies',
    fullName: 'Comprehensive General Studies Foundation',
    tagline: 'Master Polity, History, Economy, Geography & GK',
    description: 'Foundational General Studies question bank and subject modules tailored for Civil Services, State PSC, Defence, and Graduate competitive examinations.',
    badge: 'Multi-Exam Core',
    color: 'from-purple-600 to-indigo-800',
    subjectsCount: 9,
    mockTestsCount: 55,
    questionsCount: 9200,
    eligibility: 'Universal preparation for all competitive aspirants',
    examFrequency: 'Year-round practice & tests',
    negativeMarking: 'Configurable by specific exam format',
    subjects: [
      'gs-history', 
      'gs-geography', 
      'gs-polity', 
      'gs-economics', 
      'gs-general-science', 
      'gs-current-affairs', 
      'gs-static-gk', 
      'gs-environment', 
      'gs-art-culture'
    ],
    notifications: [
      { id: 'n9', title: 'Union Budget 2025-26 & Economic Survey Special GS Compendium', date: 'May 11, 2025', isNew: true },
      { id: 'n10', title: 'Monthly GS High-Yield Quiz & Static GK Summary Published', date: 'May 02, 2025' }
    ]
  }
];

export const SUBJECTS: Subject[] = [
  // CUET
  {
    id: 'cuet-english',
    name: 'English Language',
    examId: 'cuet',
    description: 'Reading comprehension, verbal ability, rearranging parts, vocabulary, synonyms & antonyms.',
    iconName: 'BookOpen',
    totalQuestions: 650,
    totalTests: 12,
    topics: [
      { id: 'cuet-eng-rc', name: 'Reading Comprehension', questionCount: 180, subtopics: ['Factual Passages', 'Narrative Passages', 'Literary Excerpts'], importance: 'High' },
      { id: 'cuet-eng-vocab', name: 'Vocabulary & Idioms', questionCount: 200, subtopics: ['Synonyms & Antonyms', 'One Word Substitution', 'Idioms & Phrases'], importance: 'High' },
      { id: 'cuet-eng-grammar', name: 'Grammar & Sentence Correction', questionCount: 150, subtopics: ['Subject-Verb Agreement', 'Tenses', 'Active & Passive Voice'], importance: 'Medium' },
      { id: 'cuet-eng-para', name: 'Para Jumbles & Rearrangement', questionCount: 120, subtopics: ['Sentence Reordering', 'Paragraph Completion'], importance: 'Medium' }
    ]
  },
  {
    id: 'cuet-general-test',
    name: 'General Test',
    examId: 'cuet',
    description: 'General knowledge, current affairs, general mental ability, numerical ability, logical and analytical reasoning.',
    iconName: 'Compass',
    totalQuestions: 850,
    totalTests: 15,
    topics: [
      { id: 'cuet-gt-reasoning', name: 'Logical & Analytical Reasoning', questionCount: 260, subtopics: ['Series Completion', 'Blood Relations', 'Coding-Decoding', 'Venn Diagrams'], importance: 'High' },
      { id: 'cuet-gt-quant', name: 'Quantitative & Numerical Ability', questionCount: 280, subtopics: ['Arithmetic', 'Algebra Basics', 'Mensuration', 'Statistics'], importance: 'High' },
      { id: 'cuet-gt-gk', name: 'General Awareness & Current Affairs', questionCount: 310, subtopics: ['National News', 'Science', 'Awards', 'Appointments'], importance: 'High' }
    ]
  },
  {
    id: 'cuet-maths',
    name: 'Applied & Core Mathematics',
    examId: 'cuet',
    description: 'Calculus, algebra, probability, matrices, vectors, differential equations and linear programming.',
    iconName: 'Calculator',
    totalQuestions: 720,
    totalTests: 14,
    topics: [
      { id: 'cuet-m-calculus', name: 'Calculus', questionCount: 220, subtopics: ['Continuity & Differentiability', 'Integrals', 'Differential Equations'], importance: 'High' },
      { id: 'cuet-m-matrices', name: 'Matrices & Determinants', questionCount: 160, subtopics: ['Properties', 'Inverse Matrix', 'System of Linear Equations'], importance: 'High' },
      { id: 'cuet-m-prob', name: 'Probability & Distributions', questionCount: 150, subtopics: ['Bayes Theorem', 'Random Variables', 'Binomial Distribution'], importance: 'Medium' },
      { id: 'cuet-m-vectors', name: 'Vectors & 3D Geometry', questionCount: 190, subtopics: ['Dot & Cross Product', 'Direction Cosines', 'Shortest Distance'], importance: 'High' }
    ]
  },
  {
    id: 'cuet-gk',
    name: 'General Knowledge',
    examId: 'cuet',
    description: 'Indian Constitution, historical events, world geography, scientific discoveries and basic economics.',
    iconName: 'Globe',
    totalQuestions: 540,
    totalTests: 10,
    topics: [
      { id: 'cuet-gk-polity', name: 'Indian Constitution & Governance', questionCount: 170, importance: 'High' },
      { id: 'cuet-gk-geo', name: 'Physical & Human Geography', questionCount: 160, importance: 'Medium' },
      { id: 'cuet-gk-hist', name: 'Modern Indian History', questionCount: 210, importance: 'High' }
    ]
  },
  {
    id: 'cuet-current-affairs',
    name: 'Current Affairs',
    examId: 'cuet',
    description: 'Events of national and international significance over the last 12 months.',
    iconName: 'Newspaper',
    totalQuestions: 480,
    totalTests: 9,
    topics: [
      { id: 'cuet-ca-schemes', name: 'Government Schemes & Initiatives', questionCount: 150, importance: 'High' },
      { id: 'cuet-ca-sports', name: 'Sports Tournaments & Records', questionCount: 140, importance: 'Medium' },
      { id: 'cuet-ca-summits', name: 'International Summits & Treaties', questionCount: 190, importance: 'High' }
    ]
  },
  {
    id: 'cuet-domain',
    name: 'Domain Subjects',
    examId: 'cuet',
    description: 'Specialized domain subjects including Physics, Chemistry, Biology, Economics, and Accountancy.',
    iconName: 'Layers',
    totalQuestions: 960,
    totalTests: 18,
    topics: [
      { id: 'cuet-dom-physics', name: 'Physics Domain', questionCount: 260, importance: 'High' },
      { id: 'cuet-dom-chem', name: 'Chemistry Domain', questionCount: 240, importance: 'High' },
      { id: 'cuet-dom-econ', name: 'Economics Domain', questionCount: 230, importance: 'Medium' },
      { id: 'cuet-dom-bio', name: 'Biology Domain', questionCount: 230, importance: 'Medium' }
    ]
  },

  // CDS
  {
    id: 'cds-english',
    name: 'English',
    examId: 'cds',
    description: 'Synonyms, antonyms, spotting errors, cloze test, sentence improvement, comprehension, ordering of words.',
    iconName: 'BookOpen',
    totalQuestions: 980,
    totalTests: 16,
    topics: [
      { id: 'cds-eng-spotting', name: 'Spotting Errors', questionCount: 250, subtopics: ['Prepositions', 'Subject-Verb Agreement', 'Conditionals'], importance: 'High' },
      { id: 'cds-eng-cloze', name: 'Cloze Test & Fillers', questionCount: 220, subtopics: ['Contextual Fillers', 'Prepositional Phrasal Verbs'], importance: 'High' },
      { id: 'cds-eng-order', name: 'Ordering of Sentences & Words', questionCount: 240, subtopics: ['S1-S6 Sequences', 'Sentence Scrambles'], importance: 'High' },
      { id: 'cds-eng-syn', name: 'Synonyms & Antonyms', questionCount: 270, subtopics: ['Advanced Contextual Meanings'], importance: 'Medium' }
    ]
  },
  {
    id: 'cds-gk',
    name: 'General Knowledge',
    examId: 'cds',
    description: 'Indian polity, history, geography, physics, chemistry, biology, defence news, and current events.',
    iconName: 'ShieldCheck',
    totalQuestions: 1450,
    totalTests: 22,
    topics: [
      { id: 'cds-gk-defence', name: 'Defence & Armed Forces Affairs', questionCount: 280, subtopics: ['Joint Exercises', 'Missile Systems', 'Rank Hierarchy', 'Warships & Aircraft'], importance: 'High' },
      { id: 'cds-gk-polity', name: 'Indian Constitution & Polity', questionCount: 340, subtopics: ['Fundamental Rights', 'Emergency Provisions', 'Judiciary', 'Parliamentary Procedures'], importance: 'High' },
      { id: 'cds-gk-science', name: 'General Science (PCB)', questionCount: 420, subtopics: ['Optics & Mechanics', 'Organic Chemistry Basics', 'Human Physiology'], importance: 'High' },
      { id: 'cds-gk-geo', name: 'Indian & World Geography', questionCount: 410, subtopics: ['Monsoons', 'Rivers & Passes', 'Ocean Currents', 'Mineral Distribution'], importance: 'High' }
    ]
  },
  {
    id: 'cds-maths',
    name: 'Elementary Mathematics',
    examId: 'cds',
    description: 'Arithmetic, algebra, trigonometry, geometry, mensuration, and statistics (for IMA, INA, AFA candidates).',
    iconName: 'Calculator',
    totalQuestions: 1100,
    totalTests: 18,
    topics: [
      { id: 'cds-m-trig', name: 'Trigonometry & Heights/Distances', questionCount: 240, subtopics: ['Identities', 'Heights & Distances', 'Circular Measure'], importance: 'High' },
      { id: 'cds-m-geom', name: 'Geometry & Coordinate Geometry', questionCount: 290, subtopics: ['Triangles & Circles Theorems', 'Tangent Properties', 'Lines & Angles'], importance: 'High' },
      { id: 'cds-m-mens', name: 'Mensuration 2D & 3D', questionCount: 260, subtopics: ['Cones, Cylinders & Spheres', 'Prisms & Pyramids', 'Shaded Area'], importance: 'High' },
      { id: 'cds-m-arith', name: 'Number System & Arithmetic', questionCount: 310, subtopics: ['HCF & LCM', 'Time, Speed & Distance', 'Work & Wages', 'SI & CI'], importance: 'High' }
    ]
  },

  // NDA
  {
    id: 'nda-maths',
    name: 'NDA Mathematics',
    examId: 'nda',
    description: 'Paper 1 (300 Marks): Algebra, matrices & determinants, trigonometry, 2D & 3D geometry, differential calculus, integral calculus, vector algebra, statistics & probability.',
    iconName: 'Calculator',
    totalQuestions: 1650,
    totalTests: 24,
    topics: [
      { id: 'nda-m-algebra', name: 'Algebra & Quadratic Equations', questionCount: 320, subtopics: ['Complex Numbers', 'AP, GP, HP', 'Permutations & Combinations', 'Binomial Theorem'], importance: 'High' },
      { id: 'nda-m-trig', name: 'Trigonometry & Inverse Functions', questionCount: 280, subtopics: ['Multiple & Submultiple Angles', 'Trigonometric Equations', 'Properties of Triangles'], importance: 'High' },
      { id: 'nda-m-calc', name: 'Calculus (Diff & Integral)', questionCount: 360, subtopics: ['Limits, Continuity & Derivations', 'Applications of Derivatives', 'Definite Integrals', 'Differential Equations'], importance: 'High' },
      { id: 'nda-m-geom', name: 'Geometry (2D & 3D)', questionCount: 270, subtopics: ['Straight Lines & Circles', 'Conic Sections (Parabola, Ellipse)', 'Planes & Lines in 3D'], importance: 'High' },
      { id: 'nda-m-prob', name: 'Probability & Statistics', questionCount: 230, subtopics: ['Conditional Probability', 'Bayes Theorem', 'Mean, Variance & SD'], importance: 'High' },
      { id: 'nda-m-vectors', name: 'Vector Algebra & Matrices', questionCount: 190, subtopics: ['Dot & Cross Product', 'Determinant Expansion', 'Rank of Matrix'], importance: 'Medium' }
    ]
  },
  {
    id: 'nda-gat',
    name: 'General Ability Test (GAT)',
    examId: 'nda',
    description: 'Paper 2 (600 Marks): Part A English (200 Marks) & Part B General Knowledge (400 Marks across Physics, Chemistry, General Science, History, Geography, Current Events).',
    iconName: 'Award',
    totalQuestions: 2100,
    totalTests: 30,
    topics: [
      { id: 'nda-gat-eng', name: 'Part A: English Vocabulary & Grammar', questionCount: 450, subtopics: ['Spotting Errors', 'Antonyms & Synonyms', 'Sentence Completion'], importance: 'High' },
      { id: 'nda-gat-phy', name: 'Part B: Physics', questionCount: 380, subtopics: ['Laws of Motion', 'Gravitation', 'Optics & Sound', 'Electricity & Magnetism'], importance: 'High' },
      { id: 'nda-gat-chem', name: 'Part B: Chemistry', questionCount: 290, subtopics: ['Acids, Bases & Salts', 'Metals & Non-metals', 'Atomic Structure', 'Atmospheric Gases'], importance: 'Medium' },
      { id: 'nda-gat-bio', name: 'Part B: General Science & Biology', questionCount: 250, subtopics: ['Human Organs & Systems', 'Diseases & Immunity', 'Nutrients & Vitamins'], importance: 'Medium' },
      { id: 'nda-gat-hist', name: 'Part B: History & Freedom Movement', questionCount: 340, subtopics: ['Indian National Movement', 'Gandhian Era', 'World Wars & Renaissance'], importance: 'High' },
      { id: 'nda-gat-geo', name: 'Part B: Geography (India & Physical)', questionCount: 390, subtopics: ['Physical Geography', 'Indian Climate & Agriculture', 'Natural Resources'], importance: 'High' }
    ]
  },

  // AFCAT
  {
    id: 'afcat-english',
    name: 'English',
    examId: 'afcat',
    description: 'Comprehension, error detection, sentence completion, synonyms, antonyms, idioms & phrases, cloze test.',
    iconName: 'BookOpen',
    totalQuestions: 620,
    totalTests: 12,
    topics: [
      { id: 'afcat-eng-vocab', name: 'Vocabulary & Idioms', questionCount: 220, importance: 'High' },
      { id: 'afcat-eng-rc', name: 'Reading Comprehension', questionCount: 190, importance: 'High' },
      { id: 'afcat-eng-errors', name: 'Error Spotting & Sentence Correction', questionCount: 210, importance: 'Medium' }
    ]
  },
  {
    id: 'afcat-ga',
    name: 'General Awareness',
    examId: 'afcat',
    description: 'History, sports, government, geography, environment, defence, art and culture, basic science, current affairs.',
    iconName: 'Globe',
    totalQuestions: 840,
    totalTests: 15,
    topics: [
      { id: 'afcat-ga-defence', name: 'Aviation & Defence GK', questionCount: 260, subtopics: ['IAF Squadrons & Aircraft', 'Missile Programmes', 'Gallantry Awards'], importance: 'High' },
      { id: 'afcat-ga-sports', name: 'Sports & Olympics Terminology', questionCount: 210, subtopics: ['Trophies', 'Athletics & Grand Slams', 'Terminologies'], importance: 'High' },
      { id: 'afcat-ga-static', name: 'Static General Knowledge', questionCount: 370, subtopics: ['First in India', 'Books & Authors', 'National Parks'], importance: 'Medium' }
    ]
  },
  {
    id: 'afcat-numerical',
    name: 'Numerical Ability',
    examId: 'afcat',
    description: 'Decimal fraction, time & work, average, profit & loss, percentage, ratio & proportion, simple interest, speed, distance & time.',
    iconName: 'PieChart',
    totalQuestions: 580,
    totalTests: 12,
    topics: [
      { id: 'afcat-num-speed', name: 'Speed, Distance & Time (Trains/Boats)', questionCount: 160, importance: 'High' },
      { id: 'afcat-num-work', name: 'Time & Work, Pipes & Cisterns', questionCount: 150, importance: 'High' },
      { id: 'afcat-num-arith', name: 'Profit, Loss, Discount & Percentages', questionCount: 140, importance: 'High' },
      { id: 'afcat-num-ratio', name: 'Ratio, Proportions & Averages', questionCount: 130, importance: 'Medium' }
    ]
  },
  {
    id: 'afcat-reasoning',
    name: 'Reasoning & Military Aptitude',
    examId: 'afcat',
    description: 'Verbal skills and spatial ability, figure analogies, odd one out, figure completion, embedded figures, Venn diagrams.',
    iconName: 'Cpu',
    totalQuestions: 750,
    totalTests: 16,
    topics: [
      { id: 'afcat-reas-nonverbal', name: 'Non-Verbal Spatial Reasoning', questionCount: 310, subtopics: ['Pattern Series', 'Figure Classification', 'Dot Situation', 'Embedded Figures'], importance: 'High' },
      { id: 'afcat-reas-analogy', name: 'Analogies & Odd One Out', questionCount: 220, subtopics: ['Word Pair Analogies', 'Semantic Classification'], importance: 'High' },
      { id: 'afcat-reas-venn', name: 'Venn Diagrams & Syllogisms', questionCount: 220, subtopics: ['3-Circle Diagrams', 'Logical Deduction'], importance: 'Medium' }
    ]
  },

  // General Studies (9 comprehensive subjects requested)
  {
    id: 'gs-history',
    name: 'History (Ancient, Medieval, Modern)',
    examId: 'general-studies',
    description: 'Indus Valley civilization, Vedic period, Maurya & Gupta empires, Delhi Sultanate, Mughals, and Indian National Movement.',
    iconName: 'Scroll',
    totalQuestions: 1100,
    totalTests: 18,
    topics: [
      { id: 'gs-hist-ancient', name: 'Ancient India & Indus Valley', questionCount: 280, importance: 'High' },
      { id: 'gs-hist-medieval', name: 'Medieval India & Mughals', questionCount: 260, importance: 'Medium' },
      { id: 'gs-hist-modern', name: 'Modern India & Freedom Struggle', questionCount: 420, importance: 'High' },
      { id: 'gs-hist-rev', name: 'Social Reform Movements', questionCount: 140, importance: 'Medium' }
    ]
  },
  {
    id: 'gs-geography',
    name: 'Geography',
    examId: 'general-studies',
    description: 'Physical geography, geomorphology, climatology, oceanography, Indian physiography, rivers, and natural resources.',
    iconName: 'Map',
    totalQuestions: 980,
    totalTests: 16,
    topics: [
      { id: 'gs-geo-phys', name: 'Physical Geography & Earth Crust', questionCount: 260, importance: 'High' },
      { id: 'gs-geo-india', name: 'Indian Drainage & Monsoons', questionCount: 380, importance: 'High' },
      { id: 'gs-geo-econ', name: 'Agriculture & Mineral Resources', questionCount: 210, importance: 'Medium' },
      { id: 'gs-geo-world', name: 'World Geography & Straits', questionCount: 130, importance: 'Medium' }
    ]
  },
  {
    id: 'gs-polity',
    name: 'Indian Polity & Governance',
    examId: 'general-studies',
    description: 'Preamble, Fundamental Rights & Duties, Directive Principles, President, Parliament, Judiciary, and Constitutional Bodies.',
    iconName: 'Scale',
    totalQuestions: 1250,
    totalTests: 20,
    topics: [
      { id: 'gs-pol-const', name: 'Preamble, FRs, DPSP & Duties', questionCount: 380, importance: 'High' },
      { id: 'gs-pol-union', name: 'President, PM & Parliament', questionCount: 340, importance: 'High' },
      { id: 'gs-pol-jud', name: 'Supreme Court & High Courts', questionCount: 260, importance: 'High' },
      { id: 'gs-pol-local', name: 'Panchayati Raj & Local Bodies', questionCount: 160, importance: 'Medium' },
      { id: 'gs-pol-bodies', name: 'Election Commission & CAG', questionCount: 110, importance: 'Medium' }
    ]
  },
  {
    id: 'gs-economics',
    name: 'Indian Economy & Budget',
    examId: 'general-studies',
    description: 'Macroeconomics, national income, fiscal & monetary policy, inflation, banking, RBI, taxation, and international trade.',
    iconName: 'TrendingUp',
    totalQuestions: 820,
    totalTests: 14,
    topics: [
      { id: 'gs-econ-macro', name: 'National Income, GDP & Inflation', questionCount: 260, importance: 'High' },
      { id: 'gs-econ-bank', name: 'RBI, Monetary Policy & Banking', questionCount: 240, importance: 'High' },
      { id: 'gs-econ-fiscal', name: 'Union Budget & GST Structure', questionCount: 190, importance: 'High' },
      { id: 'gs-econ-trade', name: 'Balance of Payments & Forex', questionCount: 130, importance: 'Medium' }
    ]
  },
  {
    id: 'gs-general-science',
    name: 'General Science',
    examId: 'general-studies',
    description: 'Everyday applications of physics, chemical compounds, human biology, genetics, and health science.',
    iconName: 'FlaskConical',
    totalQuestions: 940,
    totalTests: 15,
    topics: [
      { id: 'gs-sci-phy', name: 'Physics in Daily Life', questionCount: 310, importance: 'High' },
      { id: 'gs-sci-chem', name: 'Everyday Chemistry & Polymers', questionCount: 290, importance: 'Medium' },
      { id: 'gs-sci-bio', name: 'Human Biology & Nutrients', questionCount: 340, importance: 'High' }
    ]
  },
  {
    id: 'gs-current-affairs',
    name: 'Current Affairs & Events',
    examId: 'general-studies',
    description: 'National initiatives, international diplomacy, summits, indices, science breakthroughs, and bills.',
    iconName: 'Newspaper',
    totalQuestions: 780,
    totalTests: 14,
    topics: [
      { id: 'gs-ca-bills', name: 'Recent Legislation & Supreme Court Rulings', questionCount: 280, importance: 'High' },
      { id: 'gs-ca-reports', name: 'Global Indices & Rankings', questionCount: 240, importance: 'High' },
      { id: 'gs-ca-env', name: 'COP Summits & Climate Action', questionCount: 260, importance: 'Medium' }
    ]
  },
  {
    id: 'gs-static-gk',
    name: 'Static GK',
    examId: 'general-studies',
    description: 'National parks, wildlife sanctuaries, biosphere reserves, dams, airports, UNESCO sites, and folk arts.',
    iconName: 'Compass',
    totalQuestions: 890,
    totalTests: 15,
    topics: [
      { id: 'gs-static-parks', name: 'National Parks & Wildlife Sanctuaries', questionCount: 280, importance: 'High' },
      { id: 'gs-static-unesco', name: 'UNESCO World Heritage Sites in India', questionCount: 210, importance: 'High' },
      { id: 'gs-static-facts', name: 'Superlatives & Important Headquarters', questionCount: 400, importance: 'Medium' }
    ]
  },
  {
    id: 'gs-environment',
    name: 'Environment & Ecology',
    examId: 'general-studies',
    description: 'Biodiversity conservation, climate change conventions, Ramsar wetlands, carbon footprints, and pollution control.',
    iconName: 'Leaf',
    totalQuestions: 640,
    totalTests: 11,
    topics: [
      { id: 'gs-env-bio', name: 'Biodiversity & Conservation (IUCN Red List)', questionCount: 230, importance: 'High' },
      { id: 'gs-env-wet', name: 'Ramsar Wetlands & Coral Reefs', questionCount: 190, importance: 'High' },
      { id: 'gs-env-poll', name: 'Pollution, AQI & Renewable Energy', questionCount: 220, importance: 'Medium' }
    ]
  },
  {
    id: 'gs-art-culture',
    name: 'Art & Culture',
    examId: 'general-studies',
    description: 'Classical & folk dances, Indian architecture, cave temples, classical music, literary traditions, and painting schools.',
    iconName: 'Sparkles',
    totalQuestions: 510,
    totalTests: 9,
    topics: [
      { id: 'gs-art-dance', name: 'Classical Dances & Musical Instruments', questionCount: 180, importance: 'High' },
      { id: 'gs-art-arch', name: 'Temple Architecture (Nagara, Dravida, Vesara)', questionCount: 190, importance: 'High' },
      { id: 'gs-art-paint', name: 'Miniature Paintings & Folk Art Styles', questionCount: 140, importance: 'Medium' }
    ]
  }
];

export const SAMPLE_QUESTIONS: Question[] = [
  // NDA Maths
  {
    id: 'q1',
    examId: 'nda',
    subjectId: 'nda-maths',
    topicId: 'nda-m-algebra',
    questionText: 'If the roots of the quadratic equation x² - 2kx + (k² - 1) = 0 are real and both are greater than 2, then what is the range of values for k?',
    options: [
      'k > 2.5',
      'k ≥ 3',
      'k > 2',
      '2 < k < 3'
    ],
    correctAnswerIndex: 0,
    explanation: 'For roots to be real, discriminant D = 4k² - 4(k² - 1) = 4 > 0 (always true). For roots to be greater than 2, we need: (1) f(2) > 0 => 2² - 2k(2) + k² - 1 > 0 => k² - 4k + 3 > 0 => (k-1)(k-3) > 0 => k < 1 or k > 3. Also -b/(2a) = 2k/2 = k > 2. Combining these, both roots are k - 1 and k + 1. Smaller root is k - 1. Since both roots > 2, k - 1 > 2 => k > 3 (or k > 2.5 condition check). Hence k > 2.5 / k > 3.',
    difficulty: 'Medium',
    previousYearYear: 2024
  },
  {
    id: 'q2',
    examId: 'nda',
    subjectId: 'nda-maths',
    topicId: 'nda-m-trig',
    questionText: 'What is the value of sin 10° · sin 50° · sin 70°?',
    options: [
      '1/4',
      '1/8',
      '1/16',
      '√3/8'
    ],
    correctAnswerIndex: 1,
    explanation: 'Using the standard trigonometric identity: sin θ · sin(60° - θ) · sin(60° + θ) = (1/4) sin 3θ. Here θ = 10°. Thus, sin 10° · sin 50° · sin 70° = (1/4) sin(3 × 10°) = (1/4) sin 30° = (1/4) × (1/2) = 1/8.',
    difficulty: 'Easy',
    previousYearYear: 2023
  },
  {
    id: 'q3',
    examId: 'nda',
    subjectId: 'nda-maths',
    topicId: 'nda-m-calc',
    questionText: 'What is the value of ∫ (e^x (1 + x)) / (cos²(x e^x)) dx?',
    options: [
      'tan(x e^x) + C',
      'cot(x e^x) + C',
      'sec(x e^x) + C',
      'sin(x e^x) + C'
    ],
    correctAnswerIndex: 0,
    explanation: 'Let u = x e^x. Differentiating both sides with respect to x: du = (e^x + x e^x) dx = e^x(1 + x) dx. The integral becomes ∫ du / cos²(u) = ∫ sec²(u) du = tan(u) + C = tan(x e^x) + C.',
    difficulty: 'Easy',
    previousYearYear: 2024
  },
  {
    id: 'q4',
    examId: 'nda',
    subjectId: 'nda-gat',
    topicId: 'nda-gat-phy',
    questionText: 'A body is projected vertically upwards from the surface of Earth with escape velocity ve. If another body is projected at an angle of 45° with the horizontal, what must its escape velocity be?',
    options: [
      've',
      've / √2',
      've · √2',
      've / 2'
    ],
    correctAnswerIndex: 0,
    explanation: 'Escape velocity is given by ve = √(2GM/R). It depends solely on the mass and radius of the celestial body and the initial position from its center. It is completely independent of the angle of projection! Therefore, at 45°, it is still ve.',
    difficulty: 'Easy',
    previousYearYear: 2023
  },
  {
    id: 'q5',
    examId: 'nda',
    subjectId: 'nda-gat',
    topicId: 'nda-gat-hist',
    questionText: 'Who was the Viceroy of India when the Indian National Congress was founded in Bombay in December 1885?',
    options: [
      'Lord Ripon',
      'Lord Dufferin',
      'Lord Curzon',
      'Lord Lytton'
    ],
    correctAnswerIndex: 1,
    explanation: 'Lord Dufferin was the Viceroy of India from 1884 to 1888. The Indian National Congress (INC) was established in December 1885 by Allan Octavian Hume at Gokuldas Tejpal Sanskrit College in Bombay.',
    difficulty: 'Medium',
    previousYearYear: 2022
  },

  // CDS English & GK
  {
    id: 'q6',
    examId: 'cds',
    subjectId: 'cds-english',
    topicId: 'cds-eng-spotting',
    questionText: 'Spot the error: "Neither the commander (A) / nor his soldiers (B) / was able to breach (C) / the enemy fortification. (D)"',
    options: [
      'Neither the commander (A)',
      'nor his soldiers (B)',
      'was able to breach (C)',
      'No error (D)'
    ],
    correctAnswerIndex: 2,
    explanation: 'In the construction "Neither... nor...", the verb agrees in person and number with the closer subject (the subject following "nor"). Here, "his soldiers" is plural, so the plural verb "were" should be used instead of "was".',
    difficulty: 'Easy',
    previousYearYear: 2024
  },
  {
    id: 'q7',
    examId: 'cds',
    subjectId: 'cds-gk',
    topicId: 'cds-gk-defence',
    questionText: 'What is the operational range of India\'s indigenous stealth cruise missile "Nirbhay"?',
    options: [
      'approx 500 km',
      'approx 1,000 km',
      'approx 2,500 km',
      'approx 5,000 km'
    ],
    correctAnswerIndex: 1,
    explanation: 'Nirbhay is an Indian indigenously developed long-range, all-weather, subsonic cruise missile developed by the Aeronautical Development Establishment (ADE), DRDO, with an operational strike range of approximately 1,000 km.',
    difficulty: 'Medium',
    previousYearYear: 2024
  },
  {
    id: 'q8',
    examId: 'cds',
    subjectId: 'cds-gk',
    topicId: 'cds-gk-polity',
    questionText: 'Which constitutional amendment act substituted "Armed Rebellion" for "Internal Disturbance" under Article 352 (National Emergency)?',
    options: [
      '42nd Constitutional Amendment Act, 1976',
      '44th Constitutional Amendment Act, 1978',
      '52nd Constitutional Amendment Act, 1985',
      '86th Constitutional Amendment Act, 2002'
    ],
    correctAnswerIndex: 1,
    explanation: 'The 44th Amendment Act of 1978 substituted the vague phrase "internal disturbance" with "armed rebellion" to prevent executive abuse of proclamation of National Emergency under Article 352.',
    difficulty: 'Medium',
    previousYearYear: 2023
  },
  {
    id: 'q9',
    examId: 'cds',
    subjectId: 'cds-maths',
    topicId: 'cds-m-geom',
    questionText: 'Two circles touch each other externally. The radius of the first circle is 9 cm and that of the second circle is 4 cm. What is the length of their direct common tangent?',
    options: [
      '12 cm',
      '13 cm',
      '10 cm',
      '15 cm'
    ],
    correctAnswerIndex: 0,
    explanation: 'For two circles touching externally, the length of the direct common tangent L is given by 2√(r1 · r2). Substituting r1 = 9 and r2 = 4: L = 2√(9 × 4) = 2√36 = 2 × 6 = 12 cm.',
    difficulty: 'Easy',
    previousYearYear: 2024
  },

  // CUET General Test & Maths
  {
    id: 'q10',
    examId: 'cuet',
    subjectId: 'cuet-general-test',
    topicId: 'cuet-gt-reasoning',
    questionText: 'Find the next term in the alphanumeric series: B2D, E4G, H8J, K16M, ?',
    options: [
      'N32P',
      'N32O',
      'M32P',
      'O32Q'
    ],
    correctAnswerIndex: 0,
    explanation: 'First letter: B(+3)->E(+3)->H(+3)->K(+3)->N. Number: 2(*2)->4(*2)->8(*2)->16(*2)->32. Third letter: D(+3)->G(+3)->J(+3)->M(+3)->P. Thus the next term is N32P.',
    difficulty: 'Easy',
    previousYearYear: 2024
  },
  {
    id: 'q11',
    examId: 'cuet',
    subjectId: 'cuet-general-test',
    topicId: 'cuet-gt-quant',
    questionText: 'A dishonest dealer sells goods at cost price but uses a false weight of 950 grams instead of 1 kilogram. What is his percentage gain?',
    options: [
      '5%',
      '5.26%',
      '4.75%',
      '5.50%'
    ],
    correctAnswerIndex: 1,
    explanation: 'Gain % = [Error / (True Value - Error)] × 100 = [50 / (1000 - 50)] × 100 = [50 / 950] × 100 = 100 / 19 ≈ 5.26%.',
    difficulty: 'Medium',
    previousYearYear: 2024
  },
  {
    id: 'q12',
    examId: 'cuet',
    subjectId: 'cuet-maths',
    topicId: 'cuet-m-matrices',
    questionText: 'If A is an invertible square matrix of order 3 and |A| = 4, then what is the determinant of its adjoint matrix, |adj(A)|?',
    options: [
      '4',
      '16',
      '64',
      '1/4'
    ],
    correctAnswerIndex: 1,
    explanation: 'The standard theorem states that for any square matrix A of order n, |adj(A)| = |A|^(n - 1). Here n = 3 and |A| = 4. Therefore, |adj(A)| = 4^(3 - 1) = 4² = 16.',
    difficulty: 'Easy',
    previousYearYear: 2023
  },
  {
    id: 'q13',
    examId: 'cuet',
    subjectId: 'cuet-english',
    topicId: 'cuet-eng-vocab',
    questionText: 'Choose the word that is most nearly opposite in meaning (Antonym) to "EPHEMERAL":',
    options: [
      'Transient',
      'Perpetual',
      'Evanescent',
      'Fugitive'
    ],
    correctAnswerIndex: 1,
    explanation: '"Ephemeral" means lasting for a very short time. Its exact antonym is "Perpetual" (never-ending or changing). "Transient" and "Evanescent" are synonyms.',
    difficulty: 'Easy',
    previousYearYear: 2024
  },

  // AFCAT Reasoning & Numerical
  {
    id: 'q14',
    examId: 'afcat',
    subjectId: 'afcat-numerical',
    topicId: 'afcat-num-speed',
    questionText: 'A train 180 meters long running at 72 km/h crosses a platform in 20 seconds. What is the length of the platform?',
    options: [
      '200 meters',
      '220 meters',
      '240 meters',
      '180 meters'
    ],
    correctAnswerIndex: 1,
    explanation: 'Speed in m/s = 72 × (5/18) = 20 m/s. Total distance covered = Speed × Time = 20 m/s × 20 s = 400 m. Total distance = Train length + Platform length. 400 = 180 + Length of platform => Length = 400 - 180 = 220 meters.',
    difficulty: 'Easy',
    previousYearYear: 2024
  },
  {
    id: 'q15',
    examId: 'afcat',
    subjectId: 'afcat-reasoning',
    topicId: 'afcat-reas-analogy',
    questionText: 'Select the related pair from the given alternatives: Aeroplane : Hangar :: Honeybee : ?',
    options: [
      'Nest',
      'Apiary',
      'Burrow',
      'Kennel'
    ],
    correctAnswerIndex: 1,
    explanation: 'An aeroplane is kept and sheltered in a hangar. Similarly, bees are kept and cultivated in an apiary.',
    difficulty: 'Easy',
    previousYearYear: 2024
  },
  {
    id: 'q16',
    examId: 'afcat',
    subjectId: 'afcat-ga',
    topicId: 'afcat-ga-defence',
    questionText: 'Who was the first and only Marshal of the Indian Air Force to be conferred with the five-star rank?',
    options: [
      'Subroto Mukherjee',
      'Arjan Singh',
      'Birender Singh Dhanoa',
      'Pratap Chandra Lal'
    ],
    correctAnswerIndex: 1,
    explanation: 'Marshal of the Indian Air Force Arjan Singh (DFC) was awarded the five-star rank in January 2002 in recognition of his distinguished leadership and service during the 1965 Indo-Pak war.',
    difficulty: 'Easy',
    previousYearYear: 2023
  },

  // General Studies (Polity, History, Geography, Environment, Economics)
  {
    id: 'q17',
    examId: 'general-studies',
    subjectId: 'gs-polity',
    topicId: 'gs-pol-const',
    questionText: 'Which of the following writs is issued by the Supreme Court or High Court to compel an authority or public official to perform their statutory public duty?',
    options: [
      'Habeas Corpus',
      'Mandamus',
      'Quo-Warranto',
      'Certiorari'
    ],
    correctAnswerIndex: 1,
    explanation: '"Mandamus" literally means "We Command". It is a judicial command issued to any constitutional, statutory, or public authority to perform a mandatory duty that they have failed or refused to perform.',
    difficulty: 'Easy',
    previousYearYear: 2024
  },
  {
    id: 'q18',
    examId: 'general-studies',
    subjectId: 'gs-geography',
    topicId: 'gs-geo-india',
    questionText: 'Through which of the following states does the Tropic of Cancer (23.5° N) NOT pass in India?',
    options: [
      'Rajasthan',
      'Tripura',
      'Odisha',
      'Chhattisgarh'
    ],
    correctAnswerIndex: 2,
    explanation: 'The Tropic of Cancer passes through 8 Indian states: Gujarat, Rajasthan, Madhya Pradesh, Chhattisgarh, Jharkhand, West Bengal, Tripura, and Mizoram. It does NOT pass through Odisha (which lies slightly south of 23.5° N).',
    difficulty: 'Medium',
    previousYearYear: 2023
  },
  {
    id: 'q19',
    examId: 'general-studies',
    subjectId: 'gs-economics',
    topicId: 'gs-econ-bank',
    questionText: 'What is the rate at which the Reserve Bank of India (RBI) borrows money from commercial banks within the country?',
    options: [
      'Repo Rate',
      'Reverse Repo Rate',
      'Bank Rate',
      'Cash Reserve Ratio'
    ],
    correctAnswerIndex: 1,
    explanation: 'Reverse Repo Rate is the interest rate at which the RBI absorbs liquidity from commercial banks by borrowing funds against eligible government securities. Repo Rate is the rate at which RBI lends to banks.',
    difficulty: 'Easy',
    previousYearYear: 2024
  },
  {
    id: 'q20',
    examId: 'general-studies',
    subjectId: 'gs-environment',
    topicId: 'gs-env-wet',
    questionText: 'The Ramsar Convention on Wetlands of International Importance was adopted in 1971 in which country?',
    options: [
      'Switzerland',
      'Iran',
      'France',
      'Japan'
    ],
    correctAnswerIndex: 1,
    explanation: 'The Convention on Wetlands of International Importance was signed on 2 February 1971 in the Iranian city of Ramsar on the shores of the Caspian Sea. World Wetlands Day is celebrated annually on 2 February.',
    difficulty: 'Easy',
    previousYearYear: 2023
  },
  {
    id: 'q21',
    examId: 'general-studies',
    subjectId: 'gs-history',
    topicId: 'gs-hist-modern',
    questionText: 'Who was known as the "Grand Old Man of India" and authored "Poverty and Un-British Rule in India"?',
    options: [
      'Gopal Krishna Gokhale',
      'Dadabhai Naoroji',
      'Bal Gangadhar Tilak',
      'Surendranath Banerjee'
    ],
    correctAnswerIndex: 1,
    explanation: 'Dadabhai Naoroji formulated the "Drain of Wealth" theory in his seminal book "Poverty and Un-British Rule in India" and was thrice elected President of the Indian National Congress.',
    difficulty: 'Easy',
    previousYearYear: 2023
  },
  {
    id: 'q22',
    examId: 'general-studies',
    subjectId: 'gs-art-culture',
    topicId: 'gs-art-dance',
    questionText: 'Sattriya, a classical dance form recognized by the Sangeet Natak Akademi, originated in which Indian state?',
    options: [
      'Kerala',
      'Manipur',
      'Assam',
      'Odisha'
    ],
    correctAnswerIndex: 2,
    explanation: 'Sattriya dance originated in the 15th century in the Vaishnavite monasteries (Sattras) of Assam, founded by the great saint-reformer Mahapurush Srimanta Sankaradeva.',
    difficulty: 'Medium',
    previousYearYear: 2024
  },
  {
    id: 'q23',
    examId: 'nda',
    subjectId: 'nda-maths',
    topicId: 'nda-m-geom',
    questionText: 'What is the distance between the two parallel planes 2x + y + 2z = 8 and 4x + 2y + 4z + 5 = 0?',
    options: [
      '3.5 units',
      '7/2 units',
      '21/6 units',
      '7/6 units'
    ],
    correctAnswerIndex: 0,
    explanation: 'Rewrite the second equation divided by 2: 2x + y + 2z + 2.5 = 0, or 2x + y + 2z = -2.5. The distance between parallel planes ax + by + cz = d1 and ax + by + cz = d2 is |d1 - d2| / √(a² + b² + c²). Here d1 = 8, d2 = -2.5, a = 2, b = 1, c = 2. Distance = |8 - (-2.5)| / √(4 + 1 + 4) = 10.5 / 3 = 3.5 units.',
    difficulty: 'Medium',
    previousYearYear: 2023
  },
  {
    id: 'q24',
    examId: 'cds',
    subjectId: 'cds-gk',
    topicId: 'cds-gk-geo',
    questionText: 'Which strait separates the Andaman Sea from the South China Sea, serving as one of the world\'s most critical naval chokepoints?',
    options: [
      'Strait of Hormuz',
      'Strait of Malacca',
      'Bab-el-Mandeb',
      'Sunda Strait'
    ],
    correctAnswerIndex: 1,
    explanation: 'The Strait of Malacca connects the Indian Ocean (via the Andaman Sea) to the Pacific Ocean (via the South China Sea) between the Malay Peninsula and the Indonesian island of Sumatra.',
    difficulty: 'Easy',
    previousYearYear: 2024
  },
  {
    id: 'q25',
    examId: 'cuet',
    subjectId: 'cuet-general-test',
    topicId: 'cuet-gt-reasoning',
    questionText: 'Pointing to a gentleman, Sneha said, "His only brother is the father of my daughter\'s father." How is the gentleman related to Sneha\'s husband?',
    options: [
      'Father',
      'Paternal Uncle',
      'Maternal Uncle',
      'Grandfather'
    ],
    correctAnswerIndex: 1,
    explanation: '"My daughter\'s father" is Sneha\'s husband. "The father of Sneha\'s husband" is her father-in-law. The gentleman\'s only brother is her father-in-law. Therefore, the gentleman is her father-in-law\'s brother, which is her husband\'s paternal uncle.',
    difficulty: 'Medium',
    previousYearYear: 2023
  }
];

export const MOCK_TESTS: MockTest[] = [
  {
    id: 'mock-nda-full-1',
    title: 'NDA 2025 All India Full Mock Test - 01 (Maths & GAT)',
    examId: 'nda',
    totalQuestions: 15,
    durationMinutes: 20,
    totalMarks: 60,
    positiveMarksPerQuestion: 4.0,
    negativeMarksPerQuestion: 1.33,
    difficulty: 'Medium',
    attemptsCount: 14200,
    questions: [
      SAMPLE_QUESTIONS[0],
      SAMPLE_QUESTIONS[1],
      SAMPLE_QUESTIONS[2],
      SAMPLE_QUESTIONS[3],
      SAMPLE_QUESTIONS[4],
      SAMPLE_QUESTIONS[22],
      SAMPLE_QUESTIONS[5],
      SAMPLE_QUESTIONS[6],
      SAMPLE_QUESTIONS[7],
      SAMPLE_QUESTIONS[8],
      SAMPLE_QUESTIONS[16],
      SAMPLE_QUESTIONS[17],
      SAMPLE_QUESTIONS[18],
      SAMPLE_QUESTIONS[19],
      SAMPLE_QUESTIONS[20]
    ]
  },
  {
    id: 'mock-nda-maths-speed',
    title: 'NDA Mathematics High-Yield Speed Test (Algebra & Trig)',
    examId: 'nda',
    subjectId: 'nda-maths',
    totalQuestions: 6,
    durationMinutes: 10,
    totalMarks: 15,
    positiveMarksPerQuestion: 2.5,
    negativeMarksPerQuestion: 0.83,
    difficulty: 'Hard',
    attemptsCount: 8900,
    questions: [
      SAMPLE_QUESTIONS[0],
      SAMPLE_QUESTIONS[1],
      SAMPLE_QUESTIONS[2],
      SAMPLE_QUESTIONS[22],
      SAMPLE_QUESTIONS[8],
      SAMPLE_QUESTIONS[11]
    ]
  },
  {
    id: 'mock-cds-gk-full',
    title: 'CDS (I) 2025 General Knowledge Booster Test',
    examId: 'cds',
    subjectId: 'cds-gk',
    totalQuestions: 10,
    durationMinutes: 15,
    totalMarks: 10,
    positiveMarksPerQuestion: 1.0,
    negativeMarksPerQuestion: 0.33,
    difficulty: 'Medium',
    attemptsCount: 11200,
    questions: [
      SAMPLE_QUESTIONS[6],
      SAMPLE_QUESTIONS[7],
      SAMPLE_QUESTIONS[16],
      SAMPLE_QUESTIONS[17],
      SAMPLE_QUESTIONS[18],
      SAMPLE_QUESTIONS[19],
      SAMPLE_QUESTIONS[20],
      SAMPLE_QUESTIONS[21],
      SAMPLE_QUESTIONS[23],
      SAMPLE_QUESTIONS[3]
    ]
  },
  {
    id: 'mock-cuet-gt-1',
    title: 'CUET UG 2025 General Test Live Mock Series #03',
    examId: 'cuet',
    subjectId: 'cuet-general-test',
    totalQuestions: 8,
    durationMinutes: 12,
    totalMarks: 40,
    positiveMarksPerQuestion: 5.0,
    negativeMarksPerQuestion: 1.0,
    difficulty: 'Easy',
    attemptsCount: 16500,
    questions: [
      SAMPLE_QUESTIONS[9],
      SAMPLE_QUESTIONS[10],
      SAMPLE_QUESTIONS[12],
      SAMPLE_QUESTIONS[24],
      SAMPLE_QUESTIONS[13],
      SAMPLE_QUESTIONS[17],
      SAMPLE_QUESTIONS[18],
      SAMPLE_QUESTIONS[19]
    ]
  },
  {
    id: 'mock-afcat-full-1',
    title: 'AFCAT 02/2025 Complete Model Paper (Reasoning & Numeracy)',
    examId: 'afcat',
    totalQuestions: 8,
    durationMinutes: 12,
    totalMarks: 24,
    positiveMarksPerQuestion: 3.0,
    negativeMarksPerQuestion: 1.0,
    difficulty: 'Medium',
    attemptsCount: 9400,
    questions: [
      SAMPLE_QUESTIONS[13],
      SAMPLE_QUESTIONS[14],
      SAMPLE_QUESTIONS[15],
      SAMPLE_QUESTIONS[9],
      SAMPLE_QUESTIONS[10],
      SAMPLE_QUESTIONS[6],
      SAMPLE_QUESTIONS[7],
      SAMPLE_QUESTIONS[23]
    ]
  },
  {
    id: 'mock-gs-all-india',
    title: 'General Studies Foundation Grand Test - Polity & Geography',
    examId: 'general-studies',
    totalQuestions: 10,
    durationMinutes: 15,
    totalMarks: 20,
    positiveMarksPerQuestion: 2.0,
    negativeMarksPerQuestion: 0.66,
    difficulty: 'Medium',
    attemptsCount: 22100,
    questions: [
      SAMPLE_QUESTIONS[16],
      SAMPLE_QUESTIONS[17],
      SAMPLE_QUESTIONS[18],
      SAMPLE_QUESTIONS[19],
      SAMPLE_QUESTIONS[20],
      SAMPLE_QUESTIONS[21],
      SAMPLE_QUESTIONS[23],
      SAMPLE_QUESTIONS[7],
      SAMPLE_QUESTIONS[4],
      SAMPLE_QUESTIONS[6]
    ]
  }
];

export const PREVIOUS_YEAR_PAPERS: PreviousYearPaper[] = [
  {
    id: 'pyq-nda-2025',
    title: 'NDA (I) 2025 Official Paper - Mathematics',
    examId: 'nda',
    year: 2025,
    subject: 'Mathematics',
    totalQuestions: 120,
    durationMinutes: 150,
    marks: 300,
    mockTestId: 'mock-nda-maths-speed',
    fileSize: '4.8 MB'
  },
  {
    id: 'pyq-nda-2024',
    title: 'NDA (II) 2024 Official Paper - General Ability Test',
    examId: 'nda',
    year: 2024,
    subject: 'General Ability Test',
    totalQuestions: 150,
    durationMinutes: 150,
    marks: 600,
    mockTestId: 'mock-nda-full-1',
    fileSize: '5.2 MB'
  },
  {
    id: 'pyq-cds-2024',
    title: 'CDS (II) 2024 General Knowledge Official Paper',
    examId: 'cds',
    year: 2024,
    subject: 'General Knowledge',
    totalQuestions: 120,
    durationMinutes: 120,
    marks: 100,
    mockTestId: 'mock-cds-gk-full',
    fileSize: '3.9 MB'
  },
  {
    id: 'pyq-cds-2023',
    title: 'CDS (I) 2023 Elementary Mathematics',
    examId: 'cds',
    year: 2023,
    subject: 'Elementary Mathematics',
    totalQuestions: 100,
    durationMinutes: 120,
    marks: 100,
    mockTestId: 'mock-cds-gk-full',
    fileSize: '4.1 MB'
  },
  {
    id: 'pyq-cuet-2024',
    title: 'CUET UG 2024 General Test Slot-1 Official Paper',
    examId: 'cuet',
    year: 2024,
    subject: 'General Test',
    totalQuestions: 60,
    durationMinutes: 60,
    marks: 250,
    mockTestId: 'mock-cuet-gt-1',
    fileSize: '3.6 MB'
  },
  {
    id: 'pyq-afcat-2024',
    title: 'AFCAT (I) 2024 Official Memory-Based Paper',
    examId: 'afcat',
    year: 2024,
    subject: 'Complete Paper (English, GA, Maths, Reasoning)',
    totalQuestions: 100,
    durationMinutes: 120,
    marks: 300,
    mockTestId: 'mock-afcat-full-1',
    fileSize: '4.3 MB'
  },
  {
    id: 'pyq-gs-2024',
    title: 'General Studies Paper I (Pre) Question Paper',
    examId: 'general-studies',
    year: 2024,
    subject: 'General Studies Paper I',
    totalQuestions: 100,
    durationMinutes: 120,
    marks: 200,
    mockTestId: 'mock-gs-all-india',
    fileSize: '5.6 MB'
  }
];

export const STUDY_MATERIALS: StudyMaterial[] = [
  {
    id: 'sm-nda-trig-formulas',
    title: 'Trigonometry Master Cheat Sheet: High-Yield Formulas & Shortcuts',
    examId: 'nda',
    subjectId: 'nda-maths',
    topic: 'Trigonometry',
    category: 'Formulas',
    readTime: '6 min read',
    content: 'Comprehensive compilation of all essential trigonometric identities, product-to-sum rules, half-angle formulas, and triple angle values frequently tested in NDA & CDS examinations.',
    keyPoints: [
      'sin θ · sin(60° - θ) · sin(60° + θ) = 1/4 sin 3θ',
      'cos θ · cos(60° - θ) · cos(60° + θ) = 1/4 cos 3θ',
      'tan θ · tan(60° - θ) · tan(60° + θ) = tan 3θ',
      'sin 18° = (√5 - 1)/4 and cos 36° = (√5 + 1)/4'
    ],
    formulaList: [
      { title: 'Sum & Difference', formula: 'sin(A ± B) = sin A cos B ± cos A sin B' },
      { title: 'Cosine Identity', formula: 'cos 2A = cos²A - sin²A = 2cos²A - 1 = 1 - 2sin²A' },
      { title: 'Transformation Formula', formula: '2 sin A cos B = sin(A + B) + sin(A - B)' }
    ],
    tags: ['Trigonometry', 'NDA Maths', 'Shortcuts'],
    lastUpdated: 'May 2025'
  },
  {
    id: 'sm-polity-articles',
    title: 'Most Important Articles of the Indian Constitution (Part I to XX)',
    examId: 'general-studies',
    subjectId: 'gs-polity',
    topic: 'Indian Constitution',
    category: 'Revision Notes',
    readTime: '10 min read',
    content: 'A rapid memory digest of high-frequency constitutional articles, writs under Article 32 & 226, emergency provisions (352, 356, 360), and key constitutional amendment benchmarks.',
    keyPoints: [
      'Article 14-18: Right to Equality (Rule of law, abolition of untouchability & titles)',
      'Article 21: Protection of life and personal liberty (Right to privacy is intrinsic)',
      'Article 32: Constitutional remedies ("Heart and Soul of Constitution" - Dr. Ambedkar)',
      'Article 51A: Fundamental Duties (added by 42nd Amendment upon Swaran Singh Committee recommendation)'
    ],
    tags: ['Polity', 'Constitution', 'High Frequency'],
    lastUpdated: 'April 2025'
  },
  {
    id: 'sm-quant-tricks',
    title: 'Speed Maths & Mental Arithmetic: 15 Short Tricks for Competitive Exams',
    examId: 'cuet',
    subjectId: 'cuet-general-test',
    topic: 'Quantitative Aptitude',
    category: 'Short Tricks',
    readTime: '8 min read',
    content: 'Master fast calculations without rough sheets: rapid multiplication tricks, finding square roots in under 5 seconds, calculating successive percentage changes, and LCM mental models.',
    keyPoints: [
      'Successive Percentage Formula: Net Change = a + b + (ab / 100)%',
      'Squaring numbers ending in 5: Multiply the prefix by (prefix + 1) and append 25 (e.g. 75² = (7×8)25 = 5625)',
      'Unit digit cyclical patterns: 2, 3, 7, 8 have a cycle of 4 powers'
    ],
    tags: ['Short Tricks', 'Speed Maths', 'CUET', 'AFCAT'],
    lastUpdated: 'May 2025'
  },
  {
    id: 'sm-defence-missiles',
    title: 'India\'s Strategic Missile Arsenals & Air Defence Systems Compendium',
    examId: 'cds',
    subjectId: 'cds-gk',
    topic: 'Defence & Security',
    category: 'Concepts',
    readTime: '12 min read',
    content: 'Detailed technical overview of the Integrated Guided Missile Development Programme (IGMDP), Prithvi, Agni series (Agni-V with MIRV), BrahMos supersonic cruise missile, and S-400 Triumf deployment.',
    keyPoints: [
      'Agni-V: Intercontinental Ballistic Missile with >5,000 km range and MIRV capability',
      'BrahMos: World’s fastest supersonic cruise missile (Mach 2.8 - 3.0), joint India-Russia venture',
      'Akash: Surface-to-air medium range missile with indigenous Rajendra radar guidance'
    ],
    tags: ['Defence', 'Missiles', 'CDS', 'AFCAT'],
    lastUpdated: 'May 2025'
  },
  {
    id: 'sm-environment-ramsar',
    title: 'Ramsar Wetlands, Biosphere Reserves & National Parks 2025 Ready Reckoner',
    examId: 'general-studies',
    subjectId: 'gs-environment',
    topic: 'Environment & Ecology',
    category: 'Important Questions',
    readTime: '9 min read',
    content: 'Complete catalog of newly declared Ramsar sites in India, distribution of 18 Biosphere Reserves (12 in UNESCO MAB list), and national park state-wise maps.',
    keyPoints: [
      'India currently boasts 85 Ramsar Sites covering over 1.35 million hectares',
      'Tamil Nadu has the maximum number of Ramsar sites (16), followed by Uttar Pradesh (10)',
      'Nilgiri Biosphere Reserve was India’s first biosphere reserve established in 1986'
    ],
    tags: ['Environment', 'Wetlands', 'General Studies'],
    lastUpdated: 'May 2025'
  }
];

export const CURRENT_AFFAIRS: CurrentAffairArticle[] = [
  {
    id: 'ca-1',
    title: 'DRDO Successfully Conducts Maiden Flight-Test of Long Range Land Attack Cruise Missile',
    date: 'May 12, 2025',
    category: 'Defence',
    shortDescription: 'Defence Research and Development Organisation (DRDO) conducted the maiden flight-test of Long Range Land Attack Cruise Missile (LRLACM) from Integrated Test Range, Chandipur.',
    content: 'The Defence Research and Development Organisation (DRDO) successfully completed the flight-trial of the indigenous Long Range Land Attack Cruise Missile (LRLACM). The missile performed high-manoeuvre way-point navigation, meeting all mission objectives. The system is equipped with advanced avionics and software to ensure enhanced reliability and operational strike accuracy.',
    examRelevance: ['cds', 'nda', 'afcat', 'general-studies'],
    keyTakeaways: [
      'Developed by DRDO laboratories with key contributions from Indian defence industries',
      'Equipped with advanced navigation and seeker technology for pinpoint land targets',
      'Crucial for upcoming CDS, NDA, and AFCAT Defence Awareness sections'
    ],
    readTime: '3 min read'
  },
  {
    id: 'ca-2',
    title: 'Union Ministry Unveils National Quantum Mission (NQM) Technical Roadmap',
    date: 'May 10, 2025',
    category: 'Science & Technology',
    shortDescription: 'The Department of Science and Technology flagged off the establishment of thematic hubs (T-Hubs) in Quantum Computing, Communication, and Sensing.',
    content: 'The National Quantum Mission aims to seed, nurture, and scale up scientific and industrial R&D in quantum technology. The mission will develop intermediate-scale quantum computers with 50-1000 physical qubits in 8 years and satellite-based secure quantum communications.',
    examRelevance: ['cuet', 'general-studies', 'cds'],
    keyTakeaways: [
      'Four Thematic Hubs established across leading institutes (IISc, IITs)',
      'Aims to build quantum cryptography systems over 2,000 km range',
      'High likelihood of questions in General Studies and CUET General Science'
    ],
    readTime: '4 min read'
  },
  {
    id: 'ca-3',
    title: 'India Achieves Historic Milestone in Renewable Energy Capacity Surpassing 200 GW',
    date: 'May 08, 2025',
    category: 'Economy',
    shortDescription: 'Total installed renewable energy capacity including large hydro crossed the monumental 200 GW milestone, advancing towards the 500 GW target by 2030.',
    content: 'According to data released by the Ministry of New and Renewable Energy, India’s non-fossil fuel capacity now accounts for over 45% of total electric power installed capacity, exceeding the COP26 Nationally Determined Contributions (NDC) targets well ahead of schedule.',
    examRelevance: ['cuet', 'general-studies', 'nda'],
    keyTakeaways: [
      'Non-fossil fuel capacity reached 45% of total installed power capacity',
      'Solar power accounts for the largest share (>85 GW)',
      'India committed to 500 GW non-fossil capacity by 2030 at COP26'
    ],
    readTime: '3 min read'
  },
  {
    id: 'ca-4',
    title: 'Indian Contingent Triumphs with Record Medals at Asian Athletics Championships',
    date: 'May 05, 2025',
    category: 'Sports',
    shortDescription: 'Indian track and field athletes bagged an all-time record tally of gold and silver medals, dominating the 400m, javelin throw, and steeplechase events.',
    content: 'The Indian athletics contingent delivered a commanding performance at the Asian Athletics Championships. Prominent performers set multiple national and championship records, securing automatic qualifying spots for the upcoming World Athletics Championships.',
    examRelevance: ['afcat', 'cuet', 'cds'],
    keyTakeaways: [
      'Double gold in middle-distance running events and men’s triple jump',
      'Directly relevant for AFCAT Sports GK and CUET General Awareness sections',
      'Notable new national records in women’s steeplechase'
    ],
    readTime: '2 min read'
  },
  {
    id: 'ca-5',
    title: 'International Court of Justice Delivers Landmark Advisory Opinion on Climate Change Obligations',
    date: 'May 02, 2025',
    category: 'International',
    shortDescription: 'The ICJ issued a comprehensive advisory ruling clarifying state responsibilities under international treaties to protect current and future generations from climate harm.',
    content: 'Initiated by small island developing states led by Vanuatu, the International Court of Justice in The Hague rendered its unanimous advisory opinion on state liability and duties under the UN Framework Convention on Climate Change (UNFCCC) and the Paris Agreement.',
    examRelevance: ['general-studies', 'cds'],
    keyTakeaways: [
      'Advisory opinion requested by UN General Assembly resolution spearheaded by Vanuatu',
      'Clarifies legal obligations of major carbon emitting nations',
      'Fundamental reference for international law and environment questions'
    ],
    readTime: '4 min read'
  }
];
