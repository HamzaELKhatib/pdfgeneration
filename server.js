const Koa = require('koa');
const puppeteer = require('puppeteer');
const fs = require('fs');
const app = new Koa();

app.use(async ctx => {
    try {
        console.log('Received request');
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        console.log('Browser launched');
        const page = await browser.newPage();
        console.log('New page created');
        await page.goto('https://www.odi.ch/prog/design/newbies.php', { waitUntil: 'networkidle2' });
        console.log('Page loaded');

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
        console.log('PDF generated');

        // Save PDF to local filesystem
        fs.writeFileSync('webpage.pdf', pdfBuffer);
        console.log('PDF saved locally');

        await browser.close();
        console.log('Browser closed');

        // Stream the PDF to the client
        ctx.set('Content-Type', 'application/pdf');
        ctx.set('Content-Disposition', 'attachment; filename=webpage.pdf');
        ctx.body = fs.createReadStream('webpage.pdf');
        console.log('Response sent');
    } catch (error) {
        console.error('Error generating PDF:', error);
        ctx.status = 500;
        ctx.body = 'Internal Server Error';
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
