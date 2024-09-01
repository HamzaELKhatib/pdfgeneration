const Koa = require('koa');
const pdfRoutes = require('./routes/pdfRoutes');
const app = new Koa();
require('dotenv').config();

app
    .use(pdfRoutes.routes())
    .use(pdfRoutes.allowedMethods());

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
