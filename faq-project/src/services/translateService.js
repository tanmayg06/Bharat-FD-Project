import translate from '@vitalets/google-translate-api';

export async function translateText(text, targetLang) {
  try {
    const result = await translate(text, { to: targetLang });
    return result.text;
  } catch (error) {
    console.error('Translation error:', error);
    // Fallback: return the original text if translation fails
    return text;
  }
}
