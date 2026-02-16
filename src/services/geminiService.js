import { GoogleGenerativeAI } from "@google/generative-ai";

export const getGeminiRecommendation = async (apiKey, weather, city) => {
    if (!apiKey) throw new Error("API Key requerida");

    const genAI = new GoogleGenerativeAI(apiKey);
    // gemini 2.5 flash para agente de recomendaciones rápidas
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `Actúa como un experto meteorólogo y asistente personal amigable.
  
  Datos actuales para ${city}:
  - Temperatura: ${weather.temp}°C
  - Condición: ${weather.description}
  - Viento: ${weather.windSpeed} km/h
  - Humedad: ${weather.humidity}%

  Dame 3 recomendaciones MUY BREVES (máximo 1 línea cada una) para:
  1. Ropa sugerida 🧥
  2. Una actividad al aire libre (o interior si hace mal tiempo) 🏃
  3. Un consejo de salud o precaución 💊

  Responde con una lista limpia y legible. Usa saltos de línea claros entre cada punto.
  Ejemplo de formato deseado:
  🧥 **Ropa:** [Consejo breve]
  
  🏃 **Actividad:** [Consejo breve]
  
  💊 **Salud:** [Consejo breve]`;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Gemini Error:", error);
        throw new Error("No se pudo conectar con Gemini. Verifica tu API Key.");
    }
};
