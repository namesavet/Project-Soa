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
  const worldDeaths = await db.getworldDeaths();
  const worldRecovered = await db.getworldRecovered();
  const worldConfirmed = await db.getworldConfirmed();
  const getMaps = await db.getMaps();

  const worldTotal = {
    worldDeaths:worldDeaths.rows[0].worlddeaths,
    worldRecovered:worldRecovered.rows[0].worldrecovered,
    worldConfirmed:worldConfirmed.rows[0].worldconfirmed,
  }
  console.log(worldTotal)
  res.render('Map',{ Latitude : getMaps.rows, Total : worldTotal});
});

module.exports = router;
