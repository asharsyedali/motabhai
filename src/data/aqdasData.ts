export interface TimelineItem {
  year: string;
  title: string;
  description: string;
  icon: string;
}

export interface Excuse {
  excuse: string;
  difficulty: "Easy" | "Medium" | "Expert" | "Legendary";
  successRate: string;
}

export interface LitQuote {
  quote: string;
  source: string;
  context: string;
}

export interface FancyWord {
  word: string;
  pronunciation: string;
  partOfSpeech: string;
  definition: string;
  example: string;
}

export interface MemeItem {
  id: string;
  title: string;
  imageUrl: string;
  caption: string;
  category: "Overthinking" | "Literature" | "Sleep" | "Gaming" | "Snacks";
  likes: number;
}

export interface NewsArticle {
  id: string;
  date: string;
  category: string;
  title: string;
  summary: string;
  content: string;
  impactScore: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  cost: number;
  unlocked: boolean;
  multiplier: number;
}

export interface Upgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  cps: number; // Coins per second
  icon: string;
  level: number;
}

export const timelineData: TimelineItem[] = [
  {
    year: "2004",
    title: "The Auspicious Descent",
    description: "Aqdas arrives on Earth. Immediately demands a literature critique of his baby formula packaging. Parents report his first word was 'nevertheless'.",
    icon: "Baby",
  },
  {
    year: "2010",
    title: "The Lego Manifesto",
    description: "Built a 3,000-piece Lego castle. Refused to play with it, stating that 'the structural voids represent the ephemeral nature of childhood joy'.",
    icon: "Grid",
  },
  {
    year: "2016",
    title: "Gaming & Philosophical Awakening",
    description: "Discovered RPG games. Spent more time writing character backstories and criticizing the narrative pacing than actually playing the game.",
    icon: "Gamepad2",
  },
  {
    year: "2020",
    title: "The English Literature Crusade Begins",
    description: "Enrolls in a BS of English Literature. Disappears into a cloud of coffee beans, leather-bound books, and multi-syllabic arguments.",
    icon: "BookOpen",
  },
  {
    year: "2024",
    title: "The Graduation Masterstroke",
    description: "Graduates with honors. His senior thesis was so deep, even the professors had to look up 45% of the words. He explained a single poem's margin notes for 3 hours.",
    icon: "GraduationCap",
  },
  {
    year: "2026",
    title: "The Founding of the Institute",
    description: "The Aqdas Research Institute is established to monitor and study his legendary ability to find symbolism in common memes.",
    icon: "Atom",
  }
];

export const excusesData: Excuse[] = [
  { excuse: "The metaphorical weight of existence made it impossible to lift the trash bag.", difficulty: "Expert", successRate: "85%" },
  { excuse: "I was in the middle of a profound narrative flow state regarding the refrigerator.", difficulty: "Medium", successRate: "62%" },
  { excuse: "The Wi-Fi router was emitting vibes that interfered with my cerebral focus.", difficulty: "Easy", successRate: "45%" },
  { excuse: "I am currently undergoing a transition phase between sleep cycles, do not disrupt the metamorphosis.", difficulty: "Legendary", successRate: "92%" },
  { excuse: "Shakespeare didn't have to clean his room, so why should I?", difficulty: "Expert", successRate: "70%" },
  { excuse: "My thesis on the symbolism of dust bunnies is reaching a climax.", difficulty: "Legendary", successRate: "95%" },
  { excuse: "The laundry represents modern capitalism; folding it is conforming to societal chains.", difficulty: "Expert", successRate: "88%" },
  { excuse: "I am conserving my kinetic energy for tomorrow's literary debates.", difficulty: "Medium", successRate: "50%" }
];

