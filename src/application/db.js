"use strict";

const config = require("config");

const db = {
  tables: {
    account: {
      tableName: `${config.resourcesPrefix}-account`,
      columns: {
        accountId: "accountId",
        cratedAt: "cratedAt",
        email: "email",
        fullName: "name"
      }
    }
  }
};

module.exports = db;
