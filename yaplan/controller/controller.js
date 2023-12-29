const dbConn = require('../db/mysql_connect'); // db bağlantısı için kullanılır.
const util = require('util');
const dbQuery = util.promisify(dbConn.query).bind(dbConn);

// const tedarikciSay = async (tedarikci_id) => {
//     const tedSaySorgusu = "SELECT COUNT(tedarikci.tedarikci_id) FROM tedarikci;";
//   };
  const tedSaySorgusu = (req, res) => {
    const {tedarikci_sayisi} = req.body;
    dbConn.query("SELECT COUNT(tedarikci.tedarikci_id) AS tedarikci_sayisi FROM tedarikci;", [tedarikci_sayisi], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
        
    });
};

const satisSaySorgusu = (req, res) => {
    const {satis_sayisi} = req.body;
    dbConn.query("SELECT COUNT(satislar.satis_id) AS satis_sayisi FROM satislar;", [satis_sayisi], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
        
    });
};

const bekleyenSiparisSorgusu = (req, res) => {
    const {bekleyen_siparis_sayisi} = req.body;
    dbConn.query("SELECT COUNT(*) AS bekleyen_siparis_sayisi FROM alim_urun WHERE teslim_tarih IS NULL OR teslim_tarih = '0000-00-00';", [bekleyen_siparis_sayisi], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
        
    });
};
//stok uyarısı
const azAdetliUrunSorgusu = (req, res) => {
    const {urun_id, adet} = req.body;
    dbConn.query("SELECT urun_id AS urun_id, adet AS adet FROM urunler WHERE adet < 50", [urun_id, adet], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
};
// tedarikçiler
const tedarikcileriGetir = (req, res) => {
    dbConn.query("SELECT * FROM tedarikci", (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            res.json(result);
        }
    });
};
//ürünler
const UrunleriGetir = (req, res) => {
    dbConn.query("SELECT * FROM urunler", (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            res.json(result);
        }
    });
};
//Satışlar
const satislariGetir = (req, res) => {
    dbConn.query("SELECT * FROM satis_urun", (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            res.json(result);
        }
    });
};

//son altı ay satis
const altiAySatis = (req, res) => {  
    dbConn.query(`
        SELECT DATE_FORMAT(satislar.satis_tarih, '%Y-%m-%d') AS tarih, SUM(satis_urun.tutar) AS toplam_tutar
        FROM satislar
        JOIN satis_urun ON satislar.satis_id = satis_urun.satis_id
        WHERE satislar.satis_tarih >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
        GROUP BY tarih
        ORDER BY tarih;
      `, (err, result) => {
        if (err) {
          res.status(500).send({ success: false, message: err.message });
        } else {
          res.send({ success: true, data: result });
        }
      });
};
//çok satanlar pie chart'ı
const pieChartVeriGetir = (req, res) => {
    dbConn.query(`
    SELECT
    urunler.aciklama AS urun_aciklama,
    ROUND((SUM(satis_urun.miktar) / (SELECT SUM(miktar) FROM satis_urun)) * 100, 2) AS yuzde
FROM satis_urun
JOIN urunler ON satis_urun.urun_id = urunler.urun_id
GROUP BY urunler.aciklama
ORDER BY yuzde DESC
LIMIT 8;


    `, (err, result) => {
        if (err) {
            res.status(500).send({ success: false, message: err.message });
        } else {
            res.send({ success: true, data: result });
        }
    });
};
//tedarikçi süre performansı
// const alimSuresiChartGetir = (req, res) => {
//     dbConn.query(`
//         SELECT tedarikci.tedarikci_ad AS tedarikci, 
//                DATEDIFF(alimlar.alim_tarih,alim_urun.teslim_tarih) AS alim_suresi
//         FROM alimlar
//         JOIN alim_urun ON alimlar.alim_id = alim_urun.alim_id
//         JOIN tedarikci ON alimlar.tedarikci_id = tedarikci.tedarikci_id
//     `, (err, result) => {
//         if (err) {
//             res.status(500).send({ success: false, message: err.message });
//         } else {
//             res.send({ success: true, data: result });
//         }
//     });
// };
//tedarikçi kalite analizi
const tedarikciKaliteChartGetir = (req, res) => {
    dbConn.query(`
        SELECT tedarikci.tedarikci_ad AS tedarikci, 
               AVG(DATEDIFF(alim_urun.teslim_tarih, alimlar.alim_tarih)) AS ortalama_alim_suresi,
               SUM(CASE WHEN alim_urun.miktar < 10 THEN 1 ELSE 0 END) AS hatali_urun_sayisi
        FROM alimlar
        JOIN alim_urun ON alimlar.alim_id = alim_urun.alim_id
        JOIN tedarikci ON alimlar.tedarikci_id = tedarikci.tedarikci_id
        GROUP BY tedarikci.tedarikci_ad
    `, (err, result) => {
        if (err) {
            res.status(500).send({ success: false, message: err.message });
        } else {
            res.send({ success: true, data: result });
        }
    });
};


module.exports = { tedSaySorgusu, satisSaySorgusu, bekleyenSiparisSorgusu, 
    azAdetliUrunSorgusu, tedarikcileriGetir, UrunleriGetir, satislariGetir, altiAySatis, pieChartVeriGetir,tedarikciKaliteChartGetir };