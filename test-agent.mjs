import { openai } from "@ai-sdk/openai";
import { generateText, tool } from "ai";
import { z } from "zod";

const systemPrompt = `
      Eres el Asesor Virtual Experto de "PlastiK LITE", una marca premium de empaques plásticos flexibles.
      Tu objetivo es interactuar con los clientes que visitan la página web, entender sus necesidades de empaque...
      (Aquí se simula el comportamiento del agente)
`;

async function testAgent() {
  console.log("Iniciando prueba del agente...");
  const result = await generateText({
    model: openai("gpt-4o"),
    system: "Eres el Asesor Virtual Experto de PlastiK LITE. Saluda e indaga sobre un proyecto de empaque flexible. Intenta recomendar la mejor opción y generar la Hoja Técnica.",
    messages: [
      { role: "user", content: "Hola, necesito bolsas para empacar alimento para perros." }
    ]
  });

  console.log("Respuesta del Agente:");
  console.log(result.text);
}

testAgent().catch(console.error);
