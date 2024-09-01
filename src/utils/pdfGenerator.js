const puppeteer = require('puppeteer');
const fs = require('fs');

async function generatePdf(url) {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: {
            top: '1cm',
            right: '1cm',
            bottom: '1cm',
            left: '1cm'
        }
    });

    await browser.close();

    const filePath = 'webpage.pdf';
    fs.writeFileSync(filePath, pdfBuffer);

    return filePath;
}

module.exports = generatePdf;
