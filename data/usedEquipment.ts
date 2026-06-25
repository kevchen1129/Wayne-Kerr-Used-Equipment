import type { Locale } from "@/i18n/locales";

export type UsedEquipmentItem = {
  slug: string;
  model: string;
  stockReference: string;
  family: string;
  seriesTag: string;
  groupTags: string[];
  title: string;
  category: string;
  frequencyRange: string;
  price: string;
  currency: string;
  location: string;
  image: string;
  datasheet?: string;
  condition: string;
  warranty: string;
  availability: string;
  shortDescription: string;
  overview: string;
  highlights: string[];
  includes: string[];
  compatibleWith?: string[];
  stockNote?: string;
};

type LocaleContent = Pick<
  UsedEquipmentItem,
  | "family"
  | "seriesTag"
  | "groupTags"
  | "title"
  | "category"
  | "location"
  | "condition"
  | "warranty"
  | "availability"
  | "shortDescription"
  | "overview"
  | "highlights"
  | "includes"
  | "stockNote"
> & {
  compatibleWith?: string[];
};

const standardCondition =
  "Factory recalibrated and refurbished to like-new presentation";
const standardWarranty = "1-year Wayne Kerr warranty";
const standardAvailability = "Available on request";
const standardStockNote =
  "Display price is a placeholder until final commercial pricing is confirmed.";

