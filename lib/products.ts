import { galleryImages } from "./images";

export type ProductCategory =
  | "soiree"
  | "traditionnel"
  | "ensemble"
  | "pret-a-porter"
  | "mariee";

export type Product = {
  slug: string;
  name: string;
  category: ProductCategory;
  price: number; // XOF
  imageIndices: number[]; // 0-based into galleryImages
  fabric: { fr: string; en: string };
  description: { fr: string; en: string };
  details: { fr: string[]; en: string[] };
  featured?: boolean;
};

export const CATEGORIES: { id: ProductCategory; fr: string; en: string }[] = [
  { id: "soiree", fr: "Robes de soirée", en: "Evening gowns" },
  { id: "traditionnel", fr: "Tenues traditionnelles", en: "Traditional wear" },
  { id: "ensemble", fr: "Ensembles", en: "Sets & suits" },
  { id: "pret-a-porter", fr: "Prêt-à-porter", en: "Ready-to-wear" },
  { id: "mariee", fr: "Mariée", en: "Bridal" },
];

export const products: Product[] = [
  {
    slug: "akissi",
    name: "Akissi",
    category: "traditionnel",
    price: 145000,
    imageIndices: [0, 1, 2],
    fabric: { fr: "Wax premium et satin de coton", en: "Premium wax and cotton satin" },
    description: {
      fr: "Une silhouette ample, sculptée par le wax. Akissi célèbre la femme qui marche tête haute.",
      en: "An ample silhouette sculpted by wax. Akissi celebrates the woman who walks tall.",
    },
    details: {
      fr: ["Confection sur mesure", "Doublure coton", "Délai 3 à 4 semaines"],
      en: ["Made to measure", "Cotton lining", "3 to 4 week lead time"],
    },
    featured: true,
  },
  {
    slug: "aya",
    name: "Aya",
    category: "pret-a-porter",
    price: 75000,
    imageIndices: [3, 4],
    fabric: { fr: "Crêpe lourd", en: "Heavy crepe" },
    description: {
      fr: "Coupe minimale, lignes franches. Aya s'installe dans le quotidien sans jamais le tutoyer.",
      en: "Minimal cut, clean lines. Aya enters daily life without ever being casual.",
    },
    details: {
      fr: ["Tailles 36 à 46", "Lavage à sec", "Pièce disponible en boutique"],
      en: ["Sizes 36 to 46", "Dry clean only", "Available in store"],
    },
  },
  {
    slug: "amani",
    name: "Amani",
    category: "soiree",
    price: 285000,
    imageIndices: [5, 6, 7],
    fabric: { fr: "Mousseline de soie brodée main", en: "Hand-embroidered silk chiffon" },
    description: {
      fr: "Robe longue, drapé fluide, broderies plumes. Amani habille les soirs qui restent.",
      en: "Long gown, fluid drape, feather embroidery. Amani dresses the nights that linger.",
    },
    details: {
      fr: ["Confection sur mesure", "Broderie main 60h", "Doublure soie"],
      en: ["Made to measure", "60h hand embroidery", "Silk lining"],
    },
    featured: true,
  },
  {
    slug: "bintou",
    name: "Bintou",
    category: "ensemble",
    price: 165000,
    imageIndices: [8, 9],
    fabric: { fr: "Bazin riche", en: "Bazin riche" },
    description: {
      fr: "Ensemble veste et pantalon, taillé pour celles qui occupent l'espace.",
      en: "Jacket-and-trouser set, cut for women who own the room.",
    },
    details: {
      fr: ["Veste structurée", "Pantalon ample", "Boutons couverts"],
      en: ["Structured jacket", "Wide-leg trousers", "Covered buttons"],
    },
  },
  {
    slug: "coumba",
    name: "Coumba",
    category: "traditionnel",
    price: 195000,
    imageIndices: [10, 11, 12],
    fabric: { fr: "Wax Vlisco et dentelle", en: "Vlisco wax and lace" },
    description: {
      fr: "Trois pièces : haut ajusté, jupe portefeuille, foulard assorti.",
      en: "Three pieces: fitted top, wrap skirt, matching headscarf.",
    },
    details: {
      fr: ["Confection sur mesure", "Foulard inclus", "Délai 3 semaines"],
      en: ["Made to measure", "Headscarf included", "3 week lead time"],
    },
    featured: true,
  },
  {
    slug: "diaba",
    name: "Diaba",
    category: "pret-a-porter",
    price: 68000,
    imageIndices: [13, 14],
    fabric: { fr: "Lin sablé", en: "Sanded linen" },
    description: {
      fr: "Robe chemise, ceinturée, à porter à toute heure.",
      en: "Belted shirt dress, ready for any hour.",
    },
    details: {
      fr: ["Tailles 36 à 44", "Ceinture amovible", "Lavage 30°"],
      en: ["Sizes 36 to 44", "Removable belt", "30°C wash"],
    },
  },
  {
    slug: "fanta",
    name: "Fanta",
    category: "soiree",
    price: 320000,
    imageIndices: [15, 16, 17],
    fabric: { fr: "Taffetas de soie", en: "Silk taffeta" },
    description: {
      fr: "Bustier sculpté, jupe corolle. Fanta entre dans la pièce avant vous.",
      en: "Sculpted bustier, full skirt. Fanta walks into the room before you do.",
    },
    details: {
      fr: ["Confection sur mesure", "Bustier baleiné", "Doublure tulle"],
      en: ["Made to measure", "Boned bustier", "Tulle underlay"],
    },
  },
  {
    slug: "habiba",
    name: "Habiba",
    category: "ensemble",
    price: 135000,
    imageIndices: [18, 19],
    fabric: { fr: "Satin duchesse", en: "Duchess satin" },
    description: {
      fr: "Tunique longue et pantalon palazzo. Lignes longues, intentions claires.",
      en: "Long tunic and palazzo trousers. Long lines, clear intent.",
    },
    details: {
      fr: ["Tunique fendue", "Pantalon taille haute", "Sur mesure"],
      en: ["Slit tunic", "High-waisted trousers", "Made to measure"],
    },
  },
  {
    slug: "idah",
    name: "Idah",
    category: "traditionnel",
    price: 175000,
    imageIndices: [20, 21, 22],
    fabric: { fr: "Wax et organza brodé", en: "Wax and embroidered organza" },
    description: {
      fr: "Boubou contemporain, manches volume, broderies discrètes au col.",
      en: "Contemporary boubou, volume sleeves, discreet collar embroidery.",
    },
    details: {
      fr: ["Confection sur mesure", "Manches détachables", "3 semaines"],
      en: ["Made to measure", "Detachable sleeves", "3 weeks"],
    },
    featured: true,
  },
  {
    slug: "khady",
    name: "Khady",
    category: "pret-a-porter",
    price: 82000,
    imageIndices: [23, 24],
    fabric: { fr: "Jersey de viscose", en: "Viscose jersey" },
    description: {
      fr: "Robe moulante, col bénitier. Khady épouse le geste.",
      en: "Slim-fit dress, cowl neck. Khady follows your every move.",
    },
    details: {
      fr: ["Tailles 36 à 44", "Stretch confort", "Lavage main"],
      en: ["Sizes 36 to 44", "Comfort stretch", "Hand wash"],
    },
  },
  {
    slug: "maimouna",
    name: "Maïmouna",
    category: "soiree",
    price: 395000,
    imageIndices: [25, 26, 27],
    fabric: { fr: "Dentelle de Calais et soie", en: "Calais lace and silk" },
    description: {
      fr: "Robe fourreau dentelle, traîne courte. Maïmouna ne demande pas la lumière, elle la trouve.",
      en: "Lace sheath, short train. Maïmouna does not ask for the light, she finds it.",
    },
    details: {
      fr: ["Confection sur mesure", "Traîne 40 cm", "Doublure soie"],
      en: ["Made to measure", "40 cm train", "Silk lining"],
    },
    featured: true,
  },
  {
    slug: "nadege",
    name: "Nadège",
    category: "ensemble",
    price: 148000,
    imageIndices: [28, 29],
    fabric: { fr: "Crêpe de laine", en: "Wool crepe" },
    description: {
      fr: "Blazer cintré et jupe crayon. Nadège va au bureau et au-delà.",
      en: "Fitted blazer and pencil skirt. Nadège owns the office, and beyond.",
    },
    details: {
      fr: ["Blazer doublé", "Jupe fente arrière", "Sur mesure"],
      en: ["Lined blazer", "Back-vent skirt", "Made to measure"],
    },
  },
  {
    slug: "naya",
    name: "Naya",
    category: "traditionnel",
    price: 165000,
    imageIndices: [30, 31, 32],
    fabric: { fr: "Pagne tissé Korhogo", en: "Korhogo handwoven cloth" },
    description: {
      fr: "Ensemble deux pièces, tissé main à Korhogo. Le savoir-faire devient silhouette.",
      en: "Two-piece set, handwoven in Korhogo. Heritage takes shape.",
    },
    details: {
      fr: ["Tissage main", "Confection sur mesure", "Pièce unique"],
      en: ["Handwoven cloth", "Made to measure", "One of a kind"],
    },
  },
  {
    slug: "ouma",
    name: "Ouma",
    category: "pret-a-porter",
    price: 58000,
    imageIndices: [33, 34],
    fabric: { fr: "Popeline coton", en: "Cotton poplin" },
    description: {
      fr: "Robe trapèze, manches courtes. Ouma se porte sans y penser.",
      en: "A-line dress, short sleeves. Ouma wears without thought.",
    },
    details: {
      fr: ["Tailles 36 à 46", "Poches latérales", "Lavage 30°"],
      en: ["Sizes 36 to 46", "Side pockets", "30°C wash"],
    },
  },
  {
    slug: "penda",
    name: "Penda",
    category: "soiree",
    price: 265000,
    imageIndices: [35, 36, 37],
    fabric: { fr: "Velours de soie", en: "Silk velvet" },
    description: {
      fr: "Robe asymétrique, drapé épaule. Penda dessine la lumière au velours.",
      en: "Asymmetric gown, shoulder drape. Penda paints light onto velvet.",
    },
    details: {
      fr: ["Confection sur mesure", "Doublure satin", "Drapé main"],
      en: ["Made to measure", "Satin lining", "Hand-draped"],
    },
    featured: true,
  },
  {
    slug: "rama",
    name: "Rama",
    category: "ensemble",
    price: 125000,
    imageIndices: [38, 39],
    fabric: { fr: "Coton enduit", en: "Coated cotton" },
    description: {
      fr: "Veste courte et short taille haute. Rama joue avec les codes du jour.",
      en: "Cropped jacket and high-waist shorts. Rama plays the daywear codes.",
    },
    details: {
      fr: ["Veste cintrée", "Short doublé", "Tailles 36 à 44"],
      en: ["Fitted jacket", "Lined shorts", "Sizes 36 to 44"],
    },
  },
  {
    slug: "salimata",
    name: "Salimata",
    category: "traditionnel",
    price: 215000,
    imageIndices: [40, 41, 42],
    fabric: { fr: "Damas brodé et perles", en: "Embroidered damask and beadwork" },
    description: {
      fr: "Grande robe de cérémonie, perles cousues main au plastron.",
      en: "Grand ceremonial gown, hand-beaded bodice.",
    },
    details: {
      fr: ["Confection sur mesure", "Perles cousues main", "4 semaines"],
      en: ["Made to measure", "Hand-sewn beading", "4 weeks"],
    },
    featured: true,
  },
  {
    slug: "yasmine",
    name: "Yasmine",
    category: "pret-a-porter",
    price: 72000,
    imageIndices: [43, 44],
    fabric: { fr: "Sergé de coton", en: "Cotton twill" },
    description: {
      fr: "Robe portefeuille, ceinture tressée. Yasmine, version atelier d'été.",
      en: "Wrap dress, woven belt. Yasmine, summer-atelier edition.",
    },
    details: {
      fr: ["Tailles 36 à 44", "Ceinture tressée", "Lavage 30°"],
      en: ["Sizes 36 to 44", "Braided belt", "30°C wash"],
    },
  },
  {
    slug: "ahoua",
    name: "Ahoua",
    category: "soiree",
    price: 245000,
    imageIndices: [45, 46, 47],
    fabric: { fr: "Crêpe envers satin", en: "Satin-backed crepe" },
    description: {
      fr: "Robe colonne, dos nu. Ahoua, le silence de la coupe parfaite.",
      en: "Column gown, open back. Ahoua, the silence of a perfect cut.",
    },
    details: {
      fr: ["Confection sur mesure", "Dos nu cordon", "Doublure soie"],
      en: ["Made to measure", "Lace-back closure", "Silk lining"],
    },
  },
  {
    slug: "aicha",
    name: "Aïcha",
    category: "ensemble",
    price: 158000,
    imageIndices: [48, 49],
    fabric: { fr: "Soie sauvage", en: "Wild silk" },
    description: {
      fr: "Top kimono et jupe longue. Aïcha glisse entre deux mondes.",
      en: "Kimono top and long skirt. Aïcha glides between two worlds.",
    },
    details: {
      fr: ["Top ceinturé", "Jupe doublée", "Sur mesure"],
      en: ["Belted top", "Lined skirt", "Made to measure"],
    },
  },
  {
    slug: "awa",
    name: "Awa",
    category: "pret-a-porter",
    price: 65000,
    imageIndices: [50, 51],
    fabric: { fr: "Chambray coton", en: "Cotton chambray" },
    description: {
      fr: "Combinaison sans manches, ceinturée. Awa, la pièce qui pardonne tout.",
      en: "Sleeveless jumpsuit, belted. Awa, the piece that forgives everything.",
    },
    details: {
      fr: ["Tailles 36 à 44", "Ceinture intégrée", "Lavage 30°"],
      en: ["Sizes 36 to 44", "Built-in belt", "30°C wash"],
    },
  },
  {
    slug: "baya",
    name: "Baya",
    category: "traditionnel",
    price: 185000,
    imageIndices: [52, 53, 54],
    fabric: { fr: "Wax et tulle plissé", en: "Wax and pleated tulle" },
    description: {
      fr: "Robe à plis soleil, ceinture obi. Baya joue la rondeur du geste.",
      en: "Sunray-pleat dress, obi belt. Baya plays the curve of the gesture.",
    },
    details: {
      fr: ["Confection sur mesure", "Plis soleil", "Ceinture obi"],
      en: ["Made to measure", "Sunray pleats", "Obi belt"],
    },
  },
  {
    slug: "dior",
    name: "Dior",
    category: "soiree",
    price: 305000,
    imageIndices: [55, 56],
    fabric: { fr: "Satin duchesse et plumes", en: "Duchess satin and feathers" },
    description: {
      fr: "Robe sirène, ourlet plumes. Dior referme la soirée comme un applaudissement.",
      en: "Mermaid gown, feather hem. Dior closes the evening like applause.",
    },
    details: {
      fr: ["Confection sur mesure", "Plumes cousues main", "Doublure satin"],
      en: ["Made to measure", "Hand-sewn feathers", "Satin lining"],
    },
  },
  {
    slug: "fatou",
    name: "Fatou",
    category: "ensemble",
    price: 142000,
    imageIndices: [57, 58, 59],
    fabric: { fr: "Twill viscose imprimé", en: "Printed viscose twill" },
    description: {
      fr: "Chemise oversize et pantalon fluide, imprimé exclusif maison.",
      en: "Oversized shirt and fluid trousers, house-exclusive print.",
    },
    details: {
      fr: ["Imprimé exclusif", "Pantalon ceinturé", "Tailles 36 à 46"],
      en: ["Exclusive print", "Belted trousers", "Sizes 36 to 46"],
    },
  },
  {
    slug: "jenneba",
    name: "Jenneba",
    category: "pret-a-porter",
    price: 78000,
    imageIndices: [60, 61],
    fabric: { fr: "Crêpe stretch", en: "Stretch crepe" },
    description: {
      fr: "Robe midi, col montant, manches longues. Jenneba couvre sans cacher.",
      en: "Midi dress, high neck, long sleeves. Jenneba covers without hiding.",
    },
    details: {
      fr: ["Tailles 36 à 44", "Doublure légère", "Lavage à sec"],
      en: ["Sizes 36 to 44", "Light lining", "Dry clean"],
    },
  },
  {
    slug: "linda",
    name: "Linda",
    category: "soiree",
    price: 225000,
    imageIndices: [62, 63, 64],
    fabric: { fr: "Tulle pailleté", en: "Sequined tulle" },
    description: {
      fr: "Robe cocktail, jupe à volants pailletée. Linda allume la pièce.",
      en: "Cocktail dress, sequined ruffle skirt. Linda lights up the room.",
    },
    details: {
      fr: ["Confection sur mesure", "Paillettes main", "Bustier baleiné"],
      en: ["Made to measure", "Hand-sewn sequins", "Boned bustier"],
    },
  },
  {
    slug: "mariam",
    name: "Mariam",
    category: "ensemble",
    price: 168000,
    imageIndices: [65, 66],
    fabric: { fr: "Gabardine de laine", en: "Wool gabardine" },
    description: {
      fr: "Veste longueur 7/8 et pantalon droit. Mariam est l'autorité tranquille.",
      en: "7/8 jacket and straight trousers. Mariam is quiet authority.",
    },
    details: {
      fr: ["Veste doublée", "Pantalon revers", "Sur mesure"],
      en: ["Lined jacket", "Cuffed trousers", "Made to measure"],
    },
  },
  {
    slug: "nafissa",
    name: "Nafissa",
    category: "traditionnel",
    price: 235000,
    imageIndices: [67, 68, 69],
    fabric: { fr: "Wax Hollandais et soie", en: "Dutch wax and silk" },
    description: {
      fr: "Tenue trois pièces de cérémonie : top, jupe longue, mouchoir de tête.",
      en: "Three-piece ceremonial outfit: top, long skirt, head wrap.",
    },
    details: {
      fr: ["Confection sur mesure", "Mouchoir inclus", "4 semaines"],
      en: ["Made to measure", "Head wrap included", "4 weeks"],
    },
    featured: true,
  },
  {
    slug: "tiemoko",
    name: "Tiémoko",
    category: "pret-a-porter",
    price: 88000,
    imageIndices: [70, 71],
    fabric: { fr: "Mélange lin et soie", en: "Linen and silk blend" },
    description: {
      fr: "Robe longue, bretelles fines, dos nu. Tiémoko respire l'été.",
      en: "Maxi dress, thin straps, open back. Tiémoko breathes summer.",
    },
    details: {
      fr: ["Tailles 36 à 44", "Dos nu nouage", "Lavage main"],
      en: ["Sizes 36 to 44", "Tie-back closure", "Hand wash"],
    },
  },
  {
    slug: "sira",
    name: "Sira",
    category: "mariee",
    price: 850000,
    imageIndices: [72, 73, 74],
    fabric: { fr: "Soie naturelle, dentelle et perles", en: "Natural silk, lace and beadwork" },
    description: {
      fr: "Robe de mariée : bustier dentelle perlé, jupe princesse, traîne longue.",
      en: "Bridal gown: beaded lace bodice, princess skirt, long train.",
    },
    details: {
      fr: ["Confection sur mesure", "Traîne 1,20 m", "8 semaines", "Essayages inclus"],
      en: ["Made to measure", "1.2 m train", "8 weeks", "Fittings included"],
    },
    featured: true,
  },
  {
    slug: "aminata",
    name: "Aminata",
    category: "soiree",
    price: 275000,
    imageIndices: [75, 76],
    fabric: { fr: "Jacquard de soie", en: "Silk jacquard" },
    description: {
      fr: "Robe trapèze, col bardot. Aminata laisse parler l'épaule.",
      en: "A-line gown, bardot neckline. Aminata lets the shoulder speak.",
    },
    details: {
      fr: ["Confection sur mesure", "Doublure soie", "3 semaines"],
      en: ["Made to measure", "Silk lining", "3 weeks"],
    },
  },
  {
    slug: "kadiatou",
    name: "Kadiatou",
    category: "traditionnel",
    price: 205000,
    imageIndices: [77, 78, 79],
    fabric: { fr: "Bogolan et coton brodé", en: "Bogolan and embroidered cotton" },
    description: {
      fr: "Robe longue inspirée du bogolan malien, broderies main au col et aux poignets.",
      en: "Long dress inspired by Malian bogolan, hand embroidery at neck and cuffs.",
    },
    details: {
      fr: ["Confection sur mesure", "Broderie main", "Pièce limitée"],
      en: ["Made to measure", "Hand embroidery", "Limited piece"],
    },
  },
  {
    slug: "zenab",
    name: "Zenab",
    category: "mariee",
    price: 1250000,
    imageIndices: [80, 81, 82],
    fabric: { fr: "Mikado de soie et dentelle Chantilly", en: "Silk mikado and Chantilly lace" },
    description: {
      fr: "Robe de mariée d'exception : bustier Chantilly, jupe mikado architecturée, voile cathédrale.",
      en: "Couture bridal gown: Chantilly bodice, architectural mikado skirt, cathedral veil.",
    },
    details: {
      fr: ["Confection sur mesure", "Voile 3 m", "10 semaines", "3 essayages"],
      en: ["Made to measure", "3 m veil", "10 weeks", "3 fittings"],
    },
    featured: true,
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

const imageToProduct = new Map<number, Product>();
for (const p of products) {
  for (const idx of p.imageIndices) imageToProduct.set(idx, p);
}

export function getProductByImageIndex(idx: number): Product | undefined {
  return imageToProduct.get(idx);
}

export function getProductImages(p: Product) {
  return p.imageIndices.map((i) => galleryImages[i]).filter(Boolean);
}

export function getRelated(p: Product, n = 4): Product[] {
  return products
    .filter((q) => q.slug !== p.slug && q.category === p.category)
    .slice(0, n);
}

export const featuredProducts = products.filter((p) => p.featured);

export const PRICE_BUCKETS: {
  id: string;
  min: number;
  max: number;
  label: { fr: string; en: string };
}[] = [
  { id: "lt100", min: 0, max: 100_000, label: { fr: "Moins de 100 000 FCFA", en: "Under 100,000 FCFA" } },
  { id: "100-200", min: 100_000, max: 200_000, label: { fr: "100 000 – 200 000 FCFA", en: "100,000 – 200,000 FCFA" } },
  { id: "200-400", min: 200_000, max: 400_000, label: { fr: "200 000 – 400 000 FCFA", en: "200,000 – 400,000 FCFA" } },
  { id: "gt400", min: 400_000, max: Infinity, label: { fr: "Plus de 400 000 FCFA", en: "Over 400,000 FCFA" } },
];

const FABRIC_KEYWORDS: { id: string; fr: string; en: string; match: RegExp }[] = [
  { id: "wax", fr: "Wax", en: "Wax", match: /wax/i },
  { id: "soie", fr: "Soie", en: "Silk", match: /soie|silk/i },
  { id: "dentelle", fr: "Dentelle", en: "Lace", match: /dentelle|lace/i },
  { id: "coton", fr: "Coton & lin", en: "Cotton & linen", match: /coton|cotton|lin\b|linen|chambray|popeline|poplin|sergé|twill/i },
  { id: "satin", fr: "Satin & taffetas", en: "Satin & taffeta", match: /satin|taffetas|taffeta|duchesse|mikado/i },
  { id: "velours", fr: "Velours & tulle", en: "Velvet & tulle", match: /velours|velvet|tulle|mousseline|chiffon|organza/i },
  { id: "perles", fr: "Brodé & perles", en: "Embroidered & beaded", match: /perl|bead|brod|embroider|paillet|sequin/i },
];

export type FabricGroup = (typeof FABRIC_KEYWORDS)[number];

export function fabricGroupsOf(p: Product): string[] {
  const f = `${p.fabric.fr} ${p.fabric.en}`;
  return FABRIC_KEYWORDS.filter((g) => g.match.test(f)).map((g) => g.id);
}

export const FABRICS = FABRIC_KEYWORDS;
