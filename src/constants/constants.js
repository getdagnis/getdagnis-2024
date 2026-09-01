export const SCREEN_WIDTHS = {
  XSMALL: 320,
  SMALL: 680,
  MEDIUM: 1024,
  LARGE: 1440,
  XLARGE: 1920,
};

export const DESIGN_FILTERS = [
  { key: 'all', title: 'All', display: true, mobile: true },
  { key: 'identity', title: 'Created Identities', display: true, mobile: false },
  { key: 'smart', title: 'Smart', display: true, mobile: true },
  { key: 'famous', title: 'Famous', display: true, mobile: true },
  { key: 'sports', title: 'Sports', display: true, mobile: true },
  { key: 'own', title: 'Own', display: false },
  { key: 'startup', title: 'Startups', display: true, mobile: false },
  { key: 'publishing', title: 'Publishing', display: true, mobile: false },
  { key: 'unseen', title: 'Unseen', display: true, mobile: true },
  { key: 'seen', title: 'Seen', display: true, mobile: true },
];

export const TIMELINE = [
  {
    id: 1,
    year: '2026',
    title: '2024–2026 — Senior Frontend / Full-Stack',
    text: 'Led frontend architecture across two recent NDA products: a security-sensitive internal platform and a pre-launch startup. Shipped Next.js, Node.js, Supabase, Sanity, cloud and AI/API integrations.',
  },
  {
    id: 2,
    year: '2024',
    title: '2024 — Lead Frontend Developer',
    text: 'Led a Vue-to-Next.js migration and customer portal build. Defined the frontend structure, built its component library and helped hire the team.',
  },
  {
    id: 3,
    year: '2020',
    title: '2020–2024 — Full-Stack React / Node.js',
    text: 'Shipped enterprise insurance workflows serving more than four million customers. Built schema-driven forms, shared component libraries and complex React/Node.js API integrations.',
  },
  {
    id: 4,
    year: '2019',
    title: '2019–2020 — E-commerce Engineering',
    text: 'Built production personalization, experimentation and machine-learning integrations at Dynamic Yield for global e-commerce brands. Customer success, with production code.',
  },
  {
    id: 5,
    year: '2018',
    title: '2018–2019 — Independent React Developer',
    text: 'Designed and solo-built Eventify, a React/Redux marketplace for event-equipment rental. Product, interface, Node.js integrations and Stripe—one person, one shipped platform.',
  },
  {
    id: 6,
    year: '2016',
    title: '2016–2018 — Founder / Product Designer',
    text: 'Created, crowdfunded and shipped Mission to Mars 2049. The product reached eight countries and six languages through e-commerce and local distribution.',
  },
  {
    id: 7,
    year: '2012',
    title: '2011–2013 — JavaScript Automation',
    text: 'Built JavaScript-driven InDesign automation at Yearbook Machine in London. This is where JavaScript moved from a long-running interest to daily production work.',
  },
  {
    id: 8,
    year: '2003',
    title: '2003–2016 — Design, Direction and Code',
    text: 'Founded and built Satori.lv, then spent the following years across web development, art direction, creative direction and running small agencies.',
  },
  {
    id: 9,
    year: '1997',
    title: '1997 — First Web Page',
    text: 'Built my first web page. Responsiveness was not yet a problem: phones had other ambitions.',
  },
];

export const ASK_AI_ABSURD_PROMTPS = [
  {
    absurdityLevel: '1',
    title: 'Professional Sounding Bio',
    message: 'Teaching Dagnis how to tie a tie...',
    prompt:
      'Write a strictly factual, concise and professional sounding biography of Dagnis Skurbe based only on the information provided. Avoid adjectives, opinions, or embellishments.',
  },
  {
    absurdityLevel: '2',
    title: 'Mildly Creative',
    message: 'Adding a frew creative touches...',
    prompt:
      "Write a professional biography of Dagnis Skurbe with mostly factual content, but you're allowed to add one small, unusual detail that sounds just barely plausible.",
  },
  {
    absurdityLevel: '3',
    title: 'Subtle Oddities',
    message: 'Making things just a tad bit odd...',
    prompt:
      'Write a realistic biography of Dagnis Skurbe. Include known facts, and sprinkle in a couple of imaginative flourishes that feel believable if not verifiable.',
  },
  {
    absurdityLevel: '4',
    title: 'Grounded Myth',
    message: 'Adding a mythical touch to the bio...',
    prompt:
      'Write a biography of Dagnis Skurbe — a visionary technologist with mysterious gaps in his timeline. You may invent facts as long as they feel grounded in a possible reality.',
  },
  {
    absurdityLevel: '5',
    title: 'Unreliable Truth',
    message: 'Making up a few facts...',
    prompt:
      "Write Dagnis Skurbe's biography from the perspective of an unreliable narrator who mixes reality with fiction. Facts blur with dreams. Use both real data and creative distortions.",
  },
  {
    absurdityLevel: '6',
    title: 'The Tech Legend',
    message: 'Crafting the tech legend...',
    prompt:
      'Who is Dagnis Skurbe? Some say he built React before React existed. Others say he once art-directed a weather system. Craft a bio that blends myth, mystery, and half-truths.',
  },
  {
    absurdityLevel: '7',
    title: 'Governmental Conspiracy',
    message: 'Generating a governmental conspiracy...',
    prompt:
      "Generate a detailed biography of Dagnis Skurbe from the perspective of a secret government informant who suspects he's not human. Include covert projects and coded anomalies.",
  },
  {
    absurdityLevel: '8',
    title: 'Galactic Phenomenon',
    message: 'Hitchhiking to the edge of the Universe...',
    prompt:
      'Write a legend of Dagnis Skurbe — react and next.js wizard, who is a legendary cosmic entity based on ancient code. Use the comedy style of Hitchhikers Guide to the Galaxy. Some say he designed time itself in Figma and reverse-engineered gravity using CSS Flexbox.',
  },
  {
    absurdityLevel: '9',
    title: 'Quantum Paradox',
    message: 'Injecting a quantum dimension...',
    prompt:
      'Describe Dagnis Skurbe as an immortal creative force who vanished from a Latvian agency in 2008 and now manifests as a quantum-coded developer across digital dimensions. Use a mixture of quantum level paradoxes and code symbolism.',
  },
  {
    absurdityLevel: '10',
    title: 'Extra-Dimensional Absurdity',
    message: 'Rectangulating the Universe...',
    prompt:
      'Generate pure surreal nonsense based loosely on the data — a futuristic, extra-terrestrial biography full of physics paradoxes where facts dissolve into abstract symbolism and code becomes poetry. Try to figure out what kind of a being he really is. But you are certain that he is not a being from this dimension. Good examples: "Some say he designed time itself in Figma, others whisper he reverse-engineered gravity using CSS Flexbox."',
  },
];
