import { Article } from '../types';

export const mockArticles: Article[] = [
  {
    id: 'art-1',
    title: 'The Evidence-Based Guide to Dietary Fiber and Gut Microbiome Diversity',
    slug: 'dietary-fiber-gut-microbiome-guide',
    excerpt: 'Less than 10% of American adults consume the recommended 25-38 grams of daily fiber. Here is why prebiotic fiber matters and how to ramp it up comfortably.',
    category: 'digestion',
    tags: ['Fiber', 'Gut Health', 'Prebiotics', 'Digestion'],
    coverImageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80',
    readingTimeMinutes: 7,
    publishedAt: '2026-08-14',
    lastReviewedAt: '2026-10-05',
    viewCount: 4210,
    author: {
      name: 'Dr. Rebecca Vance',
      credentials: 'PhD, Nutritional Sciences',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
      bio: 'Nutritional biochemist specializing in dietary fiber metabolism and human gut microbiota.'
    },
    reviewer: {
      name: 'Marcus Hayes',
      credentials: 'MS, RDN, LD',
      avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80',
      title: 'Clinical Gastrointestinal Dietitian, Cleveland Clinic Affiliate'
    },
    content: `
      <h2>The Critical Gap in American Fiber Intake</h2>
      <p>According to data from the National Health and Nutrition Examination Survey (NHANES), over 90% of American women and 97% of American men do not meet the recommended daily intake for dietary fiber. The average US adult consumes approximately 15 grams per day—far below the Institute of Medicine guidelines of 25 grams for women and 38 grams for men.</p>
      
      <h2>Soluble vs. Insoluble: Two Distinct Allies</h2>
      <p>Dietary fiber is not a single compound; it encompasses a complex class of non-digestible carbohydrates. Soluble fibers—such as beta-glucans in oats and barley, or pectin in apples and citrus—dissolve in water to form a viscous gel. This slows gastric emptying, blunts post-prandial blood sugar spikes, and binds to bile acids in the intestine, assisting in LDL cholesterol reduction.</p>
      <p>Insoluble fibers—including cellulose, hemicellulose, and lignin found in wheat bran, kale, and legumes—increase fecal bulk and accelerate intestinal transit time. Both forms act synergistically to maintain mucosal barrier integrity and stimulate motility.</p>

      <h2>Fueling the Microbiome: Short-Chain Fatty Acids (SCFAs)</h2>
      <p>When fermentable fibers reach the distal colon, resident bacteria (such as <em>Faecalibacterium prausnitzii</em> and <em>Bifidobacterium</em>) metabolize them into short-chain fatty acids: primarily acetate, propionate, and butyrate. Butyrate functions as the primary metabolic fuel for colonocytes, regulates tight-junction proteins, and activates anti-inflammatory signaling cascades via G-protein-coupled receptors (GPR41 and GPR43).</p>

      <h2>Practical Strategy: The "Slow & Steady" Ramp-Up</h2>
      <p>Increasing fiber intake too abruptly can trigger transient bloating, flatulence, and abdominal discomfort. Clinicians recommend introducing an additional 5 grams of fiber every 3 to 5 days while proportionally increasing daily fluid consumption by at least 8 to 12 ounces per increment.</p>
    `,
    references: [
      {
        title: 'Dietary Guidelines for Americans 2025–2030',
        source: 'U.S. Department of Agriculture and U.S. Department of Health and Human Services',
        url: 'https://www.dietaryguidelines.gov'
      },
      {
        title: 'Microbial regulation of host physiology by short-chain fatty acids',
        source: 'Cell Host & Microbe, Vol. 25(3), 2021',
        url: 'https://doi.org/10.1016/j.chom.2021.02.003'
      },
      {
        title: 'Closing America’s Fiber Intake Gap: Communication Strategies from a Food and Fiber Summit',
        source: 'American Journal of Lifestyle Medicine',
        url: 'https://pubmed.ncbi.nlm.nih.gov/27899981/'
      }
    ]
  },
  {
    id: 'art-2',
    title: 'Cardiovascular Nutrition: Decoding Dietary Sodium, Potassium, and Arterial Elasticity',
    slug: 'cardiovascular-nutrition-sodium-potassium-ratio',
    excerpt: 'Why the sodium-to-potassium ratio is often more predictive of blood pressure outcomes than sodium restriction alone, backed by clinical cardiology trials.',
    category: 'heart-health',
    tags: ['Heart Health', 'Blood Pressure', 'Sodium', 'Potassium', 'DASH Diet'],
    coverImageUrl: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=1200&q=80',
    readingTimeMinutes: 6,
    publishedAt: '2026-09-02',
    lastReviewedAt: '2026-10-12',
    viewCount: 3840,
    author: {
      name: 'Elena Rostova',
      credentials: 'MS, RDN, CSSD',
      avatarUrl: 'https://images.unsplash.com/photo-1594824813579-455b57f0012b?auto=format&fit=crop&w=300&q=80',
      bio: 'Cardiovascular dietitian and researcher specializing in hypertension management protocols.'
    },
    reviewer: {
      name: 'Dr. Gregory Patel',
      credentials: 'MD, FACC',
      avatarUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=300&q=80',
      title: 'Consulting Cardiologist & Clinical Nutrition Fellow'
    },
    content: `
      <h2>Beyond the Salt Shaker: The Potassium Balancing Act</h2>
      <p>For decades, public health warnings have focused almost exclusively on reducing sodium intake below 2,300 mg per day. However, rigorous epidemiological investigations—including the landmark PURE and DASH studies—demonstrate that the dietary <strong>sodium-to-potassium molar ratio</strong> is a stronger determinant of cardiovascular morbidity than sodium alone.</p>

      <h2>How Potassium Protects the Endothelium</h2>
      <p>Potassium induces vascular smooth muscle hyperpolarization and vasodilation by stimulating sodium-potassium ATPase activity and endothelium-dependent nitric oxide synthase (eNOS). Furthermore, increased potassium intake promotes renal natriuresis, counterbalancing the fluid-retaining tendencies of high sodium diets.</p>

      <h2>The DASH Protocol in Modern US Grocery Aisles</h2>
      <p>The Dietary Approaches to Stop Hypertension (DASH) eating pattern consistently lowers systolic blood pressure by 8 to 14 mmHg in hypertensive individuals. Key components include:</p>
      <ul>
        <li>4 to 5 servings daily of potassium-dense vegetables (spinach, sweet potatoes, Swiss chard)</li>
        <li>4 to 5 servings of fresh fruit (bananas, avocados, cantaloupe, berries)</li>
        <li>2 to 3 servings of low-fat dairy or calcium-fortified plant beverages</li>
        <li>Lean poultry, fish, and nuts in place of processed meats</li>
      </ul>
    `,
    references: [
      {
        title: 'Sodium and Potassium Intake and Mortality Among US Adults: Prospective Findings from NHANES III',
        source: 'Archives of Internal Medicine, 171(13):1183–1191',
        url: 'https://doi.org/10.1001/archinternmed.2011.257'
      },
      {
        title: 'A Clinical Trial of the Effects of Dietary Patterns on Blood Pressure (DASH)',
        source: 'New England Journal of Medicine, 336:1117-1124',
        url: 'https://www.nejm.org/doi/full/10.1056/NEJM199704173361601'
      }
    ]
  },
  {
    id: 'art-3',
    title: 'Protein Pacing and Satiety: Optimizing Leucine Thresholds Across the Lifespan',
    slug: 'protein-pacing-satiety-leucine-threshold',
    excerpt: 'How distributing 25-35 grams of high-quality protein per meal triggers muscle protein synthesis (MPS) while stabilizing hunger hormones like ghrelin and GLP-1.',
    category: 'weight-management',
    tags: ['Protein', 'Weight Management', 'Satiety', 'Metabolism'],
    coverImageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=80',
    readingTimeMinutes: 5,
    publishedAt: '2026-07-28',
    lastReviewedAt: '2026-09-18',
    viewCount: 5120,
    author: {
      name: 'Dr. Rebecca Vance',
      credentials: 'PhD, Nutritional Sciences',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
      bio: 'Nutritional biochemist specializing in dietary fiber metabolism and human gut microbiota.'
    },
    reviewer: {
      name: 'Elena Rostova',
      credentials: 'MS, RDN, CSSD',
      avatarUrl: 'https://images.unsplash.com/photo-1594824813579-455b57f0012b?auto=format&fit=crop&w=300&q=80',
      title: 'Board Certified Specialist in Sports Dietetics'
    },
    content: `
      <h2>The Standard American Skewed Protein Distribution</h2>
      <p>The typical American meal pattern is heavily backloaded: a carb-dominant breakfast (10g protein), a modest lunch (15-20g), and a massive dinner (60-80g). Skeletal muscle, however, possesses a "muscle full" phenomenon where protein synthesis plateaus after approximately 0.25 to 0.40 grams of protein per kilogram of body weight per sitting.</p>

      <h2>The Leucine Trigger</h2>
      <p>Leucine, an essential branched-chain amino acid, operates as the primary molecular key activating the mTORC1 (mechanistic target of rapamycin complex 1) pathway. To trigger maximal MPS, an individual meal typically requires between 2.2 to 3.0 grams of bioavailable leucine—obtainable from approximately 30g of whey protein, 4 large eggs, 5 oz of chicken breast, or 1.5 cups of firm tofu paired with edamame.</p>

      <h2>Satiety Signaling and Thermogenesis</h2>
      <p>Protein exerts a higher thermic effect of food (TEF: 20-30% of ingested energy) compared to carbohydrates (5-10%) and fats (0-3%). Furthermore, peptide YY (PYY) and glucagon-like peptide-1 (GLP-1) secretions from enteroendocrine L-cells are directly stimulated by dietary amino acids, while systemic circulating ghrelin (the hunger-stimulating hormone) is significantly suppressed.</p>
    `,
    references: [
      {
        title: 'Dietary Protein Distribution and Muscle Protein Synthesis in Healthy Young Men',
        source: 'The Journal of Nutrition, Vol. 144(6), 2014',
        url: 'https://doi.org/10.3945/jn.113.185280'
      },
      {
        title: 'The Effects of High Protein Diets on Thermogenesis, Satiety and Weight Loss: A Critical Review',
        source: 'Journal of the American College of Nutrition',
        url: 'https://pubmed.ncbi.nlm.nih.gov/15466943/'
      }
    ]
  },
  {
    id: 'art-4',
    title: 'Circadian Nutrition: How Meal Timing Shapes Glycemic Control and Sleep Architecture',
    slug: 'circadian-nutrition-meal-timing-sleep-architecture',
    excerpt: 'Exploring the chronobiological connection between nighttime eating, melatonin secretion, insulin resistance, and restorative deep slow-wave sleep.',
    category: 'sleep',
    tags: ['Sleep', 'Circadian Biology', 'Insulin Sensitivity', 'Meal Timing'],
    coverImageUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=1200&q=80',
    readingTimeMinutes: 6,
    publishedAt: '2026-08-30',
    lastReviewedAt: '2026-10-15',
    viewCount: 2950,
    author: {
      name: 'Marcus Hayes',
      credentials: 'MS, RDN, LD',
      avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80',
      bio: 'Clinical dietitian specializing in gastrointestinal motility and chronobiology.'
    },
    reviewer: {
      name: 'Dr. Rebecca Vance',
      credentials: 'PhD, Nutritional Sciences',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
      title: 'Principal Nutrition Scientist'
    },
    content: `
      <h2>Peripheral Clocks and Pancreatic Rhythms</h2>
      <p>While the master circadian pacemaker resides in the suprachiasmatic nucleus (SCN) of the hypothalamus, virtually every metabolic tissue—including the pancreas, liver, and adipocytes—expresses autonomous peripheral circadian clock genes (CLOCK, BMAL1, PER, and CRY). Food consumption is the dominant zeitgeber (time giver) synchronizing these peripheral metabolic organs.</p>

      <h2>The Melatonin–Insulin Antagonism</h2>
      <p>In the evening, rising pineal melatonin binds to MT1 and MT2 receptors on pancreatic beta cells, intentionally suppressing glucose-stimulated insulin secretion in anticipation of the nighttime fasting state. Consequently, identical carbohydrate loads consumed at 9:00 PM produce significantly higher glucose excursions and delayed clearance compared to identical meals consumed at 9:00 AM.</p>

      <h2>Sleep-Promoting Micronutrients</h2>
      <p>Research suggests that dinner meals consumed 2 to 3 hours prior to sleep, containing complex carbohydrates and rich sources of tryptophan, magnesium, and vitamin B6 (such as roasted turkey with quinoa and steamed broccoli), facilitate central 5-HT (serotonin) and melatonin synthesis without disrupting slow-wave sleep.</p>
    `,
    references: [
      {
        title: 'Melatonin receptors in the human endocrine pancreas and their role in type 2 diabetes',
        source: 'Nature Genetics, 41:89–94',
        url: 'https://doi.org/10.1038/ng.288'
      },
      {
        title: 'Effects of meal timing on sleep architecture and nocturnal core body temperature',
        source: 'Sleep Medicine Reviews, Vol. 48, 2020',
        url: 'https://doi.org/10.1016/j.smrv.2019.101211'
      }
    ]
  },
  {
    id: 'art-5',
    title: 'Hydration Physiology: Electrolyte Osmolality and Cognitive Endurance',
    slug: 'hydration-physiology-electrolyte-osmolality',
    excerpt: 'Mild hypohydration (as little as 1.5% loss of body mass) impairs working memory and vigilance. How to balance intracellular fluids effectively.',
    category: 'hydration',
    tags: ['Hydration', 'Electrolytes', 'Brain Function', 'Energy'],
    coverImageUrl: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=1200&q=80',
    readingTimeMinutes: 5,
    publishedAt: '2026-06-19',
    lastReviewedAt: '2026-09-24',
    viewCount: 2410,
    author: {
      name: 'Elena Rostova',
      credentials: 'MS, RDN, CSSD',
      avatarUrl: 'https://images.unsplash.com/photo-1594824813579-455b57f0012b?auto=format&fit=crop&w=300&q=80',
      bio: 'Cardiovascular dietitian and researcher specializing in fluid dynamics.'
    },
    reviewer: {
      name: 'Marcus Hayes',
      credentials: 'MS, RDN, LD',
      avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80',
      title: 'Clinical Specialist'
    },
    content: `
      <h2>The Subclinical Dehydration Threshold</h2>
      <p>Most individuals wait until the sensation of thirst triggers fluid consumption. However, the osmoreceptors in the anterior hypothalamus only stimulate thirst when plasma osmolality increases by approximately 1% to 2%—a stage where subclinical cognitive degradation has already initiated.</p>

      <h2>Electrolyte Balance Beyond Plain Water</h2>
      <p>Consuming large volumes of hypotonic plain water in short time windows can dilute extracellular sodium, prompting renal free-water clearance without adequate intracellular rehydration. Incorporating modest amounts of sodium chloride, potassium citrate, and magnesium aspartate improves fluid retention and intestinal co-transport via SGLT1 (sodium-glucose cotransporter 1).</p>
    `,
    references: [
      {
        title: 'Mild Dehydration Affects Mood in Healthy Young Women',
        source: 'The Journal of Nutrition, Vol. 142(2):382-388',
        url: 'https://doi.org/10.3945/jn.111.142000'
      }
    ]
  },
  {
    id: 'art-6',
    title: 'Cellular Energy and Mitochondrial Nutrients: CoQ10, B-Complex, and Iron Dynamics',
    slug: 'cellular-energy-mitochondrial-nutrition',
    excerpt: 'Overcoming mid-afternoon energy slumps by understanding ATP production in the electron transport chain and avoiding nutrient deficiencies.',
    category: 'energy',
    tags: ['Energy', 'Mitochondria', 'Iron', 'B-Vitamins', 'Metabolism'],
    coverImageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80',
    readingTimeMinutes: 6,
    publishedAt: '2026-07-10',
    lastReviewedAt: '2026-10-01',
    viewCount: 3100,
    author: {
      name: 'Dr. Rebecca Vance',
      credentials: 'PhD, Nutritional Sciences',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
      bio: 'Nutritional biochemist specializing in metabolic efficiency and bioenergetics.'
    },
    reviewer: {
      name: 'Dr. Gregory Patel',
      credentials: 'MD, FACC',
      avatarUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=300&q=80',
      title: 'Consulting Cardiologist'
    },
    content: `
      <h2>ATP Synthesis at the Mitochondrial Inner Membrane</h2>
      <p>Adenosine triphosphate (ATP) is the universal cellular energy currency. The electron transport chain relies on specific micronutrient cofactors at each complex: Iron-Sulfur clusters in Complexes I, II, and III; Riboflavin (FAD) in Complex II; Niacin (NAD+) in Complex I; and Coenzyme Q10 as the lipid-soluble electron shuttle transferring reducing equivalents to Cytochrome c.</p>

      <h2>Evaluating True Fatigue vs. Caloric Deprivation</h2>
      <p>Many Americans compensate for fatigue with excess caffeine and refined sugar. While this produces a transient dopamine and catecholamine surge, it triggers reactive hypoglycemia. Ensuring adequate ferritin levels (>30 ng/mL in active adults) and pairing complex carbohydrates with healthy fats provides sustained substrate delivery for oxidative phosphorylation.</p>
    `,
    references: [
      {
        title: 'Mitochondrial biology and the role of micronutrients in energy metabolism',
        source: 'American Journal of Clinical Nutrition, 102(4):780-791',
        url: 'https://doi.org/10.3945/ajcn.115.111807'
      }
    ]
  }
];
