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
    year: '2024',
    title: '2024 — Senior Next.js Developer',
    text: "Started the year 2024 as a Lead Front-End Developer in charge of migrating a project from Vue to Next.js (the startup didn't last long). Rest of the year have spent working as a Contract React/Node.js and React Native Developer, as well as working on my own side projects that I have long wanted to finish and will be revealed to public in the future. ",
  },
  {
    id: 2,
    year: '2021',
    title: '2021 — Full-Stack Developer',
    text: "Full-Stack Developer at a large global company serving backend software services to some of world's largest insurance companies. Was initially hired as a Senior Front-End developer in charge of fixing a project that had lots of responsiveness and other design issues but later transitioned to a Full-Stack Developer role working mainly with Node.js based backends using React, Typescript, MongoDB, Microservices, MaterialUI, Styled-Components, Redux-Toolkit, MobX, and others in various teams globally over the span of three years. ",
  },
  {
    id: 3,
    year: '2019',
    title: '2019 — Customer Success Engineer',
    text: "Joined a then McDonald's owned 300 million worth AI company that uses AI & machine learning tools to analyze user behaviour, Dynamic Yield. It is a globally leading business for personalized building blocksuser experience and content targeting. My customers at Dynamic Yield included Urban Outfitters, Zara, Bershka, Finish Line, Free People among others. ",
  },
  {
    id: 4,
    year: '2018',
    title: '2018 — Contract React Developer',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a scelerisque lorem. Nullam in luctus nisl. Quisque leo sem, egestas in est id, lacinia egestas libero. Ut ut ultricies turpis. Donec lacinia orci ac dignissim sollicitudin. Vivamus luctus efficitur ante sit amet convallis. Quisque nunc turpis, vulputate ut sapien quis, aliquam aliquam lorem. ',
  },
  {
    id: 5,
    year: '2012',
    title: '2012 — Professionally using JavaScript',
    text: 'During my couple of years in London, I worked for a Shoreditch based technology startup that is now the leading college yearbook company in the UK. It uses automated social network style tool that allows college graduates to fill out each others and their own profiles during the last months of studies and get that data automatically generated to an InDesign book layout using JavaScript and InDesing DOM model. During this time I took my interest in JavaScript to a professianal level and have been improving my skills ever since. ',
  },
  {
    id: 6,
    year: '2003',
    title: '2003 — Graphic Designer & Web Developer',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a scelerisque lorem. Nullam in luctus nisl. Quisque leo sem, egestas in est id, lacinia egestas libero. Ut ut ultricies turpis. Donec lacinia orci ac dignissim sollicitudin. Vivamus luctus efficitur ante sit amet convallis. Quisque nunc turpis, vulputate ut sapien quis, aliquam aliquam lorem. ',
  },
  {
    id: 7,
    year: '2001',
    title: '2001 — Web Portal Founder',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a scelerisque lorem. Nullam in luctus nisl. Quisque leo sem, egestas in est id, lacinia egestas libero. Ut ut ultricies turpis. Donec lacinia orci ac dignissim sollicitudin. Vivamus luctus efficitur ante sit amet convallis. Quisque nunc turpis, vulputate ut sapien quis, aliquam aliquam lorem. ',
  },
  {
    id: 8,
    year: '1997',
    title: '1997 — First Web Page',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a scelerisque lorem. Nullam in luctus nisl. Quisque leo sem, egestas in est id, lacinia egestas libero. Ut ut ultricies turpis. Donec lacinia orci ac dignissim sollicitudin. Vivamus luctus efficitur ante sit amet convallis. Quisque nunc turpis, vulputate ut sapien quis, aliquam aliquam lorem. ',
  },
  {
    id: 9,
    year: '1994',
    title: '1994 — First Code',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a scelerisque lorem. Nullam in luctus nisl. Quisque leo sem, egestas in est id, lacinia egestas libero. Ut ut ultricies turpis. Donec lacinia orci ac dignissim sollicitudin. Vivamus luctus efficitur ante sit amet convallis. Quisque nunc turpis, vulputate ut sapien quis, aliquam aliquam lorem. ',
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
