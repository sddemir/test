const router = require('express').Router(); // express router modülünü dahil eder.
const routes = require('./routes'); // routes dosyasını dahil eder.
router.use(routes) // routes dosyasını kullanmak için kullanılır.
module.exports = router; // router dosyasını dışarıya aktarır.