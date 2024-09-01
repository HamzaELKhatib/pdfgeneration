const generatePdf = require('../utils/pdfGenerator');
const fs = require('fs');

const generatePdfController = async (ctx) => {
    try {
        const url = ctx.query.url;
        if (!url) {
            ctx.status = 400;
            ctx.body = 'URL parameter is required';
            return;
        }

        const filePath = await generatePdf(url);

        ctx.set('Content-Type', 'application/pdf');
        ctx.set('Content-Disposition', 'attachment; filename=webpage.pdf');
        ctx.body = fs.createReadStream(filePath);
    } catch (error) {
        console.error('Error generating PDF:', error);
        ctx.status = 500;
        ctx.body = 'Internal Server Error';
    }
};

module.exports = generatePdfController;
