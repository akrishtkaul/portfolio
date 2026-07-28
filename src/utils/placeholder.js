const PLACEHOLDER_PATTERN = /^(TODO|VERIFY)/i;

export function isPlaceholder(value) {
  return !value || PLACEHOLDER_PATTERN.test(value);
}