const baseInventory: UsedEquipmentItem[] = [
  {
    slug: "65120b-bd1-1",
    model: "65120B",
    stockReference: "104WK65120BD1",
    family: "6500B Series",
    seriesTag: "65120 Series",
    groupTags: ["6500 Series", "Impedance Analyzer"],
    title: "Precision Impedance Analyzer",
    category: "Impedance Analyzers",
    frequencyRange: "20 Hz to 120 MHz",
    price: "99999",
    currency: "USD",
    location: "US / Japan",
    image: "/images/products/instruments/6500B.webp",
    datasheet: "/datasheets/instruments/WK6500B.pdf",
    condition: standardCondition,
    warranty: standardWarranty,
    availability: standardAvailability,
    shortDescription:
      "High-frequency impedance analyzer with graphing, frequency sweep, and bias sweep capability, expandable to 80A DC bias testing with 6565 units.",
    overview:
      "This 65120B listing represents a separate Wayne Kerr impedance analyzer prepared for customer-facing delivery with recalibration, refurbishment, and OEM follow-up support. It supports sweep frequency and sweep bias analysis with graphical display capability, and when paired with 6565 bias units it can support DC bias testing up to 80A total.",
    highlights: [
      "Up to 120 MHz impedance analysis",
      "Graphical display for sweep frequency and sweep bias studies",
      "Supports DC bias testing up to 80A total with 6565 units",
      "Strong fit for advanced component characterization and materials evaluation",
    ],
    includes: [
      "Functional verification before release",
      "Wayne Kerr platform review and condition screening",
      "Basic used-equipment preparation and availability support",
    ],
    compatibleWith: ["6565-120 HF DC Bias Unit"],
    stockNote: standardStockNote,
  },
  {
    slug: "65120b-bd2",
    model: "65120B",
    stockReference: "104WK65120BD2",
    family: "6500B Series",
    seriesTag: "65120 Series",
    groupTags: ["6500 Series", "Impedance Analyzer"],
    title: "Precision Impedance Analyzer",
    category: "Impedance Analyzers",
    frequencyRange: "20 Hz to 120 MHz",
    price: "99999",
    currency: "USD",
    location: "US / Japan",
    image: "/images/products/instruments/6500B.webp",
    datasheet: "/datasheets/instruments/WK6500B.pdf",
    condition: standardCondition,
    warranty: standardWarranty,
    availability: standardAvailability,
    shortDescription:
      "High-frequency impedance analyzer with graphing, frequency sweep, and bias sweep capability, expandable to 80A DC bias testing with 6565 units.",
    overview:
      "This 65120B listing represents a separate Wayne Kerr impedance analyzer prepared for customer-facing delivery with recalibration, refurbishment, and OEM follow-up support. It supports sweep frequency and sweep bias analysis with graphical display capability, and when paired with 6565 bias units it can support DC bias testing up to 80A total.",
    highlights: [
      "Up to 120 MHz impedance analysis",
      "Graphical display for sweep frequency and sweep bias studies",
      "Supports DC bias testing up to 80A total with 6565 units",
      "Strong fit for advanced component characterization and materials evaluation",
    ],
    includes: [
      "Functional verification before release",
      "Wayne Kerr platform review and condition screening",
      "Basic used-equipment preparation and availability support",
    ],
    compatibleWith: ["6565-120 HF DC Bias Unit"],
    stockNote: standardStockNote,
  },
  {
    slug: "65120b-ke",
    model: "65120B",
    stockReference: "104KE65120BD1",
    family: "6500B Series",
    seriesTag: "65120 Series",
    groupTags: ["6500 Series", "Impedance Analyzer"],
    title: "Precision Impedance Analyzer",
    category: "Impedance Analyzers",
    frequencyRange: "20 Hz to 120 MHz",
    price: "99999",
    currency: "USD",
    location: "US / Japan",
    image: "/images/products/instruments/6500B.webp",
    datasheet: "/datasheets/instruments/WK6500B.pdf",
    condition: standardCondition,
    warranty: standardWarranty,
    availability: standardAvailability,
    shortDescription:
      "High-frequency impedance analyzer with graphing, frequency sweep, and bias sweep capability, expandable to 80A DC bias testing with 6565 units.",
    overview:
      "This 65120B listing represents a separate Wayne Kerr impedance analyzer prepared for customer-facing delivery with recalibration, refurbishment, and OEM follow-up support. It supports sweep frequency and sweep bias analysis with graphical display capability, and when paired with 6565 bias units it can support DC bias testing up to 80A total.",
    highlights: [
      "Up to 120 MHz impedance analysis",
      "Graphical display for sweep frequency and sweep bias studies",
      "Supports DC bias testing up to 80A total with 6565 units",
      "Strong fit for advanced component characterization and materials evaluation",
    ],
    includes: [
      "Functional verification before release",
      "Wayne Kerr platform review and condition screening",
      "Basic used-equipment preparation and availability support",
    ],
    compatibleWith: ["6565-120 HF DC Bias Unit"],
    stockNote: standardStockNote,
  },
  {
    slug: "6565-120-1",
    model: "6565-120",
    stockReference: "1046565120AAN0",
    family: "6565 Series",
    seriesTag: "6565 Series",
    groupTags: ["6500 Series", "DC Bias Unit"],
    title: "HF DC Bias Unit",
    category: "DC Bias Accessories",
    frequencyRange: "20 Hz to 120 MHz",
    price: "99999",
    currency: "USD",
    location: "Taiwan",
    image: "/images/products/instruments/6565.webp",
    datasheet: "/datasheets/instruments/WK6565.pdf",
    condition: standardCondition,
    warranty: standardWarranty,
    availability: standardAvailability,
    shortDescription:
      "Each 6565 unit can deliver up to 10A, and you can reach up to 80A when paired with a Wayne Kerr 6500 Impedance Analyzer.",
    overview:
      "This 6565-120 listing is a dedicated Wayne Kerr HF DC Bias Unit prepared for bias-dependent component characterization with the Wayne Kerr 6500 Impedance Analyzer. Each 6565 unit can provide up to 10A, and users can reach up to 80A total by connecting up to eight units in parallel.",
    highlights: [
      "Designed to pair with the Wayne Kerr 6500 Impedance Analyzer",
      "Supports high-frequency work up to 120 MHz",
      "Each 6565 unit can provide up to 10A of DC current",
      "Use up to eight units in parallel to reach a maximum of 80A",
    ],
    includes: [
      "Compatibility review with your 6500 platform",
      "Used-equipment functional verification",
      "Guidance on fixture and current-range planning",
    ],
    compatibleWith: ["65120B", "65120P", "Other Wayne Kerr 6500-Series models"],
    stockNote: standardStockNote,
  },
  {
    slug: "6565-120-2",
    model: "6565-120",
    stockReference: "104KE6565120N0",
    family: "6565 Series",
    seriesTag: "6565 Series",
    groupTags: ["6500 Series", "DC Bias Unit"],
    title: "HF DC Bias Unit",
    category: "DC Bias Accessories",
    frequencyRange: "20 Hz to 120 MHz",
    price: "99999",
    currency: "USD",
    location: "Taiwan",
    image: "/images/products/instruments/6565.webp",
    datasheet: "/datasheets/instruments/WK6565.pdf",
    condition: standardCondition,
    warranty: standardWarranty,
    availability: standardAvailability,
    shortDescription:
      "Each 6565 unit can deliver up to 10A, and you can reach up to 80A when paired with a Wayne Kerr 6500 Impedance Analyzer.",
    overview:
      "This 6565-120 listing is a dedicated Wayne Kerr HF DC Bias Unit prepared for bias-dependent component characterization with the Wayne Kerr 6500 Impedance Analyzer. Each 6565 unit can provide up to 10A, and users can reach up to 80A total by connecting up to eight units in parallel.",
    highlights: [
      "Designed to pair with the Wayne Kerr 6500 Impedance Analyzer",
      "Supports high-frequency work up to 120 MHz",
      "Each 6565 unit can provide up to 10A of DC current",
      "Use up to eight units in parallel to reach a maximum of 80A",
    ],
    includes: [
      "Compatibility review with your 6500 platform",
      "Used-equipment functional verification",
      "Guidance on fixture and current-range planning",
    ],
    compatibleWith: ["65120B", "65120P", "Other Wayne Kerr 6500-Series models"],
    stockNote: standardStockNote,
  },
  {
    slug: "3260b-ke",
    model: "3260B",
    stockReference: "104KE3260BAN0",
    family: "3260B Series",
    seriesTag: "3260 Series",
    groupTags: ["3260 Series", "Magnetics Analyzer"],
    title: "Precision Magnetics Analyzer",
    category: "Magnetics Analyzers",
    frequencyRange: "20 Hz to 3 MHz",
    price: "99999",
    currency: "USD",
    location: "Global Stock",
    image: "/images/products/instruments/3260B.webp",
    datasheet: "/datasheets/instruments/WK3260B.pdf",
    condition: standardCondition,
    warranty: standardWarranty,
    availability: standardAvailability,
    shortDescription:
      "High-frequency LCR meter up to 3 MHz with advanced DC bias testing capability up to 250A when paired with 3265 units.",
    overview:
      "This 3260B listing represents a separate Wayne Kerr high-frequency LCR platform for demanding bias-dependent component testing. It operates up to 3 MHz and can pair with up to ten 3265 units, each providing 25A, for a maximum 250A high DC bias testing system.",
    highlights: [
      "High-frequency LCR measurement up to 3 MHz",
      "Pairs with up to ten 3265 units at 25A each for up to 250A total",
      "Supports sweep bias, sweep frequency, multi-bias, and multi-frequency testing",
      "Strong fit for high DC bias component characterization",
    ],
    includes: [
      "Used-equipment condition review",
      "Functional verification before offer confirmation",
      "Application matching with compatible bias accessories when needed",
    ],
    compatibleWith: ["3265B DC Bias Units"],
    stockNote: standardStockNote,
  },
  {
    slug: "6440b-ke",
    model: "6440B",
    stockReference: "104KE6440BAN0",
    family: "6400B Series",
    seriesTag: "6440 Series",
    groupTags: ["6400 Series", "Component Analyzer"],
    title: "Precision Component Analyzer",
    category: "Component Analyzers",
    frequencyRange: "20 Hz to 3 MHz",
    price: "99999",
    currency: "USD",
    location: "Global Stock",
    image: "/images/products/instruments/6440B.webp",
    datasheet: "/datasheets/instruments/WK6400B.pdf",
    condition: standardCondition,
    warranty: standardWarranty,
    availability: standardAvailability,
    shortDescription:
      "Used high-accuracy component analyzer for passive characterization, production testing, and design evaluation.",
    overview:
      "This 6440B listing represents a separate Wayne Kerr component analyzer prepared for customer-facing delivery with recalibration, refurbishment, and support.",
    highlights: [
      "20 Hz to 3 MHz coverage",
      "Up to ±0.02% basic resistance accuracy",
      "Multi-test and sweep-oriented component evaluation",
      "Strong fit for capacitor and passive-component workflows",
    ],
    includes: [
      "Functional verification and used-equipment review",
      "Application discussion for production or R&D use",
      "Datasheet-backed specification reference",
    ],
    stockNote: standardStockNote,
  },
  {
    slug: "43100-ke",
    model: "43100",
    stockReference: "104KE43100RN0",
    family: "4300/4100/4500 Series",
    seriesTag: "43100 Series",
    groupTags: ["4300 Series", "LCR Meter"],
    title: "LCR Meter",
    category: "LCR Meters",
    frequencyRange: "20 Hz to 1 MHz",
    price: "99999",
    currency: "USD",
    location: "Global Stock",
    image: "/images/products/instruments/4300.webp",
    datasheet: "/datasheets/instruments/WK4300.pdf",
    condition: standardCondition,
    warranty: standardWarranty,
    availability: standardAvailability,
    shortDescription:
      "Regular Wayne Kerr LCR meter for everyday bench and production measurements with straightforward operation.",
    overview:
      "This 43100 listing represents a separate Wayne Kerr regular LCR meter prepared for bench, QA, and production work with OEM follow-up support. It is part of the 4300 Series family, a practical LCR platform for routine measurement tasks.",
    highlights: [
      "Regular LCR meter workflow for routine applications",
      "4300 Series platform with simple operation",
      "Broad L, C, R, Q, and D measurement coverage",
      "Strong fit for bench, QA, and production environments",
    ],
    includes: [
      "Used-equipment functional verification",
      "Configuration review for your measurement application",
      "Availability follow-up through the Wayne Kerr team",
    ],
    stockNote: standardStockNote,
  },
  {
    slug: "43200",
    model: "43200",
    stockReference: "1041J4500AAN0",
    family: "4300/4100/4500 Series",
    seriesTag: "43200 Series",
    groupTags: ["4300 Series", "LCR Meter"],
    title: "LCR Meter",
    category: "LCR Meters",
    frequencyRange: "20 Hz to 2 MHz",
    price: "99999",
    currency: "USD",
    location: "Global Stock",
    image: "/images/products/instruments/4300.webp",
    datasheet: "/datasheets/instruments/WK4300.pdf",
    condition: standardCondition,
    warranty: standardWarranty,
    availability: standardAvailability,
    shortDescription:
      "Regular Wayne Kerr LCR meter for broader-frequency bench and production testing in the 4300/4100/4500 platform family.",
    overview:
      "The 43200 is a Wayne Kerr regular LCR meter in the 4300/4100/4500 family. It suits customers who need a straightforward LCR platform for routine testing while staying with a familiar Wayne Kerr operating style.",
    highlights: [
      "Regular LCR meter platform for everyday testing",
      "Part of the Wayne Kerr 4300/4100/4500 family",
      "Built for QA, production, and general component characterization",
      "Good fit for customers who want a simpler LCR workflow",
    ],
    includes: [
      "Used-equipment functional verification",
      "Configuration review for your measurement application",
      "Datasheet-backed follow-up through the Wayne Kerr team",
    ],
    stockNote: standardStockNote,
  },
  {
    slug: "65120b-bd1-2",
    model: "65120B",
    stockReference: "104WK65120BD1",
    family: "6500B Series",
    seriesTag: "65120 Series",
    groupTags: ["6500 Series", "Impedance Analyzer"],
    title: "Precision Impedance Analyzer",
    category: "Impedance Analyzers",
    frequencyRange: "20 Hz to 120 MHz",
    price: "99999",
    currency: "USD",
    location: "US / Japan",
    image: "/images/products/instruments/6500B.webp",
    datasheet: "/datasheets/instruments/WK6500B.pdf",
    condition: standardCondition,
    warranty: standardWarranty,
    availability: standardAvailability,
    shortDescription:
      "High-frequency impedance analyzer with graphing, frequency sweep, and bias sweep capability, expandable to 80A DC bias testing with 6565 units.",
    overview:
      "This 65120B listing represents a separate Wayne Kerr impedance analyzer prepared for customer-facing delivery with recalibration, refurbishment, and OEM follow-up support. It supports sweep frequency and sweep bias analysis with graphical display capability, and when paired with 6565 bias units it can support DC bias testing up to 80A total.",
    highlights: [
      "Up to 120 MHz impedance analysis",
      "Graphical display for sweep frequency and sweep bias studies",
      "Supports DC bias testing up to 80A total with 6565 units",
      "Strong fit for advanced component characterization and materials evaluation",
    ],
    includes: [
      "Functional verification before release",
      "Wayne Kerr platform review and condition screening",
      "Basic used-equipment preparation and availability support",
    ],
    compatibleWith: ["6565-120 HF DC Bias Unit"],
    stockNote: standardStockNote,
  },
  {
    slug: "65120b-bd1-3",
    model: "65120B",
    stockReference: "104WK65120BD1",
    family: "6500B Series",
    seriesTag: "65120 Series",
    groupTags: ["6500 Series", "Impedance Analyzer"],
    title: "Precision Impedance Analyzer",
    category: "Impedance Analyzers",
    frequencyRange: "20 Hz to 120 MHz",
    price: "99999",
    currency: "USD",
    location: "US / Japan",
    image: "/images/products/instruments/6500B.webp",
    datasheet: "/datasheets/instruments/WK6500B.pdf",
    condition: standardCondition,
    warranty: standardWarranty,
    availability: standardAvailability,
    shortDescription:
      "High-frequency impedance analyzer with graphing, frequency sweep, and bias sweep capability, expandable to 80A DC bias testing with 6565 units.",
    overview:
      "This 65120B listing represents a separate Wayne Kerr impedance analyzer prepared for customer-facing delivery with recalibration, refurbishment, and OEM follow-up support. It supports sweep frequency and sweep bias analysis with graphical display capability, and when paired with 6565 bias units it can support DC bias testing up to 80A total.",
    highlights: [
      "Up to 120 MHz impedance analysis",
      "Graphical display for sweep frequency and sweep bias studies",
      "Supports DC bias testing up to 80A total with 6565 units",
      "Strong fit for advanced component characterization and materials evaluation",
    ],
    includes: [
      "Functional verification before release",
      "Wayne Kerr platform review and condition screening",
      "Basic used-equipment preparation and availability support",
    ],
    compatibleWith: ["6565-120 HF DC Bias Unit"],
    stockNote: standardStockNote,
  },
  {
    slug: "65120p",
    model: "65120P",
    stockReference: "1041J65120PN0",
    family: "6500P Series",
    seriesTag: "65120 Series",
    groupTags: ["6500 Series", "HF LCR Meter"],
    title: "Precision LCR Meter",
    category: "LCR Meters",
    frequencyRange: "20 Hz to 120 MHz",
    price: "99999",
    currency: "USD",
    location: "Taiwan",
    image: "/images/products/instruments/6500P.webp",
    datasheet: "/datasheets/instruments/WK6500P.pdf",
    condition: standardCondition,
    warranty: standardWarranty,
    availability: standardAvailability,
    shortDescription:
      "High-frequency used LCR platform for teams that need broad range coverage with familiar Wayne Kerr workflows.",
    overview:
      "The 65120P extends the Wayne Kerr 6500P family to 120 MHz, giving users a flexible path for precision LCR work in production, validation, and component development environments.",
    highlights: [
      "120 MHz high-frequency LCR capability",
      "±0.05% basic accuracy for core measurements",
      "Large color touch display with programmable test workflows",
      "LAN, GPIB, and USB connectivity for bench and system integration",
    ],
    includes: [
      "Used-equipment screening and functional checks",
      "Configuration review for fixtures and application fit",
      "Datasheet and availability follow-up via the Wayne Kerr team",
    ],
    compatibleWith: ["6565-120 HF DC Bias Unit"],
    stockNote: standardStockNote,
  },
  {
    slug: "3260b-standard",
    model: "3260B",
    stockReference: "104WK3260BGN0",
    family: "3260B Series",
    seriesTag: "3260 Series",
    groupTags: ["3260 Series", "Magnetics Analyzer"],
    title: "Precision Magnetics Analyzer",
    category: "Magnetics Analyzers",
    frequencyRange: "20 Hz to 3 MHz",
    price: "99999",
    currency: "USD",
    location: "Global Stock",
    image: "/images/products/instruments/3260B.webp",
    datasheet: "/datasheets/instruments/WK3260B.pdf",
    condition: standardCondition,
    warranty: standardWarranty,
    availability: standardAvailability,
    shortDescription:
      "High-frequency LCR meter up to 3 MHz with advanced DC bias testing capability up to 250A when paired with 3265 units.",
    overview:
      "This 3260B listing represents a separate Wayne Kerr high-frequency LCR platform for demanding bias-dependent component testing. It operates up to 3 MHz and can pair with up to ten 3265 units, each providing 25A, for a maximum 250A high DC bias testing system.",
    highlights: [
      "High-frequency LCR measurement up to 3 MHz",
      "Pairs with up to ten 3265 units at 25A each for up to 250A total",
      "Supports sweep bias, sweep frequency, multi-bias, and multi-frequency testing",
      "Strong fit for high DC bias component characterization",
    ],
    includes: [
      "Used-equipment condition review",
      "Functional verification before offer confirmation",
      "Application matching with compatible bias accessories when needed",
    ],
    compatibleWith: ["3265B DC Bias Units"],
    stockNote: standardStockNote,
  },
  {
    slug: "6505p",
    model: "6505P",
    stockReference: "1041J6505PAN0",
    family: "6500P Series",
    seriesTag: "6505 Series",
    groupTags: ["6500 Series", "HF LCR Meter"],
    title: "HF LCR Meter",
    category: "LCR Meters",
    frequencyRange: "20 Hz to 5 MHz",
    price: "99999",
    currency: "USD",
    location: "China / C&G",
    image: "/images/products/instruments/6500P.webp",
    datasheet: "/datasheets/instruments/WK6500P.pdf",
    condition: standardCondition,
    warranty: standardWarranty,
    availability: standardAvailability,
    shortDescription:
      "5 MHz HF LCR meter in the 6500P family for customers who want Wayne Kerr high-frequency workflow at a lower entry point.",
    overview:
      "The 6505P is the 5 MHz model in the 6500P HF LCR Meter range. It is a practical choice when customers want the 6500P operating environment and performance style without needing the upper-frequency models like 65120P.",
    highlights: [
      "20 Hz to 5 MHz HF LCR capability",
      "Part of the Wayne Kerr 6500P platform family",
      "Strong fit for routine component evaluation and production support",
      "Lower-frequency alternative to higher-end 6500P variants",
    ],
    includes: [
      "Used-equipment functional verification",
      "Configuration review for your measurement application",
      "Availability and datasheet follow-up through the Wayne Kerr team",
    ],
    compatibleWith: ["6565 Series HF DC Bias Units"],
    stockNote: standardStockNote,
  },
];

