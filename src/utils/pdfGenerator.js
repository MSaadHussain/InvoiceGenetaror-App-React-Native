// src/utils/pdfGenerator.js

export const generatePdfHtml = (template, invoiceDetails) => {
  const logoHtml = template.logoUri ? `<img src="${template.logoUri}" style="width: 80px; height: 80px; border-radius: 40px; object-fit: cover; margin-bottom: 15px; border: 2px solid #3498db;" />` : `<div style="font-size: 16px; color: #888; margin-bottom: 15px;">[Your Logo]</div>`;
  const formattedPrice = parseFloat(invoiceDetails.projectPrice).toFixed(2);
  const invoiceDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return `
    <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 30px; color: #333; max-width: 800px; margin: auto; border: 1px solid #e0e0e0; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.08); background-color: #ffffff;">
      <style>
        body { margin: 0; padding: 0; }
        .container { width: 100%; margin: 0 auto; padding: 20px; box-sizing: border-box; }
        .header { text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid #3498db; }
        .header h1 { margin: 0; color: #2c3e50; font-size: 32px; font-weight: 700; letter-spacing: 1px; }
        .header .invoice-meta { display: flex; justify-content: space-between; align-items: center; width: 100%; margin-top: 15px; }
        .header .invoice-number { font-size: 20px; font-weight: bold; color: #555; }
        .header .invoice-date { font-size: 16px; color: #777; }
        .section { margin-bottom: 25px; padding: 15px; border-radius: 8px; background-color: #f9f9f9; border: 1px solid #eee; }
        .section-title { font-size: 20px; font-weight: 600; color: #34495e; margin-bottom: 12px; border-bottom: 1px dashed #ccc; padding-bottom: 5px; }
        .info-line { margin-bottom: 8px; font-size: 16px; color: #444; }
        .info-line strong { color: #2c3e50; }
        .total-section { text-align: right; margin-top: 30px; padding-top: 15px; border-top: 2px solid #3498db; }
        .total-amount { font-size: 24px; font-weight: bold; color: #2c3e50; }
        .footer { text-align: center; margin-top: 40px; font-size: 14px; color: #777; border-top: 1px solid #eee; padding-top: 20px; }
        .thank-you { font-size: 16px; font-weight: 600; color: #3498db; margin-top: 10px; }
      </style>
      <div class="container">
        <div class="header">
          ${logoHtml}
          <h1>INVOICE</h1>
          <div class="invoice-meta">
            <span class="invoice-number">#${invoiceDetails.invoiceNumber}</span>
            <span class="invoice-date">Date: ${invoiceDate}</span>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Your Business Information</div>
          <div class="info-line"><strong>${template.templateName}</strong></div>
          <div class="info-line">${template.companyName}</div>
          <div class="info-line">${template.companyAddress}</div>
          <div class="info-line">Phone: ${template.companyPhoneNumber}</div>
        </div>

        <div class="section">
          <div class="section-title">Bill To</div>
          <div class="info-line"><strong>${invoiceDetails.clientName}</strong></div>
          <div class="info-line">Phone: ${invoiceDetails.clientNumber}</div>
          <div class="info-line">Email: ${invoiceDetails.clientEmail}</div>
        </div>

        <div class="section">
          <div class="section-title">Project Details</div>
          <div class="info-line"><strong>Project:</strong> ${invoiceDetails.projectName}</div>
          <div class="info-line"><strong>Description:</strong> ${invoiceDetails.projectDescription}</div>
          <div class="info-line"><strong>Rate:</strong> $${formattedPrice}</div>
        </div>

        <div class="total-section">
          <div class="total-amount">TOTAL: $${formattedPrice}</div>
        </div>

        <div class="footer">
          <p>Payment due upon receipt.</p>
          <p class="thank-you">Thank you for your business!</p>
        </div>
      </div>
    </div>
  `;
};
