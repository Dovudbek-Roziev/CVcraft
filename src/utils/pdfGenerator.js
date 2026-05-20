import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { trackPDFDownload } from './analytics.js';

/**
 * Generates a PDF from the CV preview element.
 * @param {string} elementId - The DOM element ID to capture
 * @param {string} fileName - Output PDF file name
 * @param {string} templateName - For analytics tracking
 */
export async function generatePDF(elementId = 'cv-preview', fileName = 'my-cv', templateName = 'unknown') {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Element #${elementId} not found`);
  }

  try {
    // Capture element as canvas
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      imageTimeout: 15000,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const imgX = (pdfWidth - imgWidth * ratio) / 2;
    const imgY = 0;

    // Handle multi-page CVs
    const pageHeightPx = (pdfHeight / ratio);
    let position = 0;
    let page = 0;

    while (position < imgHeight) {
      if (page > 0) pdf.addPage();

      const sourceY = position;
      const sourceHeight = Math.min(pageHeightPx, imgHeight - position);

      // Create a temp canvas for this page slice
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = imgWidth;
      tempCanvas.height = sourceHeight;
      const tempCtx = tempCanvas.getContext('2d');
      tempCtx.drawImage(canvas, 0, sourceY, imgWidth, sourceHeight, 0, 0, imgWidth, sourceHeight);

      const pageImgData = tempCanvas.toDataURL('image/png');
      pdf.addImage(pageImgData, 'PNG', imgX, imgY, imgWidth * ratio, sourceHeight * ratio);

      position += pageHeightPx;
      page++;
    }

    pdf.save(`${fileName}.pdf`);
    trackPDFDownload(templateName);
    return true;
  } catch (error) {
    console.error('PDF generation failed:', error);
    throw error;
  }
}
