import { Resend } from "resend";
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

const resendApiKey = process.env.RESEND_API_KEY || "dummy_key";
const resend = new Resend(resendApiKey);

export async function notifyLeadEmail(leadData: {
  name: string;
  email: string;
  phone: string;
  requirements: string;
  score: number;
  technicalSheet?: {
    industry: string;
    productType: string;
    specs: string;
    benefits: string;
    imageUrl?: string;
  };
}) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY no configurado, omitiendo envío de email real.");
    return { success: false, error: "API_KEY no configurada" };
  }

  try {
    const attachments = [];

    const ts = leadData.technicalSheet;
    if (ts) {
      const pdfBuffer = await new Promise<Buffer>((resolve, reject) => {
        try {
          // @ts-ignore
          const doc = new PDFDocument({ margin: 40, size: 'A4' });
          const buffers: Buffer[] = [];
          
          doc.on('data', buffers.push.bind(buffers));
          doc.on('end', () => resolve(Buffer.concat(buffers)));

          // Header
          doc.rect(40, 40, 515, 60).fill('#f8fafc');
          doc.fontSize(22).font('Helvetica-Bold').fillColor('#0056b3').text('PlastiK LITE', 60, 55);
          doc.fontSize(10).font('Helvetica').fillColor('#64748b').text('Especificación Técnica Oficial', 60, 80);
          
          // Industry Tag
          doc.rect(400, 55, 140, 30).fill('#eff6ff');
          doc.fontSize(11).font('Helvetica-Bold').fillColor('#1d4ed8').text(ts.industry, 400, 65, { width: 140, align: 'center' });

          // Layout: Left column (image + title), Right column (specs + benefits)
          let currentY = 140;

          // Image
          if (ts.imageUrl) {
            try {
              const cleanUrl = ts.imageUrl.split('?')[0];
              const imgPath = path.join(process.cwd(), 'public', cleanUrl);
              if (fs.existsSync(imgPath)) {
                doc.image(imgPath, 40, currentY, { fit: [160, 160], align: 'center', valign: 'center' });
              }
            } catch (e) {
              console.error("Error reading image for PDF", e);
            }
          }

          // Product Title (under image)
          doc.fontSize(12).font('Helvetica-Bold').fillColor('#0f172a').text(ts.productType, 40, currentY + 175, { width: 160, align: 'center' });

          // Right Column (Specs and Benefits)
          doc.fontSize(14).font('Helvetica-Bold').fillColor('#0f172a').text('Especificaciones', 230, currentY);
          doc.fontSize(11).font('Helvetica').fillColor('#334155').text(ts.specs, 230, currentY + 20, { width: 325, align: 'justify' });

          const benefitsY = doc.y + 25;
          doc.fontSize(14).font('Helvetica-Bold').fillColor('#0f172a').text('Beneficios', 230, benefitsY);
          doc.fontSize(11).font('Helvetica').fillColor('#334155').text(ts.benefits, 230, benefitsY + 20, { width: 325, align: 'justify' });

          // Footer
          doc.rect(40, 750, 515, 1).fill('#e2e8f0');
          doc.fontSize(9).font('Helvetica').fillColor('#94a3b8').text('Esta es una especificación preliminar generada por nuestro Asesor Virtual.', 40, 765, { align: 'center', width: 515 });
          doc.text('Para precios y volúmenes, visite nuestro portal o contacte a ventas.', 40, 780, { align: 'center', width: 515 });

          doc.end();
        } catch (err) {
          reject(err);
        }
      });

      attachments.push({
        filename: 'Hoja_Tecnica_Preliminar.pdf',
        content: pdfBuffer
      });
    }

    const { data, error } = await resend.emails.send({
      from: "PlastiK LITE Bot <onboarding@resend.dev>",
      to: "dianamilendry@gmail.com",
      subject: `🚨 Nuevo Lead PlastiK LITE: ${leadData.name} (Score: ${leadData.score}/100)`,
      attachments: attachments.length > 0 ? attachments : undefined,
      html: `
        <h2>Tienes un nuevo Lead para PlastiK LITE</h2>
        <p>El asesor virtual ha interactuado con un cliente potencial y lo ha calificado.</p>
        <hr />
        <ul>
          <li><strong>Nombre:</strong> ${leadData.name}</li>
          <li><strong>Email:</strong> ${leadData.email}</li>
          <li><strong>Teléfono:</strong> ${leadData.phone}</li>
          <li><strong>Calificación (Score):</strong> ${leadData.score}/100</li>
          <li><strong>Requerimientos:</strong> ${leadData.requirements}</li>
        </ul>
        <br />
        <p>Por favor dale seguimiento a este lead lo más pronto posible.</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, error };
    }

    console.log("Email enviado con éxito", data);
    return { success: true, data };
  } catch (err) {
    console.error("Failed to send email:", err);
    return { success: false, error: err };
  }
}
