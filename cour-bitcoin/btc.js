#!/usr/bin/env node

const axios = require("axios");

async function main() {
  const currency = process.argv[2] ? process.argv[2].toUpperCase() : "USD";

  try {
    // const currency = process.argv[2].toUpperCase();
    // let currency = "USD";
    // if (process.argv[2]) {
    //   currency = process.argv[2].toUpperCase();
    // } else {
    //   currency = "USD";
    // }
    const endpoint = `https://api.coindesk.com/v1/bpi/currentprice.json"`;
    const { data } = await axios.get(endpoint);

    if (!data.bpi[currency]) {
      throw new Error(`Invalid currency`);
    }

    const updatedAt = data.time.updated;
    const rate = data.bpi[currency].rate;
    console.log(`1 BTC = ${rate} ${currency} (${updatedAt})`);
  } catch (err) {
    console.error(err.toString());
  }
}

main();
