const mysql = require('mysql2'); // mysql modülünü dahil eder.
require('dotenv').config(); // .env dosyasını okumak için kullanılır.
var dbConn = mysql.createConnection({  // mysql bağlantısı için kullanılır.
    user: process.env.MYSQL_USER, // .env dosyasından gelen verileri kullanır.
    password: process.env.MYSQL_PASSWORD, 
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DB,
    port: process.env.MYSQL_PORT
});

dbConn.connect(function(err) { // mysql bağlantısını kontrol eder.
    if (err) throw err; // hata varsa hata mesajını gösterir.
    console.log("Database Connected!"); // bağlantı başarılıysa bağlantı başarılı mesajını gösterir.
});

module.exports = dbConn;  // dbConn dosyasını dışarıya aktarır