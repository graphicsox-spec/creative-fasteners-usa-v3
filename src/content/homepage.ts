const assetPath = (path: string) => `${import.meta.env.BASE_URL}${path}`;

export type HeroSlide = {
  id: string;
  enabled?: boolean;
  eyebrow: string;
  headline: string;
  description: string;
  cta: string;
  image: string;
  imageAlt: string;
  objectPosition?: string;
  clientArtwork?: {
    mobileImage: string;
    headlineLines: [string, string];
  };
};

export const navigation = [
  { label: 'Home', href: '#home' },
  { label: 'Products', href: '#products' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Quality', href: '#quality' },
  { label: 'Industries', href: '#industries' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const sharedHeroHeadline = 'Manufacturing Precision, Made-To-Spec, and Custom Fasteners For A Wide Range of Industries';
const sharedHeroHeadlineLines: [string, string] = [
  sharedHeroHeadline,
  'Aerospace, Military, Oil & Gas, Automotive, and Commercial industries',
];

const configuredHeroSlides: HeroSlide[] = [
  {
    id: 'aerospace',
    enabled: true,
    eyebrow: '',
    headline: sharedHeroHeadline,
    description: '',
    cta: '',
    image: assetPath('assets/images/industry-slider-banners/aerospace-desktop.jpg'),
    clientArtwork: {
      mobileImage: assetPath('assets/images/industry-slider-banners/aerospace-mobile.jpg'),
      headlineLines: sharedHeroHeadlineLines,
    },
    imageAlt: 'A commercial aircraft engine and bolted metal access panel in an aviation maintenance hangar',
    objectPosition: 'center center',
  },
  {
    id: 'military-defense',
    enabled: true,
    eyebrow: '',
    headline: sharedHeroHeadline,
    description: '',
    cta: '',
    image: assetPath('assets/images/industry-slider-banners/military-defense-desktop.jpg'),
    clientArtwork: {
      mobileImage: assetPath('assets/images/industry-slider-banners/military-defense-mobile.jpg'),
      headlineLines: sharedHeroHeadlineLines,
    },
    imageAlt: 'An unmarked military utility helicopter with bolted airframe attachment hardware in a maintenance hangar',
    objectPosition: 'center center',
  },
  {
    id: 'oil-gas',
    enabled: true,
    eyebrow: '',
    headline: sharedHeroHeadline,
    description: '',
    cta: '',
    image: assetPath('assets/images/industry-slider-banners/oil-gas-desktop.jpg'),
    clientArtwork: {
      mobileImage: assetPath('assets/images/industry-slider-banners/oil-gas-mobile.jpg'),
      headlineLines: sharedHeroHeadlineLines,
    },
    imageAlt: 'A bolted pipeline valve with stainless steel flanges in an oil and gas refinery',
    objectPosition: 'center center',
  },
  {
    id: 'automotive',
    enabled: true,
    eyebrow: '',
    headline: sharedHeroHeadline,
    description: '',
    cta: '',
    image: assetPath('assets/images/industry-slider-banners/automotive-desktop.jpg'),
    clientArtwork: {
      mobileImage: assetPath('assets/images/industry-slider-banners/automotive-mobile.jpg'),
      headlineLines: sharedHeroHeadlineLines,
    },
    imageAlt: 'Robotic arms assembling a vehicle chassis on a modern automotive production line',
    objectPosition: 'center center',
  },
  {
    id: 'commercial',
    enabled: true,
    eyebrow: '',
    headline: sharedHeroHeadline,
    description: '',
    cta: '',
    image: assetPath('assets/images/industry-slider-banners/commercial-desktop.jpg'),
    clientArtwork: {
      mobileImage: assetPath('assets/images/industry-slider-banners/commercial-mobile.jpg'),
      headlineLines: sharedHeroHeadlineLines,
    },
    imageAlt: 'Industrial pump and bolted pipe connections inside a commercial equipment factory',
    objectPosition: 'center center',
  },
];

export const heroSlides = configuredHeroSlides.filter(
  (slide) => slide.enabled !== false,
);

export const trustItems = [
  {
    title: 'Precision Manufacturing',
    detail: 'Drawing-led. Made to specification.',
    href: '#capabilities',
    icon: 'manufacturing',
  },
  {
    title: 'Process-Controlled Inspection',
    detail: 'Dimensions checked along the process.',
    href: '#quality',
    icon: 'inspection',
  },
  {
    title: 'Responsive RFQ Support',
    detail: 'Your requirements. A clear next step.',
    href: '#rfq',
    icon: 'support',
  },
] as const;

export type CapabilityIcon =
  | 'forming'
  | 'threading'
  | 'dies'
  | 'tooling'
  | 'trimming'
  | 'heat'
  | 'passivation'
  | 'finishes'
  | 'drilling';

export const capabilities: Array<{
  number: string;
  title: string;
  description: string;
  highlights: string[];
  icon: CapabilityIcon;
}> = [
  {
    number: '01',
    title: 'Cold Heading',
    description: '',
    highlights: ['High Volume', 'Tight Tolerances', 'Stronger Components', 'Cost Effective'],
    icon: 'forming',
  },
  {
    number: '02',
    title: 'Thread Rolling',
    description: '',
    highlights: ['Accurate Thread Profiles', 'Consistent Pitch', 'Higher Strength', 'Wide Size Range'],
    icon: 'threading',
  },
  {
    number: '03',
    title: 'Secondary Operations',
    description:
      'We offer a wide range of secondary operations including heat treating, plating, patching, black oxide, and passivation, providing additional processing to meet specific application and performance requirements. Integrated into our manufacturing process, these services help ensure our fasteners meet customer drawings, specifications, and quality standards.',
    highlights: ['Heat Treating', 'Plating', 'Patching', 'Black Oxide', 'Passivation'],
    icon: 'heat',
  },
];

export const qualitySteps = [
  {
    number: '01',
    title: 'Material Verification',
    description: 'Review incoming drawing, material specifications, and applicable order requirements prior to production.',
  },
  {
    number: '02',
    title: 'Process Router Control',
    description: 'Maintain a clearly defined production workflow with established operations, inspection points, material traceability, and thorough documentation throughout every stage of the manufacturing process.',
  },
  {
    number: '03',
    title: 'In-Process Dimensional Inspection',
    description: 'Check critical dimensions throughout the entire manufacturing process.',
  },
  {
    number: '04',
    title: 'Final Quality Review',
    description: 'Evaluate finished parts against drawing specifications and order requirements.',
  },
  {
    number: '05',
    title: 'Documentation and Release',
    description: 'Complete the required production record review before authorized release.',
  },
];

export const industries = [
  {
    number: '01',
    title: 'Aerospace',
    description: 'Precision fastener requirements for demanding airborne and space-related applications.',
    image: assetPath('assets/images/hero-industries/aerospace-client-mobile.jpg'),
    alt: 'Commercial aircraft engine inside an aviation maintenance hangar',
  },
  {
    number: '02',
    title: 'Defense',
    description: 'Made-to-spec manufacturing support for controlled, mission-focused supply programs.',
    image: assetPath('assets/images/hero-industries/military-defense-client-mobile.jpg'),
    alt: 'Military utility helicopter inside a maintenance hangar',
  },
  {
    number: '03',
    title: 'Marine',
    description: 'Precision fastening support for marine equipment, shipboard systems, and demanding assemblies.',
    image: assetPath('assets/images/industries/defense.webp'),
    alt: 'Organized trays of precision fasteners for demanding equipment assemblies',
  },
  {
    number: '04',
    title: 'Oil & Gas',
    description: 'Components developed for critical energy equipment, infrastructure, and field applications.',
    image: assetPath('assets/images/hero-industries/oil-gas-client-mobile.jpg'),
    alt: 'Bolted industrial pipeline valve in an oil and gas refinery',
  },
  {
    number: '05',
    title: 'Automotive',
    description: 'Repeatable component manufacturing support for vehicle systems, tooling, and production programs.',
    image: assetPath('assets/images/hero-industries/law-enforcement-client-mobile.jpg'),
    alt: 'Robotic production equipment and precision machined components in an industrial facility',
  },
  {
    number: '06',
    title: 'Custom',
    description: 'Made-to-spec solutions shaped around unique drawings, materials, tolerances, and end use.',
    image: assetPath('assets/images/industries/precision-industrial.webp'),
    alt: 'Precision machined components arranged in front of a modern CNC machine',
  },
];

export const differentiators = [
  {
    number: '01',
    title: 'Manufacturing Discipline',
    description: 'A production mindset centered on requirements, repeatable execution, and documented review points.',
  },
  {
    number: '02',
    title: 'Dimensional Consistency',
    description: 'Attention to the features, tolerances, and fit that make every component perform as intended.',
  },
  {
    number: '03',
    title: 'Process Visibility',
    description: 'Clear routing and inspection touchpoints that keep quality connected to production.',
  },
  {
    number: '04',
    title: 'Responsive Communication',
    description: 'Focused RFQ review and direct communication around the details that shape manufacturability.',
  },
  {
    number: '05',
    title: 'Made-to-Spec Production',
    description: 'Every conversation starts with the drawing, material, finish, quantity, and delivery requirement.',
  },
];