export const litQuotesData: LitQuote[] = [
  {
    quote: "The blue curtain in this room doesn't just block light; it is a profound manifestation of the protagonist's sub-conscious grief, mourning the transient state of yesterday's breakfast.",
    source: "Aqdas, during a family movie night",
    context: "Analyzing a 2-second background prop in a comedy movie"
  },
  {
    quote: "This sandwich is not mere wheat and cured turkey. It is a dualistic conflict between the sourdough (representing the harsh exterior of society) and the mayo (representing the soft, fragile human soul).",
    source: "Aqdas, at 2:00 AM in the kitchen",
    context: "Defending why he ate the last sandwich"
  },
  {
    quote: "To sleep, perchance to miss my morning alarm, is a tragedy of Shakespearean proportions, yet my duvet is the only loyal friend I have left in this capitalist dystopia.",
    source: "Aqdas, when asked why he's waking up at 1:00 PM",
    context: "Waking up on a Tuesday afternoon"
  },
  {
    quote: "I believe this cat meme deserves a deeper linguistic analysis. The usage of 'chonk' is a clear subversion of classical grammatical rules, mirroring the Dadaist movement of the early 20th century.",
    source: "Aqdas, in the family group chat",
    context: "Replying to a picture of a fat cat"
  }
];

export const fancyWordsData: FancyWord[] = [
  {
    word: "Sesquipedalianism",
    pronunciation: "ses-kwi-pi-dey-lee-uh-niz-uhm",
    partOfSpeech: "noun",
    definition: "The practice of using incredibly long words to describe simple things, primarily to look sophisticated in front of your older sibling.",
    example: "Aqdas' explanation of why he couldn't wash the dishes was a masterclass in sesquipedalianism."
  },
  {
    word: "Soporific-Procrastination",
    pronunciation: "sop-uh-rif-ik pro-kras-tuh-ney-shuhn",
    partOfSpeech: "noun",
    definition: "The sudden, heavy urge to take a 4-hour nap the exact millisecond any chore is mentioned.",
    example: "Washing the car triggered an immediate attack of soporific-procrastination in Aqdas."
  },
  {
    word: "Hermeneutic-Overthinking",
    pronunciation: "hur-muh-noo-tik oh-ver-thing-king",
    partOfSpeech: "noun",
    definition: "The talent of finding twelve layers of philosophical depth in a single text message that says 'Ok'.",
    example: "He spent three hours analyzing the punctuation of 'Ok' in hermeneutic-overthinking."
  },
  {
    word: "Bibliophilism-Inertia",
    pronunciation: "bib-lee-of-uh-liz-uhm i-nur-shuh",
    partOfSpeech: "noun",
    definition: "Buying thirty leather-bound classic novels, smelling their pages, and then immediately playing video games instead of reading them.",
    example: "His desk has a high rate of bibliophilism-inertia, featuring neat piles of untouched Homer."
  },
  {
    word: "Pecuniary-Ambidexterity",
    pronunciation: "pi-kyoo-nee-er-ee am-bi-dek-ster-i-tee",
    partOfSpeech: "noun",
    definition: "The ability to have absolutely no money for chores or grocery sharing, but instantly acquiring wealth when a gaming sale drops on Steam.",
    example: "Aqdas demonstrated pecuniary-ambidexterity when he bought three expansion packs after claiming he was bankrupt."
  }
];

export const memeGalleryData: MemeItem[] = [
  {
    id: "m1",
    title: "The Ultimate Analysis",
    imageUrl: "https://picsum.photos/seed/analysis/600/450",
    caption: "Aqdas explaining that the Wi-Fi being down is a metaphor for the disconnect between humanity and nature in modern literature.",
    category: "Overthinking",
    likes: 342
  },
  {
    id: "m2",
    title: "The Morning Battle",
    imageUrl: "https://picsum.photos/seed/sleep/600/500",
    caption: "Aqdas entering REM sleep stage 4 when the vacuum cleaner noise starts at 11:00 AM.",
    category: "Sleep",
    likes: 512
  },
  {
    id: "m3",
    title: "Linguistic Defense",
    imageUrl: "https://picsum.photos/seed/literature/600/400",
    caption: "When someone says 'it's just a book' and Aqdas begins drafting a 12-page response about existentialism.",
    category: "Literature",
    likes: 289
  },
  {
    id: "m4",
    title: "The Midnight Raid",
    imageUrl: "https://picsum.photos/seed/snacks/600/600",
    caption: "Aqdas sneaking downstairs at 3:00 AM to consume the last leftover pizza slice, claiming 'it was calling out to him in iambic pentameter'.",
    category: "Snacks",
    likes: 420
  },
  {
    id: "m5",
    title: "The Gaming Scholar",
    imageUrl: "https://picsum.photos/seed/gaming/600/480",
    caption: "Analyzing the socio-political hierarchies of NPCs in Elden Ring instead of completing his actual life planning.",
    category: "Gaming",
    likes: 601
  }
];

