const mysql = require('mysql'); // mysql modülünü dahil eder.
require('dotenv').config(); // .env dosyasını okumak için kullanılır.
var dbConn = mysql.createConnection({  // mysql bağlantısı için kullanılır.
    user: "root", // .env dosyasından gelen verileri kullanır.
    password: "",
    host: "localhost",
    database: "test"
});

dbConn.connect(function(err) { // mysql bağlantısını kontrol eder.
    if (err) throw err; // hata varsa hata mesajını gösterir.
    console.log("Database Connected!"); // bağlantı başarılıysa bağlantı başarılı mesajını gösterir.
});

module.exports = dbConn; 