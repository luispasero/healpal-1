
import { GoogleGenAI, Type } from "@google/genai";
import { TriageData, AIRecommendation } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getTriageRecommendation(data: TriageData): Promise<AIRecommendation> {
  const prompt = `Analiza el siguiente perfil de deportista y recomienda un equipo de profesionales de Headpal (Fisioterapia, Entrenamiento, Nutrición, Psicología).
  Objetivo: ${data.objective}
  Molestias/Lesiones: ${data.discomfort}
  Ubicación: ${data.location}
  Preferencia: ${data.modality}
  Disponibilidad: ${data.availability}

  Devuelve una recomendación estructurada priorizando los tipos de profesionales.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          priority: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Lista ordenada de categorías de profesionales sugeridas."
          },
          reason: {
            type: Type.STRING,
            description: "Explicación de por qué se sugieren estos profesionales."
          },
          tips: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "3-4 consejos rápidos de salud personalizados."
          }
        },
        required: ["priority", "reason", "tips"]
      }
    }
  });

  return JSON.parse(response.text);
}