export const newsArticlesData: NewsArticle[] = [
  {
    id: "art1",
    date: "June 28, 2026",
    category: "ACADEMIC BREAKTHROUGH",
    title: "Aqdas Spends Three Hours Explaining One Poem",
    summary: "A simple 4-line poem about a cat becomes a grueling afternoon of classical existential critique.",
    content: "Witnesses report that Aqdas sat his family down in the living room after lunch to discuss a short poem about a cat sitting on a rug. What was supposed to be a 'quick share' turned into a full lecture series complete with hand gestures, dramatic pacing, and deep analysis of the word 'the'. 'The definite article suggests a pre-destined isolation,' Aqdas explained, while his brother slowly lost consciousness on the sofa.",
    impactScore: "9.9/10"
  },
  {
    id: "art2",
    date: "June 25, 2026",
    category: "SCIENTIFIC ANNOUNCEMENT",
    title: "Scientists Discover Another Symbolism Level Inside Aqdas' Essay",
    summary: "A routine check of his old BS essays reveals a sub-atomic layer of pure overthinking.",
    content: "Linguists from the Global Textual Association have discovered that a routine essay written by Aqdas during his sophomore year contains a hidden 4th layer of symbolism. Originally thought to be about Moby Dick, researchers now believe the essay represents the eternal struggle between Aqdas and his early morning alarm clock. 'It is a stunning achievement in literary defense mechanism,' said the lead researcher.",
    impactScore: "120% Symbolism"
  },
  {
    id: "art3",
    date: "June 20, 2026",
    category: "DOMESTIC DISPUTE",
    title: "The Great Kitchen Negotiation Ends in Filibuster",
    summary: "Aqdas successfully avoids taking out the garbage by reciting an incredibly poetic defense.",
    content: "In a spectacular display of verbal chess, Aqdas successfully filibustered his household chores yesterday evening. Confronted with a full trash bin, he delivered a 20-minute dramatic monologue comparing the bin to the Pandora's box of modern consumerism. Overwhelmed by vocabulary, his family eventually carried the trash out themselves just to stop the speech. Aqdas was later spotted celebrating with a snack.",
    impactScore: "Chore Avoided"
  }
];

export const upgradesData: Upgrade[] = [
  { id: "up1", name: "Dramatic Sigh", description: "Increases overthinking power by making loud dramatic noises.", cost: 10, cps: 1, icon: "Wind", level: 0 },
  { id: "up2", name: "Leather Notebook", description: "A highly sophisticated notebook. Mostly empty, but looks extremely academic.", cost: 50, cps: 5, icon: "Book", level: 0 },
  { id: "up3", name: "Espresso Machine", description: "Pumps high-velocity caffeine directly into his literature analysis lobe.", cost: 250, cps: 25, icon: "Coffee", level: 0 },
  { id: "up4", name: "Shakespearean Cape", description: "Allows him to quote Hamlet with 300% more physical authority.", cost: 1000, cps: 120, icon: "Shirt", level: 0 },
  { id: "up5", name: "Meme Cryptanalysis Desk", description: "A high-tech lab desk for extracting hidden literary symbolism from TikToks.", cost: 5000, cps: 600, icon: "Cpu", level: 0 },
];

export const achievementsData: Achievement[] = [
  { id: "ac1", title: "Master Essay Writer", description: "Write an essay so long it has a table of contents for its introduction.", cost: 100, unlocked: false, multiplier: 1.5 },
  { id: "ac2", title: "Professional Overthinker", description: "Analyze the punctuation of a text message for more than 40 minutes.", cost: 500, unlocked: false, multiplier: 2.0 },
  { id: "ac3", title: "Certified Shakespeare Fan", description: "Say 'Alas!' aloud in public while holding a slice of garlic bread.", cost: 2500, unlocked: false, multiplier: 3.0 },
  { id: "ac4", title: "Dean's List of Dramatic Interpretations", description: "Turn a simple question ('Where are my socks?') into a three-act tragedy.", cost: 10000, unlocked: false, multiplier: 5.0 },
  { id: "ac5", title: "CEO of Long Paragraphs", description: "Send a WhatsApp message that requires three 'Read More' clicks.", cost: 50000, unlocked: false, multiplier: 10.0 }
];

