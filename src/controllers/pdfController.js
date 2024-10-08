const generatePdf = require('../utils/pdfGenerator');
const fs = require('fs');
require('path');

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

        // Delete the file after sending the response
        ctx.res.on('finish', () => {
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error('Error deleting file:', err);
                } else {
                    console.log('File deleted:', filePath);
                }
            });
        });
    } catch (error) {
        console.error('Error generating PDF:', error);
        ctx.status = 500;
        ctx.body = 'Internal Server Error';
    }
};

module.exports = generatePdfController;
