export const DIACRITIC_REGEX = /\p{M}/gu;

export const VIETNAMESE_D_REGEX = /[đĐ]/gu;

export const SLUG_SPECIAL_CHARS = /[^a-zA-Z0-9]+/g;

export const SLUG_MULTIPLE_DASHES = /-+/g;

export const SLUG_EDGE_DASHES = /(?:^-|-$)/g;

export const TEXT_SPECIAL_CHARS = /[^a-zA-Z0-9 ]/g;

export const WHITESPACE_REGEX = /\s+/g;

export const KAOMOJI_PATTERNS: ReadonlyArray<RegExp> = [
  // Face patterns: (^_^) ಠ_ಠ o()o etc. - expanded character set
  /[\(\)（）][\^\-_oO•°ಠ><\\\/\|~=]{1,4}[\)\(）（]/gu,
  // Table flip, shrug patterns
  /[┻┳┃━│┌┐└┘├┤┬┴┼]/gu,
  // Common kaomoji symbols (more selective)
  /[╯╰╭╮︵︶ツヾシ〜]/gu,
  // Decorative symbols that are typically not content
  /[♪♫☆★♥♡‼⁉]/gu,
  // Unicode kaomoji characters (covers ᓚᘏᗢ and similar)
  /(?:[\u1400-\u167F]|[\u2600-\u26FF]|[\u2700-\u27BF]|[\uFE00-\uFE0F])/gu,
  // Specific problematic patterns you mentioned
  /o\(\)o/gu,
  // Additional face-like patterns with various brackets
  /[<\[\{][^\w\s]{1,3}[>\]\}]/gu,
];
