const { Pool } = require('pg')

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'abc123**',
    port: 5432,
})

const getAllCountry = async () => {
    const sql = 'select "Province/State" as State , "Country/Region" as Country from covid19_confirmed_csv';
    try {
        const data = await pool.query(sql);
        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

const getAllConfirmed = async () => {
    const sql = 'select "3/23/20" as allconfirmed from covid19_confirmed_csv';
    try {
        const data = await pool.query(sql);
        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
}


const getAllRecovered = async () => {
    const sql = 'select "3/23/20" as allrecovered from covid19_recovered_csv';
    try {
        const data = await pool.query(sql);
        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

const getAllDeaths = async () => {
    const sql = 'select "3/23/20" as worldDeaths from covid19_death_csv';
    try {
        const data = await pool.query(sql);
        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

const getworldConfirmed = async () => {
    const sql = 'select sum("3/23/20") as worldConfirmed from covid19_confirmed_csv';
    try {
        const data = await pool.query(sql);
        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
}
const getworldRecovered  = async () => {
    const sql = 'select sum("3/23/20") as worldRecovered from covid19_recovered_csv';
    try {
        const data = await pool.query(sql);
        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
}
const getworldDeaths = async () => {
    const sql = 'select sum("3/23/20") as worldDeaths from covid19_death_csv';
    try {
        const data = await pool.query(sql);
        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
}






const getTotalStatusByCountry = async (Country) => {
    const sql = `select covid19_confirmed_csv."3/23/20" as Confirmed , 
    covid19_death_csv."3/23/20" as Deaths ,
    covid19_recovered_csv."3/23/20" as Recovered
    from covid19_confirmed_csv , covid19_death_csv , covid19_recovered_csv
    where covid19_death_csv."Country/Region" = covid19_confirmed_csv."Country/Region"
    and covid19_death_csv."Country/Region" = covid19_recovered_csv."Country/Region"
    and covid19_confirmed_csv."Country/Region" = '${Country}'`;
    try {
        const data = await pool.query(sql);
        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

const getTotalStatusByState = async (State) => {
    const sql = `select covid19_confirmed_csv."3/23/20" as Confirmed , 
    covid19_death_csv."3/23/20" as Deaths ,
    covid19_recovered_csv."3/23/20" as Recovered
    from covid19_confirmed_csv , covid19_death_csv , covid19_recovered_csv
    where covid19_death_csv."Province/State" = covid19_confirmed_csv."Province/State"
    and covid19_death_csv."Province/State" = covid19_recovered_csv."Province/State"
    and covid19_confirmed_csv."Province/State" = '${State}'`;
    try {
        const data = await pool.query(sql);
        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

 


const getMaps = async () => {
    const sql = 'select lat , long , "Province/State" as State , "Country/Region" as Country from covid19_death_csv';
    try {
        const data = await pool.query(sql);
        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

module.exports = {
    getAllCountry,
    getTotalStatusByCountry,
    getTotalStatusByState,
    getAllConfirmed,
    getAllRecovered,
    getAllDeaths,
    getMaps,
    getworldConfirmed,
    getworldRecovered,
    getworldDeaths,
}