const zhTWContentByModel: Record<string, LocaleContent> = {
  "65120B": {
    family: "6500B 系列",
    seriesTag: "65120 系列",
    groupTags: ["6500 系列", "阻抗分析儀"],
    title: "精密阻抗分析儀",
    category: "阻抗分析儀",
    location: "美國 / 日本",
    condition: "原廠重新校準並翻新整理，外觀近似新品展示狀態",
    warranty: "Wayne Kerr 原廠 1 年保固",
    availability: "可來信確認供貨狀況",
    shortDescription:
      "高頻阻抗分析儀，具備圖形顯示、頻率掃描與偏壓掃描功能，搭配 6565 可擴充至最高 80A 直流偏壓測試。",
    overview:
      "此 65120B 為單台獨立 Wayne Kerr 翻新設備，已完成重新校準、翻新整理與出貨前檢查，適合直接面向客戶展示與交付。具備圖形化顯示能力，可執行 sweep frequency 與 sweep bias 分析，搭配 6565 偏壓單元時最高可支援 80A 直流偏壓測試。",
    highlights: [
      "最高 120 MHz 阻抗分析能力",
      "支援 sweep frequency 與 sweep bias 圖形分析",
      "搭配 6565 單元最高可支援 80A 直流偏壓測試",
      "適合進階材料與元件特性分析",
    ],
    includes: [
      "出貨前功能驗證",
      "Wayne Kerr 平台狀態檢查",
      "基本翻新設備整理與供貨支援",
    ],
    compatibleWith: ["6565-120 高頻直流偏壓單元"],
    stockNote: "目前顯示價格為暫定，最終商業報價確認後會再更新。",
  },
  "6565-120": {
    family: "6565 系列",
    seriesTag: "6565 系列",
    groupTags: ["6500 系列", "直流偏壓單元"],
    title: "高頻直流偏壓單元",
    category: "直流偏壓配件",
    location: "台灣",
    condition: "原廠重新校準並翻新整理，外觀近似新品展示狀態",
    warranty: "Wayne Kerr 原廠 1 年保固",
    availability: "可來信確認供貨狀況",
    shortDescription:
      "每台 6565 最高可提供 10A，搭配 Wayne Kerr 6500 阻抗分析儀時，最多可串接 8 台達到 80A。",
    overview:
      "此 6565-120 為 Wayne Kerr 高頻直流偏壓單元，適合搭配 Wayne Kerr 6500 阻抗分析儀做偏壓相關元件特性量測。每台 6565 可提供最高 10A 直流電流，最多可並聯 8 台，總電流可達 80A。",
    highlights: [
      "專為 Wayne Kerr 6500 阻抗分析儀搭配使用",
      "支援最高 120 MHz 高頻測試",
      "每台 6565 可提供最高 10A 直流電流",
      "最多可並聯 8 台，總電流可達 80A",
    ],
    includes: [
      "與 6500 平台的相容性確認",
      "翻新設備功能驗證",
      "治具與電流範圍規劃建議",
    ],
    compatibleWith: ["65120B", "65120P", "其他 Wayne Kerr 6500 系列機種"],
    stockNote: "目前顯示價格為暫定，最終商業報價確認後會再更新。",
  },
  "3260B": {
    family: "3260B 系列",
    seriesTag: "3260 系列",
    groupTags: ["3260 系列", "磁性元件分析儀"],
    title: "精密磁性元件分析儀",
    category: "磁性元件分析儀",
    location: "全球庫存",
    condition: "原廠重新校準並翻新整理，外觀近似新品展示狀態",
    warranty: "Wayne Kerr 原廠 1 年保固",
    availability: "可來信確認供貨狀況",
    shortDescription:
      "高頻 LCR 量測平台，最高 3 MHz，搭配 3265 偏壓單元時最高可支援 250A 高直流偏壓測試。",
    overview:
      "此 3260B 為 Wayne Kerr 高頻 LCR / 磁性元件量測平台，適用於高偏壓條件下的元件特性測試。最高量測頻率可達 3 MHz，最多可搭配 10 台 3265，每台提供 25A，總偏壓電流最高可達 250A。",
    highlights: [
      "最高 3 MHz 高頻 LCR 量測能力",
      "搭配 10 台 3265、每台 25A，最高可達 250A",
      "支援 sweep bias、sweep frequency、multi-bias 與 multi-frequency 測試",
      "適合高直流偏壓元件特性分析",
    ],
    includes: [
      "翻新設備狀態檢查",
      "報價前功能驗證",
      "搭配偏壓配件的應用建議",
    ],
    compatibleWith: ["3265B 直流偏壓單元"],
    stockNote: "目前顯示價格為暫定，最終商業報價確認後會再更新。",
  },
  "6440B": {
    family: "6400B 系列",
    seriesTag: "6440 系列",
    groupTags: ["6400 系列", "元件分析儀"],
    title: "精密元件分析儀",
    category: "元件分析儀",
    location: "全球庫存",
    condition: "原廠重新校準並翻新整理，外觀近似新品展示狀態",
    warranty: "Wayne Kerr 原廠 1 年保固",
    availability: "可來信確認供貨狀況",
    shortDescription:
      "高精度被動元件分析平台，適合被動元件特性分析、生產測試與設計驗證。",
    overview:
      "此 6440B 為單台獨立 Wayne Kerr 元件分析儀，已完成重新校準、翻新整理與出貨前支援確認，適合對外展示與正式交付。",
    highlights: [
      "20 Hz 至 3 MHz 頻率範圍",
      "最高可達 ±0.02% 基本電阻精度",
      "支援多測項與掃描式元件分析",
      "適合電容與被動元件量測流程",
    ],
    includes: [
      "功能驗證與翻新設備檢查",
      "生產或研發應用需求討論",
      "搭配型錄規格說明支援",
    ],
    stockNote: "目前顯示價格為暫定，最終商業報價確認後會再更新。",
  },
  "43100": {
    family: "4300/4100/4500 系列",
    seriesTag: "43100 系列",
    groupTags: ["4300 系列", "LCR 測試儀"],
    title: "LCR 測試儀",
    category: "LCR 測試儀",
    location: "全球庫存",
    condition: "原廠重新校準並翻新整理，外觀近似新品展示狀態",
    warranty: "Wayne Kerr 原廠 1 年保固",
    availability: "可來信確認供貨狀況",
    shortDescription:
      "標準 Wayne Kerr LCR 測試儀，適合日常桌上型與生產線量測，操作直接簡單。",
    overview:
      "此 43100 為單台獨立 Wayne Kerr LCR 測試儀，適合桌上型、品保與生產使用。屬於 4300 系列家族，是一款適合日常量測工作的實用 LCR 平台。",
    highlights: [
      "標準 LCR 測試流程，適合例行應用",
      "4300 系列平台，操作直覺",
      "支援 L、C、R、Q、D 等常見量測",
      "適合桌上型、品保與生產環境",
    ],
    includes: [
      "翻新設備功能驗證",
      "量測應用配置檢查",
      "由 Wayne Kerr 團隊提供供貨追蹤",
    ],
    stockNote: "目前顯示價格為暫定，最終商業報價確認後會再更新。",
  },
  "43200": {
    family: "4300/4100/4500 系列",
    seriesTag: "43200 系列",
    groupTags: ["4300 系列", "LCR 測試儀"],
    title: "LCR 測試儀",
    category: "LCR 測試儀",
    location: "全球庫存",
    condition: "原廠重新校準並翻新整理，外觀近似新品展示狀態",
    warranty: "Wayne Kerr 原廠 1 年保固",
    availability: "可來信確認供貨狀況",
    shortDescription:
      "4300/4100/4500 平台中的標準 Wayne Kerr LCR 測試儀，適合較寬頻率範圍的桌上型與生產測試。",
    overview:
      "43200 為 Wayne Kerr 4300/4100/4500 家族中的標準 LCR 測試儀，適合需要熟悉 Wayne Kerr 操作風格、並用於日常量測工作的客戶。",
    highlights: [
      "日常測試用的標準 LCR 平台",
      "屬於 Wayne Kerr 4300/4100/4500 系列家族",
      "適合品保、生產與一般元件特性分析",
      "適合想要更簡潔 LCR 工作流程的客戶",
    ],
    includes: [
      "翻新設備功能驗證",
      "量測應用配置檢查",
      "由 Wayne Kerr 團隊提供型錄與供貨追蹤",
    ],
    stockNote: "目前顯示價格為暫定，最終商業報價確認後會再更新。",
  },
  "65120P": {
    family: "6500P 系列",
    seriesTag: "65120 系列",
    groupTags: ["6500 系列", "高頻 LCR 測試儀"],
    title: "精密 LCR 測試儀",
    category: "LCR 測試儀",
    location: "台灣",
    condition: "原廠重新校準並翻新整理，外觀近似新品展示狀態",
    warranty: "Wayne Kerr 原廠 1 年保固",
    availability: "可來信確認供貨狀況",
    shortDescription:
      "高頻翻新 LCR 平台，適合需要寬頻範圍與 Wayne Kerr 熟悉操作流程的團隊。",
    overview:
      "65120P 將 Wayne Kerr 6500P 系列延伸到 120 MHz，適合用於精密 LCR 量測、生產驗證與元件開發環境。",
    highlights: [
      "120 MHz 高頻 LCR 量測能力",
      "核心量測具備 ±0.05% 基本精度",
      "大尺寸彩色觸控顯示與可程式測試流程",
      "具備 LAN、GPIB 與 USB 連線能力",
    ],
    includes: [
      "翻新設備篩檢與功能檢查",
      "治具與應用相容性確認",
      "由 Wayne Kerr 團隊提供型錄與供貨追蹤",
    ],
    compatibleWith: ["6565-120 高頻直流偏壓單元"],
    stockNote: "目前顯示價格為暫定，最終商業報價確認後會再更新。",
  },
  "6505P": {
    family: "6500P 系列",
    seriesTag: "6505 系列",
    groupTags: ["6500 系列", "高頻 LCR 測試儀"],
    title: "高頻 LCR 測試儀",
    category: "LCR 測試儀",
    location: "中國 / C&G",
    condition: "原廠重新校準並翻新整理，外觀近似新品展示狀態",
    warranty: "Wayne Kerr 原廠 1 年保固",
    availability: "可來信確認供貨狀況",
    shortDescription:
      "6500P 家族中的 5 MHz 高頻 LCR 測試儀，適合想使用 Wayne Kerr 高頻量測流程、但不需要更高頻型號的客戶。",
    overview:
      "6505P 是 Wayne Kerr 6500P 高頻 LCR 系列中的 5 MHz 機型，適合需要 6500P 操作環境與量測風格、但不需要 65120P 等高頻型號的使用者。",
    highlights: [
      "20 Hz 至 5 MHz 高頻 LCR 量測能力",
      "屬於 Wayne Kerr 6500P 平台家族",
      "適合日常元件評估與生產支援",
      "作為高階 6500P 型號之前的實用入門選擇",
    ],
    includes: [
      "翻新設備功能驗證",
      "量測應用配置檢查",
      "由 Wayne Kerr 團隊提供供貨與型錄支援",
    ],
    compatibleWith: ["6565 系列高頻直流偏壓單元"],
    stockNote: "目前顯示價格為暫定，最終商業報價確認後會再更新。",
  },
};

