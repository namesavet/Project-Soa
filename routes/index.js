const express = require('express');
const router = express.Router();
const db = require('../database/database');

/* GET home page. */
router.get('/', async function (req, res, next) {

  const result = await db.getAllCountry();
  const Confirmed = await db.getAllConfirmed();
  const Recovered = await db.getAllRecovered();
  const Deaths = await db.getAllDeaths();

  var objectCountry = [];
  for (const key in result.rows) {
    if (Confirmed.rows[key].allconfirmed != null) {
      objectCountry[key] = {
        state: result.rows[key].state,
        country: result.rows[key].country,
        confirmed: Confirmed.rows[key].allconfirmed,
        recovered: Recovered.rows[key].allrecovered,
        deaths: Deaths.rows[key].alldeaths,
      }
    }
  }
  res.render('index', { Countrys: objectCountry });
});

router.get('/Country/:State/:CountryTarget', async function (req, res, next) {
  const Country = req.params.CountryTarget
  const State = req.params.State

  var StatusCountry, name;
  if (State != "null") {
    name = State;
    StatusCountry = await db.getTotalStatusByState(State);
  } else {
    name = Country;
    StatusCountry = await db.getTotalStatusByCountry(Country);
  }
  res.render('Country', { nameCountry: name, Status: StatusCountry.rows[0] });
});

router.get('/Map', async function (req, res, next) {
  const getMaps = await db.getMaps();
  res.render('Map',{ Latitude : getMaps.rows});
});

module.exports = router;
