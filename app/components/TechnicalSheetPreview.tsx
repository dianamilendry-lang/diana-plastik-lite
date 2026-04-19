"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import styles from "./TechnicalSheetPreview.module.css";
import { Download, FileText, CheckCircle } from "lucide-react";

interface TechnicalSheetPreviewProps {
  industry: string;
  productType: string;
  specs: string;
  benefits: string;
  imageUrl: string;
}

export default function TechnicalSheetPreview({
  industry,
  productType,
  specs,
  benefits,
  imageUrl,
}: TechnicalSheetPreviewProps) {
  const printRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (!printRef.current) return;
    setIsDownloading(true);

    try {
      // Dynamic import to avoid SSR issues
      const html2pdf = (await import("html2pdf.js")).default;
      
      const opt = {
        margin:       10,
        filename:     `Hoja_Tecnica_${industry.replace(/[^a-z0-9]/gi, '_')}.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      await html2pdf().set(opt).from(printRef.current).save();
    } catch (error) {
      console.error("Failed to generate PDF", error);
      alert("Hubo un error generando el PDF. Asegúrate de tener instalada la librería html2pdf.js");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.printArea} ref={printRef}>
        <div className={styles.header}>
          <div className={styles.logoInfo}>
            <h2>PlastiK LITE</h2>
            <p>Especificación Técnica Oficial</p>
          </div>
          <div className={styles.industryTag}>
            {industry}
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.imageCol}>
            <div className={styles.imagePlaceholder}>
              <Image 
                src={imageUrl || "/pouches.png"} 
                alt={productType} 
                fill 
                className={styles.productImage} 
                unoptimized
              />
            </div>
            <h3 className={styles.productName}>{productType}</h3>
          </div>

          <div className={styles.specsCol}>
            <div className={styles.specSection}>
              <h4><FileText size={16} /> Especificaciones</h4>
              <p>{specs}</p>
            </div>

            <div className={styles.specSection}>
              <h4><CheckCircle size={16} /> Beneficios</h4>
              <p>{benefits}</p>
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <p>Esta es una especificación preliminar generada por nuestro Asesor Virtual.</p>
          <p>Para precios y volúmenes, visite nuestro portal o contacte a ventas.</p>
        </div>
      </div>

      <div className={styles.actions}>
        <button 
          onClick={handleDownload} 
          disabled={isDownloading}
          className={styles.downloadButton}
        >
          <Download size={18} />
          {isDownloading ? "Generando..." : "Descargar PDF"}
        </button>
      </div>
    </div>
  );
}
