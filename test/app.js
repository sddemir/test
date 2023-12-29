const express = require('express'); // express modülünü dahil eder.
const app = express();// express uygulaması oluşturur.
const router = require('./routers'); // router dosyasını dahil eder.
const path = require('path');

require('dotenv').config(); // .env dosyasını okumak için kullanılır.

app.get('/', function (req, res) {  // get isteği yapılır.
  res.sendFile(path.join(__dirname, '/main.html')); // Hello World mesajını gönderir.
}) 
app.get('/home', function (req, res) {
  res.sendFile(path.join(__dirname, '/satislar.html'));
})

app.get('/tedarikciler.html', function (req, res) {
  res.sendFile(path.join(__dirname, '/tedarikciler.html'));
})

// middleware kullanımı
app.use(express.json({extended: true, limit: '50mb', parameterLimit: 500000})); // json formatında gelen verileri okumak için kullanılır.


app.use('/api',router); // api yolunu kullanmak için kullanılır.

app.listen(process.env.PORT, function () { // uygulamayı belirtilen portta dinlemek için kullanılır.
  console.log('Example app listening!!!') // uygulama dinleniyorsa mesajı gösterir.
});

// Define routes and middleware functions
router.get('/', (req, res) => {
    res.send('This is a route in the routes module');
  });