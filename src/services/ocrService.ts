import Tesseract from 'tesseract.js';

export const recognizeTextFromImage = async (
  image: string,
  languages: string[],
  onProgress: (progress: number) => void
): Promise<string> => {
  const selectedLangs = languages.join('+');
  
  try {
    const result = await Tesseract.recognize(image, selectedLangs, {
      logger: (m) => onProgress(m.progress),
    });

    const { text } = result.data;
    return text;
  } catch (error) {
    throw new Error('Failed to recognize text from the image');
  }
};
