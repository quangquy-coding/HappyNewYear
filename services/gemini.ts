import { GoogleGenAI } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const generateNewYearWish = async (name: string, context: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Viết một lời chúc Tết năm mới 2026 (Năm Bính Ngọ) cực kỳ ý nghĩa, hiện đại và tràn đầy cảm hứng bằng tiếng Việt. 
               Người nhận: ${name}. 
               Chủ đề: ${context}. 
               Lời chúc nên ngắn gọn (dưới 40 từ), mang phong cách 'Mã Đáo Thành Công' và tương lai.`,
    config: {
      temperature: 1,
    },
  });
  return response.text;
};

export const generateNewYearImage = async (prompt: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-image",
    contents: {
      parts: [
        {
          text: `A futuristic cinematic 2026 New Year digital art piece showing a powerful energetic horse made of light and neon. Themes: ${prompt}, 8k resolution, ethereal lighting, fireworks.`,
        },
      ],
    },
    config: {
      imageConfig: {
        aspectRatio: "16:9",
      },
    },
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return null;
};
