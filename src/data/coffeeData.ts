export interface CoffeeProduct {
  id: string;
  title: string;
  weight: string;
  price: number;
  currency: string;
  description: string;
  roastNote: string;
  defaultGrind: string;
  imageSrc: string;
  imageAlt: string;
}

export interface FeatureItem {
  id: string;
  number: string;
  title: string;
  description: string;
}

export const HERO_IMAGE = {
  src: '/src/assets/images/hero_turkish_coffee_1795030092953.jpg',
  alt: 'فنجان قهوة تركي طازج بجانب كنكة نحاسية وحبوب بن محمصة في إضاءة صباحية دافئة',
};

export const PRODUCTS: CoffeeProduct[] = [
  {
    id: 'turkish-plain',
    title: 'بن تركي سادة',
    weight: '250 جرام',
    price: 140,
    currency: 'جنيه',
    description:
      'توليفة كلاسيكية ناعمة لعشاق القهوة التركي الأصلية بقوام غني ووش مظبوط.',
    roastNote: 'تحميص وسط · طحن ناعم',
    defaultGrind: 'تركي ناعم',
    imageSrc: '/src/assets/images/product_turkish_plain_1795030092780.jpg',
    imageAlt: 'بن تركي سادة مطحون ناعماً بجانب فنجان قهوة تركي دافئ',
  },
  {
    id: 'turkish-spiced',
    title: 'بن تركي محوج',
    weight: '250 جرام',
    price: 160,
    currency: 'جنيه',
    description:
      'بن تركي فاخر بتحويجة مميزة من الحبهان وخلطة التوابل الخاصة لنكهة لا تُقاوم.',
    roastNote: 'حبهان وتوابل مختارة',
    defaultGrind: 'تركي ناعم محوج',
    imageSrc: '/src/assets/images/product_turkish_spiced_1795030094274.jpg',
    imageAlt: 'بن تركي محوج مع حبوب الحبهان الخضراء والتوابل العطرية',
  },
  {
    id: 'espresso-beans',
    title: 'حبوب قهوة إسبريسو',
    weight: '250 جرام',
    price: 190,
    currency: 'جنيه',
    description:
      'حبوب قهوة مختارة بعناية محمصة بدرجة مثالية لاستخلاص إسبريسو غني وكريما كثيفة.',
    roastNote: 'حبوب كاملة · أو طحن حسب الطلب',
    defaultGrind: 'حبوب كاملة',
    imageSrc: '/src/assets/images/product_espresso_beans_1795030095083.jpg',
    imageAlt: 'حبوب قهوة إسبريسو محمصة مع كوب إسبريسو بكريما ذهبية كثيفة',
  },
];

export const GRIND_OPTIONS = [
  'تركي ناعم',
  'إسبريسو',
  'حبوب كاملة',
] as const;

export const FEATURES: FeatureItem[] = [
  {
    id: 'grind-variety',
    number: '01',
    title: 'تنوع درجات الطحن',
    description:
      'بنوفرلك درجة الطحن المناسبة لطريقتك المفضلة، سواء تركي ناعم، إسبريسو، أو حبوب كاملة.',
  },
  {
    id: 'airtight-packaging',
    number: '02',
    title: 'تغليف محكم يحفظ النكهة',
    description:
      'عبوات مخصصة ومحكمة الغلق تحافظ على طزاجة البن وريحته القوية من التحميص لحد عندك.',
  },
  {
    id: 'fast-ordering',
    number: '03',
    title: 'سهولة وسرعة الطلب',
    description:
      'اطلب قهوتك بضغطة زر واحدة وهنتواصل معاك فوراً لتأكيد الطلب وميعاد التوصيل.',
  },
];