const toSimplified = (value: string) =>
  value
    .replaceAll("儀", "仪")
    .replaceAll("測", "测")
    .replaceAll("體", "体")
    .replaceAll("壓", "压")
    .replaceAll("頻", "频")
    .replaceAll("應", "应")
    .replaceAll("廣", "广")
    .replaceAll("圍", "围")
    .replaceAll("與", "与")
    .replaceAll("達", "达")
    .replaceAll("總", "总")
    .replaceAll("並", "并")
    .replaceAll("單", "单")
    .replaceAll("為", "为")
    .replaceAll("價", "价")
    .replaceAll("庫", "库")
    .replaceAll("號", "号")
    .replaceAll("來", "来")
    .replaceAll("狀", "状")
    .replaceAll("檢", "检")
    .replaceAll("備", "备")
    .replaceAll("產", "产")
    .replaceAll("氣", "气")
    .replaceAll("開", "开")
    .replaceAll("發", "发")
    .replaceAll("雜", "杂")
    .replaceAll("觸", "触")
    .replaceAll("線", "线")
    .replaceAll("機", "机")
    .replaceAll("屬", "属")
    .replaceAll("簡", "简")
    .replaceAll("適", "适")
    .replaceAll("實", "实")
    .replaceAll("環", "环")
    .replaceAll("證", "证")
    .replaceAll("質", "质")
    .replaceAll("個", "个")
    .replaceAll("給", "给")
    .replaceAll("學", "学")
    .replaceAll("覺", "觉")
    .replaceAll("轉", "转")
    .replaceAll("層", "层")
    .replaceAll("高階", "高阶")
    .replaceAll("團隊", "团队")
    .replaceAll("台灣", "台湾");

