const express = require('express'); // express modülünü dahil eder.
const app = express();// express uygulaması oluşturur.
const dbConn = require('./db/mysql_connect'); // db bağlantısı için kullanılır.
const router = require('./routers/index'); // router dosyasını dahil eder.

require('dotenv').config(); // .env dosyasını okumak için kullanılır.

app.get('/', function (req, res) {  // get isteği yapılır.
  res.sendFile(path.join(__dirname + '/index.html'));
}) 
app.get('/musteri_getir', function (req, res) {  // get isteği yapılır.
  res.sendFile(path.join(__dirname + 'musteri_getir.html'));
}) 

// middleware kullanımı
app.use(express.json({extended: true, limit: '50mb', parameterLimit: 500000})); // json formatında gelen verileri okumak için kullanılır.


app.use('/api',router); // api yolunu kullanmak için kullanılır.

app.listen(process.env.PORT, function () { // uygulamayı belirtilen portta dinlemek için kullanılır.
  console.log('Example app listening!!!') // uygulama dinleniyorsa mesajı gösterir.
});