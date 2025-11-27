import { GoogleGenAI } from "@google/genai";

// Declare process to avoid TS error because @types/node is not available
declare const process: {
  env: {
    API_KEY: string;
  }
};

// Helper to get AI instance safely
const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("Gemini API Key is missing. AI features will use fallback responses.");
    // Return null or a dummy object if you prefer, but handling null in callers is better
    // For now, we will throw a controlled error or return a mock if needed.
    // However, the library throws if apiKey is missing.
    // We'll let the library throw but only when this function is called, not at module load.
  }
  return new GoogleGenAI({ apiKey: apiKey || 'DUMMY_KEY_TO_PREVENT_CRASH' });
};

export const generateCaptainMessage = async (name: string, amount: number, message: string): Promise<string> => {
  try {
    const ai = getAiClient();
    const prompt = `
      Bertindaklah sebagai Kapten Kapal "Alfath Nusantara" yang kharismatik, bijaksana, dan berjiwa petualang.
      
      Seseorang bernama "${name}" baru saja menyumbang sebesar Rp ${amount.toLocaleString('id-ID')}.
      Pesan mereka: "${message || '(Tidak ada pesan)'}".
      
      Tugasmu:
      Buatlah pesan ucapan terima kasih yang personal, singkat (maksimal 3 kalimat), dan puitis.
      Sebutkan secara spesifik material kapal (paku, kayu jati, layar, kompas, perbekalan) yang didapat dari donasi tersebut.
      Gunakan gaya bahasa pelaut Nusantara yang gagah.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Terima kasih atas dukunganmu, Sang Patriot Laut!";
  } catch (error) {
    console.error("Error generating AI message:", error);
    return `Terima kasih tak terhingga, ${name}! Dukunganmu adalah angin segar bagi layar kami.`;
  }
};

export const generateConstructionUpdate = async (currentAmount: number, targetAmount: number): Promise<string> => {
    try {
        const ai = getAiClient();
        const percentage = (currentAmount / targetAmount) * 100;
        const prompt = `
          Tulis update singkat (1 paragraf pendek) tentang suasana pembangunan kapal "Alfath Nusantara".
          Progress pendanaan: ${percentage.toFixed(1)}%.
          
          Deskripsikan suasana visual dan audio di galangan kapal (bunyi palu, gergaji, semangat pekerja) yang mencerminkan progress ini.
          Jika progress masih awal (<20%), fokus pada persiapan dan lunas. Jika menengah, fokus pada lambung dan dek. Jika akhir, fokus pada layar dan finishing.
          Gunakan bahasa Indonesia yang menggugah semangat.
        `;
    
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
        });
    
        return response.text || "Pembangunan terus berjalan dengan semangat membara.";
      } catch (error) {
        return "Galangan kapal sibuk bekerja. Palu beradu dengan paku, mewujudkan mimpi bangsa.";
      }
}