const toSimplifiedContent = (content: LocaleContent): LocaleContent => ({
  ...content,
  family: toSimplified(content.family),
  seriesTag: toSimplified(content.seriesTag),
  groupTags: content.groupTags.map(toSimplified),
  title: toSimplified(content.title),
  category: toSimplified(content.category),
  location: toSimplified(content.location),
  condition: toSimplified(content.condition),
  warranty: toSimplified(content.warranty),
  availability: toSimplified(content.availability),
  shortDescription: toSimplified(content.shortDescription),
  overview: toSimplified(content.overview),
  highlights: content.highlights.map(toSimplified),
  includes: content.includes.map(toSimplified),
  compatibleWith: content.compatibleWith?.map(toSimplified),
  stockNote: content.stockNote ? toSimplified(content.stockNote) : undefined,
});

const zhCNContentByModel = Object.fromEntries(
  Object.entries(zhTWContentByModel).map(([model, content]) => [model, toSimplifiedContent(content)]),
) as Record<string, LocaleContent>;

function getLocalizedModelContent(model: string, locale: string) {
  if (locale === "zh-TW") {
    return zhTWContentByModel[model];
  }

  if (locale === "zh-CN") {
    return zhCNContentByModel[model];
  }

  return undefined;
}

function localizeItem(item: UsedEquipmentItem, locale: string): UsedEquipmentItem {
  const localized = getLocalizedModelContent(item.model, locale);

  if (!localized) {
    return item;
  }

  return {
    ...item,
    ...localized,
    compatibleWith: localized.compatibleWith ?? item.compatibleWith,
  };
}

export function getUsedEquipmentInventory(locale?: string): UsedEquipmentItem[] {
  if (!locale) {
    return baseInventory;
  }

  return baseInventory.map((item) => localizeItem(item, locale));
}

export function getUsedEquipmentBySlug(locale?: string): Record<string, UsedEquipmentItem> {
  return Object.fromEntries(
    getUsedEquipmentInventory(locale).map((item) => [item.slug, item]),
  ) as Record<string, UsedEquipmentItem>;
}

export const usedEquipmentInventory = baseInventory;
export const usedEquipmentBySlug = getUsedEquipmentBySlug();
