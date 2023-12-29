const express = require('express'); // express modülünü dahil eder.
const app = express();// express uygulaması oluşturur.
const router = require('./routers'); // router dosyasını dahil eder.
const path = require('path');
const port = 3000;

require('dotenv').config(); // .env dosyasını okumak için kullanılır.
// app.use(express.static(__dirname));

app.get('/', function (req, res) {  // get isteği yapılır.
  res.sendFile(path.join(__dirname, 'main.html')); // main.html dosyasını dışarıya aktarır.
}) 

app.get('/tedarikciler.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'tedarikciler.html'));
})
app.get('/tedarik_analiz.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'tedarik_analiz.html'));
})
app.get('/urunler.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'urunler.html'));
})
app.get('/urun_analiz.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'urun_analiz.html'));
})
app.get('/satislar.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'satislar.html'));
})
app.get('/satis_analiz.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'satis_analiz.html'));
})
app.get('/kategori.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'kategori.html'));
})
app.get('/main.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'main.html'));

  
});
app.get('/time', function (req, res) {
  res.sendFile(path.join(__dirname, '/time-management.png'));
})

// middleware kullanımı
app.use(express.json({extended: true, limit: '50mb', parameterLimit: 500000})); // json formatında gelen verileri okumak için kullanılır.


app.use('/api',router); // api yolunu kullanmak için kullanılır.

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
// Define routes and middleware functions
router.get('/', (req, res) => {
    res.send('This is a route in the routes module');
  });