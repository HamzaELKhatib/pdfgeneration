const Router = require('@koa/router');
const generatePdfController = require('../controllers/pdfController');

const router = new Router();

router.get('/generatePdf', generatePdfController);

module.exports = router;
