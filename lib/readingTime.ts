const WORDS_PER_MINUTE = 200;

export function getReadingTime(content: string): string {
  const text = content.replace(/<[^>]*>/g, "").replace(/[#*`~>\-|]/g, "");
  const wordCount = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
  return `${minutes} min read`;
}
