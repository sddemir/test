const router = require('express').Router(); // express router modülünü dahil eder.
// const express = require('express');
const { tedSaySorgusu } = require("../controller/controller");
const { satisSaySorgusu } = require("../controller/controller");
const { bekleyenSiparisSorgusu } = require("../controller/controller");
const { azAdetliUrunSorgusu } = require("../controller/controller");
const {tedarikcileriGetir} = require("../controller/controller");
const {UrunleriGetir} = require("../controller/controller");
const {satislariGetir} = require("../controller/controller");
const {altiAySatis} = require("../controller/controller");
const {pieChartVeriGetir} = require("../controller/controller");
// const {alimSuresiChartGetir} = require("../controller/controller");
const {tedarikciKaliteChartGetir} = require("../controller/controller");

router.get("/tedSaySorgusu", tedSaySorgusu);
router.get("/satisSaySorgusu", satisSaySorgusu); 
router.get("/bekleyenSiparisSorgusu", bekleyenSiparisSorgusu);
router.get("/azAdetliUrunSorgusu", azAdetliUrunSorgusu);
router.get("/tedarikcileriGetir", tedarikcileriGetir);
router.get("/UrunleriGetir", UrunleriGetir);
router.get("/satislariGetir", satislariGetir);
router.get("/altiAySatis", altiAySatis);
router.get("/pieChartVeriGetir", pieChartVeriGetir);
// router.get("/alimSuresiChartGetir", alimSuresiChartGetir);
router.get("/tedarikciKaliteChartGetir", tedarikciKaliteChartGetir);
module.exports = router;