export const playJokes: string[] = [
  "Even autocorrect gives up on trying to understand the dramatic words Aqdas types.",
  "Aqdas once spent 20 minutes analyzing a meme only to realize it was sent by a wrong number.",
  "His English Lit essays have plot twists, cliffhangers, and an optional post-credits scene.",
  "Aqdas doesn't wake up late; he is merely holding a private moment of silence for the morning sun.",
  "If overthinking burned calories, Aqdas would be an Olympic athlete.",
  "Aqdas doesn't play games; he conducts interactive narrative audits of digital environments.",
  "Aqdas once analyzed a blank sheet of paper and concluded it was a minimalist protest against trees.",
  "He uses words so sophisticated that even Siri responds with 'I don't speak Elvish, Aqdas.'",
  "His alarm clock has a snooze button, but Aqdas treats it as a structural invitation to dream of Hamlet.",
  "Aqdas can explain a 4-word poem for 45 minutes and still claim he summarized it.",
  "When Aqdas says 'I'm thinking', it usually means he's deciding whether to have snacks or sleep.",
  "He thinks every Marvel movie is secretly an allegory for the Industrial Revolution.",
  "Aqdas has a BS in English Literature, which stands for 'Beautifully Sophisticated' excuses.",
  "Aqdas' room is a literary archive of clothes that symbolize 'the duality of comfort and chaos.'",
  "If you ask Aqdas for directions, he will explain the spiritual journey of the road before telling you to turn left.",
  "Aqdas doesn't snack; he conducts gastronomic research into the preservation of midnight energy.",
  "He once wrote a 5-page essay on why he was 10 minutes late, and his teacher gave him an A+.",
  "Aqdas thinks a Wi-Fi disconnection is a metaphor for the alienation of the postmodern individual.",
  "He reads the terms and conditions just to criticize the lack of character development in the legal prose.",
  "Aqdas quotes Shakespeare at random, usually when the pizza delivery is 5 minutes late.",
  "His dictionary is three times larger than his actual gaming desk, yet he plays games three times more.",
  "Even his sighs have a poetic rhythm that feels suspiciously rehearsed.",
  "Aqdas can find deep foreshadowing in a weather forecast.",
  "When he opens a book, he doesn't read it; he establishes a cerebral alliance with the author's spirit.",
  "He claims his messy hair is a physical representation of romanticist rebellion against combed society.",
  "Aqdas thinks a sandwich symbolizes the layers of human consciousness—mostly filled with cheese.",
  "His overthinking is so advanced that he has simulated three parallel universes where he actually folded his laundry.",
  "He once analyzed the font of a menu for so long that the restaurant closed before he ordered.",
  "Aqdas doesn't procrastinate; he participates in 'temporal preservation of potential.'",
  "Ask Aqdas 'What's up?', and be prepared for a brief overview of atmospheric pressure and cosmic existentialism.",
  "He treats a WhatsApp group chat like a peer-reviewed academic journal.",
  "Aqdas once argued with a GPS because he didn't like the tone of its passive-aggressive voice.",
  "His favorite exercise is jumping to dramatic conclusions based on minor punctuation edits.",
  "Aqdas thinks a toaster is an existential device that forces bread to undergo a fiery transition of state.",
  "He once spent an hour trying to find the deeper meaning of a '404 Not Found' page.",
  "Aqdas' essays are so dense that they generate their own gravitational fields.",
  "He refuses to eat round pizza because he believes triangles are more structurally analytical.",
  "If you ask Aqdas to buy milk, he will return with an organic oat substitute and a critique of dairy farming.",
  "His favorite literary device is the 'hyperbolic excuse' for why he slept through lunch.",
  "Aqdas believes that his older sibling's advice is a clear subversion of his autonomous destiny.",
  "He can quote Hamlet's soliloquy perfectly but cannot remember where he left his phone 30 seconds ago.",
  "His keyboard is worn out on the letters 'H', 'E', 'N', 'C', 'E', 'F', 'O', 'R', 'T', and 'H'.",
  "Aqdas doesn't lose in gaming; he merely experiences a narrative setback in his digital journey.",
  "He once wrote a poem about his room's fan, comparing its rotation to the cycle of laundry he avoids.",
  "When Aqdas enters a room, the level of overthinking rises by 40% immediately.",
  "He finds dramatic subtext in the beep of a microwave.",
  "Aqdas thinks a shopping list is a poetic inventory of desire.",
  "His favorite video game is 'Overthinking Simulator 2026', which is just him staring at his Steam library.",
  "He once tried to translate a cat's meow into Shakespearean English and concluded it was a cry for salmon.",
  "Aqdas' excuses have their own bibliography and citation index.",
  "He doesn't sleep; he pauses his consciousness to draft imaginary philosophical defenses.",
  "His essays are so long they have their own weather systems.",
  "He claims his desk's clutter is a physical manifestation of entropy in the late Anthropocene.",
  "Aqdas once tried to write an essay on a meme and accidentally got it published in an academic journal.",
  "He thinks that the 'skip intro' button on Netflix is an insult to the narrative structure of title sequences.",
  "Aqdas' cup of tea is never just tea; it is a warm potion of comfort in a freezing, indifferent cosmos.",
  "He uses unnecessarily sophisticated words just to make his grocery requests sound like royal decrees.",
  "Aqdas has a black belt in emotional dramatization.",
  "He can explain the symbolism of a blank TV screen for half an hour.",
  "His diary is written in the first person plural because he believes he contains multitudes.",
  "Aqdas' thoughts are so complex that they require their own index page.",
  "He once spent 40 minutes choosing a font for an email saying 'Got it.'",
  "Aqdas thinks that his laundry basket is a black hole that consumes his socks and returns metaphors.",
  "He reads classical literature at the gym just to confuse the people on the treadmills.",
  "His favorite anime is analyzed with the same intensity as a Greek tragedy.",
  "Aqdas believes that folding a blanket is a temporary illusion of order in an inherently chaotic universe.",
  "He once analyzed a spam email and wrote a reply criticizing its poor use of suspense.",
  "His sighs are loud enough to trigger noise-cancellation on nearby headphones.",
  "Aqdas' excuse rate is faster than the speed of light.",
  "He believes that his phone's battery percentage is a direct indicator of his soul's current charge.",
  "He treats a simple family discussion about dinner like a UN Security Council debate.",
  "Aqdas once analyzed a potato chip and claimed it resembled the contour of human suffering.",
  "His favorite Shakespeare character is Hamlet, mostly because Hamlet also took forever to make a decision.",
  "He uses footnotes in his text messages.",
  "Aqdas claims his late-night snacks are 'vital research materials' for his dream analysis.",
  "He doesn't argue; he merely delivers a highly structured academic counter-argument.",
  "Aqdas once tried to write an epic poem about his Wi-Fi password.",
  "He thinks a vacuum cleaner is a loud mechanical beast trying to silence the whispers of dust philosophy.",
  "His overthinking has its own dedicated cooling fan.",
  "Aqdas believes that his room is an sovereign state where chores are unconstitutional.",
  "He once analyzed a receipt and concluded that the tax was a direct commentary on the human condition.",
  "His favorite exercise is mental gymnastics to avoid physical activities.",
  "Aqdas treats a coffee cup like an existential anchor.",
  "He once spent two hours writing a review of a pen.",
  "His essays have a higher word count than the instructions for a nuclear submarine.",
  "He claims his sleep schedule is synchronized with the Elizabethan era.",
  "Aqdas thinks a door is not an opening, but an invitation to contemplate transition.",
  "He can find a structural motif in a bowl of cereal.",
  "His excuses are so poetic they make his family feel guilty for asking him to sweep.",
  "Aqdas once analyzed his sibling's text and found five layers of subconscious sarcasm.",
  "He reads classic literature to his indoor plants so they grow with high vocabulary.",
  "His gaming avatar wears glasses for 'increased literary authority' during boss fights.",
  "Aqdas' overthinking is the only machine capable of perpetual motion.",
  "He thinks a microwave timer is a countdown to a minor domestic epiphany.",
  "He once analyzed the syntax of a grocery receipt.",
  "Aqdas believes that a clean room is a blank canvas, and he prefers to keep it filled with his 'kinetic collage'.",
  "His sighs are patented under the category of 'unintended wind instruments'.",
  "He uses the word 'hitherto' at least three times when explaining why he ate the last cookie.",
  "Aqdas once wrote a 10-page essay about his favorite meme, complete with a works-cited page.",
  "Legend says if you say 'Symbolism' three times in front of a mirror, Aqdas appears and explains a poem."
];
