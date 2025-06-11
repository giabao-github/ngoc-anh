export const DIACRITIC_REGEX = /\p{M}/gu;

export const VIETNAMESE_D_REGEX = /[đĐ]/gu;

export const SLUG_SPECIAL_CHARS = /[^a-zA-Z0-9]+/gu;

export const SLUG_MULTIPLE_DASHES = /-+/gu;

export const SLUG_EDGE_DASHES = /(?:^-|-$)/gu;

export const TEXT_SPECIAL_CHARS = /[^a-zA-Z0-9 ]/gu;

export const WHITESPACE_REGEX = /\s+/gu;

// Store patterns as strings to avoid double compilation
const KAOMOJI_PATTERN_STRINGS = [
  // Face patterns: (^_^) ಠ_ಠ o()o etc. - expanded character set
  "[\\(\\)（）][\\^\\-_oO•°ಠ><\\\\/\\|~=]{1,4}[\\)\\(）]",
  // Table flip, shrug patterns
  "[┻┳┃━│┌┐└┘├┤┬┴┼]",
  // Common kaomoji symbols (more selective)
  "[╯╰╭╮︵︶ツヾシ〜]",
  // Decorative symbols that are typically not content
  "[♪♫☆★♥♡‼⁉]",
  // Unicode kaomoji characters (covers ᓚᘏᗢ and similar)
  "(?:[\\u1400-\\u167F]|[\\u2600-\\u26FF]|[\\u2700-\\u27BF]|[\\uFE00-\\uFE0F])",
  // Specific problematic patterns you mentioned
  "o\\(\\)o",
  // Additional face-like patterns with various brackets
  "[<\\[\\{][^\\w\\s]{1,3}[>\\]\\}]",
] as const;

// Compile the combined pattern once
export const KAOMOJI_REGEX = new RegExp(
  KAOMOJI_PATTERN_STRINGS.join("|"),
  "gu",
);

// For reference or if needed elsewhere
export const KAOMOJI_PATTERNS = KAOMOJI_PATTERN_STRINGS.map(
  (pattern) => new RegExp(pattern, "gu"),
);
