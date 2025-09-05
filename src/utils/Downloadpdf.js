// src/utils/Downloadpdf.js
import html2pdf from "html2pdf.js";

/**
 * Builds a clean PDF from a DOM node.
 * @param {HTMLElement|string} nodeOrSelector - element or a CSS selector to the printable wrapper
 * @param {string} filename - pdf file name
 */
export async function downloadPdf(nodeOrSelector, filename = "report.pdf") {
  const el =
    typeof nodeOrSelector === "string"
      ? document.querySelector(nodeOrSelector)
      : nodeOrSelector;

  if (!el) return;

  const opt = {
    margin: [20, 20, 20, 20], // pt
    filename,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      scrollY: 0,
      windowWidth: el.scrollWidth, // prevents clipping and overlapping
    },
    jsPDF: { unit: "pt", format: "a4", orientation: "portrait" },
    pagebreak: {
      mode: ["css", "legacy"], // respect CSS page-break rules
      avoid: [".pdf-card *"], // try not to split a result card
    },
  };

  await html2pdf().set(opt).from(el).save();
}
