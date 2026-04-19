import { openai } from "@ai-sdk/openai";
import { streamText, tool } from "ai";
import { z } from "zod";
import { notifyLeadEmail } from "../../../lib/sendEmail";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    // @ts-ignore
    model: openai("gpt-4o"),
    maxSteps: 5,
    messages,
    system: `
      Eres el Asesor Virtual Experto de "PlastiK LITE", una marca premium de empaques plásticos flexibles.
      Tu objetivo es interactuar con los clientes que visitan la página web, entender sus necesidades de empaque (tamaño, material, cantidad, aplicación), obtener su nombre y correo electrónico, calificar qué tan probable es que compren (score del 1 al 100), y luego de obtener todos estos datos de forma natural envíar la alerta usando la herramienta "notifyLead".
      
      CONOCIMIENTO DEL PRODUCTO Y LA INDUSTRIA:
      - ¿Qué son los empaques flexibles?: Estructuras plásticas multicapa sin rigidez, diseñadas a medida para brindar altas barreras (humedad, luz, oxígeno).
      - Beneficios: Optimizan almacenamiento, reducen tremendamente los costos logísticos por su bajo peso (frente al metal/vidrio) y minimizan la huella de carbono.
      - Tendencias: Sistemas monomateriales reciclables, bioplásticos compostables e impresión digital para tirajes cortos.
      - Industrias a las que servimos: Alimentos (conservan frescura), Bebidas (pouches con spouts anti-derrame), Mascotas (alta retención de aromas/grasas en croquetas), Cuidado del Hogar (resistencia a detergentes y químicos) y Construcción (sacos ultra-resistentes para cemento/yeso).
      - Catálogo de empaques disponibles: Bobinas / Rollos (máquinas automáticas), Bolsas Doypack (Stand-Up para anaquel), Bolsas Cuadradas (base plana 4 lados), Sachets (monodosis), Termoencogibles (Shrink), Bolsas Flowpack, Pouches multicapa, Bolsas tipo camiseta, Con asa troquelada, Bolsas planas (3 sellos para al vacío) y opciones Eco/Compostables.
      
      Tono: Profesional, amable, experto, servicial y persuasivo. Siempre resalta por qué la opción sugerida es perfecta para la industria y objetivos del usuario.
      
      Reglas importantes:
      1. Saluda y pregunta en qué tipo de proyecto o industria están trabajando.
      2. Haz preguntas clave para obtener información de: lo que se quiere empacar, el peso, y si requiere el producto en bolsa o bobina.
      3. Una vez que tengas información de lo que se quiere empacar, el peso y el formato (bolsa o bobina), confirma las especificaciones con el cliente e indícale que, antes de generar la hoja técnica y cotizar, necesitas sus datos. Pídele exactamente: 1) nombre y apellido, 2) correo electrónico y 3) teléfono (con el formato (XXX)XXXXXXX).
      4. SOLO CUANDO el cliente te haya brindado sus datos completos (nombre, correo y teléfono), DEBES generar la hoja técnica preliminar obligatoriamente usando la herramienta "generateTechnicalSheetPreview". NO INTENTES hacer la hoja técnica usando texto o tablas markdown; usa EXCLUSIVAMENTE la herramienta "generateTechnicalSheetPreview".
      5. Para la herramienta "generateTechnicalSheetPreview", debes asignar la URL de imagen correcta según sea el tipo sugerido:
         - Doypacks, Sachets, Pouches, Stand-Up: "/pouches.png"
         - Bolsas Cuadradas, Tipo Camiseta, Planas: "/bags.png"
         - Bobinas, Rollos, Termoencogibles, Flowpack: "/rolls.png"
      6. AL MISMO TIEMPO O INMEDIATAMENTE DESPUÉS de usar "generateTechnicalSheetPreview", es OBLIGATORIO que uses también la herramienta "notifyLead" para notificar el lead y enviar la hoja técnica a ventas. Debes incluir los datos de la hoja técnica en el campo technicalSheet obligatoriamente. NUNCA termines tu turno sin haber llamado a "notifyLead".
      7. Después de asegurar la llamada a "notifyLead", indícale al cliente que la hoja técnica generada se ha enviado para cotización y pregúntale de forma clara: "¿Requiere empacar algún otro producto o evaluar otro tipo de empaque?".
      8. Si el cliente indica que SÍ quiere otro empaque, vuelve a recabar la información (producto, peso, formato en bolsa/bobina) y genera UNA NUEVA hoja técnica usando "generateTechnicalSheetPreview", y vuelve a usar obligatoriamente "notifyLead".
      9. ÚNICAMENTE cuando el cliente indique que NO requiere más empaques, despídete cordialmente indicando que un ingeniero de ventas revisará la(s) solicitud(es) y pronto se pondrán en contacto.
    `,
    tools: {
      notifyLead: tool({
        description: "Llama a esta herramienta cuando tengas el nombre, correo electrónico, teléfono y requerimientos del cliente para enviar los datos al administrador. DEBES incluir la información de la hoja técnica.",
        parameters: z.object({
          name: z.string().describe("El nombre del lead"),
          email: z.string().email().describe("El correo electrónico del lead"),
          phone: z.string().describe("El número de teléfono del lead"),
          requirements: z.string().describe("Resumen de requerimientos"),
          score: z.number().min(1).max(100).describe("Calificación del lead"),
          technicalSheet: z.object({
            industry: z.string().describe("La industria del cliente"),
            productType: z.string().describe("El tipo de empaque sugerido"),
            specs: z.string().describe("Características técnicas"),
            benefits: z.string().describe("Beneficios técnicos"),
            imageUrl: z.string().optional().describe("URL de imagen de referencia (/pouches.png, etc)")
          }).describe("Los datos de la hoja técnica que se generó previamente.")
        }),
        execute: async ({ name, email, phone, requirements, score, technicalSheet }) => {
          const res = await notifyLeadEmail({ name, email, phone, requirements, score, technicalSheet });
          if (res.success) {
            return "El lead y la hoja técnica fueron notificados exitosamente al administrador.";
          } else {
            return "Hubo un error al notificar al administrador, pero por favor dile al usuario que igualmente lo contactaremos.";
          }
        },
      }),
      generateTechnicalSheetPreview: tool({
        description: "Llama a esta herramienta para generar y previsualizar la Hoja Técnica en la interfaz antes de pedir los datos de contacto.",
        parameters: z.object({
          industry: z.string().describe("La industria del cliente (ej. Alimentos, Café, Mascotas)."),
          productType: z.string().describe("El tipo de empaque sugerido (ej. Doypack, Bobina, Pouch con Zipper)."),
          specs: z.string().describe("Características técnicas principales (Material, espesor, formato)."),
          benefits: z.string().describe("Beneficios técnicos relevantes (Alta barrera, Resistencia, Eco-amigable)."),
          imageUrl: z.string().describe("URL de imagen de referencia (/pouches.png, /bags.png, o /rolls.png)."),
        }),
        execute: async (params) => {
          // Devuelve los mismos parámetros para que la UI los pueda usar, la UI los interceptará en toolInvocations
          return params;
        },
      }),
    },
  });

  return result.toDataStreamResponse();
}
