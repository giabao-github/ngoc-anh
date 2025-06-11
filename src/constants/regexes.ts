export const DIACRITIC_REGEX = /\p{M}/gu;
export const VIETNAMESE_D_REGEX = /[đĐ]/g;
export const SLUG_SPECIAL_CHARS = /[^a-zA-Z0-9]+/g;
export const SLUG_MULTIPLE_DASHES = /-+/g;
export const SLUG_EDGE_DASHES = /^-|-$/g;
export const TEXT_SPECIAL_CHARS = /[^a-zA-Z0-9 ]/g;
export const WHITESPACE_REGEX = /\s+/g;
export const KAOMOJI_PATTERNS = [
  // Face patterns: (^_^) ಠ_ಠ o()o etc. - expanded character set
  /[\(\)（）][\^\-_oO•°ಠ><\\\/\|~=]{1,4}[\)\(）（]/g,
  // Table flip, shrug patterns
  /[┻┳┃━│┌┐└┘├┤┬┴┼]/g,
  // Common kaomoji symbols (more selective)
  /[╯╰╭╮︵︶ツヾシ〜]/g,
  // Decorative symbols that are typically not content
  /[♪♫☆★♥♡‼⁉]/g,
  // Unicode kaomoji characters (covers ᓚᘏᗢ and similar)
  /[\u1400-\u167F\u2600-\u26FF\u2700-\u27BF\uFE00-\uFE0F]/g,
  // Specific problematic patterns you mentioned
  /o\(\)o/g,
  // Additional face-like patterns with various brackets
  /[<\[\{][^\w\s]{1,3}[>\]\}]/g,
];
