const axios = require("axios");
const cache = require("../utils/cache");

async function getExchangeRate() {
  // Check cache first (valid for 15 minutes)
  const cachedRate = cache.get("usd_inr");
  if (cachedRate) return cachedRate;

  try {
    // Call exchangerate-api.com
    const res = await axios.get(
      "https://v6.exchangerate-api.com/v6/fd83106dbf8a216a54631fd2/latest/USD"
    );

    // Validate structure
    if (
      res.data?.result === "success" &&
      res.data?.conversion_rates?.INR
    ) {
      const rate = res.data.conversion_rates.INR;
      cache.set("usd_inr", rate);
      return rate;
    }

    // If structure not valid, throw error
    throw new Error(`Unexpected API response: ${JSON.stringify(res.data)}`);

  } catch (error) {
    console.error("❌ Failed to fetch exchange rate:", error.message);
    throw new Error("Exchange rate fetch failed");
  }
}

module.exports = { getExchangeRate };
