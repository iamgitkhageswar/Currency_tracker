const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "../data/transactions.json");

function readTransactions() {
  if (!fs.existsSync(filePath)) return [];
  return JSON.parse(fs.readFileSync(filePath, "utf-8") || "[]");
}

function writeTransactions(transactions) {
  fs.writeFileSync(filePath, JSON.stringify(transactions, null, 2));
}

module.exports = { readTransactions, writeTransactions };
